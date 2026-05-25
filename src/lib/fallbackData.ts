export interface Package {
  id: string;
  name: string;
  event_type: string;
  description: string;
  price_min: number;
  price_max: number;
  features: string[];
  is_active: boolean;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  image_url: string;
  created_at: string;
}

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  is_published: boolean;
  created_at: string;
}

export const fallbackPackages: Package[] = [
  // Wedding & Engagement
  {
    id: 'wed-basic',
    name: 'Basic Wedding Package',
    event_type: 'wedding',
    description: 'Essential wedding services with elegant styling and setup.',
    price_min: 500000,
    price_max: 800000,
    features: [
      'Standard Stage Decoration (up to 30ft)',
      'Elegant Bridal & Groom Entry styling',
      'Ambient LED Uplighting',
      'Professional Sound System (1 DJ, 2 Speakers)',
      'Basic Backdrop & Floral Arrangements',
      'Event Coordination & Timeline Management'
    ],
    is_active: true
  },
  {
    id: 'wed-premium',
    name: 'Premium Gold Package',
    event_type: 'wedding',
    description: 'Exquisite designs, premium floral arrangements, and full coverage.',
    price_min: 1200000,
    price_max: 1800000,
    features: [
      'Premium Floral Stage Design (up to 50ft)',
      'Red Carpet Grand Couple Entry with cold fire pyros',
      'Professional LED Screen (12x8 ft)',
      'Premium Sound & DJ Stage Setup',
      'Luxury Bridal Lounge & Guest Lounge setups',
      'Professional Photography & Cinematic Videography (2 Cameras)',
      'Full Event Coordination & Catering styling assistance'
    ],
    is_active: true
  },
  {
    id: 'wed-luxury',
    name: 'Luxury VIP Package',
    event_type: 'wedding',
    description: 'The ultimate royal wedding experience with custom-crafted elite details.',
    price_min: 2500000,
    price_max: 4500000,
    features: [
      'Royal Thematic Stage Decoration (Full hall styling)',
      'Breathtaking Couple Entrance with specialized lighting and smoke effects',
      'Ultra-HD LED Walls (20x10 ft)',
      'Celebrity-level Concert Sound & Intelligent Lighting Truss',
      'Ultra-Luxury Floral Arrangements with imported flowers',
      'Premium VIP Lounge setups & customized guest protocol staff',
      'Complete Media Coverage: 4K Cinematic Video, Drone, Crane, and Photobooths',
      'VIP Catering Layout & Exclusive Wedding Favors'
    ],
    is_active: true
  },

  // Birthday Celebrations
  {
    id: 'bday-basic',
    name: 'Basic Birthday Setup',
    event_type: 'birthday',
    description: 'Cheerful celebrations with standard balloon decoration and sound.',
    price_min: 150000,
    price_max: 250000,
    features: [
      'Standard Balloon Arch & Backdrop (choice of color)',
      'Cake Table Styling with standard cake stand',
      'Basic Sound System (Bluetooth setup)',
      'Digital Invitation Card Design',
      'Standard Event Coordination (2 hours)'
    ],
    is_active: true
  },
  {
    id: 'bday-premium',
    name: 'Premium Birthday Theme',
    event_type: 'birthday',
    description: 'Unique custom themes, stunning backdrop styling, and activities.',
    price_min: 350000,
    price_max: 500000,
    features: [
      'Custom Thematic Backdrop Setup (character/glam themes)',
      'Organic Balloon Garland & Accent Lighting',
      'Custom Cake Table Styling with themed props',
      'Professional Photography Coverage (3 hours)',
      'Professional Sound System & Wireless Mics',
      'Fun Activities: Magic Show or Face Painting',
      '1 Event Coordinator on-site'
    ],
    is_active: true
  },
  {
    id: 'bday-luxury',
    name: 'Luxury Celebration Package',
    event_type: 'birthday',
    description: 'Immersive grand themes, premium lighting, and interactive stations.',
    price_min: 700000,
    price_max: 1200000,
    features: [
      'Ultra-Premium Immersive 3D Backdrop styling',
      'Stunning Organic Balloon Installation with custom neon signs',
      'Grand Theme Cake Table with customized thematic desserts',
      'Professional Audio & Intelligent Light Show',
      'Full Event Media Coverage (4K video + album photoshoot)',
      'Interactive Stations: 360 Video Booth, Magic Show, Puppet Show & DJ',
      'Premium Custom Kids Favors & Thematic Treats'
    ],
    is_active: true
  },

  // Corporate & Expo Events
  {
    id: 'corp-basic',
    name: 'Basic Seminar Package',
    event_type: 'corporate',
    description: 'Professional conference setup for small to medium business events.',
    price_min: 300000,
    price_max: 500000,
    features: [
      'Professional Presentation Stage Setup',
      'Standard Sound System & 2 Wireless Mics',
      'HD Projector & Projection Screen setup',
      'Standard Podium with branding banner',
      'Registration Counter setup & basic banners'
    ],
    is_active: true
  },
  {
    id: 'corp-premium',
    name: 'Premium Expo Setup',
    event_type: 'corporate',
    description: 'Branded exhibition stalls, professional LED walls, and complete management.',
    price_min: 800000,
    price_max: 1500000,
    features: [
      'Custom Branded Stage & Backdrop design',
      'High-Definition LED Wall (12x8 ft)',
      'Professional Sound Engineering & Stage Lighting',
      'Premium Exhibition Stall Designing (up to 5 standard shell booths)',
      'Digital Registration & Visitor Badge System',
      'Dedicated Event Coordinator team (3 members)'
    ],
    is_active: true
  },
  {
    id: 'corp-vip',
    name: 'Corporate VIP Package',
    event_type: 'corporate',
    description: 'Elite corporate brand experiences with custom design and protocol.',
    price_min: 2000000,
    price_max: 4000000,
    features: [
      'Custom Creative Stall & Pavilion Design (up to 15 stalls)',
      'Premium Stage Styling with curved Ultra-HD LED walls',
      'High-End Concert Sound System & Specialized Studio lighting',
      'Exhibition Shell structures & customized graphic panel printing',
      'VIP Protocol Management, Guest Lounges & Hostess coordination',
      'Live Web Streaming & Multi-Camera Media setup',
      'VIP Lounge Furniture Rental & Premium Catering setup styling'
    ],
    is_active: true
  },

  // Concert & Entertainment
  {
    id: 'con-standard',
    name: 'Standard Concert Production',
    event_type: 'concert',
    description: 'Professional truss stage setup, standard concert sound, and security.',
    price_min: 800000,
    price_max: 1500000,
    features: [
      'Truss Stage Setup (30x20ft)',
      'Standard Line-Array Sound System (suited for 500-1000 people)',
      'Essential Concert Lighting (LED Pars, Sharpy lights)',
      'Security Guards (4 members)',
      'Artist Backstage Changing Room tent setup'
    ],
    is_active: true
  },
  {
    id: 'con-premium',
    name: 'Premium Concert Show',
    event_type: 'concert',
    description: 'Premium sound & light show, large LED walls, and backstage management.',
    price_min: 2000000,
    price_max: 3500000,
    features: [
      'Heavy-Duty Aluminum Truss Stage (40x30ft)',
      'Premium Line-Array Sound System (suited for up to 3000 people)',
      'Intelligent Lighting Rig (Beam lights, strobe, smoke machines)',
      'Central High-Definition LED Wall (16x10ft) + 2 side panels',
      'Bouncers (10 members) & Crowd Control barricades',
      'Complete Artist Coordination, Backstage Management & Catering styling'
    ],
    is_active: true
  },
  {
    id: 'con-vip',
    name: 'VIP Concert Experience',
    event_type: 'concert',
    description: 'Elite production value with massive LED walls, artist management, and VIP lounges.',
    price_min: 4500000,
    price_max: 8000000,
    features: [
      'Mega Concert Stage with custom backdrop design & walkways',
      'Elite L-Acoustics Concert Sound System (suited for 5000+ people)',
      'Spectacular Visual Show: Laser system, heavy fog, CO2 jets, pyrotechnics',
      'Panoramic LED Wall Setup (30x12ft backdrop + 4 side screens)',
      'VIP Concert Lounges with luxury sofas & dedicated refreshments bar',
      'Elite Security & VIP Bouncer Protocol (20 bouncers + walk-through gates)',
      'Multi-cam 4K coverage, drone broadcasting & high-profile backstage catering'
    ],
    is_active: true
  }
];

