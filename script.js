document.addEventListener("DOMContentLoaded", function () {
    const signupForm = document.getElementById("signupForm");
    const loginForm = document.getElementById("loginForm");

    // SIGNUP FORM
    if (signupForm) {
        signupForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const phone = document.getElementById("phone").value.trim();
            const password = document.getElementById("password").value.trim();

            if (phone === "" || password === "") {
                alert("Please enter phone and password.");
                return;
            }

            localStorage.setItem("userPhone", phone);
            localStorage.setItem("userPassword", password);

            alert("Signup successful!");
            window.location.href = "login.html";
        });
    }

    // LOGIN FORM
    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const phone = document.getElementById("phone").value.trim();
            const password = document.getElementById("password").value.trim();

            const savedPhone = localStorage.getItem("userPhone");
            const savedPassword = localStorage.getItem("userPassword");

            if (phone === savedPhone && password === savedPassword) {
                alert("Login successful!");
                window.location.href = "dashboard.html";
            } else {
                alert("Incorrect Phone or Password!");
            }
        });
    }
});
