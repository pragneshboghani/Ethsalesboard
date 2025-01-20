import * as React from "react";
import { format } from "date-fns";
import { Calendar1 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface DatePickerProps {
  selectedDate?: Date;
  onDateChange?: (date: Date | undefined) => void;
  title: string;
  disabled?: boolean;
}

export const DatePicker = ({
  selectedDate,
  onDateChange,
  title,
  disabled = false,
}: DatePickerProps) => {
  const disabledStyle = disabled
    ? "bg-grey-100 text-grey-400 cursor-not-allowed"
    : "bg-white";
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            `relative w-[368px] ${disabledStyle} justify-start text-left font-normal h-[66px] rounded-[10px]`,
            !selectedDate && "text-muted-foreground"
          )}
          disabled={disabled}
        >
          <div className={`relative w-full ${selectedDate ? "mt-3" : ""}`}>
            <div
              className={`input-component remove-range peer transition-all py-3 w-full text-lg  rounded-md focus:outline-none outline-none placeholder-transparent border-0 group`}
            >
              {selectedDate ? format(selectedDate, "dd/MM/yyyy") : ""}
              <label
                className={cn(
                  `${
                    disabled ? "text-grey-400 mt-1" : "text-grey-600"
                  } absolute left-0 transition-all duration-300 ease-in-out transform`,
                  selectedDate
                    ? "top-[-8px] text-base" // When selected, move the label and make it smaller
                    : "top-1/2 -translate-y-1/2 text-lg", // Default position when no date is selected
                  "peer-placeholder-shown:text-sm peer-placeholder-shown:text-grey-400 peer-focus:top-[-10px] peer-focus:text-xs peer-valid:top-[-10px] peer-valid:text-xs"
                )}
              >
                {title}
              </label>
            </div>
          </div>

          <Calendar1 className="ml-auto h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={onDateChange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};
