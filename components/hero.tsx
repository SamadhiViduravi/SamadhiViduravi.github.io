"use client"

import { useEffect } from "react"
import Image from "next/image"

export default function Hero() {
  useEffect(() => {
    // Simple CSS animations
    const elements = [
      { selector: ".hero-content h1", delay: 200 },
      { selector: ".title-container", delay: 400 },
      { selector: ".hero-description", delay: 600 },
      { selector: ".cta-buttons", delay: 800 },
      { selector: ".hero-image", delay: 600 },
    ]

    elements.forEach(({ selector, delay }) => {
      const element = document.querySelector(selector) as HTMLElement
      if (element) {
        setTimeout(() => {
          element.style.opacity = "1"
          element.style.transform = "translate(0)"
        }, delay)
      }
    })
  }, [])

  return (
    <section id="home" className="hero" data-scroll-section>
      <div className="container">
        <div className="hero-content">
          <h1
            className="glitch"
            data-text="Samadhi Viduravi"
            style={{ opacity: 0, transform: "translateY(50px)", transition: "opacity 1s ease, transform 1s ease" }}
          >
            Samadhi Viduravi
          </h1>
          <div
            className="title-container"
            style={{ opacity: 0, transform: "translateY(50px)", transition: "opacity 1s ease, transform 1s ease" }}
          >
            <h2 className="gradient-text">Full Stack Developer</h2>
          </div>
          <p
            className="hero-description"
            style={{ opacity: 0, transform: "translateY(50px)", transition: "opacity 1s ease, transform 1s ease" }}
          >
            Crafting digital experiences with code. Building innovative solutions at the intersection of software
            engineering.
          </p>
          <div
            className="cta-buttons"
            style={{ opacity: 0, transform: "translateY(50px)", transition: "opacity 1s ease, transform 1s ease" }}
          >
            <a href="/documents/Samadhi_Viduravi_CV.pdf" download className="btn primary-btn">
              Download CV
            </a>
            <a href="#contact" className="btn secondary-btn">
              Get In Touch
            </a>
          </div>
        </div>
        <div
          className="hero-image"
          style={{ opacity: 0, transform: "translateX(50px)", transition: "opacity 1s ease, transform 1s ease" }}
        >
          <div className="image-wrapper">
            <Image src="/images/SamadhiViduravi.jpeg" alt="Samadhi Viduravi" width={400} height={500} priority />
            <div className="image-glitch"></div>
          </div>
        </div>
      </div>
      <div className="scroll-indicator">
        <div className="mouse">
          <div className="wheel"></div>
        </div>
        <div className="arrow">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </section>
  )
}
