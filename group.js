function joinGroup() {
    let selectedGroup = document.getElementById("groupSelect").value;

    if (selectedGroup === "") {
        alert("Please select a group!");
        return;
    }

    // Save selected group to localStorage
    localStorage.setItem("userGroup", selectedGroup);

    alert("You have successfully joined: " + selectedGroup);

    window.location.href = "dashboard.html";
}
