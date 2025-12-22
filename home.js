window.onload = function() {
  const user = localStorage.getItem("user");
  if (!user) {
    alert("লগইন করুন!");
    window.location.href = "login.html";
    return;
  }
  document.getElementById("welcomeText").textContent = "স্বাগতম, " + user;
  document.getElementById("balance").textContent = "0 ৳"; // Firebase থেকে পরবর্তীতে আপডেট করা যাবে
};

function logoutUser() {
  localStorage.removeItem("user");
  alert("লগআউট সম্পন্ন হয়েছে");
  window.location.href = "login.html";
}
