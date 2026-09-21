export type PropertySection = 'stay' | 'buy-home' | 'land';
export type Property = {
  id: string; title: string; type: string; section?: PropertySection; operation: 'For rent' | 'For sale'; location: string; price: string; priceValue: number; area: number; rooms: number; baths: number; image: string; featured?: boolean; status: 'New' | 'Pre-owned'; description: string;
};

export function propertySection(property: Property): PropertySection {
  if (property.type.toLowerCase().includes('land')) return 'land';
  return property.operation === 'For sale' ? 'buy-home' : 'stay';
}

export const sectionCatalog = {
  trip: {
    title: 'Travel planning',
    promise: 'Curated destinations, experiences, and stays assembled around the way you want to travel.',
    services: ['Destination discovery', 'Experiences', 'Stay planning', 'Travel support'],
    featuredAreas: ['Cairo', 'Luxor', 'Sharm El Sheikh', 'Siwa Oasis'],
  },
  stay: {
    title: 'Stays & hospitality',
    promise: 'Verified apartments, villas, and chalets with clear dates, guests, and arrival details.',
    services: ['Short stays', 'Family villas', 'Chalets', 'Host support'],
    featuredAreas: ['North Coast', 'Marsa Alam', 'Dahab', 'El Gouna'],
  },
  'buy-home': {
    title: 'Homes & ownership',
    promise: 'Homes and chalets selected for design, location, ownership clarity, and long-term value.',
    services: ['Homes for sale', 'Chalets for sale', 'Viewing requests', 'Ownership guidance'],
    featuredAreas: ['New Cairo', 'North Coast', 'Sharm El Sheikh', 'Alexandria'],
  },
  land: {
    title: 'Land & investment',
    promise: 'Land opportunities organized around access, permitted use, documents, and realistic potential.',
    services: ['Residential plots', 'Agricultural land', 'Hospitality plots', 'Site review'],
    featuredAreas: ['Dahab', 'Ras Sudr', 'Fayoum', 'Ain Sokhna'],
  },
} as const;

