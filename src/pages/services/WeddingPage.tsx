import ServicePageTemplate from './ServicePageTemplate';

const config = {
  heroTitle: 'Wedding & Engagement',
  heroSubtitle: 'Where fairy tales come alive. Luxury weddings and engagement ceremonies crafted with elegance, romance, and perfection.',
  heroImage: 'https://images.pexels.com/photos/1043902/pexels-photo-1043902.jpeg?auto=compress&cs=tinysrgb&w=1920',
  description: 'Your wedding day deserves nothing less than perfection. At Mastermind Solution, we specialize in creating breathtaking wedding and engagement experiences that reflect your unique love story. From intimate ceremonies to grand celebrations, every detail is meticulously planned and beautifully executed. Our team of expert planners, designers, and coordinators work together to ensure your special day is everything you have ever dreamed of and more.',
  features: [
    'Complete Wedding Planning & Coordination',
    'Luxury Floral Decor & Stage Design',
    'Romantic Couple Entry Arrangements',
    'Cinematic Photography & Videography',
    'Custom Theme & Color Schemes',
    'Venue Selection & Styling',
    'Catering & Menu Planning',
    'Entertainment & DJ Setup',
    'Mehndi & Barat Arrangements',
    'Valima & Reception Planning',
  ],
  eventType: 'wedding',
  galleryImages: [
    { src: 'https://images.pexels.com/photos/1043902/pexels-photo-1043902.jpeg?auto=compress&cs=tinysrgb&w=600', title: 'Royal Wedding Stage' },
    { src: 'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=600', title: 'Elegant Engagement' },
    { src: 'https://images.pexels.com/photos/169198/pexels-photo-169198.jpeg?auto=compress&cs=tinysrgb&w=600', title: 'Floral Paradise' },
    { src: 'https://images.pexels.com/photos/3014856/pexels-photo-3014856.jpeg?auto=compress&cs=tinysrgb&w=600', title: 'Bridal Entry' },
    { src: 'https://images.pexels.com/photos/2959192/pexels-photo-2959192.jpeg?auto=compress&cs=tinysrgb&w=600', title: 'Reception Setup' },
    { src: 'https://images.pexels.com/photos/1319854/pexels-photo-1319854.jpeg?auto=compress&cs=tinysrgb&w=600', title: 'Mehndi Night' },
  ],
};

export default function WeddingPage() {
  return <ServicePageTemplate config={config} />;
}
