function loadPendingDeposits() {
    const depositList = document.getElementById("depositList");
    depositList.innerHTML = "";

    let pending = JSON.parse(localStorage.getItem("pendingDeposits")) || [];

    if (pending.length === 0) {
        depositList.innerHTML = "<p style='text-align:center;color:white;'>কোনো Pending Deposit নেই</p>";
        return;
    }

    pending.forEach((dep, index) => {
        const div = document.createElement("div");
        div.className = "deposit-box";

        div.innerHTML = `
            <p><strong>ইউজার:</strong> ${dep.user}</p>
            <p><strong>Amount:</strong> ${dep.amount} ৳</p>
            <p><strong>Method:</strong> ${dep.method}</p>
            <p><strong>Send To:</strong> ${dep.number}</p>
            <p><strong>TrxID:</strong> ${dep.trxid}</p>
            <button onclick="approve(${index})" class="approve-btn">Approve</button>
            <button onclick="reject(${index})" class="reject-btn">Reject</button>
            <hr>
        `;

        depositList.appendChild(div);
    });
}

function approve(index) {
    let pending = JSON.parse(localStorage.getItem("pendingDeposits")) || [];
    const deposit = pending[index];

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const userIndex = users.findIndex(u => u.phone === deposit.user);

    if (userIndex !== -1) {
        users[userIndex].balance = Number(users[userIndex].balance) + Number(deposit.amount);
    }

    localStorage.setItem("users", JSON.stringify(users));

    pending.splice(index, 1);
    localStorage.setItem("pendingDeposits", JSON.stringify(pending));

    alert("Deposit Approved");
    loadPendingDeposits();
}

function reject(index) {
    let pending = JSON.parse(localStorage.getItem("pendingDeposits")) || [];

    pending.splice(index, 1);
    localStorage.setItem("pendingDeposits", JSON.stringify(pending));

    alert("Deposit Rejected");
    loadPendingDeposits();
}

loadPendingDeposits();
