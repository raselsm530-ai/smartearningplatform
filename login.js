import { auth } from "./firebase-config.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";

window.login = function () {
    let phone = document.getElementById("phone").value;
    let pass = document.getElementById("password").value;

    let email = phone + "@smart.com";

    signInWithEmailAndPassword(auth, email, pass)
        .then(() => {
            alert("লগইন সফল!");
            window.location.href = "dashboard.html";
        })
        .catch((err) => {
            alert(err.message);
        });
};