import { apiRequest } from '../../services/api';

const VerifierHistory = () => {
    const [records, setRecords] = React.useState<any[]>([]);
    const [users, setUsers] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState(true);
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');

    React.useEffect(() => {
        const fetchHistory = async () => {
            try {
                const [logsData, usersData] = await Promise.all([
                    apiRequest('earnings', ''),
                    apiRequest('auth', '/users')
                ]);
                // Only show Verified or Rejected in history (Case-insensitive)
                setRecords(logsData.filter((l: any) => (l.status || '').toLowerCase() !== 'pending'));
                setUsers(usersData);
            } catch (err) {
                console.error("Failed to fetch history", err);
            } finally {
                setLoading(false);
            }
        };
        fetchHistory();
    }, []);

    const getName = (id: string | number) => {
        const user = users.find(u => u.id.toString() === id.toString());
        return user ? user.name : `Worker #${id}`;
    };

    if (loading) return <div className="min-h-screen bg-background flex items-center justify-center text-primary font-bold">Loading History...</div>;


    return (
        <div className="bg-background text-on-surface font-body min-h-screen">
            {/* Standardized Verifier SideNavBar */}
            <aside className="h-screen w-64 fixed left-0 top-0 border-r-0 bg-emerald-950 dark:bg-slate-950 shadow-xl flex flex-col py-6 z-50 transition-all duration-300">
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
                    <Link to="/pending-reviews" className="flex items-center gap-3 text-emerald-300/70 hover:text-white hover:bg-emerald-800/40 px-4 py-3 mx-2 transition-all duration-150 rounded-lg">
                        <span className="material-symbols-outlined">fact_check</span>
                        <span className="font-['Plus_Jakarta_Sans'] font-medium text-sm tracking-tight">Pending Reviews</span>
                    </Link>
                    <Link to="/verifier-history" className="flex items-center gap-3 bg-emerald-900/50 text-emerald-100 rounded-lg px-4 py-3 mx-2 transition-all">
                        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>history</span>
                        <span className="font-['Plus_Jakarta_Sans'] font-medium text-sm tracking-tight">History</span>
                    </Link>
                </nav>
                <div className="px-4 mt-auto pt-6 border-t border-emerald-900/30">
                    <a className="flex items-center gap-3 text-emerald-300/70 hover:text-white px-4 py-3 transition-colors" href="#">
                        <span className="material-symbols-outlined">help_outline</span>
                        <span className="font-['Plus_Jakarta_Sans'] font-medium text-sm tracking-tight">Help Center</span>
                    </a>
          <button 
            onClick={() => { localStorage.removeItem('user'); window.location.href = '/login'; }}
            className="w-full flex items-center gap-3 text-emerald-300/70 hover:text-white px-4 py-3 transition-colors text-left"
          >
            <span className="material-symbols-outlined">logout</span>
            <span className="font-['Plus_Jakarta_Sans'] font-medium text-sm tracking-tight">Log Out</span>
          </button>
                </div>
            </aside>

            {/* TopNavBar Shell - Standardized */}
            <header className="fixed top-0 right-0 w-full lg:w-[calc(100%-16rem)] h-16 bg-white/80 backdrop-blur-xl border-b border-outline-variant/10 z-40 flex justify-between items-center px-8 text-on-surface">
                <div className="flex items-center gap-4 flex-1">
                    {/* Header back button removed - now in sidebar */}
                </div>
                <div className="flex items-center gap-6">
                    <button className="text-slate-500 hover:bg-slate-100/50 rounded-full p-2 transition-all relative">
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

            <main className="lg:ml-64 pt-24 px-8 pb-12 max-w-7xl mx-auto">
                <div className="flex justify-between items-end mb-10">
                    <div>
                        <h2 className="text-4xl font-extrabold text-emerald-900 font-headline tracking-tight mb-2">Verification History</h2>
                        <p className="text-on-surface-variant max-w-xl">Comprehensive ledger of all completed verification tasks. Track system precision and review speeds.</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="flex items-center gap-2 px-5 py-2.5 bg-surface-container-lowest border border-outline-variant/30 text-emerald-900 font-bold rounded-xl hover:bg-emerald-50 transition-all shadow-sm">
                            <span className="material-symbols-outlined">file_download</span> Export
                        </button>
                    </div>
                </div>

                {/* Statistics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                    {[
                        { label: 'Total Audits', value: records.length, color: 'text-emerald-900' },
                        { label: 'Approved', value: records.filter(r => (r.status || '').toLowerCase() === 'verified').length, color: 'text-emerald-600' },
                        { label: 'Rejected', value: records.filter(r => (r.status || '').toLowerCase() === 'rejected').length, color: 'text-error' },
                        { label: 'Avg Speed', value: '2m 12s', color: 'text-on-surface' },
                    ].map((stat, i) => (
                        <div key={i} className="bg-surface-container-lowest p-6 rounded-[2rem] shadow-sm border border-outline-variant/10">
                            <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest mb-1 opacity-60">{stat.label}</p>
                            <h3 className={`text-3xl font-black ${stat.color}`}>{stat.value}</h3>
                        </div>
                    ))}
                </div>

                {/* History Table */}
                <div className="bg-white rounded-[2.5rem] shadow-sm border border-outline-variant/10 overflow-hidden">
                    <div className="overflow-x-auto text-on-surface">
                        <table className="w-full text-left">
                            <thead className="bg-surface-container-low/30 italic">
                                <tr>
                                    <th className="px-6 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-emerald-900/60">Date Reviewed</th>
                                    <th className="px-6 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-emerald-900/60">Worker</th>
                                    <th className="px-6 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-emerald-900/60">Result</th>
                                    <th className="px-6 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-emerald-900/60 text-center">Verif. Time</th>
                                    <th className="px-6 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-emerald-900/60">Notes</th>
                                    <th className="px-6 py-6 text-right"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-outline-variant/10 font-medium">
                                {records.map((r, i) => (
                                    <tr key={i} className="hover:bg-surface-container-low/30 transition-colors group italic">
                                        <td className="px-6 py-6 font-bold not-italic">{r.date}</td>
                                        <td className="px-6 py-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-900 flex items-center justify-center font-black text-xs not-italic border border-emerald-200">
                                                    {getName(r.workerId).split(' ').map((n:any) => n[0]).join('')}
                                                </div>
                                                <div className="not-italic">
                                                    <p className="font-black text-sm leading-none">{getName(r.workerId)}</p>
                                                    <p className="text-[10px] text-on-surface-variant font-bold mt-1">ID: #FG-{r.id}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-6 text-sm">
                                            <span className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border not-italic ${(r.status || '').toLowerCase() === 'verified' ? 'bg-emerald-100 text-emerald-900' : 'bg-error-container text-on-error-container'}`}>
                                                {(r.status || '').toLowerCase() === 'verified' ? 'Approved' : 'Rejected'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-6 text-center font-black text-sm not-italic">0:45 min</td>
                                        <td className="px-6 py-6 max-w-xs">
                                            <p className="text-xs text-on-surface-variant leading-relaxed line-clamp-2 italic">Official platform ledger verified.</p>
                                        </td>
                                        <td className="px-6 py-6 text-right">
                                            <button className="w-10 h-10 rounded-xl hover:bg-emerald-50 text-emerald-900 flex items-center justify-center transition-all">
                                                <span className="material-symbols-outlined text-[18px]">open_in_new</span>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default VerifierHistory;