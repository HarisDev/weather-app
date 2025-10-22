import { Item, ItemActions, ItemContent, ItemDescription, ItemTitle } from "../ui/item";

export default function RecentSearches() {
  return (
    <div className="text-left">
      <span className="text-white text-lg font-bold text-shadow-md">Recent Searches</span>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mt-4">
        <Item className="bg-slate-500/30">
          <ItemContent>
            <ItemTitle className="text-white">Oslo</ItemTitle>
            <ItemDescription className="text-white">Sunny, 27°</ItemDescription>
          </ItemContent>
          <ItemActions>
            <img src="/assets/icons/sunny.svg" alt="Weather" className="w-8 h-8" />
          </ItemActions>
        </Item>

        <Item className="bg-slate-500/30">
          <ItemContent>
            <ItemTitle className="text-white">Sarajevo</ItemTitle>
            <ItemDescription className="text-white">Thunderstorms, 22°</ItemDescription>
          </ItemContent>
          <ItemActions>
            <img src="/assets/icons/rainy.svg" alt="Weather" className="w-8 h-8" />
          </ItemActions>
        </Item>

        <Item className="bg-slate-500/30">
          <ItemContent>
            <ItemTitle className="text-white">Oslo</ItemTitle>
            <ItemDescription className="text-white">Sunny, 27°</ItemDescription>
          </ItemContent>
          <ItemActions>
            <img src="/assets/icons/cloudy.svg" alt="Weather" className="w-8 h-8" />
          </ItemActions>
        </Item>
      </div>
    </div>
  );
}
