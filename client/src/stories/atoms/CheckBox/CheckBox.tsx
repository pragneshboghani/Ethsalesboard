import * as React from "react";
import "./CheckBox.css";

type CheckBoxProps = {
  label: string;
  value: string;
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  customClassName?: string;
};

const CheckBox: React.FC<CheckBoxProps> = ({
  label,
  value,
  name,
  onChange,
  customClassName = "",
}) => {
  return (
    <label className={`flex items-center space-x-2 ${customClassName}`}>
      <input
        type="checkbox"
        checked={value === name}
        name={name}
        onChange={onChange}
      />
      <span
        className={`text-[16px]  ${
          name === value ? "text-[#1B1B1B]" : "text-[#7C7C7C]"
        }`}
      >
        {label}
      </span>
    </label>
  );
};

export default CheckBox;
