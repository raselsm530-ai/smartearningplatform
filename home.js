// Load Firebase DB functions
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

// load Firebase app instance (already initialized in firebase-config.js)
const db = getDatabase();

// When page loads
window.onload = async function () {

    let phone = localStorage.getItem("currentUser");

    if (!phone) {
        alert("দয়া করে লগইন করুন!");
        window.location.href = "login.html";
        return;
    }

    document.getElementById("welcomeText").textContent = "স্বাগতম, " + phone;

    try {
        const userRef = ref(db, "users/" + phone);
        const snapshot = await get(userRef);

        if (snapshot.exists()) {
            const data = snapshot.val();
            document.getElementById("balance").textContent = data.balance + " ৳";

        } else {
            document.getElementById("balance").textContent = "0 ৳";
        }

    } catch (error) {
        console.log(error);
        alert("ইন্টারনেট বা সার্ভার সমস্যা!");
    }
};

// Logout
function logoutUser() {
    localStorage.removeItem("currentUser");
    alert("লগআউট সফল!");
    window.location.href = "login.html";
}