// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDvyStrSv5V9Y8MsnN8AeRYgnYhaZUHSD0",
  authDomain: "makeup-app-b54f0.firebaseapp.com",
  projectId: "makeup-app-b54f0",
  storageBucket: "makeup-app-b54f0.appspot.com",
  messagingSenderId: "611691692940",
  appId: "1:611691692940:web:d1cff88c347ab9b33f8ca9",
  measurementId: "G-FYJYZSSG3D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);