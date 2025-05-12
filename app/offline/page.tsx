"use client"

import Link from "next/link"
import { WifiOff } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function OfflinePage() {
  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
      <div className="text-center max-w-md">
        <div className="bg-muted p-6 rounded-full inline-block mb-6">
          <WifiOff className="h-12 w-12 text-primary" />
        </div>
        <h1 className="text-3xl font-bold mb-4">
          <span className="text-primary">&lt;</span>
          You're Offline
          <span className="text-primary">/&gt;</span>
        </h1>
        <p className="text-muted-foreground mb-8">
          It looks like you're not connected to the internet. Some features may be limited until you're back online.
        </p>
        <div className="space-y-4">
          <Button asChild className="w-full">
            <Link href="/">Go to Homepage</Link>
          </Button>
          <Button variant="outline" className="w-full" onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </div>
    </div>
  )
}
