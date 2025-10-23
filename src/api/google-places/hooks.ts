import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { autocompletePlaces, getPlaceDetails } from "./client";
import type { AutocompleteOutput, Place } from "@/types/api/google-places";

/**
 * Hook to autocomplete places based on user input.
 * @param input - The input to autocomplete.
 * @param enabled - Whether the query is enabled.
 * @returns The autocomplete output.
 */
export function usePlacesAutocomplete(input: string, enabled = true) {
  return useQuery<AutocompleteOutput>({
    queryKey: ["places-autocomplete", input],
    queryFn: () => autocompletePlaces({ input }),
    enabled: enabled && input.length > 0,
    staleTime: 1000 * 60 * 5, // 5 minutes
    placeholderData: keepPreviousData,
  });
}

/**
 * Hook to get place details by ID
 * @param placeId - The place ID to get details for.
 * @param enabled - Whether the query is enabled.
 * @returns The place details.
 */
export function usePlaceDetails(placeId: string | null | undefined, enabled = true) {
  return useQuery<Place | null>({
    queryKey: ["place-details", placeId],
    queryFn: () => getPlaceDetails(placeId!),
    enabled: enabled && !!placeId,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}
