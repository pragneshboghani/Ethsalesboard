import * as React from "react";
import SearchIcon from "@/assets/IconComponents/SearchIcon";

interface SearchBarProps {
    variant: "default" | "disabled";
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    customClass: string;
    id?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
    variant = "default",
    value,
    onChange,
    placeholder = "Search...",
    customClass,
    id = "search",
}) => {
    const isDisabled = variant === "disabled";
    const disabledStyle = isDisabled
        ? "bg-grey-100 text-grey-400 cursor-not-allowed"
        : "bg-white";

    return (
        <div className={` ${customClass}`}>
            <div className={`relative ${disabledStyle} transition-all border rounded-full w-full flex items-center
                ${isDisabled ? "border-grey-200" : "border-grey-400 hover:border-grey-500"}`}
            >
                <div className={`absolute left-2 ${isDisabled ? "text-grey-400" : "text-dark"}`}>
                    <SearchIcon />
                </div>
                <div className="w-full">
                    <input
                        type="text"
                        value={value}
                        onChange={onChange}
                        disabled={isDisabled}
                        autoComplete="off"
                        id={id}
                        placeholder={placeholder}
                        className={`${disabledStyle} transition-all py-2 pl-9 pr-4 w-full text-caption font-inter rounded-full
                            focus:outline-none outline-none border-0 placeholder-grey-400`}
                    />
                </div>
            </div>
        </div>
    );
};

export default SearchBar;