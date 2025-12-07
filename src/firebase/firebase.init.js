// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDBNCB1ooDoVR_yvoaa253xbi04HlbtS5s",
  authDomain: "textila-garments.firebaseapp.com",
  projectId: "textila-garments",
  storageBucket: "textila-garments.firebasestorage.app",
  messagingSenderId: "490718687592",
  appId: "1:490718687592:web:422a365cdc4e5e1f8ba6dd",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
