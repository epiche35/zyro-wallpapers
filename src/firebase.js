import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBj5OUM-vKsOkZo1RbHdtClz91n12X0iQg",
  authDomain: "zyrowallpapers.firebaseapp.com",
  projectId: "zyrowallpapers",
  storageBucket: "zyrowallpapers.firebasestorage.app",
  messagingSenderId: "919712056032",
  appId: "1:919712056032:web:6fa240e643974594be8685",
  measurementId: "G-V1PYMD04W0"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);