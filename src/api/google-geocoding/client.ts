import { GOOGLE_PLACES_API_KEY, GOOGLE_GEOCODING_API_BASE_URL } from "@/constants/api";

/**
 * Reverse geocode coordinates to get city and country.
 * @param latitude - The latitude coordinate.
 * @param longitude - The longitude coordinate.
 * @returns Object with city and country, or null on error.
 */
export async function reverseGeocode(
  latitude: number,
  longitude: number
): Promise<{ city?: string; country?: string } | null> {
  try {
    const url = `${GOOGLE_GEOCODING_API_BASE_URL}/json?latlng=${latitude},${longitude}&key=${GOOGLE_PLACES_API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.status === 'OK' && data.results.length > 0) {
      const addressComponents = data.results[0].address_components;

      const city = addressComponents.find((component: any) =>
        component.types.includes('locality')
      )?.long_name;

      const country = addressComponents.find((component: any) =>
        component.types.includes('country')
      )?.long_name;

      return { city, country };
    }

    return null;
  } catch (error) {
    console.error('Failed to reverse geocode:', error);
    return null;
  }
}
