import { Item, ItemActions, ItemContent, ItemDescription, ItemTitle } from "@/components/ui/item";
import { useCurrentConditions } from "@/api/google-weather/hooks";
import { Skeleton } from "@/components/ui/skeleton";
import { formatTemperature } from "@/lib/format-weather";
import { useCurrentWeather } from "@/contexts/CurrentWeatherContext";
import { useEffect, useState } from "react";
import { WEATHER_CONDITION_STYLES } from "@/constants/colors";
import { useUnitsSystem } from "@/contexts/UnitsSystemContext";

export default function RecentSearchItem({ name, latitude, longitude }: { name: string; latitude?: number; longitude?: number }) {
  const [bgColor, setBgColor] = useState("bg-slate-500/30");
  const { unitsSystem } = useUnitsSystem();

  const { data: weatherData, isFetching } = useCurrentConditions(latitude && longitude ? { location: { latitude, longitude }, unitsSystem } : null);
  const { setSelectedPlace, currentWeatherType } = useCurrentWeather();

  const handleClick = () => {
    if (latitude && longitude) {
      setSelectedPlace(
        {
          name,
          location: { latitude, longitude },
        },
        false
      );
    }
  };

  useEffect(() => {
    if (currentWeatherType) {
      setBgColor(WEATHER_CONDITION_STYLES[currentWeatherType as keyof typeof WEATHER_CONDITION_STYLES]?.secondary);
    }
  }, [currentWeatherType]);

  return (
    <Item className={`${bgColor} cursor-pointer transition-colors`} onClick={handleClick}>
      <ItemContent>
        <ItemTitle className="text-white">{name}</ItemTitle>
        {isFetching ? (
          <Skeleton className="w-24 h-4 rounded-md bg-white/10" />
        ) : weatherData ? (
          <ItemDescription className="text-white">
            {weatherData.weatherCondition.description.text}, {formatTemperature(weatherData.temperature.degrees)}
          </ItemDescription>
        ) : (
          <ItemDescription className="text-white">-</ItemDescription>
        )}
      </ItemContent>
      <ItemActions>{isFetching ? <Skeleton className="w-8 h-8 rounded-md bg-white/10" /> : weatherData ? <img src={`${weatherData.weatherCondition.iconBaseUri}.svg`} alt={weatherData.weatherCondition.description.text} className="w-8 h-8" /> : null}</ItemActions>
    </Item>
  );
}
