import { auth } from "./firebase-config.js";
import { signInWithEmailAndPassword, onAuthStateChanged } 
from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

window.login = async function () {

    const phone = document.getElementById("phone").value.trim();
    const pass = document.getElementById("password").value.trim();

    if (!phone || !pass) {
        alert("সব ঘর পূরণ করুন");
        return;
    }

    const email = phone + "@app.com";

    try {
        await signInWithEmailAndPassword(auth, email, pass);
        localStorage.setItem("user", phone);
        window.location.href = "home.html";
    } catch (err) {
        alert("ভুল নাম্বার বা পাসওয়ার্ড");
    }
};

// 🔒 Login loop FIX
onAuthStateChanged(auth, user => {
    if (user && localStorage.getItem("user")) {
        if (location.pathname.includes("login")) {
            location.href = "home.html";
        }
    }
});