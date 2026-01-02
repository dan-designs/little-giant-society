import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, LocateFixed, X, Map as MapIcon } from 'lucide-react';
import { MAP_SECTIONS, NAV_LINKS } from '../constants';

interface MiniMapProps {
  activeSection: string;
  onSectionSelect: (id: string) => void;
}

const VIEWPORT_WIDTH = 320;
const VIEWPORT_HEIGHT = 240;
const MAP_WIDTH = 1200;
const MAP_HEIGHT = 900;

// Calculate minimum scale to ensure map covers viewport (approx 0.27)
const MIN_SCALE = Math.max(VIEWPORT_WIDTH / MAP_WIDTH, VIEWPORT_HEIGHT / MAP_HEIGHT);

interface StylizedMapContentProps {
  activeSection: string;
  onPinClick: (id: string) => void;
}

const StylizedMapContent: React.FC<StylizedMapContentProps> = ({ activeSection, onPinClick }) => {
  const pins = [
    { id: 'hero', x: 150, y: 220, label: 'RICHMOND, VA' }, // Changed from THE FAN
    { id: 'mission', x: 490, y: 90, label: 'THE ARTS DISTRICT' }, // Moved above Team (490,237) and above Fall Line
    { id: 'proposal', x: 590, y: 660, label: 'THE PARK' },
    { id: 'sticker-bus', x: 390, y: 241, label: 'STICKER BUS' }, 
    { id: 'about', x: 490, y: 237, label: 'SUPPLY' },
    { id: 'events', x: 560, y: 225, label: 'GALLERY 5' },
    { id: 'sponsors', x: 796, y: 250, label: 'CITY HALL' },
  ];

  return (
    <svg 
      viewBox="0 0 1200 900" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className="w-[1200px] h-[900px] block"
      aria-label="Expanded stylistic map of Richmond VA"
    >
      {/* --- BASE LAYERS --- */}
      <rect width="1200" height="900" fill="#F4F4F4"/>

      {/* THE JAMES RIVER */}
      <path 
        id="jamesRiverPath"
        d="M-50,300 C200,350 300,550 500,550 C700,550 900,450 1250,500" 
        stroke="#A0C4D3" 
        strokeWidth="140" 
        strokeLinecap="round"
      />
      {/* James River Label */}
      <text fontSize="12" fontWeight="bold" fill="#789FAD" letterSpacing="4px" style={{ pointerEvents: 'none', textTransform: 'uppercase', opacity: 0.9, fontFamily: "'Space Grotesk', sans-serif" }}>
        <textPath href="#jamesRiverPath" startOffset="50%" textAnchor="middle">
          James River
        </textPath>
      </text>

      {/* BELLE ISLE */}
      <ellipse cx="400" cy="540" rx="70" ry="35" fill="#D4E6CB" opacity="0.9"/>
      {/* Static Belle Isle Label */}
      <g transform="translate(400, 540)" style={{ pointerEvents: 'none' }}>
        <text y="4" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#3A5A35" letterSpacing="0.5px" fontFamily="'Space Grotesk', sans-serif" opacity="0.9">BELLE ISLE</text>
      </g>

      {/* MAJOR ARTERIES */}
      {/* Broad Street */}
      <path d="M0,257 L1200,187" stroke="#E0E0E0" strokeWidth="10"/>
      <path d="M850,0 L800,900" stroke="#E0E0E0" strokeWidth="12"/>

      {/* MANCHESTER BRIDGE (Dark Line) - Extended from top to bottom */}
      <path d="M633,0 L573,900" stroke="#333333" strokeWidth="16"/>

      {/* FALL LINE TRAIL (Green Line) - Reversed path direction to flip text */}
      <path 
        id="fallLinePath"
        d="M350,0 L350,160 L720,160 Q680,350 640,540 L620,900" 
        stroke="#36D36E" 
        strokeWidth="18" 
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <text fontSize="13" fontWeight="900" fill="#064E3B" dy="5" letterSpacing="3px" style={{ pointerEvents: 'none', textTransform: 'uppercase' }}>
        <textPath href="#fallLinePath" startOffset="0" spacing="auto">
          Fall Line Trail &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Fall Line Trail &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Fall Line Trail &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Fall Line Trail &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Fall Line Trail
        </textPath>
      </text>

      {/* FLOOD WALL */}
      <path d="M450,650 C550,680 650,670 750,620" stroke="#777777" strokeWidth="8" strokeDasharray="15 8"/>

      {/* --- PINS --- */}
      {pins.map((pin) => {
        const isActive = activeSection === pin.id;
        
        // Colors
        const textActiveColor = '#105CB3'; // Keep text blue
        const pinActiveColor = '#388AE8'; // New pin color
        const pulseColor = '#C77517';
        
        // Unified display color logic
        const displayColor = isActive ? pinActiveColor : '#333';

        // Unified Size Logic
        const fontSize = 12;
        const pinRadius = isActive ? 18 : 14;

        // Box Calculations
        const charWidth = fontSize * 0.65;
        const paddingX = 16;
        const paddingY = 8;
        const boxWidth = (pin.label.length * charWidth) + paddingX;
        const boxHeight = fontSize + paddingY;

        return (
          <g 
            key={pin.id} 
            transform={`translate(${pin.x}, ${pin.y})`} 
            className="cursor-pointer transition-all duration-500 hover:opacity-80 focus:outline-none"
            onClick={(e) => {
              e.stopPropagation();
              onPinClick(pin.id);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onPinClick(pin.id);
              }
            }}
            role="button"
            tabIndex={0}
            aria-label={`Navigate to ${pin.label}`}
            aria-current={isActive ? 'location' : undefined}
          >
            {isActive && (
              <>
                {/* Pulse Ring */}
                <motion.circle
                  initial={{ r: 10, opacity: 0.6 }}
                  animate={{ r: 50, opacity: 0 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                  fill={pulseColor}
                />
                {/* Inner Glow */}
                <circle r="25" fill={pulseColor} opacity="0.2" filter="blur(4px)" />
              </>
            )}

            {/* Render Custom Icons or Standard Pins */}
            {pin.id === 'sticker-bus' ? (
              <g transform="translate(-16, -16)">
                <svg 
                  width="32" 
                  height="32" 
                  viewBox="0 0 24 24" 
                  fill={isActive ? '#FACC15' : '#333'} 
                  stroke={isActive ? '#27272a' : 'none'}
                  strokeWidth={isActive ? 1.5 : 0}
                  className="transition-all duration-300"
                >
                   {/* Custom Left-Facing Bus Profile */}
                   <path d="M1 12 L3 7 L21 7 C22.1 7 23 7.9 23 9 L23 18 L21 18 C21 19.66 19.66 21 18 21 C16.34 21 15 19.66 15 18 L10 18 C10 19.66 8.66 21 7 21 C5.34 21 4 19.66 4 18 L1 18 Z" />
                   <path d="M4 8 L6 11 H9 V8 H4 Z" fill="white" fillOpacity="0.2"/>
                   <path d="M10 8 V11 H14 V8 H10 Z" fill="white" fillOpacity="0.2"/>
                   <path d="M15 8 V11 H19 V8 H15 Z" fill="white" fillOpacity="0.2"/>
                </svg>
              </g>
            ) : pin.id === 'sponsors' ? (
              <g transform="translate(0, 5) scale(0.7)"> 
                 {/* Government Building Icon - Replaces Dot */}
                 {/* Centered visually roughly around 0,0 */}
                 <path 
                    d="M-20,20 L20,20 L20,10 L14,10 L14,-5 L22,-5 L0,-25 L-22,-5 L-14,-5 L-14,10 L-20,10 Z" 
                    fill={displayColor}
                    className="transition-all duration-300"
                 />
                 <path 
                    d="M-8,10 L-8,-5 M0,10 L0,-5 M8,10 L8,-5" 
                    stroke="white"
                    strokeWidth="3" 
                    strokeOpacity={isActive ? 0.9 : 0.4}
                    strokeLinecap="round"
                 />
              </g>
            ) : (
              <>
                {/* Pin Body - Consistent Sizes */}
                <circle 
                  r={pinRadius} 
                  fill={displayColor} 
                  className="transition-all duration-300"
                />
                
                {/* Center Dot (White) */}
                {isActive && (
                  <circle r={8} fill="white" className="transition-all duration-300" />
                )}
              </>
            )}

            {/* Label Container */}
            <g transform={`translate(0, ${isActive ? -40 : -32})`} className="transition-all duration-300">
              
              {/* Translucent White Box */}
              <rect 
                x={-boxWidth / 2}
                y={-boxHeight / 2}
                width={boxWidth}
                height={boxHeight}
                rx="6"
                fill="white"
                fillOpacity="0.95"
                className="shadow-sm"
              />

              {/* Text - Always Blue as requested */}
              <text 
                y={fontSize * 0.35} // Optical center
                textAnchor="middle"
                fontFamily="'Space Grotesk', sans-serif" 
                fontSize={fontSize} 
                fontWeight="bold" 
                fill={textActiveColor}
                className="pointer-events-none"
              >
                {pin.label}
              </text>
            </g>
          </g>
        );
      })}
    </svg>
  );
};

const MiniMap: React.FC<MiniMapProps> = ({ activeSection, onSectionSelect }) => {
  const [zoomMultiplier, setZoomMultiplier] = useState(1);
  const [dragKey, setDragKey] = useState(0); // Used to force reset drag position
  const [isVisible, setIsVisible] = useState(true);

  // Get target configuration or default to hero if something goes wrong
  const targetConfig = MAP_SECTIONS[activeSection] || MAP_SECTIONS['hero'];
  
  // 1. Calculate effective scale, ensuring we never go below the size of the viewport
  const rawScale = targetConfig.scale * zoomMultiplier;
  const currentScale = Math.max(rawScale, MIN_SCALE);

  // 2. Calculate Boundaries
  const minX = VIEWPORT_WIDTH - (MAP_WIDTH * currentScale);
  const minY = VIEWPORT_HEIGHT - (MAP_HEIGHT * currentScale);
  const maxX = 0;
  const maxY = 0;

  // 3. Calculate Default Centered Position
  let targetX = (VIEWPORT_WIDTH / 2) - (targetConfig.x * currentScale);
  let targetY = (VIEWPORT_HEIGHT / 2) - (targetConfig.y * currentScale);

  // 4. Clamp the target position to the boundaries
  targetX = Math.max(minX, Math.min(maxX, targetX));
  targetY = Math.max(minY, Math.min(maxY, targetY));

  // Get the display label from NAV_LINKS based on the active section ID
  const locationLabel = NAV_LINKS.find(link => link.id === activeSection)?.label || activeSection;

  const handleZoomIn = (e: React.MouseEvent) => {
    e.stopPropagation();
    setZoomMultiplier(prev => Math.min(prev * 1.25, 5));
  };

  const handleZoomOut = (e: React.MouseEvent) => {
    e.stopPropagation();
    setZoomMultiplier(prev => Math.max(prev / 1.25, 0.1));
  };

  const handleSnapToLocation = (e: React.MouseEvent) => {
    e.stopPropagation();
    setZoomMultiplier(1);
    setDragKey(prev => prev + 1); // Forces component remount to reset drag offset
  };

  return (
    <AnimatePresence mode="wait">
      {isVisible ? (
        <motion.div 
          key="minimap"
          initial={{ opacity: 0, scale: 0.5, originY: 1, originX: 1 }}
          animate={{ opacity: 1, scale: 0.75 }}
          exit={{ opacity: 0, scale: 0.5 }}
          className="fixed bottom-8 right-8 z-50 hidden lg:block origin-bottom-right"
        >
          {/* Outer Device Frame */}
          <div className="w-[320px] h-[240px] bg-white rounded-xl shadow-2xl border-4 border-black overflow-hidden relative group">
            
            {/* Map Container - The "Camera" */}
            <motion.div
              key={dragKey}
              className="absolute origin-top-left cursor-grab active:cursor-grabbing"
              drag
              dragConstraints={{
                left: minX,
                right: maxX,
                top: minY,
                bottom: maxY
              }}
              dragElastic={0.05} // Minimal elasticity to avoid pulling edges into view
              animate={{
                x: targetX,
                y: targetY,
                scale: currentScale,
              }}
              transition={{
                type: "spring",
                stiffness: 45,
                damping: 25,
                mass: 1.2
              }}
            >
              <StylizedMapContent activeSection={activeSection} onPinClick={onSectionSelect} />
            </motion.div>

            {/* Overlay UI on top of Map */}
            <div className="absolute inset-0 pointer-events-none border-[6px] border-black/5 rounded-lg z-20"></div>
            
            {/* Snap/Location Button - MOVED TO TOP LEFT */}
            <button 
                onClick={handleSnapToLocation}
                className="absolute top-4 left-4 z-30 w-12 h-12 bg-[#105CB3] text-white rounded-full flex items-center justify-center hover:bg-[#0c4a91] transition-colors shadow-md active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                aria-label="Snap to Current Location"
                title="Snap to Current Location"
            >
                <LocateFixed size={24} />
            </button>
            
            {/* Zoom Controls - MOVED TO BOTTOM LEFT */}
            <div className="absolute bottom-4 left-4 z-30 flex flex-col gap-2">
                <button 
                    onClick={handleZoomIn}
                    className="w-12 h-12 bg-[#105CB3] text-white rounded-full flex items-center justify-center hover:bg-[#0c4a91] transition-colors shadow-md active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    aria-label="Zoom In"
                    title="Zoom In"
                >
                    <Plus size={24} />
                </button>
                <button 
                    onClick={handleZoomOut}
                    className="w-12 h-12 bg-[#105CB3] text-white rounded-full flex items-center justify-center hover:bg-[#0c4a91] transition-colors shadow-md active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    aria-label="Zoom Out"
                    title="Zoom Out"
                >
                    <Minus size={24} />
                </button>
            </div>

            {/* Hint for dragging - MOVED TO TOP RIGHT */}
            <div className="absolute top-4 right-4 z-30 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none bg-white/90 backdrop-blur px-4 py-2 rounded-md text-sm font-black uppercase tracking-widest text-zinc-600 border border-black/10 shadow-sm" aria-hidden="true">
                Drag to pan
            </div>

            {/* Collapse Button - BOTTOM RIGHT */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsVisible(false);
              }}
              className="absolute bottom-4 right-4 z-30 w-12 h-12 bg-white text-zinc-600 border-2 border-zinc-200 rounded-full flex items-center justify-center hover:bg-zinc-100 hover:text-black hover:border-zinc-300 transition-colors shadow-md active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-400"
              aria-label="Hide Mini Map"
              title="Hide Mini Map"
            >
              <X size={24} />
            </button>

            {/* Active Section Label - Visually Hidden but Accessible */}
            <div className="sr-only" aria-live="polite">
               Current Location: {locationLabel}
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.button
          key="show-map-btn"
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          onClick={() => setIsVisible(true)}
          className="fixed bottom-8 right-8 z-50 hidden lg:flex bg-[#105CB3] text-white px-6 py-4 rounded-full text-sm font-bold uppercase tracking-wider hover:bg-[#0c4a91] transition-colors items-center justify-center gap-3 shadow-2xl border-4 border-white/10 active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-300"
          aria-label="Show Mini Map"
        >
          <MapIcon size={20} />
          <span>Show Map</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default MiniMap;