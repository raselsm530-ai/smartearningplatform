import { auth, db, storage } from "./firebase-config.js";
import { ref, push, set } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
import { ref as sRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js";

let selectedAmount = 0;

const paymentNumbers = {
    bKash: "01797632229",
    Nagad: "01797632229",
    Rocket: "01797632229"
};

document.querySelectorAll(".amount-card").forEach(card => {
    card.addEventListener("click", () => {
        document.querySelectorAll(".amount-card").forEach(el => el.classList.remove("active"));
        card.classList.add("active");

        selectedAmount = card.getAttribute("data-amount");
        document.getElementById("selectedAmount").innerHTML = selectedAmount;
    });
});

document.getElementById("methodSelect").addEventListener("change", (e) => {
    document.getElementById("selectedMethod").innerHTML = e.target.value;
    document.getElementById("paymentNumber").innerHTML = paymentNumbers[e.target.value] || "";
});

window.makeDeposit = async () => {

    const method = document.getElementById("methodSelect").value;
    const file = document.getElementById("screenshot").files[0];

    if (!selectedAmount) return alert("একটি Amount সিলেক্ট করুন!");
    if (!method) return alert("একটি Method সিলেক্ট করুন!");
    if (!file) return alert("স্ক্রিনশট আপলোড করুন!");

    const uid = auth.currentUser?.uid;
    if (!uid) return alert("প্রথমে লগইন করুন!");

    const storeRef = sRef(storage, "depositScreenshots/" + Date.now() + ".jpg");
    const uploadResult = await uploadBytes(storeRef, file);
    const imageURL = await getDownloadURL(uploadResult.ref);

    const depositRef = push(ref(db, "depositRequests"));

    await set(depositRef, {
        uid,
        amount: selectedAmount,
        method,
        paymentNumber: paymentNumbers[method],
        screenshot: imageURL,
        status: "pending",
        time: new Date().toLocaleString()
    });

    alert("ডিপোজিট সফলভাবে সাবমিট হয়েছে ✔\nঅনুগ্রহ করে Admin approval এর জন্য অপেক্ষা করুন।");
};
