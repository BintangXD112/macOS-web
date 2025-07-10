import React, { useState, useEffect } from 'react';
import type { Menu } from '../types';
import AppleLogoIcon from './icons/AppleLogoIcon';
import ControlCenterIcon from './icons/ControlCenterIcon';
import WifiIcon from './icons/control-center/WifiIcon';
import VolumeIcon from './icons/control-center/VolumeIcon';
// (Baterai icon bisa dibuat placeholder SVG sederhana)

interface MenuBarProps {
  appName: string;
  menus: Menu[];
  onToggleControlCenter: () => void;
}

const MenuBar: React.FC<MenuBarProps> = ({ appName, menus, onToggleControlCenter }) => {
  const [time, setTime] = useState(new Date());
  const [appleMenuOpen, setAppleMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  useEffect(() => {
    const timerId = setInterval(() => setTime(new Date()), 1000 * 60); // Update every minute
    return () => clearInterval(timerId);
  }, []);

  const formatTime = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    };
    return new Intl.DateTimeFormat('id-ID', options).format(date).replace(/\./g, ':');
  };

  return (
    <div className="fixed top-0 left-0 right-0 h-7 bg-black/20 backdrop-blur-xl text-white text-sm flex items-center justify-between px-4 z-50 font-sf select-none">
      <div className="flex items-center space-x-4 relative">
        <div className="relative">
          <button
            className="h-full flex items-center px-2 hover:bg-white/20 rounded-sm"
            onClick={() => setAppleMenuOpen((v) => !v)}
            onBlur={() => setTimeout(() => setAppleMenuOpen(false), 100)}
          >
            <AppleLogoIcon className="h-4 w-4 opacity-90" />
          </button>
          {appleMenuOpen && (
            <div className="absolute left-0 mt-1 w-48 bg-white text-black rounded shadow-lg py-1 animate-fade-in-down z-50">
              <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">About This Mac</div>
              <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">System Preferences...</div>
              <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">App Store...</div>
              <div className="border-t my-1" />
              <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Sleep</div>
              <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Restart...</div>
              <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Shut Down...</div>
              <div className="border-t my-1" />
              <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-600">Log Out</div>
            </div>
          )}
        </div>
        <span className="font-bold">{appName}</span>
        {menus.map((menu) => (
          <div key={menu.name} className="relative inline-block">
            <span
              className={`px-2 cursor-default hover:bg-white/20 rounded-sm ${activeMenu === menu.name ? 'bg-white/30' : ''}`}
              onMouseEnter={() => setActiveMenu(menu.name)}
              onMouseLeave={() => setActiveMenu(null)}
            >
              {menu.name}
            </span>
            {activeMenu === menu.name && menu.items && (
              <div className="absolute left-0 mt-1 w-44 bg-white text-black rounded shadow-lg py-1 animate-fade-in-down z-50">
                {menu.items.map((item) => (
                  <div key={item} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">{item}</div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="flex items-center space-x-4">
        {/* Placeholder status icons */}
        <WifiIcon className="h-4 w-4 opacity-80" />
        {/* Battery icon mirip macOS */}
        <svg width="20" height="20" viewBox="0 0 20 20" className="opacity-80">
          <rect x="3" y="7" width="13" height="6" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5"/>
          <rect x="16" y="9" width="1.5" height="2" rx="0.5" fill="currentColor" />
          <rect x="5" y="9" width="7" height="2" rx="1" fill="currentColor" />
        </svg>
        <VolumeIcon className="h-4 w-4 opacity-80" />
        <button onClick={onToggleControlCenter} className="h-full flex items-center px-1.5 hover:bg-white/20 rounded-sm">
          <ControlCenterIcon className="h-5 w-5 opacity-90"/>
        </button>
        <span>{formatTime(time)}</span>
      </div>
    </div>
  );
};

export default MenuBar;