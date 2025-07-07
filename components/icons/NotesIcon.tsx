
import React from 'react';

const NotesIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 128 128"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path fill="#FFD478" d="M109.8 128H28.9c-8.8 0-15.9-7.1-15.9-15.9V15.9C13 7.1 20.1 0 28.9 0h61L109.8 19.8V128z" />
    <path fill="#F4B459" d="M89.9 0v19.8h19.9L89.9 0z" />
    <g fill="#D38C3B">
        <path d="M37.5 44.5h53v6h-53z" />
        <path d="M37.5 63.5h53v6h-53z" />
        <path d="M37.5 82.5h38v6h-38z" />
    </g>
  </svg>
);

export default NotesIcon;
