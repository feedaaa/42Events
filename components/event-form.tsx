"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { CalendarIcon, Clock, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import { createEvent, updateEvent } from "@/lib/events"
import { RichTextEditor } from "@/components/rich-text-editor"
import { CategorySelector } from "@/components/category-selector"
import { ImageUpload } from "@/components/image-upload"
import { TimePickerInput } from "@/components/time-picker-input"

const eventFormSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  date: z.date({ required_error: "Event date is required" }),
  startTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, { message: "Start time must be in HH:MM format" }),
  endTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, { message: "End time must be in HH:MM format" }),
  location: z.string().min(3, { message: "Location must be at least 3 characters" }),
  organizer: z.string().min(3, { message: "Organizer must be at least 3 characters" }),
  organizerDepartment: z.string().optional(),
  categories: z.array(z.string()).min(1, { message: "Select at least one category" }),
  featured: z.boolean().default(false),
  published: z.boolean().default(true),
  hasMap: z.boolean().default(false),
  image: z.string().optional(),
})

type EventFormValues = z.infer<typeof eventFormSchema>

interface EventFormProps {
  event?: any
}

export function EventForm({ event }: EventFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeTab, setActiveTab] = useState("basic")

  const defaultValues: Partial<EventFormValues> = {
    title: event?.title || "",
    description: event?.description || "",
    date: event?.date ? new Date(event.date) : new Date(),
    startTime: event?.startTime || "09:00",
    endTime: event?.endTime || "10:00",
    location: event?.location || "",
    organizer: event?.organizer || "",
    organizerDepartment: event?.organizerDepartment || "",
    categories: event?.categories || [],
    featured: event?.featured || false,
    published: event?.published !== undefined ? event.published : true,
    hasMap: event?.hasMap || false,
    image: event?.image || "",
  }

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<EventFormValues>({
    resolver: zodResolver(eventFormSchema),
    defaultValues,
  })

  const watchDate = watch("date")
  const watchImage = watch("image")

  const onSubmit = async (data: EventFormValues) => {
    setIsSubmitting(true)

    try {
      if (event?.id) {
        await updateEvent(event.id, data)
        toast({
          title: "Event updated",
          description: "Your event has been updated successfully",
        })
      } else {
        await createEvent(data)
        toast({
          title: "Event created",
          description: "Your event has been created successfully",
        })
      }

      router.push("/admin/events")
      router.refresh()
    } catch (error) {
      console.error("Error saving event:", error)
      toast({
        title: "Error",
        description: "There was an error saving your event. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleImageUpload = (url: string) => {
    setValue("image", url)
  }

  const handleImageRemove = () => {
    setValue("image", "")
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="basic">Basic Information</TabsTrigger>
          <TabsTrigger value="details">Details & Media</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-6 pt-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">
                Event Title <span className="text-destructive">*</span>
              </Label>
              <Input id="title" {...register("title")} placeholder="Enter event title" />
              {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">
                Description <span className="text-destructive">*</span>
              </Label>
              <RichTextEditor
                value={defaultValues.description || ""}
                onChange={(value) => setValue("description", value)}
              />
              {errors.description && <p className="text-sm text-destructive">{errors.description.message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">
                  Date <span className="text-destructive">*</span>
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !watchDate && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {watchDate ? watchDate.toLocaleDateString() : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={watchDate}
                      onSelect={(date) => setValue("date", date as Date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                {errors.date && <p className="text-sm text-destructive">{errors.date.message}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startTime">
                    Start Time <span className="text-destructive">*</span>
                  </Label>
                  <div className="flex items-center">
                    <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                    <TimePickerInput
                      value={defaultValues.startTime || "09:00"}
                      onChange={(value) => setValue("startTime", value)}
                    />
                  </div>
                  {errors.startTime && <p className="text-sm text-destructive">{errors.startTime.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="endTime">
                    End Time <span className="text-destructive">*</span>
                  </Label>
                  <div className="flex items-center">
                    <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                    <TimePickerInput
                      value={defaultValues.endTime || "10:00"}
                      onChange={(value) => setValue("endTime", value)}
                    />
                  </div>
                  {errors.endTime && <p className="text-sm text-destructive">{errors.endTime.message}</p>}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">
                Location <span className="text-destructive">*</span>
              </Label>
              <Input id="location" {...register("location")} placeholder="Enter event location" />
              {errors.location && <p className="text-sm text-destructive">{errors.location.message}</p>}
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="hasMap"
                checked={watch("hasMap")}
                onCheckedChange={(checked) => setValue("hasMap", !!checked)}
              />
              <Label htmlFor="hasMap">Show map for this location</Label>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="details" className="space-y-6 pt-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Event Image</Label>
              <Card className="overflow-hidden">
                <CardContent className="p-4">
                  {watchImage ? (
                    <div className="relative aspect-video w-full">
                      <img
                        src={watchImage || "/placeholder.svg"}
                        alt="Event image"
                        className="object-cover w-full h-full"
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2"
                        type="button"
                        onClick={handleImageRemove}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <ImageUpload onUpload={handleImageUpload} />
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="space-y-2">
              <Label>
                Categories <span className="text-destructive">*</span>
              </Label>
              <CategorySelector
                selectedCategories={watch("categories")}
                onChange={(categories) => setValue("categories", categories)}
              />
              {errors.categories && <p className="text-sm text-destructive">{errors.categories.message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="organizer">
                  Organizer <span className="text-destructive">*</span>
                </Label>
                <Input id="organizer" {...register("organizer")} placeholder="Enter organizer name" />
                {errors.organizer && <p className="text-sm text-destructive">{errors.organizer.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="organizerDepartment">Department/Organization</Label>
                <Input
                  id="organizerDepartment"
                  {...register("organizerDepartment")}
                  placeholder="Enter department or organization"
                />
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6 pt-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Visibility</Label>
              <RadioGroup
                defaultValue={defaultValues.published ? "published" : "draft"}
                onValueChange={(value) => setValue("published", value === "published")}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="published" id="published" />
                  <Label htmlFor="published">Published (visible to all users)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="draft" id="draft" />
                  <Label htmlFor="draft">Draft (only visible to admins)</Label>
                </div>
              </RadioGroup>
            </div>

            <Separator />

            <div className="flex items-center space-x-2">
              <Checkbox
                id="featured"
                checked={watch("featured")}
                onCheckedChange={(checked) => setValue("featured", !!checked)}
              />
              <Label htmlFor="featured">Feature this event (will be highlighted on the homepage)</Label>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={() => router.push("/admin/events")}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : event?.id ? "Update Event" : "Create Event"}
        </Button>
      </div>
    </form>
  )
}
