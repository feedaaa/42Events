import { Suspense } from "react"
import { notFound } from "next/navigation"
import Image from "next/image"
import { CalendarDays, Clock, MapPin, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getEventById } from "@/lib/events"
import { AddToCalendarButton } from "@/components/add-to-calendar-button"
import { SocialShareButtons } from "@/components/social-share-buttons"
import { EventMap } from "@/components/event-map"
import { RelatedEvents } from "@/components/related-events"

export default async function EventPage({ params }: { params: { id: string } }) {
  const event = await getEventById(params.id)

  if (!event) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="mb-6">
            <h1 className="text-4xl font-bold mb-2">{event.title}</h1>
            <div className="flex flex-wrap gap-2 mb-4">
              {event.categories.map((category) => (
                <Badge key={category} variant="secondary" className="bg-secondary/80 text-white">
                  {category}
                </Badge>
              ))}
            </div>
          </div>

          <div className="relative aspect-video w-full mb-8 rounded-lg overflow-hidden border border-primary/20">
            <div className="absolute top-0 left-0 w-3 h-3 bg-primary z-10"></div>
            <div className="absolute top-0 right-0 w-3 h-3 bg-primary z-10"></div>
            <div className="absolute bottom-0 left-0 w-3 h-3 bg-primary z-10"></div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-primary z-10"></div>
            <Image
              src={event.image || "/placeholder.svg?height=600&width=1200"}
              alt={event.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 bg-card p-6 rounded-lg border border-muted">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-5 w-5 text-primary" />
              <span>
                {new Date(event.date).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              <span>
                {event.startTime} - {event.endTime}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              <span>{event.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              <span>Organized by {event.organizer}</span>
            </div>
          </div>

          <div className="prose max-w-none mb-8 bg-card p-6 rounded-lg border border-muted">
            <h2 className="text-2xl font-bold mb-4 text-primary">
              <span className="code-text">&lt;</span>
              About This Event
              <span className="code-text">/&gt;</span>
            </h2>
            <div dangerouslySetInnerHTML={{ __html: event.description }} />
          </div>

          {event.hasMap && (
            <div className="mb-8 bg-card p-6 rounded-lg border border-muted">
              <h2 className="text-2xl font-bold mb-4 text-primary">
                <span className="code-text">&lt;</span>
                Location
                <span className="code-text">/&gt;</span>
              </h2>
              <EventMap location={event.location} />
            </div>
          )}
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            <div className="bg-card p-6 rounded-lg border border-muted">
              <h3 className="text-xl font-bold mb-4 text-primary">Event Actions</h3>
              <div className="space-y-4">
                <AddToCalendarButton event={event} />
                <SocialShareButtons event={event} />
              </div>
            </div>

            <div className="bg-card p-6 rounded-lg border border-muted">
              <h3 className="text-xl font-bold mb-4 text-primary">Organizer</h3>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-12 w-12 rounded-full bg-secondary/20 flex items-center justify-center">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-medium">{event.organizer}</p>
                  <p className="text-sm text-muted-foreground">{event.organizerDepartment}</p>
                </div>
              </div>
              <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/10">
                Contact Organizer
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Suspense fallback={<div>Loading related events...</div>}>
        <RelatedEvents currentEventId={event.id} categories={event.categories} />
      </Suspense>
    </div>
  )
}
