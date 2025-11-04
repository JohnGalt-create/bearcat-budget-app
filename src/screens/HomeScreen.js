// src/screens/HomeScreen.js
import React, { useEffect, useState } from "react";
import { View, Text, Button, FlatList, TouchableOpacity } from "react-native";
import { db } from "../lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import ExpenseItem from "../components/ExpenseItem";
import { computeWeeklyPoints } from "../lib/gamification";

export default function HomeScreen({ navigation }) {
  const [expenses, setExpenses] = useState([]);
  const [budget, setBudget] = useState(200); // sample weekly budget
  const [points, setPoints] = useState(0);

  useEffect(() => {
    // For prototype: fetch expenses for "user1" from Firestore
    async function fetchExpenses() {
      try {
        const q = query(collection(db, "expenses")); // filter by uid in production
        const snap = await getDocs(q);
        const list = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        setExpenses(list);
        const spent = list.reduce((s, e) => s + (e.amount || 0), 0);
        setPoints(computeWeeklyPoints(spent, budget));
      } catch (err) {
        console.error(err);
      }
    }
    fetchExpenses();
  }, []);

  const totalSpent = expenses.reduce((s, e) => s + (e.amount || 0), 0);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>Bearcat Budget</Text>
      <Text>Weekly Budget: ${budget}</Text>
      <Text>Spent this week: ${totalSpent}</Text>
      <Text>Bear Points: {points}</Text>

      <Button title="Add Expense" onPress={() => navigation.navigate("AddExpense")} />
      <Button title="See AI Insights" onPress={() => navigation.navigate("Insights")} />
      <Button title="Leaderboard" onPress={() => navigation.navigate("Leaderboard")} />

      <Text style={{ marginTop: 20, fontSize: 18 }}>Recent Expenses</Text>
      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ExpenseItem expense={item} />}
        ListEmptyComponent={<Text>No expenses yet</Text>}
      />
    </View>
  );
}
