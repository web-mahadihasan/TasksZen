// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAtuFOOIEZ1uygzW0aQmC-AHDGMkfWm_Bk",
  authDomain: "flavorscape-bd.firebaseapp.com",
  projectId: "flavorscape-bd",
  storageBucket: "flavorscape-bd.firebasestorage.app",
  messagingSenderId: "875051873421",
  appId: "1:875051873421:web:f85c7fe02853b5760e1ec4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;