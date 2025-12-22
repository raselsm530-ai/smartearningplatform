import { db } from "./firebase-config.js";
import { ref, push } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-database.js";

const fixedNumbers = {
    "bkash": "01797632229",
    "nagad": "01797632229",
    "rocket": "01797632229"
};

window.updateNumber = function () {
    const method = document.getElementById("paymentMethod").value;
    document.getElementById("paymentNumber").innerText =
        fixedNumbers[method] ? `${method}: ${fixedNumbers[method]}` : "মেথড নির্বাচন করুন";
};

window.depositMoney = async function () {

    const amount = document.getElementById("depositAmount").value.trim();
    const method = document.getElementById("paymentMethod").value.trim();
    const trxid = document.getElementById("trxid").value.trim();
    const phone = localStorage.getItem("currentUser");

    if (!phone) return alert("Login first!");
    if (!amount || !method) return alert("Amount & Method দিন!");

    const data = {
        user: phone,
        amount: Number(amount),
        method,
        number: fixedNumbers[method],
        trxid: trxid || "N/A",
        status: "pending",
        date: new Date().toLocaleString()
    };

    await push(ref(db, "pendingDeposits"), data);

    alert("ডিপোজিট রিকোয়েস্ট পাঠানো হয়েছে!");

    document.getElementById("depositAmount").value = "";
    document.getElementById("paymentMethod").value = "";
    document.getElementById("trxid").value = "";
    updateNumber();
};