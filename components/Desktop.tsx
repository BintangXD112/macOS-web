
import React from 'react';
import FinderIcon from './icons/FinderIcon';
import NotesIcon from './icons/NotesIcon';

interface DesktopProps {
    children: React.ReactNode;
}

const dummyFiles = [
  { id: '1', name: 'Finder', type: 'app', icon: <FinderIcon className="w-10 h-10" /> },
  { id: '2', name: 'Notes', type: 'app', icon: <NotesIcon className="w-10 h-10" /> },
  { id: '3', name: 'Dokumen.txt', type: 'file', icon: <div className="w-10 h-10 bg-white text-zinc-700 flex items-center justify-center rounded shadow">TXT</div> },
  { id: '4', name: 'Folder Baru', type: 'folder', icon: <div className="w-10 h-10 bg-blue-200 text-blue-700 flex items-center justify-center rounded shadow">📁</div> },
];

const Desktop: React.FC<DesktopProps> = ({ children }) => {
  const [contextMenu, setContextMenu] = React.useState<{ x: number; y: number; fileId?: string } | null>(null);
  const [desktopFiles, setDesktopFiles] = React.useState(dummyFiles);
  const [draggedIndex, setDraggedIndex] = React.useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = React.useState<number | null>(null);

  const handleContextMenu = (e: React.MouseEvent, fileId?: string) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY, fileId });
  };
  const handleCloseContextMenu = () => setContextMenu(null);

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };
  const handleDragOver = (index: number) => {
    setDragOverIndex(index);
  };
  const handleDrop = (index: number) => {
    if (draggedIndex === null || draggedIndex === index) return;
    const newFiles = [...desktopFiles];
    const [removed] = newFiles.splice(draggedIndex, 1);
    newFiles.splice(index, 0, removed);
    setDesktopFiles(newFiles);
    setDraggedIndex(null);
    setDragOverIndex(null);
  };
  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  return (
    <div
      className="absolute inset-0 w-full h-full bg-cover bg-center select-none"
      style={{ backgroundImage: "url(https://images.unsplash.com/photo-1623951556363-3a42c4839840?q=80&w=2574&auto=format&fit=crop)" }}
      onContextMenu={e => handleContextMenu(e)}
    >
      {/* Icon file/folder */}
      <div className="absolute left-6 top-6 flex flex-col gap-6">
        {desktopFiles.map((file, i) => (
          <div
            key={file.id}
            className={`flex flex-col items-center group cursor-pointer ${dragOverIndex === i && draggedIndex !== null && draggedIndex !== i ? 'ring-2 ring-blue-400' : ''}`}
            style={{ opacity: draggedIndex === i ? 0.5 : 1, transition: 'opacity 0.2s' }}
            draggable
            onDragStart={() => handleDragStart(i)}
            onDragOver={e => { e.preventDefault(); handleDragOver(i); }}
            onDrop={() => handleDrop(i)}
            onDragEnd={handleDragEnd}
            onContextMenu={e => handleContextMenu(e, file.id)}
          >
            {file.icon}
            <span className="mt-1 text-xs text-white bg-black/40 px-2 py-0.5 rounded group-hover:bg-white/80 group-hover:text-zinc-800 transition-colors shadow">
              {file.name}
            </span>
          </div>
        ))}
      </div>
      {children}
      {/* Context Menu */}
      {contextMenu && (
        <div
          className="fixed z-50 bg-white text-black rounded shadow-lg py-1 w-44 animate-fade-in-down"
          style={{ left: contextMenu.x, top: contextMenu.y }}
          onMouseLeave={handleCloseContextMenu}
        >
          {contextMenu.fileId ? (
            <>
              <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Open</div>
              <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Rename</div>
              <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-600">Delete</div>
            </>
          ) : (
            <>
              <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">New Folder</div>
              <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Paste</div>
              <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Change Wallpaper</div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Desktop;
