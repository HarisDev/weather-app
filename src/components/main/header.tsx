import { PersonStanding } from "lucide-react";
import { Button } from "@/components/ui/button";
import Search from "./search/search";
import UnitSettings from "./settings/unit";
import { toggleAccessibilityWidget } from "@/lib/accessibility";
import { ButtonGroup } from "../ui/button-group";
import UsePreciseLocation from "./settings/use-precise-location";
import type { UseGeoLocationResult } from "@/hooks/use-geo-location";

export default function Header({ deviceGeoLocation }: { deviceGeoLocation: UseGeoLocationResult }) {
  return (
    <header role="banner">
      <div className="flex flex-col gap-4 md:flex-row justify-between">
        <h1 className="text-2xl font-bold text-white w-full text-center md:text-left">CleanWeather</h1>
        <nav aria-label="Main navigation" className="flex flex-col-reverse sm:flex-row gap-3 w-full">
          <Search />

          <div className="flex flex-row gap-3 justify-between sm:justify-start">
            <UsePreciseLocation deviceGeoLocation={deviceGeoLocation} />
            <ButtonGroup aria-label="Button group">
              <UnitSettings />

              <Button size="lg" variant="outline" onClick={toggleAccessibilityWidget} className="bg-white text-black cursor-pointer" aria-label="Toggle accessibility settings">
                <PersonStanding />
              </Button>
            </ButtonGroup>
          </div>
        </nav>
      </div>
    </header>
  );
}
