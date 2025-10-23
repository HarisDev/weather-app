import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { reverseGeocode } from "./client";

/**
 * Hook to reverse geocode coordinates to get city and country.
 * @param latitude - The latitude coordinate.
 * @param longitude - The longitude coordinate.
 * @param enabled - Whether the query is enabled.
 * @returns The city and country information.
 */
export function useReverseGeocode(latitude: number | null | undefined, longitude: number | null | undefined, enabled = true) {
  return useQuery({
    queryKey: ["reverse-geocode", latitude, longitude],
    queryFn: () => reverseGeocode(latitude!, longitude!),
    enabled: enabled && latitude != null && longitude != null,
    staleTime: 1000 * 60 * 10, // 10 minutes
    placeholderData: keepPreviousData,
  });
}
