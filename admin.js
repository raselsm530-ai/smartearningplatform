/* ========= Simple Admin Auth ========= */
let adminPass = prompt("Admin Password দিন:");

if (adminPass !== "admin123") {
    alert("Access Denied!");
    window.location.href = "login.html";
}

/* ========= Withdraw Requests ========= */
let requestList = document.getElementById("requestList");

let allKeys = Object.keys(localStorage);
let found = false;

allKeys.forEach(key => {
    let user = JSON.parse(localStorage.getItem(key));

    if (user && user.transactions) {
        user.transactions.forEach((tx, index) => {
            if (tx.type === "Withdraw" && !tx.status) {
                found = true;

                let div = document.createElement("div");
                div.className = "menu-card";
                div.innerHTML = `
                    <p><b>Phone:</b> ${user.phone}</p>
                    <p><b>Amount:</b> ${tx.amount} ৳</p>
                    <p>${tx.date}</p>

                    <button onclick="approve('${key}', ${index})">Approve</button>
                    <button onclick="reject('${key}', ${index})">Reject</button>
                `;
                requestList.appendChild(div);
            }
        });
    }
});

if (!found) {
    requestList.innerHTML = "<p>কোনো Pending Withdraw নেই</p>";
}

/* ========= Approve ========= */
function approve(phone, index) {
    let user = JSON.parse(localStorage.getItem(phone));

    user.transactions[index].status = "Approved";

    localStorage.setItem(phone, JSON.stringify(user));
    alert("Withdraw Approved ✅");
    location.reload();
}

/* ========= Reject ========= */
function reject(phone, index) {
    let user = JSON.parse(localStorage.getItem(phone));

    user.transactions[index].status = "Rejected";

    // Reject হলে টাকা ফেরত
    user.balance += user.transactions[index].amount;

    localStorage.setItem(phone, JSON.stringify(user));
    alert("Withdraw Rejected ❌");
    location.reload();
}

function logoutAdmin() {
    window.location.href = "login.html";
}
