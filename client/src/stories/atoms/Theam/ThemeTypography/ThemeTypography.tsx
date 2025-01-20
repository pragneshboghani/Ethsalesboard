import * as React from "react";
import { useState } from "react";

type TypographySpec = {
  name: string;
  fontSize: string;
  example: string;
  className: string;
  variation?: any;
};

const typography: TypographySpec[] = [
  {
    name: "Font Family",
    fontSize: "Inter",
    example: "The quick brown fox",
    className: "text-title-4 inter",
  },
  {
    name: "Font Family",
    fontSize: "Bagoss Condensed TRIAL",
    example: "The quick brown fox",
    className: "text-title-4 bagoss",
  },
  {
    name: "Title 1",
    fontSize: "60px",
    example: "The quick brown fox",
    className: "text-title-1",
  },
  {
    name: "Title 2",
    fontSize: "48px",
    example: "The quick brown fox",
    className: "text-title-2",
  },
  {
    name: "Title 3",
    fontSize: "32px",
    example: "The quick brown fox",
    className: "text-title-3",
  },
  {
    name: "Title 4",
    fontSize: "24px",
    example: "The quick brown fox",
    className: "text-title-4",
  },
  {
    name: "Body Heading",
    fontSize: "14px",
    example: "The quick brown fox - 600",
    className: "text-body-heading font-semibold",
    variation: [
      {
        example: "The quick brown fox - 500",
        className: "text-body-heading font-medium",
      },
      {
        example: "The quick brown fox - 400",
        className: "text-body-heading font-normal",
      },
    ],
  },
  {
    name: "Body Large",
    fontSize: "20px",
    example: "The quick brown fox - 600",
    className: "text-body-large font-semibold",
    variation: [
      {
        example: "The quick brown fox - 500",
        className: "text-body-large font-medium",
      },
      {
        example: "The quick brown fox - 400",
        className: "text-body-large font-normal",
      },
    ],
  },
  {
    name: "Body Medium",
    fontSize: "18px",
    example: "The quick brown fox - 600",
    className: "text-body-medium font-semibold",
    variation: [
      {
        example: "The quick brown fox - 500",
        className: "text-body-medium font-medium",
      },
      {
        example: "The quick brown fox - 400",
        className: "text-body-medium font-normal",
      },
    ],
  },
  {
    name: "Body Small",
    fontSize: "16px",
    example: "The quick brown fox - 600",
    className: "text-body-small font-semibold",
    variation: [
      {
        example: "The quick brown fox - 500",
        className: "text-body-small font-medium",
      },
      {
        example: "The quick brown fox - 400",
        className: "text-body-small font-normal",
      },
    ],
  },
  {
    name: "Caption",
    fontSize: "14px",
    example: "The quick brown fox - 600",
    className: "text-caption font-semibold",
    variation: [
      {
        example: "The quick brown fox - 500",
        className: "text-caption font-medium",
      },
      {
        example: "The quick brown fox - 400",
        className: "text-caption font-normal",
      },
    ],
  },
  {
    name: "Tiny",
    fontSize: "12px",
    example: "The quick brown fox - 600",
    className: "text-tiny font-semibold",
    variation: [
      {
        example: "The quick brown fox - 500",
        className: "text-tiny font-medium",
      },
      {
        example: "The quick brown fox - 400",
        className: "text-tiny font-normal",
      },
    ],
  },
];

export const ThemeTypography: React.FC = () => {
  const [copyStyle, setCopyStyle] = useState("");

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold mb-4">Typography</h1>
      <div className="text-lg text-grey-500 mb-6">
        <p className="text-red-700">
          Note : on click any font example it's style (className) copy on
          clipbord (for eisy to use)
        </p>
        <p className="text-blue-700">
          copy className :- {copyStyle || "not copy yet"}
        </p>
      </div>

      <div className="flex flex-col gap-4 space-y-6">
        {typography.map((type) => (
          <div
            key={type.name}
            className="grid grid-cols-3 items-center gap-4 border-b pb-4"
          >
            <p className="font-medium">{type.name}</p>
            <p className="text-grey-500">{type.fontSize}</p>
            <div className="bg-grey-100 p-4 rounded-lg flex flex-col gap-2 cursor-pointer">
              <div
                className={`${type.className}`}
                onClick={() => {
                  navigator.clipboard.writeText(type.className);
                  setCopyStyle(type.className);
                }}
              >
                {type.example}
              </div>
              {type?.variation &&
                type?.variation?.map((item) => (
                  <div
                    className={` ${item.className}`}
                    onClick={() => {
                      navigator.clipboard.writeText(item.className);
                      setCopyStyle(item.className);
                    }}
                  >
                    {item.example}
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
