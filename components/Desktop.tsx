
import React from 'react';

interface DesktopProps {
    children: React.ReactNode;
}

const Desktop: React.FC<DesktopProps> = ({ children }) => {
  return (
    <div 
      className="absolute inset-0 w-full h-full bg-cover bg-center" 
      style={{ backgroundImage: "url(https://images.unsplash.com/photo-1623951556363-3a42c4839840?q=80&w=2574&auto=format&fit=crop)" }}
    >
      {children}
    </div>
  );
};

export default Desktop;
