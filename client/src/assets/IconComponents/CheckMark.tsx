import * as React from "react";

const CheckMark = ({ className, stroke }) => {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className ? className : `w-5 h-5 ml-auto text-grey-700`}
    >
      <path
        d="M11 18.5625C15.1594 18.5625 18.5625 15.1594 18.5625 11C18.5625 6.84063 15.1594 3.4375 11 3.4375C6.84063 3.4375 3.4375 6.84063 3.4375 11C3.4375 15.1594 6.84063 18.5625 11 18.5625Z"
        fill={stroke ? stroke : "#1B1B1B"}
        stroke={stroke ? stroke : "#1B1B1B"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.42871 10.9996L9.8067 13.3776L14.5711 8.62158"
        stroke={stroke === "white" ? "#1B1B1B" : "white"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CheckMark;
