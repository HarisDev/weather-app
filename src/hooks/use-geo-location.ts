import { useEffect, useState } from "react";
import type { GeoLocation } from "@/types/geolocation";
import { GeoLocationStatus } from "@/types/geolocation";
import { getBrowserGeolocation } from "@/lib/browser-geolocation";
import { getGeoIpLocation } from "@/api/geo-ip/client";
import { getTimezoneBasedLocation } from "@/lib/timezone-geolocation";

type UseGeoLocationResult = GeoLocation & {
  status: GeoLocationStatus;
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
    // 1. Get browser geolocation immediately and update state as most confident location. Fire and forget.
    getBrowserGeolocation((position) =>
      setGeoLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      })
    );

    // 2. At the same time, try to get IP geolocation and update state if successful as a first contentful paint.
    getGeoIpLocation(() => {
      // 3. If IP geolocation fails, fall back to timezone based approximation.
      const timezoneLocation = getTimezoneBasedLocation();
      setGeoLocation(timezoneLocation);
      setStatus(GeoLocationStatus.Success);
    }).then((data) => {
      if (data) {
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
  };
}
