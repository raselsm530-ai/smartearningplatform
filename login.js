document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");

    loginForm.addEventListener("submit", function (e) {
        e.preventDefault(); // Stop page refresh

        let phone = document.getElementById("phone").value;
        let password = document.getElementById("password").value;

        // Check localStorage for stored user
        let storedUser = localStorage.getItem("user");

        if (!storedUser) {
            alert("No user found! Please sign up first.");
            return;
        }

        let user = JSON.parse(storedUser);

        if (phone === user.phone && password === user.password) {
            alert("Login Successful!");
            window.location.href = "dashboard.html";   // Redirect working
        } else {
            alert("Incorrect Phone or Password!");
        }
    });
});
window.location.href = "./dashboard.html";
