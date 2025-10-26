'use client';

import { ReactNode } from 'react';
import Sidebar, { Task } from '../Sidebar';

export interface MainLayoutProps {
  mainDashboard: ReactNode;
  isMinimized?: boolean;
  onToggleMinimize?: () => void;
  tasks?: Task[];
  onTaskClick?: (task: Task) => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  onLogoClick?: () => void;
  userProfile?: {
    name: string;
    avatar?: string;
  };
}

export default function MainLayout({
  mainDashboard,
  isMinimized = false,
  onToggleMinimize,
  tasks = [],
  onTaskClick,
  searchQuery = '',
  onSearchChange,
  onLogoClick,
  userProfile
}: MainLayoutProps) {
  return (
    <div className="bg-[#E6E6E6] h-screen max-h-screen grid grid-cols-[auto_1fr] gap-px overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        isMinimized={isMinimized}
        onToggleMinimize={onToggleMinimize}
        tasks={tasks}
        onTaskClick={onTaskClick}
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
        onLogoClick={onLogoClick}
        userProfile={userProfile}
      />

      {/* Layout1 */}
      {mainDashboard}
    </div>
  );
}
