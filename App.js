import React, { useState, useEffect } from "react";
import { Text, View, TextInput, Button, FlatList } from "react-native";
import { db } from "./firebase";
import { collection, addDoc, getDocs, query, orderBy } from "firebase/firestore";
import { getAIFeedback } from "./app/utils/aiFeedback";

export default function App() {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [feedback, setFeedback] = useState("");

  async function addExpense() {
    if (!amount || !category) return;
    await addDoc(collection(db, "expenses"), {
      amount: parseFloat(amount),
      category,
      createdAt: new Date()
    });
    setAmount("");
    setCategory("");
    fetchExpenses();
  }

  async function fetchExpenses() {
    const q = query(collection(db, "expenses"), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map(doc => doc.data());
    setExpenses(data);

    // Generate AI feedback
    const summary = data.reduce((acc, e) => {
      acc[e.category] = (acc[e.category] || 0) + e.amount;
      return acc;
    }, {});
    const tips = await getAIFeedback(summary);
    setFeedback(tips);
  }

  useEffect(() => { fetchExpenses(); }, []);

  return (
    <View style={{ padding: 20, maxWidth: 600, margin: "auto" }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>🐻 Bearcat Budget</Text>

      <TextInput
        placeholder="Amount"
        value={amount}
        onChangeText={setAmount}
        style={{ borderWidth: 1, marginVertical: 8, padding: 8 }}
      />
      <TextInput
        placeholder="Category (food, rent, etc.)"
        value={category}
        onChangeText={setCategory}
        style={{ borderWidth: 1, marginVertical: 8, padding: 8 }}
      />
      <Button title="Add Expense" onPress={addExpense} />

      <FlatList
        data={expenses}
        keyExtractor={(item, i) => i.toString()}
        renderItem={({ item }) => (
          <Text>{item.category}: ${item.amount.toFixed(2)}</Text>
        )}
      />

      <View style={{ marginTop: 20 }}>
        <Text style={{ fontWeight: "bold" }}>💡 AI Feedback:</Text>
        <Text>{feedback}</Text>
      </View>
    </View>
  );
}
