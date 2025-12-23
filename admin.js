import { db } from "./firebase-config.js";
import { ref, onValue, update } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

// Fetch pending deposits from Firebase
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
                <td>
                    ${dep.screenshot ? `<a href="${dep.screenshot}" target="_blank">View</a>` : "N/A"}
                </td>
                <td>
                    <button onclick="approveDeposit('${key}')">Approve</button>
                    <button class="reject" onclick="rejectDeposit('${key}')">Reject</button>
                </td>
            `;
            tableBody.appendChild(tr);
        });
    });
}

// Approve deposit
window.approveDeposit = function(key) {
    const depositRef = ref(db, `deposits/${key}`);
    update(depositRef, { status: "approved" });
    alert("Deposit Approved ✅");
}

// Reject deposit
window.rejectDeposit = function(key) {
    const depositRef = ref(db, `deposits/${key}`);
    update(depositRef, { status: "rejected" });
    alert("Deposit Rejected ❌");
}

// Initial load
loadPending();
