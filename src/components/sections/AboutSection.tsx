import { useEffect, useState, useRef } from 'react';
import ScrollReveal from '../effects/ScrollReveal';
import SectionHeading from '../ui/SectionHeading';

const counters = [
  { value: 500, suffix: '+', label: 'Events Managed' },
  { value: 200, suffix: '+', label: 'Happy Clients' },
  { value: 50, suffix: '+', label: 'Corporate Collaborations' },
  { value: 5, suffix: '+', label: 'Years Experience' },
];

function AnimatedCounter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [started, value]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-bold mb-2" style={{ fontFamily: "'Cinzel', serif", color: '#03A9F4' }}>
        {count}{suffix}
      </div>
      <div className="text-sm tracking-wider uppercase" style={{ fontFamily: "'Montserrat', sans-serif", color: '#999' }}>
        {label}
      </div>
    </div>
  );
}

export default function AboutSection() {
  return (
    <section id="about" className="section-padding relative">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          small="Our Story"
          title="We Craft Experiences That Last Forever"
          subtitle="With passion, precision, and an unwavering commitment to excellence, we transform your vision into breathtaking reality."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mt-16">
          {/* Left - Story */}
          <ScrollReveal direction="left">
            <div className="space-y-6">
              <p className="text-base leading-relaxed" style={{ color: '#bbb', fontFamily: "'Poppins', sans-serif" }}>
                At Mastermind Solution, we believe every event tells a story. From intimate wedding ceremonies to grand corporate galas, we craft each moment with meticulous attention to detail and artistic excellence.
              </p>
              <p className="text-base leading-relaxed" style={{ color: '#bbb', fontFamily: "'Poppins', sans-serif" }}>
                Our team of creative visionaries and seasoned planners work together to deliver experiences that exceed expectations. We blend tradition with innovation, creating events that are both timeless and contemporary.
              </p>
              <p className="text-base leading-relaxed" style={{ color: '#bbb', fontFamily: "'Poppins', sans-serif" }}>
                Every floral arrangement, every lighting cue, every moment of entertainment is orchestrated to perfection. Because your special moments deserve nothing less than extraordinary.
              </p>
              <div className="pt-4">
                <div className="w-16 h-[2px]" style={{ background: 'linear-gradient(90deg, #03A9F4, transparent)' }} />
              </div>
            </div>
          </ScrollReveal>

          {/* Right - Image Collage */}
          <ScrollReveal direction="right">
            <div className="relative">
              {/* Main image */}
              <div className="glass-card overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/1043902/pexels-photo-1043902.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Luxury Wedding Event"
                  className="w-full h-[400px] object-cover"
                />
              </div>
              {/* Floating accent image */}
              <div className="absolute -bottom-8 -left-8 w-40 h-40 rounded-xl overflow-hidden shadow-2xl hidden md:block" style={{ border: '3px solid #0A0A0A' }}>
                <img
                  src="https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt="Engagement Ceremony"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Top right accent image */}
              <div className="absolute -top-6 -right-6 w-32 h-32 rounded-xl overflow-hidden shadow-2xl hidden md:block" style={{ border: '3px solid #0A0A0A' }}>
                <img
                  src="https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=300"
                  alt="Corporate Event"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Gold border accent */}
              <div
                className="absolute -bottom-4 -right-4 w-32 h-32 rounded-lg"
                style={{ border: '2px solid rgba(3, 169, 244,0.3)' }}
              />
            </div>
          </ScrollReveal>
        </div>

        {/* Counters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20">
          {counters.map((c, i) => (
            <ScrollReveal key={c.label} delay={0.1 * i}>
              <div className="glass-card p-8 relative overflow-hidden">
                {/* Background accent image */}
                <div className="absolute inset-0 opacity-5">
                  <img
                    src="https://images.pexels.com/photos/169198/pexels-photo-169198.jpeg?auto=compress&cs=tinysrgb&w=400"
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="relative z-10">
                  <AnimatedCounter value={c.value} suffix={c.suffix} label={c.label} />
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
