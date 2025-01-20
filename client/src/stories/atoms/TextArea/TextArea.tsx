import * as React from "react";
import ErrorMark from "@/assets/IconComponents/ErrorMark";

type TextAreaProps = {
  id: string;
  disabled?: boolean;
  value: string;
  label: string;
  error?: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

const TextArea: React.FC<TextAreaProps> = ({
  id,
  disabled = false,
  value,
  label,
  error,
  onChange,
}) => {
  const disabledStyle = disabled
    ? "bg-grey-100 text-grey-400 cursor-not-allowed"
    : "bg-white text-grey-600";
  return (
    <div className="w-full">
      <div
        className={`relative ${disabledStyle}  transition-all border-grey-200 border flex ${
          error ? "border-red-700" : "focus-within:border-grey-800"
        } rounded-lg w-full overflow-hidden`}
      >
        <div className="p-4 pb-0 w-full">
          <textarea
            id={id}
            autoComplete="off"
            disabled={disabled}
            value={value}
            onChange={onChange}
            className={`peer ${disabledStyle} py-3 w-full text-lg rounded-md focus:outline-none outline-none placeholder-transparent border-0 group`}
          />
          <label
            htmlFor={id}
            className={`absolute left-2 top-[15px] w-full ${disabledStyle} ${
              disabled ? "bg-grey-100 duration-0" : "bg-white"
            } ${
              value && disabled ? "top-[8px] text-sm" : ""
            } text-[#7C7C7C] text-body-small font-inter px-2 transition-all duration-300 ease-in-out peer-placeholder-shown:text-sm peer-placeholder-shown:text-grey-400 peer-focus:top-[8px] peer-focus:text-sm ${
              value ? "top-[8px] text-sm" : ""
            }`}
          >
            {label}
          </label>
        </div>
        {error && (
          <div className="pe-2 absolute right-0">
            <ErrorMark className="size-8 z-40 relative mt-2" />
          </div>
        )}
      </div>
      {error && <p className="text-sm text-red-700 mt-1">{error}</p>}
    </div>
  );
};

export default TextArea;
