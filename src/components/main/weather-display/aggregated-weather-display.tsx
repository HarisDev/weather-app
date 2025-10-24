import useWeather from "@/hooks/use-weather";
import type { GeoLocation } from "@/types/geolocation";
import WeatherHero from "./weather-hero";
import WeatherForecast from "./weather-forecast";
import { useEffect } from "react";
import { useCurrentWeather } from "@/contexts/CurrentWeatherContext";

export default function AggregatedWeatherDisplay({ geoLocation }: { geoLocation: GeoLocation }) {
  const weather = useWeather(geoLocation, true);
  const { setCurrentWeatherType } = useCurrentWeather();

  useEffect(() => {
    if (weather.currentConditions) {
      // Propagate the current weather type to the context so we can change the bg color.
      setCurrentWeatherType(weather.currentConditions.weatherCondition.type);
    }
  }, [weather.currentConditions, setCurrentWeatherType]);

  return (
    <>
      <WeatherHero weather={weather} />
      <WeatherForecast weather={weather} />
    </>
  );
}
