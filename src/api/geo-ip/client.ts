import { GEO_IP_API } from "@/constants/api";
import { getCachedLocation, setCachedLocation } from "@/lib/cache-geolocation";
import type { GeoIpLocationResponse } from "@/types/api/client";

/**
 * Get the user's geolocation from the IP API.
 * @param onError - Callback function to be called when the geolocation retrieval fails.
 * @returns The geolocation or null if it doesn't exist or has expired.
 */
export async function getGeoIpLocation(onError: (error: Error) => void): Promise<GeoIpLocationResponse | null> {
  const cachedLocation = getCachedLocation();
  if (cachedLocation) {
    return {
      latitude: cachedLocation.latitude,
      longitude: cachedLocation.longitude,
      country: cachedLocation.country,
      regionName: cachedLocation.regionName,
      city: cachedLocation.city,
    } as GeoIpLocationResponse;
  }

  const data = await fetch(GEO_IP_API)
    .then((response) => {
      if (!response.ok) {
        onError(new Error(`Geo IP API request failed: ${response.status} ${response.statusText}`));
        return null;
      }
      return response.json();
    })
    .catch((error) => {
      onError(error);
      return null;
    });

  if (!data) {
    return null;
  }

  if (!data.latitude || !data.longitude) {
    return null;
  }

  const location = {
    latitude: data.latitude,
    longitude: data.longitude,
    country: data.country_name,
    regionName: data.country_region,
    city: data.city,
  };

  setCachedLocation(location);

  return location;
}
