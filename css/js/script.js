// ================================
//  StuGrowth - Main JavaScript File
//  Author: Student Project
//  Description: Handles all interactivity
//               for the StuGrowth platform
// ================================


// ------------------------------------------------
// handleLogin()
// Called by the Login button in pages/login.html
//
// PATH NOTE:
//   login.html    →  StuGrowth/pages/login.html
//   dashboard.html → StuGrowth/pages/dashboard.html
//   Both files are in the SAME pages/ folder,
//   so the redirect path is just "dashboard.html"
// ------------------------------------------------

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

    // Both files are in pages/ so just use the filename
    window.location.href = "dashboard.html";
}


// ------------------------------------------------
// saveProfile()
// Called by the Save Profile button in pages/profile.html
//
// Reads all 5 form fields, validates them,
// saves to localStorage, then shows a success alert.
//
// Saved keys:
//   stuName    → Full Name
//   stuClass   → Class / Year
//   stuSubject → Subject Interest
//   stuGoal    → Learning Goal
//   stuStyle   → Preferred Learning Style
// ------------------------------------------------

function saveProfile() {

    // Read all form field values
    var fullName        = document.getElementById("fullName").value.trim();
    var classYear       = document.getElementById("classYear").value;
    var subjectInterest = document.getElementById("subjectInterest").value.trim();
    var learningGoal    = document.getElementById("learningGoal").value.trim();
    var learningStyle   = document.getElementById("learningStyle").value;

    var errorMsg = document.getElementById("profile-error");

    // Check if any field is empty or not selected
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

    // Show success message
    alert("Profile saved successfully!");
}


// ------------------------------------------------
// loadRecommendations()
// Called when pages/recommendations.html loads.
//
// Reads "stuSubject" from localStorage (saved by
// saveProfile), then builds and injects course cards
// into the #rec-container section on the page.
//
// Subject matching is case-insensitive so "python",
// "Python", and "PYTHON" all work correctly.
// ------------------------------------------------

function loadRecommendations() {

    // Get the subject the student saved in their profile
    var subject = localStorage.getItem("stuSubject");

    // Get the container div where we will put the cards
    var container = document.getElementById("rec-container");
    var subtitle  = document.getElementById("rec-subtitle");

    // Define courses for each subject
    // Each course has a title, description, and an emoji icon
    var courses = [];

    if (subject === null || subject === "") {
        // No profile saved yet — ask student to fill profile first
        container.innerHTML =
            "<p class='rec-no-profile'>" +
            "⚠️ No profile found. Please <a href='profile.html'>fill your profile</a> first." +
            "</p>";
        return;
    }

    // Convert to lowercase so matching works regardless of how user typed it
    var subjectLower = subject.toLowerCase();

    if (subjectLower.indexOf("python") !== -1) {

        subtitle.textContent = "Recommended courses for: Python";
        courses = [
            {
                icon: "🐍",
                title: "Python Basics",
                desc: "Learn variables, loops, functions and the fundamentals of Python programming."
            },
            {
                icon: "⚙️",
                title: "Intermediate Python",
                desc: "Explore OOP, file handling, modules and writing cleaner Python code."
            },
            {
                icon: "🛠️",
                title: "Python Projects",
                desc: "Build real projects like a calculator, to-do app and web scraper using Python."
            }
        ];

    } else if (subjectLower.indexOf("math") !== -1) {

        subtitle.textContent = "Recommended courses for: Mathematics";
        courses = [
            {
                icon: "➕",
                title: "Algebra Foundation",
                desc: "Master equations, inequalities, polynomials and algebraic thinking."
            },
            {
                icon: "🧩",
                title: "Problem Solving Math",
                desc: "Sharpen your logical thinking with structured math problem-solving techniques."
            }
        ];

    } else {
        // Default recommendations for any other subject
        subtitle.textContent = "Recommended courses for: " + subject;
        courses = [
            {
                icon: "📚",
                title: "General Study Skills",
                desc: "Learn how to study effectively, manage your time and retain information better."
            },
            {
                icon: "🧠",
                title: "Learning Techniques",
                desc: "Discover proven techniques like spaced repetition, mind mapping and active recall."
            }
        ];
    }

    // Clear any existing content in the container
    container.innerHTML = "";

    // Loop through the courses array and create a card for each one
    for (var i = 0; i < courses.length; i++) {

        var course = courses[i];

        // Build the card HTML as a string
        var cardHTML =
            "<div class='card'>" +
                "<div class='card-icon'>" + course.icon + "</div>" +
                "<h3 class='card-title'>" + course.title + "</h3>" +
                "<p class='card-text'>" + course.desc + "</p>" +
                "<button class='btn-primary btn-card'>Start Course</button>" +
            "</div>";

        // Add the card to the container
        container.innerHTML = container.innerHTML + cardHTML;
    }
}


