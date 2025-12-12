function registerUser() {

    let phone = document.getElementById("phone").value.trim();
    let password = document.getElementById("password").value.trim();
    let confirmPassword = document.getElementById("confirmPassword").value.trim();
    let withdrawPin = document.getElementById("withdrawPin").value.trim();
    let refCode = document.getElementById("refCode").value.trim();

    // মোবাইল নম্বর যাচাই
    if (phone.length !== 11 || !phone.startsWith("01")) {
        alert("সঠিক মোবাইল নম্বর দিন (১১ সংখ্যা)");
        return;
    }

    // পাসওয়ার্ড মিলানো
    if (password !== confirmPassword) {
        alert("পাসওয়ার্ড ও কনফার্ম পাসওয়ার্ড মিলছে না!");
        return;
    }

    // উইথড্র পিন চেক
    if (withdrawPin.length !== 4) {
        alert("উইথড্রো পিন অবশ্যই ৪ সংখ্যা হতে হবে!");
        return;
    }

    // ঘর পূরণ হয়েছে কিনা
    if (!phone || !password || !confirmPassword || !withdrawPin) {
        alert("সব ঘর পূরণ করুন!");
        return;
    }

    // আগে অ্যাকাউন্ট আছে কিনা
    if (localStorage.getItem(phone)) {
        alert("এই নম্বরে আগে থেকেই অ্যাকাউন্ট রয়েছে!");
        return;
    }

    // ইউজার ডাটা তৈরি
    let user = {
        phone: phone,
        password: password,
        withdrawPin: withdrawPin,
        ref: refCode ? refCode : "NO-REF",
        balance: 0   // প্রথমে ব্যালেন্স 0
    };

    // ইউজার সংরক্ষণ
    localStorage.setItem(phone, JSON.stringify(user));

    alert("রেজিস্ট্রেশন সম্পন্ন হয়েছে!");

    // লগইন পেজে পাঠানো
    window.location.href = "login.html";
}
    
