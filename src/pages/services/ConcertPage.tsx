import ServicePageTemplate from './ServicePageTemplate';

const config = {
  heroTitle: 'Concert & Entertainment',
  heroSubtitle: 'World-class entertainment experiences. Concerts, DJ nights, and live shows that electrify audiences.',
  heroImage: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=1920',
  description: 'From intimate acoustic sessions to massive stadium concerts, Mastermind Solution delivers entertainment experiences that captivate and electrify. Our concert production team handles everything from stage design and sound engineering to lighting choreography and artist management. We create immersive environments where music comes alive and every performance becomes an unforgettable experience for the audience.',
  features: [
    'Concert Production & Management',
    'Professional Sound Engineering',
    'LED & Laser Light Shows',
    'Stage Design & Construction',
    'Artist Management & Coordination',
    'DJ Night Events',
    'LED Screen & Visual Setup',
    'Pyrotechnics & Special Effects',
    'Live Streaming Production',
    'Security & Crowd Management',
  ],
  eventType: 'concert',
  galleryImages: [
    { src: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=600', title: 'Live Concert Night' },
    { src: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=600', title: 'DJ Experience' },
    { src: 'https://images.pexels.com/photos/167636/pexels-photo-167636.jpeg?auto=compress&cs=tinysrgb&w=600', title: 'Stage Production' },
    { src: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=600', title: 'Light Show' },
    { src: 'https://images.pexels.com/photos/317181/pexels-photo-317181.jpeg?auto=compress&cs=tinysrgb&w=600', title: 'Festival Setup' },
    { src: 'https://images.pexels.com/photos/5217964/pexels-photo-5217964.jpeg?auto=compress&cs=tinysrgb&w=600', title: 'Crowd Experience' },
  ],
};

export default function ConcertPage() {
  return <ServicePageTemplate config={config} />;
}
