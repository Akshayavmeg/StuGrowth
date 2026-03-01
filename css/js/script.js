// ================================
//  StuGrowth - Main JavaScript File
//  Author: Student Project
//  Description: Handles interactivity
//               for the StuGrowth platform
// ================================

// JavaScript functionality will be added here
// ================================
//  StuGrowth - Main JavaScript File
//  Author: Student Project
//  Description: Handles interactivity
//               for the StuGrowth platform
// ================================

// Login function - called when Login button is clicked
function handleLogin() {

    var email    = document.getElementById("email").value.trim();
    var password = document.getElementById("password").value.trim();
    var errorMsg = document.getElementById("error-msg");

    // Basic validation: check if fields are empty
    if (email === "" || password === "") {
        errorMsg.style.display = "block";
        return;
    }

    // Hide error if previously shown
    errorMsg.style.display = "none";

    // Redirect to dashboard page
    window.location.href = "pages/dashboard.html";
}