import { auth, db } from "./firebase-config.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { set, ref } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

window.register = async function () {

    const phone = document.getElementById("phone").value;
    const password = document.getElementById("password").value;
    const cpassword = document.getElementById("cpassword").value;
    const pin = document.getElementById("pin").value;
    const refer = document.getElementById("refer").value;

    if (!phone || !password || !cpassword || !pin) {
        alert("সব ঘর পূরণ করুন!");
        return;
    }

    if (password !== cpassword) {
        alert("পাসওয়ার্ড মেলেনি!");
        return;
    }

    try {

        // Trick: email format বানানোর জন্য
        const fakeEmail = phone + "@example.com";

        const userCred = await createUserWithEmailAndPassword(auth, fakeEmail, password);

        const uid = userCred.user.uid;

        await set(ref(db, "users/" + uid), {
            phone: phone,
            password: password,
            pin: pin,
            refer: refer,
            balance: 0
        });

        alert("রেজিস্ট্রেশন সফল!");
        window.location.href = "login.html";

    } catch (error) {
        alert("Error: " + error.message);
    }
}