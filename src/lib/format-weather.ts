import type { WeatherCondition } from "@/types/api/google-weather";

export const formatTemperature = (temperature: number | undefined) => {
  return temperature ? `${Math.round(temperature)}°` : "";
};

export const formatWeatherConditionImage = (weatherCondition: WeatherCondition | undefined) => {
  if (!weatherCondition) {
    return "";
  }
  return `${weatherCondition.iconBaseUri}.svg`;
};
