import { useState, useEffect } from 'react';
import { Check, ArrowRight } from 'lucide-react';
import ScrollReveal from '../effects/ScrollReveal';
import SectionHeading from '../ui/SectionHeading';
import { supabase } from '../../lib/supabase';
import { fallbackPackages } from '../../lib/fallbackData';

interface Package {
  id: string;
  name: string;
  event_type: string;
  description: string;
  price_min: number;
  price_max: number;
  features: string[];
}

const eventTabs = [
  { value: 'wedding', label: 'Weddings', image: 'https://images.pexels.com/photos/1043902/pexels-photo-1043902.jpeg?auto=compress&cs=tinysrgb&w=1920' },
  { value: 'birthday', label: 'Birthdays', image: 'https://images.pexels.com/photos/6963417/pexels-photo-6963417.jpeg?auto=compress&cs=tinysrgb&w=1920' },
  { value: 'corporate', label: 'Corporate', image: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=1920' },
  { value: 'concert', label: 'Concerts', image: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=1920' },
];

export default function PackagesSection() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [activeTab, setActiveTab] = useState('wedding');

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const { data } = await supabase.from('packages').select('*').eq('event_type', activeTab).eq('is_active', true);
        if (data && data.length > 0) {
          setPackages(data as Package[]);
        } else {
          setPackages(fallbackPackages.filter((p) => p.event_type === activeTab && p.is_active));
        }
      } catch {
        setPackages(fallbackPackages.filter((p) => p.event_type === activeTab && p.is_active));
      }
    };
    fetchPackages();
  }, [activeTab]);

  const formatPKR = (n: number) => `PKR ${n.toLocaleString()}`;
  const activeImage = eventTabs.find((t) => t.value === activeTab)?.image;

  return (
    <section id="packages" className="section-padding relative overflow-hidden" style={{ background: '#1A1A1A' }}>
      {/* Background image based on active tab */}
      <div className="absolute inset-0 opacity-[0.06] transition-opacity duration-700">
        <img
          src={activeImage}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <SectionHeading
          small="Pricing"
          title="Our Packages"
          subtitle="Choose the perfect package for your extraordinary event."
        />

        {/* Tabs */}
        <ScrollReveal>
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {eventTabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className="px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2"
                style={{
                  background: activeTab === tab.value ? 'rgba(3, 169, 244,0.15)' : 'transparent',
                  border: `1px solid ${activeTab === tab.value ? '#03A9F4' : 'rgba(255,255,255,0.1)'}`,
                  color: activeTab === tab.value ? '#03A9F4' : '#999',
                  fontFamily: "'Montserrat', sans-serif",
                }}
              >
                {/* Small tab image */}
                <div className="w-5 h-5 rounded-full overflow-hidden flex-shrink-0" style={{ border: '1px solid rgba(3, 169, 244,0.3)' }}>
                  <img src={tab.image?.replace('w=1920', 'w=50')} alt="" className="w-full h-full object-cover" />
                </div>
                {tab.label}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Package Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg, i) => (
            <ScrollReveal key={pkg.id} delay={i * 0.1}>
              <div
                className="relative h-full flex flex-col rounded-2xl overflow-hidden transition-all duration-300"
                style={{
                  background: 'rgba(26,26,26,0.8)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(3, 169, 244,0.1)',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(3, 169, 244,0.3)';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 0 40px rgba(3, 169, 244,0.1)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(3, 169, 244,0.1)';
                  (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                }}
              >
                {pkg.name.includes('Gold') && (
                  <div className="absolute -top-0 left-0 right-0 h-1" style={{ background: 'linear-gradient(90deg, transparent, #03A9F4, transparent)' }} />
                )}
                {pkg.name.includes('Platinum') && (
                  <div className="absolute -top-0 left-0 right-0 h-1" style={{ background: 'linear-gradient(90deg, transparent, #fff, transparent)' }} />
                )}

                {/* Package header image */}
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={activeImage?.replace('w=1920', 'w=600')}
                    alt={pkg.name}
                    className="w-full h-full object-cover"
                    style={{ filter: 'brightness(0.4)' }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    {pkg.name.includes('Gold') && (
                      <div className="px-4 py-1 rounded-full text-xs font-bold" style={{ background: 'linear-gradient(135deg, #03A9F4, #FF5252)', color: '#0A0A0A', fontFamily: "'Montserrat', sans-serif" }}>
                        MOST POPULAR
                      </div>
                    )}
                    {pkg.name.includes('Platinum') && (
                      <div className="px-4 py-1 rounded-full text-xs font-bold" style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', color: '#fff', fontFamily: "'Montserrat', sans-serif" }}>
                        PREMIUM
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-8 flex-1 flex flex-col">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold mb-2" style={{ fontFamily: "'Cinzel', serif", color: '#fff' }}>
                      {pkg.name}
                    </h3>
                    <p className="text-sm mb-4" style={{ color: '#999', fontFamily: "'Poppins', sans-serif" }}>
                      {pkg.description}
                    </p>
                    <div className="gold-text text-2xl font-bold" style={{ fontFamily: "'Cinzel', serif" }}>
                      {formatPKR(pkg.price_min)} &ndash; {formatPKR(pkg.price_max)}
                    </div>
                  </div>
                  <div className="flex-1 space-y-3 mb-8">
                    {pkg.features.map((f) => (
                      <div key={f} className="flex items-center gap-3">
                        <Check size={16} style={{ color: '#03A9F4' }} />
                        <span className="text-sm" style={{ color: '#bbb', fontFamily: "'Poppins', sans-serif" }}>{f}</span>
                      </div>
                    ))}
                  </div>
                  <a
                    href="#contact"
                    className="btn-outline-gold w-full text-center flex items-center justify-center gap-2"
                    onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
                  >
                    Get Quote
                    <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
