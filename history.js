/* লগইন চেক */
if (localStorage.getItem("loggedIn") !== "true") {
    window.location.href = "login.html";
}

let currentPhone = localStorage.getItem("currentUser");
let userData = JSON.parse(localStorage.getItem(currentPhone));

if (!userData) {
    alert("ইউজার পাওয়া যায়নি!");
    window.location.href = "login.html";
}

let historyBox = document.getElementById("historyList");

/* হিস্টরি না থাকলে */
if (!userData.transactions || userData.transactions.length === 0) {
    historyBox.innerHTML = "<p>এখনো কোনো লেনদেন হয়নি</p>";
} else {

    let html = "";

    userData.transactions.reverse().forEach(item => {

        html += `
            <div class="menu-card">
                <h4>${item.type}</h4>
                <p>এমাউন্ট: ${item.amount} ৳</p>
                ${item.details ? `<p>${item.details}</p>` : ""}
                <small>${item.date}</small>
            </div>
        `;
    });

    historyBox.innerHTML = html;
}
