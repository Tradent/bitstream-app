"use client"

import { useEffect, useRef } from "react"

interface AudioVisualizerProps {
  isActive: boolean
}

export function AudioVisualizer({ isActive }: AudioVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | null>(null)
  const barHeightsRef = useRef<number[]>([])
  const targetHeightsRef = useRef<number[]>([])
  const frameCountRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Animation parameters
    const barCount = 60
    const barWidth = Math.max(1, canvas.width / barCount - 2) // Ensure positive width
    const barGap = 2
    const maxBarHeight = canvas.height * 0.7
    const minBarHeight = 5

    // Initialize bar heights if not already set
    if (barHeightsRef.current.length !== barCount) {
      barHeightsRef.current = Array(barCount).fill(minBarHeight)
      targetHeightsRef.current = Array(barCount).fill(minBarHeight)
    }

    // Animation function
    const animate = () => {
      if (!canvas || !ctx) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Only update target heights occasionally to slow down the animation
      frameCountRef.current += 1
      if (frameCountRef.current % 30 === 0 && isActive) {
        // Update every 30 frames (about 0.5 seconds)
        for (let i = 0; i < barCount; i++) {
          targetHeightsRef.current[i] = isActive
            ? Math.random() * maxBarHeight * 0.8 + maxBarHeight * 0.2
            : minBarHeight
        }
      }

      // Smoothly transition current heights toward target heights
      for (let i = 0; i < barCount; i++) {
        const target = targetHeightsRef.current[i] || minBarHeight
        barHeightsRef.current[i] = barHeightsRef.current[i] + (target - barHeightsRef.current[i]) * 0.05
      }

      // Draw bars
      for (let i = 0; i < barCount; i++) {
        // Ensure height is a valid number and within bounds
        let height = barHeightsRef.current[i] || minBarHeight

        // Clamp height to valid range
        height = Math.max(minBarHeight, Math.min(height, maxBarHeight))

        const x = i * (barWidth + barGap)
        const y = Math.max(0, canvas.height - height)

        try {
          // Create gradient - ensure all values are finite
          if (isFinite(y) && isFinite(canvas.height)) {
            const gradient = ctx.createLinearGradient(0, y, 0, canvas.height)
            gradient.addColorStop(0, "#0ea5e9") // sky-500
            gradient.addColorStop(1, "#14b8a6") // teal-500
            ctx.fillStyle = gradient
          } else {
            // Fallback if values are not finite
            ctx.fillStyle = "#0ea5e9"
          }

          ctx.fillRect(x, y, barWidth, height)
        } catch (error) {
          // Use a solid color as fallback
          ctx.fillStyle = "#0ea5e9"
          ctx.fillRect(x, 0, barWidth, minBarHeight)
        }
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    // Start animation
    animate()

    // Update target heights when isActive changes
    if (!isActive) {
      targetHeightsRef.current = Array(barCount).fill(minBarHeight)
    }

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isActive]) // Only depend on isActive prop

  return <canvas ref={canvasRef} className="w-full h-full" />
}
