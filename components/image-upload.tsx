"use client"

import type React from "react"

import { useState } from "react"
import { Upload, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ImageUploadProps {
  onUpload: (url: string) => void
}

export function ImageUpload({ onUpload }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)

  // In a real app, this would upload to a storage service
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (!file) return

    // Check file type
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file")
      return
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("File size should be less than 5MB")
      return
    }

    setIsUploading(true)

    // Simulate upload delay
    setTimeout(() => {
      // In a real app, we would upload the file to a storage service
      // and get back a URL. For this demo, we'll use a placeholder.
      const imageUrl = "/placeholder.svg?height=600&width=1200"
      onUpload(imageUrl)
      setIsUploading(false)
    }, 1500)
  }

  return (
    <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-md">
      <div className="flex flex-col items-center justify-center space-y-2">
        <div className="p-3 rounded-full bg-muted">
          {isUploading ? (
            <div className="animate-spin">
              <Upload className="h-8 w-8 text-muted-foreground" />
            </div>
          ) : (
            <ImageIcon className="h-8 w-8 text-muted-foreground" />
          )}
        </div>
        <div className="text-center">
          <p className="text-sm font-medium">
            {isUploading ? "Uploading..." : "Drag and drop an image or click to browse"}
          </p>
          <p className="text-xs text-muted-foreground mt-1">PNG, JPG or GIF up to 5MB</p>
        </div>
      </div>
      <div className="mt-4">
        <Button
          variant="outline"
          disabled={isUploading}
          onClick={() => document.getElementById("image-upload")?.click()}
        >
          {isUploading ? "Uploading..." : "Select Image"}
        </Button>
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
          disabled={isUploading}
        />
      </div>
    </div>
  )
}
