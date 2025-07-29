import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDCaWxQvneCeudbmtgY6b6Kds0BT6G_2ZQ",
  authDomain: "ian-app-e3c66.firebaseapp.com",
  projectId: "ian-app-e3c66",
  storageBucket: "ian-app-e3c66.firebasestorage.app",
  messagingSenderId: "611068200698",
  appId: "1:611068200698:web:7fffc8a5027bea2a5d6b43"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);