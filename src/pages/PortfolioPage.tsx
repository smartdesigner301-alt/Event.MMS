import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Calendar, MapPin, Users } from 'lucide-react';
import ScrollReveal from '../components/effects/ScrollReveal';

const portfolioCategories = [
  { id: 'all', label: 'All Projects' },
  { id: 'corporate', label: 'Corporate & Expos' },
  { id: 'wedding', label: 'Royal Weddings' },
  { id: 'birthday', label: 'Birthdays' },
  { id: 'concert', label: 'Concerts & Shows' },
];

const portfolioItems = [
  {
    id: 1,
    title: 'Textile Industry Expo Pakistan',
    category: 'corporate',
    location: 'Faisalabad Expo Center',
    date: 'March 2026',
    guests: '3,000+ Attendees',
    image: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'Custom shell stall installations, LED matrix systems, secure protocol management, and visual branding grids for 50+ multinational exhibitors.',
  },
  {
    id: 2,
    title: 'The Royal Kohinoor Wedding',
    category: 'wedding',
    location: 'Serena Hotel Ballroom',
    date: 'February 2026',
    guests: '800 Guests',
    image: 'https://images.pexels.com/photos/1043902/pexels-photo-1043902.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'A grand luxury setup featuring a 100ft stage, hanging floral gardens, imported crystal chandeliers, and an elite couple entry pathway.',
  },
  {
    id: 3,
    title: 'Grand Symphony Concert Night',
    category: 'concert',
    location: 'MMS Stadium Faisalabad',
    date: 'January 2026',
    guests: '5,000+ Crowd',
    image: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'Elite audio setup utilizing L-Acoustics sound blocks, massive 4K LED backdrops, laser show configurations, and professional VIP bouncers.',
  },
  {
    id: 4,
    title: 'Neon Safari Birthday Carnival',
    category: 'birthday',
    location: 'Royal Gardens Faisalabad',
    date: 'April 2026',
    guests: '250 Guests',
    image: 'https://images.pexels.com/photos/6963417/pexels-photo-6963417.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'Premium customized balloon sculpting, neon glowing play stations, a luxury cake table display, and professional live animators.',
  },
  {
    id: 5,
    title: 'Nationwide Agri Business Summit',
    category: 'corporate',
    location: 'Chenab Club Hall',
    date: 'November 2025',
    guests: '400 Delegates',
    image: 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'Minimalist corporate environment styling, multi-speaker cordless mic grids, custom digital registers, and premium corporate dining catering.',
  },
  {
    id: 6,
    title: 'Elegant Pastel Mehndi Celebration',
    category: 'wedding',
    location: 'Serena Lawn Faisalabad',
    date: 'December 2025',
    guests: '600 Guests',
    image: 'https://images.pexels.com/photos/2253842/pexels-photo-2253842.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'A traditional pastel yellow and mint theme setup, low floor cushion seating, floral swings, and dynamic custom lighting patterns.',
  },
  {
    id: 7,
    title: 'Electronic Arena Music Fest',
    category: 'concert',
    location: 'Arena Plaza Faisalabad',
    date: 'December 2025',
    guests: '4,000 Fans',
    image: 'https://images.pexels.com/photos/976866/pexels-photo-976866.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'State-of-the-art CO2 jets, customized laser scanners, ground truss structures, and robust security check perimeter fencing.',
  },
  {
    id: 8,
    title: 'Golden Jubilee Gala Party',
    category: 'birthday',
    location: 'MMS Luxury Marquee',
    date: 'October 2025',
    guests: '150 VIPs',
    image: 'https://images.pexels.com/photos/1724183/pexels-photo-1724183.jpeg?auto=compress&cs=tinysrgb&w=600',
    description: 'An elegant black and gold themed family gathering featuring customized catering menu structures, 360° cameras, and acoustic live violinists.',
  },
];

