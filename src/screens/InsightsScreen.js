// src/screens/InsightsScreen.js
import React, { useState } from "react";
import { View, Text, Button, ActivityIndicator } from "react-native";
import { getAiSuggestion } from "../lib/api";

export default function InsightsScreen() {
  const [loading, setLoading] = useState(false);
  const [suggestion, setSuggestion] = useState(null);

  async function askAi() {
    setLoading(true);
    try {
      const res = await getAiSuggestion("user1", {
        short: "User has weekly budget $200, spent $180 on food+entertainment"
      });
      setSuggestion(res.suggestion || "No suggestion returned");
    } catch (err) {
      setSuggestion("Error getting suggestion");
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 20 }}>AI Insights</Text>
      <Button title="Get suggestion" onPress={askAi} />
      {loading && <ActivityIndicator />}
      {suggestion && (
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontWeight: "bold" }}>Suggestion</Text>
          <Text>{suggestion}</Text>
        </View>
      )}
    </View>
  );
}
