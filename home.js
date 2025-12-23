import { db } from "./firebase-config.js";
import { ref, onValue } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

const user = localStorage.getItem("user");
if (!user) {
    alert("Login করুন");
    location.href = "login.html";
}

// রিয়েল-টাইম ব্যালেন্স
const balanceRef = ref(db, `users/${user}/balance`);
onValue(balanceRef, snapshot => {
    const balance = snapshot.val() || 0;
    document.getElementById("balance").innerText = balance;
});

// ডিপোজিট হিস্ট্রি
const depositsRef = ref(db, "deposits");
onValue(depositsRef, snapshot => {
    const data = snapshot.val() || {};
    const table = document.getElementById("depositTable");
    table.innerHTML = "";

    Object.keys(data).forEach(key => {
        const dep = data[key];
        if(dep.user !== user) return;

        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${dep.amount} ৳</td>
            <td>${dep.method}</td>
            <td>${dep.status}</td>
            <td>${dep.date}</td>
        `;
        table.appendChild(tr);
    });
});

// লগ আউট
window.logout = function() {
    localStorage.removeItem("user");
    location.href = "login.html";
}
