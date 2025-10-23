import { PersonStanding, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import Search from "./search/search";

export default function Header() {
  return (
    <header>
      <div className="flex flex-col items-center gap-4 md:flex-row justify-between">
        <span className="text-2xl font-bold text-white">CleanWeather</span>
        <div className="flex flex-row justify-between gap-3">
          <Search />

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
