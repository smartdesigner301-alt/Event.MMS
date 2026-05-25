import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check, Sparkles, Send, X, Calculator, Download, Bookmark } from 'lucide-react';
import ScrollReveal from '../../components/effects/ScrollReveal';
import SectionHeading from '../../components/ui/SectionHeading';
import { supabase } from '../../lib/supabase';
import { fallbackPackages } from '../../lib/fallbackData';

interface ServiceConfig {
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  description: string;
  features: string[];
  eventType: string;
  galleryImages: { src: string; title: string }[];
}

export default function ServicePageTemplate({ config }: { config: ServiceConfig }) {
  const [packages, setPackages] = useState<any[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Calculator States
  const [weddingType, setWeddingType] = useState('Royal');
  const [guestCount, setGuestCount] = useState(
    config.eventType === 'birthday' ? 100 : config.eventType === 'concert' ? 1500 : config.eventType === 'corporate' ? 500 : 300
  );
  const [stallsCount, setStallsCount] = useState(15);
  const [stallShell, setStallShell] = useState('Standard Shell');
  const [protocolMgmt, setProtocolMgmt] = useState('Standard Security');
  const [securityLevel, setSecurityLevel] = useState('Standard Guarding');
  const [bouncersCount, setBouncersCount] = useState(10);
  const [customReq, setCustomReq] = useState('');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [packageTier, setPackageTier] = useState('Premium');

  // Inline Results and Booking States
  const [inquiryStep, setInquiryStep] = useState(1); // 1 = Review Estimate, 2 = Enter Form, 3 = Success
  const [result, setResult] = useState<{ min: number; max: number; maxEstimate: number; package: string } | null>(null);
  const [formData, setFormData] = useState({
    full_name: '', phone: '', email: '', event_date: '', city: 'Faisalabad', additional_notes: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [planSaved, setPlanSaved] = useState(false);

  useEffect(() => {
    const fetchServicePackages = async () => {
      try {
        const { data } = await supabase.from('packages').select('*').eq('event_type', config.eventType).eq('is_active', true);
        if (data && data.length > 0) {
          setPackages(data);
        } else {
          setPackages(fallbackPackages.filter((p) => p.event_type === config.eventType && p.is_active));
        }
      } catch {
        setPackages(fallbackPackages.filter((p) => p.event_type === config.eventType && p.is_active));
      }
    };
    fetchServicePackages();
  }, [config.eventType]);

  // Set default services depending on category
  useEffect(() => {
    if (config.eventType === 'wedding') {
      setSelectedServices(['Floral Decoration', 'Stage Design', 'Photography']);
      setPackageTier('Premium');
    } else if (config.eventType === 'birthday') {
      setSelectedServices(['Balloon Decoration', 'Theme Setup', 'Cake Table']);
      setPackageTier('Premium');
    } else if (config.eventType === 'corporate') {
      setSelectedServices(['Stall Designing', 'LED Displays', 'Hall Management']);
      setPackageTier('Premium');
    } else if (config.eventType === 'concert') {
      setSelectedServices(['Stage Setup', 'Sound System', 'Lighting']);
      setPackageTier('Premium');
    }
  }, [config.eventType]);

  // Dynamic Dynamic Calculation in Real-time!
  useEffect(() => {
    if (selectedServices.length === 0) {
      setResult(null);
      return;
    }
    let basePrice = 0;
    let serviceMultiplier = selectedServices.length * 0.15 + 0.8;
    let tierMultiplier = packageTier === 'Basic' || packageTier === 'Standard' ? 0.8 : packageTier === 'Premium' ? 1.2 : 1.8;

    if (config.eventType === 'wedding') {
      const typeMult = weddingType === 'Royal' ? 1.5 : weddingType === 'Luxury' ? 1.2 : weddingType === 'Eastern' ? 0.9 : 1.0;
      basePrice = guestCount * 2500 * typeMult * serviceMultiplier * tierMultiplier;
    } else if (config.eventType === 'birthday') {
      basePrice = guestCount * 1200 * serviceMultiplier * tierMultiplier;
    } else if (config.eventType === 'corporate') {
      const shellCost = stallShell === 'Standard Shell' ? stallsCount * 25000 : stallShell === 'Custom Built' ? stallsCount * 60000 : 0;
      const protocolCost = protocolMgmt === 'VIP Protocol' ? 300000 : protocolMgmt === 'Standard Security' ? 100000 : 0;
      basePrice = (guestCount * 1500 + shellCost + protocolCost) * serviceMultiplier * tierMultiplier;
    } else if (config.eventType === 'concert') {
      const bouncerCost = bouncersCount * 8000;
      const securityCost = securityLevel === 'High Profile (VIP)' ? 250000 : securityLevel === 'Standard Guarding' ? 120000 : 50000;
      basePrice = (guestCount * 600 + bouncerCost + securityCost) * serviceMultiplier * tierMultiplier;
    }

    const min = Math.round(basePrice * 0.85);
    const max = Math.round(basePrice * 1.15);
    const maxEstimate = Math.round(basePrice * 1.85);

    setResult({ min, max, maxEstimate, package: packageTier });
  }, [config.eventType, selectedServices, packageTier, guestCount, weddingType, stallShell, protocolMgmt, securityLevel, bouncersCount, stallsCount]);

  const toggleService = (name: string) => {
    setSelectedServices((prev) => prev.includes(name) ? prev.filter((s) => s !== name) : [...prev, name]);
  };

  const formatPKR = (n: number) => `PKR ${n.toLocaleString()}`;

  const handleSavePlan = () => {
    if (!result) return;
    const existingPlans = JSON.parse(localStorage.getItem('mastermind_saved_plans') || '[]');
    const newPlan = {
      id: 'plan_' + Date.now(),
      eventType: config.eventType,
      eventTypeLabel: config.heroTitle,
      guestCount,
      selectedServices,
      packageType: result.package,
      minBudget: result.min,
      maxBudget: result.max,
      maxEstimate: result.maxEstimate,
      savedAt: new Date().toISOString()
    };
    localStorage.setItem('mastermind_saved_plans', JSON.stringify([newPlan, ...existingPlans]));
    setPlanSaved(true);
  };

  const handleDownloadPDF = () => {
    if (!result) return;
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    printWindow.document.write(`
      <html>
        <head>
          <title>Mastermind Solution - Event Quote</title>
          <style>
            body { font-family: 'Cinzel', 'Montserrat', sans-serif; background: #0A0A0A; color: #FFFFFF; padding: 40px; }
            .header { border-bottom: 2px solid #03A9F4; padding-bottom: 20px; margin-bottom: 40px; text-align: center; }
            .logo { font-size: 28px; font-weight: bold; letter-spacing: 2px; color: #03A9F4; }
            .title { font-size: 22px; margin-top: 10px; text-transform: uppercase; color: #fff; }
            .details { margin-bottom: 40px; }
            .details-row { display: flex; justify-content: space-between; border-bottom: 1px solid #1A1A1A; padding: 12px 0; font-size: 14px; }
            .label { color: #03A9F4; font-weight: bold; text-transform: uppercase; }
            .value { color: #FFFFFF; }
            .total { font-size: 24px; font-weight: bold; text-align: center; margin-top: 40px; border: 1px solid #03A9F4; padding: 25px; background: #1A1A1A; border-radius: 8px; }
            .footer { margin-top: 60px; text-align: center; font-size: 12px; color: #666; border-top: 1px solid #1A1A1A; padding-top: 20px; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="logo">MASTERMIND SOLUTION</div>
            <div class="title">${config.heroTitle} Quote</div>
          </div>
          <div class="details">
            <div class="details-row"><span class="label">Event Category</span><span class="value">${config.heroTitle}</span></div>
            <div class="details-row"><span class="label">Expected Volume</span><span class="value">${guestCount} ${config.eventType === 'concert' ? 'Tickets' : 'Guests'}</span></div>
            <div class="details-row"><span class="label">Package Tier</span><span class="value">${result.package}</span></div>
            <div class="details-row"><span class="label">Required Services</span><span class="value">${selectedServices.join(', ')}</span></div>
            ${config.eventType === 'wedding' ? `<div class="details-row"><span class="label">Wedding Type</span><span class="value">${weddingType}</span></div>` : ''}
            ${config.eventType === 'corporate' ? `<div class="details-row"><span class="label">Stalls Count</span><span class="value">${stallsCount} (${stallShell})</span></div>` : ''}
            ${config.eventType === 'concert' ? `<div class="details-row"><span class="label">Security Level</span><span class="value">${securityLevel} (${bouncersCount} Bouncers)</span></div>` : ''}
            ${customReq ? `<div class="details-row"><span class="label">Requirements</span><span class="value">${customReq}</span></div>` : ''}
          </div>
          <div class="total">
            Estimated Budget Range<br/>
            <span style="color: #03A9F4; font-size: 32px; font-family: 'Cinzel', serif; display: block; margin-top: 10px;">${formatPKR(result.min)} - ${formatPKR(result.max)}</span>
            <span style="color: #999; font-size: 14px; display: block; margin-top: 8px;">Maximum Possible: ${formatPKR(result.maxEstimate)}</span>
          </div>
          <div class="footer">
            <p>Thank you for choosing Mastermind Solution. Our luxury planners will connect with you to refine this quote.</p>
            <p>Faisalabad, Pakistan • info@mastermindsolution.com • +92 339 0122641</p>
          </div>
          <script>
            window.onload = function() { window.print(); window.close(); }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const submitInquiry = async () => {
    if (!result) return;
    setSubmitting(true);
    const budgetRange = `${formatPKR(result.min)} - ${formatPKR(result.max)}`;

    try {
      await supabase.from('inquiries').insert({
        full_name: formData.full_name,
        phone: formData.phone,
        email: formData.email,
        event_date: formData.event_date || null,
        city: formData.city,
        guest_count: guestCount,
        event_type: config.eventType,
        selected_services: selectedServices,
        selected_package: result.package,
        estimated_budget: budgetRange,
        additional_notes: customReq || formData.additional_notes,
      });
    } catch {
      // fallback handling
    }

    // Sync to local inquiries
    const localInquiries = JSON.parse(localStorage.getItem('mastermind_inquiries') || '[]');
    const newInquiry = {
      id: 'inq_' + Date.now(),
      full_name: formData.full_name,
      phone: formData.phone,
      email: formData.email,
      event_date: formData.event_date || new Date().toISOString().split('T')[0],
      city: formData.city,
      guest_count: guestCount,
      event_type: config.eventType,
      selected_package: result.package,
      estimated_budget: budgetRange,
      additional_notes: customReq || formData.additional_notes,
      status: 'pending',
      created_at: new Date().toISOString()
    };
    localStorage.setItem('mastermind_inquiries', JSON.stringify([newInquiry, ...localInquiries]));

    setSubmitting(false);
    setInquiryStep(3);
    // Send email notification to Gmail
    try {
      const { default: emailjs } = await import('@emailjs/browser');
      await emailjs.send(
        'service_mastermind',
        'template_inquiry',
        {
          from_name: formData.full_name,
          phone: formData.phone,
          from_email: formData.email || 'Not provided',
          event_type: config.heroTitle,
          event_date: formData.event_date || 'Not specified',
          city: formData.city,
          guest_count: guestCount,
          selected_package: result?.package,
          estimated_budget: result ? `${formatPKR(result.min)} - ${formatPKR(result.max)}` : '',
          services: selectedServices.join(', '),
          additional_notes: customReq || formData.additional_notes || 'None',
          to_email: 'mastermindevents.fsd@gmail.com',
        },
        'YOUR_EMAILJS_PUBLIC_KEY'
      );
    } catch {
      // email fallback silent
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={config.heroImage} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(10,10,10,0.6), rgba(10,10,10,0.75), rgba(10,10,10,0.95))' }} />
        </div>

        {/* Floating Side Accents - Updated to use non-repeating indexes 3 and 4! */}
        <div className="absolute top-32 left-8 w-40 h-56 rounded-xl overflow-hidden opacity-20 hidden lg:block border border-gold/20">
          <img src={config.galleryImages[3]?.src || config.heroImage} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute bottom-32 right-8 w-40 h-56 rounded-xl overflow-hidden opacity-20 hidden lg:block border border-gold/20">
          <img src={config.galleryImages[4]?.src || config.heroImage} alt="" className="w-full h-full object-cover" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto mt-10">
          <motion.p
            className="text-xs tracking-[5px] uppercase mb-4 text-[#03A9F4]"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Mastermind Premium Celebrations
          </motion.p>
          <motion.h1
            className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 leading-tight"
            style={{ fontFamily: "'Cinzel', serif" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <span className="gold-text">{config.heroTitle}</span>
          </motion.h1>
          <motion.p
            className="text-sm md:text-base max-w-xl mx-auto text-white/80"
            style={{ fontFamily: "'Poppins', sans-serif" }}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {config.heroSubtitle}
          </motion.p>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal direction="left">
              <div className="space-y-6">
                <span className="text-[#03A9F4] font-semibold text-xs tracking-wider uppercase">Overview</span>
                <h2 className="text-3xl font-bold" style={{ fontFamily: "'Cinzel', serif" }}>Luxury Event Experience</h2>
                <p className="text-sm leading-relaxed text-white/70" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  {config.description}
                </p>
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {config.features.slice(0, 8).map((f) => (
                    <div key={f} className="flex items-center gap-2">
                      <Check size={14} className="text-[#03A9F4]" />
                      <span className="text-xs text-white/80 font-medium" style={{ fontFamily: "'Poppins', sans-serif" }}>{f}</span>
                    </div>
                  ))}
                </div>
                <button
                  className="btn-gold mt-6 text-xs flex items-center gap-1.5"
                  onClick={() => {
                    const el = document.getElementById('category-calc');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <Calculator size={14} />
                  Estimate Pricing
                </button>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right">
              <div className="relative">
                {/* Floating image items - uses indexes 0, 1, 2 only, no repetitions! */}
                <div className="glass-card overflow-hidden border border-gold/15">
                  <img src={config.galleryImages[0]?.src} alt="" className="w-full h-[380px] object-cover" />
                </div>
                <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-xl overflow-hidden shadow-2xl hidden md:block border-2 border-black">
                  <img src={config.galleryImages[1]?.src} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="absolute -top-6 -right-6 w-24 h-24 rounded-xl overflow-hidden shadow-2xl hidden md:block border-2 border-black">
                  <img src={config.galleryImages[2]?.src} alt="" className="w-full h-full object-cover" />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Category-Specific Smart Calculator Section - Made 100% Inline like the homepage! */}
      <section id="category-calc" className="py-20" style={{ background: 'var(--bg-secondary)' }}>
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeading
            small="Interactive System"
            title={`${config.heroTitle} Budget Planner`}
            subtitle="Configure your customized event options below and watch estimates adjust instantly inside the page."
          />

          <ScrollReveal>
            <div className="glass-card p-6 md:p-8 border border-gold/20 relative" style={{ background: 'var(--card-bg)' }}>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* ─── LEFT COLUMN: Inputs (lg:col-span-7) ─── */}
                <div className="lg:col-span-7 space-y-6">
                  
                  {/* 1. Category Specific Dropdowns */}
                  {config.eventType === 'wedding' && (
                    <div>
                      <label className="block text-[10px] font-bold mb-2 tracking-widest uppercase text-gold/90" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                        1. Wedding Backdrop Style
                      </label>
                      <select
                        value={weddingType}
                        onChange={(e) => setWeddingType(e.target.value)}
                        className="w-full px-3.5 py-3 rounded-xl text-xs bg-black/40 outline-none border border-white/10 text-white focus:border-gold/50"
                      >
                        <option value="Royal">Royal Theme (Grand imported floral layout)</option>
                        <option value="Luxury">Luxury Theme (Modern high-end accents)</option>
                        <option value="Eastern">Eastern Theme (Traditional elegant culture styling)</option>
                        <option value="Western">Western Theme (Clean minimal aesthetic)</option>
                      </select>
                    </div>
                  )}

                  {config.eventType === 'corporate' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold mb-2 tracking-widest uppercase text-gold/90" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                          1. Stall Design Requirements
                        </label>
                        <select
                          value={stallShell}
                          onChange={(e) => setStallShell(e.target.value)}
                          className="w-full px-3.5 py-3 rounded-xl text-xs bg-black/40 outline-none border border-white/10 text-white focus:border-gold/50"
                        >
                          <option value="Standard Shell">Standard Octanorm Shell Structures</option>
                          <option value="Custom Built">Custom Built Wooden Stall structures</option>
                          <option value="No Shell Needed">No Shell (Exhibition floor space only)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold mb-2 tracking-widest uppercase text-gold/90" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                          2. Protocol Management Tier
                        </label>
                        <select
                          value={protocolMgmt}
                          onChange={(e) => setProtocolMgmt(e.target.value)}
                          className="w-full px-3.5 py-3 rounded-xl text-xs bg-black/40 outline-none border border-white/10 text-white focus:border-gold/50"
                        >
                          <option value="VIP Protocol">VIP Protocol & Hostess Staff</option>
                          <option value="Standard Security">Standard Event Security guards</option>
                          <option value="None">None (General hall coordination)</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {config.eventType === 'concert' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold mb-2 tracking-widest uppercase text-gold/90" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                          1. Specialized Security Services
                        </label>
                        <select
                          value={securityLevel}
                          onChange={(e) => setSecurityLevel(e.target.value)}
                          className="w-full px-3.5 py-3 rounded-xl text-xs bg-black/40 outline-none border border-white/10 text-white focus:border-gold/50"
                        >
                          <option value="High Profile (VIP)">High Profile VIP Escorts & Metal Scans</option>
                          <option value="Standard Guarding">Standard Barricade Crowd Guards</option>
                          <option value="Basic Crowd Control">Basic Gate Management only</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold mb-2 tracking-widest uppercase text-gold/90" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                          2. Security Bouncers ({bouncersCount} Bouncers)
                        </label>
                        <input
                          type="range"
                          min="0"
                          max="50"
                          step="5"
                          value={bouncersCount}
                          onChange={(e) => setBouncersCount(Number(e.target.value))}
                          className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#03A9F4] mt-3"
                        />
                      </div>
                    </div>
                  )}

                  {/* 2. Scalable slider for volume */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-[10px] font-bold tracking-widest uppercase text-gold/90" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                        {config.eventType === 'concert' ? 'Target Tickets / Capacity' : 'Expected Guests'}
                      </label>
                      <span className="text-xs font-bold text-white bg-gold/10 px-2.5 py-0.5 rounded-full border border-gold/20">
                        {guestCount} {config.eventType === 'concert' ? 'Tickets' : 'Guests'}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={config.eventType === 'birthday' ? 50 : config.eventType === 'concert' ? 500 : 100}
                      max={config.eventType === 'corporate' ? 3000 : config.eventType === 'concert' ? 10000 : 1500}
                      step={config.eventType === 'concert' ? 500 : 50}
                      value={guestCount}
                      onChange={(e) => setGuestCount(Number(e.target.value))}
                      className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#03A9F4]"
                    />
                  </div>

                  {config.eventType === 'corporate' && (
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="block text-[10px] font-bold tracking-widest uppercase text-gold/90" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                          Exhibition Stall Count
                        </label>
                        <span className="text-xs font-bold text-white bg-gold/10 px-2.5 py-0.5 rounded-full border border-gold/20">{stallsCount} Stalls</span>
                      </div>
                      <input
                        type="range"
                        min="2"
                        max="100"
                        value={stallsCount}
                        onChange={(e) => setStallsCount(Number(e.target.value))}
                        className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#03A9F4]"
                      />
                    </div>
                  )}

                  {/* 3. Custom services checklists */}
                  <div>
                    <label className="block text-[10px] font-bold mb-3 tracking-widest uppercase text-gold/90" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                      Required Services
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {(config.eventType === 'wedding' ? [
                        'Floral Decoration', 'Stage Design', 'Catering', 'Photography', 'Couple Entry', 'Lighting', 'Sound System'
                      ] : config.eventType === 'birthday' ? [
                        'Balloon Decoration', 'Theme Setup', 'Entertainment', 'Cake Table', 'Photography'
                      ] : config.eventType === 'corporate' ? [
                        'Stall Designing', 'Booth Branding', 'LED Displays', 'Exhibition Setup', 'Hall Management', 'Visitor Management'
                      ] : [
                        'Stage Setup', 'DJ Setup', 'Sound System', 'LED Walls', 'Artist Management', 'Lighting'
                      ]).map((srv) => {
                        const active = selectedServices.includes(srv);
                        return (
                          <button
                            key={srv}
                            onClick={() => toggleService(srv)}
                            className="flex items-center gap-2 p-2.5 rounded-lg text-xs font-semibold border transition-all text-left"
                            style={{
                              background: active ? 'rgba(3, 169, 244,0.08)' : 'rgba(255,255,255,0.02)',
                              borderColor: active ? '#03A9F4' : 'rgba(255,255,255,0.08)',
                              color: active ? '#03A9F4' : '#888'
                            }}
                          >
                            <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center border flex-shrink-0 ${active ? 'border-gold bg-gold' : 'border-white/20'}`}>
                              {active && <Check size={8} className="text-black stroke-[3px]" />}
                            </div>
                            <span>{srv}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* 4. Packages selector */}
                  <div>
                    <label className="block text-[10px] font-bold mb-2.5 tracking-widest uppercase text-gold/90" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                      Package Selection
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {(config.eventType === 'wedding' ? [
                        'Basic', 'Premium', 'Luxury VIP'
                      ] : config.eventType === 'birthday' ? [
                        'Basic', 'Premium', 'Luxury'
                      ] : config.eventType === 'corporate' ? [
                        'Basic', 'Premium', 'Corporate VIP'
                      ] : [
                        'Standard', 'Premium', 'VIP Concert Package'
                      ]).map((tier) => {
                        const active = packageTier === tier;
                        return (
                          <button
                            key={tier}
                            onClick={() => setPackageTier(tier)}
                            className="py-2.5 px-3 rounded-xl text-xs font-bold border text-center transition-all"
                            style={{
                              background: active ? 'rgba(3, 169, 244,0.12)' : 'rgba(255,255,255,0.02)',
                              borderColor: active ? '#03A9F4' : 'rgba(255,255,255,0.08)',
                              color: active ? '#03A9F4' : '#888'
                            }}
                          >
                            {tier}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Textarea requirements */}
                  <div>
                    <label className="block text-[10px] font-bold mb-2 tracking-widest uppercase text-gold/90" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                      Special Requirements (Optional)
                    </label>
                    <textarea
                      value={customReq}
                      onChange={(e) => setCustomReq(e.target.value)}
                      rows={2}
                      placeholder="Specify thematic color accents, food menu specifications, artist requests, etc."
                      className="w-full px-4 py-2.5 rounded-lg text-xs bg-black/40 outline-none border border-white/10 text-white focus:border-gold/50 resize-none"
                    />
                  </div>

                </div>

                {/* ─── RIGHT COLUMN: Inline Results Panel (lg:col-span-5) ─── */}
                <div className="lg:col-span-5">
                  <AnimatePresence mode="wait">
                    {result ? (
                      <motion.div
                        key="results-panel"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="h-full flex flex-col justify-between p-5 md:p-6 rounded-2xl border border-gold/25"
                        style={{ background: 'var(--card-bg)', boxShadow: '0 10px 40px rgba(0,0,0,0.2)' }}
                      >
                        <div className="space-y-5">
                          
                          {/* Section Header */}
                          <div className="text-center relative">
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent" />
                            <Sparkles size={24} className="mx-auto mb-1 text-gold animate-pulse" />
                            <h3 className="text-base font-bold uppercase tracking-wider text-white" style={{ fontFamily: "'Cinzel', serif" }}>
                              Live Budget Estimate
                            </h3>
                            <p className="text-[9px] text-white/40 font-bold uppercase mt-0.5" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                              {config.heroTitle} • {result.package}
                            </p>
                          </div>

                          {/* Gold Pricing Card */}
                          <div className="p-4 rounded-xl border border-gold/20 bg-gold/5 text-center space-y-2.5">
                            <p className="text-[9px] uppercase tracking-widest text-[#03A9F4] font-bold">Estimated Cost Range</p>
                            <h4 className="text-xl md:text-2xl font-bold gold-text leading-none" style={{ fontFamily: "'Cinzel', serif" }}>
                              {formatPKR(result.min)} – {formatPKR(result.max)}
                            </h4>
                            <div className="h-[1px] w-full bg-white/5" />
                            <div className="flex items-center justify-center gap-1.5">
                              <span className="text-[8px] text-white/40 uppercase tracking-widest font-bold">Maximum Estimate:</span>
                              <span className="text-xs font-bold text-gold">{formatPKR(result.maxEstimate)}</span>
                            </div>
                          </div>

                          {/* Services List Tagged */}
                          <div>
                            <h5 className="text-[9px] font-bold text-[#03A9F4] uppercase tracking-widest mb-1.5">Included Services</h5>
                            <div className="flex flex-wrap gap-1 max-h-[88px] overflow-y-auto pr-1">
                              {selectedServices.map((lbl) => (
                                <span key={lbl} className="px-2 py-0.5 rounded-full text-[8px] font-semibold border border-gold/15 bg-gold/5 text-[#03A9F4]">
                                  {lbl}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Multi-step inquiry section inline */}
                          <div className="border-t border-white/5 pt-4">
                            {inquiryStep === 1 && (
                              <div className="space-y-3">
                                {/* Actions */}
                                <div className="grid grid-cols-2 gap-2">
                                  <button
                                    onClick={handleSavePlan}
                                    className="flex items-center justify-center gap-1.5 p-2 rounded-lg text-[10px] font-bold border border-white/10 hover:border-gold transition-all"
                                    style={{ color: planSaved ? '#25D366' : '#fff' }}
                                  >
                                    <Bookmark size={11} className={planSaved ? 'fill-[#25D366] stroke-none' : ''} />
                                    {planSaved ? 'Saved!' : 'Save Estimate'}
                                  </button>
                                  <button
                                    onClick={handleDownloadPDF}
                                    className="flex items-center justify-center gap-1.5 p-2 rounded-lg text-[10px] font-bold border border-white/10 hover:border-gold transition-all text-white"
                                  >
                                    <Download size={11} />
                                    PDF Quote
                                  </button>
                                </div>

                                <button
                                  onClick={() => setInquiryStep(2)}
                                  className="btn-gold w-full flex items-center justify-center gap-2 py-2.5 text-xs font-bold"
                                >
                                  Book Consultation
                                  <ArrowRight size={14} />
                                </button>
                              </div>
                            )}

                            {inquiryStep === 2 && (
                              <div className="space-y-2.5 animate-fade-in">
                                <h4 className="text-[10px] font-bold uppercase tracking-wider text-gold">Consultation Details</h4>
                                <div className="space-y-2">
                                  <input
                                    type="text"
                                    required
                                    placeholder="Full Name"
                                    value={formData.full_name}
                                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                                    className="w-full px-3 py-1.5 rounded-lg text-xs bg-black/40 border border-white/10 text-white focus:border-gold/50 outline-none"
                                  />
                                  <input
                                    type="tel"
                                    required
                                    placeholder="Phone Number (+92 339 0122641)"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="w-full px-3 py-1.5 rounded-lg text-xs bg-black/40 border border-white/10 text-white focus:border-gold/50 outline-none"
                                  />
                                  <input
                                    type="email"
                                    placeholder="Email Address (Optional)"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full px-3 py-1.5 rounded-lg text-xs bg-black/40 border border-white/10 text-white focus:border-gold/50 outline-none"
                                  />
                                  <input
                                    type="date"
                                    value={formData.event_date}
                                    onChange={(e) => setFormData({ ...formData, event_date: e.target.value })}
                                    className="w-full px-3 py-1.5 rounded-lg text-xs bg-black/40 border border-white/10 text-white focus:border-gold/50 outline-none"
                                  />
                                </div>

                                <div className="grid grid-cols-2 gap-2 pt-1">
                                  <button
                                    onClick={() => setInquiryStep(1)}
                                    className="p-2 rounded-lg text-[9px] font-bold border border-white/10 text-white/70 hover:text-white"
                                  >
                                    Back
                                  </button>
                                  <button
                                    onClick={submitInquiry}
                                    className="btn-gold flex items-center justify-center gap-1.5 py-2 text-[9px] font-bold"
                                    disabled={submitting || !formData.full_name || !formData.phone}
                                  >
                                    {submitting ? 'Sending...' : 'Send Inquiry'}
                                    {!submitting && <Send size={9} />}
                                  </button>
                                </div>
                              </div>
                            )}

                            {inquiryStep === 3 && (
                              <div className="text-center py-4 space-y-2.5 animate-bounce-short">
                                <div className="w-10 h-10 rounded-full border border-gold flex items-center justify-center mx-auto bg-gold/10">
                                  <Sparkles size={16} className="text-gold" />
                                </div>
                                <div>
                                  <h4 className="text-xs font-bold text-white uppercase tracking-wider" style={{ fontFamily: "'Cinzel', serif" }}>
                                    Inquiry Submitted!
                                  </h4>
                                  <p className="text-[9px] text-white/40 max-w-xs mx-auto mt-0.5" style={{ fontFamily: "'Poppins', sans-serif" }}>
                                    Our luxury planners in Faisalabad will contact you within 24 hours.
                                  </p>
                                </div>
                                <button
                                  onClick={() => setInquiryStep(1)}
                                  className="btn-outline-gold text-[8px] px-4 py-1 mt-1 font-semibold"
                                >
                                  Calculate Again
                                </button>
                              </div>
                            )}
                          </div>

                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="preview-panel"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="h-full border border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center text-center p-6 text-white/30 bg-black/10"
                      >
                        <Sparkles size={36} className="mb-2 text-gold/30 animate-pulse" />
                        <h4 className="text-xs font-bold text-white/50 uppercase tracking-widest" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                          Instant Estimation
                        </h4>
                        <p className="text-[10px] text-white/20 max-w-[220px] mx-auto mt-1 leading-relaxed">
                          Select required services on the left. The live budget will instantly formulate here.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20" style={{ background: 'var(--bg-tertiary)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading small="Gallery" title="Our Work" subtitle="A showcase of our finest events in this category." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {config.galleryImages.map((img, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div
                  className="group relative overflow-hidden rounded-xl cursor-pointer border border-white/5"
                  onClick={() => setSelectedImage(img.src.replace('w=600', 'w=1200'))}
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={img.src} alt={img.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <h4 className="text-sm font-bold text-white" style={{ fontFamily: "'Cinzel', serif" }}>{img.title}</h4>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Fullscreen Gallery Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(4px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              className="relative max-w-4xl w-full"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 w-8 h-8 rounded-full border border-gold/30 flex items-center justify-center text-[#03A9F4]"
              >
                <X size={16} />
              </button>
              <img src={selectedImage} alt="" className="w-full rounded-xl border border-white/10" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Packages Section */}
      {packages.length > 0 && (
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
            <img src={config.heroImage} alt="" className="w-full h-full object-cover" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6">
            <SectionHeading small="Packages" title="Pricing Tiers" subtitle="Select the perfect package class for your event." />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {packages.map((pkg, i) => (
                <ScrollReveal key={pkg.id} delay={i * 0.1}>
                  <div
                    className="relative h-full flex flex-col rounded-2xl overflow-hidden transition-all duration-300 border border-white/10 bg-black/40 backdrop-blur-md"
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = 'rgba(3, 169, 244,0.4)';
                      (e.currentTarget as HTMLElement).style.boxShadow = '0 0 30px rgba(3, 169, 244,0.1)';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)';
                      (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                    }}
                  >
                    {pkg.name.toLowerCase().includes('premium') || pkg.name.toLowerCase().includes('gold') ? (
                      <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: 'linear-gradient(90deg, transparent, #03A9F4, transparent)' }} />
                    ) : null}

                    <div className="relative h-32 overflow-hidden">
                      <img
                        src={config.galleryImages[i % config.galleryImages.length]?.src}
                        alt={pkg.name}
                        className="w-full h-full object-cover brightness-[0.25]"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <h3 className="text-lg font-bold text-white" style={{ fontFamily: "'Cinzel', serif" }}>{pkg.name}</h3>
                          <p className="text-[10px] text-gold font-semibold uppercase tracking-widest mt-1">
                            {pkg.name.toLowerCase().includes('vip') || pkg.name.toLowerCase().includes('luxury') ? 'VIP Elite Tier' : 'Standard Class'}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="text-center mb-5">
                          <p className="text-xs text-white/50 mb-3">{pkg.description}</p>
                          <div className="gold-text text-xl font-bold font-serif">
                            {formatPKR(pkg.price_min)} - {formatPKR(pkg.price_max)}
                          </div>
                        </div>
                        <div className="space-y-2 mb-6">
                          {(pkg.features as string[]).map((f: string) => (
                            <div key={f} className="flex items-start gap-2.5">
                              <Check size={12} className="text-[#03A9F4] mt-0.5" />
                              <span className="text-xs text-white/70" style={{ fontFamily: "'Poppins', sans-serif" }}>{f}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <button
                        className="btn-outline-gold w-full text-xs flex items-center justify-center gap-1 py-2"
                        onClick={() => {
                          setPackageTier(pkg.name.includes('Basic') || pkg.name.includes('Standard') ? 'Basic' : pkg.name.includes('Gold') || pkg.name.includes('Premium') ? 'Premium' : 'Luxury VIP');
                          const el = document.getElementById('category-calc');
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }}
                      >
                        Select Tier & Customize
                      </button>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
