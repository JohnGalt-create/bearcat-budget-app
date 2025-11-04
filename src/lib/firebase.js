// src/lib/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDrwg5OM3Q8e9gZxT2POIqxLzVFPdUwRCA",
  authDomain: "bearcat-budget.firebaseapp.com",
  projectId: "bearcat-budget",
  storageBucket: "bearcat-budget.firebasestorage.app",
  messagingSenderId: "71815663985",
  appId: "1:71815663985:web:3760b9502ad6fd35e5e6d0"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
