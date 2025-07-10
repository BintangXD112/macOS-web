import React, { useState } from 'react';

const dummyMails = [
  { id: '1', from: 'Apple', subject: 'Welcome to macOS Web!', body: 'Terima kasih telah mencoba aplikasi Mail di macOS Web.' },
  { id: '2', from: 'Reminders', subject: 'Jangan lupa meeting jam 3!', body: 'Ini adalah pengingat untuk meeting sore ini.' },
  { id: '3', from: 'Photos', subject: 'Foto baru telah diunggah', body: 'Lihat koleksi foto terbaru Anda di aplikasi Photos.' },
];

const Mail: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string | null>(dummyMails[0].id);
  const selectedMail = dummyMails.find(m => m.id === selectedId);

  return (
    <div className="h-full w-full flex bg-white font-sf">
      {/* Sidebar */}
      <div className="w-48 bg-zinc-100 border-r p-4 flex flex-col gap-2">
        <div className="font-bold text-lg mb-4">Mailboxes</div>
        <button className="text-left px-2 py-1 rounded hover:bg-blue-100">Inbox</button>
        <button className="text-left px-2 py-1 rounded hover:bg-blue-100">Sent</button>
        <button className="text-left px-2 py-1 rounded hover:bg-blue-100">Drafts</button>
        <button className="text-left px-2 py-1 rounded hover:bg-blue-100">Trash</button>
      </div>
      {/* Mail List */}
      <div className="w-72 bg-zinc-50 border-r p-4 overflow-y-auto">
        <div className="font-semibold text-zinc-700 mb-2">Inbox</div>
        {dummyMails.map(mail => (
          <div
            key={mail.id}
            className={`p-2 rounded cursor-pointer mb-2 ${selectedId === mail.id ? 'bg-blue-100' : 'hover:bg-zinc-200'}`}
            onClick={() => setSelectedId(mail.id)}
          >
            <div className="font-bold text-sm text-blue-700">{mail.from}</div>
            <div className="text-zinc-800">{mail.subject}</div>
          </div>
        ))}
      </div>
      {/* Mail Preview */}
      <div className="flex-1 p-8 overflow-y-auto">
        {selectedMail ? (
          <>
            <div className="text-xs text-zinc-400 mb-2">From: {selectedMail.from}</div>
            <div className="text-xl font-bold mb-2">{selectedMail.subject}</div>
            <div className="text-zinc-700 leading-relaxed">{selectedMail.body}</div>
          </>
        ) : (
          <div className="text-zinc-400">Pilih email untuk melihat isi.</div>
        )}
      </div>
    </div>
  );
};

export default Mail; 