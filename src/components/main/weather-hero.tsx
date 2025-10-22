import { Navigation } from "lucide-react";

export default function WeatherHero() {
  return (
    <div className="flex flex-row justify-center items-center gap-2  backdrop-blur-sm rounded-md p-4 text-white">
      <img src="/assets/icons/snowy.svg" alt="Weather" className="w-16 h-16" />
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-row justify-center items-center gap-2">
          <Navigation className="w-3 h-3 fill-white" />
          <span>New York</span>
        </div>
        <span className="text-8xl ">105°</span>
        <span className="text-sm">Sunny, Real Feel 25°</span>
      </div>
    </div>
  );
}
