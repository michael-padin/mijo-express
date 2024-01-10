"use client";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { env } from "process";
import React, { type KeyboardEvent, useState } from "react";
import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";

type tGooglePredictionManual = {
  place_id: string;
  description: string;
};

type GoogleAutoAddressInputProps = {
  value: string | undefined;
  onChange: (value: string) => void;
  disabled?: boolean;
};

export const MeInputAddress = ({
  disabled = false,
  value = undefined,
  onChange,
}: GoogleAutoAddressInputProps) => {
  const [placeListOpen, setPlaceListOpen] = useState(false);
  const { placePredictions, getPlacePredictions } = usePlacesService({
    apiKey: env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY,
    debounce: 500,
  });

  // dont know if these are needed
  const handlePlaceValue = (value: string) => {
    if (!placeListOpen) setPlaceListOpen(true);
    getPlacePredictions({ input: value });
    onChange(value);
  };

  const handleClose = (e: KeyboardEvent<HTMLInputElement>) => {
    e.key === "Escape" && setPlaceListOpen(false);
    e.key === "Tab" && setPlaceListOpen(false);
  };

  const handleSelect = (placeName: string) => {
    setPlaceListOpen(false);
    onChange(placeName);
  };

  return (
    <Command className="relative overflow-visible">
      <Input
        disabled={disabled}
        placeholder="Search place..."
        className="w-full"
        onChange={(e) => handlePlaceValue(e.target.value)}
        onKeyDown={(e) => handleClose(e)}
        value={value}
        type="text"
        autoComplete="off"
      />

      {placeListOpen && (
        <CommandList
          className={`absolute left-0 right-0 top-[46px] z-20 rounded-lg bg-background ${
            placePredictions.length > 0
              ? "border animate-in fade-in-0 zoom-in-95 "
              : ""
          }`}
        >
          <CommandGroup
            className={`${placePredictions.length > 0 ? "p-2" : "p-0"} `}
          >
            {placePredictions?.map((place: tGooglePredictionManual) => (
              <CommandItem
                key={place.place_id}
                onSelect={() => handleSelect(place?.description)}
              >
                {place.description}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      )}
    </Command>
  );
};
