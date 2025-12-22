let selectedAmount = 0;

const numbers = {
    "বিকাশ": "01797632229",
    "নগদ": "01797632229",
    "রকেট": "01797632229"
};

document.querySelectorAll(".amount").forEach(btn => {
    btn.addEventListener("click", () => {

        document.querySelectorAll(".amount")
            .forEach(a => a.classList.remove("active"));

        btn.classList.add("active");

        selectedAmount = btn.dataset.amount;

        document.getElementById("showSelection").innerHTML =
            `আপনি নির্বাচন করেছেন <b>${selectedAmount} ৳</b>`;
    });
});

window.startDeposit = () => {

    if (!selectedAmount) {
        alert("দয়া করে এমাউন্ট সিলেক্ট করুন");
        return;
    }

    const method = document.getElementById("method").value;

    if (!method) {
        alert("পেমেন্ট মেথড নির্বাচন করুন");
        return;
    }

    const num = numbers[method];

    document.getElementById("paymentNumberBox").classList.remove("hidden");
    document.getElementById("paymentNumberBox").innerHTML = `
        📌 ${method} নাম্বার: <b>${num}</b>
        <br>এমাউন্ট: <b>${selectedAmount} ৳</b>
        <br><br>💡 এখন অ্যাপ দিয়ে টাকা পাঠান।
    `;
};
