function depositMoney() {
    let amount = document.getElementById("depositAmount").value;
    let method = document.getElementById("paymentMethod").value;
    let user = localStorage.getItem("currentUser");

    if (!amount || amount <= 0 || !method) {
        alert("সঠিক তথ্য দিন");
        return;
    }

    let deposits = JSON.parse(localStorage.getItem("pendingDeposits")) || [];

    deposits.push({
        user: user,
        amount: Number(amount),
        method: method,
        time: new Date().toLocaleString() // 👍 Perfect
    });

    localStorage.setItem("pendingDeposits", JSON.stringify(deposits));

    alert("ডিপোজিট রিকুয়েস্ট পাঠানো হয়েছে");

    document.getElementById("depositAmount").value = "";
    document.getElementById("paymentMethod").value = "";
}
