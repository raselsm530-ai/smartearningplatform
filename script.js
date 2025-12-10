document.getElementById("signupForm")?.addEventListener("submit", function(e){
    e.preventDefault();

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let exists = users.some(u => u.username === username);

    if(exists){
        alert("Username already exists!");
        return;
    }

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


// ---------------- LOGIN ----------------

document.getElementById("loginForm")?.addEventListener("submit", function(e){
    e.preventDefault();

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let user = users.find(u => u.username === username && u.password === password);

    if(user){
        alert("Login successful!");
        localStorage.setItem("loggedUser", JSON.stringify(user));
        window.location.href = "dashboard.html";
    } else {
        alert("Invalid username or password");
    }
});
