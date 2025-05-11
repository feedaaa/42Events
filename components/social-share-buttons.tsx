"use client"

import { Share2, Facebook, Twitter, Linkedin, Link2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface SocialShareButtonsProps {
  event: {
    id: string
    title: string
  }
}

export function SocialShareButtons({ event }: SocialShareButtonsProps) {
  const eventUrl =
    typeof window !== "undefined" ? `${window.location.origin}/events/${event.id}` : `/events/${event.id}`

  const shareText = `Check out this event: ${event.title}`

  const handleCopyLink = () => {
    navigator.clipboard.writeText(eventUrl).then(() => {
      toast({
        title: "Link copied",
        description: "Event link copied to clipboard",
      })
    })
  }

  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(eventUrl)}`
  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(eventUrl)}`
  const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(eventUrl)}`

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full justify-between">
          <div className="flex items-center">
            <Share2 className="mr-2 h-4 w-4" />
            <span>Share Event</span>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        <DropdownMenuItem asChild>
          <a href={facebookShareUrl} target="_blank" rel="noopener noreferrer" className="flex items-center">
            <Facebook className="mr-2 h-4 w-4" />
            <span>Facebook</span>
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <a href={twitterShareUrl} target="_blank" rel="noopener noreferrer" className="flex items-center">
            <Twitter className="mr-2 h-4 w-4" />
            <span>Twitter</span>
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <a href={linkedinShareUrl} target="_blank" rel="noopener noreferrer" className="flex items-center">
            <Linkedin className="mr-2 h-4 w-4" />
            <span>LinkedIn</span>
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleCopyLink} className="flex items-center">
          <Link2 className="mr-2 h-4 w-4" />
          <span>Copy Link</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
