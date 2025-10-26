'use client';

import { ReactNode } from 'react';

interface Layout3Props {
  header: ReactNode;
  leftContent: ReactNode;
  rightContent: ReactNode;
  onPublish?: (data: any) => void;
  onModify?: (message: string) => void;
}

export default function Layout3({ header, leftContent, rightContent, onPublish, onModify }: Layout3Props) {
  console.log('Layout3 is being rendered!')
  return (
    <div className="size-full grid grid-rows-[110px_1fr] gap-[1px] bg-[#E6E6E6] relative">
      {/* Transparent Overlay showing Layout type */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <p className="text-[#000000] text-[120px] font-bold opacity-[0.02]">
          LAYOUT 3
        </p>
      </div>

      {/* Header */}
      <div className="bg-[#F8F8F8] overflow-hidden">
        {header}
      </div>

      {/* Content Split */}
      <div className="grid grid-cols-2 gap-[1px] bg-[#E6E6E6]">
        {/* Left Content */}
        <div className="bg-[#F8F8F8] overflow-visible">
          {leftContent}
        </div>

        {/* Right Content */}
        <div className="bg-[#F8F8F8] overflow-hidden">
          {rightContent}
        </div>
      </div>
    </div>
  );
}
