"use client"

import { useEffect } from "react"
import {
  Code,
  Database,
  GitBranch,
  Github,
  Cpu,
  Flame,
  SmartphoneIcon as Android,
  ListTodo,
  Network,
} from "lucide-react"

export default function Skills() {
  useEffect(() => {
    // Animate skill bars
    const animateSkillBars = () => {
      const skillBars = document.querySelectorAll(".skill-progress")

      // Set initial width to 0
      skillBars.forEach((bar) => {
        ;(bar as HTMLElement).style.width = "0%"
      })

      // Force browser reflow
      void document.body.offsetHeight

      // Animate to final width
      skillBars.forEach((bar) => {
        const progress = bar.getAttribute("data-progress") || "0"
        setTimeout(() => {
          ;(bar as HTMLElement).style.width = `${progress}%`
        }, 300)
      })
    }

    // Use Intersection Observer to trigger animation when section is visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateSkillBars()
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 },
    )

    const skillsSection = document.getElementById("skills")
    if (skillsSection) {
      observer.observe(skillsSection)
    }

    // Also call it directly to ensure it runs
    animateSkillBars()

    // Call it again after a delay to ensure it works
    setTimeout(animateSkillBars, 1000)
  }, [])

  return (
    <section id="skills" className="skills" data-scroll-section>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title" data-scroll data-scroll-speed="1">
            My Skills
          </h2>
          <div className="section-line" data-scroll data-scroll-speed="1.2"></div>
        </div>
        <div className="skills-content">
          <div className="skills-category" data-scroll data-scroll-speed="1">
            <h3>Programming Languages</h3>
            <div className="skills-grid">
              <div className="skill-item">
                <div className="skill-icon">
                  <i className="fab fa-java"></i>
                </div>
                <h4>Java</h4>
                <div className="skill-bar">
                  <div className="skill-progress" data-progress="90"></div>
                </div>
              </div>
              <div className="skill-item">
                <div className="skill-icon">
                  <i className="fab fa-python"></i>
                </div>
                <h4>Python</h4>
                <div className="skill-bar">
                  <div className="skill-progress" data-progress="85"></div>
                </div>
              </div>
              <div className="skill-item">
                <div className="skill-icon">
                  <i className="fab fa-js"></i>
                </div>
                <h4>JavaScript</h4>
                <div className="skill-bar">
                  <div className="skill-progress" data-progress="80"></div>
                </div>
              </div>
              <div className="skill-item">
                <div className="skill-icon">
                  <Code />
                </div>
                <h4>C++</h4>
                <div className="skill-bar">
                  <div className="skill-progress" data-progress="75"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="skills-category" data-scroll data-scroll-speed="1.2">
            <h3>Web Development</h3>
            <div className="skills-grid">
              <div className="skill-item">
                <div className="skill-icon">
                  <i className="fab fa-html5"></i>
                </div>
                <h4>HTML</h4>
                <div className="skill-bar">
                  <div className="skill-progress" data-progress="95"></div>
                </div>
              </div>
              <div className="skill-item">
                <div className="skill-icon">
                  <i className="fab fa-css3-alt"></i>
                </div>
                <h4>CSS</h4>
                <div className="skill-bar">
                  <div className="skill-progress" data-progress="90"></div>
                </div>
              </div>
              <div className="skill-item">
                <div className="skill-icon">
                  <i className="fab fa-react"></i>
                </div>
                <h4>Flutter</h4>
                <div className="skill-bar">
                  <div className="skill-progress" data-progress="85"></div>
                </div>
              </div>
              <div className="skill-item">
                <div className="skill-icon">
                  <Database size={32} />
                </div>
                <h4>MySQL</h4>
                <div className="skill-bar">
                  <div className="skill-progress" data-progress="80"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="skills-category" data-scroll data-scroll-speed="1.4">
            <h3>Tools & Technologies</h3>
            <div className="tech-stack">
              <div className="tech-item" data-tooltip="Git">
                <GitBranch size={32} />
              </div>
              <div className="tech-item" data-tooltip="GitHub">
                <Github size={32} />
              </div>
              <div className="tech-item" data-tooltip="VS Code">
                <Code size={32} />
              </div>
              <div className="tech-item" data-tooltip="Arduino">
                <Cpu size={32} />
              </div>
              <div className="tech-item" data-tooltip="Firebase">
                <Flame size={32} />
              </div>
              <div className="tech-item" data-tooltip="Android">
                <Android size={32} />
              </div>
              <div className="tech-item" data-tooltip="Agile">
                <ListTodo size={32} />
              </div>
              <div className="tech-item" data-tooltip="IoT">
                <Network size={32} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
