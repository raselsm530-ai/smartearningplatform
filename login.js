function login() {
    let phone = document.getElementById("phone").value;
    let password = document.getElementById("password").value;

    let storedUser = localStorage.getItem("user");

    if (!storedUser) {
        alert("No user found! Please sign up first.");
        return;
    }

    let user = JSON.parse(storedUser);

    if (phone === user.phone && password === user.password) {
        alert("Login Successful!");
        window.location.href = "dashboard.html";
    } else {
        alert("Incorrect Phone or Password!");
    }
}
