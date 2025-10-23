import { PersonStanding } from "lucide-react";
import { Button } from "@/components/ui/button";
import Search from "./search/search";
import UnitSettings from "./settings/unit";

export default function Header() {
  return (
    <header role="banner">
      <div className="flex flex-col items-center gap-4 md:flex-row justify-between">
        <h1 className="text-2xl font-bold text-white">CleanWeather</h1>
        <nav aria-label="Main navigation" className="flex flex-row justify-between gap-3">
          <Search />

          <UnitSettings />

          <Button variant="outline" className="bg-white text-black" aria-label="User profile">
            <PersonStanding />
          </Button>
        </nav>
      </div>
    </header>
  );
}
