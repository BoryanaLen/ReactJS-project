import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCbXmTWArbNMT9Fhi5PkGC_raqC2vEQ7bs",
  authDomain: "hrsmartsystem-ac780.firebaseapp.com",
  projectId: "hrsmartsystem-ac780",
  storageBucket: "hrsmartsystem-ac780.appspot.com",
  messagingSenderId: "235485384133",
  appId: "1:235485384133:web:27b6695a53427c1a478fac",
  measurementId: "G-9N7BVEDCNJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default !app.length ? app.initializeApp(firebaseConfig) : app()