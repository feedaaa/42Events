// Mock data and functions for events
// In a real application, this would connect to a database

import { v4 as uuidv4 } from "uuid"

// Sample event data
const eventsData = [
  {
    id: "1",
    title: "Annual University Symposium",
    description:
      "<p>Join us for the annual symposium featuring keynote speakers from various academic disciplines. This event brings together faculty, students, and industry professionals to discuss the latest research and innovations.</p><p>The symposium will include panel discussions, research presentations, and networking opportunities.</p>",
    date: "2025-06-15",
    startTime: "09:00",
    endTime: "17:00",
    location: "University Main Auditorium",
    organizer: "Academic Affairs Office",
    organizerDepartment: "Office of the Provost",
    categories: ["Academic", "Conference"],
    featured: true,
    published: true,
    hasMap: true,
    image: "/placeholder.svg?height=600&width=1200",
  },
  {
    id: "2",
    title: "Student Club Fair",
    description:
      "<p>Explore the diverse range of student clubs and organizations at our university. This is your chance to find groups that match your interests and get involved in campus life.</p><p>Each club will have a booth where you can meet current members, learn about their activities, and sign up to join.</p>",
    date: "2025-05-20",
    startTime: "11:00",
    endTime: "15:00",
    location: "University Quad",
    organizer: "Student Activities Board",
    organizerDepartment: "Student Affairs",
    categories: ["Student Life", "Social"],
    featured: false,
    published: true,
    hasMap: true,
    image: "/placeholder.svg?height=600&width=1200",
  },
  {
    id: "3",
    title: "Faculty Research Showcase",
    description:
      "<p>Faculty members from all departments will present their current research projects and findings. This event highlights the innovative work being done at our university.</p><p>Attendees will have the opportunity to engage with researchers, ask questions, and learn about potential collaboration opportunities.</p>",
    date: "2025-07-10",
    startTime: "13:00",
    endTime: "16:00",
    location: "Science Building, Room 101",
    organizer: "Research Office",
    organizerDepartment: "Academic Affairs",
    categories: ["Academic", "Research"],
    featured: true,
    published: true,
    hasMap: false,
    image: "/placeholder.svg?height=600&width=1200",
  },
  {
    id: "4",
    title: "Alumni Networking Night",
    description:
      "<p>Connect with university alumni from various industries and career paths. This networking event provides current students with valuable insights and potential mentorship opportunities.</p><p>The evening will include a panel discussion, followed by a reception where attendees can mingle and exchange contact information.</p>",
    date: "2025-06-25",
    startTime: "18:00",
    endTime: "21:00",
    location: "University Center Ballroom",
    organizer: "Alumni Relations",
    organizerDepartment: "Development Office",
    categories: ["Networking", "Career"],
    featured: false,
    published: true,
    hasMap: true,
    image: "/placeholder.svg?height=600&width=1200",
  },
  {
    id: "5",
    title: "International Cultural Festival",
    description:
      "<p>Celebrate the diverse cultures represented in our university community. This festival features food, performances, art, and activities from around the world.</p><p>Student cultural organizations will host booths showcasing their heritage, and there will be continuous performances throughout the day on the main stage.</p>",
    date: "2025-05-05",
    startTime: "12:00",
    endTime: "20:00",
    location: "University Plaza",
    organizer: "International Student Services",
    organizerDepartment: "Student Affairs",
    categories: ["Cultural", "Social"],
    featured: true,
    published: true,
    hasMap: true,
    image: "/placeholder.svg?height=600&width=1200",
  },
  {
    id: "6",
    title: "Graduate Research Symposium",
    description:
      "<p>Graduate students present their research projects and findings. This symposium provides a platform for students to share their work with peers and faculty.</p><p>The event includes poster presentations, oral presentations, and a keynote address from a distinguished researcher in the field.</p>",
    date: "2025-07-20",
    startTime: "10:00",
    endTime: "16:00",
    location: "Graduate Studies Building",
    organizer: "Graduate School",
    organizerDepartment: "Academic Affairs",
    categories: ["Academic", "Research"],
    featured: false,
    published: true,
    hasMap: false,
    image: "/placeholder.svg?height=600&width=1200",
  },
]

