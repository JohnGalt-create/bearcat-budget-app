// src/screens/AddExpenseScreen.js
import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../lib/firebase";

export default function AddExpenseScreen({ navigation }) {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("food");
  const [note, setNote] = useState("");

  async function save() {
    const amt = parseFloat(amount);
    if (isNaN(amt)) return Alert.alert("Enter a valid amount");
    try {
      await addDoc(collection(db, "expenses"), {
        uid: "user1",
        amount: amt,
        category,
        note,
        createdAt: serverTimestamp()
      });
      Alert.alert("Saved");
      navigation.goBack();
    } catch (err) {
      console.error(err);
      Alert.alert("Error saving expense");
    }
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text>Amount</Text>
      <TextInput value={amount} onChangeText={setAmount} keyboardType="numeric" style={{borderWidth:1, padding:8, marginBottom:12}} />
      <Text>Category</Text>
      <TextInput value={category} onChangeText={setCategory} style={{borderWidth:1, padding:8, marginBottom:12}} />
      <Text>Note</Text>
      <TextInput value={note} onChangeText={setNote} style={{borderWidth:1, padding:8, marginBottom:12}} />
      <Button title="Save Expense" onPress={save} />
    </View>
  );
}
