import type { BrowserGeolocationErrorCallback, BrowserGeolocationOptions, BrowserGeolocationSuccessCallback } from "@/types/browser-geolocation";

/**
 * Get the user's browser geolocation. Uses native JavaScript API.
 * @param onSuccess - Callback function to be called when the geolocation is successfully retrieved.
 * @param onError - Callback function to be called when the geolocation retrieval fails.
 * @param options - Options for the geolocation retrieval.
 * @param options.enableHighAccuracy - Whether to use high accuracy mode.
 * @param options.timeout - The timeout in milliseconds for the geolocation retrieval.
 * @param options.maximumAge - The maximum age in milliseconds of a cached position that is acceptable to return.
 */
export const getBrowserGeolocation = (
  onSuccess: BrowserGeolocationSuccessCallback,
  onError: BrowserGeolocationErrorCallback = () => {},
  options: BrowserGeolocationOptions = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  }
): void => {
  navigator.geolocation.watchPosition(onSuccess, onError, options);
};
