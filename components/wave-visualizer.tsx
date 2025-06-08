"use client"

import { useEffect, useRef } from "react"

export function WaveVisualizer() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

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

    // Wave parameters
    const waves = [
      { amplitude: 25, frequency: 0.02, speed: 0.01, color: "#0ea5e9", phase: 0 },
      { amplitude: 15, frequency: 0.03, speed: 0.015, color: "#0d9488", phase: 2 },
      { amplitude: 10, frequency: 0.01, speed: 0.02, color: "#0891b2", phase: 4 },
    ]

    // Animation
    let animationId: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      waves.forEach((wave) => {
        wave.phase += wave.speed
        drawWave(ctx, canvas.width, canvas.height, wave)
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      cancelAnimationFrame(animationId)
    }
  }, [])

  const drawWave = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    wave: { amplitude: number; frequency: number; color: string; phase: number },
  ) => {
    ctx.beginPath()
    ctx.moveTo(0, height / 2)

    for (let x = 0; x < width; x++) {
      const y = Math.sin(x * wave.frequency + wave.phase) * wave.amplitude + height / 2
      ctx.lineTo(x, y)
    }

    ctx.strokeStyle = wave.color
    ctx.lineWidth = 2
    ctx.stroke()
  }

  return <canvas ref={canvasRef} className="w-full h-full" />
}
