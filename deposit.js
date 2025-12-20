const fixedNumbers = {
    "Bkash": "01797632229",
    "Nagad": "01797632229",
    "Rocket": "01797632229"
};

function depositMoney() {
    const amount = document.getElementById("depositAmount").value;
    const method = document.getElementById("paymentMethod").value;
    const trxid = document.getElementById("trxid").value;

    if (!amount || !method || !trxid) {
        alert("সব তথ্য দিন");
        return;
    }

    const user = localStorage.getItem("currentUser");

    const deposit = {
        user: user,
        amount: Number(amount),
        method: method,
        trxid: trxid,
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