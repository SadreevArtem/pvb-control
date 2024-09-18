

import React from "react";

type Props = {
  className?: string;
};

export const Cart: React.FC<Props> = ({ className = "" }) => (
  <svg
    className={className}
    width="22"
    height="22"
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
    d="M3.67986 6.91023C3.72631 6.39482 4.15832 6 4.67582 6H17.3242C17.8417 6 18.2737 6.39482 18.3201 6.91023L19.4018 18.9102C19.4545 19.4956 18.9935 20 18.4058 20H3.59419C3.00646 20 2.54547 19.4956 2.59823 18.9102L3.67986 6.91023Z"
    stroke="#9d8c98"
    strokeWidth="1.8"
  ></path>
  <path
    d="M15 9V5C15 2.79086 13.2091 1 11 1C8.79086 1 7 2.79086 7 5V9"
    stroke="#9d8c98"
    strokeWidth="1.85"
  ></path>
  </svg>
);
  