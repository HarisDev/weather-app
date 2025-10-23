import { createContext, useContext, useState, ReactNode } from "react";
import type { GeoLocation } from "@/types/geolocation";

interface SelectedPlace {
  name: string;
  location: GeoLocation;
}

interface CurrentWeatherContextType {
  selectedPlace: SelectedPlace | null;
  setSelectedPlace: (place: SelectedPlace | null) => void;
}

const CurrentWeatherContext = createContext<CurrentWeatherContextType | undefined>(undefined);

export function CurrentWeatherProvider({ children }: { children: ReactNode }) {
  const [selectedPlace, setSelectedPlace] = useState<SelectedPlace | null>(null);

  return (
    <CurrentWeatherContext.Provider value={{ selectedPlace, setSelectedPlace }}>
      {children}
    </CurrentWeatherContext.Provider>
  );
}

export function useCurrentWeather() {
  const context = useContext(CurrentWeatherContext);
  if (context === undefined) {
    throw new Error("useCurrentWeather must be used within a CurrentWeatherProvider");
  }
  return context;
}
