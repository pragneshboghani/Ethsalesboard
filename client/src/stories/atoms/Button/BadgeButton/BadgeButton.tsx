import * as React from "react";
import { Button } from "@/components/ui/button";

export const BadgeVariants = [
  "blue",
  "green",
  "red",
  "orange",
  "purple",
  "yellow",
  "grey"
];

export type BadgeVariant = (typeof BadgeVariants)[number];

interface BadgeButtonProps {
  text: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  variant: BadgeVariant;
  className?: string;
}

const BadgeButton: React.FC<BadgeButtonProps> = ({
  text,
  iconLeft,
  iconRight,
  variant,
  className = "",
}) => {
  const variants: Record<BadgeVariant, string> = {
    blue: "text-blue-800 bg-blue-100",
    green: "text-green-600 bg-green-100",
    red: "text-red-600 bg-red-200",
    orange: "text-orange-600 bg-orange-200",
    purple: "text-purple-600 bg-purple-200",
    yellow: "text-shades-black bg-yellow-200",
    grey: "text-shades-black bg-grey-200"
  };

  return (
    <Button
      variant="default"
      className={`!text-tiny h-auto font-medium font-inter ${variants[variant]} ${className}`}
    >
      {iconLeft && <span>{iconLeft}</span>}
      {text}
      {iconRight && <span>{iconRight}</span>}
    </Button>
  );
};

export default BadgeButton;
