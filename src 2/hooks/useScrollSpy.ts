import { useEffect, useState } from 'react';

export const useScrollSpy = (sectionIds: string[], offset: number = -100) => {
  const [activeId, setActiveId] = useState<string>(sectionIds[0]);

  useEffect(() => {
    const handleScroll = () => {
      let maxOverlap = 0;
      let currentSectionId = activeId;
      // Default to the first section if nothing matches (though unlikely with full height sections)
      // but preserve current selection if no clear winner to prevent jumping
      
      // If we haven't found any overlap yet, we might want to default to the current activeId 
      // or the first one. Let's start with checking all.
      
      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (!element) continue;

        const rect = element.getBoundingClientRect();
        
        // Calculate the height of the element that is visible within the viewport
        // rect.top is distance from viewport top. 
        // rect.bottom is distance from viewport top to element bottom.
        
        // We clamp the top of the intersection to 0 (viewport top)
        const intersectionTop = Math.max(0, rect.top);
        
        // We clamp the bottom of the intersection to window.innerHeight (viewport bottom)
        const intersectionBottom = Math.min(window.innerHeight, rect.bottom);
        
        // Calculate visible height (overlap)
        // If intersectionBottom < intersectionTop, overlap is 0.
        const overlap = Math.max(0, intersectionBottom - intersectionTop);

        // If this section covers more of the screen than the previous best, it's the winner
        // We use > to bias towards the earlier section in the list in case of ties (e.g. 50/50 split),
        // or we could use >= to bias towards the later section. 
        // Usually keeping the current section until the next one dominates is preferred, 
        // but strictly max overlap is a robust metric.
        if (overlap > maxOverlap) {
            maxOverlap = overlap;
            currentSectionId = id;
        }
      }

      // Only update state if it changed
      if (currentSectionId !== activeId) {
        setActiveId(currentSectionId);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true }); // Also check on resize
    
    handleScroll(); // Check on mount

    return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleScroll);
    };
  }, [sectionIds, activeId]); // activeId is a dependency to ensure stability in the loop logic if needed, but mainly purely functional here

  return activeId;
};