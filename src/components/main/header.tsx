import { PersonStanding } from "lucide-react";
import { Button } from "@/components/ui/button";
import Search from "./search/search";
import UnitSettings from "./settings/unit";
import { toggleAccessibilityWidget } from "@/lib/accessibility";

export default function Header() {
  return (
    <header role="banner">
      <div className="flex flex-col items-center gap-4 md:flex-row justify-between">
        <h1 className="text-2xl font-bold text-white">CleanWeather</h1>
        <nav aria-label="Main navigation" className="flex flex-row justify-between gap-3">
          <Search />

          <UnitSettings />

          <Button variant="outline" onClick={toggleAccessibilityWidget} className="bg-white text-black cursor-pointer" aria-label="Toggle accessibility settings">
            <PersonStanding />
          </Button>
        </nav>
      </div>
    </header>
  );
}
