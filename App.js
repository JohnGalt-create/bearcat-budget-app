// App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/screens/HomeScreen";
import AddExpenseScreen from "./src/screens/AddExpenseScreen";
import InsightsScreen from "./src/screens/InsightsScreen";
import LeaderboardScreen from "./src/screens/LeaderboardScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Bearcat Budget" }} />
        <Stack.Screen name="AddExpense" component={AddExpenseScreen} options={{ title: "Add Expense" }} />
        <Stack.Screen name="Insights" component={InsightsScreen} options={{ title: "AI Insights" }} />
        <Stack.Screen name="Leaderboard" component={LeaderboardScreen} options={{ title: "Leaderboard" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
