function submitDeposit() {
    let amount = document.getElementById("amount").value;
    let method = document.getElementById("method").value;
    let trxid = document.getElementById("trxid").value;

    if (!amount || !method || !trxid) {
        alert("সব তথ্য পূরণ করুন");
        return;
    }

    let user = localStorage.getItem("currentUser");
    let deposits = JSON.parse(localStorage.getItem("deposits")) || [];

    deposits.push({
        user: user,
        amount: Number(amount),
        method: method,
        trxid: trxid,
        status: "Pending",
        time: new Date().toLocaleString()
    });

    localStorage.setItem("deposits", JSON.stringify(deposits));

    alert("✅ ডিপোজিট রিকোয়েস্ট পাঠানো হয়েছে\n(Admin যাচাই করবে)");

    document.getElementById("amount").value = "";
    document.getElementById("trxid").value = "";
}
