import { formatTemperature, formatWeatherConditionImage } from "@/lib/format-weather";
import type { GeoLocation } from "@/types/geolocation";
import { Navigation } from "lucide-react";
import { Spinner } from "../ui/spinner";
import useWeather from "@/hooks/use-weather";

export default function WeatherHero({ geoLocation }: { geoLocation: GeoLocation }) {
  const { currentConditions, location, isLoading } = useWeather(geoLocation);

  return (
    <div className="flex flex-row h-[150px] justify-center items-center gap-2  backdrop-blur-sm rounded-md p-4 text-white">
      {isLoading ? (
        <div className="flex items-center justify-center gap-2 w-full h-full my-5">
          <Spinner className="w-24 h-24 rounded-md" />
        </div>
      ) : (
        <>
          {currentConditions && <img src={formatWeatherConditionImage(currentConditions.weatherCondition)} alt={currentConditions?.weatherCondition?.description?.text} className="w-16 h-16" />}

          <div className="flex flex-col justify-center items-center">
            <div className="flex flex-row justify-center items-center gap-2">
              <Navigation className="w-3 h-3 fill-white" />
              <span>{location?.city}</span>
            </div>
            <span className="text-8xl ">{formatTemperature(currentConditions?.temperature?.degrees)}</span>
            <span className="text-sm">
              {currentConditions?.weatherCondition?.description?.text}, Real Feel {formatTemperature(currentConditions?.feelsLikeTemperature?.degrees ?? 0)}
            </span>
          </div>
        </>
      )}
    </div>
  );
}
