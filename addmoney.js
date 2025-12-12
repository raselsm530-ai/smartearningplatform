function addMoney() {

    let amount = document.getElementById("amount").value.trim();
    let currentUser = localStorage.getItem("currentUser");

    if (!amount || amount <= 0) {
        alert("সঠিক টাকা লিখুন!");
        return;
    }

    let userData = JSON.parse(localStorage.getItem(currentUser));

    // আগের ব্যালেন্স থাকলে নিও, না থাকলে 0
    let oldBalance = userData.balance ? userData.balance : 0;

    let newBalance = parseInt(oldBalance) + parseInt(amount);
    userData.balance = newBalance;

    // ইউজার আপডেট সেভ করা
    localStorage.setItem(currentUser, JSON.stringify(userData));

    // ট্রান্সাকশন হিস্টোরি সংরক্ষণ
    let history = JSON.parse(localStorage.getItem(currentUser + "_history")) || [];

    history.push({
        type: "Add Money",
        amount: amount,
        time: new Date().toLocaleString()
    });

    localStorage.setItem(currentUser + "_history", JSON.stringify(history));

    alert("টাকা Add হয়েছে!");
    window.location.href = "home.html";
}
