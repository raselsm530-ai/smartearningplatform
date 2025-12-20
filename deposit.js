const fixedNumbers = {
    "bkash": "01797632229",
    "nagad": "01797632229",
    "rocket": "01797632229"
};

function depositMoney() {
    const amount = document.getElementById("depositAmount").value;
    const method = document.getElementById("paymentMethod").value;
    const trxid = document.getElementById("trxid").value;

    if (!amount || amount <= 0) {
        alert("সঠিক এমাউন্ট লিখুন");
        return;
    }

    if (!method) {
        alert("পেমেন্ট মেথড নির্বাচন করুন");
        return;
    }

    if (!trxid) {
        alert("TrxID দিন");
        return;
    }

    const user = localStorage.getItem("currentUser");

    const deposit = {
        user,
        amount: Number(amount),
        method,
        trxid,
        status: "pending",
        date: new Date().toLocaleString()
    };

    let allDeposits = JSON.parse(localStorage.getItem("pendingDeposits")) || [];
    allDeposits.push(deposit);

    localStorage.setItem("pendingDeposits", JSON.stringify(allDeposits));

    alert("ডিপোজিট রিকোয়েস্ট পাঠানো হয়েছে (Pending)");

    document.getElementById("depositAmount").value = "";
    document.getElementById("paymentMethod").value = "";
    document.getElementById("trxid").value = "";
}
