
# 42 Events

A modern, responsive web application for managing university events with offline capabilities. This platform allows students, faculty, and staff to discover, attend, and organize events happening across campus.


## Features

**Event Discovery**: Browse and search for events by category, date, or keyword

**Event Details**: View comprehensive information about each event including location, time, and organizer

**Admin Dashboard**: Create, edit, and manage events through an intuitive admin interface

**Responsive Design**: Optimized for all devices from mobile to desktop

**Calendar Integration**: Add events to Google, Outlook, or Apple calendars

**PWA Capabilities**: Install as a native-like app on mobile and desktop devices

**Offline Support**: Continue using the application even without an internet connection (i hope it works)



## Tech Stack

**Client:** React, Redux, TailwindCSS

**Frontend**: Next.js, React, TypeScript

**Styling**: Tailwind CSS, shadcn/ui components

**State Management**: React Hooks

**Offline Storage**: IndexedDB (via idb)

**PWA Support**: next-pwa

**Form Handling**: React Hook Form, Zod validation

**Icons**: Lucide React


## comments

- user authentication is not setup yet but to access the admin page go to `42events-beige.vercel.app/admin`

- to view the event details fully go to `42events-beige.vercel.app/events/5`

- admin can add, edit and delete events but its does not sync with the website yet.

- search bar is not functional also

- dark-light mode button is disabled

