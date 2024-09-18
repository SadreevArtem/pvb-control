

import React from "react";

type Props = {
  className?: string;
};

export const Favorite: React.FC<Props> = ({ className = "" }) => (
  <svg
    className={className}
    width="22"
    height="22"
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M19.0307 5.03067C21.12 7.11998 21.12 10.5074 19.0307 12.5968L11.7071 19.9203C11.3166 20.3108 10.6834 20.3108 10.2929 19.9203L2.96933 12.5968C0.880016 10.5074 0.880015 7.11998 2.96933 5.03067C5.05865 2.94135 8.4461 2.94135 10.5354 5.03067L11 5.49525L11.4646 5.03067C13.5539 2.94135 16.9414 2.94135 19.0307 5.03067Z"
    stroke="#9d8c98"
    strokeWidth="2"
    strokeLinecap="round"
  ></path>
  </svg>
);
  
