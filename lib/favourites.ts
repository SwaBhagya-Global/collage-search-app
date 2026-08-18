import { CollegeCardProps } from "./types"

export const FAVOURITES_STORAGE_KEY = "favouriteColleges"
const LEGACY_STORAGE_KEYS = ["favoriteColleges", "savedColleges"]

export type FavouriteCollege = CollegeCardProps["college"]

/**
 * Safely retrieves all favourite colleges from localStorage.
 */
export function getFavouriteColleges(): FavouriteCollege[] {
  if (typeof window === "undefined") return []

  try {
    const raw = localStorage.getItem(FAVOURITES_STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed)) return parsed
    }

    // Check legacy storage keys if primary key is not set
    for (const key of LEGACY_STORAGE_KEYS) {
      const legacyRaw = localStorage.getItem(key)
      if (legacyRaw) {
        const parsed = JSON.parse(legacyRaw)
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Migrate to primary key
          localStorage.setItem(FAVOURITES_STORAGE_KEY, JSON.stringify(parsed))
          return parsed
        }
      }
    }
  } catch (error) {
    console.error("Error reading favourites from localStorage:", error)
  }

  return []
}

/**
 * Checks if a college is already in favourites by id.
 */
export function isCollegeFavourited(collegeId: string): boolean {
  if (!collegeId) return false
  const list = getFavouriteColleges()
  return list.some((c) => c.id === collegeId)
}

/**
 * Adds a college to favourites.
 */
export function addFavouriteCollege(college: FavouriteCollege): FavouriteCollege[] {
  if (typeof window === "undefined" || !college?.id) return []

  try {
    const list = getFavouriteColleges()
    const alreadyExists = list.some((c) => c.id === college.id)
    if (alreadyExists) return list

    const updated = [college, ...list]
    localStorage.setItem(FAVOURITES_STORAGE_KEY, JSON.stringify(updated))
    notifyFavouritesUpdated(updated)
    return updated
  } catch (error) {
    console.error("Error adding favourite college:", error)
    return getFavouriteColleges()
  }
}

/**
 * Removes a college from favourites by id.
 */
export function removeFavouriteCollege(collegeId: string): FavouriteCollege[] {
  if (typeof window === "undefined" || !collegeId) return []

  try {
    const list = getFavouriteColleges()
    const updated = list.filter((c) => c.id !== collegeId)
    localStorage.setItem(FAVOURITES_STORAGE_KEY, JSON.stringify(updated))
    notifyFavouritesUpdated(updated)
    return updated
  } catch (error) {
    console.error("Error removing favourite college:", error)
    return getFavouriteColleges()
  }
}

/**
 * Toggles a college in favourites. Returns true if now favourited, false if removed.
 */
export function toggleFavouriteCollege(college: FavouriteCollege): boolean {
  if (!college?.id) return false
  const isFav = isCollegeFavourited(college.id)
  if (isFav) {
    removeFavouriteCollege(college.id)
    return false
  } else {
    addFavouriteCollege(college)
    return true
  }
}

/**
 * Clears all favourite colleges.
 */
export function clearAllFavourites(): void {
  if (typeof window === "undefined") return

  try {
    localStorage.removeItem(FAVOURITES_STORAGE_KEY)
    for (const key of LEGACY_STORAGE_KEYS) {
      localStorage.removeItem(key)
    }
    notifyFavouritesUpdated([])
  } catch (error) {
    console.error("Error clearing favourites:", error)
  }
}

/**
 * Dispatches custom event to notify components of favourites update.
 */
function notifyFavouritesUpdated(favourites: FavouriteCollege[]): void {
  if (typeof window === "undefined") return
  window.dispatchEvent(
    new CustomEvent("favouritesUpdated", {
      detail: { count: favourites.length, favourites },
    })
  )
}
