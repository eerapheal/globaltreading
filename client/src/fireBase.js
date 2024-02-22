import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "globaltreadings.firebaseapp.com",
  projectId: "globaltreadings",
  storageBucket: "globaltreadings.appspot.com",
  messagingSenderId: "713265315335",
  appId: "1:713265315335:web:f3601508188034d05cb4a2"
};

export const app = initializeApp(firebaseConfig);
