import { InputGroup, InputGroupInput, InputGroupAddon } from "@/components/ui/input-group";
import { PersonStanding, Search, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

// sunny - from-sky-800 to-sky-300 -> bg-sky-700/30
// partly-cloudy - from-sky-700 to-slate-300 -> bg-sky-700/30
// cloudy - from-sky-900 to-slate-300 -> bg-sky-700/30
// rainy - from-slate-700 to-slate-300 -> bg-slate-700/30
// rain-thunder - from-gray-900 to-gray-600 -> bg-slate-500/30
// snowy - from-blue-900 to-slate-300 -> bg-slate-500/30

export default function Header() {
  return (
    <header>
      <div className="flex flex-col items-center gap-4 md:flex-row justify-between">
        <span className="text-2xl font-bold text-white">CleanWeather</span>
        <div className="flex flex-row justify-between gap-3">
          <InputGroup className="bg-white backdrop-blur-sm sm:w-xs">
            <InputGroupInput placeholder="Search for a place..." />
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
          </InputGroup>

          <Button variant="outline" className="bg-white text-black">
            <Settings />
          </Button>

          <Button variant="outline" className="bg-white text-black">
            <PersonStanding />
          </Button>
        </div>
      </div>
    </header>
  );
}
