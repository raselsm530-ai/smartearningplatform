// ===== PAYMENT NUMBERS =====
const paymentNumbers = {
    Bkash: "01797632229",
    Nagad: "01797632229",
    Rocket: "01797632229"
};

// ===== DOM READY =====
document.addEventListener("DOMContentLoaded", () => {
    const methodSelect = document.getElementById("paymentMethod");
    const numberBox = document.getElementById("paymentNumber");
    const depositBtn = document.getElementById("depositBtn");

    if (methodSelect) {
        methodSelect.addEventListener("change", () => {
            const method = methodSelect.value;
            numberBox.innerText = method
                ? paymentNumbers[method]
                : "মেথড নির্বাচন করুন";
        });
    }

    if (depositBtn) {
        depositBtn.addEventListener("click", depositMoney);
    }
});

// ===== DEPOSIT FUNCTION =====
function depositMoney() {
    const amount = Number(document.getElementById("depositAmount").value);
    const method = document.getElementById("paymentMethod").value;

    if (!amount || amount <= 0) {
        alert("সঠিক এমাউন্ট লিখুন");
        return;
    }

    if (!method) {
        alert("পেমেন্ট মেথড নির্বাচন করুন");
        return;
    }

    alert(
        "✅ ডিপোজিট রিকুয়েস্ট সফল\n\n" +
        "মেথড: " + method + "\n" +
        "নাম্বার: " + paymentNumbers[method] + "\n" +
        "এমাউন্ট: " + amount + " টাকা"
    );
}
