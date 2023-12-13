// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDIFynANH_DDLHrY2KcVyCgnK_tKEFBt6I",
    authDomain: "movies-cc185.firebaseapp.com",
    projectId: "movies-cc185",
    storageBucket: "movies-cc185.appspot.com",
    messagingSenderId: "508911488525",
    appId: "1:508911488525:web:0292956d37acbc66aa4f44",
    measurementId: "G-1DK0QYLHY0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db }