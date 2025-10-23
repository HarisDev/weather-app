import { WEATHER_CONDITION_STYLES } from "@/constants/colors";
import { useCurrentWeather } from "@/contexts/CurrentWeatherContext";
import { useEffect, useState } from "react";

export default function Container({ children }: { children: React.ReactNode }) {
  const { currentWeatherType } = useCurrentWeather();

  const [bgColor, setBgColor] = useState("from-sky-700 to-slate-300");

  useEffect(() => {
    if (currentWeatherType) {
      setBgColor(WEATHER_CONDITION_STYLES[currentWeatherType as keyof typeof WEATHER_CONDITION_STYLES]?.primary);
    }
  }, [currentWeatherType]);

  return (
    <div className={`min-h-screen bg-gradient-to-b ${bgColor} transition-all duration-700 ease-in-out`}>
      <div className="text-center max-w-5xl py-10 mx-auto px-5 gap-10 flex flex-col min-h-screen justify-between">{children}</div>
    </div>
  );
}
