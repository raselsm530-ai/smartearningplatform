function loadDeposits() {
    let deposits = JSON.parse(localStorage.getItem("deposits")) || [];
    let html = "";

    deposits.forEach((d, i) => {
        html += `
        <div style="padding:10px;border:1px solid #999;margin:10px;">
            <p>ইউজার: ${d.user}</p>
            <p>টাকা: ${d.amount}৳</p>
            <p>মেথড: ${d.method}</p>
            <p>ট্রানজেকশন: ${d.trxid}</p>
            <p>স্ট্যাটাস: ${d.status}</p>
            ${
                d.status === "Pending" 
                ? `<button onclick="approveDeposit(${i})">Approve</button>
                   <button onclick="rejectDeposit(${i})">Reject</button>`
                : ""
            }
        </div>`;
    });

    document.getElementById("depositList").innerHTML = html;
}

function approveDeposit(index) {
    let deposits = JSON.parse(localStorage.getItem("deposits")) || [];
    let users = JSON.parse(localStorage.getItem("users")) || [];

    let deposit = deposits[index];
    deposit.status = "Approved";

    let user = users.find(u => u.username === deposit.user);

    if (user) {
        user.balance += Number(deposit.amount);
    }

    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("deposits", JSON.stringify(deposits));

    loadDeposits();
}

function rejectDeposit(index) {
    let deposits = JSON.parse(localStorage.getItem("deposits")) || [];
    deposits[index].status = "Rejected";
    localStorage.setItem("deposits", JSON.stringify(deposits));
    loadDeposits();
}

loadDeposits();
