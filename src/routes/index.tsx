import { createFileRoute } from "@tanstack/react-router";
import Container from "@/components/main/container";
import Header from "@/components/main/header";
import WeatherHero from "@/components/main/weather-hero";
import WeatherForecast from "@/components/main/weather-forecast";
import RecentSearches from "@/components/main/recent-searches";
import useGeoLocation from "@/hooks/use-geo-location";
import { GeoLocationStatus } from "@/types/geolocation";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  const geoLocation = useGeoLocation();

  return (
    <Container>
      <Header />

      {geoLocation.status === GeoLocationStatus.Loading && <div>Loading...</div>}
      {geoLocation.status !== GeoLocationStatus.Loading && (
        <div>
          Longitude: {geoLocation?.longitude}, Latitude: {geoLocation?.latitude}
        </div>
      )}

      <main className="max-w-5xl py-10">
        <div className="flex flex-col justify-between gap-10 md:gap-20">
          <WeatherHero />
          <WeatherForecast />
        </div>
      </main>

      <RecentSearches />
    </Container>
  );
}
