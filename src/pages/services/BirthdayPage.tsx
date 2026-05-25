import ServicePageTemplate from './ServicePageTemplate';

const config = {
  heroTitle: 'Birthday Celebrations',
  heroSubtitle: 'Make every birthday unforgettable. Creative themes, stunning decor, and joyful experiences crafted just for you.',
  heroImage: 'https://images.pexels.com/photos/1405528/pexels-photo-1405528.jpeg?auto=compress&cs=tinysrgb&w=1920',
  description: 'Birthdays are milestones worth celebrating in style. Whether it is a grand milestone birthday, a fun kids party, or an elegant surprise celebration, Mastermind Solution creates experiences that leave lasting impressions. Our creative team designs unique themes, stunning decorations, and engaging entertainment that make every birthday celebration truly special and memorable.',
  features: [
    'Custom Theme Design & Planning',
    'Premium Balloon Art & Decor',
    'Personalized Cake Table Setup',
    'Entertainment & Activities',
    'Photography & Video Coverage',
    'DJ & Sound System',
    'Custom Backdrop & Stage',
    'Surprise Party Planning',
    'Kids Party Packages',
    'Milestone Birthday Specials',
  ],
  eventType: 'birthday',
  galleryImages: [
    { src: 'https://images.pexels.com/photos/1405528/pexels-photo-1405528.jpeg?auto=compress&cs=tinysrgb&w=600', title: 'Birthday Celebration' },
    { src: 'https://images.pexels.com/photos/1191991/pexels-photo-1191991.jpeg?auto=compress&cs=tinysrgb&w=600', title: 'Colorful Balloons' },
    { src: 'https://images.pexels.com/photos/1770447/pexels-photo-1770447.jpeg?auto=compress&cs=tinysrgb&w=600', title: 'Birthday Cake' },
    { src: 'https://images.pexels.com/photos/587741/pexels-photo-587741.jpeg?auto=compress&cs=tinysrgb&w=600', title: 'Surprise Setup' },
    { src: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=600', title: 'Party Decor' },
    { src: 'https://images.pexels.com/photos/1729803/pexels-photo-1729803.jpeg?auto=compress&cs=tinysrgb&w=600', title: 'Milestone Celebration' },
  ],
};

export default function BirthdayPage() {
  return <ServicePageTemplate config={config} />;
}
