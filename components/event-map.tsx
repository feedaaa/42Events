"use client"

import { useEffect, useRef } from "react"

interface EventMapProps {
  location: string
}

export function EventMap({ location }: EventMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // In a real app, this would use a mapping API like Google Maps or Mapbox
    // For this demo, we'll just show a placeholder
    if (mapRef.current) {
      const canvas = document.createElement("canvas")
      canvas.width = mapRef.current.clientWidth
      canvas.height = 300

      const ctx = canvas.getContext("2d")
      if (ctx) {
        // Draw a simple map placeholder
        ctx.fillStyle = "#f3f4f6"
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        // Draw some roads
        ctx.strokeStyle = "#d1d5db"
        ctx.lineWidth = 4

        // Horizontal roads
        for (let i = 1; i <= 3; i++) {
          ctx.beginPath()
          ctx.moveTo(0, i * (canvas.height / 4))
          ctx.lineTo(canvas.width, i * (canvas.height / 4))
          ctx.stroke()
        }

        // Vertical roads
        for (let i = 1; i <= 4; i++) {
          ctx.beginPath()
          ctx.moveTo(i * (canvas.width / 5), 0)
          ctx.lineTo(i * (canvas.width / 5), canvas.height)
          ctx.stroke()
        }

        // Draw a marker for the location
        ctx.fillStyle = "#ef4444"
        ctx.beginPath()
        ctx.arc(canvas.width / 2, canvas.height / 2, 10, 0, 2 * Math.PI)
        ctx.fill()

        // Add location text
        ctx.fillStyle = "#111827"
        ctx.font = "14px Arial"
        ctx.textAlign = "center"
        ctx.fillText(location, canvas.width / 2, canvas.height / 2 + 30)

        mapRef.current.innerHTML = ""
        mapRef.current.appendChild(canvas)
      }
    }
  }, [location])

  return (
    <div
      ref={mapRef}
      className="w-full h-[300px] bg-muted rounded-lg overflow-hidden"
      aria-label={`Map showing location: ${location}`}
    />
  )
}
