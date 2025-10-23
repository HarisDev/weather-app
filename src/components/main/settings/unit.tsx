import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useUnitsSystem } from "@/contexts/UnitsSystemContext";

export default function UnitSettings() {
  const { unitsSystem, setUnitsSystem } = useUnitsSystem();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="lg" variant="outline" className="bg-white text-black cursor-pointer" aria-label="Settings">
          <Settings />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" aria-label="Units system settings">
        <DropdownMenuLabel>Units System</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem checked={unitsSystem === "METRIC"} onCheckedChange={(checked) => checked && setUnitsSystem("METRIC")}>
          Metric (°C, km/h)
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem checked={unitsSystem === "IMPERIAL"} onCheckedChange={(checked) => checked && setUnitsSystem("IMPERIAL")}>
          Imperial (°F, mph)
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
