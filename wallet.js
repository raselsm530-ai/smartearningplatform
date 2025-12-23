import { db, storage } from "./firebase-config.js";
import { ref, push, set } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
import { uploadBytes, ref as storageRef, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js";

const fixedNumbers = { bkash:"01797632229", nagad:"01797632229", rocket:"01797632229" };

window.selectAmount = (amount) => {
    document.getElementById("showAmount").innerText = amount;
    document.getElementById("depositAmount").value = amount;
};

window.copyNumber = () => {
    const text = document.getElementById("fixedNumberText").innerText;
    navigator.clipboard.writeText(text);
    alert("নাম্বার কপি হয়েছে");
};

window.submitDeposit = async () => {
    const amount = document.getElementById("depositAmount").value;
    const method = document.getElementById("method").value;
    const trxid = document.getElementById("trxid").value || "N/A";
    const screenshotFile = document.getElementById("screenshot").files[0];

    if(!amount || !method) return alert("Amount এবং Method নির্বাচন করুন");

    const user = localStorage.getItem("user");
    if(!user) return alert("Login করুন");

    let screenshotURL = "";
    if(screenshotFile){
        const storageReference = storageRef(storage, `screenshots/${Date.now()}_${screenshotFile.name}`);
        await uploadBytes(storageReference, screenshotFile);
        screenshotURL = await getDownloadURL(storageReference);
    }

    const depositRef = push(ref(db, "deposits"));
    await set(depositRef, {
        user,
        amount: Number(amount),
        method,
        number: fixedNumbers[method],
        trxid,
        screenshot: screenshotURL,
        status: "pending",
        date: new Date().toLocaleString()
    });

    alert("ডিপোজিট রিকোয়েস্ট পাঠানো হয়েছে");
    document.getElementById("depositAmount").value="";
    document.getElementById("trxid").value="";
    document.getElementById("screenshot").value="";
};