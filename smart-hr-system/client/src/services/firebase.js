import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA_ssmce0tsDmen2emgKXw6uFF9saMRGWE",
  authDomain: "hr-smart-system.firebaseapp.com",
  databaseURL: "https://hr-smart-system-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "hr-smart-system",
  storageBucket: "hr-smart-system.appspot.com",
  messagingSenderId: "883806150359",
  appId: "1:883806150359:web:72df4168c9c2965ab75a92"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
