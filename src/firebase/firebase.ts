// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "quantumgym-cecdc.firebaseapp.com",
  projectId: "quantumgym-cecdc",
  storageBucket: "quantumgym-cecdc.appspot.com",
  messagingSenderId: "530386852072",
  appId: "1:530386852072:web:59e415767244ae42cc515d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);