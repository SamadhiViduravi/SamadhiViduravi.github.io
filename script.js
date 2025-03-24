document.addEventListener("DOMContentLoaded", function () {
    // Smooth scrolling with Locomotive Scroll
    const scroll = new LocomotiveScroll({
        el: document.querySelector(".scroll-container"),
        smooth: true
    });

    // Navbar background change on scroll
    window.addEventListener("scroll", function () {
        const navbar = document.querySelector(".navbar");
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    // Skills progress bars animation
    const skillBars = document.querySelectorAll(".skill-progress");
    skillBars.forEach(bar => {
        let progress = bar.getAttribute("data-progress");
        bar.style.width = progress + "%";
    });

    // Projects filter
    const filterButtons = document.querySelectorAll(".filter-btn");
    const projects = document.querySelectorAll(".project-card");

    filterButtons.forEach(button => {
        button.addEventListener("click", function () {
            document.querySelector(".filter-btn.active").classList.remove("active");
            this.classList.add("active");
            let filter = this.getAttribute("data-filter");

            projects.forEach(project => {
                if (filter === "all" || project.getAttribute("data-category").includes(filter)) {
                    project.style.display = "block";
                } else {
                    project.style.display = "none";
                }
            });
        });
    });

    // Contact form validation
    const contactForm = document.getElementById("contactForm");
    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();
        alert("Message sent successfully!");
        contactForm.reset();
    });
});
