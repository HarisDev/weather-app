import { GOOGLE_PLACES_API_BASE_URL, GOOGLE_PLACES_API_KEY } from "@/constants/api";
import type { AutocompleteInput, AutocompleteOutput, Place } from "@/types/api/google-places";

/**
 * Autocomplete the input.
 * @see https://developers.google.com/maps/documentation/places/web-service/place-autocomplete
 * @param input - The input to autocomplete.
 * @returns The autocomplete output.
 */
export async function autocompletePlaces(input: AutocompleteInput): Promise<AutocompleteOutput> {
  const response = await fetch(`${GOOGLE_PLACES_API_BASE_URL}/places:autocomplete`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": GOOGLE_PLACES_API_KEY,
    },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Get details for a specific place by ID
 * @param placeId - The place ID to fetch details for
 * @returns Place details or null on error
 */
export async function getPlaceDetails(placeId: string): Promise<Place | null> {
  try {
    const response = await fetch(`https://places.googleapis.com/v1/places/${placeId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": GOOGLE_PLACES_API_KEY,
        "X-Goog-FieldMask": "id,location,displayName,formattedAddress,types",
      },
    });

    if (!response.ok) {
      throw new Error(`Places API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch place details:", error);
    return null;
  }
}
