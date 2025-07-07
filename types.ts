
import React from 'react';

export interface MenuItem {
  name: string;
  action?: () => void;
  separator?: boolean;
}

export interface Menu {
  name:string;
  items: MenuItem[];
}

export interface AppDefinition {
  id: string;
  name: string;
  icon: React.ReactNode;
  component: React.ComponentType;
  defaultSize: {
    width: number;
    height: number;
  };
  menu?: Menu[];
}

export interface WindowInstance {
  id: string;
  appId: string;
  title: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
  isMinimized: boolean;
  isMaximized: boolean;
}
