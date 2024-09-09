// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  // apiKey: "AIzaSyCmpotvYVHLxJmkaomZoJAn7Sx2E_8Qaac",
  // authDomain: "projet-final-ajc.firebaseapp.com",
  // projectId: "projet-final-ajc",
  // storageBucket: "projet-final-ajc.appspot.com",
  // messagingSenderId: "1076149792125",
  // appId: "1:1076149792125:web:9ba8c2096567a094703014"
  apiKey: "AIzaSyD4CG0phJ0hheY47-vkKCHSgZMXgKTooKk",
  authDomain: "projet-final-ajc-2.firebaseapp.com",
  projectId: "projet-final-ajc-2",
  storageBucket: "projet-final-ajc-2.appspot.com",
  messagingSenderId: "1088748171230",
  appId: "1:1088748171230:web:28be227b73d4eeb23db74f"
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);

// Initialiser Firestore et Auth
const db = getFirestore(app);

const auth = getAuth(app);

export { db, auth };