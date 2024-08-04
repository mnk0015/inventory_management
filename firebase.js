// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDthQBF9U5HBxhmCs9CSTkqvJDqX0l6PCc",
  authDomain: "inventory-mangement-d0756.firebaseapp.com",
  projectId: "inventory-mangement-d0756",
  storageBucket: "inventory-mangement-d0756.appspot.com",
  messagingSenderId: "903468470088",
  appId: "1:903468470088:web:bbe33a2c27e9d0f7ff2d7d",
  measurementId: "G-6V6DN2C6KG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);

export {firestore};