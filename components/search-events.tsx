"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function SearchEvents() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/events?search=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <form onSubmit={handleSearch} className="relative">
      <Input
        type="text"
        placeholder="Search for events..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="pr-12 bg-background/80 backdrop-blur border-primary/30 focus:border-primary"
      />
      <Button
        type="submit"
        size="icon"
        className="absolute right-0 top-0 h-full rounded-l-none bg-primary text-primary-foreground"
      >
        <Search className="h-4 w-4" />
        <span className="sr-only">Search</span>
      </Button>
    </form>
  )
}
