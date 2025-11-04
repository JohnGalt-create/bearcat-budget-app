// src/screens/LeaderboardScreen.js
import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "../lib/firebase";

export default function LeaderboardScreen() {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    async function load() {
      const q = query(collection(db, "users"), orderBy("points", "desc"), limit(20));
      const snap = await getDocs(q);
      setLeaders(snap.docs.map(d => d.data()));
    }
    load();
  }, []);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 20 }}>Leaderboard</Text>
      <FlatList
        data={leaders}
        keyExtractor={(item, idx) => idx.toString()}
        renderItem={({ item, index }) => (
          <View style={{ padding: 8, borderBottomWidth: 1 }}>
            <Text>{item.name || "Anonymous"} — {item.points || 0} pts</Text>
          </View>
        )}
      />
    </View>
  );
}
