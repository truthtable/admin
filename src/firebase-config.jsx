import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBiLr7NLX4cqwq5qRry7Ym7GIMAk8lGyrU",
  authDomain: "shriram-distributors.firebaseapp.com",
  databaseURL:
    "https://shriram-distributors-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "shriram-distributors",
  storageBucket: "shriram-distributors.appspot.com",
  messagingSenderId: "306107127071",
  appId: "1:306107127071:web:a1d614d56a90615b88cc2a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const realTimeDB = getDatabase(app);
