import { openDB, type DBSchema } from "idb"

interface EventsDB extends DBSchema {
  events: {
    key: string
    value: any
    indexes: { "by-date": string }
  }
  pendingActions: {
    key: number
    value: {
      id: number
      action: "create" | "update" | "delete"
      data: any
      timestamp: number
    }
  }
}

const DB_NAME = "university-events-db"
const DB_VERSION = 1

// Check if IndexedDB is available
const isIndexedDBAvailable = () => {
  try {
    return typeof window !== "undefined" && "indexedDB" in window
  } catch (e) {
    return false
  }
}

export async function initDB() {
  if (!isIndexedDBAvailable()) {
    throw new Error("IndexedDB is not available in this environment")
  }

  try {
    return openDB<EventsDB>(DB_NAME, DB_VERSION, {
      upgrade(db) {
        // Create events store if it doesn't exist
        if (!db.objectStoreNames.contains("events")) {
          const eventsStore = db.createObjectStore("events", { keyPath: "id" })
          eventsStore.createIndex("by-date", "date")
        }

        // Create pending actions store if it doesn't exist
        if (!db.objectStoreNames.contains("pendingActions")) {
          db.createObjectStore("pendingActions", { keyPath: "id", autoIncrement: true })
        }
      },
    })
  } catch (error) {
    console.error("Failed to initialize IndexedDB:", error)
    throw new Error("Failed to initialize offline storage")
  }
}

// Events CRUD operations
export async function getEvents() {
  if (!isIndexedDBAvailable()) {
    return []
  }

  try {
    const db = await initDB()
    return db.getAll("events")
  } catch (error) {
    console.error("Failed to get events from IndexedDB:", error)
    return []
  }
}

export async function getEventById(id: string) {
  if (!isIndexedDBAvailable()) {
    return null
  }

  try {
    const db = await initDB()
    return db.get("events", id)
  } catch (error) {
    console.error(`Failed to get event ${id} from IndexedDB:`, error)
    return null
  }
}

export async function saveEvent(event: any) {
  if (!isIndexedDBAvailable()) {
    console.warn("IndexedDB not available, can't save event")
    return false
  }

  try {
    const db = await initDB()
    await db.put("events", event)
    return true
  } catch (error) {
    console.error("Failed to save event to IndexedDB:", error)
    return false
  }
}

export async function deleteEventFromDB(id: string) {
  if (!isIndexedDBAvailable()) {
    return false
  }

  try {
    const db = await initDB()
    await db.delete("events", id)
    return true
  } catch (error) {
    console.error(`Failed to delete event ${id} from IndexedDB:`, error)
    return false
  }
}

// Pending actions for offline sync
export async function addPendingAction(action: "create" | "update" | "delete", data: any) {
  if (!isIndexedDBAvailable()) {
    console.warn("IndexedDB not available, can't add pending action")
    return null
  }

  try {
    const db = await initDB()
    const id = await db.add("pendingActions", {
      action,
      data,
      timestamp: Date.now(),
    })
    return id
  } catch (error) {
    console.error("Failed to add pending action to IndexedDB:", error)
    return null
  }
}

export async function getPendingActions() {
  if (!isIndexedDBAvailable()) {
    return []
  }

  try {
    const db = await initDB()
    return db.getAll("pendingActions")
  } catch (error) {
    console.error("Failed to get pending actions from IndexedDB:", error)
    return []
  }
}

export async function deletePendingAction(id: number) {
  if (!isIndexedDBAvailable()) {
    return false
  }

  try {
    const db = await initDB()
    await db.delete("pendingActions", id)
    return true
  } catch (error) {
    console.error(`Failed to delete pending action ${id} from IndexedDB:`, error)
    return false
  }
}
