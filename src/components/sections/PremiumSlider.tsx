import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    title: 'Luxury Weddings Crafted To Perfection',
    subtitle: 'Where fairy tales come alive',
    image: 'https://images.pexels.com/photos/1043902/pexels-photo-1043902.jpeg?auto=compress&cs=tinysrgb&w=1920',
  },
  {
    title: 'Celebrate Every Birthday In Style',
    subtitle: 'Making moments unforgettable',
    image: 'https://images.pexels.com/photos/6963417/pexels-photo-6963417.jpeg?auto=compress&cs=tinysrgb&w=1920',
  },
  {
    title: 'Where Love Meets Elegance',
    subtitle: 'Engagement ceremonies redefined',
    image: 'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=1920',
  },
  {
    title: 'Professional Expo & Exhibition Management',
    subtitle: 'Corporate excellence delivered',
    image: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=1920',
  },
  {
    title: 'Corporate Events That Inspire',
    subtitle: 'Elevate your brand presence',
    image: 'https://images.pexels.com/photos/154147/pexels-photo-154147.jpeg?auto=compress&cs=tinysrgb&w=1920',
  },
];

export default function PremiumSlider() {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrent((c) => (c + 1) % slides.length);
          return 0;
        }
        return prev + 0.5;
      });
    }, 30);
    return () => clearInterval(interval);
  }, []);

  const goTo = (dir: number) => {
    setCurrent((c) => (c + dir + slides.length) % slides.length);
    setProgress(0);
  };

  return (
    <section className="relative overflow-hidden" style={{ marginTop: 0, paddingTop: 0 }}>
      <div className="relative h-[500px] md:h-[600px] lg:h-[700px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8 }}
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-[6000ms] ease-out"
              style={{ backgroundImage: `url(${slides[current].image})`, transform: 'scale(1.05)' }}
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(10,10,10,0.25), rgba(10,10,10,0.1), rgba(10,10,10,0.35))' }} />
          </motion.div>
        </AnimatePresence>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-sm tracking-[4px] uppercase mb-4" style={{ color: '#03A9F4', fontFamily: "'Montserrat', sans-serif" }}>
                {slides[current].subtitle}
              </p>
              <h2
                className="text-3xl md:text-5xl lg:text-6xl font-bold max-w-4xl"
                style={{ fontFamily: "'Cinzel', serif", color: '#fff' }}
              >
                {slides[current].title}
              </h2>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Arrows */}
        <button
          onClick={() => goTo(-1)}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 glass-card"
          style={{ border: '1px solid rgba(3, 169, 244,0.3)' }}
        >
          <ChevronLeft size={20} style={{ color: '#03A9F4' }} />
        </button>
        <button
          onClick={() => goTo(1)}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 glass-card"
          style={{ border: '1px solid rgba(3, 169, 244,0.3)' }}
        >
          <ChevronRight size={20} style={{ color: '#03A9F4' }} />
        </button>

        {/* Progress indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => { setCurrent(i); setProgress(0); }}
              className="relative h-1 rounded-full overflow-hidden transition-all duration-300"
              style={{
                width: i === current ? 48 : 24,
                backgroundColor: i === current ? 'transparent' : 'rgba(255,255,255,0.3)',
              }}
            >
              {i === current && (
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    width: `${progress}%`,
                    backgroundColor: '#03A9F4',
                  }}
                />
              )}
              {i === current && (
                <div className="absolute inset-0 rounded-full" style={{ backgroundColor: 'rgba(3, 169, 244,0.2)' }} />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
