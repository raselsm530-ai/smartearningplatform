function loginUser() {
    let phone = document.getElementById("phone").value.trim();
    let password = document.getElementById("password").value.trim();

    let user = JSON.parse(localStorage.getItem(phone));

    if (!user) {
        alert("একাউন্ট পাওয়া যায়নি");
        return;
    }

    if (user.password !== password) {
        alert("পাসওয়ার্ড ভুল");
        return;
    }

    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("currentUser", phone);

    window.location.href = "home.html";
}
