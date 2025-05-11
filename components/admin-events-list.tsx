import Link from "next/link"
import { CalendarDays, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { fetchAdminEvents } from "@/lib/events"

interface AdminEventsListProps {
  limit?: number
  upcoming?: boolean
}

export async function AdminEventsList({ limit = 5, upcoming = false }: AdminEventsListProps) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  const { events } = await fetchAdminEvents({
    page: 1,
    limit,
  })

  // Filter for upcoming events if needed
  const filteredEvents = upcoming ? events.filter((event) => new Date(event.date) >= new Date()) : events

  // Sort by date
  const sortedEvents = filteredEvents
    .sort((a, b) => {
      if (upcoming) {
        // For upcoming, sort by closest date first
        return new Date(a.date).getTime() - new Date(b.date).getTime()
      } else {
        // For recent, sort by most recent first
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      }
    })
    .slice(0, limit)

  if (sortedEvents.length === 0) {
    return (
      <div className="text-center py-6">
        <p className="text-muted-foreground">No events found</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {sortedEvents.map((event) => (
        <div key={event.id} className="flex items-start gap-4 py-2">
          <div className="min-w-[50px] text-center">
            <div className="bg-muted rounded-md p-2">
              <CalendarDays className="h-5 w-5 mx-auto text-muted-foreground" />
              <div className="text-xs font-medium mt-1">
                {new Date(event.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
              </div>
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h4 className="font-medium truncate">{event.title}</h4>
                <p className="text-sm text-muted-foreground truncate">{event.location}</p>
              </div>
              <div className="flex-shrink-0">
                {!event.published && <Badge variant="outline">Draft</Badge>}
                {event.featured && <Badge className="ml-1">Featured</Badge>}
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="pt-2">
        <Link href="/admin/events">
          <Button variant="ghost" className="w-full justify-between">
            <span>View all events</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
