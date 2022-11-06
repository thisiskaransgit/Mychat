import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDOMMr1WoESEuObOd-aa952dhMvWxFU36c",

  authDomain: "mychat-e7d20.firebaseapp.com",

  projectId: "mychat-e7d20",

  storageBucket: "mychat-e7d20.appspot.com",

  messagingSenderId: "326893536620",

  appId: "1:326893536620:web:5dd567574e6956ec8fdf49",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