// Mock function to fetch events with pagination and filtering
export async function fetchEvents({ page = 1, category = "", search = "", sort = "date" }) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  const pageSize = 6

  // Filter events
  let filteredEvents = [...eventsData].filter((event) => event.published)

  if (category) {
    filteredEvents = filteredEvents.filter((event) => event.categories.includes(category))
  }

  if (search) {
    const searchLower = search.toLowerCase()
    filteredEvents = filteredEvents.filter(
      (event) =>
        event.title.toLowerCase().includes(searchLower) ||
        event.description.toLowerCase().includes(searchLower) ||
        event.location.toLowerCase().includes(searchLower),
    )
  }

  // Sort events
  switch (sort) {
    case "date":
      filteredEvents.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      break
    case "date-asc":
      filteredEvents.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      break
    case "title":
      filteredEvents.sort((a, b) => a.title.localeCompare(b.title))
      break
    case "title-desc":
      filteredEvents.sort((a, b) => b.title.localeCompare(a.title))
      break
    default:
      filteredEvents.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  }

  // Calculate pagination
  const totalEvents = filteredEvents.length
  const totalPages = Math.ceil(totalEvents / pageSize)
  const startIndex = (page - 1) * pageSize
  const paginatedEvents = filteredEvents.slice(startIndex, startIndex + pageSize)

  return {
    events: paginatedEvents,
    totalPages,
    totalEvents,
  }
}

// Mock function to fetch admin events with pagination and filtering
export async function fetchAdminEvents({ page = 1, search = "", category = "", status = "" }) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  const pageSize = 10

  // Filter events
  let filteredEvents = [...eventsData]

  if (search) {
    const searchLower = search.toLowerCase()
    filteredEvents = filteredEvents.filter(
      (event) =>
        event.title.toLowerCase().includes(searchLower) ||
        event.description.toLowerCase().includes(searchLower) ||
        event.location.toLowerCase().includes(searchLower),
    )
  }

  if (category) {
    filteredEvents = filteredEvents.filter((event) => event.categories.includes(category))
  }

  if (status === "published") {
    filteredEvents = filteredEvents.filter((event) => event.published)
  } else if (status === "draft") {
    filteredEvents = filteredEvents.filter((event) => !event.published)
  }

  // Sort events by date
  filteredEvents.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  // Calculate pagination
  const totalEvents = filteredEvents.length
  const totalPages = Math.ceil(totalEvents / pageSize)
  const startIndex = (page - 1) * pageSize
  const paginatedEvents = filteredEvents.slice(startIndex, startIndex + pageSize)

  return {
    events: paginatedEvents,
    totalPages,
    totalEvents,
  }
}

// Mock function to get a single event by ID
export async function getEventById(id: string) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  return eventsData.find((event) => event.id === id) || null
}

// Mock function to create a new event
export async function createEvent(eventData: any) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const newEvent = {
    id: uuidv4(),
    ...eventData,
  }

  eventsData.push(newEvent)

  return newEvent
}

// Mock function to update an existing event
export async function updateEvent(id: string, eventData: any) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const eventIndex = eventsData.findIndex((event) => event.id === id)

  if (eventIndex === -1) {
    throw new Error("Event not found")
  }

  eventsData[eventIndex] = {
    ...eventsData[eventIndex],
    ...eventData,
  }

  return eventsData[eventIndex]
}

// Mock function to delete an event
export async function deleteEvent(id: string) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  const eventIndex = eventsData.findIndex((event) => event.id === id)

  if (eventIndex === -1) {
    throw new Error("Event not found")
  }

  eventsData.splice(eventIndex, 1)

  return { success: true }
}

// Mock function to duplicate an event
export async function duplicateEvent(id: string) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  const event = eventsData.find((event) => event.id === id)

  if (!event) {
    throw new Error("Event not found")
  }

  const newEvent = {
    ...event,
    id: uuidv4(),
    title: `${event.title} (Copy)`,
    published: false,
  }

  eventsData.push(newEvent)

  return newEvent
}
