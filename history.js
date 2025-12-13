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
   হিস্টরি দেখানো
========================= */
let historyList = document.getElementById("historyList");

/* যদি কোনো ট্রানজেকশন না থাকে */
if (!userData.transactions || userData.transactions.length === 0) {
    historyList.innerHTML = "<p style='text-align:center;'>কোনো লেনদেন পাওয়া যায়নি</p>";
} else {

    /* সর্বশেষ লেনদেন আগে দেখাবে */
    userData.transactions.slice().reverse().forEach(tx => {

        let div = document.createElement("div");
        div.className = "menu-card";

        let typeText = tx.type === "Withdraw" ? "উত্তোলন" : tx.type;

        div.innerHTML = `
            <h4>${typeText}</h4>
            <p>পরিমাণ: ${tx.amount} ৳</p>
            <p>${tx.date}</p>
        `;

        historyList.appendChild(div);
    });
}

/* =========================
   হোমে ফেরত যাওয়া
========================= */
function goHome() {
    window.location.href = "home.html";
}
