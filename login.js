function loginUser() {
    let phone = document.getElementById("phone").value.trim();
    let password = document.getElementById("password").value.trim();

    let savedUser = JSON.parse(localStorage.getItem(phone));

    if (!savedUser) {
        alert("এই নম্বরে কোনো অ্যাকাউন্ট নেই! আগে রেজিস্টার করুন।");
        return;
    }

    if (password === savedUser.password) {
        alert("লগইন সফল! 🎉");

        localStorage.setItem("currentUser", phone);
        localStorage.setItem("loggedIn", "true");

        window.location.href = "home.html";
    } else {
        alert("পাসওয়ার্ড ভুল!");
    }
}
