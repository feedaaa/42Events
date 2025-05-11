import { SearchEvents } from "@/components/search-events"
import Link from "next/link"
export function HeroSection() {
  return (
    <div className="relative py-16 md:py-24 overflow-hidden">
      <div className="container relative z-10 mx-auto px-4 text-center">
        <div className="mb-6 inline-block">
          <div className="text-sm text-secondary mb-2 font-mono">&gt; DISCOVER CAMPUS LIFE</div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-2">
            <span className="text-white">Decode your </span>
            <span className="text-secondary">experience</span>
          </h1>
          <div className="flex justify-center">
            <div className="h-1 w-24 bg-accent"></div>
          </div>
        </div>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          Find and attend exciting events happening across campus. From lectures and workshops to performances and
          social gatherings.
        </p>

        <div className="max-w-md mx-auto mb-8 relative">
          <div className="absolute -left-4 -top-4 w-3 h-3 bg-primary"></div>
          <div className="absolute -right-4 -top-4 w-3 h-3 bg-secondary"></div>
          <div className="absolute -left-4 -bottom-4 w-3 h-3 bg-secondary"></div>
          <div className="absolute -right-4 -bottom-4 w-3 h-3 bg-primary"></div>
          <SearchEvents />
        </div>
        
        <Link href="/events/">
          <div className="pixel-button inline-block">Browse All Events</div>
        </Link>
      </div>
    </div>
  )
}
