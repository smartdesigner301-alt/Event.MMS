import { motion } from 'framer-motion';
import { Sparkles, Calendar, Award, Shield, Users } from 'lucide-react';
import ScrollReveal from '../components/effects/ScrollReveal';

export default function AboutPage() {
  const brandValues = [
    {
      icon: <Award size={22} className="text-gold" />,
      title: 'Flawless Excellence',
      description: 'We orchestrate events with absolute precision, delivering experiences of the highest standards.',
    },
    {
      icon: <Shield size={22} className="text-gold" />,
      title: 'Trust & Distinction',
      description: 'Your vision is our sacred trust. We guard your interests with absolute transparency and commitment.',
    },
    {
      icon: <Sparkles size={22} className="text-gold" />,
      title: 'Cinematic Creativity',
      description: 'Every event is treated as a premium masterpiece, combining grand lighting, scenery, and drama.',
    },
    {
      icon: <Users size={22} className="text-gold" />,
      title: 'VIP Client Protocol',
      description: 'Providing elite hospitality, customized guest relations, and seamless high-profile security.',
    },
  ];

  const milestones = [
    { year: '2018', title: 'The Genesis', desc: 'Mastermind Solution & Event was founded in Faisalabad, aiming to redefine luxury management.' },
    { year: '2020', title: 'Grand Expos', desc: 'Expanded services into nationwide corporate branding, large-scale industrial exhibitions, and stalls.' },
    { year: '2022', title: 'Cinematic Concerts', desc: 'Introduced professional sound walls, advanced laser shows, and high-profile security protocol management.' },
    { year: '2025', title: 'The Gold Standard', desc: 'Crowned as Faisalabad’s premier choice for royal weddings, luxury corporate expos, and international-standard concerts.' },
  ];

  return (
    <div className="min-h-screen pt-20 pb-16 relative overflow-hidden" style={{ background: 'var(--bg-primary)' }}>
      {/* Decorative Glow Dots */}
      <div className="absolute top-1/4 left-1/10 w-[400px] h-[400px] bg-gold/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/10 w-[450px] h-[450px] bg-gold/5 rounded-full blur-[150px] pointer-events-none" />

      {/* Cinematic Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center space-y-4 pt-10 pb-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-2"
        >
          <span className="text-[10px] uppercase tracking-[3px] font-bold text-gold px-3 py-1 rounded-full border border-gold/20 bg-gold/5">
            About Our House
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold uppercase tracking-wider leading-none text-white pt-2" style={{ fontFamily: "'Cinzel', serif" }}>
            The Architects of <span className="gold-text">Luxury Events</span>
          </h1>
          <p className="text-xs md:text-sm text-white/50 max-w-xl mx-auto font-medium" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Faisalabad's premier management agency dedicated to transforming grand visions into seamless, unforgettable realities.
          </p>
        </motion.div>
      </div>

      {/* Main Story Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 mt-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <ScrollReveal>
          <div className="relative rounded-2xl overflow-hidden border border-gold/15 shadow-2xl group">
            <img
              src="https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Premium Planning Team"
              className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-90" />
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl border border-gold/20 bg-black/75 backdrop-blur-md">
              <h3 className="text-sm font-bold text-gold uppercase" style={{ fontFamily: "'Cinzel', serif" }}>
                Mastermind Planners
              </h3>
              <p className="text-[10px] text-white/60 mt-1">
                A highly-vetted team of exhibition architects, wedding producers, sound technicians, and hospitality specialists.
              </p>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-xl font-bold uppercase tracking-wider text-white" style={{ fontFamily: "'Cinzel', serif" }}>
                Crafting Grand Legacies
              </h2>
              <div className="w-12 h-1 bg-gold rounded-full" />
            </div>
            <p className="text-xs text-white/70 leading-relaxed font-medium">
              At Mastermind Solution & Event, we do not simply manage programs; we craft grand legacies. From corporate expos requiring intricate shell layouts, custom stall brandings, and state-of-the-art visual grids, to royal weddings glowing with crystal chandeliers and majestic floral entry paths—we manage every element under a high-end luxury protocol system.
            </p>
            <p className="text-xs text-white/70 leading-relaxed font-medium">
              Headquartered in Faisalabad, our approach is defined by premium materials, bespoke themes, L-Acoustics audio rigs, and specialized crowd protection services. We align absolute creativity with rigorous operational discipline to deliver perfection.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-3.5 rounded-xl border border-white/5 bg-white/2">
                <h4 className="text-xl font-bold text-gold" style={{ fontFamily: "'Cinzel', serif" }}>150+</h4>
                <p className="text-[9px] text-white/40 font-bold uppercase tracking-wider mt-1">Grand Events Managed</p>
              </div>
              <div className="p-3.5 rounded-xl border border-white/5 bg-white/2">
                <h4 className="text-xl font-bold text-gold" style={{ fontFamily: "'Cinzel', serif" }}>99.8%</h4>
                <p className="text-[9px] text-white/40 font-bold uppercase tracking-wider mt-1">Client Satisfaction</p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Brand Values */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 mt-20">
        <ScrollReveal>
          <div className="text-center space-y-2 mb-10">
            <h2 className="text-xl md:text-2xl font-bold uppercase tracking-wider text-white" style={{ fontFamily: "'Cinzel', serif" }}>
              Our Founding Principles
            </h2>
            <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              The values that dictate every creative execution
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {brandValues.map((val, idx) => (
            <ScrollReveal key={idx}>
              <div
                className="p-5 rounded-2xl border border-white/5 bg-white/1 shadow-xl hover:border-gold/30 hover:bg-gold/2 transition-all duration-300 group h-full flex flex-col justify-between"
                style={{ backdropFilter: 'blur(10px)' }}
              >
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center border border-gold/20 group-hover:scale-110 transition-transform">
                    {val.icon}
                  </div>
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    {val.title}
                  </h3>
                  <p className="text-[10px] text-white/50 leading-relaxed font-medium">
                    {val.description}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Milestones / History */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 mt-24">
        <ScrollReveal>
          <div className="text-center space-y-2 mb-12">
            <h2 className="text-xl md:text-2xl font-bold uppercase tracking-wider text-white" style={{ fontFamily: "'Cinzel', serif" }}>
              Our Journey So Far
            </h2>
            <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              A story of relentless excellence and growth
            </p>
          </div>
        </ScrollReveal>

        <div className="relative border-l border-gold/15 pl-6 sm:pl-10 ml-4 sm:ml-8 space-y-10">
          {milestones.map((item, idx) => (
            <ScrollReveal key={idx}>
              <div className="relative">
                {/* Year Badge */}
                <div className="absolute -left-[35px] sm:-left-[51px] top-0 w-6 h-6 rounded-full border border-gold bg-[#0A0A0A] flex items-center justify-center text-[8px] font-bold text-gold">
                  <Calendar size={8} />
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-extrabold text-gold tracking-widest" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    {item.year}
                  </span>
                  <h3 className="text-sm font-bold text-white uppercase" style={{ fontFamily: "'Cinzel', serif" }}>
                    {item.title}
                  </h3>
                  <p className="text-[10px] text-white/50 max-w-xl font-medium">
                    {item.desc}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

    </div>
  );
}
