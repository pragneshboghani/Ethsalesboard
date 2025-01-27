import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useFormContext } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { DatetimePicker } from "../ui/DateAndTimePicker";

interface FormDateInputProps {
  name: string;
  label: string;
  placeholder?: string;
}

const FormDateInput: React.FC<FormDateInputProps> = ({
  name,
  label,
  placeholder,
}) => {
  const {
    register,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext();

  // const [date, setDate] = React.useState<Date | null>(null);
  const date = getValues(name);

  function convertToISO(dateString) {
    const date = new Date(dateString);
    return date.toISOString();
  }

  const handleDateChange = (selectedDate: Date | undefined) => {
    console.log("selectedDate::", new Date(selectedDate));
    setValue(name, convertToISO(selectedDate) || null, {
      shouldValidate: true,
    });
  };

  return (
    <div className="space-y-1">
      <Label className="font-semibold text-base">{label}</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground",
              errors[name] ? "border-red-500" : "border-gray-400"
            )}>
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? (
              format(date, "PPP")
            ) : (
              <span>{placeholder ?? "Pick a date"}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            className={"pointer-events-auto"}
            mode="single"
            selected={date || undefined}
            initialFocus
            onSelect={(date: Date) => handleDateChange(date)}
          />
        </PopoverContent>
      </Popover>
      {errors[name] && (
        <p className="text-red-500 text-sm">{String(errors[name]?.message)}</p>
      )}
    </div>
  );
};

export default FormDateInput;
