import { db } from "./firebase-config.js";
import { ref, push } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-database.js";

const fixedNumbers = {
    "bkash": "01797632229",
    "nagad": "01797632229",
    "rocket": "01797632229"
};

function updateNumber() {
    const method = document.getElementById("paymentMethod").value;
    document.getElementById("paymentNumber").innerText =
        fixedNumbers[method] ? `${method}: ${fixedNumbers[method]}` : "মেথড নির্বাচন করুন";
}

window.updateNumber = updateNumber;

async function depositMoney() {
    const amount = document.getElementById("depositAmount").value.trim();
    const method = document.getElementById("paymentMethod").value.trim();
    const trx = document.getElementById("trxid").value.trim();
    const user = localStorage.getItem("currentUser");

    if (!amount || !method || !trx) {
        alert("সব তথ্য দিন");
        return;
    }

    if (!user) {
        alert("লগইন প্রয়োজন");
        return;
    }

    const depositData = {
        user,
        amount,
        method,
        number: fixedNumbers[method],
        trx,
        status: "pending",
        time: new Date().toLocaleString()
    };

    await push(ref(db, "pendingDeposits"), depositData);

    alert("ডিপোজিট রিকোয়েস্ট পাঠানো হয়েছে");
    
    document.getElementById("depositAmount").value = "";
    document.getElementById("paymentMethod").value = "";
    document.getElementById("trxid").value = "";
}

window.depositMoney = depositMoney;