import { describe, it, expect, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import useWeather from "@/hooks/use-weather";
import * as googleGeocodingHooks from "@/api/google-geocoding/hooks";
import * as googleWeatherHooks from "@/api/google-weather/hooks";
import * as UnitsSystemContext from "@/contexts/UnitsSystemContext";
import type { CurrentConditions, DailyForecastResponse } from "@/types/api/google-weather";
import type { UseQueryResult } from "@tanstack/react-query";
import type { ReverseGeocodeResponse } from "@/types/api/google-geocoding";

vi.mock("@/api/google-geocoding/hooks");
vi.mock("@/api/google-weather/hooks");
vi.mock("@/contexts/UnitsSystemContext");

describe("useWeather", () => {
  it("should return default values when location is provided", () => {
    vi.mocked(UnitsSystemContext.useUnitsSystem).mockReturnValue({ unitsSystem: "METRIC", setUnitsSystem: vi.fn() });
    vi.mocked(googleWeatherHooks.useCurrentConditions).mockReturnValue({ data: null, isError: false, isLoading: false } as unknown as UseQueryResult<CurrentConditions>);
    vi.mocked(googleGeocodingHooks.useReverseGeocode).mockReturnValue({ data: null, isLoading: false } as unknown as UseQueryResult<ReverseGeocodeResponse>);
    vi.mocked(googleWeatherHooks.useDailyForecast).mockReturnValue({ data: null, isLoading: false } as unknown as UseQueryResult<DailyForecastResponse>);

    const { result } = renderHook(() => useWeather({ latitude: 40.7, longitude: -74.0 }));

    expect(result.current.currentConditions).toBe(null);
    expect(result.current.location).toBe(null);
    expect(result.current.isLoading).toBe(false);
  });

  it("should handle loading state correctly", () => {
    vi.mocked(UnitsSystemContext.useUnitsSystem).mockReturnValue({ unitsSystem: "METRIC", setUnitsSystem: vi.fn() });
    vi.mocked(googleWeatherHooks.useCurrentConditions).mockReturnValue({ data: null, isError: false, isLoading: true } as unknown as UseQueryResult<CurrentConditions>);
    vi.mocked(googleGeocodingHooks.useReverseGeocode).mockReturnValue({ data: null, isLoading: false } as unknown as UseQueryResult<ReverseGeocodeResponse>);
    vi.mocked(googleWeatherHooks.useDailyForecast).mockReturnValue({ data: null, isLoading: false } as unknown as UseQueryResult<DailyForecastResponse>);

    const { result } = renderHook(() => useWeather({ latitude: 40.7, longitude: -74.0 }));

    expect(result.current.isLoading).toBe(true);
  });

  it("should load forecast when loadForecast is true", () => {
    vi.mocked(UnitsSystemContext.useUnitsSystem).mockReturnValue({ unitsSystem: "METRIC", setUnitsSystem: vi.fn() });
    vi.mocked(googleWeatherHooks.useCurrentConditions).mockReturnValue({ data: null, isError: false, isLoading: false } as unknown as UseQueryResult<CurrentConditions>);
    vi.mocked(googleGeocodingHooks.useReverseGeocode).mockReturnValue({ data: null, isLoading: false } as unknown as UseQueryResult<ReverseGeocodeResponse>);
    vi.mocked(googleWeatherHooks.useDailyForecast).mockReturnValue({ data: null, isLoading: false } as unknown as UseQueryResult<DailyForecastResponse>);

    renderHook(() => useWeather({ latitude: 40.7, longitude: -74.0 }, true));

    expect(googleWeatherHooks.useDailyForecast).toHaveBeenCalledWith({
      location: { latitude: 40.7, longitude: -74.0 },
      days: 4,
      unitsSystem: "METRIC",
    });
  });
});
