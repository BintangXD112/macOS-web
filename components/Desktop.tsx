
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
  const [renamingId, setRenamingId] = React.useState<string | null>(null);
  const [renameValue, setRenameValue] = React.useState('');
  const [selectedIds, setSelectedIds] = React.useState<string[]>([]);
  const [previewFile, setPreviewFile] = React.useState<typeof dummyFiles[0] | null>(null);
  const [removingId, setRemovingId] = React.useState<string | null>(null);

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

  // Context menu actions
  const handleRename = (fileId: string) => {
    const file = desktopFiles.find(f => f.id === fileId);
    if (file) {
      setRenamingId(fileId);
      setRenameValue(file.name);
      setContextMenu(null);
    }
  };
  const handleRenameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRenameValue(e.target.value);
  };
  const handleRenameSubmit = () => {
    setDesktopFiles(files => files.map(f => f.id === renamingId ? { ...f, name: renameValue } : f));
    setRenamingId(null);
  };
  const handleRenameBlur = () => {
    if (renamingId) handleRenameSubmit();
  };
  const handleRenameKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleRenameSubmit();
    if (e.key === 'Escape') setRenamingId(null);
  };
  const handleDelete = (fileId: string) => {
    setRemovingId(fileId);
    setContextMenu(null);
    setTimeout(() => {
      setDesktopFiles(files => files.filter(f => f.id !== fileId));
      setRemovingId(null);
    }, 200); // match fadeOut duration
  };
  const handleNewFolder = () => {
    const newId = Date.now().toString();
    setDesktopFiles(files => [
      ...files,
      { id: newId, name: 'Folder Baru', type: 'folder', icon: <div className="w-10 h-10 bg-blue-200 text-blue-700 flex items-center justify-center rounded shadow">📁</div> }
    ]);
    setTimeout(() => {
      setRenamingId(newId);
      setRenameValue('Folder Baru');
    }, 100);
    setContextMenu(null);
  };

  // Multi-select handler
  const handleIconClick = (e: React.MouseEvent, fileId: string, index: number) => {
    if (e.shiftKey && selectedIds.length > 0) {
      // Select range
      const lastIndex = desktopFiles.findIndex(f => f.id === selectedIds[selectedIds.length - 1]);
      const [start, end] = [lastIndex, index].sort((a, b) => a - b);
      const rangeIds = desktopFiles.slice(start, end + 1).map(f => f.id);
      setSelectedIds(Array.from(new Set([...selectedIds, ...rangeIds])));
    } else if (e.ctrlKey || e.metaKey) {
      // Toggle select
      setSelectedIds(ids => ids.includes(fileId) ? ids.filter(id => id !== fileId) : [...ids, fileId]);
    } else {
      // Single select
      setSelectedIds([fileId]);
    }
  };
  // Deselect all on click empty area
  const handleDesktopClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) setSelectedIds([]);
  };

  // Double click handler
  const handleIconDoubleClick = (file: typeof dummyFiles[0]) => {
    setPreviewFile(file);
  };
  const handleClosePreview = () => setPreviewFile(null);

  return (
    <div
      className="absolute inset-0 w-full h-full bg-cover bg-center select-none"
      style={{ backgroundImage: "url(https://images.unsplash.com/photo-1623951556363-3a42c4839840?q=80&w=2574&auto=format&fit=crop)" }}
      onContextMenu={e => handleContextMenu(e)}
      onClick={handleDesktopClick}
    >
      {/* Icon file/folder */}
      <div className="absolute left-6 top-6 flex flex-col gap-6">
        {desktopFiles.map((file, i) => (
          <div
            key={file.id}
            className={`flex flex-col items-center group cursor-pointer ${dragOverIndex === i && draggedIndex !== null && draggedIndex !== i ? 'ring-2 ring-blue-400' : ''} ${selectedIds.includes(file.id) ? 'ring-2 ring-blue-500 bg-blue-100/20' : ''} ${removingId === file.id ? 'animate-fade-out-desktop' : 'animate-fade-in-desktop'}`}
            style={{ opacity: draggedIndex === i ? 0.5 : 1, transition: 'opacity 0.2s' }}
            draggable
            onDragStart={() => handleDragStart(i)}
            onDragOver={e => { e.preventDefault(); handleDragOver(i); }}
            onDrop={() => handleDrop(i)}
            onDragEnd={handleDragEnd}
            onContextMenu={e => handleContextMenu(e, file.id)}
            onClick={e => handleIconClick(e, file.id, i)}
            onDoubleClick={() => handleIconDoubleClick(file)}
          >
            {file.icon}
            {renamingId === file.id ? (
              <input
                className="mt-1 text-xs px-2 py-0.5 rounded bg-white text-zinc-800 shadow outline-none border border-blue-400"
                value={renameValue}
                autoFocus
                onChange={handleRenameChange}
                onBlur={handleRenameBlur}
                onKeyDown={handleRenameKeyDown}
                style={{ width: 90 }}
              />
            ) : (
              <span className="mt-1 text-xs text-white bg-black/40 px-2 py-0.5 rounded group-hover:bg-white/80 group-hover:text-zinc-800 transition-colors shadow">
                {file.name}
              </span>
            )}
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
              <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleRename(contextMenu.fileId!)}>Rename</div>
              <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-600" onClick={() => handleDelete(contextMenu.fileId!)}>Delete</div>
            </>
          ) : (
            <>
              <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={handleNewFolder}>New Folder</div>
            </>
          )}
        </div>
      )}
      {/* Preview Modal */}
      {previewFile && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={handleClosePreview}>
          <div className="bg-white rounded-xl shadow-2xl p-8 min-w-[300px] min-h-[180px] relative animate-fade-in-down" onClick={e => e.stopPropagation()}>
            <button className="absolute top-2 right-2 text-zinc-400 hover:text-red-500 text-xl" onClick={handleClosePreview}>&times;</button>
            <div className="flex flex-col items-center gap-4">
              {previewFile.icon}
              <div className="text-lg font-bold text-zinc-800">{previewFile.name}</div>
              <div className="text-sm text-zinc-500">
                {previewFile.type === 'file' && 'Ini adalah file dokumen.'}
                {previewFile.type === 'folder' && 'Ini adalah folder.'}
                {previewFile.type === 'app' && 'Ini adalah aplikasi.'}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Desktop;
