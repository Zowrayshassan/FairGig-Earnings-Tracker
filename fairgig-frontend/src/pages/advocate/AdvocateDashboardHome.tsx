import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiRequest } from '../../services/api';

const AdvocateDashboardHome = () => {
    const [kpis, setKpis] = useState<any>(null);
    const [recentGrievances, setRecentGrievances] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch KPIs from Port 8003
                const kpiData = await apiRequest('analytics', '/kpis');
                setKpis(kpiData);

                // Fetch Recent Grievances from Port 5002
                const grievanceData = await apiRequest('grievances', '');
                // Take top 3 latest
                const sorted = grievanceData.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                setRecentGrievances(sorted.slice(0, 3));
            } catch (err) {
                console.error("Failed to fetch advocate data", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
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
                    <Link to="/" className="flex items-center gap-2 hover:text-primary transition-all text-xs font-bold mb-4 uppercase tracking-widest">
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
                    <Link to="/advocate" className="flex items-center gap-3 bg-surface-container-low text-primary rounded-xl px-4 py-3 font-bold transition-all duration-300">
                        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>grid_view</span>
                        <span className="font-headline text-sm">Dashboard</span>
                    </Link>
                    <Link to="/income-map" className="flex items-center gap-3 text-on-surface-variant/70 px-4 py-3 hover:translate-x-1 hover:bg-surface-container-low/50 rounded-xl transition-all duration-300">
                        <span className="material-symbols-outlined">explore</span>
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
            <main className="ml-72 pt-24 px-10 pb-12 overflow-x-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                        <div>
                            <h1 className="text-5xl font-black text-primary font-headline tracking-tightest mb-3">Advocate Home</h1>
                            <p className="text-on-surface-variant max-w-2xl text-lg leading-relaxed">
                                Oversight of digital labor markets and algorithm transparency in SQL.
                                <span className="block mt-2 font-bold text-primary italic">"Ensuring algorithmic justice for every gig worker."</span>
                            </p>
                        </div>
                        <div className="flex gap-4">
                            <div className="p-4 bg-white rounded-3xl border border-surface-container-low shadow-sm">
                                <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant mb-1">Active Claims</p>
                                <p className="text-2xl font-black text-primary">{kpis?.active_disputes || 0}</p>
                            </div>
                            <div className="p-4 bg-white rounded-3xl border border-surface-container-low shadow-sm">
                                <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant mb-1">Response Rate</p>
                                <p className="text-2xl font-black text-emerald-500">98.2%</p>
                            </div>
                        </div>
                    </div>

                    {/* Stats Cards Bento */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                        {[
                            { label: "Tracked Workers", val: kpis?.total_workers_tracked || 0, icon: "public", color: "bg-blue-50 text-blue-600" },
                            { label: "Claims Resolved", val: kpis?.resolved_cases || 0, icon: "verified", color: "bg-emerald-50 text-emerald-600" },
                            { label: "System Earnings", val: `PKR ${kpis?.total_earnings_logged.toLocaleString()}`, icon: "payments", color: "bg-primary-container text-primary" },
                            { label: "Avg Commission", val: `${kpis?.average_commission}%`, icon: "percent", color: "bg-amber-50 text-amber-600" }
                        ].map((stat, i) => (
                            <div key={i} className="bg-white p-8 rounded-[2rem] shadow-sm border border-surface-container-low group hover:shadow-xl hover:shadow-primary/5 transition-all">
                                <div className={`w-12 h-12 rounded-2xl ${stat.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                    <span className="material-symbols-outlined">{stat.icon}</span>
                                </div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant mb-1 opacity-60">{stat.label}</p>
                                <h3 className="text-3xl font-black text-on-surface">{stat.val}</h3>
                            </div>
                        ))}
                    </div>

                    {/* Quick Actions / Recent Activity */}
                    <div className="grid grid-cols-12 gap-8">
                        <div className="col-span-12 lg:col-span-8 bg-white p-10 rounded-[3rem] shadow-sm border border-surface-container-low">
                            <div className="flex justify-between items-center mb-8">
                                <h3 className="text-2xl font-black text-on-surface font-headline">Recent Systemic Grievances</h3>
                                <Link to="/grievances-board" className="text-sm font-bold text-primary hover:underline">View All</Link>
                            </div>
                            <div className="space-y-6">
                                {recentGrievances.map((item, i) => (
                                    <div key={i} className="flex items-center justify-between p-6 bg-surface-container-low/30 rounded-3xl border border-transparent hover:border-primary/5 transition-all cursor-pointer group">
                                        <div className="flex items-center gap-6">
                                            <div className={`w-12 h-12 rounded-2xl bg-secondary-container flex items-center justify-center text-primary`}>
                                                <span className="material-symbols-outlined">description</span>
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-on-surface group-hover:text-primary transition-colors">{item.category}</h4>
                                                <p className="text-xs text-on-surface-variant font-medium">Platform: {item.platform} • {new Date(item.createdAt).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                        <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-primary-container text-on-surface`}>{item.status}</span>
                                    </div>
                                ))}
                                {recentGrievances.length === 0 && (
                                  <div className="py-10 text-center text-on-surface-variant italic font-medium">No recent grievances reported. System healthy.</div>
                                )}
                            </div>
                        </div>

                        <div className="col-span-12 lg:col-span-4 space-y-8">
                            <div className="bg-primary p-10 rounded-[3rem] shadow-2xl shadow-primary/20 text-white relative overflow-hidden group">
                                <div className="relative z-10">
                                    <h3 className="text-2xl font-black font-headline mb-4">Generate Market Audit</h3>
                                    <p className="text-primary-fixed/70 text-sm leading-relaxed mb-8">Comprehensively export all algorithmic bias data from the SQL Ledger.</p>
                                    <button className="w-full bg-white text-primary font-black py-4 rounded-2xl text-[10px] uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-white/10">
                                        Initialize Audit Report
                                    </button>
                                </div>
                                <span className="material-symbols-outlined absolute -right-4 -bottom-4 text-[12rem] opacity-5 group-hover:rotate-12 transition-transform duration-700 pointer-events-none">analytics</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdvocateDashboardHome;
