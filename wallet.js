// Fixed Deposit Numbers
const fixedNumbers = {
    "Bkash": "01797632229",
    "Nagad": "01797632229",
    "Rocket": "01797632229"
};

function updateNumber() {
    const method = document.getElementById("paymentMethod").value;
    const paymentNumber = document.getElementById("paymentNumber");

    if (!method) {
        paymentNumber.textContent = "মেথড নির্বাচন করুন";
        return;
    }

    const num = fixedNumbers[method];
    if (num) {
        paymentNumber.textContent = method + ": " + num;
    } else {
        paymentNumber.textContent = "নাম্বার নেই";
    }
}
