document.getElementById("signupForm").addEventListener("submit", function(e){
    e.preventDefault();

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    // আগেই কি ইউজারনেম আছে?
    let users = JSON.parse(localStorage.getItem("users")) || [];

    let alreadyExists = users.some(u => u.username === username);

    if(alreadyExists){
        alert("Username already exists. Try another.");
        return;
    }

    // নতুন ইউজার সেভ করা
    users.push({
        name: name,
        email: email,
        username: username,
        password: password
    });

    localStorage.setItem("users", JSON.stringify(users));

    alert("Account created successfully!");
    window.location.href = "login.html";
});
