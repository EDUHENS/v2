import { ReactNode } from 'react';
import Header from '../Header';
import ContentContainer from '../ContentContainer';
import BottomInputBar from '../BottomInputBar';

export interface Layout2Props {
  children: ReactNode;
  header: ReactNode;
  onPublish?: (data: any) => void;
  onModify?: (message: string) => void;
}

export default function Layout2({ children, header, onPublish, onModify }: Layout2Props) {
  return (
    <div className="grid grid-rows-[110px_1fr] gap-px w-full h-full max-h-screen relative">
      {/* Layout indicator */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-50">
        <span className="text-6xl font-bold text-black opacity-[0.02] select-none">
          LAYOUT 2
        </span>
      </div>

      {/* Header Container */}
      <div className="w-full h-[110px]">
        {header}
      </div>

      {/* Content Container */}
      <ContentContainer>
        {children}
      </ContentContainer>

      {/* Bottom Input Bar - Fixed at bottom of Layout2 */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-full max-w-4xl px-4 z-50">
        <BottomInputBar
          onPublish={onPublish}
          onModify={onModify}
          placeholder="Hens can modify it for you"
        />
      </div>
    </div>
  );
}
