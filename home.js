if (localStorage.getItem("loggedIn") !== "true") {
    window.location.href = "login.html";
}

let phone = localStorage.getItem("currentUser");
let user = JSON.parse(localStorage.getItem(phone));

welcomeText.innerText = "স্বাগতম, " + user.phone;
balanceText.innerText = user.balance + " ৳";

function logoutUser() {
    localStorage.clear();
    window.location.href = "login.html";
}
