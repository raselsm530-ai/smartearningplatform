// login check
if (localStorage.getItem("loggedIn") !== "true") {
    window.location.href = "login.html";
}

let currentUser = localStorage.getItem("currentUser");

let users = JSON.parse(localStorage.getItem("users")) || [];

let user = users.find(u => u.phone === currentUser);

if (!user) {
    alert("ইউজার পাওয়া যায়নি!");
    window.location.href = "login.html";
}

// final balance directly from user object
let finalBalance = Number(user.balance) || 0;

document.getElementById("welcomeText").innerText = "স্বাগতম, " + user.phone;
document.getElementById("balance").innerText = finalBalance + " ৳";

function logoutUser() {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
}
