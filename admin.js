import { db } from "./firebase-config.js";
import { ref, onValue, update, get } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

// Pending Deposits লোড করা
function loadPending() {
    const tableBody = document.querySelector("#pendingTable tbody");
    tableBody.innerHTML = "";

    const depositsRef = ref(db, "deposits");
    onValue(depositsRef, snapshot => {
        const data = snapshot.val();
        if (!data) return;

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
                    <button onclick="approveDeposit('${key}')">Approve</button>
                    <button class="reject" onclick="rejectDeposit('${key}')">Reject</button>
                </td>
            `;
            tableBody.appendChild(tr);
        });
    });
}

// Approve Deposit + User Balance আপডেট
window.approveDeposit = async function(key) {
    const depositRef = ref(db, `deposits/${key}`);
    const snapshot = await get(depositRef);
    const dep = snapshot.val();
    if(!dep) return;

    // User Balance নেওয়া
    const userRef = ref(db, `users/${dep.user}`);
    const userSnap = await get(userRef);
    const userData = userSnap.val() || { balance: 0 };

    // নতুন ব্যালেন্স
    const newBalance = (userData.balance || 0) + Number(dep.amount);
    await update(userRef, { balance: newBalance });

    // Deposit status আপডেট
    await update(depositRef, { status: "approved" });

    alert(`Deposit Approved ✅\nNew Balance: ${newBalance} ৳`);
}

// Deposit Reject
window.rejectDeposit = function(key) {
    const depositRef = ref(db, `deposits/${key}`);
    update(depositRef, { status: "rejected" });
    alert("Deposit Rejected ❌");
}

// প্রথমবার Pending লোড
loadPending();
