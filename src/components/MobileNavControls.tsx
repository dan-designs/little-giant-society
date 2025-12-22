import React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface MobileNavControlsProps {
  activeSection: string;
  sectionIds: string[];
  onNavigate: (id: string) => void;
}

const MobileNavControls: React.FC<MobileNavControlsProps> = ({ activeSection, sectionIds, onNavigate }) => {
  const currentIndex = sectionIds.indexOf(activeSection);
  const isFirst = currentIndex <= 0;
  const isLast = currentIndex === sectionIds.length - 1;

  const handlePrev = () => {
    if (!isFirst) {
      const prevIndex = currentIndex - 1;
      // If navigating to the first section (Hero/Home), explicitly scroll to top
      // We use window.scrollTo to ensure we hit the absolute top of the document
      if (prevIndex === 0) {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      } else {
        onNavigate(sectionIds[prevIndex]);
      }
    }
  };

  const handleNext = () => {
    if (!isLast) {
      onNavigate(sectionIds[currentIndex + 1]);
    }
  };

  // Only render on screens smaller than lg
  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-4 lg:hidden">
      <button
        onClick={handlePrev}
        disabled={isFirst}
        className={`w-14 h-14 rounded-full flex items-center justify-center border-2 border-black transition-all active:translate-y-1 active:shadow-none focus:outline-none focus:ring-4 focus:ring-[#105CB3]/50 ${
          isFirst 
            ? 'bg-zinc-100 text-zinc-300 border-zinc-200 shadow-none cursor-not-allowed' 
            : 'bg-white text-black hover:bg-zinc-50 shadow-[0px_4px_20px_rgba(0,0,0,0.2)]'
        }`}
        aria-label="Scroll to Previous Section"
      >
        <ChevronUp size={28} strokeWidth={3} />
      </button>

      <button
        onClick={handleNext}
        disabled={isLast}
        className={`w-14 h-14 rounded-full flex items-center justify-center border-2 border-black transition-all active:translate-y-1 active:shadow-none focus:outline-none focus:ring-4 focus:ring-[#105CB3]/50 ${
          isLast 
            ? 'bg-zinc-100 text-zinc-300 border-zinc-200 shadow-none cursor-not-allowed' 
            : 'bg-[#105CB3] text-white hover:bg-[#0c4a91] shadow-[0px_4px_20px_rgba(0,0,0,0.25)]'
        }`}
        aria-label="Scroll to Next Section"
      >
        <ChevronDown size={28} strokeWidth={3} />
      </button>
    </div>
  );
};

export default MobileNavControls;