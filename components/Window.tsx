
import React, { useState, useRef, useEffect, useCallback } from 'react';
import type { WindowInstance } from '../types';

interface WindowProps {
  instance: WindowInstance;
  onClose: (id: string) => void;
  onFocus: (id: string) => void;
  onMinimize: (id: string) => void;
  onMaximize: (id: string) => void;
  children: React.ReactNode;
}

const Window: React.FC<WindowProps> = ({ instance, onClose, onFocus, onMinimize, onMaximize, children }) => {
  const [position, setPosition] = useState(instance.position);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  // Animasi close
  useEffect(() => {
    if (instance.isMinimized) setVisible(false);
    else setVisible(true);
  }, [instance.isMinimized]);

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('.window-control') || instance.isMaximized) {
      return;
    }
    onFocus(instance.id);
    setIsDragging(true);
    dragStartPos.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [instance.id, onFocus, position.x, position.y, instance.isMaximized]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setPosition({
      x: e.clientX - dragStartPos.current.x,
      y: e.clientY - dragStartPos.current.y,
    });
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  }, [handleMouseMove]);
  
  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);
  
  const buttonBaseStyle = "w-3.5 h-3.5 rounded-full border flex items-center justify-center group";
  const buttonIconStyle = "w-2 h-2 text-black opacity-0 group-hover:opacity-70 transition-opacity";

  return (
    <div
      ref={windowRef}
      className={`absolute bg-zinc-800/70 backdrop-blur-2xl border border-white/10 rounded-xl flex flex-col font-sf overflow-hidden transition-all duration-200
        ${visible ? 'animate-fade-in-desktop' : 'animate-fade-out-desktop'}
        ${isDragging ? 'opacity-80 shadow-2xl' : (instance.zIndex > 10 ? 'shadow-2xl' : 'shadow-xl')}
        ${instance.isMaximized ? 'ring-2 ring-blue-400' : ''}`}
      style={{
        ...(instance.isMaximized 
          ? { top: 35, right: 7, bottom: 85, left: 7, width: 'auto', height: 'auto', transform: 'none' } 
          : { top: `${position.y}px`, left: `${position.x}px`, width: `${instance.size.width}px`, height: `${instance.size.height}px` }),
        zIndex: instance.zIndex,
        display: instance.isMinimized ? 'none' : 'flex',
        transition: 'width 0.2s, height 0.2s, top 0.2s, left 0.2s, right 0.2s, bottom 0.2s',
      }}
      onMouseDown={() => onFocus(instance.id)}
    >
      <header
        className="h-9 flex-shrink-0 flex items-center px-3 border-b border-white/10"
        onMouseDown={handleMouseDown}
        style={{ cursor: isDragging ? 'grabbing' : (instance.isMaximized ? 'default' : 'grab') }}
        onDoubleClick={() => onMaximize(instance.id)}
      >
        <div className="flex items-center space-x-2 window-control">
          <button onClick={() => onClose(instance.id)} className={`${buttonBaseStyle} bg-red-500 border-red-600 hover:bg-red-400`}>
            <svg className={buttonIconStyle} stroke="currentColor" fill="none" viewBox="0 0 8 8">
              <path strokeLinecap="round" strokeWidth="1.2" d="M1 1l6 6m0-6L1 7" />
            </svg>
          </button>
          <button onClick={() => onMinimize(instance.id)} className={`${buttonBaseStyle} bg-yellow-500 border-yellow-600 hover:bg-yellow-400`}>
             <svg className={buttonIconStyle} stroke="currentColor" fill="none" viewBox="0 0 8 8">
              <path strokeLinecap="round" strokeWidth="1.2" d="M1 4h6" />
            </svg>
          </button>
          <button onClick={() => onMaximize(instance.id)} className={`${buttonBaseStyle} bg-green-500 border-green-600 hover:bg-green-400`}>
            <svg className={buttonIconStyle} stroke="currentColor" fill="none" viewBox="0 0 8 8">
              <path strokeLinecap="round" strokeWidth="1.2" d="M1.5 1.5h5v5h-5z" />
               <path strokeLinecap="round" strokeWidth="1.2" d="M3.5 1V3.5h-2.5" />
               <path strokeLinecap="round" strokeWidth="1.2" d="M4.5 7V4.5h2.5" />
            </svg>
          </button>
        </div>
        <div className="flex-1 text-center text-sm text-zinc-300 truncate pr-16">
          {instance.title}
        </div>
      </header>
      <main className="flex-1 overflow-hidden">
        {children}
      </main>
    </div>
  );
};

export default Window;
