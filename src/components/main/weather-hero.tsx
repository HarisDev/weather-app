import { useCurrentConditions } from "@/api/google-weather/hooks";
import { formatTemperature } from "@/lib/format-temperature";
import type { GeoLocation } from "@/types/geolocation";
import { Navigation } from "lucide-react";

export default function WeatherHero({ geoLocation }: { geoLocation: GeoLocation }) {
  const currentConditionsInput = geoLocation ? { location: { latitude: geoLocation.latitude ?? 0, longitude: geoLocation.longitude ?? 0 } } : null;
  const { data: currentConditions } = useCurrentConditions(currentConditionsInput);

  return (
    <div className="flex flex-row justify-center items-center gap-2  backdrop-blur-sm rounded-md p-4 text-white">
      <img src="/assets/icons/snowy.svg" alt="Weather" className="w-16 h-16" />
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-row justify-center items-center gap-2">
          <Navigation className="w-3 h-3 fill-white" />
          <span>New York</span>
        </div>
        <span className="text-8xl ">{formatTemperature(currentConditions?.temperature?.degrees)}</span>
        <span className="text-sm">
          {currentConditions?.weatherCondition?.description?.text}, Real Feel {formatTemperature(currentConditions?.feelsLikeTemperature?.degrees ?? 0)}
        </span>
      </div>
    </div>
  );
}
