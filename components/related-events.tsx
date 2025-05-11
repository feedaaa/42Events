import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarDays, Clock, MapPin } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface RelatedEventsProps {
  currentEventId: string
  categories: string[]
}

export async function RelatedEvents({ currentEventId, categories }: RelatedEventsProps) {
  // In a real app, this would fetch related events from the database
  // For this demo, we'll use mock data

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Mock related events
  const relatedEvents = [
    {
      id: "related1",
      title: "Faculty Research Symposium",
      date: "2025-07-10",
      startTime: "13:00",
      location: "Science Building, Room 101",
      categories: ["Academic", "Research"],
    },
    {
      id: "related2",
      title: "Graduate Research Symposium",
      date: "2025-07-20",
      startTime: "10:00",
      location: "Graduate Studies Building",
      categories: ["Academic", "Research"],
    },
    {
      id: "related3",
      title: "Student Research Conference",
      date: "2025-08-05",
      startTime: "09:00",
      location: "University Center",
      categories: ["Academic", "Research", "Conference"],
    },
  ].filter((event) => event.id !== currentEventId)

  if (relatedEvents.length === 0) {
    return null
  }

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Related Events</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedEvents.map((event) => (
          <Card key={event.id}>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{event.title}</CardTitle>
              <div className="flex flex-wrap gap-1 mt-1">
                {event.categories.slice(0, 2).map((category) => (
                  <Badge key={category} variant="secondary" className="text-xs">
                    {category}
                  </Badge>
                ))}
                {event.categories.length > 2 && (
                  <Badge variant="outline" className="text-xs">
                    +{event.categories.length - 2}
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="pb-2 space-y-2">
              <div className="flex items-center text-sm text-muted-foreground">
                <CalendarDays className="mr-1 h-4 w-4" />
                <span>{new Date(event.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="mr-1 h-4 w-4" />
                <span>{event.startTime}</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="mr-1 h-4 w-4" />
                <span className="truncate">{event.location}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Link href={`/events/${event.id}`} className="w-full">
                <Button variant="outline" className="w-full">
                  View Event
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
