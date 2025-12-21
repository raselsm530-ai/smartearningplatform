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

    // FIX → Correct current user fetch
    let current = JSON.parse(localStorage.getItem("currentUserData"));

    if (!current || !current.phone) {
        alert("Please Login First!");
        return;
    }

    const deposit = {
        user: current.phone,     // fixed → phone number saved
        amount: Number(amount),
        method: method,
        trxid: trxid,
        number: fixedNumbers[method],  // Fixed payment number
        status: "pending",
        date: new Date().toLocaleString()
    };

    let pendingList = JSON.parse(localStorage.getItem("pendingDeposits")) || [];
    pendingList.push(deposit);

    localStorage.setItem("pendingDeposits", JSON.stringify(pendingList));

    alert("ডিপোজিট রিকোয়েস্ট পেন্ডিং এ গেছে!");

    document.getElementById("depositAmount").value = "";
    document.getElementById("paymentMethod").value = "";
    document.getElementById("trxid").value = "";
}