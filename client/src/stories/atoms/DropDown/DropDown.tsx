import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";

interface itemType {
  key: string;
  value: string;
}

export const DropDownSelect = ({
  placeholder,
  label,
  options,
  onResetClick,
  onShowClick,
}) => {
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Select open={isOpen} onValueChange={(value) => setSelectedValue(value)}>
      <SelectTrigger
        className="w-[180px] rounded-full"
        onClick={() => setIsOpen(true)}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="p-2 bg-white">
        <SelectGroup>
          <div className="flex justify-between items-center">
            <SelectLabel>{label}</SelectLabel>
            <div className="cursor-pointer" onClick={() => setIsOpen(false)}>
              <X className="h-[20px] w-[20px]" />
            </div>
          </div>
          {options?.map((item: itemType, index: number) => {
            return (
              <SelectItem
                className="hover:bg-gray-100 rounded-md my-2"
                key={index}
                value={item?.key}
              >
                {item?.value}
              </SelectItem>
            );
          })}
        </SelectGroup>

        <div className="flex justify-center items-center gap-2 mt-4">
          <Button
            onClick={(e) => {
              setSelectedValue(null);
              onResetClick(e);
              setIsOpen(false);
            }}
            className="bg-gray-200 text-black w-[129px]"
          >
            Reset
          </Button>
          <Button
            onClick={(e) => {
              if (selectedValue) {
                onShowClick(e, selectedValue);
              } else {
                console.log("No item selected");
              }
              setIsOpen(false);
            }}
            className="bg-black text-white w-[129px]"
          >
            Show Results
          </Button>
        </div>
      </SelectContent>
    </Select>
  );
};
