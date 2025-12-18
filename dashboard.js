// লগইন চেক
if (localStorage.getItem("loggedIn") !== "true") {
    window.location.href = "login.html";
}

let currentUser = localStorage.getItem("currentUser");

// সব ইউজার লোড
let users = JSON.parse(localStorage.getItem("users")) || [];

// ইউজার খুঁজে বের করা
let user = users.find(u => u.phone === currentUser);

if (!user) {
    alert("ইউজার পাওয়া যায়নি!");
    window.location.href = "login.html";
}

// ব্যালেন্স লোড করা (core balance source)
let deposits = JSON.parse(localStorage.getItem("deposits")) || [];

// Approved deposit amount sum
let totalDeposit = deposits
    .filter(d => d.user === currentUser && d.status === "Approved")
    .reduce((sum, d) => sum + Number(d.amount), 0);

// user এর default balance (যদি থাকে)
let baseBalance = user.balance ? Number(user.balance) : 0;

// Final balance = base balance + approved deposit sum
let finalBalance = baseBalance + totalDeposit;

// UI তে দেখানো
document.getElementById("welcomeText").innerText = "স্বাগতম, " + user.phone;
document.getElementById("balance").innerText = finalBalance + " ৳";

// logout
function logoutUser() {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
}
