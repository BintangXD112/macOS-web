
import React from 'react';

const VscodeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 128 128"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path fill="#007ACC" d="M113.9,16.4l-35.2-12c-2.9-1-6-1-8.9,0L34.6,16.4c-4.2,1.4-7.2,5.3-7.2,9.8v75.5c0,4.5,3,8.4,7.2,9.8l35.2,12c2.9,1,6,1,8.9,0l35.2-12c4.2-1.4,7.2-5.3,7.2-9.8V26.2C121.1,21.7,118.1,17.8,113.9,16.4z M87,97.9L51.8,75.1c-1.8-1.1-1.8-3.6,0-4.7L87,47.6V97.9z"/>
    <path fill="#0062A1" d="M41,97.9V47.6l35.2,22.8c1.8,1.1,1.8,3.6,0,4.7L41,97.9z M87,29.3l-26.4,17l-26.3-17L64,12.8L87,29.3z"/>
  </svg>
);

export default VscodeIcon;
