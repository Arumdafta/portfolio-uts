import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDN3TCp3vAapBp8FPLrz5t2NuiXMYtxWms",
  authDomain: "portfolio-arum-701c1.firebaseapp.com",
  databaseURL: "https://portfolio-arum-701c1-default-rtdb.firebaseio.com",
  projectId: "portfolio-arum-701c1",
  storageBucket: "portfolio-arum-701c1.firebasestorage.app",
  messagingSenderId: "91905461529",
  appId: "1:91905461529:web:7bcc1d47d0cdc36d760988",
  measurementId: "G-2HDGREV43J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db };