import * as React from "react";
import "@/index.css";

type RadioButtonProps = {
  label?: string;
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  customClassName?: string;
};

const RadioButton: React.FC<RadioButtonProps> = ({
  label,
  name,
  value,
  onChange,
  customClassName = "",
}) => {
  console.log(label);
  return (
    <div className={`flex items-center mb-4 ${customClassName}`}>
      <input
        id="default-radio-1"
        type="radio"
        onChange={onChange}
        value={value}
        checked={value === name}
        name={name}
        className="w-4 h-4 bg-grey-100 border-grey-300 accent-[#1B1B1B]"
      />
      {label && (
        <label
          htmlFor="default-radio-1"
          className={`text-[16px] ml-[6px] font- ${
            value === name ? "text-[#1B1B1B]" : "text-[#7C7C7C]"
          }`}
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default RadioButton;
