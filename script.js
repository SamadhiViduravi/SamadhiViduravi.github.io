// Initialize Locomotive Scroll for smooth scrolling
document.addEventListener("DOMContentLoaded", () => {
  // Import necessary libraries (GSAP, Locomotive Scroll, ScrollTrigger)
  gsap.registerPlugin(ScrollTrigger)

  // Custom cursor
  const cursor = document.querySelector(".cursor")
  const cursorFollower = document.querySelector(".cursor-follower")
  const links = document.querySelectorAll("a, button, .btn, .project-card, .tech-item, .skill-item, .stat-item")

  document.addEventListener("mousemove", (e) => {
    gsap.to(cursor, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.1,
    })
    gsap.to(cursorFollower, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.3,
    })
  })

  // Cursor effects on interactive elements
  links.forEach((link) => {
    link.addEventListener("mouseenter", () => {
      cursor.style.width = "20px"
      cursor.style.height = "20px"
      cursorFollower.style.width = "50px"
      cursorFollower.style.height = "50px"
      cursorFollower.style.borderColor = "var(--accent-color)"
    })

    link.addEventListener("mouseleave", () => {
      cursor.style.width = "10px"
      cursor.style.height = "10px"
      cursorFollower.style.width = "30px"
      cursorFollower.style.height = "30px"
      cursorFollower.style.borderColor = "var(--primary-color)"
    })
  })

  // Hide cursor when leaving the window
  document.addEventListener("mouseout", (e) => {
    if (e.relatedTarget === null) {
      cursor.style.opacity = "0"
      cursorFollower.style.opacity = "0"
    }
  })

  document.addEventListener("mouseover", () => {
    cursor.style.opacity = "1"
    cursorFollower.style.opacity = "1"
  })

  // Initialize Locomotive Scroll
  const scroll = new LocomotiveScroll({
    el: document.querySelector("[data-scroll-container]"),
    smooth: true,
    smartphone: { smooth: true },
    tablet: { smooth: true },
  })

  // Update scroll on window resize
  window.addEventListener("resize", () => {
    scroll.update()
  })

  // Navbar scroll effect
  scroll.on("scroll", (instance) => {
    const navbar = document.querySelector(".navbar")
    if (instance.scroll.y > 50) {
      navbar.classList.add("scrolled")
    } else {
      navbar.classList.remove("scrolled")
    }
  })

  // GSAP animations
  // Hero section animations
  gsap.from(".hero-content h1", {
    y: 100,
    opacity: 0,
    duration: 1,
    delay: 0.2,
  })

  gsap.from(".title-container", {
    y: 50,
    opacity: 0,
    duration: 1,
    delay: 0.4,
  })

  gsap.from(".hero-description", {
    y: 50,
    opacity: 0,
    duration: 1,
    delay: 0.6,
  })

  gsap.from(".cta-buttons", {
    y: 50,
    opacity: 0,
    duration: 1,
    delay: 0.8,
  })

  gsap.from(".hero-image", {
    x: 100,
    opacity: 0,
    duration: 1,
    delay: 0.6,
  })

  // Animate skill progress bars when in view
  const skillProgressBars = document.querySelectorAll(".skill-progress")

  function animateSkillBars() {
    skillProgressBars.forEach((bar) => {
      const progress = bar.getAttribute("data-progress")
      gsap.to(bar, {
        width: `${progress}%`,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: bar,
          scroller: "[data-scroll-container]",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      })
    })
  }

  // Animate stat counters
  const statNumbers = document.querySelectorAll(".stat-number")

  function animateCounters() {
    statNumbers.forEach((stat) => {
      const target = Number.parseInt(stat.getAttribute("data-count"))
      gsap.to(stat, {
        innerText: target,
        duration: 2,
        ease: "power2.out",
        snap: { innerText: 1 },
        scrollTrigger: {
          trigger: stat,
          scroller: "[data-scroll-container]",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        onUpdate: function () {
          stat.innerText = Math.ceil(this.targets()[0].innerText)
        },
      })
    })
  }

  // Initialize GSAP ScrollTrigger

  // Set up ScrollTrigger with Locomotive Scroll
  ScrollTrigger.scrollerProxy("[data-scroll-container]", {
    scrollTop(value) {
      return arguments.length ? scroll.scrollTo(value, 0, 0) : scroll.scroll.instance.scroll.y
    },
    getBoundingClientRect() {
      return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight }
    },
    pinType: document.querySelector("[data-scroll-container]").style.transform ? "transform" : "fixed",
  })

  // Update ScrollTrigger when Locomotive Scroll updates
  scroll.on("scroll", ScrollTrigger.update)

  // After everything is set up
  ScrollTrigger.addEventListener("refresh", () => scroll.update())
  ScrollTrigger.refresh()

  // Run animations
  animateSkillBars()
  animateCounters()

  // Mobile menu toggle
  const hamburger = document.querySelector(".hamburger")
  const navLinks = document.querySelector(".nav-links")

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active")
    navLinks.classList.toggle("active")
  })

  // Close mobile menu when clicking on a link
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active")
      navLinks.classList.remove("active")
    })
  })

  // Fix navigation links
  const navLinks2 = document.querySelectorAll(".nav-link")

  navLinks2.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      if (targetSection) {
        // Use Locomotive Scroll to scroll to the section
        const scroll = window.locomotiveScroll
        if (scroll) {
          scroll.scrollTo(targetSection)
        } else {
          // Fallback if Locomotive Scroll is not available
          targetSection.scrollIntoView({ behavior: "smooth" })
        }

        // Close mobile menu if open
        const hamburger = document.querySelector(".hamburger")
        const navLinks = document.querySelector(".nav-links")
        hamburger.classList.remove("active")
        navLinks.classList.remove("active")
      }
    })
  })

  // Project filtering
  const filterBtns = document.querySelectorAll(".filter-btn")
  const projectCards = document.querySelectorAll(".project-card")

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Remove active class from all buttons
      filterBtns.forEach((btn) => btn.classList.remove("active"))

      // Add active class to clicked button
      btn.classList.add("active")

      const filter = btn.getAttribute("data-filter")

      projectCards.forEach((card) => {
        const categories = card.getAttribute("data-category").split(" ")

        if (filter === "all" || categories.includes(filter)) {
          gsap.to(card, {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
            clearProps: "all",
          })
        } else {
          gsap.to(card, {
            scale: 0.8,
            opacity: 0,
            duration: 0.5,
            ease: "power2.out",
            onComplete: () => {
              card.style.display = "none"
            },
          })
        }
      })

      // After filtering, update the layout
      setTimeout(() => {
        scroll.update()
        ScrollTrigger.refresh()
      }, 600)
    })
  })

  // Contact form submission
  const contactForm = document.getElementById("contactForm")

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form values
      const name = document.getElementById("name").value
      const email = document.getElementById("email").value
      const subject = document.getElementById("subject").value
      const message = document.getElementById("message").value

      // Here you would typically send the form data to a server
      // For this example, we'll just log it to the console
      console.log("Form Submission:", { name, email, subject, message })

      // Show success message (in a real application)
      alert("Thank you for your message! I will get back to you soon.")

      // Reset form
      contactForm.reset()
    })
  }

  // Form input animation
  const formInputs = document.querySelectorAll(".form-group input, .form-group textarea")

  formInputs.forEach((input) => {
    input.addEventListener("focus", () => {
      input.parentElement.classList.add("focused")
    })

    input.addEventListener("blur", () => {
      if (input.value === "") {
        input.parentElement.classList.remove("focused")
      }
    })

    // Check on load if input has value
    if (input.value !== "") {
      input.parentElement.classList.add("focused")
    }
  })

  // Form input animation fix
  const formInputs2 = document.querySelectorAll(".form-group input, .form-group textarea")

  formInputs2.forEach((input) => {
    // Check if input has value on page load
    if (input.value !== "") {
      input.parentElement.classList.add("focused")
    }

    // Add focus event
    input.addEventListener("focus", () => {
      input.parentElement.classList.add("focused")
    })

    // Add blur event
    input.addEventListener("blur", () => {
      if (input.value === "") {
        input.parentElement.classList.remove("focused")
      }
    })
  })

  // Add CSS for hamburger menu animation
  const style = document.createElement("style")
  style.textContent = `
        .hamburger.active .bar:nth-child(1) {
            transform: translateY(8px) rotate(45deg);
        }
        .hamburger.active .bar:nth-child(2) {
            opacity: 0;
        }
        .hamburger.active .bar:nth-child(3) {
            transform: translateY(-8px) rotate(-45deg);
        }
        .nav-links.active {
            left: 0;
        }
        @media (max-width: 768px) {
            .nav-links {
                position: fixed;
                left: -100%;
                top: 70px;
                flex-direction: column;
                background-color: rgba(5, 5, 5, 0.95);
                width: 100%;
                text-align: center;
                transition: var(--transition);
                box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
                padding: 20px 0;
                gap: 15px;
                z-index: 999;
            }
        }
    `
  document.head.appendChild(style)

  // Add CSS for form input animation
  const formStyle = document.createElement("style")
  formStyle.textContent = `
        .form-group {
            position: relative;
            margin-bottom: 25px;
        }
        .form-group label {
            position: absolute;
            top: 15px;
            left: 15px;
            color: var(--gray-color);
            transition: var(--transition);
            pointer-events: none;
            font-size: 1rem;
        }
        .form-group.focused label {
            top: -10px;
            left: 10px;
            font-size: 0.8rem;
            background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            padding: 0 5px;
        }
    `
  document.head.appendChild(formStyle)

  // Add base CSS variables
  const baseStyle = document.createElement("style")
  baseStyle.textContent = `
        :root {
            --primary-color: #7000ff;
            --secondary-color: #ff00a0;
            --accent-color: #00e5ff;
            --dark-color: #0a0a0a;
            --darker-color: #050505;
            --light-color: #f8f9fa;
            --gray-color: #6c757d;
            --success-color: #00ff9d;
            --text-color: #e0e0e0;
            --border-color: rgba(255, 255, 255, 0.1);
            --transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
            --box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            --glow-shadow: 0 0 10px rgba(112, 0, 255, 0.5), 0 0 20px rgba(112, 0, 255, 0.3), 0 0 30px rgba(112, 0, 255, 0.1);
        }
    `
  document.head.appendChild(baseStyle)
})
