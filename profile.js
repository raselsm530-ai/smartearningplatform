/* লগইন চেক */
if (localStorage.getItem("loggedIn") !== "true") {
    window.location.href = "login.html";
}

/* ইউজার লোড */
let currentPhone = localStorage.getItem("currentUser");
let userData = JSON.parse(localStorage.getItem(currentPhone));

if (!userData) {
    alert("ইউজার পাওয়া যায়নি!");
    window.location.href = "login.html";
}

/* ডাটা দেখানো */
document.getElementById("userPhone").innerText = userData.phone;
document.getElementById("userBalance").innerText =
    (userData.balance || 0) + " ৳";

/* লগআউট */
function logoutUser() {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
}
