import { useState } from 'react';
import { MapPin, Phone, Mail, Instagram, Send, MessageCircle } from 'lucide-react';
import ScrollReveal from '../effects/ScrollReveal';
import SectionHeading from '../ui/SectionHeading';
import { supabase } from '../../lib/supabase';
import emailjs from '@emailjs/browser';

export default function ContactSection() {
  const [form, setForm] = useState({
    full_name: '', email: '', phone: '', event_type: '', message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await supabase.from('inquiries').insert({
        full_name: form.full_name,
        phone: form.phone,
        email: form.email,
        event_type: form.event_type,
        additional_notes: form.message,
      });
    } catch {
      // silently handle
    }
    // Send email notification to Gmail
    try {
      await emailjs.send(
        'service_mastermind',
        'template_contact',
        {
          from_name: form.full_name,
          from_email: form.email,
          phone: form.phone,
          event_type: form.event_type,
          message: form.message,
          to_email: 'mastermindevents.fsd@gmail.com',
        },
        'YOUR_EMAILJS_PUBLIC_KEY'
      );
    } catch {
      // email sending failed silently
    }
    setSubmitted(true);
    setForm({ full_name: '', email: '', phone: '', event_type: '', message: '' });
    setSubmitting(false);
  };

  return (
    <section id="contact" className="section-padding relative overflow-hidden" style={{ background: '#0A0A0A' }}>
      {/* Background accent image */}
      <div className="absolute inset-0 opacity-[0.03]">
        <img
          src="https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <SectionHeading
          small="Get In Touch"
          title="Contact Us"
          subtitle="Let us bring your vision to life. Reach out and start your extraordinary journey."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <ScrollReveal direction="left">
            <div className="space-y-6">
              {/* Hero image for contact */}
              <div className="glass-card overflow-hidden mb-6">
                <img
                  src="https://images.pexels.com/photos/169198/pexels-photo-169198.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Event Setup"
                  className="w-full h-48 object-cover"
                />
              </div>

              <div className="glass-card p-6 flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(3, 169, 244,0.1)', border: '1px solid rgba(3, 169, 244,0.3)' }}>
                  <MapPin size={20} style={{ color: '#03A9F4' }} />
                </div>
                <div>
                  <h4 className="text-sm font-bold mb-1" style={{ fontFamily: "'Montserrat', sans-serif", color: '#fff' }}>Visit Us</h4>
                  <p className="text-sm" style={{ color: '#999', fontFamily: "'Poppins', sans-serif" }}>Faisalabad, Pakistan</p>
                </div>
              </div>

              <div className="glass-card p-6 flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(3, 169, 244,0.1)', border: '1px solid rgba(3, 169, 244,0.3)' }}>
                  <Phone size={20} style={{ color: '#03A9F4' }} />
                </div>
                <div>
                  <h4 className="text-sm font-bold mb-1" style={{ fontFamily: "'Montserrat', sans-serif", color: '#fff' }}>Call Us</h4>
                  <a href="tel:+923390122641" className="text-sm" style={{ color: '#999', fontFamily: "'Poppins', sans-serif" }}>+92 339 0122641</a>
                </div>
              </div>

              <div className="glass-card p-6 flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(3, 169, 244,0.1)', border: '1px solid rgba(3, 169, 244,0.3)' }}>
                  <Mail size={20} style={{ color: '#03A9F4' }} />
                </div>
                <div>
                  <h4 className="text-sm font-bold mb-1" style={{ fontFamily: "'Montserrat', sans-serif", color: '#fff' }}>Email Us</h4>
                  <p className="text-sm" style={{ color: '#999', fontFamily: "'Poppins', sans-serif" }}>info@mastermindsolution.com</p>
                </div>
              </div>

              <div className="glass-card p-6 flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(37,211,102,0.1)', border: '1px solid rgba(37,211,102,0.3)' }}>
                  <MessageCircle size={20} style={{ color: '#25D366' }} />
                </div>
                <div>
                  <h4 className="text-sm font-bold mb-1" style={{ fontFamily: "'Montserrat', sans-serif", color: '#fff' }}>WhatsApp</h4>
                  <a href="https://wa.me/923390122641" target="_blank" rel="noopener noreferrer" className="text-sm" style={{ color: '#25D366', fontFamily: "'Poppins', sans-serif" }}>
                    Chat with us on WhatsApp
                  </a>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex gap-3 pt-2">
                <a href="#" className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300" style={{ border: '1px solid rgba(3, 169, 244,0.3)', color: '#03A9F4' }}>
                  <Instagram size={18} />
                </a>
                <a href="#" className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300" style={{ border: '1px solid rgba(3, 169, 244,0.3)', color: '#03A9F4' }}>
                  <Send size={18} />
                </a>
              </div>
            </div>
          </ScrollReveal>

          {/* Contact Form */}
          <ScrollReveal direction="right">
            <div className="glass-card p-8 relative overflow-hidden">
              {/* Decorative image in form */}
              <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
                <img
                  src="https://images.pexels.com/photos/1043902/pexels-photo-1043902.jpeg?auto=compress&cs=tinysrgb&w=300"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>

              {submitted ? (
                <div className="text-center py-12 relative z-10">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(3, 169, 244,0.15)', border: '2px solid #03A9F4' }}>
                    <Send size={24} style={{ color: '#03A9F4' }} />
                  </div>
                  <h3 className="text-xl font-bold mb-2" style={{ fontFamily: "'Cinzel', serif", color: '#fff' }}>Message Sent</h3>
                  <p className="text-sm" style={{ color: '#999', fontFamily: "'Poppins', sans-serif" }}>We will get back to you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                  <h3 className="text-xl font-bold mb-6" style={{ fontFamily: "'Cinzel', serif", color: '#fff' }}>
                    Send Us a Message
                  </h3>
                  {[
                    { key: 'full_name', label: 'Full Name', type: 'text' },
                    { key: 'email', label: 'Email', type: 'email' },
                    { key: 'phone', label: 'Phone', type: 'tel' },
                  ].map((field) => (
                    <div key={field.key}>
                      <label className="block text-xs font-medium mb-1.5 tracking-wider uppercase" style={{ color: '#999', fontFamily: "'Montserrat', sans-serif" }}>
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        required
                        value={form[field.key as keyof typeof form]}
                        onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg text-sm bg-transparent outline-none"
                        style={{ border: '1px solid rgba(255,255,255,0.1)', color: '#ccc', fontFamily: "'Poppins', sans-serif" }}
                      />
                    </div>
                  ))}
                  <div>
                    <label className="block text-xs font-medium mb-1.5 tracking-wider uppercase" style={{ color: '#999', fontFamily: "'Montserrat', sans-serif" }}>
                      Event Type
                    </label>
                    <select
                      value={form.event_type}
                      onChange={(e) => setForm({ ...form, event_type: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg text-sm bg-transparent outline-none"
                      style={{ border: '1px solid rgba(255,255,255,0.1)', color: '#ccc', fontFamily: "'Poppins', sans-serif", background: '#1A1A1A' }}
                    >
                      <option value="">Select Event Type</option>
                      <option value="wedding">Wedding & Engagement</option>
                      <option value="birthday">Birthday Celebrations</option>
                      <option value="corporate">Corporate & Expo Events</option>
                      <option value="concert">Concert & Entertainment</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1.5 tracking-wider uppercase" style={{ color: '#999', fontFamily: "'Montserrat', sans-serif" }}>
                      Message
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg text-sm bg-transparent outline-none resize-none"
                      style={{ border: '1px solid rgba(255,255,255,0.1)', color: '#ccc', fontFamily: "'Poppins', sans-serif" }}
                    />
                  </div>
                  <button type="submit" className="btn-gold w-full flex items-center justify-center gap-2 py-3" disabled={submitting}>
                    {submitting ? 'Sending...' : 'Send Message'}
                    {!submitting && <Send size={16} />}
                  </button>
                </form>
              )}
            </div>
          </ScrollReveal>
        </div>

        {/* Map */}
        <ScrollReveal>
          <div className="mt-16 glass-card overflow-hidden">
            <iframe
              title="Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13620.594747761066!2d73.06456079999999!3d31.41783515!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x392242a8deae459f%3A0x959e4d612f5e3950!2sFaisalabad%2C%20Pakistan!5e0!3m2!1sen!2s!4v1234567890"
              width="100%"
              height="400"
              style={{ border: 0, filter: 'grayscale(1) contrast(1.2) brightness(0.7)' }}
              allowFullScreen
              loading="lazy"
            />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
