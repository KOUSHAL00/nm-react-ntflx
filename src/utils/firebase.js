// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCC3BRYbXqkfSo5UrPs3Kj3N2QjQXHskew",
  authDomain: "netflix-clone-d8560.firebaseapp.com",
  projectId: "netflix-clone-d8560",
  storageBucket: "netflix-clone-d8560.firebasestorage.app",
  messagingSenderId: "274617480173",
  appId: "1:274617480173:web:8db3a11cf9edea2f926de4",
  measurementId: "G-7NG6521P7T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics= getAnalytics(app);
getAnalytics(app);
export const auth = getAuth(app);