/* =========================
   লগইন চেক
========================= */
if (localStorage.getItem("loggedIn") !== "true") {
    window.location.href = "login.html";
}

/* =========================
   ইউজার লোড
========================= */
let currentPhone = localStorage.getItem("currentUser");
let userData = JSON.parse(localStorage.getItem(currentPhone));

if (!userData) {
    alert("ইউজার পাওয়া যায়নি! আবার লগইন করুন।");
    window.location.href = "login.html";
}

/* =========================
   Deposit Function
========================= */
function depositMoney() {
    let amount = parseInt(document.getElementById("depositAmount").value);

    if (!amount || amount <= 0) {
        alert("সঠিক ডিপোজিট এমাউন্ট লিখুন!");
        return;
    }

    /* ব্যালেন্স না থাকলে 0 ধরবে */
    if (!userData.balance) {
        userData.balance = 0;
    }

    /* ব্যালেন্স যোগ */
    userData.balance += amount;

    /* ট্রানজেকশন হিস্টরি */
    if (!userData.transactions) {
        userData.transactions = [];
    }

    userData.transactions.push({
        type: "Deposit",
        amount: amount,
        date: new Date().toLocaleString()
    });

    /* সেভ */
    localStorage.setItem(currentPhone, JSON.stringify(userData));

    alert("ডিপোজিট সফল হয়েছে ✅");

    document.getElementById("depositAmount").value = "";

    window.location.href = "home.html";
}
