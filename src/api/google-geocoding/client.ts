import { GOOGLE_PLACES_API_KEY, GOOGLE_GEOCODING_API_BASE_URL } from "@/constants/api";
import type { ReverseGeocodeResponse } from "@/types/api/google-geocoding";

/**
 * Reverse geocode coordinates to get city and country.
 * @param latitude - The latitude coordinate.
 * @param longitude - The longitude coordinate.
 * @returns Object with city and country, or null on error.
 */
export async function reverseGeocode(latitude: number, longitude: number): Promise<ReverseGeocodeResponse | null> {
  try {
    const url = `${GOOGLE_GEOCODING_API_BASE_URL}/json?latlng=${latitude},${longitude}&key=${GOOGLE_PLACES_API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.status === "OK" && data.results.length > 0) {
      // Priority order for city name fallback
      const cityTypePriority = ["locality", "postal_town", "administrative_area_level_2", "administrative_area_level_1", "sublocality"];

      let city: string | undefined;
      let country: string | undefined;

      // Look through all results to find the best city name
      for (const result of data.results) {
        const addressComponents = result.address_components;

        // Extract country if not found yet
        if (!country) {
          const countryComponent = addressComponents.find((component: any) => component.types.includes("country"));
          if (countryComponent) {
            country = countryComponent.long_name;
          }
        }

        // Look for city name in priority order
        if (!city) {
          for (const type of cityTypePriority) {
            const component = addressComponents.find((comp: any) => comp.types.includes(type));
            if (component) {
              city = component.long_name;
              break;
            }
          }
        }

        // Early exit if we found both
        if (city && country) break;
      }

      // Final fallback to coordinates if no city name found
      if (!city) {
        city = `${latitude.toFixed(2)}, ${longitude.toFixed(2)}`;
      }

      return { city, country };
    }

    return null;
  } catch (error) {
    console.error("Failed to reverse geocode:", error);
    return null;
  }
}
