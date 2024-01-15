// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDUUGelzt4vt93J2jR-US17ZWXP7XSwLyc",
  authDomain: "days-tracker-6c778.firebaseapp.com",
  projectId: "days-tracker-6c778",
  storageBucket: "days-tracker-6c778.appspot.com",
  messagingSenderId: "962586790906",
  appId: "1:962586790906:web:11864c75419fcd2f6cf243",
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const auth = getAuth();
//export const storage = firebase.storage();
