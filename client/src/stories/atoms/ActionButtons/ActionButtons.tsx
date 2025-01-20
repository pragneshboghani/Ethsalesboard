import * as React from "react";
import { EllipsisVertical, PenLine, Trash2 } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export const ActionButtons = ({ options }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          <EllipsisVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-[183px] rounded-xl bg-white border-gray-300"
      >
        <DropdownMenuGroup>
          {options?.map((item, index) => {
            return (
              <>
                <DropdownMenuItem
                  key={index}
                  className={item?.customClass}
                  onClick={item?.onClick}
                >
                  {item?.icon}
                  {item?.label}
                </DropdownMenuItem>
                {index !== options?.length - 1 && <DropdownMenuSeparator className="bg-gray-200 mx-2" />}
              </>
            );
          })}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
