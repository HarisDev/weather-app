import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getCurrentConditions, getDailyForecast } from "./client";
import type { CurrentConditions, CurrentConditionsInput, DailyForecastResponse, ForecastInput } from "@/types/api/google-weather";

/**
 * Hook to get current weather conditions for a location.
 * @param input - The location and optional unit system.
 * @param enabled - Whether the query is enabled.
 * @returns The current weather conditions.
 */
export function useCurrentConditions(input: CurrentConditionsInput | null, enabled = true) {
  return useQuery<CurrentConditions>({
    queryKey: ["current-conditions", input],
    queryFn: () => getCurrentConditions(input!),
    enabled: enabled && !!input && !!input.location,
    staleTime: 1000 * 60 * 5, // 5 minutes
    placeholderData: keepPreviousData,
  });
}

/**
 * Hook to get daily weather forecast for a location.
 * @param input - The location, optional number of days, and optional unit system.
 * @param enabled - Whether the query is enabled.
 * @returns The daily weather forecast.
 */
export function useDailyForecast(input: ForecastInput | null, enabled = true) {
  return useQuery<DailyForecastResponse>({
    queryKey: ["daily-forecast", input],
    queryFn: () => getDailyForecast(input!),
    enabled: enabled && !!input && !!input.location,
    staleTime: 1000 * 60 * 10, // 10 minutes
    placeholderData: keepPreviousData,
  });
}
