"use client"

import { useState, useEffect } from "react"
import { Check, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { fetchCategories } from "@/lib/categories"

interface CategorySelectorProps {
  selectedCategories: string[]
  onChange: (categories: string[]) => void
}

export function CategorySelector({ selectedCategories, onChange }: CategorySelectorProps) {
  const [open, setOpen] = useState(false)
  const [categories, setCategories] = useState([])

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

  const handleSelect = (value: string) => {
    if (selectedCategories.includes(value)) {
      onChange(selectedCategories.filter((category) => category !== value))
    } else {
      onChange([...selectedCategories, value])
    }
  }

  const handleRemove = (value: string) => {
    onChange(selectedCategories.filter((category) => category !== value))
  }

  return (
    <div className="space-y-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
            Select categories
            <span className="ml-2 rounded-full bg-primary text-primary-foreground px-2 py-0.5 text-xs">
              {selectedCategories.length}
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="Search categories..." />
            <CommandList>
              <CommandEmpty>No category found.</CommandEmpty>
              <CommandGroup className="max-h-64 overflow-auto">
                {categories.map((category) => (
                  <CommandItem
                    key={category.value}
                    onSelect={() => handleSelect(category.value)}
                    className="flex items-center gap-2"
                  >
                    <div
                      className={cn(
                        "flex h-4 w-4 items-center justify-center rounded-sm border",
                        selectedCategories.includes(category.value)
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-muted opacity-50",
                      )}
                    >
                      {selectedCategories.includes(category.value) && <Check className="h-3 w-3" />}
                    </div>
                    {category.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {selectedCategories.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedCategories.map((categoryValue) => {
            const category = categories.find((c) => c.value === categoryValue)
            return (
              <Badge key={categoryValue} variant="secondary" className="flex items-center gap-1">
                {category?.label || categoryValue}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 p-0 hover:bg-transparent"
                  onClick={() => handleRemove(categoryValue)}
                >
                  <X className="h-3 w-3" />
                  <span className="sr-only">Remove {category?.label || categoryValue}</span>
                </Button>
              </Badge>
            )
          })}
        </div>
      )}
    </div>
  )
}
