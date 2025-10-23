import { MapPin } from "lucide-react";
import type { Suggestion } from "@/types/api/google-places";
import { usePlaceDetails } from "@/api/google-places/hooks";
import { useCurrentConditions } from "@/api/google-weather/hooks";
import { Skeleton } from "@/components/ui/skeleton";
import { formatTemperature } from "@/lib/format-weather";
import { useCurrentWeather } from "@/contexts/CurrentWeatherContext";

export default function Suggestion({ suggestion, handleClose }: { suggestion: Suggestion; handleClose: () => void }) {
  const prediction = suggestion.placePrediction;
  const { setSelectedPlace } = useCurrentWeather();

  const { data: placeDetails } = usePlaceDetails(prediction?.placeId);
  const { data: weatherData, isFetching: isWeatherFetching } = useCurrentConditions(placeDetails?.location ? { location: placeDetails.location, unitsSystem: "METRIC" } : null);

  const handleClick = () => {
    if (placeDetails?.location && prediction?.structuredFormat?.mainText?.text) {
      setSelectedPlace({
        name: prediction.structuredFormat.mainText.text,
        location: placeDetails.location,
      });
      handleClose();
    }
  };

  return (
    <div className="px-4 py-4 cursor-pointer hover:bg-gray-100 border-b border-gray-100 last:border-b-0" onClick={handleClick}>
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0 items-start align-left">
            <div className="text-sm font-medium text-gray-900 truncate text-left">{prediction?.structuredFormat?.mainText?.text}</div>
            <div className="text-xs text-gray-500 truncate text-left">{prediction?.structuredFormat?.secondaryText?.text}</div>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0 relative w-16">
          {isWeatherFetching && (
            <div className="flex items-center gap-2 absolute inset-0 transition-opacity duration-300 ease-in-out">
              <Skeleton className="w-6 h-6 rounded-md" />
              <Skeleton className="w-6 h-4 rounded-md" />
            </div>
          )}
          {weatherData && (
            <div className="flex items-center gap-2 absolute inset-0 transition-opacity duration-300 ease-in-out animate-in fade-in">
              <img alt={weatherData.weatherCondition.description.text} className="w-6 h-6" src={`${weatherData.weatherCondition.iconBaseUri}.svg`} />
              <span className="text-sm font-semibold text-gray-700">{formatTemperature(weatherData.temperature.degrees)}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
