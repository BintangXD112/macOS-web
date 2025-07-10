import React, { useState, useRef, useEffect } from 'react';

interface SpotlightProps {
  open: boolean;
  onClose: () => void;
  onOpenApp: (appId: string) => void;
  apps: { id: string; name: string; icon: React.ReactNode }[];
}

const Spotlight: React.FC<SpotlightProps> = ({ open, onClose, onOpenApp, apps }) => {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setQuery('');
      setSelected(0);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowDown') setSelected(s => Math.min(s + 1, filtered.length - 1));
      if (e.key === 'ArrowUp') setSelected(s => Math.max(s - 1, 0));
      if (e.key === 'Enter' && filtered[selected]) {
        onOpenApp(filtered[selected].id);
        onClose();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, filtered, selected]);

  const filtered = apps.filter(a => a.name.toLowerCase().includes(query.toLowerCase()));

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[9999] bg-black/30 flex items-start justify-center pt-32 animate-fade-in-down" onClick={onClose}>
      <div className="bg-white/90 rounded-2xl shadow-2xl w-[420px] p-4 flex flex-col gap-2" onClick={e => e.stopPropagation()}>
        <input
          ref={inputRef}
          className="w-full px-4 py-2 rounded-lg bg-white text-zinc-800 text-lg outline-none border border-blue-300 focus:border-blue-500 shadow"
          placeholder="Search apps..."
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <div className="mt-2 flex flex-col gap-1 max-h-72 overflow-y-auto">
          {filtered.length === 0 && <div className="text-zinc-400 text-center py-4">No results</div>}
          {filtered.map((app, i) => (
            <div
              key={app.id}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors ${i === selected ? 'bg-blue-500 text-white' : 'hover:bg-blue-100'}`}
              onClick={() => { onOpenApp(app.id); onClose(); }}
              onMouseEnter={() => setSelected(i)}
            >
              <span className="w-8 h-8 flex items-center justify-center">{app.icon}</span>
              <span className="font-medium">{app.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Spotlight; 