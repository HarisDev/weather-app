import { createFileRoute } from "@tanstack/react-router";
import Container from "@/components/main/container";
import Header from "@/components/main/header";
import WeatherHero from "@/components/main/weather-hero";
import WeatherForecast from "@/components/main/weather-forecast";
import RecentSearches from "@/components/main/recent-searches";
import useGeoLocation from "@/hooks/use-geo-location";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  const geoLocation = useGeoLocation();

  return (
    <Container>
      <Header />

      <main className="max-w-5xl py-10">
        <div className="flex flex-col justify-between gap-10 md:gap-20">
          <WeatherHero geoLocation={geoLocation} />
          <WeatherForecast />
        </div>
      </main>

      <RecentSearches />
    </Container>
  );
}
