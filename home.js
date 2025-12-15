if (localStorage.getItem("loggedIn") !== "true") {
    window.location.href = "login.html";
}

let currentPhone = localStorage.getItem("currentUser");
let userData = JSON.parse(localStorage.getItem(currentPhone));

document.getElementById("welcomeText").innerText =
    "স্বাগতম, " + userData.phone;

document.getElementById("balanceText").innerText =
    userData.balance + " ৳";

function logoutUser() {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
}
