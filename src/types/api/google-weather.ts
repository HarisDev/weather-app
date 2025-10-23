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
  feelsLikeTemperature: Temperature;
}

export interface CurrentConditionsInput {
  location: LatLng;
  unitsSystem?: "METRIC" | "IMPERIAL";
}

export interface ForecastDay {
  interval: {
    startTime: string;
    endTime: string;
  };
  displayDate: {
    year: number;
    month: number;
    day: number;
  };
  daytimeForecast?: {
    weatherCondition: WeatherCondition;
  };
  nighttimeForecast?: {
    weatherCondition: WeatherCondition;
  };
  maxTemperature: Temperature;
  minTemperature: Temperature;
}

export interface DailyForecastResponse {
  forecastDays: ForecastDay[];
  timeZone: string;
  nextPageToken?: string;
}

export interface ForecastInput {
  location: LatLng;
  days?: number;
  unitsSystem?: "METRIC" | "IMPERIAL";
}
