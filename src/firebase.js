// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCfZ7PlR6JQAiTyePhQtQbJhn0qK4lZJyc",
  authDomain: "ten-days-tracker.firebaseapp.com",
  projectId: "ten-days-tracker",
  storageBucket: "ten-days-tracker.appspot.com",
  messagingSenderId: "645173474205",
  appId: "1:645173474205:web:7979b69a2428608d0b7574",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
