import { GEO_IP_API } from "@/constants/api";
import { getCachedLocation, setCachedLocation } from "@/lib/cache-geolocation";
import type { GeoIpLocationResponse } from "@/types/api/client";

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

  const response = await fetch(GEO_IP_API).catch(onError);

  if (!response) {
    return null;
  }

  const data = await response.json();

  setCachedLocation({
    latitude: data.lat,
    longitude: data.lon,
    country: data.country,
    regionName: data.regionName,
    city: data.city,
  });

  return {
    latitude: data.lat,
    longitude: data.lon,
    country: data.country,
    regionName: data.regionName,
    city: data.city,
  };
}