export const properties: Property[] = [
  { id:'white-sands', title:'White Sands Coastal Chalet', type:'Chalet', operation:'For rent', location:'North Coast, Egypt', price:'EGP 3,850 / night', priceValue:3850, area:145, rooms:3, baths:2, status:'New', featured:true, image:'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85', description:'A calm coastal stay with open views, modern interiors, and space designed for families and short escapes.' },
  { id:'cypress-house', title:'The Quiet Cypress House', type:'Villa', operation:'For sale', location:'Dahab, South Sinai', price:'EGP 2,400,000', priceValue:2400000, area:280, rooms:4, baths:3, status:'Pre-owned', featured:true, image:'https://images.unsplash.com/photo-1601918774946-25832a4be0d6?auto=format&fit=crop&w=1200&q=85', description:'A distinctive villa near the sea with generous spaces, a private garden, and strong investment potential.' },
  { id:'palm-grove', title:'Palm Grove Residence', type:'Apartment', operation:'For rent', location:'Marsa Alam, Egypt', price:'EGP 4,750 / night', priceValue:4750, area:110, rooms:2, baths:2, status:'New', featured:true, image:'https://images.unsplash.com/photo-1602002418082-a4443e081dd1?auto=format&fit=crop&w=1200&q=85', description:'A fully furnished apartment in a peaceful resort, close to the beach and essential services.' },
  { id:'ras-sudr-land', title:'Beachfront Investment Plot', type:'Residential land', operation:'For sale', location:'Ras Sudr, South Sinai', price:'EGP 1,200,000', priceValue:1200000, area:600, rooms:0, baths:0, status:'New', image:'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=85', description:'A promising plot for a hospitality or residential project near the sea.' },
  { id:'ain-sokhna-land', title:'Build-ready Agricultural Land', type:'Agricultural land', operation:'For sale', location:'Ain Sokhna, Egypt', price:'EGP 750,000', priceValue:750000, area:1000, rooms:0, baths:0, status:'New', image:'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1200&q=85', description:'A spacious plot suitable for agricultural investment or development, with clear road access.' },
  { id:'marina-bay-apartment', title:'Marina Bay Apartment', type:'Apartment', operation:'For rent', location:'New Alamein, Egypt', price:'EGP 5,200 / night', priceValue:5200, area:125, rooms:2, baths:2, status:'New', image:'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1200&q=85', description:'A bright waterfront apartment with a private terrace and easy access to the marina.' },
  { id:'coral-villa', title:'Coral Garden Villa', type:'Villa', operation:'For sale', location:'Sharm El Sheikh, Egypt', price:'EGP 4,850,000', priceValue:4850000, area:360, rooms:5, baths:4, status:'New', image:'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=85', description:'A spacious resort villa with a garden, pool, and generous entertaining spaces.' },
  { id:'blue-lagoon-chalet', title:'Blue Lagoon Chalet', type:'Chalet', operation:'For rent', location:'Ras Sudr, Egypt', price:'EGP 3,250 / night', priceValue:3250, area:98, rooms:2, baths:1, status:'Pre-owned', image:'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1200&q=85', description:'A relaxed beach chalet made for slow mornings, water sports, and weekend escapes.' },
  { id:'new-cairo-loft', title:'Garden Heights Loft', type:'Apartment', operation:'For sale', location:'New Cairo, Egypt', price:'EGP 3,150,000', priceValue:3150000, area:175, rooms:3, baths:2, status:'New', image:'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=85', description:'A refined city loft with high ceilings, clean lines, and a landscaped community setting.' },
  { id:'siwa-eco-lodge', title:'Siwa Palm Retreat', type:'Chalet', operation:'For rent', location:'Siwa Oasis, Egypt', price:'EGP 2,100 / night', priceValue:2100, area:82, rooms:1, baths:1, status:'New', image:'https://images.unsplash.com/photo-1544986581-efac024faf62?auto=format&fit=crop&w=1200&q=85', description:'An intimate oasis retreat surrounded by palms, natural textures, and quiet desert light.' },
  { id:'sokhna-sea-villa', title:'Sokhna Sea View Villa', type:'Villa', operation:'For rent', location:'Ain Sokhna, Egypt', price:'EGP 6,800 / night', priceValue:6800, area:310, rooms:4, baths:3, status:'New', image:'https://images.unsplash.com/photo-1605146769289-440113cc3d00?auto=format&fit=crop&w=1200&q=85', description:'A private family villa with sea views, outdoor dining, and a generous sun terrace.' },
  { id:'dahab-studio', title:'Lagoon Side Studio', type:'Apartment', operation:'For rent', location:'Dahab, South Sinai', price:'EGP 1,850 / night', priceValue:1850, area:58, rooms:1, baths:1, status:'Pre-owned', image:'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=85', description:'A compact, design-led studio close to the lagoon, cafes, and the best local sunsets.' },
  { id:'north-coast-townhouse', title:'Marassi Garden Townhouse', type:'Villa', operation:'For sale', location:'North Coast, Egypt', price:'EGP 6,900,000', priceValue:6900000, area:240, rooms:4, baths:3, status:'New', image:'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85', description:'A polished townhouse with garden access, bright interiors, and a calm resort atmosphere.' },
  { id:'el-gouna-chalet', title:'Lagoon House El Gouna', type:'Chalet', operation:'For rent', location:'El Gouna, Egypt', price:'EGP 5,900 / night', priceValue:5900, area:135, rooms:3, baths:2, status:'New', image:'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=85', description:'A peaceful lagoon-side home with water access and a beautiful open living space.' },
  { id:'alexandria-apartment', title:'Corniche Sunset Apartment', type:'Apartment', operation:'For sale', location:'Alexandria, Egypt', price:'EGP 2,050,000', priceValue:2050000, area:145, rooms:3, baths:2, status:'Pre-owned', image:'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85', description:'A classic coastal apartment with generous rooms, sea air, and a front-row sunset view.' },
  { id:'hurghada-resort', title:'Red Sea Resort Suite', type:'Apartment', operation:'For rent', location:'Hurghada, Egypt', price:'EGP 3,600 / night', priceValue:3600, area:105, rooms:2, baths:2, status:'New', image:'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=85', description:'A resort suite with a private balcony, pool access, and easy access to Red Sea adventures.' },
  { id:'luxor-riverside-home', title:'Nile Riverside Home', type:'Villa', operation:'For sale', location:'Luxor, Egypt', price:'EGP 1,850,000', priceValue:1850000, area:220, rooms:4, baths:2, status:'Pre-owned', image:'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85', description:'A welcoming riverside home with outdoor space and views toward the Nile valley.' },
  { id:'wadi-degla-apartment', title:'Cairo Green Residence', type:'Apartment', operation:'For rent', location:'Maadi, Cairo', price:'EGP 2,900 / night', priceValue:2900, area:118, rooms:2, baths:2, status:'New', image:'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85', description:'A calm furnished residence near green streets, cafes, and Cairo essentials.' },
  { id:'matrouh-chalet', title:'Azure Matrouh Chalet', type:'Chalet', operation:'For rent', location:'Marsa Matrouh, Egypt', price:'EGP 4,100 / night', priceValue:4100, area:115, rooms:3, baths:2, status:'New', image:'https://images.unsplash.com/photo-1602002418082-a4443e081dd1?auto=format&fit=crop&w=1200&q=85', description:'A light-filled chalet close to clear water and the soft white sands of the Mediterranean.' },
  { id:'zayed-commercial', title:'West Cairo Retail Space', type:'Commercial', operation:'For sale', location:'Sheikh Zayed, Egypt', price:'EGP 8,200,000', priceValue:8200000, area:410, rooms:0, baths:2, status:'New', image:'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=85', description:'A flexible commercial space in a growing district, suitable for retail or a service brand.' },
  { id:'fayoum-farm', title:'Fayoum Orchard Land', type:'Agricultural land', operation:'For sale', location:'Fayoum, Egypt', price:'EGP 1,050,000', priceValue:1050000, area:2400, rooms:0, baths:0, status:'Pre-owned', image:'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=85', description:'Productive agricultural land with open views, road access, and strong long-term potential.' },
  { id:'ain-sokhna-apartment', title:'Mountain View Sokhna', type:'Apartment', operation:'For sale', location:'Ain Sokhna, Egypt', price:'EGP 2,750,000', priceValue:2750000, area:130, rooms:2, baths:2, status:'New', image:'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1200&q=85', description:'A modern apartment with mountain views, resort amenities, and a short drive to the sea.' },
  { id:'dahab-land', title:'Dahab Eco Project Plot', type:'Residential land', operation:'For sale', location:'Dahab, South Sinai', price:'EGP 1,650,000', priceValue:1650000, area:850, rooms:0, baths:0, status:'New', image:'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=85', description:'A rare plot for a boutique hospitality project near Dahab’s coastline and natural landscapes.' },
  { id:'port-said-apartment', title:'Canal View Residence', type:'Apartment', operation:'For rent', location:'Port Said, Egypt', price:'EGP 2,250 / night', priceValue:2250, area:92, rooms:2, baths:1, status:'Pre-owned', image:'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=85', description:'A comfortable city residence with open views, practical spaces, and a welcoming neighborhood.' },
  { id:'new-capital-office', title:'Capital Business Studio', type:'Commercial', operation:'For rent', location:'New Capital, Egypt', price:'EGP 42,000 / month', priceValue:42000, area:185, rooms:0, baths:2, status:'New', image:'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=85', description:'A polished commercial studio designed for a growing team, showroom, or creative business.' },
];

export const popularAreas = ['North Coast', 'New Cairo', 'Ain Sokhna', 'Dahab', 'Marsa Alam', 'Sheikh Zayed'];
export const services = [
  { title:'Residential', description:'Apartments, villas, chalets, and homes for every stay.', icon:'⌂' },
  { title:'Commercial', description:'Offices, shops, and ready-to-grow opportunities.', icon:'▦' },
  { title:'Land', description:'Residential, commercial, and agricultural plots.', icon:'◈' },
  { title:'Property management', description:'Thoughtful support for owners and investors.', icon:'✦' },
];
