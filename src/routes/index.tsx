import { createFileRoute } from "@tanstack/react-router";
import Container from "@/components/main/container";
import Header from "@/components/main/header";
import RecentSearches from "@/components/main/recent-searches";
import useGeoLocation from "@/hooks/use-geo-location";
import AggregatedWeatherDisplay from "@/components/main/weather-display/aggregated-weather-display";
import { useCurrentWeather } from "@/contexts/CurrentWeatherContext";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  const deviceGeoLocation = useGeoLocation();
  const { selectedPlace } = useCurrentWeather();

  // Use selected place location if available, otherwise fall back to device location
  const geoLocation = selectedPlace?.location
    ? {
        latitude: selectedPlace.location.latitude ?? 0,
        longitude: selectedPlace.location.longitude ?? 0,
        status: deviceGeoLocation.status,
      }
    : deviceGeoLocation;

  return (
    <Container>
      <Header />

      <main className="max-w-5xl py-10">
        <div className="flex flex-col justify-between gap-10 md:gap-20">
          <AggregatedWeatherDisplay geoLocation={geoLocation} />
        </div>
      </main>

      <RecentSearches />
    </Container>
  );
}
