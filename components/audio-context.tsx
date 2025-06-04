"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface AudioContextType {
  isMuted: boolean
  toggleMute: () => void
}

const AudioContext = createContext<AudioContextType>({
  isMuted: false,
  toggleMute: () => {},
})

export const useAudio = () => useContext(AudioContext)

export const AudioProvider = ({ children }: { children: ReactNode }) => {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null)
  const [isMuted, setIsMuted] = useState(false)

  useEffect(() => {
    // Create audio element
    const audioElement = new Audio("/audio/BGM.mp3")
    audioElement.loop = true
    audioElement.volume = 0.3
    setAudio(audioElement)

    // Function to play audio (needed because of autoplay restrictions)
    const playAudio = () => {
      if (!audioElement) return

      const playPromise = audioElement.play()

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log("Audio started playing automatically")
          })
          .catch((error) => {
            console.log("Autoplay prevented:", error)
            setIsMuted(true)
            audioElement.muted = true
          })
      }
    }

    // Try to play audio when the component mounts
    playAudio()

    // Add user interaction event listeners to start audio
    const handleUserInteraction = () => {
      if (audioElement && audioElement.paused && !audioElement.muted) {
        playAudio()
      }
    }

    document.addEventListener("click", handleUserInteraction)
    document.addEventListener("keydown", handleUserInteraction)

    return () => {
      if (audioElement) {
        audioElement.pause()
        audioElement.src = ""
      }
      document.removeEventListener("click", handleUserInteraction)
      document.removeEventListener("keydown", handleUserInteraction)
    }
  }, [])

  const toggleMute = () => {
    if (!audio) return

    audio.muted = !audio.muted
    setIsMuted(audio.muted)

    // If unmuting and audio is paused, play it
    if (!audio.muted && audio.paused) {
      audio.play().catch((error) => {
        console.log("Failed to play audio:", error)
      })
    }
  }

  return <AudioContext.Provider value={{ isMuted, toggleMute }}>{children}</AudioContext.Provider>
}
