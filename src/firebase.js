// firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDNzRHt4iuRDkZE8TECCk1CLQCTMmGLdzk",
  authDomain: "astroboardgame.firebaseapp.com",
  databaseURL: "https://astroboardgame-default-rtdb.firebaseio.com",
  projectId: "astroboardgame",
  storageBucket: "astroboardgame.appspot.com",
  messagingSenderId: "355264324961",
  appId: "1:355264324961:web:0c720c1b25bf0359895120",
  measurementId: "G-0SNDJTTHDD"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
