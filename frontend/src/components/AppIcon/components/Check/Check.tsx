import React from "react";

type Props = {
  className?: string;
};

export const Check: React.FC<Props> = ({ className = "" }) => (
  <svg
    className={className}
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M8.90274 16.4569L5.01713 12.3742L4.83604 12.1839L4.65494 12.3742L3.29937 13.7985L3.13535 13.9709L3.29937 14.1432L8.72164 19.8406L8.90274 20.0309L9.08383 19.8406L20.703 7.63186L20.867 7.45951L20.703 7.28716L19.3474 5.86281L19.1663 5.67252L18.9852 5.86281L8.90274 16.4569Z'
      fill='currentColor'
      stroke='currentColor'
      strokeWidth='0.5'
    />
  </svg>
);
