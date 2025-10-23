import { useQuery } from "@tanstack/react-query";
import { getCurrentConditions } from "./client";
import type { CurrentConditions, CurrentConditionsInput } from "@/types/api/google-weather";

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
  });
}
