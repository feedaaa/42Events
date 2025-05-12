"use client"

import { useEffect, useState } from "react"
import { initializeOfflineData } from "@/lib/sync-service"

export function OfflineInitializer() {
  const [initialized, setInitialized] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const initialize = async () => {
      if (!initialized) {
        try {
          const result = await initializeOfflineData()
          if (result.success) {
            console.log(`Offline data initialized with ${result.count || 0} events`)
            setInitialized(true)
          } else {
            setError(result.error || "Unknown error initializing offline data")
          }
        } catch (error) {
          console.error("Failed to initialize offline data:", error)
          setError(error instanceof Error ? error.message : "Unknown error")
        }
      }
    }

    // Only run in browser environment
    if (typeof window !== "undefined") {
      initialize()
    }
  }, [initialized])

  // This component doesn't render anything visible
  return null
}
