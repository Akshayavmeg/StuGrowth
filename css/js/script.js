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
// Reads 3 values from localStorage:
//   stuSubject → Subject Interest  (e.g. "Python", "Data")
//   stuGoal    → Learning Goal     (e.g. "get a job", "crack JEE")
//   stuStyle   → Learning Style    (Videos / Reading / Practice / Mixed)
//
// Step 1: Pick a base course list based on subject keyword
// Step 2: Re-order the list based on learning style preference
//         Videos   → video courses float to the top
//         Practice → project/hands-on courses float to the top
//         Reading  → theory/reading courses float to the top
//         Mixed    → no reordering, show all as-is
//
// Each course object has:
//   icon  — emoji shown at the top of the card
//   title — course name
//   desc  — one-line description
//   type  — "video" | "practice" | "reading"
//           used to reorder by learning style
//   tag   — small label shown on the card  e.g. "📹 Video Course"
// ------------------------------------------------

function loadRecommendations() {

    // --- Step 1: Read all 3 profile values from localStorage ---
    var subject = localStorage.getItem("stuSubject") || "";
    var goal    = localStorage.getItem("stuGoal")    || "";
    var style   = localStorage.getItem("stuStyle")   || "";

    var container = document.getElementById("rec-container");
    var subtitle  = document.getElementById("rec-subtitle");

    // If no profile saved at all, ask student to fill profile first
    if (subject === "" && goal === "" && style === "") {
        container.innerHTML =
            "<p class='rec-no-profile'>" +
            "⚠️ No profile found. Please " +
            "<a href='profile.html'>fill your profile</a> first." +
            "</p>";
        return;
    }

    // Lowercase for easier keyword matching
    var subjectLow = subject.toLowerCase();
    var goalLow    = goal.toLowerCase();

    // courses array — filled based on subject match below
    var courses = [];


    // --- Step 2: Pick base course list by subject keyword ---

    if (subjectLow.indexOf("python") !== -1) {

        subtitle.textContent = "Recommended for: Python  •  Goal: " + (goal || "Not set");
        courses = [
            {
                icon: "🐍", type: "reading",
                tag: "📖 Beginner",
                title: "Python Basics",
                desc: "Variables, loops, functions and the fundamentals of Python."
            },
            {
                icon: "▶️", type: "video",
                tag: "📹 Video Course",
                title: "Python Crash Course – Video Series",
                desc: "Watch and code along — covers syntax, lists, dicts and functions."
            },
            {
                icon: "⚙️", type: "reading",
                tag: "📖 Intermediate",
                title: "Intermediate Python",
                desc: "OOP, file handling, modules and writing cleaner Python code."
            },
            {
                icon: "🎬", type: "video",
                tag: "📹 Video Course",
                title: "Python OOP – Video Deep Dive",
                desc: "Step-by-step video lessons on classes, inheritance and design."
            },
            {
                icon: "🛠️", type: "practice",
                tag: "💻 Hands-On",
                title: "Python Mini Projects",
                desc: "Build a calculator, to-do app and number guessing game."
            },
            {
                icon: "🚀", type: "practice",
                tag: "💻 Capstone Project",
                title: "Python Web Scraper Project",
                desc: "Scrape real websites using requests and BeautifulSoup."
            }
        ];

    } else if (subjectLow.indexOf("data") !== -1) {

        subtitle.textContent = "Recommended for: Data Structures  •  Goal: " + (goal || "Not set");
        courses = [
            {
                icon: "🗂️", type: "reading",
                tag: "📖 Theory",
                title: "Arrays & Linked Lists",
                desc: "Understand memory, indexing and pointer-based data structures."
            },
            {
                icon: "▶️", type: "video",
                tag: "📹 Video Course",
                title: "DSA Visualised – Video Series",
                desc: "Watch algorithms run step-by-step with clear animations."
            },
            {
                icon: "🌲", type: "reading",
                tag: "📖 Intermediate",
                title: "Trees & Graphs",
                desc: "BFS, DFS, binary search trees and graph traversal explained."
            },
            {
                icon: "⚡", type: "practice",
                tag: "💻 Hands-On",
                title: "DSA Coding Practice",
                desc: "Solve 30 curated problems on arrays, stacks, queues and trees."
            },
            {
                icon: "🏆", type: "practice",
                tag: "💻 Competitive Prep",
                title: "Algorithm Challenges",
                desc: "Time and space complexity problems for placement preparation."
            }
        ];

    } else if (subjectLow.indexOf("web") !== -1 || subjectLow.indexOf("html") !== -1) {

        subtitle.textContent = "Recommended for: Web Development  •  Goal: " + (goal || "Not set");
        courses = [
            {
                icon: "🌐", type: "reading",
                tag: "📖 Beginner",
                title: "HTML & CSS Fundamentals",
                desc: "Build your first webpage — structure, styling and layouts."
            },
            {
                icon: "▶️", type: "video",
                tag: "📹 Video Course",
                title: "Web Dev Bootcamp – Video Series",
                desc: "Full video course covering HTML, CSS and JavaScript basics."
            },
            {
                icon: "✨", type: "reading",
                tag: "📖 Intermediate",
                title: "JavaScript for Web",
                desc: "DOM manipulation, events and making pages interactive."
            },
            {
                icon: "🛠️", type: "practice",
                tag: "💻 Hands-On",
                title: "Build 3 Web Projects",
                desc: "Portfolio site, to-do list app and a weather card UI."
            },
            {
                icon: "🎬", type: "video",
                tag: "📹 Video Course",
                title: "Responsive Design – Video Guide",
                desc: "Watch how to make websites look great on all screen sizes."
            }
        ];

    } else if (subjectLow.indexOf("math") !== -1 || goalLow.indexOf("jee") !== -1) {

        subtitle.textContent = "Recommended for: Mathematics  •  Goal: " + (goal || "Not set");
        courses = [
            {
                icon: "➕", type: "reading",
                tag: "📖 Foundation",
                title: "Algebra & Equations",
                desc: "Master equations, inequalities and algebraic expressions."
            },
            {
                icon: "▶️", type: "video",
                tag: "📹 Video Course",
                title: "Maths Problem Solving – Video Series",
                desc: "Watch worked examples for JEE-level algebra and calculus."
            },
            {
                icon: "📐", type: "reading",
                tag: "📖 Intermediate",
                title: "Trigonometry & Geometry",
                desc: "Angles, identities, coordinate geometry and proofs."
            },
            {
                icon: "🧩", type: "practice",
                tag: "💻 Practice Set",
                title: "100 Maths Problems",
                desc: "Timed practice across algebra, calculus and statistics topics."
            },
            {
                icon: "🏅", type: "practice",
                tag: "💻 Mock Test",
                title: "JEE / Aptitude Mock Test",
                desc: "Full-length practice test simulating exam conditions."
            }
        ];

    } else {

        // Default — no subject keyword matched
        subtitle.textContent = "General Recommendations  •  Goal: " + (goal || "Not set");
        courses = [
            {
                icon: "📚", type: "reading",
                tag: "📖 Essentials",
                title: "How to Study Effectively",
                desc: "Build consistent study habits and improve information retention."
            },
            {
                icon: "▶️", type: "video",
                tag: "📹 Video Course",
                title: "Learning How to Learn – Video",
                desc: "Science-backed video lessons on memory, focus and motivation."
            },
            {
                icon: "🧠", type: "reading",
                tag: "📖 Technique",
                title: "Spaced Repetition & Active Recall",
                desc: "The two most powerful techniques for long-term memory."
            },
            {
                icon: "🗓️", type: "practice",
                tag: "💻 Practice",
                title: "Build Your Study Plan",
                desc: "Create a weekly schedule that balances subjects and breaks."
            }
        ];
    }


    // --- Step 3: Reorder courses based on Learning Style ---
    //
    // We separate courses into two groups:
    //   "preferred" — matches the selected style
    //   "others"    — everything else
    // Then we concatenate: preferred first, others after.
    // This simulates an AI ranking/personalisation step.

    var preferred = [];   // courses matching the style
    var others    = [];   // remaining courses

    if (style === "Videos") {
        for (var i = 0; i < courses.length; i++) {
            if (courses[i].type === "video") {
                preferred.push(courses[i]);
            } else {
                others.push(courses[i]);
            }
        }

    } else if (style === "Practice") {
        for (var i = 0; i < courses.length; i++) {
            if (courses[i].type === "practice") {
                preferred.push(courses[i]);
            } else {
                others.push(courses[i]);
            }
        }

    } else if (style === "Reading") {
        for (var i = 0; i < courses.length; i++) {
            if (courses[i].type === "reading") {
                preferred.push(courses[i]);
            } else {
                others.push(courses[i]);
            }
        }

    } else {
        // Mixed or not set — no reordering, show all in original order
        preferred = courses;
    }

    // Merge: preferred courses come first, then the rest
    var finalCourses = preferred.concat(others);

    // Show the active learning style as a badge under the subtitle
    var styleTagEl = document.getElementById("rec-style-tag");
    if (styleTagEl) {
        if (style !== "") {
            styleTagEl.textContent = "🎯 Learning Style: " + style + "  •  Courses sorted for you";
            styleTagEl.style.fontSize   = "13px";
            styleTagEl.style.color      = "#c8dff8";
            styleTagEl.style.marginTop  = "4px";
        } else {
            styleTagEl.textContent = "";
        }
    }


    // --- Step 4: Build and inject the cards into the page ---

    container.innerHTML = "";

    for (var j = 0; j < finalCourses.length; j++) {

        var course = finalCourses[j];

        // First card gets a "⭐ Top Pick" ribbon if a style was chosen
        var ribbon = "";
        if (j === 0 && style !== "" && style !== "Mixed") {
            ribbon = "<div class='rec-ribbon'>⭐ Top Pick for " + style + "</div>";
        }

        var cardHTML =
            "<div class='card rec-card'>" +
                ribbon +
                "<div class='card-icon'>" + course.icon + "</div>" +
                "<span class='rec-tag'>" + course.tag + "</span>" +
                "<h3 class='card-title'>" + course.title + "</h3>" +
                "<p class='card-text'>" + course.desc + "</p>" +
                "<button class='btn-primary btn-card'>Start Course</button>" +
            "</div>";

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