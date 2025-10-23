import { useReverseGeocode } from "@/api/google-geocoding/hooks";
import { useCurrentConditions, useDailyForecast } from "@/api/google-weather/hooks";
import type { GeoLocation } from "@/types/geolocation";
import type { UseWeatherHookResult } from "@/types/hooks/use-weather";
import { useUnitsSystem } from "@/contexts/UnitsSystemContext";

/**
 *
 * @param geoLocation - The geolocation to get the weather for.
 * @param loadForecast - Whether to load the forecast for the location
 * @returns The current weather conditions, location, forecasts and loading status.
 */
export default function useWeather(geoLocation: GeoLocation, loadForecast = false): UseWeatherHookResult {
  const { unitsSystem } = useUnitsSystem();

  const currentConditionsInput = geoLocation ? { location: { latitude: geoLocation.latitude ?? 0, longitude: geoLocation.longitude ?? 0 }, unitsSystem } : null;
  const forecastInput = loadForecast ? { location: { latitude: geoLocation.latitude ?? 0, longitude: geoLocation.longitude ?? 0 }, days: 4, unitsSystem } : null;

  const { data: currentConditions, isError: isCurrentConditionsError, isLoading: isCurrentConditionsLoading } = useCurrentConditions(currentConditionsInput);
  const { data: location, isLoading: isLocationLoading } = useReverseGeocode(geoLocation?.latitude, geoLocation?.longitude);
  const { data: forecasts, isLoading: isForecastsLoading } = useDailyForecast(loadForecast ? forecastInput : null);

  const isLoading = isCurrentConditionsLoading || isLocationLoading;

  return {
    currentConditions: currentConditions ?? null,
    location: location ?? null,
    isLoading,
    isCurrentConditionsLoading,
    isLocationLoading,
    isForecastsLoading,
    isCurrentConditionsError,
    forecasts: forecasts ?? null,
  };
}
