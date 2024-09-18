import React from "react";

type Props = {
  className?: string;
};

export const ChevronRight: React.FC<Props> = ({ className = "" }) => (
  <svg
    className={className}
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M7.55469 17.5072L13.0507 11.9992L7.55469 6.49122L9.24669 4.79922L16.4467 11.9992L9.24669 19.1992L7.55469 17.5072Z'
      fill='currentColor'
    />
  </svg>
);
