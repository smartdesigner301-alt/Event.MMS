import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, Sparkles, ArrowRight, Download, Bookmark, Send, ChevronDown } from 'lucide-react';
import ScrollReveal from '../effects/ScrollReveal';
import SectionHeading from '../ui/SectionHeading';
import { supabase } from '../../lib/supabase';

/* ─── Event-Specific Service Configs (Corporate Priority first!) ─── */
const eventConfigs: Record<string, {
  label: string;
  image: string;
  services: { id: string; label: string; minPrice: number; maxPrice: number }[];
}> = {
  corporate: {
    label: 'Corporate & Expo Events',
    image: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=200',
    services: [
      { id: 'stall', label: 'Stall/Booth Setup (Per Stall)', minPrice: 15000, maxPrice: 50000 },
      { id: 'branding', label: 'Branding & Panaflex', minPrice: 20000, maxPrice: 80000 },
      { id: 'led', label: 'LED Screens & Walls', minPrice: 40000, maxPrice: 150000 },
      { id: 'stage', label: 'Stage & Podium Design', minPrice: 50000, maxPrice: 180000 },
      { id: 'sound', label: 'Professional Sound System', minPrice: 30000, maxPrice: 100000 },
      { id: 'security', label: 'Security & Protocol', minPrice: 25000, maxPrice: 70000 },
      { id: 'catering', label: 'Corporate Catering', minPrice: 800, maxPrice: 2500 },
      { id: 'hostess', label: 'Hostesses & Ushers', minPrice: 15000, maxPrice: 45000 },
    ],
  },
  wedding: {
    label: 'Wedding & Engagement',
    image: 'https://images.pexels.com/photos/1043902/pexels-photo-1043902.jpeg?auto=compress&cs=tinysrgb&w=200',
    services: [
      { id: 'stage', label: 'Stage & Backdrop Design', minPrice: 80000, maxPrice: 250000 },
      { id: 'catering', label: 'Catering (Per Head)', minPrice: 1200, maxPrice: 3500 },
      { id: 'decoration', label: 'Hall & Venue Decoration', minPrice: 60000, maxPrice: 200000 },
      { id: 'lighting', label: 'Lighting & Chandeliers', minPrice: 40000, maxPrice: 120000 },
      { id: 'photography', label: 'Photography & Cinematography', minPrice: 50000, maxPrice: 180000 },
      { id: 'dj', label: 'DJ & Sound System', minPrice: 25000, maxPrice: 80000 },
      { id: 'mehndi', label: 'Mehndi Night Setup', minPrice: 30000, maxPrice: 100000 },
      { id: 'bridal_car', label: 'Bridal Car Decoration', minPrice: 10000, maxPrice: 35000 },
    ],
  },
  birthday: {
    label: 'Birthday Celebrations',
    image: 'https://images.pexels.com/photos/6963417/pexels-photo-6963417.jpeg?auto=compress&cs=tinysrgb&w=200',
    services: [
      { id: 'theme', label: 'Theme Decoration', minPrice: 25000, maxPrice: 100000 },
      { id: 'balloon', label: 'Balloon Art & Arrangements', minPrice: 10000, maxPrice: 40000 },
      { id: 'cake', label: 'Custom Cake Table Setup', minPrice: 15000, maxPrice: 50000 },
      { id: 'photography', label: 'Photography & Video', minPrice: 20000, maxPrice: 70000 },
      { id: 'dj', label: 'DJ & Sound', minPrice: 15000, maxPrice: 50000 },
      { id: 'catering', label: 'Catering & Refreshments', minPrice: 500, maxPrice: 2000 },
      { id: 'bouncer', label: 'Bouncy Castle & Games', minPrice: 10000, maxPrice: 30000 },
      { id: 'photobooth', label: '360° Photo Booth', minPrice: 15000, maxPrice: 45000 },
    ],
  },
  concert: {
    label: 'Concert & Entertainment',
    image: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=200',
    services: [
      { id: 'stage', label: 'Stage & Truss Structure', minPrice: 100000, maxPrice: 400000 },
      { id: 'sound', label: 'L-Acoustics Sound System', minPrice: 80000, maxPrice: 300000 },
      { id: 'led', label: 'LED Walls & Screens', minPrice: 60000, maxPrice: 200000 },
      { id: 'lighting', label: 'Laser & Light Shows', minPrice: 40000, maxPrice: 150000 },
      { id: 'security', label: 'Bouncers & Security Team', minPrice: 30000, maxPrice: 100000 },
      { id: 'generators', label: 'Power Generators', minPrice: 25000, maxPrice: 80000 },
      { id: 'barriers', label: 'Crowd Barriers & Fencing', minPrice: 15000, maxPrice: 50000 },
      { id: 'backstage', label: 'Backstage & VIP Lounge', minPrice: 30000, maxPrice: 100000 },
    ],
  },
};

