function updateNumber() {
    let method = document.getElementById("paymentMethod").value;
    let numberText = document.getElementById("paymentNumber");

    if (method === "Bkash") {
        numberText.innerText = "বিকাশ: 01XXXXXXXXX";
    } else if (method === "Nagad") {
        numberText.innerText = "নগদ: 01YYYYYYYYY";
    } else if (method === "Rocket") {
        numberText.innerText = "রকেট: 01ZZZZZZZZZ";
    } else {
        numberText.innerText = "মেথড নির্বাচন করুন";
    }
}
