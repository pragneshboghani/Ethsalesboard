import * as React from "react";
import { useState } from "react";

type Color = {
  name: string;
  className: string;
};

type ColorCategory = {
  category: string;
  colors: Color[];
};

const colors: ColorCategory[] = [
  {
    category: "Base Colors",
    colors: [
      { name: "Primary/Accent", className: "bg-blue-100" },
      { name: "Secondary", className: "bg-purple-300" },
      { name: "Error", className: "bg-red-700" },
      { name: "Success", className: "bg-green-600" },
      { name: "Warning", className: "bg-orange-600" },
      { name: "Info", className: "bg-grey-500" },
    ],
  },
  {
    category: "Background Colors",
    colors: [
      { name: "White", className: "bg-white border border-grey-300" },
      { name: "Yellow100", className: "bg-yellow-100" },
      { name: "Blue100", className: "bg-blue-100" },
      { name: "Grey100", className: "bg-grey-100" },
      { name: "Orange100", className: "bg-orange-100" },
      { name: "Orange700", className: "bg-orange-700" },
      { name: "Blue800", className: "bg-blue-800" },
      { name: "Purple700", className: "bg-purple-700" },
      { name: "Yellow700", className: "bg-yellow-700" },
    ],
  },
  {
    category: "Texts & Icons",
    colors: [
      { name: "Dark Texts", className: "bg-blue-800" },
      { name: "Secondary", className: "bg-grey-600" },
      { name: "Tertiary", className: "bg-grey-400" },
      { name: "Others", className: "bg-green-600" },
    ],
  },
];

export const ColorPalette: React.FC = () => {
  const [copyStyle, setCopyStyle] = useState("");
  return (
    <div className="p-6 space-y-8">
      <div>
        {" "}
        <p className="text-red-700">
          Note : on click any color it's style (className) copy on clipbord (for
          eisy to use)
        </p>
        <p className="text-blue-700 mt-2">
          copy className :-{copyStyle || "not copy yet"}
        </p>
      </div>
      {colors.map((category) => (
        <div key={category.category}>
          <h3 className="text-lg font-bold mb-4">{category.category}</h3>
          <div className="grid grid-cols-3 gap-4">
            {category.colors.map((color) => (
              <div
                key={color.name}
                className="flex items-center space-x-4 cursor-pointer"
                onClick={() => {
                  navigator.clipboard.writeText(color.className);
                  setCopyStyle(color.className);
                }}
              >
                <div
                  className={`w-10 h-10 rounded ${color.className}`}
                  aria-label={color.name}
                ></div>
                <span className="text-sm">{color.name}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
