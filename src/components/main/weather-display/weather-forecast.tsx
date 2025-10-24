import { formatDate } from "@/lib/format-date";
import { formatTemperature, formatWeatherConditionImage } from "@/lib/format-weather";
import type { UseWeatherHookResult } from "@/types/hooks/use-weather";
import { Skeleton } from "@/components/ui/skeleton";

export default function WeatherForecast({ weather }: { weather: UseWeatherHookResult }) {
  const { forecasts, isForecastsLoading } = weather;

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2  text-white" aria-label="Weather forecast">
      {isForecastsLoading ? (
        <>
          {[...Array(4)].map((_, index) => (
            <div key={index} className="flex rounded-md py-2 px-3 flex-row justify-center items-center gap-2" role="status" aria-label="Loading forecast data">
              <Skeleton className="w-8 h-8 rounded-md bg-white/10" />
              <Skeleton className="w-11 h-10 rounded-md bg-white/10" />
              <div className="flex flex-col justify-center items-start gap-1">
                <Skeleton className="w-20 h-4 rounded-md bg-white/10" />
                <Skeleton className="w-24 h-4 rounded-md bg-white/10" />
              </div>
            </div>
          ))}
        </>
      ) : (
        forecasts?.forecastDays?.map((forecast) => (
          <article
            key={forecast.interval.startTime}
            className="flex rounded-md py-2 px-3 flex-row justify-center items-center gap-2"
            aria-label={`Forecast for ${formatDate(forecast.interval.startTime)}: ${forecast.daytimeForecast?.weatherCondition?.description?.text}, high of ${formatTemperature(forecast.maxTemperature.degrees)}`}
          >
            <img src={formatWeatherConditionImage(forecast.daytimeForecast?.weatherCondition)} alt="" aria-hidden="true" className="w-8 h-8" />
            <span className="text-4xl" aria-label={`High temperature: ${formatTemperature(forecast.maxTemperature.degrees)}`}>
              {formatTemperature(forecast.maxTemperature.degrees)}
            </span>
            <div className="flex flex-col justify-center items-start">
              <span className="text-sm">{formatDate(forecast.interval.startTime)}</span>
              <span className="text-sm">{forecast.daytimeForecast?.weatherCondition?.description?.text}</span>
            </div>
          </article>
        ))
      )}
    </section>
  );
}
