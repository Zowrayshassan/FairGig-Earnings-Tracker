import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiRequest } from '../../services/api';

const PendingReviewsList = () => {
    const [logs, setLogs] = useState<any[]>([]);
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch both logs and users (Cross-Service Identity Mapping)
                const [logsData, usersData] = await Promise.all([
                    apiRequest('earnings', '?status=Pending'),
                    apiRequest('auth', '/users')
                ]);
                setLogs(logsData);
                setUsers(usersData);
            } catch (err) {
                console.error("Failed to fetch data", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const getName = (id: string) => {
        if (!id) return "Unknown Worker";
        const user = users.find(u => u.id.toString() === id.toString());
        if (user) return user.name;
        
        // Fallback for new users added in this session
        const localUser = JSON.parse(localStorage.getItem('user') || '{}');
        if (localUser.id?.toString() === id.toString()) return localUser.name;
        
        return `Worker #${id}`;
    };

    const handleUpdateStatus = async (id: number, status: 'Verified' | 'Rejected') => {
        try {
            await apiRequest('earnings', `/${id}/status?status=${status}`, {
                method: 'PATCH'
            });
            // Update local state to remove the item from pending
            setLogs(prev => prev.filter(log => log.id !== id));
        } catch (err) {
            alert("Failed to update status");
        }
    };
  return (
    <div className="bg-background font-body text-on-surface min-h-screen">
      {/* Standardized Verifier SideNavBar */}
      <aside className="h-screen w-64 fixed left-0 top-0 border-r-0 bg-emerald-950 dark:bg-slate-950 shadow-xl flex flex-col py-6 z-50">
        <div className="px-6 mb-10 text-emerald-100/50">
            <Link to="/verifier" className="flex items-center gap-2 hover:text-white transition-all text-xs font-bold mb-4 uppercase tracking-widest">
                <span className="material-symbols-outlined text-sm">arrow_back</span>
                BACK
            </Link>
          <Link to="/" className="text-2xl font-bold text-white tracking-tightest">FairGig Verifier</Link>
          <p className="text-emerald-500 font-['Plus_Jakarta_Sans'] font-medium text-[10px] tracking-wider mt-1 uppercase opacity-80">Verification Officer</p>
        </div>
        <nav className="flex-1 space-y-1">
          <Link to="/verifier" className="flex items-center gap-3 text-emerald-300/70 hover:text-white hover:bg-emerald-800/40 px-4 py-3 mx-2 transition-all duration-150 rounded-lg">
            <span className="material-symbols-outlined">dashboard</span>
            <span className="font-['Plus_Jakarta_Sans'] font-medium text-sm tracking-tight">Dashboard</span>
          </Link>
          <Link to="/pending-reviews" className="flex items-center gap-3 bg-emerald-900/50 text-emerald-100 rounded-lg px-4 py-3 mx-2 transition-all">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>fact_check</span>
            <span className="font-['Plus_Jakarta_Sans'] font-medium text-sm tracking-tight">Pending Reviews</span>
          </Link>
          <Link to="/verifier-history" className="flex items-center gap-3 text-emerald-300/70 hover:text-white hover:bg-emerald-800/40 px-4 py-3 mx-2 transition-all duration-150 rounded-lg">
            <span className="material-symbols-outlined">history</span>
            <span className="font-['Plus_Jakarta_Sans'] font-medium text-sm tracking-tight">History</span>
          </Link>
        </nav>
        <div className="px-4 mt-auto pt-6 border-t border-emerald-900/30">
          <a className="flex items-center gap-3 text-emerald-300/70 hover:text-white px-4 py-3 transition-colors" href="#">
            <span className="material-symbols-outlined">help_outline</span>
            <span className="font-['Plus_Jakarta_Sans'] font-medium text-sm tracking-tight">Help Center</span>
          </a>
          <Link to="/" className="flex items-center gap-3 text-emerald-300/70 hover:text-white px-4 py-3 transition-colors">
            <span className="material-symbols-outlined">logout</span>
            <span className="font-['Plus_Jakarta_Sans'] font-medium text-sm tracking-tight">Log Out</span>
          </Link>
        </div>
      </aside>

      {/* TopNavBar Shell - Standardized */}
      <header className="fixed top-0 right-0 w-full lg:w-[calc(100%-16rem)] h-16 bg-white/80 backdrop-blur-xl border-b border-outline-variant/10 z-40 flex justify-between items-center px-8">
        <div className="flex items-center gap-4 flex-1">
           <div className="relative w-full max-w-md hidden md:block group focus-within:ring-2 focus-within:ring-emerald-500/30 rounded-full transition-all">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">search</span>
            <input className="w-full bg-surface-container-low border-none rounded-full py-2 pl-10 pr-4 text-sm focus:ring-0 focus:bg-surface-container-lowest transition-all placeholder:text-slate-400 font-body" placeholder="Search workers or review IDs..." type="text" />
          </div>
        </div>
        <div className="flex items-center gap-6">
          <button className="text-slate-500 hover:bg-slate-100/50 rounded-full p-2 transition-all relative group">
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full border-2 border-white"></span>
          </button>
          <div className="flex items-center gap-3 pl-4 border-l border-emerald-100/20 hidden sm:flex">
            <div className="text-right">
              <p className="text-xs font-bold text-emerald-900 leading-none">{storedUser.name || 'Arjun Mehta'}</p>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">Level 4 Verifier</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-primary-fixed overflow-hidden border-2 border-primary-fixed shadow-sm">
                <img alt="Verifier Avatar" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-w3RUehv1_YoLJQg3jYKo9Mk5v_E6RqzYI_Ws-Bb3Vymp9GHutoZTwlNRpGhxtWr1QRGs6y7vRV4kJh2MrFuJeHiTls-wYD-Nm0O6xv0L6YIO7hccwW81_oc7NWhYXsZrjHhE676ZeDY5AcYHHUY-fm3FAWt5TqADRSy-o2FXaPEW4-i49ib8iJBhQ3MsGmFUEmM9dXp8tMIzfk21nf744TwAFVvNLuTBv6ZTNT3v_2aRDecVxy0p-s-8YEY3hsxJ4QKvWKRSjzN6" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Canvas */}
      <main className="lg:ml-64 pt-24 px-8 pb-12">
        <div className="max-w-7xl mx-auto">
            {/* Header & Summary Stats */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                <div>
                    <h2 className="text-4xl font-extrabold text-emerald-900 tracking-tight mb-2 font-headline">Pending Reviews</h2>
                    <p className="text-on-surface-variant max-w-lg">Audit and verify digital earnings receipts to maintain the integrity of the FairGig ledger.</p>
                </div>
                <div className="flex gap-4">
                    <div className="bg-surface-container-lowest p-4 rounded-xl shadow-sm border border-emerald-50/50 min-w-[140px]">
                        <p className="text-xs font-bold text-on-surface-variant mb-1 uppercase tracking-widest opacity-60">Queue Depth</p>
                        <p className="text-2xl font-black text-emerald-900">{logs.length}</p>
                    </div>
                    <div className="bg-surface-container-lowest p-4 rounded-xl shadow-sm border border-emerald-50/50 min-w-[140px]">
                        <p className="text-xs font-bold text-on-surface-variant mb-1 uppercase tracking-widest opacity-60">Urgent</p>
                        <p className="text-2xl font-black text-error">12</p>
                    </div>
                </div>
            </div>

            {/* Filters Bar */}
            <div className="bg-surface-container-low p-4 rounded-2xl flex flex-wrap items-center gap-4 mb-8 border border-outline-variant/10">
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-emerald-900 text-xl">filter_list</span>
                    <span className="text-sm font-bold text-on-surface">Filters:</span>
                </div>
                <div className="relative">
                    <select className="appearance-none bg-surface-container-lowest border border-outline-variant/30 rounded-lg pl-3 pr-8 py-2 text-sm focus:ring-2 focus:ring-emerald-500/20 cursor-pointer outline-none">
                        <option>All Urgency</option>
                        <option>High Priority</option>
                        <option>Normal</option>
                        <option>Low</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant text-sm">expand_more</span>
                </div>
                <div className="relative">
                    <select className="appearance-none bg-surface-container-lowest border border-outline-variant/30 rounded-lg pl-3 pr-8 py-2 text-sm focus:ring-2 focus:ring-emerald-500/20 cursor-pointer outline-none">
                        <option>All Platforms</option>
                        <option>Foodpanda</option>
                        <option>Bykea</option>
                        <option>Uber</option>
                        <option>Careem</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant text-sm">expand_more</span>
                </div>
                <button className="ml-auto text-sm font-bold text-emerald-900 hover:underline px-2 transition-all">Clear All</button>
            </div>

            {/* Table Section */}
            <div className="bg-surface-container-lowest rounded-3xl overflow-hidden shadow-sm border border-outline-variant/10">
                <div className="overflow-x-auto text-on-surface">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-surface-container/50 border-b border-surface-variant/30">
                                <th className="px-6 py-5 text-[10px] font-black text-emerald-900/60 uppercase tracking-[0.2em]">Worker Name</th>
                                <th className="px-6 py-5 text-[10px] font-black text-emerald-900/60 uppercase tracking-[0.2em]">Shift Date</th>
                                <th className="px-6 py-5 text-[10px] font-black text-emerald-900/60 uppercase tracking-[0.2em]">Platform</th>
                                <th className="px-6 py-5 text-[10px] font-black text-emerald-900/60 uppercase tracking-[0.2em] text-right">Hours</th>
                                <th className="px-6 py-5 text-[10px] font-black text-emerald-900/60 uppercase tracking-[0.2em] text-right">Gross Earned</th>
                                <th className="px-6 py-5 text-[10px] font-black text-emerald-900/60 uppercase tracking-[0.2em]">Evidence</th>
                                <th className="px-6 py-5 text-[10px] font-black text-emerald-900/60 uppercase tracking-[0.2em] text-center">Urgency</th>
                                <th className="px-6 py-5 text-right"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-surface-variant/20 italic font-medium">
                            {logs.map((row) => (
                                <tr key={row.id} className="hover:bg-surface-container-low/40 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-900 font-bold text-sm">
                                                {getName(row.workerId).split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <div>
                                                <p className="font-bold text-on-surface text-sm not-italic">{getName(row.workerId)}</p>
                                                <p className="text-[10px] text-on-surface-variant font-bold not-italic">ID: #FG-{row.id}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-on-surface font-bold not-italic">{row.date}</td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-secondary-container text-on-secondary-fixed-variant not-italic">
                                            {row.platform}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-on-surface font-bold text-right not-italic">{row.hoursWorked} hrs</td>
                                    <td className="px-6 py-4 text-sm font-black text-emerald-900 text-right not-italic">₨ {row.amount.toLocaleString()}</td>
                                    <td className="px-6 py-4">
                                        {row.screenshotUrl ? (
                                            <div 
                                                onClick={() => setSelectedImage(row.screenshotUrl)}
                                                className="relative w-12 h-16 rounded-lg overflow-hidden bg-surface-variant border border-outline-variant/30 hover:scale-110 active:scale-95 transition-all cursor-zoom-in shadow-sm shadow-emerald-900/10"
                                            >
                                                <img 
                                                    className="w-full h-full object-cover" 
                                                    src={row.screenshotUrl} 
                                                    alt="Evidence"
                                                    onError={(e) => { (e.target as any).src = 'https://placehold.co/100x150?text=Error'; }}
                                                />
                                            </div>
                                        ) : (
                                            <span className="text-[10px] uppercase font-bold text-on-surface-variant opacity-30 italic">No Evidence</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-error-container text-on-error-container not-italic">
                                            High
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex gap-2 justify-end">
                                            <button 
                                                onClick={() => handleUpdateStatus(row.id, 'Verified')}
                                                className="bg-emerald-900 text-white px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-emerald-950 transition-all active:scale-95 shadow-sm not-italic"
                                            >
                                                Approve
                                            </button>
                                            <button 
                                                onClick={() => handleUpdateStatus(row.id, 'Rejected')}
                                                className="bg-error text-white px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-red-700 transition-all active:scale-95 shadow-sm not-italic"
                                            >
                                                Dispute
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {logs.length === 0 && !loading && (
                                <tr>
                                    <td colSpan={8} className="px-6 py-20 text-center text-on-surface-variant italic opacity-60">
                                        Zero pending reviews in queue. Good job!
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                {/* Pagination */}
                <div className="px-8 py-5 bg-surface-container-low/20 border-t border-surface-variant/20 flex items-center justify-between">
                    <p className="text-[10px] text-on-surface-variant font-black uppercase tracking-widest">Showing 1 to 10 of 142 results</p>
                    <div className="flex gap-2">
                        <button className="p-2 rounded-xl border border-outline-variant/30 hover:bg-white transition-all text-on-surface">
                            <span className="material-symbols-outlined text-sm">chevron_left</span>
                        </button>
                        <button className="px-4 py-2 rounded-xl bg-emerald-900 text-white text-[10px] font-black shadow-lg shadow-emerald-900/20">1</button>
                        <button className="px-4 py-2 rounded-xl hover:bg-white transition-all text-[10px] font-black text-on-surface border border-outline-variant/30">2</button>
                        <button className="p-2 rounded-xl border border-outline-variant/30 hover:bg-white transition-all text-on-surface">
                            <span className="material-symbols-outlined text-sm">chevron_right</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* AI Banner */}
            <div className="mt-12 bg-gradient-to-br from-emerald-950 to-emerald-900 p-8 rounded-[2rem] text-white shadow-2xl relative overflow-hidden group">
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                    <div className="max-w-xl">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="material-symbols-outlined text-emerald-400 group-hover:rotate-12 transition-transform">auto_awesome</span>
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400">AI Fraud Guard Active</span>
                        </div>
                        <h3 className="text-2xl font-black mb-3 font-headline leading-tight tracking-tight">Anomalous Screenshot Detection</h3>
                        <p className="text-emerald-100/70 text-sm leading-relaxed font-medium">Our neural vision model has flagged 12 high-urgency reviews with potential pixel manipulation and metadata inconsistencies. Prioritize these cases to maintain ledger accuracy.</p>
                    </div>
                    <button className="bg-emerald-400 text-emerald-950 px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-emerald-400/20">
                        View Flagged Queue
                    </button>
                </div>
                <div className="absolute -right-20 -bottom-20 opacity-10 transform rotate-12 group-hover:rotate-0 transition-all duration-700 pointer-events-none">
                    <span className="material-symbols-outlined text-[240px]">shutter_speed</span>
                </div>
            </div>
            {/* Evidence Preview Modal */}
            {selectedImage && (
                <div 
                    className="fixed inset-0 z-[100] bg-emerald-950/90 backdrop-blur-md flex items-center justify-center p-4 md:p-12 animate-in fade-in duration-300"
                    onClick={() => setSelectedImage(null)}
                >
                    <div className="relative max-w-4xl w-full h-full flex flex-col items-center justify-center gap-6">
                        <button className="absolute top-0 right-0 text-white hover:rotate-90 transition-transform">
                            <span className="material-symbols-outlined text-4xl">close</span>
                        </button>
                        <img 
                            src={selectedImage} 
                            className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl border-4 border-white/10"
                            alt="Full Proof"
                        />
                        <div className="bg-white/10 backdrop-blur-xl px-6 py-3 rounded-full text-white font-bold text-sm flex items-center gap-2">
                           <span className="material-symbols-outlined">verified</span>
                           SHIFT EVIDENCE AUDIT MODE
                        </div>
                    </div>
                </div>
            )}
        </div>
      </main>
    </div>
  );
};

export default PendingReviewsList;
