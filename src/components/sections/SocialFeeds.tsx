import { Instagram, Play, Heart, MessageCircle } from 'lucide-react';
import ScrollReveal from '../effects/ScrollReveal';
import SectionHeading from '../ui/SectionHeading';

const feedItems = [
  {
    type: 'instagram',
    image: 'https://images.pexels.com/photos/1043902/pexels-photo-1043902.jpeg?auto=compress&cs=tinysrgb&w=600',
    likes: '4.2K',
    comments: '180',
    caption: 'A fairy tale beginning. Royal stage setup for our couple in Faisalabad.'
  },
  {
    type: 'tiktok',
    image: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=600',
    views: '84K',
    comments: '420',
    caption: 'Electrifying sound check! Production value reaching next-level heights.'
  },
  {
    type: 'instagram',
    image: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=600',
    likes: '2.8K',
    comments: '95',
    caption: 'Innovative exhibition stall layouts designed for corporate prominence.'
  },
  {
    type: 'tiktok',
    image: 'https://images.pexels.com/photos/6963417/pexels-photo-6963417.jpeg?auto=compress&cs=tinysrgb&w=600',
    views: '32K',
    comments: '150',
    caption: 'Fairyland birthday themes. Magical setups for the little dreamers.'
  },
  {
    type: 'instagram',
    image: 'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=600',
    likes: '1.9K',
    comments: '60',
    caption: 'Details that mesmerize. VIP lounge arrangements and floral table centerpieces.'
  },
  {
    type: 'tiktok',
    image: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=600',
    views: '112K',
    comments: '890',
    caption: 'Bass drop that shook Faisalabad! Live concert vibes with our elite sound rigging.'
  }
];

export default function SocialFeeds() {
  return (
    <section className="section-padding relative overflow-hidden" style={{ background: '#0A0A0A', borderTop: '1px solid rgba(3, 169, 244,0.05)' }}>
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <SectionHeading
          small="Social Channels"
          title="Mastermind in Motion"
          subtitle="Follow our cinematic journey on social media and see how we transform venues."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {feedItems.map((item, idx) => (
            <ScrollReveal key={idx} delay={idx * 0.1}>
              <div className="group relative overflow-hidden rounded-xl cursor-pointer border border-white/10 aspect-square">
                {/* Image */}
                <img
                  src={item.image}
                  alt="Social post"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Dark Hover Overlay */}
                <div className="absolute inset-0 bg-black/75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6">
                  {/* Platform Indicator */}
                  <div className="flex justify-between items-center">
                    <span
                      className="px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider flex items-center gap-1 border"
                      style={{
                        borderColor: item.type === 'instagram' ? '#03A9F4' : '#00f2fe',
                        color: item.type === 'instagram' ? '#03A9F4' : '#00f2fe',
                        background: 'rgba(0,0,0,0.4)'
                      }}
                    >
                      {item.type === 'instagram' ? (
                        <>
                          <Instagram size={10} />
                          Instagram
                        </>
                      ) : (
                        <>
                          <Play size={10} className="fill-current" />
                          TikTok Reels
                        </>
                      )}
                    </span>
                    <span className="text-[10px] text-white/40 font-semibold">@mastermindsolution</span>
                  </div>

                  {/* Caption */}
                  <p className="text-xs text-white/80 leading-relaxed text-center font-medium px-2">
                    "{item.caption}"
                  </p>

                  {/* Counters */}
                  <div className="flex justify-center items-center gap-6 text-xs text-white/80 font-bold border-t border-white/10 pt-4">
                    {item.type === 'instagram' ? (
                      <div className="flex items-center gap-1.5 hover:text-gold transition-colors">
                        <Heart size={14} className="text-[#03A9F4] fill-[#03A9F4]" />
                        <span>{item.likes}</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors">
                        <Play size={14} className="text-cyan-400 fill-cyan-400" />
                        <span>{item.views}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1.5">
                      <MessageCircle size={14} className="text-white/60" />
                      <span>{item.comments}</span>
                    </div>
                  </div>
                </div>

                {/* Constant Platform Small Icon on Bottom Right */}
                <div
                  className="absolute bottom-3 right-3 w-8 h-8 rounded-full flex items-center justify-center border border-white/10 bg-black/70 backdrop-blur-md group-hover:opacity-0 transition-opacity duration-300"
                  style={{ color: item.type === 'instagram' ? '#03A9F4' : '#00f2fe' }}
                >
                  {item.type === 'instagram' ? <Instagram size={14} /> : <Play size={12} className="fill-current" />}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
