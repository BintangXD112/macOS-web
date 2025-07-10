import React from 'react';
import type { WindowInstance } from '../types';

interface MissionControlProps {
  windows: WindowInstance[];
  desktops: number;
  activeDesktop: number;
  onClose: () => void;
  onSwitchDesktop: (idx: number) => void;
}

const MissionControl: React.FC<MissionControlProps> = ({ windows, desktops, activeDesktop, onClose, onSwitchDesktop }) => {
  return (
    <div className="fixed inset-0 bg-black/60 z-[999] flex flex-col items-center justify-center animate-fade-in-down">
      <button className="absolute top-6 right-10 text-white text-3xl hover:text-red-400" onClick={onClose}>&times;</button>
      <div className="flex gap-8 items-center">
        {[...Array(desktops)].map((_, dIdx) => (
          <div key={dIdx} className={`rounded-2xl border-4 ${activeDesktop === dIdx ? 'border-blue-400' : 'border-white/30'} bg-zinc-900/80 shadow-2xl p-4 min-w-[340px] min-h-[200px] flex flex-col items-center transition-all`}>
            <div className="mb-2 text-white/80 text-xs">Desktop {dIdx + 1}</div>
            <div className="flex flex-wrap gap-2 justify-center items-center">
              {windows.filter(w => w.desktop === dIdx).map(w => (
                <div key={w.id} className="bg-white/80 rounded-lg shadow p-2 w-32 h-20 flex items-center justify-center text-xs text-zinc-800 border border-zinc-300 cursor-pointer hover:scale-105 transition-transform">
                  {w.title}
                </div>
              ))}
            </div>
            <button className="mt-4 px-3 py-1 text-xs rounded bg-blue-500 text-white hover:bg-blue-600" onClick={() => onSwitchDesktop(dIdx)}>Switch</button>
          </div>
        ))}
        <button className="rounded-full w-12 h-12 bg-white/20 text-white text-3xl flex items-center justify-center hover:bg-white/40 transition" onClick={() => onSwitchDesktop(desktops)} title="Add Desktop">+</button>
      </div>
    </div>
  );
};

export default MissionControl; 