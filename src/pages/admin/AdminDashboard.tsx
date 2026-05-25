import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Users, Package, Image, Bookmark, Key, Trash2 } from 'lucide-react';
import { fallbackPackages, fallbackPortfolio, fallbackBlogPosts } from '../../lib/fallbackData';

type Tab = 'inquiries' | 'plans' | 'packages' | 'portfolio' | 'blog';

export default function AdminDashboard() {
  // Authentication Gate States
  const [passcode, setPasscode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState(false);

  // Dashboard Data States
  const [activeTab, setActiveTab] = useState<Tab>('inquiries');
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [savedPlans, setSavedPlans] = useState<any[]>([]);
  const [packages, setPackages] = useState<any[]>([]);
  const [portfolio, setPortfolio] = useState<any[]>([]);
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  const loadData = async () => {
    setLoading(true);

    // 1. Fetch LocalStorage Data
    const localInquiries = JSON.parse(localStorage.getItem('mastermind_inquiries') || '[]');
    const localPlans = JSON.parse(localStorage.getItem('mastermind_saved_plans') || '[]');
    setSavedPlans(localPlans);

    // 2. Fetch Database Data
    try {
      const [inq, pkg, port, blog] = await Promise.all([
        supabase.from('inquiries').select('*').order('created_at', { ascending: false }),
        supabase.from('packages').select('*').order('created_at', { ascending: false }),
        supabase.from('portfolio_items').select('*').order('created_at', { ascending: false }),
        supabase.from('blog_posts').select('*').order('created_at', { ascending: false }),
      ]);

      // Merge inquiries (database + local storage cache)
      const dbInquiries = inq.data || [];
      const mergedInquiries = [...localInquiries];
      dbInquiries.forEach((item) => {
        if (!mergedInquiries.some((x) => x.id === item.id || (x.email === item.email && x.created_at === item.created_at))) {
          mergedInquiries.push(item);
        }
      });
      setInquiries(mergedInquiries);

      // Packages fallback logic
      if (pkg.data && pkg.data.length > 0) {
        setPackages(pkg.data);
      } else {
        setPackages(fallbackPackages);
      }

      // Portfolio fallback logic
      if (port.data && port.data.length > 0) {
        setPortfolio(port.data);
      } else {
        setPortfolio(fallbackPortfolio);
      }

      // Blog fallback logic
      if (blog.data && blog.data.length > 0) {
        setBlogPosts(blog.data);
      } else {
        setBlogPosts(fallbackBlogPosts);
      }
    } catch {
      // Fallback totally if network error
      setInquiries(localInquiries);
      setPackages(fallbackPackages);
      setPortfolio(fallbackPortfolio);
      setBlogPosts(fallbackBlogPosts);
    }

    setLoading(false);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.toLowerCase() === 'mastermind' || passcode === 'admin123') {
      setIsAuthenticated(true);
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  const updateInquiryStatus = async (id: string, status: string) => {
    try {
      await supabase.from('inquiries').update({ status }).eq('id', id);
    } catch {
      // silently handle
    }
    // Update local state
    setInquiries((prev) => prev.map((i) => (i.id === id ? { ...i, status } : i)));

    // Sync back to localStorage
    const localInquiries = JSON.parse(localStorage.getItem('mastermind_inquiries') || '[]');
    const updatedLocal = localInquiries.map((i: any) => (i.id === id ? { ...i, status } : i));
    localStorage.setItem('mastermind_inquiries', JSON.stringify(updatedLocal));
  };

  const deleteSavedPlan = (id: string) => {
    const updated = savedPlans.filter((p) => p.id !== id);
    setSavedPlans(updated);
    localStorage.setItem('mastermind_saved_plans', JSON.stringify(updated));
  };

  const togglePackageActive = async (id: string, isActive: boolean) => {
    try {
      await supabase.from('packages').update({ is_active: !isActive }).eq('id', id);
    } catch {
      // fallback
    }
    setPackages((prev) => prev.map((p) => (p.id === id ? { ...p, is_active: !isActive } : p)));
  };

  const toggleBlogPublish = async (id: string, isPublished: boolean) => {
    try {
      await supabase.from('blog_posts').update({ is_published: !isPublished }).eq('id', id);
    } catch {
      // fallback
    }
    setBlogPosts((prev) => prev.map((b) => (b.id === id ? { ...b, is_published: !isPublished } : b)));
  };

  const stats = [
    { label: 'Inquiries', value: inquiries.length, icon: Users, color: '#03A9F4' },
    { label: 'Saved Event Plans', value: savedPlans.length, icon: Bookmark, color: '#00D8FF' },
    { label: 'Active Packages', value: packages.filter((p) => p.is_active).length, icon: Package, color: '#25D366' },
    { label: 'Portfolio Items', value: portfolio.length, icon: Image, color: '#00C853' },
  ];

  const formatDate = (d: string) => new Date(d).toLocaleDateString('en-PK', { year: 'numeric', month: 'short', day: 'numeric' });

  // Passcode login view
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0A0A0A] p-6 relative">
        {/* Spotlight decoration */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full opacity-10 bg-gold blur-[100px] pointer-events-none" />
        <div className="glass-card p-8 max-w-sm w-full border border-gold/30 text-center space-y-6 bg-black/60 relative z-10">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gold/10 border border-gold/20 mx-auto">
            <Key size={20} className="text-[#03A9F4] animate-pulse" />
          </div>
          <div>
            <h2 className="text-xl font-bold font-serif text-white uppercase tracking-wider">Admin Area Lock</h2>
            <p className="text-xs text-white/50 mt-1">Provide passcode to access management tools</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="Enter passcode (mastermind)"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg text-xs bg-black/50 outline-none border border-white/10 text-white focus:border-gold/50 text-center tracking-widest font-semibold font-mono"
            />
            {authError && <p className="text-[10px] text-red-500 font-bold">Incorrect credentials. Passcode: 'mastermind'</p>}
            <button type="submit" className="btn-gold w-full py-2.5 text-xs">
              Unlock Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Dashboard management view
  return (
    <div className="min-h-screen pt-20 pb-10" style={{ background: '#0A0A0A' }}>
      <div className="max-w-7xl mx-auto px-6 py-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold" style={{ fontFamily: "'Cinzel', serif", color: '#fff' }}>
              Mastermind <span className="gold-text">Dashboard</span>
            </h1>
            <p className="text-xs mt-1" style={{ color: '#999', fontFamily: "'Poppins', sans-serif" }}>
              HQ: Faisalabad, Pakistan • Manage client calculations, bookings, and services.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={loadData} className="btn-outline-gold text-xs px-4 py-2">
              Refresh Data
            </button>
            <button onClick={() => setIsAuthenticated(false)} className="px-4 py-2 text-xs border border-white/10 rounded-lg text-white/60 hover:text-white">
              Lock
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((s) => (
            <div key={s.label} className="glass-card p-5 border border-gold/15 bg-black/35">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${s.color}10`, border: `1px solid ${s.color}30` }}>
                  <s.icon size={15} style={{ color: s.color }} />
                </div>
              </div>
              <p className="text-xl font-bold font-serif text-white">{s.value}</p>
              <p className="text-[10px] mt-0.5 tracking-wider uppercase text-white/50" style={{ fontFamily: "'Montserrat', sans-serif" }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Tab Controls */}
        <div className="flex gap-2 mb-6 overflow-x-auto border-b border-white/10 pb-4">
          {([
            { id: 'inquiries', label: 'Client Inquiries' },
            { id: 'plans', label: 'Saved Event Plans' },
            { id: 'packages', label: 'Service Packages' },
            { id: 'portfolio', label: 'Portfolio Items' },
            { id: 'blog', label: 'Blog Articles' }
          ] as { id: Tab; label: string }[]).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-300 whitespace-nowrap"
              style={{
                background: activeTab === tab.id ? 'rgba(3, 169, 244,0.12)' : 'transparent',
                border: `1px solid ${activeTab === tab.id ? '#03A9F4' : 'rgba(255,255,255,0.05)'}`,
                color: activeTab === tab.id ? '#03A9F4' : '#999',
                fontFamily: "'Montserrat', sans-serif",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Panel */}
        {loading ? (
          <div className="text-center py-20">
            <span className="text-xs text-white/50">Loading master files...</span>
          </div>
        ) : (
          <div className="space-y-4">
            
            {/* 1. Client Inquiries */}
            {activeTab === 'inquiries' && (
              <div className="space-y-4">
                {inquiries.length === 0 ? (
                  <p className="text-center py-12 text-white/30 text-xs">No client inquiries found</p>
                ) : (
                  inquiries.map((inq) => (
                    <div key={inq.id} className="glass-card p-5 border border-white/5 bg-black/40">
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-2.5">
                            <h3 className="text-sm font-bold text-white">{inq.full_name}</h3>
                            <span
                              className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider"
                              style={{
                                background: inq.status === 'pending' ? 'rgba(234,179,8,0.1)' : inq.status === 'contacted' ? 'rgba(59,130,246,0.1)' : 'rgba(34,197,94,0.1)',
                                color: inq.status === 'pending' ? '#EAB308' : inq.status === 'contacted' ? '#3B82F6' : '#22C55E',
                                border: `1px solid ${inq.status === 'pending' ? 'rgba(234,179,8,0.2)' : inq.status === 'contacted' ? 'rgba(59,130,246,0.2)' : 'rgba(34,197,94,0.2)'}`,
                              }}
                            >
                              {inq.status}
                            </span>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 text-xs text-white/60">
                            <p><strong className="text-white/40 uppercase text-[9px] block">Email</strong> {inq.email || 'N/A'}</p>
                            <p><strong className="text-white/40 uppercase text-[9px] block">Phone</strong> {inq.phone}</p>
                            <p><strong className="text-white/40 uppercase text-[9px] block">Event Type</strong> <span className="capitalize">{inq.event_type}</span></p>
                            <p><strong className="text-white/40 uppercase text-[9px] block">Scale</strong> {inq.guest_count || 0} Guests</p>
                            <p><strong className="text-white/40 uppercase text-[9px] block">City</strong> {inq.city || 'Faisalabad'}</p>
                            <p><strong className="text-white/40 uppercase text-[9px] block">Estimated Budget</strong> <span className="text-gold font-bold">{inq.estimated_budget}</span></p>
                          </div>
                          {inq.additional_notes && (
                            <div className="mt-3 p-2 bg-white/5 rounded border border-white/5 text-[11px] text-white/70">
                              <strong className="text-[#03A9F4] text-[9px] uppercase block mb-0.5">Custom Specifications</strong>
                              {inq.additional_notes}
                            </div>
                          )}
                          <p className="text-[10px] mt-3 text-white/30">Submitted: {formatDate(inq.created_at)}</p>
                        </div>
                        <div className="flex gap-1.5 self-end md:self-start">
                          {inq.status === 'pending' && (
                            <button onClick={() => updateInquiryStatus(inq.id, 'contacted')} className="px-2.5 py-1.5 rounded-lg text-[10px] font-semibold border border-blue-500/30 text-blue-400 hover:bg-blue-500/5 transition-colors">
                              Mark Contacted
                            </button>
                          )}
                          {(inq.status === 'pending' || inq.status === 'contacted') && (
                            <button onClick={() => updateInquiryStatus(inq.id, 'confirmed')} className="px-2.5 py-1.5 rounded-lg text-[10px] font-semibold border border-green-500/30 text-green-400 hover:bg-green-500/5 transition-colors">
                              Confirm
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* 2. Saved Event Plans */}
            {activeTab === 'plans' && (
              <div className="space-y-4">
                {savedPlans.length === 0 ? (
                  <p className="text-center py-12 text-white/30 text-xs">No saved event layouts in current browser storage.</p>
                ) : (
                  savedPlans.map((plan) => (
                    <div key={plan.id} className="glass-card p-5 border border-white/5 bg-black/40">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-sm font-bold text-white mb-2 font-serif">{plan.eventTypeLabel} Plan</h3>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-white/70">
                            <div>
                              <span className="text-white/40 block text-[9px] uppercase">Expected Scale</span>
                              <span>{plan.guestCount} Attendees</span>
                            </div>
                            <div>
                              <span className="text-white/40 block text-[9px] uppercase">Service Tier</span>
                              <span className="text-gold font-semibold">{plan.packageType}</span>
                            </div>
                            <div className="col-span-2">
                              <span className="text-white/40 block text-[9px] uppercase">Budget Span</span>
                              <span className="text-[#25D366] font-bold">PKR {plan.minBudget?.toLocaleString()} - {plan.maxBudget?.toLocaleString()}</span>
                            </div>
                          </div>
                          <div className="mt-3">
                            <span className="text-white/40 block text-[9px] uppercase mb-1">Services Tracked</span>
                            <div className="flex flex-wrap gap-1">
                              {(plan.selectedServices as string[])?.map((s) => (
                                <span key={s} className="px-2 py-0.5 rounded text-[10px] bg-white/5 text-white/80 border border-white/5">{s}</span>
                              ))}
                            </div>
                          </div>
                          <p className="text-[10px] mt-3 text-white/30">Layout Saved: {formatDate(plan.savedAt)}</p>
                        </div>
                        <button
                          onClick={() => deleteSavedPlan(plan.id)}
                          className="w-8 h-8 rounded-lg border border-red-500/20 text-red-400 flex items-center justify-center hover:bg-red-500/10 transition-colors"
                          title="Delete Saved layout"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* 3. Service Packages */}
            {activeTab === 'packages' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {packages.map((pkg) => (
                  <div key={pkg.id} className="glass-card p-5 border border-white/5 bg-black/40">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-bold text-white">{pkg.name}</h3>
                      <button
                        onClick={() => togglePackageActive(pkg.id, pkg.is_active)}
                        className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider"
                        style={{
                          background: pkg.is_active ? 'rgba(34,197,94,0.1)' : 'rgba(255,255,255,0.05)',
                          color: pkg.is_active ? '#22C55E' : '#666',
                          border: `1px solid ${pkg.is_active ? 'rgba(34,197,94,0.2)' : 'rgba(255,255,255,0.1)'}`,
                        }}
                      >
                        {pkg.is_active ? 'Active' : 'Inactive'}
                      </button>
                    </div>
                    <p className="text-[10px] tracking-wider uppercase text-[#03A9F4] mb-2">{pkg.event_type}</p>
                    <p className="text-xs text-white/80 font-serif">PKR {pkg.price_min?.toLocaleString()} - {pkg.price_max?.toLocaleString()}</p>
                    <div className="flex flex-wrap gap-1 mt-3">
                      {(pkg.features as string[])?.slice(0, 3).map((f: string) => (
                        <span key={f} className="px-2 py-0.5 rounded text-[9px] bg-white/5 text-white/50">{f}</span>
                      ))}
                      {(pkg.features as string[])?.length > 3 && (
                        <span className="px-2 py-0.5 rounded text-[9px] text-white/30">+{ (pkg.features as string[]).length - 3 } more</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 4. Portfolio Items */}
            {activeTab === 'portfolio' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {portfolio.map((item) => (
                  <div key={item.id} className="glass-card overflow-hidden border border-white/5 bg-black/40">
                    <img src={item.image_url} alt="" className="w-full h-32 object-cover" />
                    <div className="p-3">
                      <h4 className="text-xs font-bold text-white truncate">{item.title}</h4>
                      <p className="text-[9px] text-[#03A9F4] uppercase tracking-wider mt-1">{item.category}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 5. Blog Posts */}
            {activeTab === 'blog' && (
              <div className="space-y-3">
                {blogPosts.map((post) => (
                  <div key={post.id} className="glass-card p-4 border border-white/5 bg-black/40 flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-white">{post.title}</h4>
                      <p className="text-[9px] text-white/40 uppercase tracking-widest mt-1">{post.category} &bull; {formatDate(post.created_at)}</p>
                    </div>
                    <button
                      onClick={() => toggleBlogPublish(post.id, post.is_published)}
                      className="px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider"
                      style={{
                        background: post.is_published ? 'rgba(34,197,94,0.1)' : 'rgba(234,179,8,0.1)',
                        color: post.is_published ? '#22C55E' : '#EAB308',
                        border: `1px solid ${post.is_published ? 'rgba(34,197,94,0.2)' : 'rgba(234,179,8,0.2)'}`,
                      }}
                    >
                      {post.is_published ? 'Published' : 'Draft'}
                    </button>
                  </div>
                ))}
              </div>
            )}

          </div>
        )}
      </div>
    </div>
  );
}
