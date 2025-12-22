import { auth } from "./firebase-config.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";

window.login = () => {
    const phone = document.getElementById("phone").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!phone || !password) { alert("সব ঘর পূরণ করুন"); return; }

    const email = phone + "@app.com";

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        localStorage.setItem("currentUser", phone);
        alert("লগইন সফল!");
        location.href = "home.html";
    })
    .catch((error) => {
        alert("লগইন ব্যর্থ: ভুল নম্বর বা পাসওয়ার্ড");
    });
};
