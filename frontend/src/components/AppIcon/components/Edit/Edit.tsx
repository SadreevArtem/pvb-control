import React from "react";

type Props = {
  className?: string;
};

export const Edit: React.FC<Props> = ({ className = "" }) => (
  <svg
    className={className}
    width='20'
    height='20'
    viewBox='0 0 20 20'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M3.57031 13.9007V16.0721C3.57031 16.2721 3.72746 16.4292 3.92746 16.4292H6.09888C6.19174 16.4292 6.2846 16.3935 6.34888 16.3221L14.1489 8.52924L11.4703 5.85067L3.67746 13.6435C3.60603 13.715 3.57031 13.8007 3.57031 13.9007ZM16.2203 6.45781C16.4989 6.17924 16.4989 5.72924 16.2203 5.45067L14.5489 3.77924C14.2703 3.50067 13.8203 3.50067 13.5417 3.77924L12.2346 5.08638L14.9132 7.76496L16.2203 6.45781Z'
      fill='currentColor'
    />
  </svg>
);
