// লগইন চেক
if (localStorage.getItem("loggedIn") !== "true") {
    window.location.href = "login.html";
}

let currentPhone = localStorage.getItem("currentUser");
let userData = JSON.parse(localStorage.getItem(currentPhone));

if (!userData) {
    alert("ইউজার পাওয়া যায়নি! আবার লগইন করুন।");
    window.location.href = "login.html";
}

// ফোন নম্বর দেখানো
document.getElementById("phoneNumber").innerText = "ফোন: " + userData.phone;

// ব্যালেন্স দেখানো
let balance = userData.balance ? userData.balance : 0;
document.getElementById("currentBalance").innerText = balance + " ৳";

// হোমে ফেরত
function goHome() {
    window.location.href = "home.html";
}
