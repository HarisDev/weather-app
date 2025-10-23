import { useState, useMemo, useCallback, useEffect } from "react";
import { debounce } from "lodash";
import { InputGroup, InputGroupInput, InputGroupAddon } from "@/components/ui/input-group";
import { usePlacesAutocomplete } from "@/api/google-places/hooks";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { SearchIcon } from "lucide-react";
import Suggestion from "./suggestion";
import { Spinner } from "@/components/ui/spinner";

export default function Search() {
  const [inputValue, setInputValue] = useState<string>("");
  const [debouncedValue, setDebouncedValue] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

  const { data: suggestionsData, isFetching } = usePlacesAutocomplete(debouncedValue);

  const suggestions = suggestionsData?.suggestions;
  const isEmpty = !isFetching && debouncedValue.length > 0 && !suggestions;
  const isAboutToSearch = (debouncedValue.length === 0 && !suggestions) || (debouncedValue.length > 0 && isFetching && !suggestions);

  const debouncedSetValue = useMemo(
    () =>
      debounce((value: string) => {
        setDebouncedValue(value);
      }, 400),
    []
  );

  useEffect(() => {
    return () => {
      debouncedSetValue.cancel();
    };
  }, [debouncedSetValue]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setInputValue(value);
      debouncedSetValue(value);
    },
    [debouncedSetValue]
  );

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild onClick={(e) => e.preventDefault()}>
        <InputGroup className="bg-white backdrop-blur-sm sm:w-xs">
          <InputGroupInput
            placeholder="Search for a place..."
            value={inputValue}
            onChange={handleInputChange}
            onFocus={() => setIsOpen(true)}
            aria-label="Search for a location"
            aria-autocomplete="list"
            aria-controls="search-suggestions"
            aria-expanded={isOpen}
            role="combobox"
          />
          <InputGroupAddon>
            <SearchIcon className={isFetching ? "animate-pulse" : ""} aria-hidden="true" />
          </InputGroupAddon>
          <InputGroupAddon align="inline-end">{isFetching && <Spinner />}</InputGroupAddon>
        </InputGroup>
      </PopoverTrigger>
      <PopoverContent
        className="p-0 w-(--radix-popover-trigger-width)"
        onOpenAutoFocus={(e) => e.preventDefault()}
        role="dialog"
        aria-label="Location search results"
      >
        <div id="search-suggestions" className="flex flex-col rounded-md overflow-hidden" role="listbox">
          {isEmpty && <div className="px-4 py-3 text-left text-sm text-gray-500" role="status">No places found.</div>}
          {isAboutToSearch && <div className="px-4 py-3 text-left text-sm text-gray-500" role="status">Start typing to search for a place.</div>}

          {suggestions?.map((suggestion) => {
            if (!suggestion.placePrediction) return null;

            return <Suggestion suggestion={suggestion} key={suggestion.placePrediction.placeId} handleClose={() => setIsOpen(false)} />;
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}
