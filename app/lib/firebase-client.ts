import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAIpCVN91-r6TfdSVkyiHGTYm0FiKPDCWY",
  authDomain: "hw3digifab.firebaseapp.com",
  databaseURL: "https://hw3digifab-default-rtdb.firebaseio.com",
  projectId: "hw3digifab",
  storageBucket: "hw3digifab.appspot.com",
  messagingSenderId: "966746820151",
  appId: "1:966746820151:web:c4b1d769b68b680ba5f9b2",
  measurementId: "G-2T24603TZE",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
