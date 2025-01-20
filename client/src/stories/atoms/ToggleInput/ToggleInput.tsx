import * as React from "react";
export default function ToggleInput({ label, checked }) {
    return (
        <div className="flex justify-between p-4 rounded-lg max-w-md">
            {label ?? <span className="text-lg">{label}</span>}
            <div
                className={`w-12 h-6 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer ${checked ? 'bg-gray-950' : ''}`}
            >
                <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform ${checked ? 'translate-x-6' : ''}`}
                ></div>
            </div>
        </div>
    )
}