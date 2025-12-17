// ===== Home Page Balance Show =====

// login করা user
let user = localStorage.getItem("currentUser");

// যদি login না থাকে
if (!user) {
    location.href = "login.html";
}

// balance key
let balanceKey = "balance_" + user;

// balance read
let balance = localStorage.getItem(balanceKey);

// null হলে 0 দেখাবে
if (balance === null) {
    balance = 0;
}

// UI তে show
document.getElementById("balance").innerText = balance + " ৳";

// welcome text
document.getElementById("welcomeText").innerText = "স্বাগতম, " + user;

// logout
function logoutUser() {
    localStorage.removeItem("currentUser");
    location.href = "login.html";
}
