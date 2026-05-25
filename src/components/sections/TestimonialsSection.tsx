import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import ScrollReveal from '../effects/ScrollReveal';
import SectionHeading from '../ui/SectionHeading';
import { supabase } from '../../lib/supabase';

interface Testimonial {
  id: string;
  client_name: string;
  client_title: string;
  message: string;
  rating: number;
  event_type: string;
}

const clientImages: Record<string, string> = {
  wedding: 'https://images.pexels.com/photos/3014856/pexels-photo-3014856.jpeg?auto=compress&cs=tinysrgb&w=200',
  birthday: 'https://images.pexels.com/photos/1230160/pexels-photo-1230160.jpeg?auto=compress&cs=tinysrgb&w=200',
  corporate: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=200',
  concert: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=200',
};

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    supabase.from('testimonials').select('*').eq('is_featured', true).then(({ data }) => {
      if (data && data.length > 0) setTestimonials(data as Testimonial[]);
    });
  }, []);

  useEffect(() => {
    if (testimonials.length === 0) return;
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  if (testimonials.length === 0) return null;

  const t = testimonials[current];

  return (
    <section id="testimonials" className="section-padding relative overflow-hidden" style={{ background: '#1A1A1A' }}>
      {/* Background accent image */}
      <div className="absolute inset-0 opacity-[0.04]">
        <img
          src="https://images.pexels.com/photos/169198/pexels-photo-169198.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <SectionHeading
          small="Testimonials"
          title="What Our Clients Say"
          subtitle="Hear from those who trusted us with their most precious moments."
        />

        <ScrollReveal>
          <div className="glass-card p-8 md:p-12 relative overflow-hidden">
            {/* Gold accent line */}
            <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: 'linear-gradient(90deg, transparent, #03A9F4, transparent)' }} />

            <Quote size={48} className="absolute top-6 right-6 opacity-10" style={{ color: '#03A9F4' }} />

            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="text-center"
              >
                {/* Client Image */}
                <div className="mb-6 flex justify-center">
                  <div className="w-20 h-20 rounded-full overflow-hidden" style={{ border: '2px solid rgba(3, 169, 244,0.4)', padding: '2px' }}>
                    <img
                      src={clientImages[t.event_type] || clientImages.wedding}
                      alt={t.client_name}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                </div>

                {/* Stars */}
                <div className="flex justify-center gap-1 mb-6">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <span key={i} style={{ color: '#03A9F4', fontSize: '18px' }}>&#9733;</span>
                  ))}
                </div>

                {/* Message */}
                <p className="text-lg md:text-xl leading-relaxed mb-8 max-w-3xl mx-auto" style={{ color: '#ccc', fontFamily: "'Poppins', sans-serif", fontStyle: 'italic' }}>
                  &ldquo;{t.message}&rdquo;
                </p>

                {/* Client */}
                <div>
                  <p className="text-base font-bold" style={{ fontFamily: "'Cinzel', serif", color: '#fff' }}>
                    {t.client_name}
                  </p>
                  <p className="text-sm mt-1" style={{ color: '#03A9F4', fontFamily: "'Montserrat', sans-serif" }}>
                    {t.client_title}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={() => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length)}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
                style={{ border: '1px solid rgba(3, 169, 244,0.3)', color: '#03A9F4' }}
              >
                <ChevronLeft size={18} />
              </button>
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className="w-2 h-2 rounded-full transition-all duration-300"
                    style={{
                      backgroundColor: i === current ? '#03A9F4' : 'rgba(255,255,255,0.2)',
                      transform: i === current ? 'scale(1.5)' : 'scale(1)',
                    }}
                  />
                ))}
              </div>
              <button
                onClick={() => setCurrent((c) => (c + 1) % testimonials.length)}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
                style={{ border: '1px solid rgba(3, 169, 244,0.3)', color: '#03A9F4' }}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
