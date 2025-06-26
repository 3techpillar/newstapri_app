
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyBd48HY3S_JwpcUbdOh-MVkN3aTK2695LQ",
  authDomain: "newstapri-9ad1c.firebaseapp.com",
  projectId: "newstapri-9ad1c",
  storageBucket: "newstapri-9ad1c.appspot.com",
  messagingSenderId: "433385556397",
  appId: "1:433385556397:web:04449538e763a23d427924",
  measurementId: "G-47PLJ8M5PZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
 export const auth=getAuth(app)