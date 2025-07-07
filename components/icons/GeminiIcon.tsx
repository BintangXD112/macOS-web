
import React from 'react';

const GeminiIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 128 128"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#4285F4', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#9B72F9', stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#9B72F9', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#F472B6', stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <path
      fill="url(#grad1)"
      d="M64,8A56,56,0,1,0,120,64,56.06,56.06,0,0,0,64,8ZM42.7,93.3a8,8,0,1,1,8-8A8,8,0,0,1,42.7,93.3Z"
    />
    <path
      fill="url(#grad2)"
      d="M93.3,42.7a8,8,0,1,1-8-8A8,8,0,0,1,93.3,42.7ZM64,48a16,16,0,1,1-16,16A16,16,0,0,1,64,48Z"
    />
  </svg>
);

export default GeminiIcon;
