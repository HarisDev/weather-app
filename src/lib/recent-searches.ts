import type { GeoLocation } from "@/types/geolocation";

const RECENT_SEARCHES_KEY = "recentSearches";
const MAX_RECENT_SEARCHES = 3;

export interface RecentSearch {
  name: string;
  location: GeoLocation;
}

export function getRecentSearches(): RecentSearch[] {
  try {
    const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
    if (!stored) return [];
    return JSON.parse(stored);
  } catch (error) {
    console.error("Failed to read recent searches from localStorage:", error);
    return [];
  }
}

export function addRecentSearch(search: RecentSearch): void {
  try {
    const searches = getRecentSearches();

    // Remove duplicate if it already exists (by name)
    const filtered = searches.filter((s) => s.name !== search.name);

    // Add new search at the beginning
    const updated = [search, ...filtered];

    // Keep only the most recent 3
    const limited = updated.slice(0, MAX_RECENT_SEARCHES);

    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(limited));

    // Dispatch custom event to notify components
    window.dispatchEvent(new CustomEvent("recentSearchesUpdated"));
  } catch (error) {
    console.error("Failed to save recent search to localStorage:", error);
  }
}
