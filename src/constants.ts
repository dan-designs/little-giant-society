export interface MapViewConfig {
  x: number; // Target X coordinate on the stylized map (center point)
  y: number; // Target Y coordinate on the stylized map (center point)
  scale: number; // Zoom level
}

// Map dimensions are 1200x900 based on the provided SVG
export const MAP_SECTIONS: Record<string, MapViewConfig> = {
  hero: { x: 150, y: 220, scale: 1.4 },       // THE FAN (Home)
  mission: { x: 490, y: 90, scale: 1.4 },     // THE ARTS DISTRICT (Mission) - Moved Up to 90
  proposal: { x: 590, y: 660, scale: 1.4 },   // THE PARK (The Proposal)
  'sticker-bus': { x: 390, y: 241, scale: 1.4 }, // THE BUS (Sticker Bus) - Moved down to 241
  about: { x: 490, y: 237, scale: 1.4 },      // SUPPLY (Team)
  sponsors: { x: 796, y: 250, scale: 1.4 },   // DOWNTOWN (Partners/Sponsors) - Moved left to 796
  events: { x: 560, y: 225, scale: 1.4 },     // GALLERY 5 (Events) - Moved down to 225
  footer: { x: 600, y: 450, scale: 0.8 },     // Center wide view
};

export const NAV_LINKS = [
  { id: 'hero', label: 'Home' },
  { id: 'mission', label: 'Mission' },
  { id: 'proposal', label: 'The Park' },
  { id: 'sticker-bus', label: 'Sticker Bus' },
  { id: 'about', label: 'The Team' },
  { id: 'sponsors', label: 'Partners' },
  { id: 'events', label: 'Events' },
];