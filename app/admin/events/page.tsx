import { Suspense } from "react"
import Link from "next/link"
import ClientFilters from "@/components/client-filters"
import ClientTable from "@/components/client-table"

export default function AdminEventsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">
          <span className="text-primary">&lt;</span>
          Manage Events
          <span className="text-primary">/&gt;</span>
        </h1>
        <Link href="/admin/events/new">
          <div className="pixel-button">Create New Event</div>
        </Link>
      </div>

      {/* Create a client-side only component wrapper */}
      <Suspense fallback={<div className="h-16 bg-muted/20 animate-pulse rounded-md"></div>}>
        <ClientFilters />
      </Suspense>

      <Suspense fallback={<div className="h-96 bg-muted/20 animate-pulse rounded-md"></div>}>
        <ClientTable />
      </Suspense>
    </div>
  )
}
