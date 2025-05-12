import { getPendingActions, deletePendingAction, saveEvent } from "./offline-storage"
import { createEvent, updateEvent, deleteEvent, fetchEvents } from "./events"

export async function syncPendingActions() {
  const pendingActions = await getPendingActions()

  if (pendingActions.length === 0) {
    return { success: true, message: "No pending actions to sync" }
  }

  const results = []

  for (const action of pendingActions) {
    try {
      let result

      switch (action.action) {
        case "create":
          result = await createEvent(action.data)
          break
        case "update":
          result = await updateEvent(action.data.id, action.data)
          break
        case "delete":
          result = await deleteEvent(action.data.id)
          break
      }

      // If successful, remove the pending action
      await deletePendingAction(action.id)

      results.push({
        success: true,
        action: action.action,
        id: action.id,
      })
    } catch (error) {
      results.push({
        success: false,
        action: action.action,
        id: action.id,
        error: error.message,
      })
    }
  }

  return {
    success: results.every((r) => r.success),
    results,
  }
}

export async function initializeOfflineData() {
  try {
    // Call fetchEvents instead of getEvents and pass required parameters
    const result = await fetchEvents({
      page: 1,
      category: "",
      search: "",
      sort: "date",
    })

    if (!result || !result.events) {
      console.warn("No events data available for offline caching")
      return { success: false, error: "No events data available" }
    }

    // Store events in IndexedDB for offline use
    for (const event of result.events) {
      await saveEvent(event)
    }

    console.log(`Cached ${result.events.length} events for offline use`)
    return { success: true, count: result.events.length }
  } catch (error) {
    console.error("Failed to initialize offline data:", error)
    return { success: false, error: error.message }
  }
}
