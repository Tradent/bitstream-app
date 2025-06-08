"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

export function LineChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)

    // Chart configuration
    const isDark = theme === "dark"
    const textColor = isDark ? "rgba(255, 255, 255, 0.8)" : "rgba(15, 23, 42, 0.8)"
    const gridColor = isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(15, 23, 42, 0.1)"
    const lineColor = "rgba(14, 165, 233, 0.8)"
    const fillColor = "rgba(14, 165, 233, 0.2)"

    // Sample data
    const data = [12, 19, 27, 23, 22, 38, 41, 44, 35, 48, 52, 57, 41, 50]
    const labels = Array.from({ length: data.length }, (_, i) => `Day ${i + 1}`)

    // Chart dimensions
    const padding = 20
    const width = rect.width - padding * 2
    const height = rect.height - padding * 2

    // Clear canvas
    ctx.clearRect(0, 0, rect.width, rect.height)

    // Draw grid
    ctx.strokeStyle = gridColor
    ctx.lineWidth = 0.5

    // Horizontal grid lines
    const numHLines = 5
    for (let i = 0; i <= numHLines; i++) {
      const y = padding + (height / numHLines) * i
      ctx.beginPath()
      ctx.moveTo(padding, y)
      ctx.lineTo(padding + width, y)
      ctx.stroke()
    }

    // Vertical grid lines
    const numVLines = data.length - 1
    for (let i = 0; i <= numVLines; i++) {
      const x = padding + (width / numVLines) * i
      ctx.beginPath()
      ctx.moveTo(x, padding)
      ctx.lineTo(x, padding + height)
      ctx.stroke()
    }

    // Draw labels
    ctx.fillStyle = textColor
    ctx.font = "10px sans-serif"
    ctx.textAlign = "center"

    // X-axis labels (show every other label to avoid crowding)
    for (let i = 0; i < labels.length; i += 2) {
      const x = padding + (width / (labels.length - 1)) * i
      ctx.fillText(labels[i], x, rect.height - 5)
    }

    // Y-axis labels
    const maxValue = Math.max(...data) * 1.1
    for (let i = 0; i <= numHLines; i++) {
      const y = padding + (height / numHLines) * i
      const value = Math.round(maxValue - (maxValue / numHLines) * i)
      ctx.textAlign = "right"
      ctx.fillText(value.toString(), padding - 5, y + 3)
    }

    // Draw line chart
    ctx.strokeStyle = lineColor
    ctx.lineWidth = 2
    ctx.beginPath()

    // Plot data points
    for (let i = 0; i < data.length; i++) {
      const x = padding + (width / (data.length - 1)) * i
      const y = padding + height - (data[i] / maxValue) * height

      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    }

    ctx.stroke()

    // Fill area under the line
    ctx.lineTo(padding + width, padding + height)
    ctx.lineTo(padding, padding + height)
    ctx.fillStyle = fillColor
    ctx.fill()

    // Draw data points
    ctx.fillStyle = "#ffffff"
    ctx.strokeStyle = lineColor
    ctx.lineWidth = 2

    for (let i = 0; i < data.length; i++) {
      const x = padding + (width / (data.length - 1)) * i
      const y = padding + height - (data[i] / maxValue) * height

      ctx.beginPath()
      ctx.arc(x, y, 4, 0, Math.PI * 2)
      ctx.fill()
      ctx.stroke()
    }
  }, [theme])

  return <canvas ref={canvasRef} className="w-full h-full" />
}

