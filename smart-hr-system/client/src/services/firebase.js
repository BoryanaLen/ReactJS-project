import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyBd8PLAUtKRvMlbc7O-V8_Yrpwd2IlRiz8",
    authDomain: "smart-hr-system-104d5.firebaseapp.com",
    projectId: "smart-hr-system-104d5",
    storageBucket: "smart-hr-system-104d5.appspot.com",
    messagingSenderId: "432383864132",
    appId: "1:432383864132:web:03569747f7a64a48f17b11"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export  {
    app,
    auth
};
