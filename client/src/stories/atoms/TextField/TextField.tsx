import * as React from "react";
import { FC } from "react";
import ErrorMark from "@/assets/IconComponents/ErrorMark";

interface TextFieldProps {
  label: string;
  type?: "text" | "email" | "number";
  error?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id?: string;
  name?: string;
  disabled?: boolean;
}
const TextField: FC<TextFieldProps> = ({
  label,
  type = "text",
  error,
  value,
  onChange,
  id,
  disabled = false,
  onFocus,
  onBlur,
  name,
}) => {
  const disabledStyle = disabled
    ? "bg-grey-100 text-grey-400 cursor-not-allowed"
    : "bg-white";
  return (
    <div className="w-full">
      <div
        className={`relative ${disabledStyle} input-parent transition-all border rounded-lg w-full flex items-center ${
          error ? "border-red-700" : "focus-within:border-grey-800"
        }`}
      >
        <div className="p-4 pb-0 w-full">
          <input
            type={type}
            value={value}
            name={name}
            id={id}
            autoComplete="off"
            onChange={onChange}
            disabled={disabled}
            onFocus={onFocus}
            onBlur={onBlur}
            className={`input-component remove-range ${disabledStyle} peer transition-all py-3 w-full text-lg  rounded-md focus:outline-none outline-none placeholder-transparent border-0 group`}
          />
          <label
            htmlFor={id}
            className={` ${
              disabled ? "text-grey-400" : "bg-white text-grey-600"
            }  ${
              value && disabled ? "top-[8px] text-caption" : ""
            } absolute left-2 top-[31%]  text-body-small px-2 transition-all duration-300 ease-in-out peer-placeholder-shown:text-sm peer-placeholder-shown:text-grey-400 peer-focus:top-[8px] peer-focus:text-sm ${
              value ? "top-[8px] text-sm" : ""
            }`}
          >
            {label}
          </label>
        </div>
        {error && (
          <div className="pe-2">
            <ErrorMark className="size-8" />
          </div>
        )}
      </div>
      {error && <p className="text-sm text-red-700 mt-1">{error}</p>}
    </div>
  );
};

export default TextField;
