window.onload = function () {
    const phone = localStorage.getItem("currentUser");
    document.getElementById("welcomeText").textContent = "স্বাগতম, " + phone;

    let users = JSON.parse(localStorage.getItem("users")) || [];
    let user = users.find(u => u.phone === phone);

    document.getElementById("balance").textContent = (user ? user.balance : 0) + " ৳";
};

function logoutUser() {
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
}
