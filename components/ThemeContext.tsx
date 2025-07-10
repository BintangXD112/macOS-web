import React, { createContext, useContext, useState } from 'react';

interface ThemeContextProps {
  darkMode: boolean;
  setDarkMode: (v: boolean) => void;
  wallpaper: string;
  setWallpaper: (url: string) => void;
}

const defaultWallpaper = "https://images.unsplash.com/photo-1623951556363-3a42c4839840?q=80&w=2574&auto=format&fit=crop";

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [wallpaper, setWallpaper] = useState(defaultWallpaper);
  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode, wallpaper, setWallpaper }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}; 