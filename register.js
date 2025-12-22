import { auth, db } from "./firebase-config.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { ref, set } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

window.register = () => {

    const phone = document.getElementById("phone").value.trim();
    const pass = document.getElementById("password").value.trim();
    const cpass = document.getElementById("cpassword").value.trim();
    const pin = document.getElementById("pin").value.trim();
    const refer = document.getElementById("refer").value.trim();

    if (phone === "" || pass === "" || cpass === "" || pin === "") {
        alert("⚠ সব ঘর পূরণ করুন");
        return;
    }

    if (pass !== cpass) {
        alert("❌ পাসওয়ার্ড মিলছে না");
        return;
    }

    if (pin.length !== 4) {
        alert("❌ পিন অবশ্যই ৪ ডিজিট হতে হবে");
        return;
    }

    const email = phone + "@app.com";

    createUserWithEmailAndPassword(auth, email, pass)
        .then(() => {

            set(ref(db, "users/" + phone), {
                phone,
                password: pass,
                pin,
                refer: refer || "NONE",
                balance: 0,
                joined: new Date().toLocaleString()
            });

            alert("🎉 রেজিস্ট্রেশন সফল!");

            location.href = "login.html";
        })
        .catch(err => {
            alert("❌ " + err.message);
        });
};