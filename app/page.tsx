import { EventsList } from "@/components/events-list"
import { HeroSection } from "@/components/hero-section"

export default function HomePage() {
  return (
    <div className="animated-bg">
      <div className="scrolling-lines">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="scrolling-line"
            style={{
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 50 + 50}%`,
              animationDuration: `${Math.random() * 15 + 5}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          ></div>
        ))}
      </div>

      <HeroSection />

      <div className="container mx-auto px-4 py-12">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold mb-2">
            <span className="text-primary">&lt;</span>
            Upcoming Events
            <span className="text-primary">/&gt;</span>
          </h2>
          <div className="flex justify-center mb-4">
            <div className="h-1 w-24 bg-secondary"></div>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Browse through our upcoming events and find something that interests you.
          </p>
        </div>

        <EventsList />
      </div>
    </div>
  )
}
