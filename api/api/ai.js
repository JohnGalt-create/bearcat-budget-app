// api/ai.js
import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  const { userId, context } = req.body || {};
  if (!context) return res.status(400).json({ error: "Missing context" });

  // Build prompt for the LLM
  const prompt = `
You are Bearcat Budget, an AI financial coach for Binghamton students.
Given the user context, provide one short actionable suggestion and a short reason.
Context: ${JSON.stringify(context)}
Return JSON: { suggestion: "...", confidence: 0.9 }
`;

  try {
    const openaiKey = process.env.OPENAI_API_KEY;
    if (!openaiKey) {
      return res.status(500).json({ error: "OpenAI key not configured" });
    }

    const r = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${openaiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini", // replace with available model
        messages: [{ role: "system", content: "You are Bearcat Budget assistant." }, { role: "user", content: prompt }],
        max_tokens: 200,
        temperature: 0.6
      })
    });

    const data = await r.json();
    const text = data?.choices?.[0]?.message?.content || JSON.stringify(data);

    // try to parse JSON out of model; fallback to raw
    let suggestion = text;
    try {
      const parsed = JSON.parse(text);
      suggestion = parsed.suggestion || text;
    } catch (_) { /* not JSON */ }

    res.status(200).json({ suggestion });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "AI request failed", detail: err.message });
  }
}
