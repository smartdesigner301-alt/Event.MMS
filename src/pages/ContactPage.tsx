import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send, Sparkles } from 'lucide-react';
import ScrollReveal from '../components/effects/ScrollReveal';
import { supabase } from '../lib/supabase';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    event_type: 'corporate',
    message: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    setSubmitting(true);

    try {
      await supabase.from('inquiries').insert({
        full_name: formData.name,
        phone: formData.phone,
        email: formData.email || null,
        event_type: formData.event_type,
        additional_notes: formData.message,
        city: 'Faisalabad',
        status: 'pending',
      });
    } catch {
      console.warn('Supabase offline, using local inquiry backup');
    }

    const localInquiries = JSON.parse(localStorage.getItem('mastermind_inquiries') || '[]');
    localStorage.setItem('mastermind_inquiries', JSON.stringify([{
      id: 'contact_' + Date.now(),
      full_name: formData.name,
      phone: formData.phone,
      email: formData.email || '',
      event_type: formData.event_type,
      additional_notes: formData.message,
      city: 'Faisalabad',
      status: 'pending',
      created_at: new Date().toISOString()
    }, ...localInquiries]));

    // Send email notification to Gmail
    try {
      const { default: emailjs } = await import('@emailjs/browser');
      await emailjs.send(
        'service_mastermind',
        'template_contact',
        {
          from_name: formData.name,
          from_email: formData.email || 'Not provided',
          phone: formData.phone,
          event_type: formData.event_type,
          message: formData.message,
          to_email: 'mastermindevents.fsd@gmail.com',
        },
        'YOUR_EMAILJS_PUBLIC_KEY'
      );
    } catch {
      // email fallback silent
    }

    setSubmitting(false);
    setSubmitted(true);
    setFormData({ name: '', phone: '', email: '', event_type: 'corporate', message: '' });
  };

  const contactDetails = [
    {
      icon: <MapPin size={18} className="text-gold" />,
      label: 'Main Office',
      value: 'Kohinoor Plaza, Jaranwala Road, Faisalabad, Pakistan',
    },
    {
      icon: <Phone size={18} className="text-gold" />,
      label: 'Booking & Protocol Lines',
      value: '+92 339 0122641',
    },
    {
      icon: <Mail size={18} className="text-gold" />,
      label: 'Executive Queries',
      value: 'info@mastermindsolution.com • booking@mastermindsolution.com',
    },
    {
      icon: <Clock size={18} className="text-gold" />,
      label: 'Office Hours',
      value: 'Monday – Saturday: 10:00 AM – 08:00 PM',
    },
  ];

  return (
    <div className="min-h-screen pt-20 pb-16 relative overflow-hidden" style={{ background: 'var(--bg-primary)' }}>
      {/* Light Blurs */}
      <div className="absolute top-1/4 left-1/10 w-[350px] h-[350px] bg-gold/5 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/10 w-[400px] h-[400px] bg-gold/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Title */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center space-y-4 pt-10 pb-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-2"
        >
          <span className="text-[10px] uppercase tracking-[3px] font-bold text-gold px-3 py-1 rounded-full border border-gold/20 bg-gold/5">
            Get In Touch
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold uppercase tracking-wider leading-none text-white pt-2" style={{ fontFamily: "'Cinzel', serif" }}>
            Connect With Our <span className="gold-text">Planners</span>
          </h1>
          <p className="text-xs md:text-sm text-white/50 max-w-xl mx-auto font-medium" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Let us align details to orchestrate your royal wedding, large-scale industrial expo, or high-profile stadium concert.
          </p>
        </motion.div>
      </div>

      {/* Main Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Side: Contact Information Cards (lg:col-span-5) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
          <ScrollReveal>
            <div className="glass-card p-6 border border-white/5 bg-[#121212]/35 space-y-6 h-full flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold uppercase tracking-wider text-white mb-2" style={{ fontFamily: "'Cinzel', serif" }}>
                  Headquarters Faisalabad
                </h3>
                <p className="text-[11px] text-white/50 leading-relaxed font-medium">
                  Visit our planning studio or contact our executive team. We provide tailored event architecture consultations.
                </p>
              </div>

              <div className="space-y-4">
                {contactDetails.map((item, idx) => (
                  <div key={idx} className="flex gap-3.5 items-start">
                    <div className="w-9 h-9 rounded-xl bg-gold/10 flex items-center justify-center border border-gold/20 flex-shrink-0 mt-0.5">
                      {item.icon}
                    </div>
                    <div className="space-y-0.5">
                      <h4 className="text-[9px] font-bold uppercase tracking-wider text-gold/80" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                        {item.label}
                      </h4>
                      <p className="text-[10px] text-white/70 font-semibold leading-relaxed">
                        {item.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-xl border border-gold/20 bg-gold/5 text-center">
                <p className="text-[8px] uppercase tracking-widest text-[#03A9F4] font-bold">Priority VIP Protocol</p>
                <p className="text-[10px] text-white/60 font-semibold mt-1">
                  For high-security events, artist management, or mega concert inquiries, please contact our hotline directly.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Right Side: Contact Form (lg:col-span-7) */}
        <div className="lg:col-span-7">
          <ScrollReveal>
            <div 
              className="glass-card p-6 md:p-8 border border-gold/25 h-full relative overflow-hidden"
              style={{ background: 'rgba(15,15,15,0.92)' }}
            >
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.form
                    key="contact-form"
                    onSubmit={handleSubmit}
                    className="space-y-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div>
                      <h3 className="text-base font-bold uppercase tracking-wider text-white" style={{ fontFamily: "'Cinzel', serif" }}>
                        Submit Inquiry
                      </h3>
                      <p className="text-[10px] text-white/40 font-bold uppercase tracking-wide mt-0.5" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                        Provide details to receive a custom design brief
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[8px] font-bold mb-1 uppercase tracking-widest text-white/50">Full Name *</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Your Name"
                          className="w-full px-3 py-2 rounded-xl text-xs bg-black/45 border border-white/10 text-white focus:border-gold/50 outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-[8px] font-bold mb-1 uppercase tracking-widest text-white/50">Phone Number *</label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+92 339 0122641"
                          className="w-full px-3 py-2 rounded-xl text-xs bg-black/45 border border-white/10 text-white focus:border-gold/50 outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[8px] font-bold mb-1 uppercase tracking-widest text-white/50">Email Address</label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="name@example.com"
                          className="w-full px-3 py-2 rounded-xl text-xs bg-black/45 border border-white/10 text-white focus:border-gold/50 outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-[8px] font-bold mb-1 uppercase tracking-widest text-white/50">Event Type</label>
                        <select
                          value={formData.event_type}
                          onChange={(e) => setFormData({ ...formData, event_type: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl text-xs bg-[#0F0F0F] border border-white/10 text-white focus:border-gold/50 outline-none transition-colors"
                          style={{ fontFamily: "'Montserrat', sans-serif" }}
                        >
                          <option value="corporate">Corporate & Expo Events</option>
                          <option value="wedding">Wedding & Engagement</option>
                          <option value="birthday">Birthday Celebrations</option>
                          <option value="concert">Concert & Entertainment</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[8px] font-bold mb-1 uppercase tracking-widest text-white/50">Message / Event Brief</label>
                      <textarea
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Please describe expected guests, desired dates, or branding stall space size..."
                        className="w-full px-3 py-2.5 rounded-xl text-xs bg-black/45 border border-white/10 text-white focus:border-gold/50 outline-none resize-none transition-colors"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submitting || !formData.name || !formData.phone}
                      className="btn-gold w-full flex items-center justify-center gap-2 py-3 text-xs uppercase tracking-widest mt-2"
                    >
                      <span>{submitting ? 'Submitting...' : 'Send Inquiry'}</span>
                      {!submitting && <Send size={12} />}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success-message"
                    className="text-center py-16 space-y-4 h-full flex flex-col justify-center items-center"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                  >
                    <div className="w-14 h-14 rounded-full border-2 border-gold flex items-center justify-center bg-gold/10 animate-bounce">
                      <Sparkles size={24} className="text-gold" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-lg font-bold text-white uppercase tracking-wider" style={{ fontFamily: "'Cinzel', serif" }}>
                        Inquiry Received!
                      </h3>
                      <p className="text-xs text-white/50 max-w-sm font-medium">
                        Thank you for reaching out. A luxury planner from our Faisalabad office will review your event brief and connect with you within 24 hours.
                      </p>
                    </div>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="btn-outline-gold text-[10px] px-6 py-2 mt-2 font-bold uppercase tracking-wider"
                    >
                      Send Another Inquiry
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </ScrollReveal>
        </div>

      </div>

      {/* Styled Luxury Dark Google Map Embed */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 mt-16">
        <ScrollReveal>
          <div className="rounded-2xl overflow-hidden border border-gold/15 shadow-2xl relative">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d54483.94553075217!2d73.11186008656114!3d31.41643916960144!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x392242a8de0ae099%3A0xdd9ed26a1373211b!2sFaisalabad%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
              width="100%"
              height="350"
              style={{ border: 0, filter: 'grayscale(1) invert(0.92) contrast(1.15)' }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            {/* Elegant glass overlay to prevent scrolling interference unless clicked */}
            <div className="absolute inset-0 bg-transparent pointer-events-none border border-gold/10 rounded-2xl" />
          </div>
        </ScrollReveal>
      </div>

    </div>
  );
}
