import React from 'react';

const ControlCenterIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    className={className}
  >
    <path d="M4.5 2A1.5 1.5 0 0 0 3 3.5v1A1.5 1.5 0 0 0 4.5 6h7A1.5 1.5 0 0 0 13 4.5v-1A1.5 1.5 0 0 0 11.5 2h-7zM5 4.5a.5.5 0 0 1-.5-.5.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5.5.5 0 0 1-.5.5h-1z" />
    <path d="M4.5 10A1.5 1.5 0 0 0 3 11.5v1A1.5 1.5 0 0 0 4.5 14h7a1.5 1.5 0 0 0 1.5-1.5v-1A1.5 1.5 0 0 0 11.5 10h-7zM10 11.5a.5.5 0 0 1 .5.5.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5.5.5 0 0 1 .5-.5h1z" />
  </svg>
);

export default ControlCenterIcon;