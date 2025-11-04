import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.EXPO_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Only for testing in browser
});

export async function getAIFeedback(spendingSummary) {
  try {
    const prompt = `
    Analyze this student's spending habits and provide 2 actionable tips for saving money:
    ${JSON.stringify(spendingSummary)}
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    return response.choices[0].message.content;
  } catch (err) {
    console.error("AI Feedback Error:", err);
    return "Unable to generate feedback right now.";
  }
}
