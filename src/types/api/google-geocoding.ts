export interface ReverseGeocodeResponse {
  city?: string;
  country?: string;
}

export interface AddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}
