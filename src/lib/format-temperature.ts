export const formatTemperature = (temperature: number | undefined) => {
  return temperature ? `${Math.round(temperature)}°` : "";
};
