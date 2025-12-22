import { db } from "./firebase-config.js";
import { ref, push } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

const fixedNumbers = {
    bkash: "01797632229",
    nagad: "01797632229",
    rocket: "01797632229"
};

let selectedAmount = 0;
let selectedMethod = "";

window.selectAmount = (amount) => {
    selectedAmount = amount;

    // Auto random method if not selected
    if (!selectedMethod) {
        const methods = Object.keys(fixedNumbers);
        selectedMethod = methods[Math.floor(Math.random() * methods.length)];
        document.getElementById(selectedMethod).classList.add("active");
    }

    document.getElementById("paymentNumber").innerText = fixedNumbers[selectedMethod];
};

window.selectMethod = (method) => {
    selectedMethod = method;

    // Highlight selected
    Object.keys(fixedNumbers).forEach(m => {
        const el = document.getElementById(m);
        if (m === method) el.classList.add("active");
        else el.classList.remove("active");
    });

    if (selectedAmount) {
        document.getElementById("paymentNumber").innerText = fixedNumbers[selectedMethod];
    }
};

window.depositMoney = async () => {
    const userPhone = localStorage.getItem("user");
    if (!userPhone) {
        alert("লগইন করুন!");
        return;
    }

    if (!selectedAmount) {
        alert("Amount নির্বাচন করুন!");
        return;
    }

    if (!selectedMethod) {
        alert("Payment Method নির্বাচন করুন!");
        return;
    }

    const depositData = {
        user: userPhone,
        amount: selectedAmount,
        method: selectedMethod,
        number: fixedNumbers[selectedMethod],
        status: "pending",
        date: new Date().toLocaleString()
    };

    try {
        const depositsRef = ref(db, "pendingDeposits");
        await push(depositsRef, depositData);

        alert(`ডিপোজিট রিকোয়েস্ট পাঠানো হয়েছে: ${selectedAmount} ৳ (${selectedMethod})`);

        // Reset
        selectedAmount = 0;
        selectedMethod = "";
        document.getElementById("paymentNumber").innerText = "Amount ক্লিক করুন";
        Object.keys(fixedNumbers).forEach(m => document.getElementById(m).classList.remove("active"));
    } catch (err) {
        alert("Error: " + err.message);
    }
};
