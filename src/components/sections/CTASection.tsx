import { ArrowRight, Phone } from 'lucide-react';
import ScrollReveal from '../effects/ScrollReveal';

export default function CTASection() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/3014856/pexels-photo-3014856.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Luxury Event"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(10,10,10,0.85), rgba(10,10,10,0.7), rgba(10,10,10,0.9))' }} />
      </div>

      {/* Gold accent lights */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(3, 169, 244,0.08), transparent 50%), radial-gradient(circle at 80% 50%, rgba(3, 169, 244,0.06), transparent 50%)`,
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <ScrollReveal>
          <p
            className="text-sm tracking-[4px] uppercase mb-6"
            style={{ color: 'var(--color-gold)', fontFamily: "'Montserrat', sans-serif" }}
          >
            Start Your Journey
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2
            className="text-4xl md:text-6xl font-bold mb-8 leading-tight"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            Ready To Create Your
            <br />
            <span className="gold-text">Dream Event?</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="text-lg mb-12 max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.6)', fontFamily: "'Poppins', sans-serif" }}>
            Let us transform your vision into an extraordinary reality. Contact our team today.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#contact"
              className="btn-gold text-base flex items-center gap-2"
              onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
            >
              Book Your Event
              <ArrowRight size={18} />
            </a>
            <a
              href="tel:+923390122641"
              className="btn-outline-gold text-base flex items-center gap-2"
            >
              <Phone size={16} />
              Contact Our Team
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
