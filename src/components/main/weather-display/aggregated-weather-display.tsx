import useWeather from "@/hooks/use-weather";
import type { GeoLocation } from "@/types/geolocation";
import WeatherHero from "./weather-hero";
import WeatherForecast from "./weather-forecast";

export default function AggregatedWeatherDisplay({ geoLocation }: { geoLocation: GeoLocation }) {
  const weather = useWeather(geoLocation, true);

  return (
    <>
      <WeatherHero weather={weather} />
      <WeatherForecast weather={weather} />
    </>
  );
}
