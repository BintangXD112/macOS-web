import React, { useRef, useState } from 'react';
import type { AppDefinition } from '../types';

interface DockProps {
  apps: AppDefinition[];
  openWindows: { appId: string; isMinimized: boolean }[];
  onAppClick: (appId: string) => void;
}

// Tambahkan SVG TrashIcon sederhana di bawah ini
function TrashIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} width={32} height={32}>
      <rect x="5" y="7" width="14" height="12" rx="2" fill="#fff" stroke="#888" />
      <path d="M3 7h18" stroke="#888" />
      <path d="M10 11v4M14 11v4" stroke="#888" />
      <rect x="9" y="3" width="6" height="3" rx="1.5" fill="#eee" stroke="#888" />
    </svg>
  );
}

export const Dock: React.FC<DockProps> = ({ apps, openWindows, onAppClick }) => {
  const dockRef = useRef<HTMLDivElement>(null);
  const [mouseX, setMouseX] = useState<number | null>(null);

  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [bouncing, setBouncing] = useState<{ [appId: string]: boolean }>({});
  const [dockApps, setDockApps] = useState(apps);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; appId: string } | null>(null);
  const [trashMenu, setTrashMenu] = useState<{ x: number; y: number } | null>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (dockRef.current) {
      setMouseX(e.clientX);
    }
  };

  const handleMouseLeave = () => {
    setMouseX(null);
  };

  const handleAppClick = (appId: string) => {
    setBouncing(prev => ({ ...prev, [appId]: true }));
    setTimeout(() => setBouncing(prev => ({ ...prev, [appId]: false })), 600);
    onAppClick(appId);
  };

  const handleContextMenu = (e: React.MouseEvent, appId: string) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY, appId });
  };

  const handleCloseContextMenu = () => {
    setContextMenu(null);
  };

  const handleTrashContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setTrashMenu({ x: e.clientX, y: e.clientY });
  };
  const handleCloseTrashMenu = () => setTrashMenu(null);

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (index: number) => {
    setDragOverIndex(index);
  };

  const handleDrop = (index: number) => {
    if (draggedIndex === null || draggedIndex === index) return;
    const newApps = [...dockApps];
    const [removed] = newApps.splice(draggedIndex, 1);
    newApps.splice(index, 0, removed);
    setDockApps(newApps);
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
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
        {dockApps.map((app, i) => {
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
            <div
              key={app.id}
              ref={el => { iconRefs.current[i] = el; }}
              className={`relative flex flex-col items-center justify-end ${dragOverIndex === i && draggedIndex !== null && draggedIndex !== i ? 'ring-2 ring-blue-400' : ''}`}
              style={{height: baseSize, opacity: draggedIndex === i ? 0.5 : 1, transition: 'opacity 0.2s'}}
              draggable
              onDragStart={() => handleDragStart(i)}
              onDragOver={e => { e.preventDefault(); handleDragOver(i); }}
              onDrop={() => handleDrop(i)}
              onDragEnd={handleDragEnd}
              onContextMenu={e => handleContextMenu(e, app.id)}
            >
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-zinc-800 text-white text-sm rounded-md shadow-lg opacity-0 pointer-events-none transition-all duration-150 ease-out" style={{ transform: `scale(${scale * 0.7}) translateY(${-scale * 5}px)`, opacity: scale > 1.1 ? 1 : 0 }}>
                  {app.name}
                  <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-zinc-800"></div>
              </div>
              <button
                onClick={() => handleAppClick(app.id)}
                className={`cursor-pointer will-change-transform ${bouncing[app.id] ? 'animate-bounce-dock' : ''}`}
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
        {/* Divider */}
        <div className="w-2 h-10 mx-2 bg-white/30 rounded-full" />
        {/* Trash Icon */}
        <div
          className="relative flex flex-col items-center justify-end group"
          style={{ height: 56 }}
          onContextMenu={handleTrashContextMenu}
        >
          <button
            className="cursor-pointer hover:scale-110 transition-transform"
            style={{ width: 56, height: 56 }}
          >
            <TrashIcon className="w-8 h-8 text-zinc-300 group-hover:text-red-500 transition-colors" />
          </button>
        </div>
      </div>
      {/* Trash Context Menu */}
      {trashMenu && (
        <div
          className="fixed z-50 bg-white text-black rounded shadow-lg py-1 w-40 animate-fade-in-down"
          style={{ left: trashMenu.x, top: trashMenu.y }}
          onMouseLeave={handleCloseTrashMenu}
        >
          <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-600" onClick={handleCloseTrashMenu}>Empty Trash</div>
        </div>
      )}
      {/* Context Menu aplikasi tetap di bawah ini */}
      {contextMenu && (
        <div
          className="fixed z-50 bg-white text-black rounded shadow-lg py-1 w-40 animate-fade-in-down"
          style={{ left: contextMenu.x, top: contextMenu.y }}
          onMouseLeave={handleCloseContextMenu}
        >
          <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={handleCloseContextMenu}>Show in Finder</div>
          <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-600" onClick={handleCloseContextMenu}>Quit</div>
        </div>
      )}
    </div>
  );
};
