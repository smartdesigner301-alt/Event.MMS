import ServicePageTemplate from './ServicePageTemplate';

const config = {
  heroTitle: 'Birthday Celebrations',
  heroSubtitle: 'Make every birthday unforgettable. Creative themes, stunning decor, and joyful experiences crafted just for you.',
  heroImage: 'https://images.pexels.com/photos/6963417/pexels-photo-6963417.jpeg?auto=compress&cs=tinysrgb&w=1920',
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
    { src: 'https://images.pexels.com/photos/6963417/pexels-photo-6963417.jpeg?auto=compress&cs=tinysrgb&w=600', title: 'Themed Birthday Bash' },
    { src: 'https://images.pexels.com/photos/1230160/pexels-photo-1230160.jpeg?auto=compress&cs=tinysrgb&w=600', title: 'Kids Party Fun' },
    { src: 'https://images.pexels.com/photos/1370734/pexels-photo-1370734.jpeg?auto=compress&cs=tinysrgb&w=600', title: 'Balloon Art' },
    { src: 'https://images.pexels.com/photos/587741/pexels-photo-587741.jpeg?auto=compress&cs=tinysrgb&w=600', title: 'Surprise Setup' },
    { src: 'https://images.pexels.com/photos/1408221/pexels-photo-1408221.jpeg?auto=compress&cs=tinysrgb&w=600', title: 'Cake Table Design' },
    { src: 'https://images.pexels.com/photos/2586549/pexels-photo-2586549.jpeg?auto=compress&cs=tinysrgb&w=600', title: 'Milestone Celebration' },
  ],
};

export default function BirthdayPage() {
  return <ServicePageTemplate config={config} />;
}
