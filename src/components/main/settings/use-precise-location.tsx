import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

import { Navigation, CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";
import type { UseGeoLocationResult } from "@/hooks/use-geo-location";
import { getBrowserGeolocation } from "@/lib/browser-geolocation";
import { cn } from "@/lib/utils";

export default function UsePreciseLocation({ deviceGeoLocation }: { deviceGeoLocation: UseGeoLocationResult }) {
  const [isTooltipOpen, setIsTooltipOpen] = useState(true);
  const [showCheckmark, setShowCheckmark] = useState(false);

  const handleClick = () => {
    getBrowserGeolocation((position) =>
      deviceGeoLocation.setGeoLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      })
    );

    setShowCheckmark(true);
    setTimeout(() => {
      setShowCheckmark(false);
    }, 5000);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTooltipOpen(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Tooltip open={isTooltipOpen} onOpenChange={setIsTooltipOpen}>
      <TooltipTrigger asChild>
        <Button size="lg" variant="outline" onClick={handleClick} className={cn("bg-white text-black cursor-pointer")} aria-label="Toggle accessibility settings">
          {showCheckmark ? <CheckCircle /> : <Navigation />}
          <span className="sm:hidden">Use Precise Location</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent className="bg-white text-foreground hidden  md:block" arrowClassName="bg-white fill-white" side="bottom">
        {showCheckmark ? "Permission requested." : "Use Precise Location"}
      </TooltipContent>
    </Tooltip>
  );
}
