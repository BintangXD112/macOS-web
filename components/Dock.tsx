import React, { useRef, useState } from 'react';
import type { AppDefinition } from '../types';

interface DockProps {
  apps: AppDefinition[];
  openWindows: { appId: string; isMinimized: boolean }[];
  onAppClick: (appId: string) => void;
}

export const Dock: React.FC<DockProps> = ({ apps, openWindows, onAppClick }) => {
  const dockRef = useRef<HTMLDivElement>(null);
  const [mouseX, setMouseX] = useState<number | null>(null);

  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (dockRef.current) {
      setMouseX(e.clientX);
    }
  };

  const handleMouseLeave = () => {
    setMouseX(null);
  };

  const baseSize = 56; // Ukuran ikon dasar
  const maxMagnification = 1.8; // Pembesaran maksimal
  const magnificationRange = 100; // Jarak piksel untuk efek

  return (
    <div className="fixed bottom-2 left-1/2 -translate-x-1/2 z-40">
      <div
        ref={dockRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="flex items-end h-24 p-2 space-x-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl"
      >
        {apps.map((app, i) => {
          const isOpen = openWindows.some(w => w.appId === app.id && !w.isMinimized);
          
          let scale = 1;
          const ref = iconRefs.current[i];

          if (ref && mouseX !== null) {
            const iconRect = ref.getBoundingClientRect();
            const iconCenterX = iconRect.left + iconRect.width / 2;
            const distance = Math.abs(mouseX - iconCenterX);
            
            if (distance < magnificationRange) {
              const falloff = (magnificationRange - distance) / magnificationRange;
              scale = 1 + (maxMagnification - 1) * Math.cos(falloff * (Math.PI / 2));
            }
          }

          return (
            <div key={app.id} ref={el => { iconRefs.current[i] = el; }} className="relative flex flex-col items-center justify-end" style={{height: baseSize}}>
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-zinc-800 text-white text-sm rounded-md shadow-lg opacity-0 pointer-events-none transition-all duration-150 ease-out" style={{ transform: `scale(${scale * 0.7}) translateY(${-scale * 5}px)`, opacity: scale > 1.1 ? 1 : 0 }}>
                  {app.name}
                  <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-zinc-800"></div>
              </div>
              <button
                onClick={() => onAppClick(app.id)}
                className="cursor-pointer will-change-transform"
                style={{
                  width: `${baseSize * scale}px`,
                  height: `${baseSize * scale}px`,
                  transition: 'width 0.1s ease-out, height 0.1s ease-out',
                }}
              >
                {app.icon}
              </button>
              <div
                className={`w-1.5 h-1.5 bg-white/80 rounded-full mt-1 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
              ></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
