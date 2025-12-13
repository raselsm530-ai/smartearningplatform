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

if (!currentPhone) {
    alert("ইউজার পাওয়া যায়নি!");
    window.location.href = "login.html";
}

let userData = JSON.parse(localStorage.getItem(currentPhone));

if (!userData) {
    alert("ইউজার ডাটা পাওয়া যায়নি!");
    window.location.href = "login.html";
}

/* =========================
   টাকা যোগ ফাংশন
========================= */
function addMoney() {
    let amountInput = document.getElementById("amount");
    let amount = Number(amountInput.value);

    /* ভ্যালিডেশন */
    if (!amount || amount <= 0) {
        alert("সঠিক টাকার পরিমাণ লিখুন!");
        return;
    }

    /* ব্যালেন্স না থাকলে 0 সেট */
    if (userData.balance === undefined) {
        userData.balance = 0;
    }

    /* ব্যালেন্স যোগ */
    userData.balance += amount;

    /* লেনদেন হিস্টরি না থাকলে তৈরি */
    if (!userData.transactions) {
        userData.transactions = [];
    }

    userData.transactions.push({
        type: "add",
        amount: amount,
        time: new Date().toLocaleString()
    });

    /* LocalStorage আপডেট */
    localStorage.setItem(currentPhone, JSON.stringify(userData));

    alert("✅ টাকা সফলভাবে যোগ হয়েছে!");

    /* ইনপুট খালি */
    amountInput.value = "";

    /* হোমে পাঠানো */
    window.location.href = "home.html";
}
