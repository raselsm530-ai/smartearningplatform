document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();

    let phone = document.getElementById("phone").value.trim();
    let password = document.getElementById("password").value.trim();

    let users = JSON.parse(localStorage.getItem("users")) || [];
    let user = users.find(u => u.phone === phone);

    if (!user) {
        alert("এই নম্বরে কোনো অ্যাকাউন্ট নেই!");
        return;
    }

    if (user.password !== password) {
        alert("পাসওয়ার্ড ভুল!");
        return;
    }

    localStorage.setItem("currentUser", phone);
    window.location.href = "home.html";
});
