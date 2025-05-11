"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { Search, Filter, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { fetchCategories } from "@/lib/categories"

export function AdminEventFilters() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [search, setSearch] = useState(searchParams.get("search") || "")
  const [category, setCategory] = useState(searchParams.get("category") || "")
  const [status, setStatus] = useState(searchParams.get("status") || "")
  const [categories, setCategories] = useState([])
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories()
        setCategories(data)
      } catch (error) {
        console.error("Failed to load categories:", error)
      }
    }

    loadCategories()
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    const params = new URLSearchParams(searchParams.toString())
    if (search) {
      params.set("search", search)
    } else {
      params.delete("search")
    }
    params.set("page", "1")

    router.push(`${pathname}?${params.toString()}`)
  }

  const handleClearSearch = () => {
    setSearch("")

    const params = new URLSearchParams(searchParams.toString())
    params.delete("search")
    params.set("page", "1")

    router.push(`${pathname}?${params.toString()}`)
  }

  const handleApplyFilters = () => {
    const params = new URLSearchParams(searchParams.toString())

    if (category) {
      params.set("category", category)
    } else {
      params.delete("category")
    }

    if (status) {
      params.set("status", status)
    } else {
      params.delete("status")
    }

    params.set("page", "1")

    router.push(`${pathname}?${params.toString()}`)
    setIsOpen(false)
  }

  const handleResetFilters = () => {
    setCategory("")
    setStatus("")

    const params = new URLSearchParams(searchParams.toString())
    params.delete("category")
    params.delete("status")
    params.set("page", "1")

    if (search) {
      params.set("search", search)
    }

    router.push(`${pathname}?${params.toString()}`)
    setIsOpen(false)
  }

  const activeFiltersCount = [category ? 1 : 0, status ? 1 : 0].reduce((a, b) => a + b, 0)

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <form onSubmit={handleSearch} className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search events..."
          className="pl-8 pr-10 bg-background border-primary/30"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {search && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 h-9 w-9"
            onClick={handleClearSearch}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Clear search</span>
          </Button>
        )}
      </form>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2 border-primary/30 text-primary">
            <Filter className="h-4 w-4" />
            <span>Filters</span>
            {activeFiltersCount > 0 && (
              <span className="ml-1 rounded-full bg-primary text-primary-foreground px-2 py-0.5 text-xs">
                {activeFiltersCount}
              </span>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent className="bg-background border-l border-primary/20">
          <SheetHeader>
            <SheetTitle className="text-primary">Filters</SheetTitle>
            <SheetDescription>Filter events by category, status, and more.</SheetDescription>
          </SheetHeader>

          <div className="py-6 space-y-6">
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-secondary">Category</h3>
              <RadioGroup value={category} onValueChange={setCategory}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="" id="category-all" className="border-primary text-primary" />
                  <Label htmlFor="category-all">All Categories</Label>
                </div>
                {categories.map((cat) => (
                  <div key={cat.value} className="flex items-center space-x-2">
                    <RadioGroupItem
                      value={cat.value}
                      id={`category-${cat.value}`}
                      className="border-primary text-primary"
                    />
                    <Label htmlFor={`category-${cat.value}`}>{cat.label}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <Separator className="bg-primary/20" />

            <div className="space-y-4">
              <h3 className="text-sm font-medium text-secondary">Status</h3>
              <RadioGroup value={status} onValueChange={setStatus}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="" id="status-all" className="border-primary text-primary" />
                  <Label htmlFor="status-all">All Statuses</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="published" id="status-published" className="border-primary text-primary" />
                  <Label htmlFor="status-published">Published</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="draft" id="status-draft" className="border-primary text-primary" />
                  <Label htmlFor="status-draft">Draft</Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          <SheetFooter>
            <SheetClose asChild>
              <Button
                variant="outline"
                onClick={handleResetFilters}
                className="border-primary/30 text-primary hover:bg-primary/10"
              >
                Reset Filters
              </Button>
            </SheetClose>
            <Button onClick={handleApplyFilters} className="bg-secondary text-secondary-foreground">
              Apply Filters
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  )
}
