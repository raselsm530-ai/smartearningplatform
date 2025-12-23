import { db } from "./firebase-config.js";
import { ref, onValue, get } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

// --------------------
// Login Check
// --------------------
const user = localStorage.getItem("user");
if(!user) {
    alert("দয়া করে লগইন করুন");
    location.href = "login.html";
}

// --------------------
// Show Username
// --------------------
document.getElementById("username").innerText = user;

// --------------------
// Real-time Balance Update
// --------------------
const balanceEl = document.getElementById("balance");
const userRef = ref(db, `users/${user}`);

onValue(userRef, snapshot => {
    const data = snapshot.val();
    const balance = data?.balance || 0;
    balanceEl.innerText = balance;
});

// --------------------
// Button Actions
// --------------------
window.goToWallet = function() {
    location.href = "wallet.html";
}

window.goToPackages = function() {
    location.href = "packages.html"; // যদি প্যাকেজ পেজ আছে
}

window.logout = function() {
    localStorage.removeItem("user");
    location.href = "login.html";
}