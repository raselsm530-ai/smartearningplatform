const fixedNumbers = {
    "bkash": "01797632229",
    "nagad": "01797632229",
    "rocket": "01797632229"
};

function depositMoney() {
    const amount = document.getElementById("depositAmount").value;
    const method = document.getElementById("paymentMethod").value;
    const trxid = document.getElementById("trxid").value;

    if (!amount || !method || !trxid) {
        alert("সব তথ্য দিন");
        return;
    }

    const user = JSON.parse(localStorage.getItem("currentUserData"));

    if (!user) {
        alert("Please Login First!");
        return;
    }

    const deposit = {
        user: user.phone,     // FIXED ✔
        amount: Number(amount),
        method: method,
        number: fixedNumbers[method], // FIXED ✔
        trxid: trxid,                 // FIXED ✔
        status: "pending",
        date: new Date().toLocaleString()
    };

    let pendingList = JSON.parse(localStorage.getItem("pendingDeposits")) || [];
    pendingList.push(deposit);

    localStorage.setItem("pendingDeposits", JSON.stringify(pendingList));

    alert("ডিপোজিট রিকোয়েস্ট পাঠানো হয়েছে (Pending)");

    document.getElementById("depositAmount").value = "";
    document.getElementById("paymentMethod").value = "";
    document.getElementById("trxid").value = "";
}
