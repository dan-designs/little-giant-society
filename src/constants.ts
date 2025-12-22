export interface MapViewConfig {
  x: number; // Target X coordinate on the stylized map (center point)
  y: number; // Target Y coordinate on the stylized map (center point)
  scale: number; // Zoom level
}

// Map dimensions are 1200x900 based on the provided SVG
export const MAP_SECTIONS: Record<string, MapViewConfig> = {
  hero: { x: 150, y: 220, scale: 1.4 },       // THE FAN (Home)
  mission: { x: 400, y: 500, scale: 1.4 },    // BELLE ISLE (Mission)
  proposal: { x: 590, y: 660, scale: 1.4 },   // THE PARK (The Proposal)
  about: { x: 520, y: 230, scale: 1.4 },      // SUPPLY (Team)
  sponsors: { x: 820, y: 250, scale: 1.4 },   // DOWNTOWN (Partners/Sponsors)
  events: { x: 560, y: 200, scale: 1.4 },     // GALLERY 5 (Events)
  footer: { x: 600, y: 450, scale: 0.8 },     // Center wide view
};

export const NAV_LINKS = [
  { id: 'hero', label: 'Home' },
  { id: 'mission', label: 'Mission' },
  { id: 'proposal', label: 'The Park' },
  { id: 'about', label: 'The Team' },
  { id: 'sponsors', label: 'Partners' },
  { id: 'events', label: 'Events' },
];