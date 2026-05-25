import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';

const slides = [
  {
    image: 'https://images.pexels.com/photos/1043902/pexels-photo-1043902.jpeg?auto=compress&cs=tinysrgb&w=1920',
    category: 'Luxury Weddings'
  },
  {
    image: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=1920',
    category: 'Corporate Events'
  },
  {
    image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1920',
    category: 'Expo Management'
  },
  {
    image: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=1920',
    category: 'Concert & Entertainment'
  },
  {
    image: 'https://images.pexels.com/photos/6963417/pexels-photo-6963417.jpeg?auto=compress&cs=tinysrgb&w=1920',
    category: 'Birthday Celebrations'
  }
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  // Auto-slide effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Parallax scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background Cinematic Image Slider with Parallax */}
      <div 
        className="absolute inset-0 z-0" 
        style={{ transform: `translateY(${scrollY * 0.3}px)` }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <img
              src={slides[currentSlide].image}
              alt={slides[currentSlide].category}
              className="w-full h-full object-cover"
            />
            {/* Slide Category Overlay Badge */}
            <div className="absolute top-24 right-8 md:right-16 z-20 text-[10px] tracking-[4px] uppercase text-white/40 hidden sm:block">
              Currently Viewing: <span className="font-semibold" style={{ color: 'var(--color-gold)' }}>{slides[currentSlide].category}</span>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Cinematic Overlays */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(10,10,10,0.8) 0%, rgba(10,10,10,0.5) 50%, rgba(10,10,10,0.9) 100%)' }} />
        
        {/* Soft Radial Spotlight Glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[1000px] max-h-[1000px] rounded-full pointer-events-none opacity-40"
          style={{ background: 'radial-gradient(circle, rgba(0, 171, 255, 0.06) 0%, transparent 70%)' }}
        />

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(rgba(0, 171, 255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 171, 255,0.2) 1px, transparent 1px)',
            backgroundSize: '100px 100px',
          }}
        />
      </div>

      {/* Floating Particles Overlay */}
      <div className="absolute inset-0 pointer-events-none z-10" />

      {/* Hero Content (Concise & Luxurious) */}
      <div className="relative z-20 max-w-4xl mx-auto px-6 text-center mt-12 md:mt-16">
        <motion.h1
          className="text-4xl sm:text-6xl md:text-7xl font-bold mb-6 tracking-wide leading-[1.15]"
          style={{ fontFamily: "'Cinzel', serif", color: '#fff' }}
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Turning Your <span className="gold-text">Dreams</span>
          <br />
          Into <span className="gold-text">Extraordinary</span> Events
        </motion.h1>

        <motion.p
          className="text-xs sm:text-sm md:text-base mb-10 tracking-[3px] uppercase max-w-2xl mx-auto text-white/80"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Luxury Events <span className="mx-1.5 font-bold" style={{ color: 'var(--color-gold-light)' }}>•</span> Corporate Experiences <span className="mx-1.5 font-bold" style={{ color: 'var(--color-gold-light)' }}>•</span> Cinematic Celebrations
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <a
            href="#contact"
            className="btn-gold text-xs md:text-sm flex items-center gap-2 group px-6 py-3"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('contact');
            }}
          >
            Book Consultation
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </a>
          <a
            href="#services"
            className="btn-outline-gold text-xs md:text-sm flex items-center gap-2 px-6 py-3"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('services');
            }}
          >
            <Play size={14} className="stroke-none" style={{ fill: 'var(--color-gold)' }} />
            Explore Events
          </a>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 mt-16 md:mt-24 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <div className="w-5 h-8 rounded-full border flex items-start justify-center p-1" style={{ borderColor: 'rgba(0, 171, 255, 0.3)' }}>
            <motion.div
              className="w-1 h-1.5 rounded-full"
              style={{ backgroundColor: 'var(--color-gold)' }}
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.8, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
