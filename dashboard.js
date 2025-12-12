// চেক করা ইউজার লগইন আছে কিনা
if (localStorage.getItem("loggedIn") !== "true") {
    window.location.href = "login.html";
}

// লগইন করা ইউজার ফিরিয়ে আনা
let currentPhone = localStorage.getItem("currentUser");

if (!currentPhone) {
    alert("ইউজার পাওয়া যায়নি! আবার লগইন করুন।");
    window.location.href = "login.html";
}

let userData = JSON.parse(localStorage.getItem(currentPhone));

// ওয়েলকাম টেক্সট দেখানো
document.getElementById("welcomeText").innerText = "স্বাগতম, " + userData.phone;

// ব্যালেন্স দেখানো (যদি না থাকে তবে 0 দেখাবে)
let balance = userData.balance ? userData.balance : 0;
document.getElementById("balance").innerText = balance + " ৳";

// লগআউট ফাংশন
function logoutUser() {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
}
