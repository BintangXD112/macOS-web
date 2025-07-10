import React, { useState } from 'react';

const dummyPhotos = [
  { id: '1', url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400', caption: 'Pemandangan' },
  { id: '2', url: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=400', caption: 'Gunung' },
  { id: '3', url: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400', caption: 'Danau' },
];

const Photos: React.FC = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const photo = dummyPhotos.find(p => p.id === preview);

  return (
    <div className="h-full w-full bg-white font-sf p-8">
      <h1 className="text-2xl font-bold mb-6">Photos</h1>
      <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
        {dummyPhotos.map(p => (
          <div key={p.id} className="rounded-lg overflow-hidden shadow cursor-pointer hover:scale-105 transition-transform" onClick={() => setPreview(p.id)}>
            <img src={p.url} alt={p.caption} className="w-full h-32 object-cover" />
            <div className="bg-white/80 text-zinc-700 text-center py-1 text-sm">{p.caption}</div>
          </div>
        ))}
      </div>
      {photo && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={() => setPreview(null)}>
          <div className="bg-white rounded-xl shadow-2xl p-6 min-w-[320px] min-h-[220px] relative animate-fade-in-down" onClick={e => e.stopPropagation()}>
            <button className="absolute top-2 right-2 text-zinc-400 hover:text-red-500 text-xl" onClick={() => setPreview(null)}>&times;</button>
            <img src={photo.url} alt={photo.caption} className="w-full h-48 object-cover rounded mb-3" />
            <div className="text-lg font-bold text-zinc-800 text-center">{photo.caption}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Photos; 