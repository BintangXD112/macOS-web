
import React from 'react';

const CalculatorIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 128 128"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <rect width="128" height="128" rx="28" fill="#505050" />
    <rect x="14" y="14" width="100" height="30" rx="8" fill="#d4d4d2" />
    <g fill="#f2f2f2">
      <circle cx="34" cy="70" r="10" />
      <circle cx="64" cy="70" r="10" />
      <circle cx="94" cy="70" r="10" />
      <circle cx="34" cy="100" r="10" />
      <circle cx="64" cy="100" r="10" />
      <circle cx="94" cy="100" r="10" />
    </g>
    <g fill="#ff9500">
      <circle cx="110" cy="70" r="10" />
      <circle cx="110" cy="100" r="10" />
    </g>
  </svg>
);

export default CalculatorIcon;
