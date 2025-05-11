"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { Check, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { cn } from "@/lib/utils"
import { fetchCategories } from "@/lib/categories"

export function EventFilters() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [categories, setCategories] = useState([])
  const [open, setOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "")
  const [sort, setSort] = useState(searchParams.get("sort") || "date")

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

  const handleCategorySelect = (value: string) => {
    setSelectedCategory(value)
    setOpen(false)

    const params = new URLSearchParams(searchParams)
    if (value) {
      params.set("category", value)
    } else {
      params.delete("category")
    }
    params.set("page", "1")
    router.push(`${pathname}?${params.toString()}`)
  }

  const handleSortChange = (value: string) => {
    setSort(value)

    const params = new URLSearchParams(searchParams)
    params.set("sort", value)
    router.push(`${pathname}?${params.toString()}`)
  }

  const handleReset = () => {
    setSelectedCategory("")
    setSort("date")
    router.push(pathname)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label className="text-primary">Category</Label>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-full justify-between border-primary/30 text-foreground"
              >
                {selectedCategory
                  ? categories.find((category) => category.value === selectedCategory)?.label || selectedCategory
                  : "Select category"}
                <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0 bg-card border-muted">
              <Command className="bg-transparent">
                <CommandInput placeholder="Search category..." className="border-0" />
                <CommandList>
                  <CommandEmpty>No category found.</CommandEmpty>
                  <CommandGroup>
                    <CommandItem onSelect={() => handleCategorySelect("")} className="flex items-center gap-2">
                      <Check className={cn("h-4 w-4 text-primary", !selectedCategory ? "opacity-100" : "opacity-0")} />
                      All Categories
                    </CommandItem>
                    {categories.map((category) => (
                      <CommandItem
                        key={category.value}
                        onSelect={() => handleCategorySelect(category.value)}
                        className="flex items-center gap-2"
                      >
                        <Check
                          className={cn(
                            "h-4 w-4 text-primary",
                            selectedCategory === category.value ? "opacity-100" : "opacity-0",
                          )}
                        />
                        {category.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        <Separator className="bg-primary/20" />

        <div className="space-y-2">
          <Label className="text-primary">Sort By</Label>
          <RadioGroup value={sort} onValueChange={handleSortChange} className="space-y-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="date" id="sort-date" className="border-primary text-primary" />
              <Label htmlFor="sort-date">Date (Newest First)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="date-asc" id="sort-date-asc" className="border-primary text-primary" />
              <Label htmlFor="sort-date-asc">Date (Oldest First)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="title" id="sort-title" className="border-primary text-primary" />
              <Label htmlFor="sort-title">Title (A-Z)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="title-desc" id="sort-title-desc" className="border-primary text-primary" />
              <Label htmlFor="sort-title-desc">Title (Z-A)</Label>
            </div>
          </RadioGroup>
        </div>

        <Separator className="bg-primary/20" />

        <Button
          variant="outline"
          className="w-full border-primary/30 text-primary hover:bg-primary/10"
          onClick={handleReset}
        >
          Reset Filters
        </Button>
      </div>
    </div>
  )
}
