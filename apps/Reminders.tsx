import React, { useState } from 'react';

const dummyReminders = [
  { id: '1', text: 'Cek email dari Apple', done: false },
  { id: '2', text: 'Meeting jam 3 sore', done: true },
  { id: '3', text: 'Upload foto ke Photos', done: false },
];

const Reminders: React.FC = () => {
  const [reminders, setReminders] = useState(dummyReminders);

  const toggle = (id: string) => {
    setReminders(reminders => reminders.map(r => r.id === id ? { ...r, done: !r.done } : r));
  };

  return (
    <div className="h-full w-full bg-white font-sf flex flex-col items-center p-8">
      <h1 className="text-2xl font-bold mb-6">Reminders</h1>
      <div className="w-full max-w-md flex flex-col gap-3">
        {reminders.map(r => (
          <label key={r.id} className="flex items-center gap-3 p-3 rounded-lg bg-zinc-100 hover:bg-blue-50 cursor-pointer">
            <input type="checkbox" checked={r.done} onChange={() => toggle(r.id)} className="w-5 h-5 accent-blue-500" />
            <span className={`text-lg ${r.done ? 'line-through text-zinc-400' : 'text-zinc-800'}`}>{r.text}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default Reminders; 