"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Edit, Trash2, Copy, Eye, MoreHorizontal, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Pagination } from "@/components/ui/pagination"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { toast } from "@/components/ui/use-toast"
import { fetchAdminEvents, deleteEvent, duplicateEvent } from "@/lib/events"

export function AdminEventsTable() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [totalPages, setTotalPages] = useState(1)
  const [selectedEvents, setSelectedEvents] = useState<string[]>([])
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [eventToDelete, setEventToDelete] = useState<string | null>(null)

  const page = Number(searchParams.get("page") || "1")
  const search = searchParams.get("search") || ""
  const category = searchParams.get("category") || ""
  const status = searchParams.get("status") || ""

  useEffect(() => {
    const loadEvents = async () => {
      setLoading(true)
      try {
        const { events, totalPages } = await fetchAdminEvents({
          page,
          search,
          category,
          status,
        })
        setEvents(events)
        setTotalPages(totalPages)
      } catch (error) {
        console.error("Failed to load events:", error)
        toast({
          title: "Error",
          description: "Failed to load events. Please try again.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    loadEvents()
  }, [page, search, category, status])

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedEvents(events.map((event) => event.id))
    } else {
      setSelectedEvents([])
    }
  }

  const handleSelectEvent = (eventId: string, checked: boolean) => {
    if (checked) {
      setSelectedEvents([...selectedEvents, eventId])
    } else {
      setSelectedEvents(selectedEvents.filter((id) => id !== eventId))
    }
  }

  const handleDeleteClick = (eventId: string) => {
    setEventToDelete(eventId)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!eventToDelete) return

    try {
      await deleteEvent(eventToDelete)
      setEvents(events.filter((event) => event.id !== eventToDelete))
      toast({
        title: "Event deleted",
        description: "The event has been deleted successfully",
      })
    } catch (error) {
      console.error("Failed to delete event:", error)
      toast({
        title: "Error",
        description: "Failed to delete event. Please try again.",
        variant: "destructive",
      })
    } finally {
      setDeleteDialogOpen(false)
      setEventToDelete(null)
    }
  }

  const handleDuplicateEvent = async (eventId: string) => {
    try {
      const newEvent = await duplicateEvent(eventId)
      toast({
        title: "Event duplicated",
        description: "The event has been duplicated successfully",
      })
      router.refresh()
    } catch (error) {
      console.error("Failed to duplicate event:", error)
      toast({
        title: "Error",
        description: "Failed to duplicate event. Please try again.",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return <div className="h-96 bg-muted/20 animate-pulse rounded-md"></div>
  }

  return (
    <div className="space-y-4">
      <div className="rounded-md border border-primary/20">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/30">
              <TableHead className="w-12">
                <Checkbox
                  checked={selectedEvents.length === events.length && events.length > 0}
                  onCheckedChange={handleSelectAll}
                  aria-label="Select all events"
                  className="border-primary text-primary"
                />
              </TableHead>
              <TableHead>Event</TableHead>
              <TableHead className="hidden md:table-cell">Date</TableHead>
              <TableHead className="hidden md:table-cell">Categories</TableHead>
              <TableHead className="hidden md:table-cell">Status</TableHead>
              <TableHead className="w-24">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {events.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <Calendar className="h-8 w-8 text-primary" />
                    <p className="text-muted-foreground">No events found</p>
                    <Button
                      variant="outline"
                      onClick={() => router.push("/admin/events/new")}
                      className="border-primary/30 text-primary hover:bg-primary/10"
                    >
                      Create your first event
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              events.map((event) => (
                <TableRow key={event.id} className="border-primary/10">
                  <TableCell>
                    <Checkbox
                      checked={selectedEvents.includes(event.id)}
                      onCheckedChange={(checked) => handleSelectEvent(event.id, !!checked)}
                      aria-label={`Select event ${event.title}`}
                      className="border-primary text-primary"
                    />
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{event.title}</div>
                    <div className="text-sm text-muted-foreground truncate max-w-[200px] md:max-w-[300px]">
                      {event.location}
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="font-medium">{new Date(event.date).toLocaleDateString()}</div>
                    <div className="text-sm text-muted-foreground">
                      {event.startTime} - {event.endTime}
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex flex-wrap gap-1">
                      {event.categories.slice(0, 2).map((category) => (
                        <Badge key={category} className="bg-primary text-white border-none">
                          {category}
                        </Badge>
                      ))}
                      {event.categories.length > 2 && (
                        <Badge className="border-primary/50 text-primary bg-transparent">
                          +{event.categories.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {event.published ? (
                      <Badge className="bg-secondary text-secondary-foreground">Published</Badge>
                    ) : (
                      <Badge variant="outline" className="border-primary/30 text-primary">
                        Draft
                      </Badge>
                    )}
                    {event.featured && <Badge className="ml-1 bg-accent text-white">Featured</Badge>}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-primary">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-card border-primary/20">
                        <DropdownMenuItem asChild>
                          <Link href={`/events/${event.id}`} target="_blank" className="text-secondary">
                            <Eye className="mr-2 h-4 w-4" />
                            <span>View</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/events/${event.id}/edit`} className="text-primary">
                            <Edit className="mr-2 h-4 w-4" />
                            <span>Edit</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDuplicateEvent(event.id)} className="text-primary">
                          <Copy className="mr-2 h-4 w-4" />
                          <span>Duplicate</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDeleteClick(event.id)}
                          className="text-destructive focus:text-destructive"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          <span>Delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && <Pagination totalPages={totalPages} currentPage={page} />}

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="bg-card border-primary/20">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the event and remove it from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-primary/30 text-primary hover:bg-primary/10">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
