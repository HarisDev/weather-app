import type { GeoLocation } from "@/types/geolocation";
import {
  TIMEZONE_TO_COORDINATES,
  DEFAULT_LOCATION,
  REGIONAL_FALLBACKS,
} from "@/constants/timezone-coordinates";

/**
 * Get approximate geolocation based on browser timezone.
 * This is more accurate than language-based approximation as timezones
 * have a stronger correlation to geographical location.
 *
 * @returns GeoLocation object with approximate coordinates based on timezone
 */
export function getTimezoneBasedLocation(): GeoLocation {
  try {
    // Get the user's timezone using the Intl API
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    // Try exact match first
    if (TIMEZONE_TO_COORDINATES[timezone]) {
      return TIMEZONE_TO_COORDINATES[timezone];
    }

    // Try to match by region (e.g., America/Unknown -> use America/New_York)
    const region = timezone.split('/')[0];
    const fallbackTimezone = REGIONAL_FALLBACKS[region];

    if (fallbackTimezone && TIMEZONE_TO_COORDINATES[fallbackTimezone]) {
      return TIMEZONE_TO_COORDINATES[fallbackTimezone];
    }
  } catch (error) {
    console.error('Error getting timezone:', error);
  }

  // Return default location if timezone detection fails
  return DEFAULT_LOCATION;
}
