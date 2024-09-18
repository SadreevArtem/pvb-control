import React from "react";

type Props = {
  className?: string;
};

export const Block: React.FC<Props> = ({ className = "" }) => (
  <svg
    className={className}
    width='12'
    height='12'
    viewBox='0 0 12 12'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M6 1.4C3.46077 1.4 1.4 3.46077 1.4 6C1.4 8.53923 3.46077 10.6 6 10.6C8.53923 10.6 10.6 8.53923 10.6 6C10.6 3.46077 8.53923 1.4 6 1.4ZM2.5 6C2.5 4.06623 4.06623 2.5 6 2.5C6.76878 2.5 7.47804 2.74858 8.05326 3.17082L3.17082 8.05326C2.74858 7.47804 2.5 6.76878 2.5 6ZM6 9.5C5.23122 9.5 4.52196 9.25142 3.94674 8.82918L8.82918 3.94674C9.25142 4.52196 9.5 5.23122 9.5 6C9.5 7.93377 7.93377 9.5 6 9.5Z'
      fill='currentColor'
      stroke='currentColor'
      strokeWidth='0.2'
    />
  </svg>
);
