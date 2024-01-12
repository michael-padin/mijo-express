import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormControl } from "@/components/ui/form";

interface MeSelectProps {
  listOptions: {
    label: string;
    value: string;
    metadata?: string;
  }[];
  onChange: (value: string) => void;
  value?: string;
  placeholder: string;
  disabled?: boolean;
}

export const MeSelect = ({
  onChange,
  value,
  listOptions,
  placeholder,
  disabled,
}: MeSelectProps) => {
  return (
    <Select onValueChange={onChange} defaultValue={value}>
      <FormControl>
        <SelectTrigger>
          <SelectValue placeholder="Select a service to submit" />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        {listOptions.map((option) => (
          <SelectItem value={option.value} key={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
