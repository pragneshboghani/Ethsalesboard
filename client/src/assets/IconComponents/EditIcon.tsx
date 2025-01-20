const EditIcon = (props) => {
  return (
    <svg
      width={18}
      height={18}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M10.5553 2.91409C11.1142 2.30856 11.3936 2.0058 11.6906 1.82919C12.4071 1.40307 13.2893 1.38982 14.0178 1.79424C14.3197 1.96185 14.6077 2.25609 15.1838 2.84457C15.7598 3.43305 16.0479 3.72729 16.212 4.03569C16.6079 4.77984 16.5949 5.68109 16.1777 6.41303C16.0049 6.71637 15.7085 7.00183 15.1157 7.57276L8.06297 14.3657C6.93966 15.4477 6.378 15.9886 5.67605 16.2628C4.97409 16.537 4.2024 16.5168 2.65902 16.4764L2.44903 16.4709C1.97918 16.4587 1.74425 16.4525 1.60769 16.2975C1.47113 16.1426 1.48977 15.9032 1.52706 15.4246L1.54731 15.1647C1.65226 13.8177 1.70473 13.1441 1.96778 12.5387C2.23083 11.9332 2.68458 11.4416 3.59207 10.4584L10.5553 2.91409Z"
        stroke={props?.stroke ? props?.stroke : "#1B1B1B"}
        strokeWidth={1.3}
        strokeLinejoin="round"
      />
      <path
        d="M9.75 3L15 8.25"
        stroke={props?.stroke ? props?.stroke : "#1B1B1B"}
        strokeWidth={1.3}
        strokeLinejoin="round"
      />
      <path
        d="M10.5 16.5L16.5 16.5"
        stroke={props?.stroke ? props?.stroke : "#1B1B1B"}
        strokeWidth={1.3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default EditIcon;
