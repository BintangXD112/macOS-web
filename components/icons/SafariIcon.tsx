
import React from 'react';

const SafariIcon: React.FC<{ className?: string }> = ({ className }) => (
<svg
  viewBox="0 0 128 128"
  xmlns="http://www.w3.org/2000/svg"
  className={className}
>
  <circle cx="64" cy="64" r="56" fill="#FFFFFF" />
  <circle cx="64" cy="64" r="50" fill="#42A5F5" />
  <path
    fill="#FFFFFF"
    d="M64,24l-3.2,16.8L44,37.6l9.6,14.4-16.8,3.2L40,64l-3.2,16.8,16.8,3.2L44,93.6,60.8,84l3.2,16.8,3.2-16.8L84,93.6,74.4,78.4l16.8-3.2L88,64l3.2-16.8-16.8-3.2L84,37.6,67.2,47.2,64,24Z"
  />
  <polygon fill="#E53935" points="80,48 48,80 64,64" />
  <circle cx="64" cy="64" r="8" fill="#FFFFFF" />
</svg>
);

export default SafariIcon;
