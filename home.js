window.onload = function () {

    const user = localStorage.getItem("currentUser");
    document.getElementById("welcomeText").textContent = "স্বাগতম, " + user;

    let users = JSON.parse(localStorage.getItem("users")) || [];
    let data = users.find(u => u.phone === user);

    let balance = data ? data.balance : 0;

    document.getElementById("balance").textContent = balance + " ৳";
};

function logoutUser() {
    localStorage.removeItem("currentUser");
    alert("লগআউট সম্পন্ন হয়েছে");
    window.location.href = "login.html";
}
