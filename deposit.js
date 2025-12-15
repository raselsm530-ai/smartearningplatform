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
    let trxId = document.getElementById("trxId").value.trim();

    if (!amount || amount <= 0) {
        alert("সঠিক ডিপোজিট এমাউন্ট লিখুন!");
        return;
    }

    if (!trxId) {
        alert("Transaction ID দিন!");
        return;
    }

    /* ব্যালেন্স সেট */
    if (!userData.balance) {
        userData.balance = 0;
    }

    userData.balance += amount;

    /* ট্রানজেকশন হিস্টরি */
    if (!userData.transactions) {
        userData.transactions = [];
    }

    userData.transactions.push({
        type: "Deposit",
        amount: amount,
        trxId: trxId,
        date: new Date().toLocaleString()
    });

    /* লোকালস্টোরেজে সেভ */
    localStorage.setItem(currentPhone, JSON.stringify(userData));

    alert("ডিপোজিট সফল হয়েছে ✅");

    /* ইনপুট ক্লিয়ার */
    document.getElementById("depositAmount").value = "";
    document.getElementById("trxId").value = "";

    /* হোমে পাঠানো */
    window.location.href = "home.html";
}
