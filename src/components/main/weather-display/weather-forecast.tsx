import { formatDate } from "@/lib/format-date";
import { formatTemperature, formatWeatherConditionImage } from "@/lib/format-weather";
import type { UseWeatherHookResult } from "@/types/hooks/use-weather";

export default function WeatherForecast({ weather }: { weather: UseWeatherHookResult }) {
  const { forecasts } = weather;

  console.log(forecasts);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2  text-white">
      {forecasts?.forecastDays.map((forecast) => (
        <div className="flex rounded-md py-2 px-3 flex-row justify-center items-center gap-2">
          <img src={formatWeatherConditionImage(forecast.daytimeForecast?.weatherCondition)} alt={forecast.daytimeForecast?.weatherCondition?.description?.text} className="w-8 h-8" />
          <span className="text-4xl">{formatTemperature(forecast.maxTemperature.degrees)}</span>
          <div className="flex flex-col justify-center items-start">
            <span className="text-sm">{formatDate(forecast.interval.startTime)}</span>
            <span className="text-sm">{forecast.daytimeForecast?.weatherCondition?.description?.text}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
