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

  // DIRECT SKILL BAR ANIMATION - No GSAP or ScrollTrigger
  function animateSkillBarsDirectly() {
    // Add CSS for skill bars
    const skillStyle = document.createElement("style")
    skillStyle.textContent = `
      .skill-bar {
        background-color: rgba(255, 255, 255, 0.1);
        height: 8px;
        border-radius: 4px;
        margin-top: 8px;
        overflow: hidden;
        position: relative;
      }
      .skill-progress {
        height: 100%;
        background: linear-gradient(90deg, var(--primary-color), var(--accent-color));
        border-radius: 4px;
        position: relative;
        width: 0%; /* Start at 0 */
        transition: width 1.5s ease-out;
        box-shadow: 0 0 10px rgba(112, 0, 255, 0.5);
      }
    `
    document.head.appendChild(skillStyle)

    // Get all skill progress bars
    const skillProgressBars = document.querySelectorAll(".skill-progress")

    // Set initial width to 0
    skillProgressBars.forEach((bar) => {
      bar.style.width = "0%"
    })

    // Force browser reflow
    void document.body.offsetHeight

    // Animate to final width
    skillProgressBars.forEach((bar) => {
      const progress = bar.getAttribute("data-progress")
      setTimeout(() => {
        bar.style.width = `${progress}%`
      }, 300) // Small delay to ensure animation works
    })
  }

  // Call the direct animation function immediately
  animateSkillBarsDirectly()

  // Also call it when the skills section comes into view
  const skillsSection = document.getElementById("skills")
  if (skillsSection) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateSkillBarsDirectly()
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 },
    )

    observer.observe(skillsSection)
  }

  // Animate stat counters
  const statNumbers = document.querySelectorAll(".stat-number")

  // Find the animateCounters function and replace it with this improved version
  function animateCounters() {
    const statNumbers = document.querySelectorAll(".stat-number")

    statNumbers.forEach((stat) => {
      const target = Number.parseInt(stat.getAttribute("data-count"))

      // Direct animation without ScrollTrigger dependency
      let current = 0
      const duration = 2000 // 2 seconds
      const increment = target / (duration / 16) // 60fps

      // Set initial value
      stat.textContent = "0"

      // Create animation
      const updateCounter = () => {
        current += increment
        if (current < target) {
          stat.textContent = Math.ceil(current)
          requestAnimationFrame(updateCounter)
        } else {
          stat.textContent = target
        }
      }

      // Use Intersection Observer to start animation when element is visible
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              requestAnimationFrame(updateCounter)
              observer.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.1 },
      )

      observer.observe(stat)
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

  // ADDITIONAL FALLBACK: Direct DOM manipulation for skill bars
  // This is a last resort if all other methods fail
  setTimeout(() => {
    const skillBars = document.querySelectorAll(".skill-progress")
    const anyAnimated = Array.from(skillBars).some((bar) => Number.parseFloat(getComputedStyle(bar).width) > 10)

    if (!anyAnimated) {
      console.log("Using direct DOM manipulation for skill bars")
      skillBars.forEach((bar) => {
        const progress = bar.getAttribute("data-progress")
        bar.style.cssText = `
          width: ${progress}% !important; 
          height: 100% !important;
          background: linear-gradient(90deg, #7000ff, #00e5ff) !important;
          border-radius: 4px !important;
          position: relative !important;
          box-shadow: 0 0 10px rgba(112, 0, 255, 0.5) !important;
          transition: none !important;
        `
      })
    }
  }, 2500)

  // Create a standalone function to animate skill bars without dependencies
  function forceAnimateSkillBars() {
    const skillBars = document.querySelectorAll(".skill-progress")
    skillBars.forEach((bar) => {
      const progress = bar.getAttribute("data-progress")
      bar.style.width = `${progress}%`
    })
  }

  // Call it on window load as well
  window.addEventListener("load", forceAnimateSkillBars)

  // And call it after a delay
  setTimeout(forceAnimateSkillBars, 1000)
  setTimeout(forceAnimateSkillBars, 2000)
})

// Add a standalone function outside the DOMContentLoaded event
// This ensures it runs even if there are issues with the event
window.onload = () => {
  setTimeout(() => {
    const skillBars = document.querySelectorAll(".skill-progress")
    skillBars.forEach((bar) => {
      const progress = bar.getAttribute("data-progress")
      bar.style.width = `${progress}%`
    })
    console.log("Window onload skill bar animation applied")
  }, 500)
}

// Add a direct script to run immediately
document.addEventListener("DOMContentLoaded", () => {
  // Create and inject CSS for skill bars
  const style = document.createElement("style")
  style.innerHTML = `
    .skill-bar {
      background-color: rgba(255, 255, 255, 0.1);
      height: 8px;
      border-radius: 4px;
      margin-top: 8px;
      overflow: hidden;
      position: relative;
    }
    .skill-progress {
      height: 100%;
      background: linear-gradient(90deg, #7000ff, #00e5ff);
      border-radius: 4px;
      position: relative;
      transition: width 1.5s ease-out;
      box-shadow: 0 0 10px rgba(112, 0, 255, 0.5);
    }
  `
  document.head.appendChild(style)

  // Direct animation without dependencies
  setTimeout(() => {
    const bars = document.querySelectorAll(".skill-progress")
    bars.forEach((bar) => {
      const progress = bar.getAttribute("data-progress")
      bar.style.width = `${progress}%`
    })
  }, 100)
})

// Add a standalone counter animation function that doesn't depend on other libraries
function directCounterAnimation() {
  const statNumbers = document.querySelectorAll(".stat-number")

  statNumbers.forEach((stat) => {
    const target = Number.parseInt(stat.getAttribute("data-count"))
    let current = 0
    const duration = 2000 // 2 seconds
    const increment = target / (duration / 16) // 60fps

    // Set initial value
    stat.textContent = "0"

    // Create animation
    const updateCounter = () => {
      current += increment
      if (current < target) {
        stat.textContent = Math.ceil(current)
        requestAnimationFrame(updateCounter)
      } else {
        stat.textContent = target
      }
    }

    requestAnimationFrame(updateCounter)
  })
}

// Call the direct animation function after a delay
setTimeout(directCounterAnimation, 1000)

// Also call it on window load
window.addEventListener("load", directCounterAnimation)
