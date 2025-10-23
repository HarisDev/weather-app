import type { ReverseGeocodeResponse } from "../api/google-geocoding";
import type { CurrentConditions, DailyForecastResponse } from "../api/google-weather";

export type UseWeatherHookResult = {
  currentConditions: CurrentConditions | null;
  location: ReverseGeocodeResponse | null;
  forecasts: DailyForecastResponse | null;
  isLoading: boolean;
  isCurrentConditionsLoading: boolean;
  isLocationLoading: boolean;
  isForecastsLoading: boolean;
  isCurrentConditionsError: boolean;
};
