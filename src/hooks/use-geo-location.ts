import { useEffect, useState } from "react";
import type { GeoLocation } from "@/types/geolocation";
import { GeoLocationStatus } from "@/types/geolocation";
import { getBrowserGeolocation, isBrowserGeolocationAllowed } from "@/lib/browser-geolocation";
import { getGeoIpLocation } from "@/api/geo-ip/client";
import { getTimezoneBasedLocation } from "@/lib/timezone-geolocation";

export type UseGeoLocationResult = GeoLocation & {
  status: GeoLocationStatus;
  setGeoLocation: (location: GeoLocation) => void;
};

/**
 * Hook to get the user's geolocation.
 * @returns The geolocation and status.
 * @property latitude - The latitude of the user's location.
 * @property longitude - The longitude of the user's location.
 * @property status - The status of the geolocation retrieval.
 */
export default function useGeoLocation(): UseGeoLocationResult {
  const [geoLocation, setGeoLocation] = useState<GeoLocation | null>(null);
  const [status, setStatus] = useState<GeoLocationStatus>(GeoLocationStatus.Loading);

  useEffect(() => {
    // 1. Get browser geolocation asynchronously with the dedicated button
    //    and update state as most confident location. Fire and forget.
    // or check if browser geolocation is allowed and get it if it is.
    // @see UsePreciseLocation

    isBrowserGeolocationAllowed().then((allowed) => {
      if (!allowed) {
        return;
      }

      getBrowserGeolocation((position) => {
        setGeoLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    });

    // 2. At the same time, try to get IP geolocation and update state if successful as a first contentful paint.
    getGeoIpLocation(() => {
      // 3. If IP geolocation fails, fall back to timezone based approximation.
      const timezoneLocation = getTimezoneBasedLocation();
      setGeoLocation(timezoneLocation);
      setStatus(GeoLocationStatus.Success);
    }).then((data) => {
      if (data) {
        // Get IP Geolocation until user gives location access
        setStatus(GeoLocationStatus.Success);
        setGeoLocation({
          latitude: data.latitude,
          longitude: data.longitude,
        });
      }
    });
  }, []);

  return {
    latitude: geoLocation?.latitude ?? 0,
    longitude: geoLocation?.longitude ?? 0,
    status,
    setGeoLocation,
  };
}
