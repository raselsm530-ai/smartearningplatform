document.getElementById("registerForm").addEventListener("submit", function (e) {
    e.preventDefault(); // ⭐ খুব গুরুত্বপূর্ণ (page refresh বন্ধ)

    let phone = document.getElementById("phone").value.trim();
    let password = document.getElementById("password").value.trim();
    let confirmPassword = document.getElementById("confirmPassword").value.trim();
    let withdrawPin = document.getElementById("withdrawPin").value.trim();
    let inviteCode = document.getElementById("inviteCode").value.trim();

    // মোবাইল নম্বর যাচাই
    if (phone.length !== 11 || !phone.startsWith("01")) {
        alert("সঠিক মোবাইল নম্বর দিন (১১ সংখ্যা)");
        return;
    }

    // পাসওয়ার্ড মিল
    if (password !== confirmPassword) {
        alert("পাসওয়ার্ড মিলছে না!");
        return;
    }

    // পিন যাচাই
    if (withdrawPin.length !== 4) {
        alert("উত্তোলন পিন অবশ্যই ৪ সংখ্যা হতে হবে!");
        return;
    }

    // আগের ইউজার আছে কিনা
    if (localStorage.getItem(phone)) {
        alert("এই নম্বরে আগেই একাউন্ট আছে!");
        return;
    }

    // ইউজার ডাটা
    let user = {
        phone: phone,
        password: password,
        withdrawPin: withdrawPin,
        invite: inviteCode || "NO-REF",
        balance: 0,
        transactions: []
    };

    // সেভ
    localStorage.setItem(phone, JSON.stringify(user));

    alert("রেজিস্ট্রেশন সফল হয়েছে 🎉");
    window.location.href = "login.html";
});
