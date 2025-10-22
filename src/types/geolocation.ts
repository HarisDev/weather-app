export type GeoLocation = {
  latitude?: number;
  longitude?: number;
};

export enum GeoLocationStatus {
  Loading = "loading",
  Error = "error",
  Success = "success",
}