// ------------------------------------------------
// loadDashboard()
// Called when pages/dashboard.html loads.
//
// Reads stuName and stuSubject from localStorage
// (saved by saveProfile in pages/profile.html).
//
// If a profile exists  → shows personalised greeting
// If no profile exists → shows a friendly default message
// ------------------------------------------------

function loadDashboard() {

    // Read saved profile values from localStorage
    var name    = localStorage.getItem("stuName");
    var subject = localStorage.getItem("stuSubject");

    // Get the two elements in the welcome banner
    var heading = document.getElementById("welcome-heading");
    var subtext = document.getElementById("welcome-subtext");

    if (name && name !== "") {
        // Profile found — show personalised message
        heading.textContent = "Welcome, " + name + "! 👋";

        if (subject && subject !== "") {
            subtext.textContent = "Your focus subject: " + subject;
        } else {
            // Name saved but no subject yet
            subtext.textContent = "Complete your profile to get personalised recommendations.";
        }

    } else {
        // No profile saved at all — show default message
        heading.textContent = "Welcome to your Dashboard";
        subtext.textContent = "Track your learning and get personalized recommendations";
    }
}


// ------------------------------------------------
// loadAdmin()
// Called when pages/admin.html loads.
//
// Reads all 5 profile fields from localStorage
// (saved by saveProfile in pages/profile.html).
//
// If data exists  → builds a table of profile rows
//                   and injects it into #admin-card
// If no data      → shows a "no profile found" message
// ------------------------------------------------

function loadAdmin() {

    // Read all 5 saved profile values from localStorage
    var name    = localStorage.getItem("stuName");
    var cls     = localStorage.getItem("stuClass");
    var subject = localStorage.getItem("stuSubject");
    var goal    = localStorage.getItem("stuGoal");
    var style   = localStorage.getItem("stuStyle");

    // Get the card div where we will display the data
    var card = document.getElementById("admin-card");

    // Check if at least a name was saved — if not, nothing was filled
    if (name === null || name === "") {

        // Show a friendly message — no data to display
        card.innerHTML =
            "<p class='admin-no-data'>⚠️ No student profile found.<br>" +
            "Ask the student to <a href='profile.html'>fill their profile</a> first.</p>";
        return;
    }

    // Profile exists — build the card heading and data rows
    card.innerHTML =
        "<div class='admin-card-header'>" +
            "<span class='admin-avatar'>👤</span>" +
            "<div>" +
                "<h3 class='admin-student-name'>" + name + "</h3>" +
                "<p class='admin-student-label'>Student Profile</p>" +
            "</div>" +
        "</div>" +

        "<div class='admin-divider'></div>" +

        // Each row: label on the left, value on the right
        "<div class='admin-row'>" +
            "<span class='admin-label'>Full Name</span>" +
            "<span class='admin-value'>" + name + "</span>" +
        "</div>" +

        "<div class='admin-row'>" +
            "<span class='admin-label'>Class / Year</span>" +
            "<span class='admin-value'>" + (cls     || "Not set") + "</span>" +
        "</div>" +

        "<div class='admin-row'>" +
            "<span class='admin-label'>Subject Interest</span>" +
            "<span class='admin-value'>" + (subject || "Not set") + "</span>" +
        "</div>" +

        "<div class='admin-row'>" +
            "<span class='admin-label'>Learning Goal</span>" +
            "<span class='admin-value'>" + (goal    || "Not set") + "</span>" +
        "</div>" +

        "<div class='admin-row'>" +
            "<span class='admin-label'>Learning Style</span>" +
            "<span class='admin-value'>" + (style   || "Not set") + "</span>" +
        "</div>";
}