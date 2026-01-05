import React, { useState } from 'react';
import { Menu, X, Heart } from 'lucide-react';
import { NAV_LINKS } from '../constants';

interface NavigationProps {
  activeSection: string;
  onDonateClick: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeSection, onDonateClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Helper to ensure clicking a link strictly scrolls to that section
  const handleScrollTo = (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsOpen(false); // Close mobile menu if open
    
    const element = document.getElementById(id);
    if (element) {
      // scrollIntoView with 'smooth' behavior works well with scroll-snap
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDonate = () => {
    setIsOpen(false);
    onDonateClick();
  };

  return (
    <header id="main-header" className="fixed top-0 left-0 w-full z-40 bg-[#EFF4F9]/90 backdrop-blur-md border-b border-black/10 transition-all">
      <nav className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between relative" aria-label="Main Navigation">
        {/* Logo - Linked to Hero */}
        <a 
          href="#hero" 
          onClick={handleScrollTo('hero')}
          className="flex items-center gap-2 group md:relative z-20 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#105CB3] rounded-lg p-1"
          aria-label="Little Giant Society Home"
        >
          {/* Logo Container */}
          <div className="relative w-8 h-8 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 overflow-hidden rounded-full shrink-0">
            {/* Logo Image */}
            <img 
              src="https://res.cloudinary.com/datad8tms/image/upload/v1766276532/Logo_gezcwn.png" 
              alt="Dark metal emblem featuring a robed female figure holding a sword and wheat, alongside an eagle within a wreath." 
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback if image missing: hide image, show placeholder
                (e.target as HTMLImageElement).style.display = 'none';
                const fallback = (e.target as HTMLImageElement).nextElementSibling;
                if (fallback) fallback.classList.remove('hidden');
              }}
            />
            {/* Fallback CSS Logo if image fails to load */}
            <div className="hidden absolute inset-0 bg-black rounded-full flex items-center justify-center">
               <span className="text-white font-bold text-xs">LGS</span>
            </div>
          </div>

          <span className="font-bold tracking-tight uppercase absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-max md:static md:transform-none md:w-auto text-[22px] md:text-lg">
            Little Giant Society
          </span>
        </a>

        {/* Centered Desktop Nav */}
        <div className="hidden md:flex items-center gap-1 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={handleScrollTo(link.id)}
                className={`text-sm font-bold uppercase tracking-wider cursor-pointer transition-colors decoration-2 underline-offset-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#105CB3] rounded px-2 py-1 ${
                  isActive 
                    ? 'text-[#105CB3] underline' 
                    : 'text-black hover:text-[#105CB3] hover:underline'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </div>

        {/* Right Side: Donate & Mobile Toggle */}
        <div className="flex items-center gap-4 relative z-20">
          {/* Desktop Donate Button */}
          <button 
            onClick={handleDonate}
            className="hidden md:flex bg-[#105CB3] text-white px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider hover:bg-[#0c4a91] transition-colors items-center justify-center gap-2 leading-none focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300"
            aria-label="Donate to the project"
          >
            <span className="relative top-[1px]">Donate</span> <Heart size={14} className="fill-current" />
          </button>

          {/* Mobile Toggle */}
          <button
            className="md:hidden p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#105CB3] rounded"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-[#EFF4F9] border-b border-black/10 shadow-xl p-6 flex flex-col gap-6">
          {NAV_LINKS.map((link) => {
             const isActive = activeSection === link.id;
             return (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={handleScrollTo(link.id)}
                className={`text-2xl font-bold uppercase tracking-tight cursor-pointer decoration-2 underline-offset-4 ${
                    isActive ? 'text-[#105CB3] underline' : 'text-black'
                }`}
              >
                {link.label}
              </a>
             );
          })}
          <button 
            onClick={handleDonate}
            className="bg-[#105CB3] text-white w-full py-4 rounded-lg text-lg font-bold uppercase tracking-wider flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300"
          >
            Donate Now <Heart size={18} className="fill-current" />
          </button>
        </div>
      )}
    </header>
  );
};

export default Navigation;