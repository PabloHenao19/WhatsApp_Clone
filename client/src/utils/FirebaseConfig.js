import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"


const firebaseConfig = {
    apiKey: "AIzaSyCv4LXuACdSFPsTLm8lByUZdtK7f4hfUY0",
    authDomain: "my-first-project-chat-4dac5.firebaseapp.com",
    projectId: "my-first-project-chat-4dac5",
    storageBucket: "my-first-project-chat-4dac5.appspot.com",
    messagingSenderId: "618230606632",
    appId: "1:618230606632:web:6563ff5879286fb623be1d",
    measurementId: "G-PY0JMK4ME1"
};

const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
