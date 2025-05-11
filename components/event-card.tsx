"use client"

import { useState } from "react"
import Image from "next/image"
import { CalendarDays, Clock, MapPin, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { AddToCalendarButton } from "@/components/add-to-calendar-button"

interface EventCardProps {
  event: {
    id: string
    title: string
    date: string
    startTime: string
    endTime: string
    location: string
    image?: string
    categories: string[]
    featured?: boolean
    description: string
    organizer: string
  }
}

export function EventCard({ event }: EventCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const formattedDate = new Date(event.date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })

  const openModal = () => {
    setIsModalOpen(true)
    document.body.style.overflow = "hidden"
  }

  const closeModal = () => {
    setIsModalOpen(false)
    document.body.style.overflow = "auto"
  }

  // Create pixel art icon
  const generatePixelIcon = (category: string) => {
    // Generate a deterministic color based on the category name
    const hash = category.split("").reduce((acc, char) => char.charCodeAt(0) + acc, 0)
    const colors = ["#730fff", "#05f2f2", "#fe593d"]
    const color = colors[hash % colors.length]

    return (
      <div className="w-6 h-6 relative mr-2">
        <div className="absolute inset-0 grid grid-cols-3 grid-rows-3">
          <div className="bg-background"></div>
          <div style={{ backgroundColor: color }}></div>
          <div className="bg-background"></div>
          <div style={{ backgroundColor: color }}></div>
          <div className="bg-background"></div>
          <div style={{ backgroundColor: color }}></div>
          <div className="bg-background"></div>
          <div style={{ backgroundColor: color }}></div>
          <div className="bg-background"></div>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="pixel-card rounded-lg overflow-hidden" onClick={openModal}>
        <div className="relative aspect-video">
          <Image
            src={event.image || "/placeholder.svg?height=300&width=600"}
            alt={event.title}
            fill
            className="object-cover"
          />
          {event.featured && (
            <div className="absolute top-2 right-2">
              <Badge className="bg-accent text-white border-none">Featured</Badge>
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-bold text-lg mb-2">{event.title}</h3>
          <div className="flex flex-wrap gap-1 mb-3">
            {event.categories.slice(0, 2).map((category) => (
              <Badge key={category} className="bg-primary text-white border-none flex items-center">
                {generatePixelIcon(category)}
                {category}
              </Badge>
            ))}
            {event.categories.length > 2 && (
              <Badge className="border-primary/50 text-primary bg-transparent">+{event.categories.length - 2}</Badge>
            )}
          </div>
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center">
              <CalendarDays className="mr-2 h-4 w-4 text-secondary" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center">
              <Clock className="mr-2 h-4 w-4 text-secondary" />
              <span>{event.startTime}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="mr-2 h-4 w-4 text-secondary" />
              <span className="truncate">{event.location}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Event Modal */}
      <div className={`event-modal ${isModalOpen ? "open" : ""}`} onClick={closeModal}>
        <div className="event-modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="event-modal-close" onClick={closeModal}>
            <X />
          </button>

          <div className="relative aspect-video w-full mb-6 rounded-lg overflow-hidden">
            <Image
              src={event.image || "/placeholder.svg?height=600&width=1200"}
              alt={event.title}
              fill
              className="object-cover"
            />
          </div>

          <h2 className="text-3xl font-bold mb-2">{event.title}</h2>

          <div className="flex flex-wrap gap-2 mb-6">
            {event.categories.map((category) => (
              <Badge key={category} className="bg-primary text-white border-none flex items-center">
                {generatePixelIcon(category)}
                {category}
              </Badge>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 bg-muted p-4 rounded-lg">
            <div className="flex items-center">
              <CalendarDays className="mr-2 h-5 w-5 text-secondary" />
              <span>
                {new Date(event.date).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            <div className="flex items-center">
              <Clock className="mr-2 h-5 w-5 text-secondary" />
              <span>
                {event.startTime} - {event.endTime}
              </span>
            </div>
            <div className="flex items-center">
              <MapPin className="mr-2 h-5 w-5 text-secondary" />
              <span>{event.location}</span>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-bold mb-2 text-secondary">About This Event</h3>
            <div className="prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: event.description }} />
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-bold mb-2 text-secondary">Add to Calendar</h3>
            <AddToCalendarButton event={event} />
          </div>
        </div>
      </div>
    </>
  )
}