export function BarChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)

    // Chart configuration
    const isDark = theme === "dark"
    const textColor = isDark ? "rgba(255, 255, 255, 0.8)" : "rgba(15, 23, 42, 0.8)"
    const gridColor = isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(15, 23, 42, 0.1)"

    // Sample data
    const data = [65, 42, 78, 53, 36, 45]
    const labels = ["Tutorials", "Vlogs", "Reviews", "Gaming", "Music", "Comedy"]
    const colors = [
      "rgba(14, 165, 233, 0.8)",
      "rgba(20, 184, 166, 0.8)",
      "rgba(139, 92, 246, 0.8)",
      "rgba(249, 115, 22, 0.8)",
      "rgba(236, 72, 153, 0.8)",
      "rgba(234, 179, 8, 0.8)",
    ]

    // Chart dimensions
    const padding = 40
    const width = rect.width - padding * 2
    const height = rect.height - padding * 2

    // Clear canvas
    ctx.clearRect(0, 0, rect.width, rect.height)

    // Draw grid
    ctx.strokeStyle = gridColor
    ctx.lineWidth = 0.5

    // Horizontal grid lines
    const numHLines = 5
    for (let i = 0; i <= numHLines; i++) {
      const y = padding + (height / numHLines) * i
      ctx.beginPath()
      ctx.moveTo(padding, y)
      ctx.lineTo(padding + width, y)
      ctx.stroke()
    }

    // Draw labels
    ctx.fillStyle = textColor
    ctx.font = "10px sans-serif"
    ctx.textAlign = "center"

    // Y-axis labels
    const maxValue = Math.max(...data) * 1.1
    for (let i = 0; i <= numHLines; i++) {
      const y = padding + (height / numHLines) * i
      const value = Math.round(maxValue - (maxValue / numHLines) * i)
      ctx.textAlign = "right"
      ctx.fillText(value.toString(), padding - 5, y + 3)
    }

    // Draw bars
    const barWidth = (width / data.length) * 0.7
    const barSpacing = width / data.length

    for (let i = 0; i < data.length; i++) {
      const x = padding + barSpacing * i + (barSpacing - barWidth) / 2
      const barHeight = (data[i] / maxValue) * height
      const y = padding + height - barHeight

      // Draw bar
      ctx.fillStyle = colors[i % colors.length]
      ctx.fillRect(x, y, barWidth, barHeight)

      // Draw label
      ctx.fillStyle = textColor
      ctx.textAlign = "center"
      ctx.fillText(labels[i], x + barWidth / 2, rect.height - 5)
    }
  }, [theme])

  return <canvas ref={canvasRef} className="w-full h-full" />
}

export function PieChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)

    // Chart configuration
    const isDark = theme === "dark"
    const textColor = isDark ? "rgba(255, 255, 255, 0.8)" : "rgba(15, 23, 42, 0.8)"

    // Sample data
    const data = [35, 25, 20, 10, 10]
    const labels = ["YouTube Search", "External", "Channel Pages", "Direct", "Other"]
    const colors = [
      "rgba(14, 165, 233, 0.8)",
      "rgba(20, 184, 166, 0.8)",
      "rgba(139, 92, 246, 0.8)",
      "rgba(249, 115, 22, 0.8)",
      "rgba(236, 72, 153, 0.8)",
    ]

    // Chart dimensions
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const radius = Math.min(centerX, centerY) * 0.7

    // Clear canvas
    ctx.clearRect(0, 0, rect.width, rect.height)

    // Calculate total
    const total = data.reduce((sum, value) => sum + value, 0)

    // Draw pie segments
    let startAngle = -Math.PI / 2 // Start from top (12 o'clock position)

    for (let i = 0; i < data.length; i++) {
      const sliceAngle = (2 * Math.PI * data[i]) / total

      // Draw slice
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle)
      ctx.closePath()

      ctx.fillStyle = colors[i % colors.length]
      ctx.fill()

      // Draw label line and text
      const midAngle = startAngle + sliceAngle / 2
      const labelRadius = radius * 1.2
      const labelX = centerX + Math.cos(midAngle) * labelRadius
      const labelY = centerY + Math.sin(midAngle) * labelRadius

      // Draw line from pie to label
      ctx.beginPath()
      ctx.moveTo(centerX + Math.cos(midAngle) * radius, centerY + Math.sin(midAngle) * radius)
      ctx.lineTo(labelX, labelY)
      ctx.strokeStyle = colors[i % colors.length]
      ctx.lineWidth = 1
      ctx.stroke()

      // Draw label
      ctx.fillStyle = textColor
      ctx.font = "10px sans-serif"
      ctx.textAlign = midAngle < Math.PI ? "left" : "right"
      ctx.textBaseline = "middle"
      ctx.fillText(`${labels[i]} (${data[i]}%)`, labelX + (midAngle < Math.PI ? 5 : -5), labelY)

      startAngle += sliceAngle
    }
  }, [theme])

  return <canvas ref={canvasRef} className="w-full h-full" />
}
