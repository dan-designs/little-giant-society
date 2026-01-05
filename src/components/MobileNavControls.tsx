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

  // Shared button style classes
  // Surface: #EFF4F9
  // Border: #C9CDD1 (16% darker)
  const buttonBaseClass = "w-14 h-14 rounded-full flex items-center justify-center border-2 transition-all focus:outline-none focus:ring-4 focus:ring-[#105CB3]/50";
  const activeClass = "bg-[#EFF4F9] border-[#C9CDD1] text-black hover:bg-white shadow-md active:translate-y-1 active:shadow-sm";
  const disabledClass = "bg-zinc-100 border-zinc-200 text-zinc-300 shadow-none cursor-not-allowed";

  // Only render on screens smaller than lg
  return (
    <nav aria-label="Mobile Page Controls" className="fixed bottom-6 right-6 z-40 flex flex-col gap-4 lg:hidden">
      <button
        onClick={handlePrev}
        disabled={isFirst}
        className={`${buttonBaseClass} ${isFirst ? disabledClass : activeClass}`}
        aria-label="Scroll to Previous Section"
      >
        <ChevronUp size={28} strokeWidth={3} />
      </button>

      <button
        onClick={handleNext}
        disabled={isLast}
        className={`${buttonBaseClass} ${isLast ? disabledClass : activeClass}`}
        aria-label="Scroll to Next Section"
      >
        <ChevronDown size={28} strokeWidth={3} />
      </button>
    </nav>
  );
};

export default MobileNavControls;