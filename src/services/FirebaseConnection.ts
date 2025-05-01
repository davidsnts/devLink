import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBvru0EN7vPE7teqRz6bRpEU-k1ZOW5Nmk",
  authDomain: "reactlinks-cb683.firebaseapp.com",
  projectId: "reactlinks-cb683",
  storageBucket: "reactlinks-cb683.firebasestorage.app",
  messagingSenderId: "1037900967173",
  appId: "1:1037900967173:web:c198e20053d55a7ff39b6c"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };