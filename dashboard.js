window.onload = function () {

    const user = localStorage.getItem("currentUser");

    document.getElementById("welcomeText").textContent = "স্বাগতম, " + user;

    let balances = JSON.parse(localStorage.getItem("balances")) || {};

    let balance = balances[user] || 0;

    document.getElementById("balance").textContent = balance + " ৳";
};

function logoutUser() {
    localStorage.removeItem("currentUser");
    alert("লগআউট সম্পন্ন হয়েছে");
    window.location.href = "login.html";
}