export default function PortfolioPage() {
  const [selectedCat, setSelectedCat] = useState('all');
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const filteredItems = selectedCat === 'all'
    ? portfolioItems
    : portfolioItems.filter(item => item.category === selectedCat);

  return (
    <div className="min-h-screen pt-20 pb-16 relative overflow-hidden" style={{ background: 'var(--bg-primary)' }}>
      {/* Glow Rings */}
      <div className="absolute top-1/3 right-1/10 w-[350px] h-[350px] bg-gold/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/10 w-[350px] h-[350px] bg-gold/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Page Heading */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center space-y-4 pt-10 pb-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-2"
        >
          <span className="text-[10px] uppercase tracking-[3px] font-bold text-gold px-3 py-1 rounded-full border border-gold/20 bg-gold/5">
            Luxury Showcase
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold uppercase tracking-wider leading-none text-white pt-2" style={{ fontFamily: "'Cinzel', serif" }}>
            Our Premium <span className="gold-text">Portfolio</span>
          </h1>
          <p className="text-xs md:text-sm text-white/50 max-w-xl mx-auto font-medium" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Explore visual records of the most luxurious exhibitions, royal weddings, festivals, and corporate expos managed in Faisalabad.
          </p>
        </motion.div>
      </div>

      {/* Filter Tabs */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 flex flex-wrap justify-center gap-2 mb-10">
        {portfolioCategories.map((cat) => {
          const active = selectedCat === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCat(cat.id)}
              className="px-4 py-2 rounded-xl text-[10px] font-bold tracking-wider uppercase transition-all duration-300 border"
              style={{
                background: active ? 'rgba(3, 169, 244,0.1)' : 'transparent',
                borderColor: active ? '#03A9F4' : 'rgba(255,255,255,0.06)',
                color: active ? '#03A9F4' : '#888',
                fontFamily: "'Montserrat', sans-serif"
              }}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Filterable Portfolio Grid with smooth layout animation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="glass-card overflow-hidden border border-white/5 bg-[#121212]/40 relative group hover:border-gold/30 hover:bg-gold/1 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="relative overflow-hidden aspect-[4/3] group">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-[#0A0A0A]/85 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-5 z-20">
                    <div className="space-y-2">
                      <span className="text-[8px] font-extrabold uppercase tracking-widest text-gold bg-gold/10 px-2 py-0.5 rounded border border-gold/20 inline-block">
                        {item.category}
                      </span>
                      <h3 className="text-xs font-bold text-white uppercase tracking-wider leading-snug" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                        {item.title}
                      </h3>
                      <p className="text-[9px] text-white/50 leading-relaxed font-medium">
                        {item.description}
                      </p>
                    </div>

                    <div className="flex justify-between items-center border-t border-white/10 pt-2 text-[8px] text-white/40 font-bold uppercase tracking-wider">
                      <span className="flex items-center gap-1">
                        <MapPin size={9} className="text-gold" />
                        {item.location}
                      </span>
                      <button
                        onClick={() => setPreviewImage(item.image)}
                        className="w-6 h-6 rounded-full border border-white/15 flex items-center justify-center text-white/60 hover:border-gold hover:text-gold transition-colors"
                      >
                        <Eye size={10} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Details Footer Always Visible on Card bottom */}
                <div className="p-4 space-y-2 relative z-10 border-t border-white/5">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider line-clamp-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    {item.title}
                  </h4>
                  <div className="flex justify-between items-center text-[9px] text-white/40 font-semibold">
                    <span className="flex items-center gap-1">
                      <Calendar size={10} className="text-gold/60" />
                      {item.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users size={10} className="text-gold/60" />
                      {item.guests}
                    </span>
                  </div>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox Modal Preview */}
      <AnimatePresence>
        {previewImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPreviewImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full max-h-[85vh] rounded-2xl overflow-hidden border border-gold/25"
            >
              <img
                src={previewImage}
                alt="Enlarged Preview"
                className="w-full h-full object-contain"
              />
              <button
                onClick={() => setPreviewImage(null)}
                className="absolute top-4 right-4 bg-black/70 hover:bg-gold/20 text-white hover:text-gold w-8 h-8 rounded-full border border-white/10 hover:border-gold flex items-center justify-center transition-all text-xs font-bold"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
