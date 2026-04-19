import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiRequest } from '../../services/api';

const GrievancesBoard = () => {
    const [grievances, setGrievances] = useState<any[]>([]);
    const [clusters, setClusters] = useState<any[]>([]);
    const [viewMode, setViewMode] = useState<'board' | 'clusters'>('board');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const grievancesData = await apiRequest('grievances', '');
                setGrievances(grievancesData);

                const clustersData = await apiRequest('grievances', '/clusters');
                setClusters(clustersData);
            } catch (err) {
                console.error("Failed to fetch grievance data", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const columns = [
        { title: "New", status: "Pending", color: "bg-secondary" },
        { title: "Investigating", status: "IN_PROGRESS", color: "bg-primary" },
        { title: "Escalated", status: "Escalated", color: "bg-error" },
        { title: "Resolved", status: "RESOLVED", color: "bg-surface-variant" }
    ];

    const getGrievancesByStatus = (status: string) => {
        return grievances.filter(g => g.status === status);
    };

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
                    <Link to="/income-map" className="flex items-center gap-3 text-on-surface-variant/70 px-4 py-3 hover:translate-x-1 hover:bg-surface-container-low/50 rounded-xl transition-all duration-300">
                        <span className="material-symbols-outlined">explore</span>
                        <span className="font-headline text-sm">Live Map</span>
                    </Link>
                    <Link to="/grievances-board" className="flex items-center gap-3 bg-surface-container-low text-primary rounded-xl px-4 py-3 font-bold transition-all duration-300">
                        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>gavel</span>
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
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h1 className="text-5xl font-black text-primary font-headline tracking-tightest mb-3">Grievances Board</h1>
                            <p className="text-on-surface-variant max-w-2xl text-lg leading-relaxed">
                                Active mediation ledger for verified gig-worker disputes in the SQL database.
                                <span className="text-primary font-bold ml-1">Live from Grievance Microservice.</span>
                            </p>
                        </div>
                        <div className="flex bg-surface-container-low p-2 rounded-2xl gap-2 border border-surface-container-high">
                            <button 
                                onClick={() => setViewMode('board')}
                                className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${viewMode === 'board' ? 'bg-white text-primary shadow-sm' : 'text-on-surface-variant/60 hover:text-primary'}`}
                            >
                                Kanban Board
                            </button>
                            <button 
                                onClick={() => setViewMode('clusters')}
                                className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${viewMode === 'clusters' ? 'bg-white text-primary shadow-sm' : 'text-on-surface-variant/60 hover:text-primary'}`}
                            >
                                Systemic Clusters
                            </button>
                        </div>
                    </div>

                    {viewMode === 'clusters' ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {clusters.map((cluster, i) => (
                                <div key={i} className={`p-8 rounded-[2.5rem] bg-white border-2 transition-all hover:scale-[1.02] ${cluster.isHighPriority ? 'border-error/20 bg-error/5 shadow-xl shadow-error/5' : 'border-surface-container shadow-sm hover:shadow-lg'}`}>
                                    <div className="flex justify-between items-start mb-6">
                                        <div className={`p-4 rounded-2xl ${cluster.isHighPriority ? 'bg-error text-white' : 'bg-primary text-white'}`}>
                                            <span className="material-symbols-outlined text-3xl">hub</span>
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${cluster.isHighPriority ? 'bg-error text-white' : 'bg-surface-container text-on-surface-variant'}`}>
                                            {cluster.count} Similar Cases
                                        </span>
                                    </div>
                                    <h3 className="text-2xl font-black text-primary mb-4 leading-tight">{cluster.name}</h3>
                                    <p className="text-sm text-on-surface-variant font-medium mb-8">
                                        Detected a {cluster.isHighPriority ? 'critical' : 'common'} pattern of complaints on this platform. Advocate intervention recommended.
                                    </p>
                                    <button className={`w-full py-4 rounded-xl font-bold text-sm transition-all ${cluster.isHighPriority ? 'bg-error text-white shadow-lg shadow-error/20' : 'bg-surface-container text-on-surface-variant hover:bg-primary hover:text-white'}`}>
                                        Investigate Cluster
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        /* Kanban Grid */
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {columns.map((col, i) => {
                            const items = getGrievancesByStatus(col.status);
                            return (
                                <div key={i} className="flex flex-col gap-6">
                                    <div className="flex items-center justify-between px-2">
                                        <h3 className="font-headline font-black text-on-surface flex items-center gap-3">
                                            <span className={`w-3 h-3 rounded-full ${col.color}`}></span>
                                            {col.title}
                                            <span className="text-on-surface-variant text-xs opacity-40 ml-1">({items.length})</span>
                                        </h3>
                                        <button className="text-slate-300 hover:text-primary transition-colors">
                                            <span className="material-symbols-outlined">more_horiz</span>
                                        </button>
                                    </div>

                                    <div className="space-y-4">
                                        {items.map((item, j) => (
                                            <div key={j} className="block group bg-white p-6 rounded-[2rem] shadow-sm border border-transparent hover:border-primary/10 transition-all cursor-pointer">
                                                <div className="flex justify-between items-start mb-4">
                                                    <span className="text-[9px] font-black text-primary px-2 py-1 bg-primary/5 rounded-lg uppercase tracking-widest">{item.platform}</span>
                                                    <p className="text-[9px] font-bold text-on-surface-variant opacity-40 uppercase">
                                                      {new Date(item.createdAt).toLocaleDateString()}
                                                    </p>
                                                </div>
                                                <h4 className="font-bold text-on-surface mb-3 leading-snug group-hover:text-primary transition-colors">{item.category}</h4>
                                                <p className="text-xs text-on-surface-variant line-clamp-2 mb-4 font-medium">{item.complaint}</p>
                                                <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                                                    <div className="flex -space-x-2">
                                                        <div className="w-6 h-6 rounded-full bg-slate-100 border-2 border-white overflow-hidden flex items-center justify-center font-bold text-[8px]">
                                                          {item.isAnonymous ? '??' : item.workerId?.toString().slice(0,2)}
                                                        </div>
                                                    </div>
                                                    <span className="px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest bg-surface-container text-on-surface-variant">
                                                        {item.status}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                        {items.length === 0 && (
                                          <div className="py-10 text-center text-on-surface-variant opacity-30 text-xs font-bold uppercase tracking-widest border-2 border-dashed border-slate-100 rounded-[2rem]">Empty</div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default GrievancesBoard;
