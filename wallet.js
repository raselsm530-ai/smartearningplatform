// ===============================
// Wallet System
// ===============================

// Get current balance from localStorage
function getBalance() {
    let balance = localStorage.getItem("walletBalance");
    return balance ? parseFloat(balance) : 0;
}

// Update balance in localStorage
function setBalance(amount) {
    localStorage.setItem("walletBalance", amount);
}

// Add money (after deposit success)
function addMoney(amount) {
    let current = getBalance();
    let newBalance = current + amount;

    setBalance(newBalance);
    return newBalance;
}

// Reduce money (withdraw or package buy)
function reduceMoney(amount) {
    let current = getBalance();

    if (amount > current) {
        return false; // Not enough balance
    }

    let newBalance = current - amount;
    setBalance(newBalance);
    return true;
}

// Show balance on any page (optional)
function showBalance(elementId) {
    if (document.getElementById(elementId)) {
        document.getElementById(elementId).innerText = getBalance().toFixed(2);
    }
}
