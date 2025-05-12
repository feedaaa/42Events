"use client"

import { useState, useEffect } from "react"
import { WifiOff } from "lucide-react"
import { useOnlineStatus } from "@/hooks/use-online-status"

export function OfflineIndicator() {
  const isOnline = useOnlineStatus()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!isOnline) {
      setVisible(true)
    } else {
      // Delay hiding to show reconnection message
      const timer = setTimeout(() => {
        setVisible(false)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [isOnline])

  if (!visible) return null

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg transition-all duration-300 flex items-center gap-2 ${
        isOnline
          ? "bg-green-600 text-white translate-y-0 opacity-100"
          : "bg-destructive text-destructive-foreground translate-y-0 opacity-100"
      }`}
    >
      {!isOnline ? (
        <>
          <WifiOff className="h-5 w-5" />
          <span>You're offline. Some features may be limited.</span>
        </>
      ) : (
        <span>You're back online!</span>
      )}
    </div>
  )
}
