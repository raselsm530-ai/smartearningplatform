import { db } from "./firebase-config.js";
import { ref, onValue, remove, update, get, child } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-database.js";

const list = document.getElementById("depositList");

function load() {
    onValue(ref(db, "pendingDeposits"), snapshot => {
        list.innerHTML = "";

        if (!snapshot.exists()) {
            list.innerHTML = "<p style='color:white;text-align:center;'>কোন Pending নেই</p>";
            return;
        }

        snapshot.forEach(item => {
            const key = item.key;
            const dep = item.val();

            const div = document.createElement("div");
            div.className = "deposit-box";

            div.innerHTML = `
                <p><b>User:</b> ${dep.user}</p>
                <p><b>Amount:</b> ${dep.amount} ৳</p>
                <p><b>Method:</b> ${dep.method}</p>
                <p><b>Send To:</b> ${dep.number}</p>
                <p><b>TrxID:</b> ${dep.trxid}</p>

                <button onclick="approve('${key}','${dep.user}',${dep.amount})" class="approve-btn">Approve</button>
                <button onclick="reject('${key}')" class="reject-btn">Reject</button>
            `;

            list.appendChild(div);
        });
    });
}

window.approve = async function (key, phone, amount) {

    const snap = await get(child(ref(db), "users/" + phone));

    if (snap.exists()) {
        let bal = snap.val().balance || 0;
        await update(ref(db, "users/" + phone), { balance: bal + amount });
    }

    await remove(ref(db, "pendingDeposits/" + key));

    alert("Deposit Approved!");
};

window.reject = async function (key) {
    await remove(ref(db, "pendingDeposits/" + key));
    alert("Rejected");
};

load();