
import React from 'react';

const Settings: React.FC = () => {
  const settingsItems = [
    { name: 'Tampilan', icon: '🖥️' },
    { name: 'Wallpaper', icon: '🏞️' },
    { name: 'Dock & Menu Bar', icon: '⬛' },
    { name: 'Suara', icon: '🔊' },
    { name: 'Jaringan', icon: '🌐' },
    { name: 'Bluetooth', icon: ' B '},
    { name: 'Papan Ketik', icon: '⌨️' },
    { name: 'Trackpad', icon: '🖱️' },
    { name: 'Pembaruan Perangkat Lunak', icon: '🔄' },
  ];

  return (
    <div className="h-full w-full flex bg-[#EFEFEF] font-sf">
      <div className="w-64 border-r bg-gray-100/50 p-4">
        <h2 className="font-bold text-lg mb-4">Pengaturan Sistem</h2>
        <ul>
          {settingsItems.map(item => (
            <li key={item.name} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-200 cursor-pointer">
              <span className="text-xl bg-gray-300 w-8 h-8 flex items-center justify-center rounded-md">{item.icon}</span>
              <span>{item.name}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold">Tampilan</h1>
        <div className="mt-6 p-6 bg-white rounded-lg border">
          <h3 className="font-semibold">Kecerahan</h3>
          <p className="text-sm text-gray-500 mb-2">Secara otomatis menyesuaikan kecerahan</p>
          <input type="range" className="w-full" />
          <div className="mt-6 border-t pt-6">
            <h3 className="font-semibold">Night Shift</h3>
            <p className="text-sm text-gray-500 mb-2">Menggeser warna layar Anda ke ujung spektrum yang lebih hangat di malam hari.</p>
            <button className="px-4 py-2 bg-gray-200 rounded-md">Jadwalkan...</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
