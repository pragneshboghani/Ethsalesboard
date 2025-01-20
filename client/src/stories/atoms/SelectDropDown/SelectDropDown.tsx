import { useState, useEffect, useRef, useMemo } from "react";
import CheckMark from "@/assets/IconComponents/CheckMark";

interface Option {
  label: string;
  value: string;
}

interface SelectDropDownProps {
  options: Option[];
  label: string;
  value: string;
  onChange: (value: string) => void;
  emptyOption?: string;
  disabled?: boolean;
  customclass?: string;
  searchbarchildren?: any;
  size?: string;
}

const SelectDropDown: React.FC<SelectDropDownProps> = ({
  options,
  label,
  value,
  onChange,
  emptyOption,
  disabled = false,
  customclass,
  searchbarchildren,
  size = "regular",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const toggleDropdown = () => {
    if (!disabled) setIsOpen((prev) => true);
  };

  const selectOption = (option: Option) => {
    onChange(option.value);
    setIsOpen(false);
  };

  const initialValue = useMemo(
    () => options?.find((option) => option.value === value)?.label || "",
    [options, value]
  );
  const handleClickOutside = (e: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div
        className={`flex relative ${customclass} ${
          disabled ? "bg-grey-100" : ""
        } ${
          isOpen ? "border-grey-800" : "border-grey-200"
        } transition-all border  rounded-lg w-full cursor-pointer`}
        onClick={toggleDropdown}
      >
        <div
          className={`p-4 pb-0 ${size === "small" ? "pt-0" : ""} pe-0 w-full`}
        >
          <input
            type="text"
            id="dropdown-input"
            value={initialValue}
            readOnly
            disabled={disabled}
            onClick={toggleDropdown}
            className={`selection:bg-transparent caret-transparent peer text-body-small font-sans transition-all  ${
              size === "small" ? "py-[7px]" : "py-3"
            }  w-full  ${
              disabled
                ? "bg-grey-100 text-grey-400"
                : "bg-white text-shades-black"
            } rounded-md focus:outline-none outline-none placeholder-transparent border-0 group`}
          />
          {size !== "small" ? (
            <label
              htmlFor="dropdown-input"
              className={`pointer-events-none absolute left-2 transition-all text-caption font-sans duration-300 ease-in-out select-none ${
                initialValue ? "top-[8px] text-sm" : "top-[31%] text-base"
              } ${disabled ? "text-grey-400" : "text-grey-600"}  px-2`}
            >
              {label}
            </label>
          ) : !initialValue ? (
            <label
              htmlFor="dropdown-input"
              className={`pointer-events-none absolute left-2 transition-all text-caption font-sans duration-300 ease-in-out select-none ${
                initialValue ? "top-[8px] text-sm" : "top-[31%] text-base"
              } ${disabled ? "text-grey-400" : "text-grey-600"}  px-2`}
            >
              {label}
            </label>
          ) : (
            ""
          )}
        </div>
        <button
          className={`pe-4 w-fit flex justify-between items-center ${
            disabled ? "text-grey-400" : "text-[#1B1B1B]"
          }  `}
        >
          <svg
            className={`w-4 h-4 transform transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>
      {isOpen && (
        <div
          className="absolute z-10 mt-1 w-full bg-white border border-grey-800 rounded-md shadow-lg p-2 max-h-48 overflow-y-auto [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-grey-100
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-grey-300"
          style={{ maxHeight: "200px" }}
        >
          {searchbarchildren}
          {(emptyOption
            ? [{ label: emptyOption, value: "" }, ...options]
            : options
          ).map((option) => (
            <div
              key={option.value}
              className={`flex items-center p-3 mb-2  text-body-small font-sans text-shades-black cursor-pointer hover:bg-grey-100 rounded-md ${
                value === option.value ? "bg-grey-100" : ""
              }`}
              onClick={() => selectOption(option)}
            >
              <span>{option.label}</span>
              {value === option.value && (
                <CheckMark className={"w-5 h-5 ml-auto text-grey-700"} />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectDropDown;
