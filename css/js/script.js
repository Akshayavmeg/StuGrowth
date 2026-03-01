// ================================
//  StuGrowth - Main JavaScript File
//  Author: Student Project
//  Description: Handles interactivity
//               for the StuGrowth platform
// ================================


// -------------------------------------------------
// handleLogin()
// Called when the Login button is clicked in
// pages/login.html
//
// PATH NOTE:
// login.html is in:      StuGrowth/pages/login.html
// dashboard.html is in:  StuGrowth/pages/dashboard.html
// Both are in the SAME folder, so the redirect path
// is just "dashboard.html" (no folder prefix needed)
// -------------------------------------------------

function handleLogin() {

    var email    = document.getElementById("email").value.trim();
    var password = document.getElementById("password").value.trim();
    var errorMsg = document.getElementById("error-msg");

    // If either field is empty, show error and stop
    if (email === "" || password === "") {
        errorMsg.style.display = "block";
        return;
    }

    // Hide error message (in case it was shown before)
    errorMsg.style.display = "none";

    // Redirect to dashboard — same folder, just filename
    window.location.href = "dashboard.html";
}


// -------------------------------------------------
// saveProfile()
// Called when the Save Profile button is clicked in
// pages/profile.html
//
// Reads all form values, checks they are not empty,
// saves them to localStorage, then shows a success alert.
// -------------------------------------------------

function saveProfile() {

    // Read all form field values
    var fullName        = document.getElementById("fullName").value.trim();
    var classYear       = document.getElementById("classYear").value;
    var subjectInterest = document.getElementById("subjectInterest").value.trim();
    var learningGoal    = document.getElementById("learningGoal").value.trim();
    var learningStyle   = document.getElementById("learningStyle").value;

    var errorMsg = document.getElementById("profile-error");

    // Check if any field is empty
    if (fullName === "" || classYear === "" || subjectInterest === "" ||
        learningGoal === "" || learningStyle === "") {
        errorMsg.style.display = "block";
        return;
    }

    // Hide error if it was shown before
    errorMsg.style.display = "none";

    // Save all values to localStorage so they persist across pages
    localStorage.setItem("stuName",    fullName);
    localStorage.setItem("stuClass",   classYear);
    localStorage.setItem("stuSubject", subjectInterest);
    localStorage.setItem("stuGoal",    learningGoal);
    localStorage.setItem("stuStyle",   learningStyle);

    // Tell the student it worked
    alert("Profile saved successfully!");
}