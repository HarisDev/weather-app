import { describe, it, expect, vi } from "vitest";
import { getTimezoneBasedLocation } from "@/lib/timezone-geolocation";

describe("getTimezoneBasedLocation", () => {
  it("should return location for valid timezone", () => {
    vi.spyOn(Intl.DateTimeFormat.prototype, "resolvedOptions").mockReturnValue({
      timeZone: "America/New_York",
    } as Intl.ResolvedDateTimeFormatOptions);

    const result = getTimezoneBasedLocation();

    expect(result).toEqual({
      latitude: 40.7128,
      longitude: -74.006,
    });
  });

  it("should return regional fallback for unknown timezone", () => {
    vi.spyOn(Intl.DateTimeFormat.prototype, "resolvedOptions").mockReturnValue({
      timeZone: "America/Unknown",
    } as Intl.ResolvedDateTimeFormatOptions);

    const result = getTimezoneBasedLocation();

    expect(result.latitude).toBeDefined();
    expect(result.longitude).toBeDefined();
  });

  it("should return default location on error", () => {
    vi.spyOn(Intl.DateTimeFormat.prototype, "resolvedOptions").mockImplementation(() => {
      throw new Error("Test error");
    });

    const result = getTimezoneBasedLocation();

    expect(result).toEqual({
      latitude: 51.5074,
      longitude: -0.1278,
    });
  });
});
