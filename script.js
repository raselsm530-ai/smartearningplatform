document.getElementById("loginForm").addEventListener("submit", function(e){
    e.preventDefault();

    let phone = document.getElementById("phone").value;
    let password = document.getElementById("password").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let user = users.find(u => u.phone === phone && u.password === password);

    if(user){
        alert("Login successful!");
        localStorage.setItem("loggedUser", JSON.stringify(user));

        window.location.href = "dashboard.html";
    } 
    else {
        alert("Incorrect phone number or password!");
    }
});
