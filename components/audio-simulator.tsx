"use client"

import { useEffect, useRef, useState } from "react"

interface AudioSimulatorProps {
  isPlaying: boolean
  onTimeUpdate: (time: number) => void
  duration: number
  onEnded: () => void
}

export function AudioSimulator({ isPlaying, onTimeUpdate, duration, onEnded }: AudioSimulatorProps) {
  const [currentTime, setCurrentTime] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (isPlaying) {
      // Clear any existing interval
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }

      // Set up a new interval to simulate audio playback
      intervalRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          const newTime = prev + 0.1

          // If we've reached the end of the track
          if (newTime >= duration) {
            clearInterval(intervalRef.current!)
            onEnded()
            return 0
          }

          onTimeUpdate(newTime)
          return newTime
        })
      }, 100) // Update every 100ms
    } else if (intervalRef.current) {
      // Stop the interval if we're not playing
      clearInterval(intervalRef.current)
    }

    // Cleanup
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isPlaying, duration, onEnded, onTimeUpdate])

  return null // This component doesn't render anything
}
