import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiRequest } from '../../services/api';

const IncomeDistributionMap = () => {
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await apiRequest('analytics', '/kpis');
                setStats(data);
            } catch (err) {
                console.error("Failed to fetch map stats", err);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) return (
        <div className="min-h-screen bg-background flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
        </div>
    );

    return (
        <div className="bg-background text-on-surface font-body selection:bg-primary/10 min-h-screen">
            {/* Standardized Advocate SideNavBar */}
            <aside className="fixed left-0 top-0 bottom-0 w-72 h-screen z-50 bg-white shadow-[4px_0px_20px_rgba(0,0,0,0.02)] flex flex-col h-full p-6 border-r border-surface-container-low">
                <div className="px-4 mb-10 text-primary/50">
                    <Link to="/advocate" className="flex items-center gap-2 hover:text-primary transition-all text-xs font-bold mb-4 uppercase tracking-widest">
                        <span className="material-symbols-outlined text-sm">arrow_back</span>
                        BACK
                    </Link>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                            <span className="material-symbols-outlined text-white" style={{ fontVariationSettings: "'FILL' 1" }}>balance</span>
                        </div>
                        <div>
                            <h2 className="text-xl font-extrabold tracking-tighter text-primary font-headline leading-none">The Ethical Ledger</h2>
                            <p className="text-[10px] uppercase tracking-widest text-outline mt-1 font-bold">Advocate Global Oversight</p>
                        </div>
                    </div>
                </div>
                <nav className="flex-1 space-y-1">
                    <Link to="/advocate" className="flex items-center gap-3 text-on-surface-variant/70 px-4 py-3 hover:translate-x-1 hover:bg-surface-container-low/50 rounded-xl transition-all duration-300">
                        <span className="material-symbols-outlined">grid_view</span>
                        <span className="font-headline text-sm">Dashboard</span>
                    </Link>
                    <Link to="/income-map" className="flex items-center gap-3 bg-surface-container-low text-primary rounded-xl px-4 py-3 font-bold transition-all duration-300">
                        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>explore</span>
                        <span className="font-headline text-sm">Live Map</span>
                    </Link>
                    <Link to="/grievances-board" className="flex items-center gap-3 text-on-surface-variant/70 px-4 py-3 hover:translate-x-1 hover:bg-surface-container-low/50 rounded-xl transition-all duration-300">
                        <span className="material-symbols-outlined">gavel</span>
                        <span className="font-headline text-sm">Grievances Board</span>
                    </Link>
                    <div className="pt-4 pb-2 px-4">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant/40">Market Insights</p>
                    </div>
                    <Link to="/income-map" className="flex items-center gap-3 text-on-surface-variant/70 px-4 py-3 hover:translate-x-1 hover:bg-surface-container-low/50 rounded-xl transition-all duration-300">
                        <span className="material-symbols-outlined">insights</span>
                        <span className="font-headline text-sm">Commission Trends</span>
                    </Link>
                    <Link to="/vulnerability-flags" className="flex items-center gap-3 text-error/70 px-4 py-3 hover:translate-x-1 hover:bg-error-container/10 rounded-xl transition-all duration-300">
                        <span className="material-symbols-outlined">crisis_alert</span>
                        <span className="font-headline text-sm">Vulnerability Flags</span>
                    </Link>
                </nav>
                <div className="mt-auto pt-6 border-t border-surface-container space-y-1 text-on-surface-variant/70">
                    <a className="flex items-center gap-3 px-4 py-3 hover:bg-surface-container-low/50 rounded-xl transition-all text-sm font-medium" href="#">
                        <span className="material-symbols-outlined">help_outline</span>
                        Support Center
                    </a>
                    <button onClick={() => { localStorage.clear(); navigate('/'); }} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-error-container/10 hover:text-error rounded-xl transition-all text-sm font-medium">
                        <span className="material-symbols-outlined">logout</span>
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* TopNavBar Header Pattern */}
            <header className="fixed top-0 right-0 w-[calc(100%-18rem)] z-40 bg-white/80 backdrop-blur-xl border-b border-surface-container-low flex justify-between items-center px-10 h-20">
                <div className="flex items-center gap-4 flex-1">
                    <div className="relative w-96 group focus-within:ring-2 focus-within:ring-primary/30 rounded-full transition-all">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">search</span>
                        <input className="w-full bg-surface-container-low border-none rounded-full py-2 pl-10 pr-4 text-sm outline-none focus:ring-0 placeholder:text-slate-400 font-body" placeholder="Search markets, platform IDs, or grievances..." type="text" />
                    </div>
                </div>
                <div className="flex items-center gap-6">
                    <button className="hover:bg-slate-100/50 rounded-full p-2 transition-all relative">
                        <span className="material-symbols-outlined text-slate-600">notifications</span>
                        <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full border-2 border-white"></span>
                    </button>
                    <div className="flex items-center gap-3 pl-6 border-l border-surface-container-high">
                        <div className="text-right">
                            <p className="text-sm font-black text-primary leading-none">Advocate Alpha</p>
                            <p className="text-[10px] text-slate-500 font-bold tracking-widest uppercase mt-1">Global Regulator</p>
                        </div>
                        <div className="h-10 w-10 rounded-xl bg-primary-container overflow-hidden border border-primary/20 shadow-sm">
                            <img alt="Advocate Profile" className="h-full w-full object-cover" src="https://i.pravatar.cc/100?u=advocate" />
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="ml-72 pt-24 min-h-screen relative overflow-hidden bg-slate-50">
                {/* Live Interactive Map Shell */}
                <div className="w-full h-[calc(100vh-5rem)] relative bg-[#eef3f0]">
                    {/* High-Fidelity Generated Map Background */}
                    <div className="absolute inset-0 bg-cover bg-center transition-all duration-1000 opacity-60 mix-blend-multiply" style={{ backgroundImage: "url('https://api.mapbox.com/styles/v1/mapbox/light-v10/static/72.0,30.0,3,0/1200x800?access_token=YOUR_MAPBOX_TOKEN')" }}></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-primary/5"></div>

                    {/* Map Controls Floating Overlay */}
                    <div className="absolute top-8 left-8 z-10 space-y-4">
                        <div className="bg-white/95 backdrop-blur-2xl p-8 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-white/50 w-80 group hover:shadow-primary/10 transition-all duration-500">
                            <div className="flex items-center gap-2 mb-6">
                                <span className="material-symbols-outlined text-primary text-xl animate-pulse">radar</span>
                                <h2 className="text-xl font-black text-primary font-headline">Market Density</h2>
                            </div>
                            <div className="space-y-5">
                                {[
                                    { label: "Karachi South", val: "Extreme", color: "bg-error animate-pulse", pulse: true },
                                    { label: "Lahore Hub", val: "High", color: "bg-error", pulse: true },
                                    { label: "Islamabad North", val: "Moderate", color: "bg-primary", pulse: false },
                                    { label: "Multan Cluster", val: "Low", color: "bg-blue-500", pulse: false }
                                ].map((m, i) => (
                                    <div key={i} className="flex justify-between items-center group/item cursor-pointer hover:translate-x-1 transition-all">
                                        <p className="text-sm font-bold text-on-surface flex items-center gap-3">
                                            <span className={`w-2.5 h-2.5 rounded-full ${m.color} ${m.pulse ? 'ring-4 ring-error/20' : ''}`}></span>
                                            {m.label}
                                        </p>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-60">{m.val}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white/95 backdrop-blur-2xl p-8 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-white/50 w-80">
                            <h3 className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest mb-4 opacity-50">Active Gig Workers</h3>
                            <div className="flex items-end gap-2 mb-2">
                                <p className="text-5xl font-black text-primary leading-none tracking-tightest">{stats?.total_workers_tracked || 0}</p>
                                <p className="text-sm font-black text-emerald-500 mb-1 flex items-center">
                                    <span className="material-symbols-outlined text-sm">trending_up</span>
                                    LIVE
                                </p>
                            </div>
                            <p className="text-[11px] font-medium text-slate-500 italic leading-relaxed">Monitoring {stats?.markets_active || 0} localized global clusters in SQL.</p>
                        </div>
                    </div>

                    {/* DYNAMIC MAP MARKERS - Roughly mapped to Pakistan for this demo */}
                    {/* Karachi Cluster */}
                    <div className="absolute top-[65%] left-[55%] group cursor-pointer">
                        <div className="absolute -inset-12 bg-error/20 rounded-full animate-ping opacity-40"></div>
                        <div className="w-6 h-6 bg-error rounded-full shadow-[0_0_40px_rgba(186,26,26,0.8)] border-4 border-white relative z-10 animate-bounce"></div>
                    </div>

                    {/* Lahore Cluster */}
                    <div className="absolute top-[35%] left-[62%] group cursor-pointer">
                        <div className="absolute -inset-8 bg-error/10 rounded-full animate-pulse"></div>
                        <div className="w-5 h-5 bg-error rounded-full shadow-[0_0_30px_rgba(186,26,26,0.6)] border-4 border-white relative z-10"></div>
                    </div>

                    {/* Islamabad Cluster */}
                    <div className="absolute top-[20%] left-[60%] group cursor-pointer">
                        <div className="w-4 h-4 bg-primary rounded-full shadow-[0_0_20px_rgba(16,185,129,0.5)] border-2 border-white relative z-10"></div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default IncomeDistributionMap;
