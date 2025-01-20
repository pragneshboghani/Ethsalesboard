const ArrowLeft = (props) => (
  <svg
    width={7}
    height={14}
    viewBox="0 0 7 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M6 13L1.40683 8.06061C0.864389 7.47727 0.864389 6.52273 1.40683 5.93939L6 1"
      stroke={props?.stroke ? props?.stroke : "#7C7C7C"}
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default ArrowLeft;
