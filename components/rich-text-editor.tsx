"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Bold, Italic, List, ListOrdered, Link, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
}

export function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const [text, setText] = useState(value)
  const [activeTab, setActiveTab] = useState<"write" | "preview">("write")

  useEffect(() => {
    setText(value)
  }, [value])

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value
    setText(newValue)
    onChange(newValue)
  }

  const insertFormat = (format: string) => {
    const textarea = document.getElementById("rich-text-editor") as HTMLTextAreaElement
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = text.substring(start, end)

    let formattedText = ""
    let cursorPosition = 0

    switch (format) {
      case "bold":
        formattedText = `<strong>${selectedText}</strong>`
        cursorPosition = start + 8 + selectedText.length
        break
      case "italic":
        formattedText = `<em>${selectedText}</em>`
        cursorPosition = start + 4 + selectedText.length
        break
      case "ul":
        formattedText = `<ul>\n  <li>${selectedText}</li>\n</ul>`
        cursorPosition = start + 11 + selectedText.length
        break
      case "ol":
        formattedText = `<ol>\n  <li>${selectedText}</li>\n</ol>`
        cursorPosition = start + 11 + selectedText.length
        break
      case "link":
        formattedText = `<a href="#">${selectedText}</a>`
        cursorPosition = start + 9 + selectedText.length
        break
      case "image":
        formattedText = `<img src="/placeholder.svg" alt="${selectedText}" />`
        cursorPosition = start + formattedText.length
        break
      default:
        return
    }

    const newText = text.substring(0, start) + formattedText + text.substring(end)
    setText(newText)
    onChange(newText)

    // Set cursor position after the operation
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(cursorPosition, cursorPosition)
    }, 0)
  }

  return (
    <div className="border rounded-md">
      <div className="flex items-center gap-1 p-1 border-b">
        <Button variant="ghost" size="icon" onClick={() => insertFormat("bold")} type="button">
          <Bold className="h-4 w-4" />
          <span className="sr-only">Bold</span>
        </Button>
        <Button variant="ghost" size="icon" onClick={() => insertFormat("italic")} type="button">
          <Italic className="h-4 w-4" />
          <span className="sr-only">Italic</span>
        </Button>
        <Button variant="ghost" size="icon" onClick={() => insertFormat("ul")} type="button">
          <List className="h-4 w-4" />
          <span className="sr-only">Bullet List</span>
        </Button>
        <Button variant="ghost" size="icon" onClick={() => insertFormat("ol")} type="button">
          <ListOrdered className="h-4 w-4" />
          <span className="sr-only">Numbered List</span>
        </Button>
        <Button variant="ghost" size="icon" onClick={() => insertFormat("link")} type="button">
          <Link className="h-4 w-4" />
          <span className="sr-only">Link</span>
        </Button>
        <Button variant="ghost" size="icon" onClick={() => insertFormat("image")} type="button">
          <ImageIcon className="h-4 w-4" />
          <span className="sr-only">Image</span>
        </Button>

        <div className="ml-auto">
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "write" | "preview")}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="write">Write</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="p-2">
        {activeTab === "write" ? (
          <Textarea
            id="rich-text-editor"
            value={text}
            onChange={handleChange}
            className="min-h-[200px] border-none focus-visible:ring-0 p-0"
            placeholder="Enter event description..."
          />
        ) : (
          <div
            className="min-h-[200px] prose max-w-none dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: text }}
          />
        )}
      </div>
    </div>
  )
}
