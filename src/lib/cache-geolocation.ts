import type { GeoIpLocationResponse } from "@/api/geo-ip/client";
import type { CacheGeoLocation } from "@/types/cache-geolocation";

/**
 * Get the cached geolocation from localStorage.
 * @returns The cached geolocation or null if it doesn't exist or has expired.
 */
export const getCachedLocation = () => {
  const geoLocation: CacheGeoLocation = JSON.parse(localStorage.getItem("geoLocation") || "{}");

  if (geoLocation && Date.now() < geoLocation.expiresAt) {
    return geoLocation;
  }

  return null;
};

/**
 * Set the geolocation in localStorage. Expires in 2 hours.
 * @param location - The geolocation to set.
 */
export const setCachedLocation = (location: GeoIpLocationResponse) => {
  // Expires in 2 hours
  localStorage.setItem(
    "geoLocation",
    JSON.stringify({
      ...location,
      expiresAt: Date.now() + 1000 * 60 * 60 * 2,
    })
  );
};
