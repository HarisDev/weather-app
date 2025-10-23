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
      let city = "";

      // Try to get compound_code from plus_code first
      if (data.plus_code?.compound_code) {
        city = data.plus_code.compound_code.split(" ").slice(1).join(" ");
      }

      // If compound_code doesn't exist or is empty, try to extract from results
      if (!city) {
        // Look for locality, administrative_area, or country
        for (const result of data.results) {
          const addressComponents = result.address_components || [];

          // Try to find locality first
          const locality = addressComponents.find((component: any) => component.types.includes("locality"));

          if (locality?.long_name) {
            city = locality.long_name;
            break;
          }

          // Fall back to administrative_area_level_1
          const adminArea = addressComponents.find((component: any) => component.types.includes("administrative_area_level_1"));

          if (adminArea?.long_name) {
            city = adminArea.long_name;
            break;
          }

          // Last resort: use country
          const country = addressComponents.find((component: any) => component.types.includes("country"));

          if (country?.long_name) {
            city = country.long_name;
            break;
          }
        }
      }

      return city ? { city } : null;
    }

    return null;
  } catch (error) {
    console.error("Failed to reverse geocode:", error);
    return null;
  }
}
