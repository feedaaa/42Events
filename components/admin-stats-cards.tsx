import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Users, Clock, Tag } from "lucide-react"

export async function AdminStatsCards() {
  // In a real app, this would fetch actual stats from the database
  // For this demo, we'll use mock data

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  const stats = {
    totalEvents: 42,
    upcomingEvents: 18,
    totalCategories: 14,
    totalUsers: 156,
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="bg-card border-muted overflow-hidden relative">
        <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Events</CardTitle>
          <Calendar className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalEvents}</div>
          <p className="text-xs text-muted-foreground">+4 from last month</p>
        </CardContent>
      </Card>

      <Card className="bg-card border-muted overflow-hidden relative">
        <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
          <Clock className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.upcomingEvents}</div>
          <p className="text-xs text-muted-foreground">Next 30 days</p>
        </CardContent>
      </Card>

      <Card className="bg-card border-muted overflow-hidden relative">
        <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Categories</CardTitle>
          <Tag className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalCategories}</div>
          <p className="text-xs text-muted-foreground">+2 new categories</p>
        </CardContent>
      </Card>

      <Card className="bg-card border-muted overflow-hidden relative">
        <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Registered Users</CardTitle>
          <Users className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalUsers}</div>
          <p className="text-xs text-muted-foreground">+12 from last month</p>
        </CardContent>
      </Card>
    </div>
  )
}
