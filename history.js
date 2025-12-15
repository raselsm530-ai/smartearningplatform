/* লগইন চেক */
if (localStorage.getItem("loggedIn") !== "true") {
    window.location.href = "login.html";
}

let currentPhone = localStorage.getItem("currentUser");
let userData = JSON.parse(localStorage.getItem(currentPhone));
let historyDiv = document.getElementById("historyList");

if (!userData || !userData.transactions || userData.transactions.length === 0) {
    historyDiv.innerHTML = "<p>কোনো উত্তোলন হিস্টরি নেই</p>";
} else {
    userData.transactions
        .filter(tx => tx.type === "Withdraw")
        .reverse()
        .forEach(tx => {
            let div = document.createElement("div");
            div.className = "menu-card";
            div.innerHTML = `
                <h4>উত্তোলন</h4>
                <p>পরিমাণ: ${tx.amount} ৳</p>
                <p>${tx.date}</p>
            `;
            historyDiv.appendChild(div);
        });
}
