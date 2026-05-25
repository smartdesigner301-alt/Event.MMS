import ServicePageTemplate from './ServicePageTemplate';

const config = {
  heroTitle: 'Corporate & Expo Events',
  heroSubtitle: 'Professional excellence delivered. Conferences, exhibitions, and corporate events that elevate your brand.',
  heroImage: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=1920',
  description: 'In the corporate world, every event is a reflection of your brand. Mastermind Solution delivers professional, polished, and impactful corporate events that leave lasting impressions on your stakeholders. From large-scale conferences and exhibitions to intimate corporate gatherings and product launches, we handle every aspect with precision and creativity. Our expertise in stall design, booth branding, and exhibition management ensures your brand stands out.',
  features: [
    'Corporate Conference Planning',
    'Exhibition & Expo Management',
    'Stall Design & Branding',
    'Booth Construction & Setup',
    'Product Launch Events',
    'Corporate Gala Dinners',
    'Team Building Events',
    'Award Ceremony Planning',
    'Live Streaming & Tech Setup',
    'Branding & Print Materials',
  ],
  eventType: 'corporate',
  galleryImages: [
    { src: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=600', title: 'Corporate Summit' },
    { src: 'https://images.pexels.com/photos/154147/pexels-photo-154147.jpeg?auto=compress&cs=tinysrgb&w=600', title: 'Business Conference' },
    { src: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=600', title: 'Expo Exhibition' },
    { src: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=600', title: 'Product Launch' },
    { src: 'https://images.pexels.com/photos/260689/pexels-photo-260689.jpeg?auto=compress&cs=tinysrgb&w=600', title: 'Trade Show Booth' },
    { src: 'https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=600', title: 'Award Ceremony' },
  ],
};

export default function CorporatePage() {
  return <ServicePageTemplate config={config} />;
}
