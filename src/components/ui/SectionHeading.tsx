import ScrollReveal from '../effects/ScrollReveal';

interface Props {
  small?: string;
  title: string;
  subtitle?: string;
  light?: boolean;
  center?: boolean;
}

export default function SectionHeading({ small, title, subtitle, light = false, center = true }: Props) {
  return (
    <div className={`mb-16 ${center ? 'text-center' : ''}`}>
      {small && (
        <ScrollReveal delay={0}>
          <p className="text-sm font-medium tracking-[4px] uppercase mb-4" style={{ color: '#03A9F4', fontFamily: "'Montserrat', sans-serif" }}>
            {small}
          </p>
        </ScrollReveal>
      )}
      <ScrollReveal delay={0.1}>
        <h2
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
          style={{ fontFamily: "'Cinzel', serif", color: light ? '#0A0A0A' : '#FFFFFF' }}
        >
          <span className="gold-text">{title}</span>
        </h2>
      </ScrollReveal>
      {subtitle && (
        <ScrollReveal delay={0.2}>
          <p
            className="text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ fontFamily: "'Poppins', sans-serif", color: light ? '#555' : '#999' }}
          >
            {subtitle}
          </p>
        </ScrollReveal>
      )}
      <ScrollReveal delay={0.3}>
        <div className="flex items-center justify-center gap-2 mt-6">
          <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#03A9F4]" />
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#03A9F4' }} />
          <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[#03A9F4]" />
        </div>
      </ScrollReveal>
    </div>
  );
}
