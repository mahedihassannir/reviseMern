
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA1ggzNiLDoMVdyfFr_g0VhDM0_m7uqW9E",
    authDomain: "modulenai.firebaseapp.com",
    projectId: "modulenai",
    storageBucket: "modulenai.appspot.com",
    messagingSenderId: "399281654092",
    appId: "1:399281654092:web:d6d0d7d265b8f3e4a067e9",
    measurementId: "G-B8JQ2NXK0T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);



export default app