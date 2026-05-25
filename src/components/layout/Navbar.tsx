import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, ChevronDown } from 'lucide-react';
import logoImg from '../../assets/logo.png';

const serviceLinks = [
  { name: 'Corporate & Expo Events', path: '/corporate-expo-events' },
  { name: 'Wedding & Engagement', path: '/wedding-engagement' },
  { name: 'Birthday Celebrations', path: '/birthday-celebrations' },
  { name: 'Concert & Entertainment', path: '/concert-entertainment' },
];

const mainLinks = [
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/about' },
  { name: 'Services', path: '#', isDropdown: true },
  { name: 'Portfolio', path: '/portfolio' },
  { name: 'Packages', path: '/#packages' },
  { name: 'Contact Us', path: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('mastermind_theme');
    return saved !== null ? JSON.parse(saved) : true;
  });
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    localStorage.setItem('mastermind_theme', JSON.stringify(darkMode));
    if (darkMode) {
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
    }
  }, [darkMode]);

  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
  }, [location]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (path: string) => {
    if (path.startsWith('/#')) {
      const id = path.slice(2);
      if (location.pathname === '/') {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        window.location.href = path;
      }
    }
    setMobileOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'nav-glass py-1 shadow-lg' : 'py-1.5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-12">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group flex-shrink-0">
          <img
            src={logoImg}
            alt="Mastermind Solution"
            className="h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
          <div className="hidden sm:flex flex-col justify-center">
            <h1 className="text-[11px] font-bold tracking-wider leading-none" style={{ fontFamily: "'Cinzel', serif", color: darkMode ? '#fff' : '#0A0A0A' }}>
              MASTERMIND EVENTS
            </h1>
            <p className="text-[6.5px] tracking-[1.5px] mt-1 font-bold uppercase leading-none" style={{ fontFamily: "'Montserrat', sans-serif", color: 'var(--color-gold-light)' }}>
              We Plan • We Design • We Deliver
            </p>
          </div>
        </Link>

        {/* Desktop Nav with space-between items style */}
        <div className="hidden lg:flex items-center justify-between w-full max-w-xl mx-8 px-4">
          {mainLinks.map((link) => (
            <div key={link.name} className="relative animate-fade-in" ref={link.isDropdown ? dropdownRef : undefined}>
              {link.isDropdown ? (
                /* Services Dropdown Trigger */
                <button
                  onClick={() => setServicesOpen(!servicesOpen)}
                  onMouseEnter={() => setServicesOpen(true)}
                  className="text-[11px] font-semibold tracking-wide animated-underline transition-colors duration-300 hover:text-[#03A9F4] flex items-center gap-1.5"
                  style={{ fontFamily: "'Montserrat', sans-serif", color: servicesOpen ? 'var(--color-gold)' : darkMode ? '#ccc' : '#555' }}
                >
                  {link.name}
                  <ChevronDown
                    size={13}
                    className="transition-transform duration-300 text-gold"
                    style={{ transform: servicesOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                  />
                </button>
              ) : link.path.startsWith('/#') ? (
                <a
                  href={link.path}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.path);
                  }}
                  className="text-[11px] font-semibold tracking-wide animated-underline transition-colors duration-300 hover:text-[#03A9F4]"
                  style={{ fontFamily: "'Montserrat', sans-serif", color: darkMode ? '#ccc' : '#555' }}
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  to={link.path}
                  className="text-[11px] font-semibold tracking-wide animated-underline transition-colors duration-300 hover:text-[#03A9F4]"
                  style={{ fontFamily: "'Montserrat', sans-serif", color: darkMode ? '#ccc' : '#555' }}
                >
                  {link.name}
                </Link>
              )}

              {/* Services Dropdown Menu */}
              {link.isDropdown && (
                <AnimatePresence>
                  {servicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      onMouseEnter={() => setServicesOpen(true)}
                      onMouseLeave={() => setServicesOpen(false)}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 rounded-xl overflow-hidden z-50"
                      style={{
                        background: 'rgba(15, 15, 15, 0.96)',
                        backdropFilter: 'blur(24px)',
                        border: '1px solid rgba(3, 169, 244, 0.18)',
                        boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
                      }}
                    >
                      {/* Top gold accent */}
                      <div className="h-[1px] w-full" style={{ background: 'linear-gradient(90deg, transparent, var(--color-gold), transparent)' }} />
                      <div className="py-1.5">
                        {serviceLinks.map((svc, idx) => (
                          <Link
                            key={svc.name}
                            to={svc.path}
                            className="block px-4 py-2 text-[11px] font-medium tracking-wide transition-all duration-200 hover:bg-[#03A9F4]/8 hover:text-[#03A9F4] hover:pl-5"
                            style={{
                              fontFamily: "'Montserrat', sans-serif",
                              color: location.pathname === svc.path ? 'var(--color-gold)' : '#bbb',
                              borderBottom: idx < serviceLinks.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                            }}
                          >
                            {svc.name}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          ))}
        </div>

        {/* Right Side */}
        <div className="hidden lg:flex items-center gap-2">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-gold/10"
            style={{ border: '1px solid rgba(3,169,244,0.3)', color: 'var(--color-gold)' }}
          >
            {darkMode ? <Sun size={12} /> : <Moon size={12} />}
          </button>
          <a
            href="#contact"
            className="btn-gold text-[10px] px-4 py-1.5"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('/#contact');
            }}
          >
            Book Now
          </a>
        </div>

        {/* Mobile Toggle */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="w-7 h-7 rounded-full flex items-center justify-center"
            style={{ border: '1px solid rgba(3,169,244,0.3)', color: 'var(--color-gold)' }}
          >
            {darkMode ? <Sun size={12} /> : <Moon size={12} />}
          </button>
          <button onClick={() => setMobileOpen(!mobileOpen)} style={{ color: darkMode ? '#fff' : '#0A0A0A' }}>
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden overflow-hidden shadow-2xl border-b border-gold/10"
            style={{ background: darkMode ? 'rgba(10,10,10,0.98)' : 'rgba(245,245,240,0.98)' }}
          >
            <div className="px-6 py-3 space-y-1">
              {mainLinks.map((link) => (
                <div key={link.name}>
                  {link.isDropdown ? (
                    /* Mobile Services Accordion */
                    <div>
                      <button
                        onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                        className="flex items-center justify-between w-full py-2 text-[11px] font-semibold tracking-wide"
                        style={{ fontFamily: "'Montserrat', sans-serif", color: darkMode ? '#ccc' : '#555' }}
                      >
                        {link.name}
                        <ChevronDown
                          size={12}
                          className="transition-transform duration-300"
                          style={{ transform: mobileServicesOpen ? 'rotate(180deg)' : 'rotate(0)', color: 'var(--color-gold)' }}
                        />
                      </button>
                      <AnimatePresence>
                        {mobileServicesOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden pl-4 border-l border-gold/20"
                          >
                            {serviceLinks.map((svc) => (
                              <Link
                                key={svc.name}
                                to={svc.path}
                                onClick={() => setMobileOpen(false)}
                                className="block py-1.5 text-[10px] font-medium tracking-wide transition-colors hover:text-[#03A9F4]"
                                style={{ fontFamily: "'Montserrat', sans-serif", color: location.pathname === svc.path ? '#03A9F4' : '#999' }}
                              >
                                {svc.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : link.path.startsWith('/#') ? (
                    <a
                      href={link.path}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(link.path);
                      }}
                      className="block py-2 text-[11px] font-semibold tracking-wide"
                      style={{ fontFamily: "'Montserrat', sans-serif", color: darkMode ? '#ccc' : '#555' }}
                    >
                      {link.name}
                    </a>
                  ) : (
                    <Link
                      to={link.path}
                      onClick={() => setMobileOpen(false)}
                      className="block py-2 text-[11px] font-semibold tracking-wide"
                      style={{ fontFamily: "'Montserrat', sans-serif", color: darkMode ? '#ccc' : '#555' }}
                    >
                      {link.name}
                    </Link>
                  )}
                </div>
              ))}
              <div className="pt-2">
                <a
                  href="#contact"
                  className="btn-gold text-[10px] text-center py-2 block"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('/#contact');
                  }}
                >
                  Book Consultation
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
