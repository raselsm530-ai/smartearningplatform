import { auth, db } from "./firebase-config.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { ref, set, get, child } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

window.register = async () => {

    const phone = document.getElementById("phone").value.trim();
    const pass = document.getElementById("password").value.trim();

    if (phone.length !== 11 || !phone.startsWith("01")) {
        alert("সঠিক ১১ সংখ্যার মোবাইল নম্বর দিন");
        return;
    }

    if (pass.length < 4) {
        alert("পাসওয়ার্ড কমপক্ষে ৪ অক্ষর হতে হবে");
        return;
    }

    const email = phone + "@app.com";

    // check if already exists in db
    const dbRef = ref(db);

    const snap = await get(child(dbRef, "users/" + phone));

    if (snap.exists()) {
        alert("এই নম্বরে ইতোমধ্যে অ্যাকাউন্ট আছে");
        return;
    }

    createUserWithEmailAndPassword(auth, email, pass)
        .then(user => {

            set(ref(db, "users/" + phone), {
                phone: phone,
                password: pass,
                balance: 0,
                joined: new Date().toLocaleString()
            });

            alert("রেজিস্ট্রেশন সফল 🎉");
            location.href = "login.html";
        })
        .catch(err => {
            alert("Error: " + err.message);
        });
};