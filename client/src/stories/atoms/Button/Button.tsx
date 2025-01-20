import * as React from "react";
import BtnLoadingSpinner from "@/assets/IconComponents/BtnLoadingSpinner";

interface ButtonProps {
  variant: "default" | "active" | "disabled";
  size?: "small" | "medium" | "large";
  onClick?: () => void;
  children: React.ReactNode;
  customClass?: string;
  loading?: boolean;
  type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({
  variant = "default",
  size = "medium",
  onClick,
  children,
  customClass,
  loading = false,
  type = "button",
}) => {
  const baseClasses = "rounded-md font-sans text-body-small focus:outline-none";
  //default: hover:bg-shades-black hover:text-white
  //active: hover:bg-grey-200 hover:text-shades-black
  const variantClasses = {
    default:
      " bg-grey-200 text-shades-black transition duration-150 ease-in-out",
    active: "bg-shades-black text-white  transition duration-150 ease-in-out",
    disabled: "bg-grey-200 text-grey-400 cursor-not-allowed",
  };

  const sizeClasses = {
    small: "px-3 py-1 text-sm",
    medium: "px-4 py-2 text-base",
    large: "px-6 py-3 text-lg",
  };

  return (
    <button
      className={` ${baseClasses} ${variantClasses[variant]} ${customClass} ${sizeClasses[size]} flex justify-center gap-2 items-center`}
      onClick={variant !== "disabled" && !loading ? onClick : undefined}
      disabled={variant === "disabled" || loading}
      type={type}
    >
      {loading ? <BtnLoadingSpinner /> : children}
    </button>
  );
};

export default Button;
