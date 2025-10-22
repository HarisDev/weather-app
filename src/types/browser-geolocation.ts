export type BrowserGeolocationOptions = {
  enableHighAccuracy?: boolean;
  timeout?: number;
  maximumAge?: number;
};

export type BrowserGeolocationSuccessCallback = (position: GeolocationPosition) => void;
export type BrowserGeolocationErrorCallback = (error: GeolocationPositionError) => void;
