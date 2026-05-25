import { Link } from 'react-router-dom';
import { Instagram, Facebook, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const quickLinks = [
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/#about' },
  { name: 'Portfolio', path: '/#portfolio' },
  { name: 'Packages', path: '/#packages' },
  { name: 'Blog', path: '/#blog' },
  { name: 'Contact', path: '/#contact' },
];

const services = [
  { name: 'Wedding & Engagement', path: '/wedding-engagement' },
  { name: 'Birthday Celebrations', path: '/birthday-celebrations' },
  { name: 'Corporate & Expo Events', path: '/corporate-expo-events' },
  { name: 'Concert & Entertainment', path: '/concert-entertainment' },
];

const socials = [
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Youtube, href: '#', label: 'YouTube' },
];

const instagramImages = [
  'https://images.pexels.com/photos/1043902/pexels-photo-1043902.jpeg?auto=compress&cs=tinysrgb&w=200',
  'https://images.pexels.com/photos/6963417/pexels-photo-6963417.jpeg?auto=compress&cs=tinysrgb&w=200',
  'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=200',
  'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=200',
  'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=200',
  'https://images.pexels.com/photos/169198/pexels-photo-169198.jpeg?auto=compress&cs=tinysrgb&w=200',
];

export default function Footer() {
  return (
    <footer className="relative" style={{ background: '#0A0A0A', borderTop: '1px solid rgba(3, 169, 244,0.1)' }}>
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, var(--color-gold), var(--color-gold-light))' }}>
                <span className="text-white font-bold text-lg" style={{ fontFamily: "'Cinzel', serif" }}>M</span>
              </div>
              <div>
                <h3 className="text-lg font-bold tracking-wider text-white" style={{ fontFamily: "'Cinzel', serif" }}>MASTERMIND EVENTS</h3>
                <p className="text-[7.5px] tracking-[1.5px] uppercase font-bold" style={{ color: 'var(--color-gold-light)' }}>
                  We Plan • We Design • We Deliver
                </p>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-6" style={{ color: '#999', fontFamily: "'Poppins', sans-serif" }}>
              Turning your dreams into extraordinary events. Premium event management with elegance, creativity, and perfection.
            </p>
            <div className="flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300"
                  style={{ border: '1px solid rgba(3, 169, 244,0.3)', color: '#03A9F4' }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = 'rgba(3, 169, 244,0.15)';
                    (e.currentTarget as HTMLElement).style.borderColor = '#03A9F4';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = 'transparent';
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(3, 169, 244,0.3)';
                  }}
                >
                  <s.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold tracking-wider uppercase mb-6" style={{ fontFamily: "'Montserrat', sans-serif", color: '#03A9F4' }}>
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-sm transition-colors duration-200"
                    style={{ color: '#999', fontFamily: "'Poppins', sans-serif" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#03A9F4'; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#999'; }}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-semibold tracking-wider uppercase mb-6" style={{ fontFamily: "'Montserrat', sans-serif", color: '#03A9F4' }}>
              Services
            </h4>
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s.name}>
                  <Link
                    to={s.path}
                    className="text-sm transition-colors duration-200"
                    style={{ color: '#999', fontFamily: "'Poppins', sans-serif" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#03A9F4'; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#999'; }}
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold tracking-wider uppercase mb-6" style={{ fontFamily: "'Montserrat', sans-serif", color: '#03A9F4' }}>
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="mt-0.5 flex-shrink-0" style={{ color: '#03A9F4' }} />
                <span className="text-sm" style={{ color: '#999', fontFamily: "'Poppins', sans-serif" }}>
                  Faisalabad, Pakistan
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="flex-shrink-0" style={{ color: '#03A9F4' }} />
                <a href="tel:+923390122641" className="text-sm" style={{ color: '#999', fontFamily: "'Poppins', sans-serif" }}>
                  +92 339 0122641
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="flex-shrink-0" style={{ color: '#03A9F4' }} />
                <span className="text-sm" style={{ color: '#999', fontFamily: "'Poppins', sans-serif" }}>
                  info@mastermindsolution.com
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Instagram Gallery */}
        <div className="mt-16 mb-12">
          <h4 className="text-sm font-semibold tracking-wider uppercase mb-6 text-center" style={{ fontFamily: "'Montserrat', sans-serif", color: '#03A9F4' }}>
            <Instagram size={16} className="inline mr-2" />
            Follow Us On Instagram
          </h4>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
            {instagramImages.map((img, i) => (
              <a
                key={i}
                href="#"
                className="group relative aspect-square overflow-hidden rounded-lg"
              >
                <img
                  src={img}
                  alt={`Instagram post ${i + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Instagram size={20} style={{ color: '#03A9F4' }} />
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8" style={{ borderTop: '1px solid rgba(3, 169, 244,0.1)' }}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs" style={{ color: '#666', fontFamily: "'Poppins', sans-serif" }}>
              &copy; {new Date().getFullYear()} Mastermind Solution. All rights reserved.
            </p>
            <p className="text-xs" style={{ color: '#666', fontFamily: "'Poppins', sans-serif" }}>
              Crafted with passion for extraordinary events
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
