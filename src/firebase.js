import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDUUGelzt4vt93J2jR-US17ZWXP7XSwLyc",
  authDomain: "days-tracker-6c778.firebaseapp.com",
  projectId: "days-tracker-6c778",
  storageBucket: "days-tracker-6c778.appspot.com",
  messagingSenderId: "962586790906",
  appId: "1:962586790906:web:11864c75419fcd2f6cf243",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const auth = firebase.auth();

export { db, auth };
