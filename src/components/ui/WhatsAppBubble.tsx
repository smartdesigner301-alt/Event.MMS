import { MessageCircle } from 'lucide-react';

export default function WhatsAppBubble() {
  const whatsappUrl = 'https://wa.me/923390122641?text=Hi%20Mastermind%20Solution%2C%20I%20would%20like%20to%20inquire%20about%20your%20luxury%20event%20management%20services.';

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-110 active:scale-95 group"
      style={{
        backgroundColor: '#25D366',
        boxShadow: '0 0 20px rgba(37, 211, 102, 0.4)',
        border: '1px solid rgba(255, 255, 255, 0.2)'
      }}
      title="Chat on WhatsApp"
    >
      {/* Pulse effect */}
      <span className="absolute inset-0 rounded-full bg-[#25D366]/40 -z-10 animate-ping group-hover:animate-none" />
      <MessageCircle size={22} className="text-white" />
    </a>
  );
}
