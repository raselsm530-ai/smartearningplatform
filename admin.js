import { db } from "./firebase-config.js";
import { ref, onValue, update, get } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

// Check admin login
if(localStorage.getItem("adminLoggedIn") !== "true") {
    alert("Login করুন");
    location.href = "admin-login.html";
}

// Load pending deposits
function loadPending() {
    const tableBody = document.querySelector("#pendingTable tbody");
    tableBody.innerHTML = "";

    const depositsRef = ref(db, "deposits");
    onValue(depositsRef, snapshot => {
        const data = snapshot.val();
        if(!data) return;

        Object.keys(data).forEach(key => {
            const dep = data[key];
            if(dep.status !== "pending") return;

            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${dep.user}</td>
                <td>${dep.amount} ৳</td>
                <td>${dep.method}</td>
                <td>${dep.trxid}</td>
                <td>${dep.date}</td>
                <td>${dep.status}</td>
                <td>${dep.screenshot ? `<a href="${dep.screenshot}" target="_blank">View</a>` : "N/A"}</td>
                <td>
                    <button class="approve" onclick="approveDeposit('${key}')">Approve</button>
                    <button class="reject" onclick="rejectDeposit('${key}')">Reject</button>
                </td>
            `;
            tableBody.appendChild(tr);
        });
    });
}

// Approve deposit
window.approveDeposit = async function(key) {
    const depositRef = ref(db, `deposits/${key}`);
    const snapshot = await get(depositRef);
    const dep = snapshot.val();
    if(!dep) return;

    const userRef = ref(db, `users/${dep.user}`);
    const userSnap = await get(userRef);
    const userData = userSnap.val() || { balance: 0 };

    const newBalance = (userData.balance || 0) + Number(dep.amount);
    await update(userRef, { balance: newBalance });
    await update(depositRef, { status: "approved" });

    alert(`Deposit Approved ✅\nNew Balance: ${newBalance} ৳`);
}

// Reject deposit
window.rejectDeposit = async function(key) {
    const depositRef = ref(db, `deposits/${key}`);
    await update(depositRef, { status: "rejected" });
    alert("Deposit Rejected ❌");
}

// Initial load
loadPending();
