import { Link } from 'react-router-dom';
import { Heart, PartyPopper, Building2, Music } from 'lucide-react';
import ScrollReveal from '../effects/ScrollReveal';
import SectionHeading from '../ui/SectionHeading';

const services = [
  {
    icon: Building2,
    title: 'Corporate & Expo Events',
    description: 'Professional conferences, exhibitions, stall branding, booth designing, and corporate event management.',
    path: '/corporate-expo-events',
    image: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    icon: Heart,
    title: 'Wedding & Engagement',
    description: 'Luxury weddings, engagement ceremonies, floral decor, romantic stages, couple entries, and complete event planning.',
    path: '/wedding-engagement',
    image: 'https://images.pexels.com/photos/1043902/pexels-photo-1043902.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    icon: PartyPopper,
    title: 'Birthday Celebrations',
    description: 'Creative birthday themes, balloon decor, customized setups, entertainment, and memorable experiences.',
    path: '/birthday-celebrations',
    image: 'https://images.pexels.com/photos/6963417/pexels-photo-6963417.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    icon: Music,
    title: 'Concert & Entertainment',
    description: 'Concert management, DJ setups, LED screens, lighting, sound systems, and live entertainment experiences.',
    path: '/concert-entertainment',
    image: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="section-padding relative" style={{ background: '#0A0A0A' }}>
      {/* Background accent image */}
      <div className="absolute inset-0 opacity-[0.03]">
        <img
          src="https://images.pexels.com/photos/154147/pexels-photo-154147.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <SectionHeading
          small="What We Do"
          title="Signature Services"
          subtitle="Premium event experiences crafted with elegance, creativity, and perfection."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, i) => (
            <ScrollReveal key={service.title} delay={i * 0.1}>
              <Link to={service.path} className="block group">
                <div
                  className="relative overflow-hidden rounded-2xl h-72 transition-all duration-500"
                  style={{
                    border: '1px solid rgba(3, 169, 244,0.1)',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(3, 169, 244,0.4)';
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 0 40px rgba(3, 169, 244,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(3, 169, 244,0.1)';
                    (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                  }}
                >
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>

                  {/* Dark overlay */}
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,10,10,0.9), rgba(10,10,10,0.4))' }} />

                  {/* Gold shimmer on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'linear-gradient(135deg, rgba(3, 169, 244,0.05), transparent, rgba(3, 169, 244,0.05))' }} />

                  {/* Content */}
                  <div className="relative z-10 h-full flex flex-col justify-end p-8">
                    {/* Icon */}
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
                      style={{ background: 'rgba(3, 169, 244,0.15)', border: '1px solid rgba(3, 169, 244,0.4)' }}
                    >
                      <service.icon size={22} style={{ color: '#03A9F4' }} />
                    </div>

                    {/* Title */}
                    <h3
                      className="text-xl font-bold mb-2 transition-colors duration-300"
                      style={{ fontFamily: "'Cinzel', serif", color: '#fff' }}
                    >
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm leading-relaxed mb-4" style={{ color: 'rgba(255,255,255,0.6)', fontFamily: "'Poppins', sans-serif" }}>
                      {service.description}
                    </p>

                    {/* CTA */}
                    <div className="flex items-center gap-2 text-sm font-medium" style={{ color: '#03A9F4', fontFamily: "'Montserrat', sans-serif" }}>
                      <span>Explore Service</span>
                      <span className="transition-transform duration-300 group-hover:translate-x-2">&rarr;</span>
                    </div>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
