const ArrowRight = (props) => (
  <svg
    width={7}
    height={14}
    viewBox="0 0 7 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M1 13L5.59317 8.06061C6.13561 7.47727 6.13561 6.52273 5.59317 5.93939L1 1"
      stroke={props?.stroke ? props?.stroke : "#FFFF"}
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default ArrowRight;
