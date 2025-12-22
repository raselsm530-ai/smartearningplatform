import { auth } from "./firebase-config.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

const login = () => {

    const phone = document.getElementById("phone").value.trim();
    const pass = document.getElementById("password").value.trim();

    const email = phone + "@app.com";

    signInWithEmailAndPassword(auth, email, pass)
        .then(() => {
            localStorage.setItem("user", phone);
            alert("লগইন সফল!");
            location.href = "home.html";
        })
        .catch(err => {
            alert("Error: " + err.message);
        });
};

window.login = login;