import { useState, useEffect } from "react";
import { getRecentSearches } from "@/lib/recent-searches";
import RecentSearchItem from "./recent-searches/item";

export default function RecentSearches() {
  const [searches, setSearches] = useState(getRecentSearches());

  useEffect(() => {
    // Update searches when recent searches are updated
    const handleRecentSearchesUpdate = () => {
      setSearches(getRecentSearches());
    };

    window.addEventListener("recentSearchesUpdated", handleRecentSearchesUpdate);
    return () => window.removeEventListener("recentSearchesUpdated", handleRecentSearchesUpdate);
  }, []);

  return (
    <section className="text-left" aria-label="Recent searches">
      {searches.length > 0 && (
        <>
          <h2 className="text-white text-lg font-bold text-shadow-md">Recent Searches</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mt-4" role="list">
            {searches.map((search) => (
              <RecentSearchItem key={search.name} name={search.name} latitude={search.location.latitude} longitude={search.location.longitude} />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
