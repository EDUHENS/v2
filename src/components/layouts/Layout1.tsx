'use client';

import { ReactNode } from 'react';

export interface Layout1Props {
  children: ReactNode;
}

export default function Layout1({ children }: Layout1Props) {
  return (
    <div className="bg-[#F8F8F8] w-full h-full relative flex items-center justify-center">
      {/* Layout indicator */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span className="text-6xl font-bold text-black opacity-[0.02] select-none">
          LAYOUT 1
        </span>
      </div>
      {children}
    </div>
  );
}
