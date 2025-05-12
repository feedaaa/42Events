"use client"

import { useState, useEffect } from "react"

export function useOnlineStatus() {
  // Default to true if window is not defined (SSR)
  const [isOnline, setIsOnline] = useState(true)

  useEffect(() => {
    // Update initial state
    setIsOnline(navigator.onLine)

    // Event handlers
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    // Add event listeners
    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    // Clean up
    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  return isOnline
}
