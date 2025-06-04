"use client"

import { useEffect, useState } from "react"

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 })
  const [followerPosition, setFollowerPosition] = useState({ x: -100, y: -100 })
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })

      // Follower position with slight delay
      setTimeout(() => {
        setFollowerPosition({ x: e.clientX, y: e.clientY })
      }, 100)
    }

    const handleMouseOut = (e: MouseEvent) => {
      if (e.relatedTarget === null) {
        setIsVisible(false)
      }
    }

    const handleMouseOver = () => {
      setIsVisible(true)
    }

    // Add event listeners for cursor movement
    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseout", handleMouseOut)
    document.addEventListener("mouseover", handleMouseOver)

    // Add hover effect for interactive elements
    const addHoverListeners = () => {
      const interactiveElements = document.querySelectorAll(
        "a, button, .btn, .project-card, .tech-item, .skill-item, .stat-item",
      )

      const handleMouseEnter = () => setIsHovering(true)
      const handleMouseLeave = () => setIsHovering(false)

      interactiveElements.forEach((element) => {
        element.addEventListener("mouseenter", handleMouseEnter)
        element.addEventListener("mouseleave", handleMouseLeave)
      })

      return () => {
        interactiveElements.forEach((element) => {
          element.removeEventListener("mouseenter", handleMouseEnter)
          element.removeEventListener("mouseleave", handleMouseLeave)
        })
      }
    }

    // Wait for DOM to be fully loaded before adding hover listeners
    const cleanup = addHoverListeners()

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseout", handleMouseOut)
      document.removeEventListener("mouseover", handleMouseOver)
      cleanup()
    }
  }, [])

  return (
    <>
      <div
        className="cursor"
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
          width: isHovering ? "20px" : "10px",
          height: isHovering ? "20px" : "10px",
          opacity: isVisible ? 1 : 0,
        }}
      ></div>
      <div
        className="cursor-follower"
        style={{
          transform: `translate(${followerPosition.x}px, ${followerPosition.y}px)`,
          width: isHovering ? "50px" : "30px",
          height: isHovering ? "50px" : "30px",
          borderColor: isHovering ? "var(--accent-color)" : "var(--primary-color)",
          opacity: isVisible ? 1 : 0,
        }}
      ></div>
    </>
  )
}
