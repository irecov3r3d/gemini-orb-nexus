import React from 'react';
import { LucideIcon } from 'lucide-react';

export type AppCategory = 'Research' | 'Creative' | 'Utility' | 'Vibe' | 'Misc';

export interface MiniApp {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  category: AppCategory;
  component: React.ComponentType<any>;
}

export interface HubState {
  activeApps: string[];
  currentTask: string;
  isOrbMode: boolean;
}
