"use client"

import { useState, useEffect } from "react"
import { EventCard } from "@/components/event-card"
import { Skeleton } from "@/components/ui/skeleton"
import { fetchEvents } from "@/lib/events"

export function EventsList() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadEvents = async () => {
      setLoading(true)
      try {
        const { events } = await fetchEvents({
          page: 1,
          sort: "date",
        })
        setEvents(events)
      } catch (error) {
        console.error("Failed to load events:", error)
      } finally {
        setLoading(false)
      }
    }

    loadEvents()
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="h-[200px] w-full rounded-lg" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    )
  }

  if (events.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium">No events found</h3>
        <p className="text-muted-foreground">Check back later for upcoming events</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  )
}
