import { auth } from "./firebase-config.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

window.login = function() {
    const phone = document.getElementById("phone").value.trim();
    const password = document.getElementById("password").value.trim();
    const email = phone + "@app.com";

    if (!phone || !password) {
        alert("সব ঘর পূরণ করুন");
        return;
    }

    signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            localStorage.setItem("user", phone); // লগইন স্টেট ধরে রাখা
            alert("লগইন সফল 🎉");
            window.location.href = "home.html";
        })
        .catch(err => {
            alert("❌ লগইন ব্যর্থ: ভুল নম্বর বা পাসওয়ার্ড");
        });
};