const packageTiers = [
  { value: 'silver', label: 'Basic Silver', multiplier: 0.85 },
  { value: 'gold', label: 'Premium Gold', multiplier: 1.2 },
  { value: 'platinum', label: 'Luxury VIP', multiplier: 1.8 },
];

export default function BudgetCalculator() {
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [eventDropdownOpen, setEventDropdownOpen] = useState(false);
  const [guestCount, setGuestCount] = useState(200);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [packageType, setPackageType] = useState('gold');
  const [customReq, setCustomReq] = useState('');
  const [result, setResult] = useState<{ min: number; max: number; maxEstimate: number; package: string } | null>(null);

  // Inquiry/Booking states (inline)
  const [inquiryStep, setInquiryStep] = useState(1); // 1 = show options, 2 = show inquiry form, 3 = success
  const [formData, setFormData] = useState({
    full_name: '', phone: '', email: '', event_date: '', city: 'Faisalabad', additional_notes: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [planSaved, setPlanSaved] = useState(false);

  const config = selectedEvent ? eventConfigs[selectedEvent] : null;

  const handleSelectEvent = (val: string) => {
    setSelectedEvent(val);
    setSelectedServices([]);
    setEventDropdownOpen(false);
    setResult(null);
    setInquiryStep(1);
    setPlanSaved(false);
  };

  const toggleService = (id: string) => {
    setSelectedServices((prev) => prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]);
  };

  // Re-calculate whenever inputs change for dynamic real-time feedback!
  useEffect(() => {
    if (!selectedEvent || !config || selectedServices.length === 0) {
      setResult(null);
      return;
    }
    const pkg = packageTiers.find((p) => p.value === packageType);
    if (!pkg) return;

    let totalMin = 0;
    let totalMax = 0;

    selectedServices.forEach((svcId) => {
      const svc = config.services.find((s) => s.id === svcId);
      if (!svc) return;
      const isPerHead = svc.label.toLowerCase().includes('per head') || svc.label.toLowerCase().includes('per stall');
      if (isPerHead) {
        totalMin += svc.minPrice * guestCount;
        totalMax += svc.maxPrice * guestCount;
      } else {
        totalMin += svc.minPrice;
        totalMax += svc.maxPrice;
      }
    });

    const min = Math.round(totalMin * pkg.multiplier);
    const max = Math.round(totalMax * pkg.multiplier);
    const maxEstimate = Math.round(totalMax * 1.8);

    setResult({ min, max, maxEstimate, package: pkg.label });
  }, [selectedEvent, selectedServices, guestCount, packageType]);

  const formatPKR = (n: number) => `PKR ${n.toLocaleString()}`;

  const eventTypeLabel = config?.label || '';
  const selectedServicesLabels = config
    ? selectedServices.map((id) => config.services.find((s) => s.id === id)?.label || id)
    : [];

  const handleSavePlan = () => {
    if (!result) return;
    const existingPlans = JSON.parse(localStorage.getItem('mastermind_saved_plans') || '[]');
    const newPlan = {
      id: 'plan_' + Date.now(),
      eventType: selectedEvent,
      eventTypeLabel,
      guestCount,
      selectedServices: selectedServicesLabels,
      packageType: result.package,
      minBudget: result.min,
      maxBudget: result.max,
      maxEstimate: result.maxEstimate,
      savedAt: new Date().toISOString()
    };
    localStorage.setItem('mastermind_saved_plans', JSON.stringify([newPlan, ...existingPlans]));
    setPlanSaved(true);
  };

  const handleDownloadQuote = () => {
    if (!result) return;
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    printWindow.document.write(`
      <html>
        <head>
          <title>Mastermind Solution - Event Budget Quote</title>
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
            <div class="title">Luxury Event Budget Quote</div>
          </div>
          <div class="details">
            <div class="details-row"><span class="label">Event Category</span><span class="value">${eventTypeLabel}</span></div>
            <div class="details-row"><span class="label">Estimated Guests</span><span class="value">${guestCount} Guests</span></div>
            <div class="details-row"><span class="label">Package Tier</span><span class="value">${result.package}</span></div>
            <div class="details-row"><span class="label">Services Selected</span><span class="value">${selectedServicesLabels.join(', ')}</span></div>
            ${customReq ? `<div class="details-row"><span class="label">Custom Notes</span><span class="value">${customReq}</span></div>` : ''}
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
        full_name: formData.full_name, phone: formData.phone, email: formData.email,
        event_date: formData.event_date || null, city: formData.city, guest_count: guestCount,
        event_type: selectedEvent, selected_services: selectedServices,
        selected_package: result.package, estimated_budget: budgetRange,
        additional_notes: customReq || formData.additional_notes,
      });
    } catch {
      console.warn('Supabase offline, using localStorage fallback');
    }
    const localInquiries = JSON.parse(localStorage.getItem('mastermind_inquiries') || '[]');
    localStorage.setItem('mastermind_inquiries', JSON.stringify([{
      id: 'inq_' + Date.now(), full_name: formData.full_name, phone: formData.phone,
      email: formData.email, event_date: formData.event_date || new Date().toISOString().split('T')[0],
      city: formData.city, guest_count: guestCount, event_type: selectedEvent,
      selected_package: result.package, estimated_budget: budgetRange,
      additional_notes: customReq || formData.additional_notes,
      status: 'pending', created_at: new Date().toISOString()
    }, ...localInquiries]));
    setSubmitting(false);
    setInquiryStep(3);
    // Send email notification
    try {
      const { default: emailjs } = await import('@emailjs/browser');
      await emailjs.send(
        'service_mastermind',
        'template_inquiry',
        {
          from_name: formData.full_name,
          phone: formData.phone,
          from_email: formData.email || 'Not provided',
          event_type: eventTypeLabel,
          event_date: formData.event_date || 'Not specified',
          city: formData.city,
          guest_count: guestCount,
          selected_package: result?.package,
          estimated_budget: result ? `${formatPKR(result.min)} - ${formatPKR(result.max)}` : '',
          services: selectedServicesLabels.join(', '),
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
    <section id="calculator" className="section-padding relative overflow-hidden" style={{ background: '#0A0A0A' }}>
      {/* Dynamic Non-Repeating Premium Background */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
        <img 
          src="https://images.pexels.com/photos/2034851/pexels-photo-2034851.jpeg?auto=compress&cs=tinysrgb&w=1920" 
          alt="" 
          className="w-full h-full object-cover" 
        />
      </div>

      {/* Decorative Blur Spots */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeading
          small="Plan Your Budget"
          title="Smart Event Budget Calculator"
          subtitle="Select event details below and watch pricing adjust instantly inside this page."
        />

        <ScrollReveal>
          <div 
            className="glass-card p-6 md:p-8 border border-gold/20 shadow-2xl transition-all duration-500" 
            style={{ background: 'rgba(15,15,15,0.92)' }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* ─── LEFT COLUMN: Inputs (lg:col-span-7) ─── */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* Step 1: Event Type Dropdown */}
                <div>
                  <label className="block text-[10px] font-bold mb-2 tracking-widest uppercase text-gold/90" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    1. Select Your Event Type
                  </label>
                  <div className="relative">
                    <button
                      onClick={() => setEventDropdownOpen(!eventDropdownOpen)}
                      className="w-full flex items-center justify-between p-3.5 rounded-xl text-sm font-medium transition-all duration-300 border"
                      style={{
                        background: selectedEvent ? 'rgba(3, 169, 244,0.06)' : 'rgba(255,255,255,0.02)',
                        borderColor: selectedEvent ? 'rgba(3, 169, 244,0.3)' : 'rgba(255,255,255,0.08)',
                        color: selectedEvent ? '#03A9F4' : '#aaa',
                        fontFamily: "'Montserrat', sans-serif",
                      }}
                    >
                      <div className="flex items-center gap-3">
                        {config && (
                          <div className="w-6 h-6 rounded-full overflow-hidden border border-gold/30">
                            <img src={config.image} alt="" className="w-full h-full object-cover" />
                          </div>
                        )}
                        <span>{config ? config.label : 'Choose event category...'}</span>
                      </div>
                      <ChevronDown
                        size={16}
                        className="transition-transform duration-300 text-gold"
                        style={{ transform: eventDropdownOpen ? 'rotate(180deg)' : 'rotate(0)' }}
                      />
                    </button>

                    <AnimatePresence>
                      {eventDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          className="absolute top-full left-0 right-0 mt-2 rounded-xl overflow-hidden z-30"
                          style={{
                            background: 'rgba(10,10,10,0.98)',
                            border: '1px solid rgba(3, 169, 244,0.25)',
                            boxShadow: '0 20px 50px rgba(0,0,0,0.7)',
                            backdropFilter: 'blur(20px)'
                          }}
                        >
                          {Object.entries(eventConfigs).map(([key, cfg]) => (
                            <button
                              key={key}
                              onClick={() => handleSelectEvent(key)}
                              className="w-full flex items-center gap-3 p-3 text-left text-xs font-semibold transition-all duration-200 hover:bg-gold/8 hover:text-[#03A9F4]"
                              style={{
                                fontFamily: "'Montserrat', sans-serif",
                                color: selectedEvent === key ? '#03A9F4' : '#ccc',
                                background: selectedEvent === key ? 'rgba(3, 169, 244,0.06)' : 'transparent',
                                borderBottom: '1px solid rgba(255,255,255,0.04)',
                              }}
                            >
                              <div className="w-6 h-6 rounded-full overflow-hidden border border-gold/20 flex-shrink-0">
                                <img src={cfg.image} alt="" className="w-full h-full object-cover" />
                              </div>
                              {cfg.label}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Sub-inputs rendered smoothly */}
                {selectedEvent && config && (
                  <div className="space-y-6 animate-fade-in-up">
                    
                    {/* Guest Count Slider */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="block text-[10px] font-bold tracking-widest uppercase text-gold/90" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                          2. Expected Guests
                        </label>
                        <span className="text-xs font-bold text-white tracking-wide px-2.5 py-0.5 rounded-full bg-gold/10 border border-gold/20">
                          {guestCount} Guests
                        </span>
                      </div>
                      <input
                        type="range"
                        min="50"
                        max="2000"
                        step="50"
                        value={guestCount}
                        onChange={(e) => setGuestCount(Number(e.target.value))}
                        className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#03A9F4]"
                      />
                      <div className="flex justify-between text-[9px] text-white/40 mt-1 font-semibold">
                        <span>50</span>
                        <span>2,000</span>
                      </div>
                    </div>

                    {/* Services Checklist */}
                    <div>
                      <label className="block text-[10px] font-bold mb-2.5 tracking-widest uppercase text-gold/90" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                        3. Custom Event Services
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {config.services.map((svc) => {
                          const active = selectedServices.includes(svc.id);
                          return (
                            <button
                              key={svc.id}
                              onClick={() => toggleService(svc.id)}
                              className="flex items-center justify-between p-3 rounded-xl text-[11px] font-medium transition-all duration-200 border text-left"
                              style={{
                                background: active ? 'rgba(3, 169, 244,0.06)' : 'rgba(255,255,255,0.01)',
                                borderColor: active ? '#03A9F4' : 'rgba(255,255,255,0.06)',
                                color: active ? '#03A9F4' : '#999',
                                fontFamily: "'Montserrat', sans-serif",
                              }}
                            >
                              <span className="flex items-center gap-2">
                                <span
                                  className="w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 text-[9px]"
                                  style={{
                                    borderColor: active ? '#03A9F4' : 'rgba(255,255,255,0.2)',
                                    background: active ? '#03A9F4' : 'transparent',
                                    color: active ? '#0A0A0A' : 'transparent',
                                  }}
                                >
                                  ✓
                                </span>
                                {svc.label}
                              </span>
                              <span className="text-[9px] font-bold whitespace-nowrap ml-2" style={{ color: active ? 'rgba(3, 169, 244,0.7)' : 'rgba(255,255,255,0.2)' }}>
                                {formatPKR(svc.minPrice)}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Package Tier */}
                    <div>
                      <label className="block text-[10px] font-bold mb-2.5 tracking-widest uppercase text-gold/90" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                        4. Choose Design Tier
                      </label>
                      <div className="grid grid-cols-3 gap-2.5">
                        {packageTiers.map((p) => {
                          const active = packageType === p.value;
                          return (
                            <button
                              key={p.value}
                              onClick={() => setPackageType(p.value)}
                              className="p-3 rounded-xl text-[11px] font-bold transition-all duration-300 border text-center"
                              style={{
                                background: active ? 'rgba(3, 169, 244,0.1)' : 'rgba(255,255,255,0.02)',
                                borderColor: active ? '#03A9F4' : 'rgba(255,255,255,0.06)',
                                color: active ? '#03A9F4' : '#888',
                                fontFamily: "'Montserrat', sans-serif",
                              }}
                            >
                              {p.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Custom requirements */}
                    <div>
                      <label className="block text-[10px] font-bold mb-1.5 tracking-widest uppercase text-gold/90" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                        5. Special Requirements (Optional)
                      </label>
                      <textarea
                        value={customReq}
                        onChange={(e) => setCustomReq(e.target.value)}
                        rows={2}
                        className="w-full px-4 py-3 rounded-xl text-xs bg-black/40 outline-none resize-none border border-white/5 focus:border-[#03A9F4]/50 text-white"
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                        placeholder="Describe any specific themes, setups, or customization details you have in mind..."
                      />
                    </div>

                  </div>
                )}

                {!selectedEvent && (
                  <div className="h-60 border border-dashed border-white/5 rounded-2xl flex flex-col items-center justify-center text-center p-6 text-white/30">
                    <Calculator size={36} className="mb-2 text-white/10" />
                    <p className="text-xs font-semibold" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                      Choose an event category above to start calculator
                    </p>
                  </div>
                )}

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
                      style={{ background: 'rgba(20,20,20,0.95)', boxShadow: '0 10px 40px rgba(0,0,0,0.4)' }}
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
                            {eventTypeLabel} • {result.package}
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
                            {selectedServicesLabels.map((lbl) => (
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
                                  onClick={handleDownloadQuote}
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
                        Select an event type and services on the left. The live budget will instantly formulate here.
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
  );
}
