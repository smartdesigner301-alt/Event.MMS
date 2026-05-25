import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, X, Bot, Sparkles, User } from 'lucide-react';
import { useLocation } from 'react-router-dom';

interface Message {
  sender: 'ai' | 'user';
  text: string;
}

// Extensive, highly personalized premium response matrix for Mastermind Events
const EVENT_RESPONSES = {
  wedding: [
    "We specialize in crafting magical Pakistani weddings! From grand Barat stages to vibrant Mehndi decors and elegant Walima receptions, we plan it all. Our setups include premium imported florals, high-end thematic stage designs, and grand couple entry concepts. You can also use our page-specific Calculator to get a dynamic ceremony budget estimate!",
    "Your dream wedding deserves perfection. We manage complete venue decorations, HD sound systems, premium stage structures, and highly professional photography/videography. Would you like to plan a Mehndi, Barat, or Walima ceremony?"
  ],
  birthday: [
    "Let's celebrate in style! We design jaw-dropping themed birthdays with premium balloon arches, customized cake backdrops, interactive kids play zones, and 360 photo booths. Check out our Birthday Celebrations page to customize your exact menu, stage size, and decor!",
    "From milestone birthdays to adorable kids theme parties, Mastermind Solution handles everything: custom stage decor, balloon pillars, dynamic sound systems, and special entry shows. Use our calculator to instantly build your plan!"
  ],
  corporate: [
    "For corporate excellence, we deliver custom-built wooden stalls, standard octanorm structures, professional seminar/conference setups, massive HD LED screens, and VIP protocol management. Let us elevate your brand presence in Faisalabad and across Punjab!",
    "We plan corporate galas, trade expos, product launches, and high-security executive events. We provide premium branding materials, professional hostesses, and high-end sound/lighting."
  ],
  concert: [
    "Get ready to rock! We build heavy-duty professional aluminum trusses, concert stage structures, industry-standard L-Acoustics sound engineering, synchronized laser light shows, and premium crowd control security. You can calculate complete concert costs using our specialized page calculator!",
    "Our entertainment production covers live music shows, DJ nights, grand festivals, and university events. We coordinate artist bookings, sound designs, VIP lounges, and high-level bouncer security."
  ],
  pricing: [
    "We believe in transparency! Our packages range from Silver (budget-friendly elegance) to Gold (premium high-end decor) and Platinum/VIP (fully customized luxury setup). I highly recommend clicking the 'Calculator' button on our page to configure services and download a complete PKR estimate!",
    "Every event is unique. Our budget system calculates exact rates based on your guest count, catering tier, floral density, and LED screen choices. Try our real-time page calculator to download a complete PDF quote instantly!"
  ],
  contact: [
    "You can reach our premium management team anytime at our dedicated helpline: +92 339 0122641. Feel free to call us or hit the green WhatsApp bubble on the bottom right to directly chat with our CEO!",
    "Our headquarters is located in Faisalabad, Pakistan. You can book an in-person meeting by calling +92 339 0122641, or send us an inquiry via the Contact form to receive a professional proposal within 24 hours."
  ],
  general: [
    "That is an excellent question! Mastermind Solution & Event delivers top-tier corporate, wedding, birthday, and concert management services. Every event is planned, designed, and executed to perfection. Would you like to estimate the cost of a specific event?",
    "We plan, we design, we deliver. As Punjab's premier event managers, we ensure flawless execution. I highly recommend trying our interactive budget planner tool right on the page!",
    "A wonderful idea! Our professional production crew ensures premium stage layouts, imported floral decorations, state-of-the-art sound systems, and smooth guest coordination. What type of celebration are we planning today?",
    "Fascinating! We love discussing new event concepts. Whether you are thinking of a traditional mehndi night, a grand music concert, or a modern business exhibition, we have dedicated teams to make it happen. How can I guide you further?"
  ]
};

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'ai', text: 'Welcome to Mastermind Solution & Event. I am your VIP AI planner. How can I help you structure your extraordinary celebration today?' }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Dynamic context message based on the current page
  useEffect(() => {
    const path = location.pathname;
    let initialGreeting = 'Welcome to Mastermind Solution & Event. I am your VIP AI planner. How can I help you structure your extraordinary celebration today?';
    
    if (path.includes('wedding')) {
      initialGreeting = 'Looking to plan a dream wedding? 💍 I can guide you through our Mehndi, Barat, and Walima stage decors, guest calculations, and premium couple entry packages. Ask me anything!';
    } else if (path.includes('birthday')) {
      initialGreeting = 'Happy birthday planning! 🎉 I can help you select gorgeous themes (Cocomelon, Royal Princess, Golden Elegance), customize balloon setups, and organize 360 photo booths. What is your theme idea?';
    } else if (path.includes('corporate')) {
      initialGreeting = 'Welcome to Corporate Events Hub! 💼 I can assist you with custom-built wooden exhibition stalls, LED walls, audio/video configurations, and host/protocol details. How can we elevate your brand today?';
    } else if (path.includes('concert')) {
      initialGreeting = 'Ready for an electrifying show? 🎸 Ask me about professional line-array sound systems, heavy-duty stage trusses, special pyrotechnics, and guest bouncer security!';
    } else if (path.includes('portfolio')) {
      initialGreeting = 'Explore our luxury galleries! 📸 I can explain the stage, lighting, and decor details of any of our signature events. Which style caught your eye?';
    } else if (path.includes('contact')) {
      initialGreeting = 'Got questions? 📞 You can immediately message our CEO by clicking the WhatsApp button, call us at +92 339 0122641, or send an inquiry form below. I am here to help!';
    }

    setMessages([
      { sender: 'ai', text: initialGreeting }
    ]);
  }, [location.pathname]);

  const getRandomResponse = (key: keyof typeof EVENT_RESPONSES) => {
    const list = EVENT_RESPONSES[key];
    const randomIndex = Math.floor(Math.random() * list.length);
    return list[randomIndex];
  };

  const handleSend = (textToSend: string) => {
    if (!textToSend.trim()) return;
    setMessages((prev) => [...prev, { sender: 'user', text: textToSend }]);
    setInputVal('');
    setIsTyping(true);

    // Advanced, dynamic conversational engine
    setTimeout(() => {
      const query = textToSend.toLowerCase().trim();
      let reply = '';

      // 1. Wedding Match
      if (
        query.includes('wed') || 
        query.includes('marry') || 
        query.includes('marriage') ||
        query.includes('barat') || 
        query.includes('walima') || 
        query.includes('mehndi') || 
        query.includes('ring') ||
        query.includes('bride') ||
        query.includes('groom') ||
        query.includes('shadi') ||
        query.includes('nikah') ||
        query.includes('engagement')
      ) {
        reply = getRandomResponse('wedding');
      } 
      // 2. Birthday Match
      else if (
        query.includes('birthday') || 
        query.includes('party') || 
        query.includes('cake') ||
        query.includes('balloon') ||
        query.includes('kid') ||
        query.includes('surprise') ||
        query.includes('janamdin')
      ) {
        reply = getRandomResponse('birthday');
      } 
      // 3. Corporate Match
      else if (
        query.includes('corp') || 
        query.includes('business') || 
        query.includes('expo') || 
        query.includes('stall') || 
        query.includes('seminar') ||
        query.includes('conference') ||
        query.includes('brand') ||
        query.includes('meeting') ||
        query.includes('exhibition')
      ) {
        reply = getRandomResponse('corporate');
      } 
      // 4. Concert Match
      else if (
        query.includes('concert') || 
        query.includes('music') ||
        query.includes('sing') ||
        query.includes('sound') || 
        query.includes('dj') ||
        query.includes('truss') ||
        query.includes('light') ||
        query.includes('bouncer') ||
        query.includes('security')
      ) {
        reply = getRandomResponse('concert');
      } 
      // 5. Pricing Match
      else if (
        query.includes('price') || 
        query.includes('package') || 
        query.includes('cost') || 
        query.includes('budget') ||
        query.includes('rate') ||
        query.includes('pkr') ||
        query.includes('rupees') ||
        query.includes('expensive') ||
        query.includes('cheap')
      ) {
        reply = getRandomResponse('pricing');
      } 
      // 6. Location / Contact Match
      else if (
        query.includes('location') || 
        query.includes('address') || 
        query.includes('map') || 
        query.includes('where') ||
        query.includes('contact') ||
        query.includes('phone') ||
        query.includes('number') ||
        query.includes('call') ||
        query.includes('whatsapp') ||
        query.includes('office') ||
        query.includes('email')
      ) {
        reply = getRandomResponse('contact');
      } 
      // 7. Conversational greetings
      else if (
        query.includes('hi') || 
        query.includes('hello') || 
        query.includes('hey') || 
        query.includes('salam') ||
        query.includes('aoa') ||
        query.includes('yo') ||
        query.includes('help')
      ) {
        reply = "Hello there! I am your interactive AI event advisor. I can help you select event themes, coordinate vendor details, estimate wedding/concert budgets, and guide you to our core team in Faisalabad. What's on your mind?";
      }
      else if (
        query.includes('thank') || 
        query.includes('thanks') || 
        query.includes('nice') || 
        query.includes('great') ||
        query.includes('awesome') ||
        query.includes('ok')
      ) {
        reply = "You are most welcome! We plan, we design, and we deliver perfect moments. If you need anything else, feel free to run a cost calculation on the page or contact our team directly at +92 339 0122641.";
      }
      // 8. General fallback
      else {
        reply = getRandomResponse('general');
      }

      setMessages((prev) => [...prev, { sender: 'ai', text: reply }]);
      setIsTyping(false);
    }, 900);
  };

  return (
    <div className="fixed bottom-20 right-6 z-40" style={{ fontFamily: "'Montserrat', sans-serif" }}>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-110 active:scale-95"
        style={{
          background: 'linear-gradient(135deg, #00abff, #ef872e)',
          boxShadow: '0 0 20px rgba(0, 171, 255, 0.4)',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}
      >
        <MessageSquare size={20} className="text-white" />
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="absolute bottom-16 right-0 w-80 sm:w-96 h-[380px] rounded-2xl flex flex-col overflow-hidden border border-white/10 shadow-2xl"
            style={{
              background: 'rgba(10, 10, 10, 0.95)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 10px 40px rgba(0,0,0,0.6)'
            }}
          >
            {/* Header */}
            <div className="px-4 py-3 flex items-center justify-between border-b border-white/10 bg-black/40">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#00abff]/10 border border-[#00abff]/30">
                  <Bot size={16} className="text-[#00abff]" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white tracking-wider">AI Event Assistant</h3>
                  <p className="text-[9px] text-[#25D366] font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] inline-block animate-ping" />
                    Online Planner
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-6 h-6 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white"
              >
                <X size={12} />
              </button>
            </div>

            {/* Messages Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex gap-2.5 max-w-[85%] ${m.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
                >
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                      background: m.sender === 'user' ? 'rgba(255,255,255,0.05)' : 'rgba(0, 171, 255, 0.1)',
                      border: `1px solid ${m.sender === 'user' ? 'rgba(255,255,255,0.1)' : 'rgba(0, 171, 255, 0.3)'}`
                    }}
                  >
                    {m.sender === 'user' ? <User size={12} className="text-white/60" /> : <Sparkles size={12} className="text-[#ef872e]" />}
                  </div>
                  <div
                    className="p-3 rounded-2xl text-[11px] leading-relaxed font-medium"
                    style={{
                      background: m.sender === 'user' ? 'rgba(0, 171, 255, 0.12)' : 'rgba(255,255,255,0.02)',
                      border: `1px solid ${m.sender === 'user' ? '#00abff' : 'rgba(255,255,255,0.05)'}`,
                      color: m.sender === 'user' ? '#00abff' : '#ddd',
                      borderRadius: m.sender === 'user' ? '16px 4px 16px 16px' : '4px 16px 16px 16px'
                    }}
                  >
                    {m.text}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-2.5 max-w-[85%]">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center bg-[#00abff]/10 border border-[#00abff]/30">
                    <Sparkles size={12} className="text-[#ef872e]" />
                  </div>
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/5 flex gap-1 items-center py-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            {messages.length === 1 && (
              <div className="px-4 py-2 flex flex-wrap gap-1.5 border-t border-white/5 bg-black/20">
                {[
                  'Plan a wedding 💍',
                  'Estimate cost 💰',
                  'Faisalabad contact 📞'
                ].map((act) => (
                  <button
                    key={act}
                    onClick={() => handleSend(act.replace(/ [^\s]+$/, ''))}
                    className="px-2.5 py-1 rounded-full text-[9px] font-bold border border-white/10 hover:border-[#00abff]/50 bg-white/5 hover:bg-[#00abff]/5 text-white/70 hover:text-[#00abff] transition-all"
                  >
                    {act}
                  </button>
                ))}
              </div>
            )}

            {/* Input Form */}
            <div className="p-3 border-t border-white/10 bg-black/40 flex gap-2">
              <input
                type="text"
                placeholder="Ask planner something..."
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend(inputVal)}
                className="flex-1 px-3 py-2 rounded-lg text-xs bg-black/60 outline-none border border-white/10 text-white focus:border-[#00abff]/50"
              />
              <button
                onClick={() => handleSend(inputVal)}
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-transform hover:scale-105 active:scale-95 flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, #00abff, #ef872e)' }}
              >
                <Send size={12} className="text-white" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
