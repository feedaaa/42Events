"use client"

import { useOnlineStatus } from "@/hooks/use-online-status"
import { AlertCircle, WifiOff } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { syncPendingActions } from "@/lib/sync-service"
import { useState } from "react"

export function OfflineStatusBanner({ hasOfflineData = false, hasPendingChanges = false }) {
  const isOnline = useOnlineStatus()
  const [isSyncing, setIsSyncing] = useState(false)

  const handleSync = async () => {
    if (!isOnline || !hasPendingChanges) return

    setIsSyncing(true)
    try {
      await syncPendingActions()
      // Refresh the page to show updated data
      window.location.reload()
    } catch (error) {
      console.error("Failed to sync:", error)
    } finally {
      setIsSyncing(false)
    }
  }

  if (isOnline && !hasPendingChanges) return null

  return (
    <Alert variant={isOnline ? "default" : "destructive"} className="mb-6">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>
        {isOnline && hasPendingChanges ? "You have unsynchronized changes" : "You're viewing cached data"}
      </AlertTitle>
      <AlertDescription className="flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
        <div>
          {isOnline && hasPendingChanges ? (
            "Changes made while offline need to be synchronized."
          ) : (
            <>
              <WifiOff className="inline-block mr-2 h-4 w-4" />
              You're currently offline.{" "}
              {hasOfflineData ? "Showing previously loaded events." : "Some content may not be available."}
            </>
          )}
        </div>

        {isOnline && hasPendingChanges && (
          <Button size="sm" onClick={handleSync} disabled={isSyncing}>
            {isSyncing ? "Syncing..." : "Sync Now"}
          </Button>
        )}
      </AlertDescription>
    </Alert>
  )
}
