import React from "react";

type Props = {
  className?: string;
};

export const Close: React.FC<Props> = ({ className = "" }) => (
  <svg
    width='32'
    height='32'
    className={className}
    viewBox='0 0 32 32'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <g clipPath='url(#clip0_2019_96151)'>
      <path
        d='M25.6993 8.7269L18.4262 16L25.6993 23.2731L23.2749 25.6975L16.0018 18.4244L8.72871 25.6975L6.30435 23.2731L13.5774 16L6.30435 8.7269L8.72871 6.30254L16.0018 13.5756L23.2749 6.30254L25.6993 8.7269Z'
        fill='currentColor'
      />
    </g>
    <defs>
      <clipPath id='clip0_2019_96151'>
        <rect width='32' height='32' fill='white' />
      </clipPath>
    </defs>
  </svg>
);
