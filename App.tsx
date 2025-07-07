import React, { useState, useCallback, useMemo } from 'react';
import type { AppDefinition, WindowInstance, Menu } from './types';
import Desktop from './components/Desktop';
import MenuBar from './components/MenuBar';
import { Dock } from './components/Dock';
import Window from './components/Window';
import ControlCenter from './components/ControlCenter';

// Icons
import FinderIcon from './components/icons/FinderIcon';
import NotesIcon from './components/icons/NotesIcon';
import GeminiIcon from './components/icons/GeminiIcon';
import VscodeIcon from './components/icons/VscodeIcon';
import SafariIcon from './components/icons/SafariIcon';
import SettingsIcon from './components/icons/SettingsIcon';
import CalculatorIcon from './components/icons/CalculatorIcon';
import CalendarIcon from './components/icons/CalendarIcon';

// Apps
import Finder from './apps/Welcome';
import Notes from './apps/Notes';
import GeminiChat from './apps/GeminiChat';
import Vscode from './apps/Vscode';
import Browser from './apps/Browser';
import Settings from './apps/Settings';
import Calculator from './apps/Calculator';
import Calendar from './apps/Calendar';


const APPS: AppDefinition[] = [
  { id: 'finder', name: 'Finder', icon: <FinderIcon />, component: Finder, defaultSize: { width: 600, height: 400 } },
  { id: 'browser', name: 'Browser', icon: <SafariIcon />, component: Browser, defaultSize: { width: 1024, height: 768 } },
  { id: 'gemini', name: 'Gemini Chat', icon: <GeminiIcon />, component: GeminiChat, defaultSize: { width: 500, height: 650 } },
  { id: 'vscode', name: 'VS Code', icon: <VscodeIcon />, component: Vscode, defaultSize: { width: 900, height: 600 } },
  { id: 'notes', name: 'Notes', icon: <NotesIcon />, component: Notes, defaultSize: { width: 450, height: 550 } },
  { id: 'calculator', name: 'Kalkulator', icon: <CalculatorIcon />, component: Calculator, defaultSize: { width: 320, height: 500 } },
  { id: 'calendar', name: 'Kalender', icon: <CalendarIcon />, component: Calendar, defaultSize: { width: 800, height: 600 } },
  { id: 'settings', name: 'Pengaturan', icon: <SettingsIcon />, component: Settings, defaultSize: { width: 700, height: 500 } },
];

const FINDER_MENU: Menu[] = [
    { name: 'File', items: [] },
    { name: 'Edit', items: [] },
    { name: 'View', items: [] },
    { name: 'Go', items: [] },
    { name: 'Window', items: [] },
    { name: 'Help', items: [] },
];

APPS.forEach(app => {
    if (app.id === 'finder') {
        app.menu = FINDER_MENU;
    }
    if (!app.menu) {
        app.menu = [
            { name: 'File', items: [] },
            { name: 'Edit', items: [] },
            { name: 'Window', items: [] },
            { name: 'Help', items: [] },
        ];
    }
});


const App: React.FC = () => {
  const [windows, setWindows] = useState<WindowInstance[]>([]);
  const [nextZIndex, setNextZIndex] = useState(10);
  const [activeAppId, setActiveAppId] = useState<string | null>(null);
  const [isControlCenterOpen, setIsControlCenterOpen] = useState(false);

  const toggleControlCenter = useCallback(() => {
    setIsControlCenterOpen(prev => !prev);
  }, []);

  const openApp = useCallback((appId: string) => {
    const app = APPS.find(a => a.id === appId);
    if (!app) return;
    
    setIsControlCenterOpen(false); // Close control center when an app is opened

    setWindows(prevWindows => {
      const existingWindowIndex = prevWindows.findIndex(w => w.appId === appId);
      const newZIndex = nextZIndex + 1;
      
      setActiveAppId(appId);
      setNextZIndex(newZIndex);

      if (existingWindowIndex > -1) {
        return prevWindows.map((w, index) => 
            index === existingWindowIndex ? { ...w, zIndex: newZIndex, isMinimized: false, isMaximized: w.isMaximized } : w
        );
      } else {
        const newWindow: WindowInstance = {
          id: `${appId}-${Date.now()}`,
          appId: app.id,
          title: app.name,
          position: { x: Math.random() * 200 + 150, y: Math.random() * 100 + 100 },
          size: app.defaultSize,
          zIndex: newZIndex,
          isMinimized: false,
          isMaximized: false,
        };
        return [...prevWindows, newWindow];
      }
    });
  }, [nextZIndex]);

  const closeWindow = (id: string) => {
    setWindows(prev => prev.filter(w => w.id !== id));
    const remainingWindows = windows.filter(w => w.id !== id);
    if (remainingWindows.length === 0) {
      setActiveAppId(null);
    } else {
       const topWindow = remainingWindows.reduce((prev, current) => (prev.zIndex > current.zIndex) ? prev : current);
       setActiveAppId(topWindow.appId);
    }
  };

  const focusWindow = (id: string) => {
    const windowToFocus = windows.find(w => w.id === id);
    if (!windowToFocus) return;

    setIsControlCenterOpen(false); // Close control center when a window is focused
    setActiveAppId(windowToFocus.appId);
    
    if (windowToFocus.zIndex === nextZIndex) return;

    const newZIndex = nextZIndex + 1;
    setNextZIndex(newZIndex);

    setWindows(prev => prev.map(w => (w.id === id ? { ...w, zIndex: newZIndex, isMinimized: false } : w)));
  };
  
  const maximizeWindow = (id: string) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isMaximized: !w.isMaximized } : w));
    focusWindow(id);
  }

  const minimizeWindow = (id: string) => {
    setWindows(prev => prev.map(w => (w.id === id ? { ...w, isMinimized: true } : w)));
    const remainingWindows = windows.filter(w => w.id !== id && !w.isMinimized);
     if (remainingWindows.length === 0) {
      setActiveAppId(null);
    } else {
       const topWindow = remainingWindows.reduce((prev, current) => (prev.zIndex > current.zIndex) ? prev : current);
       setActiveAppId(topWindow.appId);
    }
  };

  const activeApp = useMemo(() => APPS.find(app => app.id === activeAppId), [activeAppId]);
  const currentMenu = activeApp?.menu || FINDER_MENU;
  const currentAppName = activeApp?.name || 'Finder';

  return (
    <div className="w-screen h-screen antialiased">
      <Desktop>
        {windows.map(win => {
          const AppToRender = APPS.find(app => app.id === win.appId)?.component;
          return AppToRender ? (
            <Window
              key={win.id}
              instance={win}
              onClose={closeWindow}
              onFocus={focusWindow}
              onMinimize={minimizeWindow}
              onMaximize={maximizeWindow}
            >
              <AppToRender />
            </Window>
          ) : null;
        })}
      </Desktop>
      <MenuBar 
        appName={currentAppName} 
        menus={currentMenu} 
        onToggleControlCenter={toggleControlCenter}
      />
      <ControlCenter isOpen={isControlCenterOpen} />
      <Dock 
        apps={APPS} 
        openWindows={windows.map(w => ({ appId: w.appId, isMinimized: w.isMinimized }))}
        onAppClick={openApp} 
      />
    </div>
  );
};

export default App;