export const fallbackPortfolio: PortfolioItem[] = [
  { id: 'port-1', title: 'Royal Wedding Stage', category: 'wedding', image_url: 'https://images.pexels.com/photos/1043902/pexels-photo-1043902.jpeg?auto=compress&cs=tinysrgb&w=600', created_at: '2026-05-10T12:00:00Z' },
  { id: 'port-2', title: 'Corporate Summit', category: 'corporate', image_url: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=600', created_at: '2026-05-08T12:00:00Z' },
  { id: 'port-3', title: 'Immersive DJ Stage', category: 'concert', image_url: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=600', created_at: '2026-05-05T12:00:00Z' },
  { id: 'port-4', title: 'Colorful Birthday Party', category: 'birthday', image_url: 'https://images.pexels.com/photos/6963417/pexels-photo-6963417.jpeg?auto=compress&cs=tinysrgb&w=600', created_at: '2026-05-02T12:00:00Z' }
];

export const fallbackBlogPosts: BlogPost[] = [
  { id: 'blog-1', title: 'Planning a Royal Wedding in Faisalabad: The Ultimate Guide', category: 'wedding', is_published: true, created_at: '2026-05-12T12:00:00Z' },
  { id: 'blog-2', title: 'Top 5 Trends in Corporate Exhibition Stall Design', category: 'corporate', is_published: true, created_at: '2026-05-09T12:00:00Z' }
];
