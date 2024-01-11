"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandInput,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { FormControl } from "../ui/form";
import { Label } from "../ui/label";

interface MeComboboxProps {
  listOptions: {
    label: string;
    value: string;
    metadata?: string;
  }[];
  onChange: (value: string) => void;
  value?: string;
  placeholder: string;
  disabled?: boolean;
  showOtherValue?: boolean;
  showSearchBar?: boolean;
}

export const MeCombobox = ({
  listOptions,
  onChange,
  value,
  placeholder,
  disabled = false,
  showOtherValue = false,
  showSearchBar = true,
}: MeComboboxProps) => {
  const [open, setOpen] = useState(false);
  const [otherValue, setOtherValue] = useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant="outline"
            role="combobox"
            className={cn("justify-between", !value && "text-muted-foreground")}
          >
            {value
              ? listOptions.find((option) => option.value === value)?.label
              : placeholder}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          {showSearchBar && <CommandInput placeholder="Search here" />}
          <CommandGroup>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandList>
              {listOptions.map((option) => (
                <CommandItem
                  value={option.value}
                  key={option.value}
                  onSelect={(value) => {
                    onChange(value);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      option.value === value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandList>
          </CommandGroup>
          <CommandSeparator />
        </Command>
        {showOtherValue && (
          <div className="p-3">
            <Input
              placeholder="Other"
              value={otherValue}
              onChange={(e) => setOtherValue(e.target.value)}
            />
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};
