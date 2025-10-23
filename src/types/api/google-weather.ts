export interface LatLng {
  latitude: number;
  longitude: number;
}

export interface Temperature {
  degrees: number;
  unit: string;
}

export interface LocalizedText {
  text: string;
  languageCode: string;
}

export interface WeatherCondition {
  iconBaseUri: string;
  description: LocalizedText;
  type: string;
}

export interface CurrentConditions {
  weatherCondition: WeatherCondition;
  temperature: Temperature;
}

export interface CurrentConditionsInput {
  location: LatLng;
  unitsSystem?: "METRIC" | "IMPERIAL";
}
