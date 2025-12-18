// load pending deposits
let list = document.getElementById("depositList");

// get pending deposits
let deposits = JSON.parse(localStorage.getItem("pendingDeposits")) || [];

// show deposits
list.innerHTML = "";

deposits.forEach((d, i) => {
    if (d.status === "pending") {
        let div = document.createElement("div");
        div.className = "info-box";

        div.innerHTML = `
            <p><b>User:</b> ${d.user}</p>
            <p><b>Amount:</b> ${d.amount} ৳</p>
            <p><b>Method:</b> ${d.method}</p>
            <p><b>Date:</b> ${d.date}</p>
            <button onclick="approve(${i})">Approve</button>
        `;

        list.appendChild(div);
    }
});


// Approve Function
function approve(index) {
    let d = deposits[index];

    // get users array
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // find that specific user
    let userIndex = users.findIndex(u => u.number === d.user);

    if (userIndex !== -1) {
        users[userIndex].balance = (users[userIndex].balance || 0) + Number(d.amount);

        localStorage.setItem("users", JSON.stringify(users));
    }

    // update status remove pending
    deposits.splice(index, 1);
    localStorage.setItem("pendingDeposits", JSON.stringify(deposits));

    alert("Deposit Approved & Balance Updated!");

    location.reload();
}
