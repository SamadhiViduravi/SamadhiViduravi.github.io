"use client"

import { useEffect } from "react"
import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import About from "@/components/about"
import Skills from "@/components/skills"
import Projects from "@/components/projects"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import CustomCursor from "@/components/custom-cursor"
import { AudioProvider } from "@/components/audio-context"

export default function Home() {
  useEffect(() => {
    // Add noise effect
    const noise = document.createElement("div")
    noise.className = "noise"
    document.body.appendChild(noise)

    return () => {
      document.body.removeChild(noise)
    }
  }, [])

  return (
    <AudioProvider>
      <CustomCursor />
      <div className="scroll-container" data-scroll-container>
        <Navbar />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
        <Footer />
      </div>
    </AudioProvider>
  )
}
