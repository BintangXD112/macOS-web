
import React from 'react';
import FinderIcon from '../components/icons/FinderIcon';

const Finder: React.FC = () => {
  return (
    <div className="flex flex-col h-full text-white bg-zinc-800/80 backdrop-blur-xl font-sf">
        <div className="p-10 flex-grow flex flex-col items-center justify-center text-center">
             <div className="w-48 h-48">
                 <FinderIcon />
             </div>
             <h1 className="text-4xl font-bold mt-4">Finder</h1>
             <p className="text-zinc-300">macOS Web v2.0</p>
             <p className="text-zinc-400 mt-2 text-sm">Ini adalah jantung dari macOS Web Anda.</p>
        </div>
        <div className="p-4 border-t border-white/10 text-xs text-zinc-400">
            <p>Untuk memulai, buka aplikasi dari Dock di bawah.</p>
        </div>
    </div>
  );
};

export default Finder;
