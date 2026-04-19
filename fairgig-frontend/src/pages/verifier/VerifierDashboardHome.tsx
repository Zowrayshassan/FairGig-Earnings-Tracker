import { apiRequest } from '../../services/api';

const VerifierDashboardHome = () => {
    const [stats, setStats] = React.useState({ pending: 0, approvedToday: 0, flagged: 0 });
    const [recentLogs, setRecentLogs] = React.useState<any[]>([]);
    const [allLogs, setAllLogs] = React.useState<any[]>([]);
    const [users, setUsers] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState(true);
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');

    React.useEffect(() => {
        const loadDashboard = async () => {
            try {
                const [allLogs, allUsers] = await Promise.all([
                    apiRequest('earnings', ''),
                    apiRequest('auth', '/users')
                ]);

                const pending = allLogs.filter((l: any) => (l.status || '').toLowerCase() === 'pending');
                const approved = allLogs.filter((l: any) => (l.status || '').toLowerCase() === 'verified');
                const rejected = allLogs.filter((l: any) => (l.status || '').toLowerCase() === 'rejected');

                setStats({
                    pending: pending.length,
                    approvedToday: approved.length,
                    flagged: rejected.length
                });

                setAllLogs(allLogs); // Renamed from stats setting to full log storage
                setRecentLogs(pending.slice(0, 5));
                setUsers(allUsers);
            } catch (err) {
                console.error("Dashboard sync failed", err);
            } finally {
                setLoading(false);
            }
        };
        loadDashboard();
    }, []);

    const getName = (id: string) => {
        if (!id) return "Unknown Worker";
        const user = users.find(u => u.id.toString() === id.toString());
        if (user) return user.name;
        // Check session storage for current worker context
        const localUser = JSON.parse(localStorage.getItem('user') || '{}');
        if (localUser.id?.toString() === id.toString()) return localUser.name;
        return `Worker #${id}`;
    };

    if (loading) return <div className="min-h-screen bg-background flex items-center justify-center text-primary font-bold">Syncing Ledger...</div>;

  return (
    <div className="bg-background font-body text-on-surface min-h-screen">
      {/* Standardized Verifier SideNavBar */}
      <aside className="h-screen w-64 fixed left-0 top-0 border-r-0 bg-emerald-950 dark:bg-slate-950 shadow-xl flex flex-col py-6 z-50">
        <div className="px-6 mb-10 text-emerald-100/50">
          <Link to="/" className="flex items-center gap-2 hover:text-white transition-all text-xs font-bold mb-4 uppercase tracking-widest">
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            BACK
          </Link>
          <Link to="/" className="text-2xl font-bold text-white tracking-tightest">FairGig Verifier</Link>
          <p className="text-emerald-500 font-['Plus_Jakarta_Sans'] font-medium text-[10px] tracking-wider mt-1 uppercase opacity-80">Verification Officer</p>
        </div>
        <nav className="flex-1 space-y-1">
          <Link to="/verifier" className="flex items-center gap-3 bg-emerald-900/50 text-emerald-100 rounded-lg px-4 py-3 mx-2 transition-all">
            <span className="material-symbols-outlined">dashboard</span>
            <span className="font-['Plus_Jakarta_Sans'] font-medium text-sm tracking-tight">Dashboard</span>
          </Link>
          <Link to="/pending-reviews" className="flex items-center gap-3 text-emerald-300/70 hover:text-white hover:bg-emerald-800/40 px-4 py-3 mx-2 transition-all duration-150 rounded-lg">
            <span className="material-symbols-outlined">fact_check</span>
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
      <main className="lg:ml-64 pt-24 pb-12 px-4 lg:px-8 min-h-screen">
        {/* Dashboard Header */}
        <div className="mb-10 flex flex-col md:flex-row justify-between md:items-end gap-4">
          <div>
            <h2 className="text-4xl font-extrabold font-headline text-emerald-900 tracking-tight">Verifier Dashboard</h2>
            <p className="text-on-surface-variant mt-1 text-lg">Good morning, {storedUser.name}. You have {stats.pending} pending reviews waiting.</p>
          </div>
          <button className="bg-emerald-900 text-white px-6 py-3 rounded-xl font-headline font-bold flex items-center justify-center gap-2 hover:bg-emerald-950 transition-all shadow-lg active:scale-95">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>add_moderator</span>
            Start New Session
          </button>
        </div>

        {/* Bento Stats Grid */}
        <div className="grid grid-cols-12 gap-6 mb-10">
          <div className="col-span-12 lg:col-span-6 bg-emerald-900 text-white p-8 rounded-3xl relative overflow-hidden flex flex-col justify-between shadow-2xl min-h-[280px]">
            <div className="relative z-10">
              <p className="font-headline font-medium opacity-80 tracking-wide uppercase text-sm">Active Review Queue</p>
              <h3 className="text-7xl font-extrabold font-headline mt-2 tracking-tighter italic">{stats.pending}</h3>
              <p className="mt-4 text-emerald-100 text-lg flex items-center gap-2">
                <span className="material-symbols-outlined">trending_up</span>
                Live Ledger Feed
              </p>
            </div>
            <div className="mt-auto relative z-10 flex gap-4">
              <button className="bg-white text-emerald-900 px-5 py-2.5 rounded-lg font-bold text-sm hover:brightness-105 transition-all">Jump to Queue</button>
              <button className="bg-white/10 backdrop-blur-md text-white px-5 py-2.5 rounded-lg font-bold text-sm hover:bg-white/20 transition-all">View Analytics</button>
            </div>
            <div className="absolute -right-10 -bottom-10 opacity-20 transform rotate-12 pointer-events-none">
              <span className="material-symbols-outlined text-[240px]">fact_check</span>
            </div>
          </div>

          <div className="col-span-12 md:col-span-6 lg:col-span-3 bg-surface-container-lowest p-8 rounded-3xl flex flex-col justify-between transition-all hover:scale-[1.02] border border-transparent hover:border-emerald-500/30 group shadow-sm">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-900 mb-6 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
              </div>
               <p className="text-on-surface-variant font-medium text-sm">Approved to Date</p>
              <h4 className="text-4xl font-extrabold font-headline text-on-surface mt-1">{stats.approvedToday}</h4>
            </div>
            <div className="mt-4 text-emerald-600 font-bold text-xs flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">verified</span>
              Trust Layer Integrity
            </div>
          </div>

          <div className="col-span-12 md:col-span-6 lg:col-span-3 bg-error-container p-8 rounded-3xl flex flex-col justify-between transition-all hover:scale-[1.02] border border-transparent hover:border-error/30 group shadow-sm">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-error/10 flex items-center justify-center text-error mb-6 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>warning</span>
              </div>
               <p className="text-on-error-container font-medium text-sm">Rejected Entries</p>
              <h4 className="text-4xl font-extrabold font-headline text-on-error-container mt-1">{stats.flagged}</h4>
            </div>
            <div className="mt-4 text-error font-bold text-xs flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">emergency</span>
              Critical attention needed
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 xl:col-span-8 bg-surface-container-lowest rounded-3xl p-8 shadow-sm border border-outline-variant/10">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h5 className="text-2xl font-bold font-headline text-on-surface">Pending Queue Preview</h5>
                <p className="text-on-surface-variant text-sm">Prioritizing urgent verification tasks</p>
              </div>
              <Link to="/pending-reviews" className="text-emerald-900 font-bold text-sm hover:underline flex items-center gap-1">
                View all {stats.pending}
                <span className="material-symbols-outlined text-sm">chevron_right</span>
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left min-w-[600px]">
                <thead>
                  <tr className="text-on-surface-variant/60 text-xs font-bold uppercase tracking-widest border-b border-surface-container">
                    <th className="pb-4 pl-2">Worker Name</th>
                    <th className="pb-4">Platform</th>
                    <th className="pb-4">Verification Type</th>
                    <th className="pb-4">Urgency</th>
                    <th className="pb-4 text-right pr-2">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-container">
                   {recentLogs.map((row) => (
                    <tr key={row.id} className="hover:bg-surface-container-low transition-colors group">
                      <td className="py-4 pl-2">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-surface-variant flex items-center justify-center text-on-surface-variant font-bold text-xs">
                            {getName(row.workerId).split(' ').map((n:any) => n[0]).join('')}
                          </div>
                          <div>
                            <p className="font-bold text-sm">{getName(row.workerId)}</p>
                            <p className="text-[10px] text-on-surface-variant">ID: #FG-{row.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4">
                        <span className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-lg text-xs font-medium">{row.platform}</span>
                      </td>
                      <td className="py-4">
                        <p className="text-sm">Income Proof</p>
                      </td>
                      <td className="py-4">
                        <span className={`bg-emerald-100 text-emerald-900 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter`}>Urgent</span>
                      </td>
                      <td className="py-4 text-right pr-2">
                        <Link to="/pending-reviews" className="inline-block text-emerald-900 hover:bg-emerald-900 hover:text-white px-4 py-2 rounded-lg font-bold text-xs transition-colors border border-emerald-900/20">Review Now</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="col-span-12 xl:col-span-4 flex flex-col gap-8">
            <div className="bg-surface-container-lowest rounded-3xl p-8 flex-1 shadow-sm border border-outline-variant/10">
              <h5 className="text-2xl font-bold font-headline text-on-surface mb-6">Recent Activity</h5>
              <div className="space-y-6 relative">
                <div className="absolute left-2.5 top-2 bottom-2 w-0.5 bg-surface-container-high"></div>
                {allLogs.filter(r => (r.status || '').toLowerCase() !== 'pending').slice(0, 3).map((r, i) => (
                    <div key={i} className="relative pl-10">
                    <div className={`absolute left-0 top-1 w-5 h-5 rounded-full flex items-center justify-center border-4 border-surface-container-lowest ${(r.status || '').toLowerCase() === 'verified' ? 'bg-emerald-600' : 'bg-error'}`}>
                        <span className="material-symbols-outlined text-[10px] text-white">{(r.status || '').toLowerCase() === 'verified' ? 'done' : 'flag'}</span>
                    </div>
                    <p className="text-sm font-bold text-on-surface">{(r.status || '').toLowerCase() === 'verified' ? 'Approved' : 'Rejected'} Entry #FG-{r.id}</p>
                    <p className="text-xs text-on-surface-variant mt-1">Platform: {r.platform} • {r.date}</p>
                    </div>
                ))}
                {allLogs.filter(r => (r.status || '').toLowerCase() !== 'pending').length === 0 && (
                    <p className="text-sm italic text-on-surface-variant pl-10">No recent audits performed.</p>
                )}
              </div>
              <button className="w-full mt-8 py-3 rounded-xl border border-outline-variant text-on-surface-variant font-bold text-sm hover:bg-surface-container transition-all">Download Log</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default VerifierDashboardHome;
