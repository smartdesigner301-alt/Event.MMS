import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';
import ScrollReveal from '../effects/ScrollReveal';
import SectionHeading from '../ui/SectionHeading';

const categories = ['All', 'Weddings', 'Birthdays', 'Corporate', 'Expo', 'Concerts'];

const portfolioItems = [
  { id: 1, title: 'Royal Wedding Ceremony', category: 'Weddings', image: 'https://images.pexels.com/photos/1043902/pexels-photo-1043902.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id: 2, title: 'Elegant Engagement', category: 'Weddings', image: 'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id: 3, title: 'Themed Birthday Bash', category: 'Birthdays', image: 'https://images.pexels.com/photos/6963417/pexels-photo-6963417.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id: 4, title: 'Kids Birthday Party', category: 'Birthdays', image: 'https://images.pexels.com/photos/1230160/pexels-photo-1230160.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id: 5, title: 'Corporate Summit', category: 'Corporate', image: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id: 6, title: 'Business Conference', category: 'Corporate', image: 'https://images.pexels.com/photos/154147/pexels-photo-154147.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id: 7, title: 'Expo Exhibition', category: 'Expo', image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id: 8, title: 'Live Concert Night', category: 'Concerts', image: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id: 9, title: 'DJ Night Experience', category: 'Concerts', image: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id: 10, title: 'Luxury Stage Decor', category: 'Weddings', image: 'https://images.pexels.com/photos/169198/pexels-photo-169198.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id: 11, title: 'Product Launch', category: 'Corporate', image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id: 12, title: 'Trade Show Booth', category: 'Expo', image: 'https://images.pexels.com/photos/260689/pexels-photo-260689.jpeg?auto=compress&cs=tinysrgb&w=600' },
];

export default function PortfolioSection() {
  const [active, setActive] = useState('All');
  const [selected, setSelected] = useState<typeof portfolioItems[0] | null>(null);

  const filtered = active === 'All' ? portfolioItems : portfolioItems.filter((i) => i.category === active);

  return (
    <section id="portfolio" className="section-padding relative">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          small="Our Work"
          title="Our Recent Masterpieces"
          subtitle="A glimpse into the extraordinary events we have crafted."
        />

        {/* Category Filter */}
        <ScrollReveal>
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className="px-5 py-2 rounded-full text-sm font-medium transition-all duration-300"
                style={{
                  background: active === cat ? 'rgba(3, 169, 244,0.15)' : 'transparent',
                  border: `1px solid ${active === cat ? '#03A9F4' : 'rgba(255,255,255,0.1)'}`,
                  color: active === cat ? '#03A9F4' : '#999',
                  fontFamily: "'Montserrat', sans-serif",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filtered.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group relative overflow-hidden rounded-xl cursor-pointer"
                onClick={() => setSelected(item)}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <div>
                    <p className="text-xs tracking-wider uppercase mb-1" style={{ color: '#03A9F4', fontFamily: "'Montserrat', sans-serif" }}>
                      {item.category}
                    </p>
                    <h4 className="text-lg font-bold" style={{ fontFamily: "'Cinzel', serif", color: '#fff' }}>
                      {item.title}
                    </h4>
                  </div>
                  <ZoomIn size={20} className="absolute top-4 right-4" style={{ color: '#03A9F4' }} />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Fullscreen Popup */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.95)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="relative max-w-4xl w-full"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute -top-12 right-0 w-10 h-10 rounded-full flex items-center justify-center"
                style={{ border: '1px solid rgba(3, 169, 244,0.3)', color: '#03A9F4' }}
              >
                <X size={20} />
              </button>
              <img
                src={selected.image.replace('w=600', 'w=1200')}
                alt={selected.title}
                className="w-full rounded-xl"
              />
              <div className="mt-4 text-center">
                <p className="text-xs tracking-wider uppercase mb-1" style={{ color: '#03A9F4', fontFamily: "'Montserrat', sans-serif" }}>
                  {selected.category}
                </p>
                <h3 className="text-2xl font-bold" style={{ fontFamily: "'Cinzel', serif", color: '#fff' }}>
                  {selected.title}
                </h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
