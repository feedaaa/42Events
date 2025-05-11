import { Suspense } from "react"
import { notFound } from "next/navigation"
import { EventForm } from "@/components/event-form"
import { getEventById } from "@/lib/events"

export default async function EditEventPage({ params }: { params: { id: string } }) {
  const event = await getEventById(params.id)

  if (!event) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Edit Event</h1>
      <Suspense fallback={<div>Loading event data...</div>}>
        <EventForm event={event} />
      </Suspense>
    </div>
  )
}
