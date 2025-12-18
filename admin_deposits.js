function loadDeposits() {
    let deposits = JSON.parse(localStorage.getItem("pendingDeposits")) || [];
    let html = "";

    if (deposits.length === 0) {
        document.getElementById("depositList").innerHTML = "<p>No Pending Deposits</p>";
        return;
    }

    deposits.forEach((d, i) => {
        html += `
        <div class="box">
            <p>📌 ইউজার: ${d.user}</p>
            <p>💰 Amount: ${d.amount}৳</p>
            <p>💳 Method: ${d.method}</p>
            <p>⏱ Date: ${d.time}</p>

            <button class="approve" onclick="approveDeposit(${i})">Approve</button>
        </div>`;
    });

    document.getElementById("depositList").innerHTML = html;
}

function approveDeposit(index) {
    let deposits = JSON.parse(localStorage.getItem("pendingDeposits")) || [];
    let balances = JSON.parse(localStorage.getItem("balances")) || {};

    let dep = deposits[index];

    if (!balances[dep.user]) {
        balances[dep.user] = 0;
    }

    balances[dep.user] += dep.amount;

    deposits.splice(index, 1);

    localStorage.setItem("balances", JSON.stringify(balances));
    localStorage.setItem("pendingDeposits", JSON.stringify(deposits));

    alert("Deposit Approved!");
    loadDeposits();
}

loadDeposits();
