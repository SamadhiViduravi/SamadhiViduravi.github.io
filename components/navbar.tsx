"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useAudio } from "./audio-context"
import { Volume2, VolumeX, Github, Linkedin, Instagram } from "lucide-react"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { isMuted, toggleMute } = useAudio()
  const navbarRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleNavLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault()
    const targetSection = document.querySelector(targetId)

    if (targetSection) {
      // Close mobile menu if open
      setIsMobileMenuOpen(false)

      // Scroll to the section
      targetSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <nav ref={navbarRef} className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="container">
        <button onClick={toggleMute} className="mute-btn">
          {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
        </button>

        <div className="logo" data-scroll data-scroll-speed="1" data-scroll-position="top">
          <span className="logo-text">SV</span>
        </div>

        <ul className={`nav-links ${isMobileMenuOpen ? "active" : ""}`}>
          <li>
            <a href="#home" className="nav-link" onClick={(e) => handleNavLinkClick(e, "#home")}>
              Home
            </a>
          </li>
          <li>
            <a href="#about" className="nav-link" onClick={(e) => handleNavLinkClick(e, "#about")}>
              About
            </a>
          </li>
          <li>
            <a href="#skills" className="nav-link" onClick={(e) => handleNavLinkClick(e, "#skills")}>
              Skills
            </a>
          </li>
          <li>
            <a href="#projects" className="nav-link" onClick={(e) => handleNavLinkClick(e, "#projects")}>
              Projects
            </a>
          </li>
          <li>
            <a href="#contact" className="nav-link" onClick={(e) => handleNavLinkClick(e, "#contact")}>
              Contact
            </a>
          </li>
        </ul>

        <div className="social-icons">
          <a href="#" target="_blank" rel="noopener noreferrer">
            <Github size={16} />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <Linkedin size={16} />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <Instagram size={16} />
          </a>
        </div>

        <div
          className={`hamburger ${isMobileMenuOpen ? "active" : ""}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>
    </nav>
  )
}
