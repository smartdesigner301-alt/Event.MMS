import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, X, Bot, Sparkles, User } from 'lucide-react';

interface Message {
  sender: 'ai' | 'user';
  text: string;
}

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'ai', text: 'Welcome to Mastermind Solution & Event. I am your VIP AI planner. How can I help you structure your extraordinary celebration today?' }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (textToSend: string) => {
    if (!textToSend.trim()) return;
    setMessages((prev) => [...prev, { sender: 'user', text: textToSend }]);
    setInputVal('');
    setIsTyping(true);

    // Simulate AI response logic
    setTimeout(() => {
      let reply = "That sounds extraordinary! Our core event coordinators in Faisalabad can customize this fully. I highly recommend using our built-in Smart Budget Calculator to get a tailored estimate, or chat directly with our CEO via WhatsApp.";
      const query = textToSend.toLowerCase();

      if (query.includes('wed') || query.includes('marry') || query.includes('engagement')) {
        reply = "For weddings, we offer Royal, Luxury, Eastern, and Western themes with premium stage structures and imported florals. Check out our Wedding & Engagement page to run a detailed guest/service calculation!";
      } else if (query.includes('corp') || query.includes('expo') || query.includes('stall') || query.includes('seminar')) {
        reply = "Our Corporate & Expo team manages custom stall designs, booth branding, Ultra-HD LED walls, and VIP guest protocol. Check out our Corporate & Expo Events page for an expo-specific budget calculator!";
      } else if (query.includes('birthday') || query.includes('party')) {
        reply = "We craft beautiful thematic birthdays! Our Birthday Celebrations page features balloon art customization, interactive cake tables, 360 photo booths, and a quick calculator.";
      } else if (query.includes('concert') || query.includes('show') || query.includes('sound') || query.includes('dj')) {
        reply = "We offer professional heavy-duty aluminum trusses, L-Acoustics sound engineering, LED screens, laser light shows, and bouncers. Calculate concert production costs on our Concert & Entertainment page!";
      } else if (query.includes('price') || query.includes('package') || query.includes('cost') || query.includes('budget')) {
        reply = "Our pricing ranges from basic packages (silver class) to premium gold and VIP luxury tiers. You can use the Smart Budget Calculator on any of our pages to get an instant cost range download.";
      } else if (query.includes('location') || query.includes('address') || query.includes('map') || query.includes('where')) {
        reply = "Mastermind Solution & Event is proudly headquartered in Faisalabad, Pakistan. We plan and manage events across Punjab and beyond.";
      }

      setMessages((prev) => [...prev, { sender: 'ai', text: reply }]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="fixed bottom-20 right-6 z-40" style={{ fontFamily: "'Montserrat', sans-serif" }}>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-110 active:scale-95"
        style={{
          background: 'linear-gradient(135deg, #03A9F4, #FF5252)',
          boxShadow: '0 0 20px rgba(3, 169, 244, 0.4)',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}
      >
        <MessageSquare size={20} className="text-black" />
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="absolute bottom-16 right-0 w-80 sm:w-96 h-[340px] rounded-2xl flex flex-col overflow-hidden border border-gold/30 shadow-2xl"
            style={{
              background: 'rgba(15, 15, 15, 0.95)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 10px 40px rgba(0,0,0,0.5)'
            }}
          >
            {/* Header */}
            <div className="px-4 py-3 flex items-center justify-between border-b border-white/10 bg-black/40">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gold/10 border border-gold/30">
                  <Bot size={16} className="text-gold" />
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
                      background: m.sender === 'user' ? 'rgba(255,255,255,0.05)' : 'rgba(3, 169, 244,0.1)',
                      border: `1px solid ${m.sender === 'user' ? 'rgba(255,255,255,0.1)' : 'rgba(3, 169, 244,0.3)'}`
                    }}
                  >
                    {m.sender === 'user' ? <User size={12} className="text-white/60" /> : <Sparkles size={12} className="text-gold" />}
                  </div>
                  <div
                    className="p-3 rounded-2xl text-[11px] leading-relaxed font-medium"
                    style={{
                      background: m.sender === 'user' ? 'rgba(3, 169, 244,0.12)' : 'rgba(255,255,255,0.02)',
                      border: `1px solid ${m.sender === 'user' ? '#03A9F4' : 'rgba(255,255,255,0.05)'}`,
                      color: m.sender === 'user' ? '#03A9F4' : '#ddd',
                      borderRadius: m.sender === 'user' ? '16px 4px 16px 16px' : '4px 16px 16px 16px'
                    }}
                  >
                    {m.text}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-2.5 max-w-[85%]">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center bg-gold/10 border border-gold/30">
                    <Sparkles size={12} className="text-gold" />
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
                  'Plan a wedding',
                  'Estimate Expo budget',
                  'Where is Faisalabad office?'
                ].map((act) => (
                  <button
                    key={act}
                    onClick={() => handleSend(act)}
                    className="px-2.5 py-1 rounded-full text-[9px] font-bold border border-white/10 hover:border-gold/50 bg-white/5 hover:bg-gold/5 text-white/70 hover:text-gold transition-all"
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
                className="flex-1 px-3 py-2 rounded-lg text-xs bg-black/60 outline-none border border-white/10 text-white focus:border-gold/50"
              />
              <button
                onClick={() => handleSend(inputVal)}
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
                style={{ background: 'linear-gradient(135deg, #03A9F4, #FF5252)' }}
              >
                <Send size={12} className="text-black" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
