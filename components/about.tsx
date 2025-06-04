"use client"

import { useEffect } from "react"
import { GraduationCap } from "lucide-react"

export default function About() {
  useEffect(() => {
    // Counter animation
    const animateCounters = () => {
      const statNumbers = document.querySelectorAll(".stat-number")

      statNumbers.forEach((stat) => {
        const target = Number.parseInt(stat.getAttribute("data-count") || "0")
        let current = 0
        const duration = 2000 // 2 seconds
        const increment = target / (duration / 16) // 60fps

        // Set initial value
        stat.textContent = "0"

        // Create animation
        const updateCounter = () => {
          current += increment
          if (current < target) {
            stat.textContent = Math.ceil(current).toString()
            requestAnimationFrame(updateCounter)
          } else {
            stat.textContent = target.toString()
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

    animateCounters()
  }, [])

  return (
    <section id="about" className="about" data-scroll-section>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title" data-scroll data-scroll-speed="1">
            About Me
          </h2>
          <div className="section-line" data-scroll data-scroll-speed="1.2"></div>
        </div>
        <div className="about-content">
          <div className="about-text" data-scroll data-scroll-speed="1">
            <p>
              I'm a second-year Software Engineering student at the University of Westminster, passionate about web
              development and machine learning. I enjoy building projects that solve real-world problems, with a strong
              foundation in OOP and software design.
            </p>
            <p>
              When I'm not coding, you'll find me exploring the open road on my motorcycle, finding the perfect balance
              between technical precision and the freedom of the ride.
            </p>
            <div className="education">
              <h3>Education</h3>
              <div className="education-item">
                <div className="education-icon">
                  <GraduationCap size={32} />
                </div>
                <div className="education-details">
                  <h4>BEng (Hons) Software Engineering</h4>
                  <p>University of Westminster (2023 – 2026)</p>
                  <ul>
                    <li>Studying Software Engineering with a focus on OOP, Web Development, and Machine Learning</li>
                    <li>Completed projects in Java, Python, and Web Development</li>
                    <li>Coursework includes Data Structures, Algorithms, and Software Engineering Principles</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="about-stats" data-scroll data-scroll-speed="1.2">
            <div className="stat-item">
              <div className="stat-number" data-count="2">
                0
              </div>
              <div className="stat-text">
                Years of
                <br />
                Experience
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-number" data-count="10">
                0
              </div>
              <div className="stat-text">
                Projects
                <br />
                Completed
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-number" data-count="5">
                0
              </div>
              <div className="stat-text">
                Technologies
                <br />
                Mastered
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
