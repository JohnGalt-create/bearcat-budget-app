// src/lib/api.js
import axios from "axios";

// set this to your deployed Vercel API base, e.g. https://your-vercel.app
const API_BASE = "https://<YOUR_VERCEL_DOMAIN>";

export async function getAiSuggestion(userId, context) {
  try {
    const res = await axios.post(`${API_BASE}/api/ai`, {
      userId,
      context
    });
    return res.data; // expected: { suggestion: "...", scoreDelta: 10 }
  } catch (err) {
    console.error("AI API error", err?.response?.data || err.message);
    throw err;
  }
}
