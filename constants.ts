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
  'proof-in-the-park': { x: 590, y: 660, scale: 1.4 }, // Same location as The Park
  'sticker-bus': { x: 390, y: 241, scale: 1.4 }, // THE BUS (Sticker Bus) - Moved down to 241
  about: { x: 490, y: 237, scale: 1.4 },      // SUPPLY (Team)
  sponsors: { x: 796, y: 250, scale: 1.4 },   // DOWNTOWN (Partners/Sponsors) - Moved left to 796
  news: { x: 920, y: 380, scale: 1.4 },       // NEWS (East of City Hall, near river)
  events: { x: 560, y: 225, scale: 1.4 },     // GALLERY 5 (Events) - Moved down to 225
  footer: { x: 600, y: 450, scale: 0.8 },     // Center wide view
};

export interface NavSubItem {
  id: string;
  label: string;
  slug: string;
}

export interface NavLinkItem {
  id: string;
  label: string;
  slug: string;
  subItems?: NavSubItem[];
}

export const SECTION_SLUGS: Record<string, string> = {
  hero: 'home',
  mission: 'mission',
  proposal: 'the-park',
  'proof-in-the-park': 'proof-in-the-park',
  'sticker-bus': 'sticker-bus',
  about: 'team',
  sponsors: 'partners',
  news: 'news',
  events: 'events',
  footer: 'contact',
};

export const SLUG_TO_SECTION: Record<string, string> = {
  home: 'hero',
  hero: 'hero',
  mission: 'mission',
  projects: 'proposal',
  'the-park': 'proposal',
  proposal: 'proposal',
  'proof-in-the-park': 'proof-in-the-park',
  'sticker-bus': 'sticker-bus',
  team: 'about',
  about: 'about',
  partners: 'sponsors',
  sponsors: 'sponsors',
  news: 'news',
  events: 'events',
  contact: 'footer',
  footer: 'footer',
};

export const NAV_LINKS: NavLinkItem[] = [
  { id: 'hero', label: 'Home', slug: 'home' },
  { id: 'mission', label: 'Mission', slug: 'mission' },
  { 
    id: 'proposal', 
    label: 'Projects',
    slug: 'projects',
    subItems: [
      { id: 'proposal', label: 'The Park', slug: 'the-park' },
      { id: 'proof-in-the-park', label: 'Proof In The Park', slug: 'proof-in-the-park' },
      { id: 'sticker-bus', label: 'Sticker Bus', slug: 'sticker-bus' }
    ]
  },
  { id: 'about', label: 'Team', slug: 'team' },
  { id: 'sponsors', label: 'Partners', slug: 'partners' },
  { id: 'news', label: 'News', slug: 'news' },
  { id: 'events', label: 'Events', slug: 'events' },
];