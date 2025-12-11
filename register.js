function registerUser() {
    let phone = document.getElementById("phone").value.trim();
    let password = document.getElementById("password").value.trim();
    let confirmPassword = document.getElementById("confirmPassword").value.trim();
    let withdrawPin = document.getElementById("withdrawPin").value.trim();
    let refCode = document.getElementById("refCode").value.trim();

    // Phone number validation
    if (phone.length !== 11 || !phone.startsWith("01")) {
        alert("সঠিক মোবাইল নম্বর দিন (১১ সংখ্যা)");
        return;
    }

    // Password match check
    if (password !== confirmPassword) {
        alert("পাসওয়ার্ড ও কনফার্ম পাসওয়ার্ড মিলছে না!");
        return;
    }

    // Withdraw PIN check
    if (withdrawPin.length !== 4) {
        alert("উইথড্রো পিন অবশ্যই ৪ সংখ্যা হতে হবে!");
        return;
    }

    // Check required fields
    if (!phone || !password || !confirmPassword || !withdrawPin) {
        alert("সব ঘর পূরণ করুন!");
        return;
    }

    // Check if user already exists
    if (localStorage.getItem(phone)) {
        alert("এই নম্বরে আগে থেকেই অ্যাকাউন্ট রয়েছে!");
        return;
    }

    // Save user data
    let user = {
        phone: phone,
        password: password,
        withdrawPin: withdrawPin,
        ref: refCode ? refCode : "NO-REF"
    };

    localStorage.setItem(phone, JSON.stringify(user));

    alert("রেজিস্ট্রেশন সফল হয়েছে!");
    window.location.href = "login.html";
}
