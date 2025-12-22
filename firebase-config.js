import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCH_qTmU7QIUC4RKoYEX7QaXpPUNSN8mBI",
  authDomain: "smart-earning-platform-bd.firebaseapp.com",
  databaseURL: "https://smart-earning-platform-bd-default-rtdb.firebaseio.com",
  projectId: "smart-earning-platform-bd",
  storageBucket: "smart-earning-platform-bd.firebasestorage.app",
  messagingSenderId: "1076796437288",
  appId: "1:1076796437288:web:b6a6497cf4795dc3c0561d",
  measurementId: "G-ZQ5BT4LT2D"
};

export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);