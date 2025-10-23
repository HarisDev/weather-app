import { createContext, useContext, useState, type ReactNode, useCallback } from "react";
import type { GeoLocation } from "@/types/geolocation";
import { addRecentSearch } from "@/lib/recent-searches";

interface SelectedPlace {
  name: string;
  location: GeoLocation;
}

interface CurrentWeatherContextType {
  selectedPlace: SelectedPlace | null;
  setSelectedPlace: (place: SelectedPlace | null, saveToRecentSearches?: boolean) => void;
  currentWeatherType: string | null;
  setCurrentWeatherType: (type: string) => void;
}

const CurrentWeatherContext = createContext<CurrentWeatherContextType | undefined>(undefined);

export function CurrentWeatherProvider({ children }: { children: ReactNode }) {
  const [selectedPlace, setSelectedPlaceState] = useState<SelectedPlace | null>(null);
  const [currentWeatherType, setCurrentWeatherType] = useState<string | null>(null);

  const setSelectedPlace = useCallback((place: SelectedPlace | null, saveToRecentSearches = true) => {
    setSelectedPlaceState(place);

    // Save to localStorage if a place is selected
    if (place && saveToRecentSearches) {
      addRecentSearch({
        name: place.name,
        location: place.location,
      });
    }
  }, []);

  return <CurrentWeatherContext.Provider value={{ selectedPlace, setSelectedPlace, currentWeatherType, setCurrentWeatherType }}>{children}</CurrentWeatherContext.Provider>;
}

export function useCurrentWeather() {
  const context = useContext(CurrentWeatherContext);
  if (context === undefined) {
    throw new Error("useCurrentWeather must be used within a CurrentWeatherProvider");
  }
  return context;
}
