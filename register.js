document.getElementById("registerForm").addEventListener("submit", function (e) {
    e.preventDefault();

    let phone = document.getElementById("phone").value.trim();
    let password = document.getElementById("password").value.trim();
    let confirmPassword = document.getElementById("confirmPassword").value.trim();
    let withdrawPin = document.getElementById("withdrawPin").value.trim();
    let refCode = document.getElementById("inviteCode").value.trim();

    if (phone.length !== 11 || !phone.startsWith("01")) {
        alert("সঠিক মোবাইল নম্বর দিন");
        return;
    }

    if (password !== confirmPassword) {
        alert("পাসওয়ার্ড মিলছে না");
        return;
    }

    if (withdrawPin.length !== 4) {
        alert("৪ সংখ্যার পিন দিন");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.some(u => u.phone === phone)) {
        alert("এই নম্বরে আগেই একাউন্ট আছে");
        return;
    }

    users.push({
        phone,
        password,
        withdrawPin,
        refCode: refCode || "NO-REF"
    });

    localStorage.setItem("users", JSON.stringify(users));

    alert("রেজিস্ট্রেশন সফল 🎉 এখন লগইন করুন");
    window.location.href = "login.html";
});
