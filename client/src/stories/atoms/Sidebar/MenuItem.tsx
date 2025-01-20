import * as React from "react";
import { Link } from "react-router-dom";

interface MenuItemProps {
  label: string;
  icon: JSX.Element;
  url: string;
  active?: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({ label, icon, url, active }) => {
  console.log(`active::${label}:`, active);
  return (
    <Link
      to={url}
      className={`flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-grey-200 stroke-grey-600 ion duration-150 font-medium text-[#7C7C7C] w-full ${
        active ? "bg-border !text-shades-black stroke-shades-black" : ""
      }`}>
      {icon}
      <span className="font-normal">{label}</span>
    </Link>
  );
};

export default MenuItem;
