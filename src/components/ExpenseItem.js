// src/components/ExpenseItem.js
import React from "react";
import { View, Text } from "react-native";

export default function ExpenseItem({ expense }) {
  return (
    <View style={{ padding: 8, borderBottomWidth: 1 }}>
      <Text>{expense.category} — ${expense.amount}</Text>
      <Text style={{ color: "#666" }}>{expense.note || ""}</Text>
    </View>
  );
}
