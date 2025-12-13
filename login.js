function loginUser() {

    // ইনপুট ভ্যালু নেওয়া
    let phone = document.getElementById("phone").value.trim();
    let password = document.getElementById("password").value.trim();

    // খালি চেক
    if (phone === "" || password === "") {
        alert("মোবাইল নম্বর ও পাসওয়ার্ড দিন!");
        return;
    }

    // লোকালস্টোরেজ থেকে ইউজার আনা
    let savedUser = localStorage.getItem(phone);

    if (!savedUser) {
        alert("এই নম্বরে কোনো অ্যাকাউন্ট নেই! আগে রেজিস্টার করুন।");
        return;
    }

    savedUser = JSON.parse(savedUser);

    // পাসওয়ার্ড মিলানো
    if (password !== savedUser.password) {
        alert("পাসওয়ার্ড ভুল!");
        return;
    }

    // ✅ লগইন সফল
    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("currentUser", phone);

    alert("লগইন সফল! 🎉");

    // হোম পেজে পাঠানো
    window.location.href = "home.html";
}
