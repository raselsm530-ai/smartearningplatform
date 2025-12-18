let list = document.getElementById("depositList");

let deposits = JSON.parse(localStorage.getItem("pendingDeposits")) || [];

list.innerHTML = "";

deposits.forEach((d, i) => {
    if (d.status === "pending") {
        let div = document.createElement("div");
        div.className = "info-box";

        div.innerHTML = `
            <p>User: ${d.user}</p>
            <p>Amount: ${d.amount} ৳</p>
            <p>Method: ${d.method}</p>
            <p>Date: ${d.date}</p>
            <button onclick="approve(${i})">Approve</button>
        `;

        list.appendChild(div);
    }
});

function approve(index) {
    let d = deposits[index];

    // all users
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // find user index
    let userIndex = users.findIndex(u => u.phone === d.user);

    if (userIndex !== -1) {
        users[userIndex].balance = Number(users[userIndex].balance) + Number(d.amount);
    }

    // save updated users
    localStorage.setItem("users", JSON.stringify(users));

    // update deposit status
    deposits[index].status = "approved";
    localStorage.setItem("pendingDeposits", JSON.stringify(deposits));

    alert("Deposit Approved!");
    location.reload();
}
