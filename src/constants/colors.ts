/**
 * The styles for the weather conditions
 */
const WEATHER_STYLES = {
  SUNNY: { primary: "from-sky-800 to-sky-300", secondary: "bg-sky-700/30" },
  PARTLY_CLOUDY: { primary: "from-sky-700 to-slate-300", secondary: "bg-sky-700/30" },
  CLOUDY: { primary: "from-sky-900 to-slate-300", secondary: "bg-sky-700/30" },
  WINDY: { primary: "from-sky-700 to-slate-300", secondary: "bg-sky-700/30" },
  LIGHT_RAIN: { primary: "from-slate-700 to-slate-300", secondary: "bg-slate-700/30" },
  HEAVY_RAIN: { primary: "from-slate-800 to-slate-400", secondary: "bg-slate-700/30" },
  LIGHT_SNOW: { primary: "from-blue-900 to-slate-300", secondary: "bg-slate-500/30" },
  HEAVY_SNOW: { primary: "from-blue-950 to-slate-400", secondary: "bg-slate-500/30" },
  RAIN_AND_SNOW: { primary: "from-slate-800 to-slate-300", secondary: "bg-slate-600/30" },
  HAIL: { primary: "from-gray-800 to-slate-300", secondary: "bg-slate-600/30" },
  THUNDERSTORM: { primary: "from-gray-900 to-gray-600", secondary: "bg-slate-500/30" },
};

/**
 * The background colors for the weather conditions
 * Primary colors are for background color
 * Secondary colors are for small card background color
 * @returns The background colors for the weather conditions
 * @see https://developers.google.com/maps/documentation/weather/reference/rest/v1/WeatherCondition#Type
 */
export const WEATHER_CONDITION_STYLES = {
  TYPE_UNSPECIFIED: WEATHER_STYLES.PARTLY_CLOUDY, // Clear/Sunny conditions
  CLEAR: WEATHER_STYLES.SUNNY,
  MOSTLY_CLEAR: WEATHER_STYLES.SUNNY, // Partly cloudy conditions
  PARTLY_CLOUDY: WEATHER_STYLES.PARTLY_CLOUDY, // Cloudy conditions
  MOSTLY_CLOUDY: WEATHER_STYLES.CLOUDY,
  CLOUDY: WEATHER_STYLES.CLOUDY, // Windy conditions
  WINDY: WEATHER_STYLES.WINDY,
  WIND_AND_RAIN: WEATHER_STYLES.LIGHT_RAIN, // Light rain conditions
  LIGHT_RAIN_SHOWERS: WEATHER_STYLES.LIGHT_RAIN,
  CHANCE_OF_SHOWERS: WEATHER_STYLES.LIGHT_RAIN,
  SCATTERED_SHOWERS: WEATHER_STYLES.LIGHT_RAIN,
  RAIN_SHOWERS: WEATHER_STYLES.LIGHT_RAIN,
  LIGHT_RAIN: WEATHER_STYLES.LIGHT_RAIN,
  LIGHT_TO_MODERATE_RAIN: WEATHER_STYLES.LIGHT_RAIN,
  RAIN: WEATHER_STYLES.LIGHT_RAIN, // Heavy rain conditions
  HEAVY_RAIN_SHOWERS: WEATHER_STYLES.HEAVY_RAIN,
  MODERATE_TO_HEAVY_RAIN: WEATHER_STYLES.HEAVY_RAIN,
  HEAVY_RAIN: WEATHER_STYLES.HEAVY_RAIN,
  RAIN_PERIODICALLY_HEAVY: WEATHER_STYLES.HEAVY_RAIN, // Snow conditions
  LIGHT_SNOW_SHOWERS: WEATHER_STYLES.LIGHT_SNOW,
  CHANCE_OF_SNOW_SHOWERS: WEATHER_STYLES.LIGHT_SNOW,
  SCATTERED_SNOW_SHOWERS: WEATHER_STYLES.LIGHT_SNOW,
  SNOW_SHOWERS: WEATHER_STYLES.LIGHT_SNOW,
  LIGHT_SNOW: WEATHER_STYLES.LIGHT_SNOW,
  LIGHT_TO_MODERATE_SNOW: WEATHER_STYLES.LIGHT_SNOW,
  SNOW: WEATHER_STYLES.LIGHT_SNOW, // Heavy snow conditions
  HEAVY_SNOW_SHOWERS: WEATHER_STYLES.HEAVY_SNOW,
  MODERATE_TO_HEAVY_SNOW: WEATHER_STYLES.HEAVY_SNOW,
  HEAVY_SNOW: WEATHER_STYLES.HEAVY_SNOW,
  SNOWSTORM: WEATHER_STYLES.HEAVY_SNOW,
  SNOW_PERIODICALLY_HEAVY: WEATHER_STYLES.HEAVY_SNOW,
  HEAVY_SNOW_STORM: WEATHER_STYLES.HEAVY_SNOW,
  BLOWING_SNOW: WEATHER_STYLES.HEAVY_SNOW, // Mixed conditions
  RAIN_AND_SNOW: WEATHER_STYLES.RAIN_AND_SNOW, // Hail conditions
  HAIL: WEATHER_STYLES.HAIL,
  HAIL_SHOWERS: WEATHER_STYLES.HAIL, // Thunderstorm conditions
  THUNDERSTORM: WEATHER_STYLES.THUNDERSTORM,
  THUNDERSHOWER: WEATHER_STYLES.THUNDERSTORM,
  LIGHT_THUNDERSTORM_RAIN: WEATHER_STYLES.THUNDERSTORM,
  SCATTERED_THUNDERSTORMS: WEATHER_STYLES.THUNDERSTORM,
  HEAVY_THUNDERSTORM: WEATHER_STYLES.THUNDERSTORM,
};
