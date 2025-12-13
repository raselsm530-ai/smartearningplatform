/* =========================
   লগইন চেক
========================= */
if (localStorage.getItem("loggedIn") !== "true") {
    window.location.href = "login.html";
}

/* =========================
   বর্তমান ইউজার লোড
========================= */
let currentPhone = localStorage.getItem("currentUser");

if (!currentPhone) {
    alert("লগইন তথ্য পাওয়া যায়নি!");
    window.location.href = "login.html";
}

let userData = JSON.parse(localStorage.getItem(currentPhone));

if (!userData) {
    alert("ইউজার পাওয়া যায়নি! আবার লগইন করুন।");
    window.location.href = "login.html";
}

/* =========================
   ওয়েলকাম টেক্সট
========================= */
document.getElementById("welcomeText").innerText =
    `স্বাগতম, ${userData.phone} 🎉`;

/* =========================
   ব্যালেন্স দেখানো
========================= */
if (userData.balance === undefined) {
    userData.balance = 0;
    localStorage.setItem(currentPhone, JSON.stringify(userData));
}

document.getElementById("balanceText").innerText =
    userData.balance + " ৳";

/* =========================
   লগআউট
========================= */
function logoutUser() {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
}
