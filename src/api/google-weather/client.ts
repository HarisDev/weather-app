import { GOOGLE_WEATHER_API_BASE_URL, GOOGLE_WEATHER_API_KEY } from "@/constants/api";
import type { CurrentConditions, CurrentConditionsInput } from "@/types/api/google-weather";
/**
 * Get current weather conditions for a location.
 * @see https://developers.google.com/maps/documentation/weather/current-conditions
 * @param input - The location and optional unit system.
 * @returns The current weather conditions.
 */
export async function getCurrentConditions(input: CurrentConditionsInput): Promise<CurrentConditions> {
  const params = new URLSearchParams({
    key: GOOGLE_WEATHER_API_KEY,
    "location.latitude": input.location.latitude.toString(),
    "location.longitude": input.location.longitude.toString(),
  });

  if (input.unitsSystem) {
    params.append("unitsSystem", input.unitsSystem);
  }

  const response = await fetch(`${GOOGLE_WEATHER_API_BASE_URL}/currentConditions:lookup?${params.toString()}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Weather API request failed: ${response.statusText}`);
  }

  return response.json();
}
