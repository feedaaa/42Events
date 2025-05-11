"use client"

import { useState } from "react"
import { Calendar, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface AddToCalendarButtonProps {
  event: {
    title: string
    description: string
    date: string
    startTime: string
    endTime: string
    location: string
  }
}

export function AddToCalendarButton({ event }: AddToCalendarButtonProps) {
  const [isOpen, setIsOpen] = useState(false)

  const formatDate = (date: string, time: string) => {
    const [hours, minutes] = time.split(":")
    const eventDate = new Date(date)
    eventDate.setHours(Number.parseInt(hours, 10))
    eventDate.setMinutes(Number.parseInt(minutes, 10))
    return eventDate
  }

  const startDate = formatDate(event.date, event.startTime)
  const endDate = formatDate(event.date, event.endTime)

  const googleCalendarUrl = () => {
    const url = new URL("https://calendar.google.com/calendar/render")
    url.searchParams.append("action", "TEMPLATE")
    url.searchParams.append("text", event.title)
    url.searchParams.append("details", event.description)
    url.searchParams.append("location", event.location)
    url.searchParams.append(
      "dates",
      `${startDate.toISOString().replace(/-|:|\.\d+/g, "")}/${endDate.toISOString().replace(/-|:|\.\d+/g, "")}`,
    )

    return url.toString()
  }

  const outlookCalendarUrl = () => {
    const url = new URL("https://outlook.live.com/calendar/0/deeplink/compose")
    url.searchParams.append("subject", event.title)
    url.searchParams.append("body", event.description)
    url.searchParams.append("location", event.location)
    url.searchParams.append("startdt", startDate.toISOString())
    url.searchParams.append("enddt", endDate.toISOString())
    url.searchParams.append("path", "/calendar/action/compose")

    return url.toString()
  }

  const yahooCalendarUrl = () => {
    const url = new URL("https://calendar.yahoo.com/")
    url.searchParams.append("title", event.title)
    url.searchParams.append("desc", event.description)
    url.searchParams.append("in_loc", event.location)
    url.searchParams.append("st", startDate.toISOString().replace(/-|:|\.\d+/g, ""))
    url.searchParams.append("et", endDate.toISOString().replace(/-|:|\.\d+/g, ""))
    url.searchParams.append("v", "60")

    return url.toString()
  }

  const downloadICalFile = () => {
    const icalContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "BEGIN:VEVENT",
      `SUMMARY:${event.title}`,
      `DESCRIPTION:${event.description}`,
      `LOCATION:${event.location}`,
      `DTSTART:${startDate.toISOString().replace(/-|:|\.\d+/g, "")}`,
      `DTEND:${endDate.toISOString().replace(/-|:|\.\d+/g, "")}`,
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n")

    const blob = new Blob([icalContent], { type: "text/calendar;charset=utf-8" })
    const link = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    link.download = `${event.title.replace(/\s+/g, "-")}.ics`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full justify-between">
          <div className="flex items-center">
            <Calendar className="mr-2 h-4 w-4" />
            <span>Add to Calendar</span>
          </div>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        <DropdownMenuItem asChild>
          <a href={googleCalendarUrl()} target="_blank" rel="noopener noreferrer">
            Google Calendar
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <a href={outlookCalendarUrl()} target="_blank" rel="noopener noreferrer">
            Outlook Calendar
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <a href={yahooCalendarUrl()} target="_blank" rel="noopener noreferrer">
            Yahoo Calendar
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={downloadICalFile}>Download iCal File</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
