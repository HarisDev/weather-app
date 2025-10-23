import { useReverseGeocode } from "@/api/google-geocoding/hooks";
import { useCurrentConditions, useDailyForecast } from "@/api/google-weather/hooks";
import type { GeoLocation } from "@/types/geolocation";

/**
 *
 * @param geoLocation - The geolocation to get the weather for.
 * @param loadForecast - Whether to load the forecast for the location
 * @returns The current weather conditions, location, forecasts and loading status.
 */
export default function useWeather(geoLocation: GeoLocation, loadForecast = false) {
  const currentConditionsInput = geoLocation ? { location: { latitude: geoLocation.latitude ?? 0, longitude: geoLocation.longitude ?? 0 } } : null;

  const { data: currentConditions, isLoading: isCurrentConditionsLoading } = useCurrentConditions(currentConditionsInput);
  const { data: location, isLoading: isLocationLoading } = useReverseGeocode(geoLocation?.latitude, geoLocation?.longitude);
  const { data: forecasts, isLoading: isForecastsLoading } = useDailyForecast(loadForecast ? currentConditionsInput : null);

  const isLoading = isCurrentConditionsLoading || isLocationLoading;

  return {
    currentConditions,
    location,
    isLoading,
    isCurrentConditionsLoading,
    isLocationLoading,
    isForecastsLoading,
    forecasts,
  };
}
