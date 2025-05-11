import { Suspense } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AdminEventsList } from "@/components/admin-events-list"
import { AdminStatsCards } from "@/components/admin-stats-cards"
import Link from "next/link"

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">
          <span className="code-text">&lt;</span>
          Admin Dashboard
          <span className="code-text">/&gt;</span>
        </h1>
        <Link href="/admin/events/new">
          <div className="pixel-button">Create New Event</div>
        </Link>
      </div>

      <Suspense fallback={<div>Loading stats...</div>}>
        <AdminStatsCards />
      </Suspense>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-card border-muted">
          <CardHeader>
            <CardTitle className="text-primary">Recent Events</CardTitle>
            <CardDescription>Manage your most recent events</CardDescription>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<div>Loading events...</div>}>
              <AdminEventsList limit={5} />
            </Suspense>
          </CardContent>
        </Card>

        <Card className="bg-card border-muted">
          <CardHeader>
            <CardTitle className="text-primary">Upcoming Events</CardTitle>
            <CardDescription>View and manage upcoming events</CardDescription>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<div>Loading events...</div>}>
              <AdminEventsList upcoming limit={5} />
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
