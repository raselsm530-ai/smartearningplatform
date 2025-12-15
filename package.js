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
   Buy Package Function
========================= */
function buyPackage(price) {

    /* ব্যালেন্স না থাকলে 0 */
    if (!userData.balance) {
        userData.balance = 0;
    }

    /* ব্যালেন্স চেক */
    if (userData.balance < price) {
        alert("পর্যাপ্ত ব্যালেন্স নেই!");
        return;
    }

    /* ব্যালেন্স কাট */
    userData.balance -= price;

    /* প্যাকেজ হিস্টরি */
    if (!userData.packages) {
        userData.packages = [];
    }

    userData.packages.push({
        price: price,
        date: new Date().toLocaleString()
    });

    /* ট্রানজেকশন হিস্টরি */
    if (!userData.transactions) {
        userData.transactions = [];
    }

    userData.transactions.push({
        type: "Package Buy",
        amount: price,
        date: new Date().toLocaleString()
    });

    /* লোকালস্টোরেজে সেভ */
    localStorage.setItem(currentPhone, JSON.stringify(userData));

    alert("প্যাকেজ সফলভাবে কেনা হয়েছে 🎉");

    window.location.href = "home.html";
}
