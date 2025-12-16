// লগইন চেক
if (localStorage.getItem("loggedIn") !== "true") {
    window.location.href = "login.html";
}

let currentPhone = localStorage.getItem("currentUser");
let userData = JSON.parse(localStorage.getItem(currentPhone));

if (!userData) {
    window.location.href = "login.html";
}

// ওয়েলকাম টেক্সট
document.getElementById("welcomeText").innerText =
    "স্বাগতম, " + userData.phone;

// ব্যালেন্স না থাকলে 0 ধরবে
let balance = userData.balance ? userData.balance : 0;

document.getElementById("balanceText").innerText =
    balance + " ৳";

// লগআউট
function logoutUser() {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
}
