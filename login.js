import { auth } from "./firebase-config.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";

document.getElementById("loginForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const phone = document.getElementById("phone").value;
    const pass = document.getElementById("password").value;
    const email = phone + "@gmail.com";

    signInWithEmailAndPassword(auth, email, pass)
        .then(() => {
            alert("Login Successful!");
            window.location.href = "home.html";
        })
        .catch((error) => {
            alert(error.message);
        });
});