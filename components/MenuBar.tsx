import React, { useState, useEffect } from 'react';
import type { Menu } from '../types';
import AppleLogoIcon from './icons/AppleLogoIcon';
import ControlCenterIcon from './icons/ControlCenterIcon';

interface MenuBarProps {
  appName: string;
  menus: Menu[];
  onToggleControlCenter: () => void;
}

const MenuBar: React.FC<MenuBarProps> = ({ appName, menus, onToggleControlCenter }) => {
  const [time, setTime] = useState(new Date());

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
    <div className="fixed top-0 left-0 right-0 h-7 bg-black/20 backdrop-blur-xl text-white text-sm flex items-center justify-between px-4 z-50 font-sf">
      <div className="flex items-center space-x-4">
        <button className="h-full flex items-center px-2 hover:bg-white/20 rounded-sm">
          <AppleLogoIcon className="h-4 w-4 opacity-90" />
        </button>
        <span className="font-bold">{appName}</span>
        {menus.map((menu) => (
            <span key={menu.name} className="px-2 cursor-default hover:bg-white/20 rounded-sm">{menu.name}</span>
        ))}
      </div>
      <div className="flex items-center space-x-4">
        <button onClick={onToggleControlCenter} className="h-full flex items-center px-1.5 hover:bg-white/20 rounded-sm">
          <ControlCenterIcon className="h-5 w-5 opacity-90"/>
        </button>
        <span>{formatTime(time)}</span>
      </div>
    </div>
  );
};

export default MenuBar;