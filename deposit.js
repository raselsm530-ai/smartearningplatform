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
        user,
        amount: Number(amount),
        method,
        trxid: trxid, // <-- FIXED
        status: "pending",
        date: new Date().toLocaleString()
    };

    let list = JSON.parse(localStorage.getItem("pendingDeposits")) || [];
    list.push(deposit);
    localStorage.setItem("pendingDeposits", JSON.stringify(list));

    alert("পেন্ডিং লিস্টে যোগ হয়েছে");

    document.getElementById("depositAmount").value = "";
    document.getElementById("paymentMethod").value = "";
    document.getElementById("trxid").value = "";
}
