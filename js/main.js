// EECP COMPUTER SCIENCE WEBSITE
// MAIN JAVASCRIPT

// MOBILE NAVIGATION
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
        const isOpen = navLinks.classList.toggle("show");
        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.setAttribute("aria-label",
            isOpen ? "Close navigation" : "Open navigation");
        menuToggle.textContent = isOpen ? "✕" : "☰";
    });
}

// AUTOMATIC FOOTER YEAR
const yearElement = document.getElementById("currentYear");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

// CLOSE MOBILE MENU AFTER CLICKING A LINK
if (navLinks) {
    navLinks.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            navLinks.classList.remove("show");

            if (menuToggle) {
                menuToggle.textContent = "☰";
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute("aria-label", "Open navigation");
            }
        });
    });
}

console.log("EECP CS Website loaded successfully!");