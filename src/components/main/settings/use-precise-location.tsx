import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

import { Navigation } from "lucide-react";
import { useEffect, useState } from "react";
import type { UseGeoLocationResult } from "@/hooks/use-geo-location";
import { getBrowserGeolocation } from "@/lib/browser-geolocation";
import { cn } from "@/lib/utils";

export default function UsePreciseLocation({ deviceGeoLocation }: { deviceGeoLocation: UseGeoLocationResult }) {
  const [isTooltipOpen, setIsTooltipOpen] = useState(true);

  const handleClick = () => {
    getBrowserGeolocation((position) =>
      deviceGeoLocation.setGeoLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      })
    );
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTooltipOpen(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Tooltip open={isTooltipOpen} onOpenChange={setIsTooltipOpen}>
      <TooltipTrigger>
        <Button size="lg" variant="outline" onClick={handleClick} className={cn("bg-white text-black cursor-pointer")} aria-label="Toggle accessibility settings">
          <Navigation />
        </Button>
      </TooltipTrigger>
      <TooltipContent className="bg-white text-foreground" arrowClassName="bg-white fill-white" side="bottom">
        Use Precise Location
      </TooltipContent>
    </Tooltip>
  );
}
