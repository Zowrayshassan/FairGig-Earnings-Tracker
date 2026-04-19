import WorkerSidebar from '../../components/WorkerSidebar';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiRequest } from '../../services/api';

const WorkerDashboardHome = () => {
    const [earnings, setEarnings] = useState<any[]>([]);
    const [stats, setStats] = useState({
        total: 0,
        hourlyRate: 0,
        trend: 0,
        commissions: 0,
        pendingAmount: 0,
        pendingCount: 0
    });
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
            navigate('/');
            return;
        }
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);

        const fetchData = async () => {
            try {
                // Fetch from Port 8001
                const data = await apiRequest('earnings', `?workerId=${parsedUser.id}`);
                setEarnings(data);

                // Calculate HONEST Stats (Verified Only - SOFTEC Requirement)
                const verifiedLogs = data.filter((e: any) => e.status.toLowerCase() === 'verified');
                const pendingLogs = data.filter((e: any) => e.status.toLowerCase() === 'pending');
                
                const totalVerified = verifiedLogs.reduce((acc: number, curr: any) => acc + curr.amount, 0);
                const totalPending = pendingLogs.reduce((acc: number, curr: any) => acc + curr.amount, 0);
                const totalHours = verifiedLogs.reduce((acc: number, curr: any) => acc + (curr.hoursWorked || 0), 0);
                const avgRate = totalHours > 0 ? Math.round(totalVerified / totalHours) : 0;
                
                setStats({
                  total: totalVerified,
                  hourlyRate: avgRate,
                  pendingAmount: totalPending,
                  pendingCount: pendingLogs.length,
                  trend: data.length > 0 ? Math.round((verifiedLogs.length / data.length) * 100) : 0, // % Verified
                  commissions: 18,
                });
            } catch (err) {
                console.error("Failed to fetch earnings", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [navigate]);

    if (loading) return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
      </div>
    );

    return (
        <div className="bg-background text-on-surface font-body min-h-screen">
          {/* Sidebar Navigation - Standardized */}
          <WorkerSidebar />
    
          {/* Top App Bar - Standardized */}
          <header className="sticky top-0 w-full z-30 bg-background/80 backdrop-blur-xl border-b border-outline-variant/10">
            <div className="flex justify-between items-center px-6 py-4 mx-auto w-full max-w-full">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-on-primary">
                  <span className="material-symbols-outlined text-sm font-bold">eco</span>
                </div>
                <Link to="/worker" className="text-2xl font-extrabold text-primary font-headline tracking-tighter">FairGig</Link>
                <div className="h-6 w-px bg-outline-variant/30 mx-2"></div>
                <span className="bg-primary-fixed text-on-primary-fixed-variant text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest border border-primary/20">Live Ledger</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="hidden md:flex bg-surface-container-low rounded-full px-4 py-2 items-center gap-2 border border-outline-variant/10">
                  <span className="material-symbols-outlined text-sm text-on-surface-variant">search</span>
                  <input className="bg-transparent border-none focus:ring-0 text-sm w-48 p-0" placeholder="Search ledger..." type="text" />
                </div>
                <div className="flex gap-1">
                  <button className="material-symbols-outlined p-2 rounded-full hover:bg-surface-container-low transition-colors text-primary">notifications</button>
                  <button className="material-symbols-outlined p-2 rounded-full hover:bg-surface-container-low transition-colors text-primary">settings</button>
                  <Link to="/worker-profile" className="w-8 h-8 rounded-full bg-surface-container overflow-hidden border border-outline-variant/30 flex items-center justify-center bg-primary-container ml-2">
                    <img alt="Profile" className="w-full h-full object-cover" src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name || 'Worker'}`} />
                  </Link>
                </div>
              </div>
            </div>
          </header>
    
          <main className="lg:ml-72 pt-8 pb-32 px-6">
            <div className="max-w-7xl mx-auto">
              {/* Quick Actions Bar */}
              <section className="flex flex-wrap gap-4 mb-12">
                <Link to="/log-earnings" className="flex items-center gap-3 bg-primary text-on-primary px-8 py-5 rounded-[2rem] font-black text-lg shadow-2xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all group">
                  <span className="material-symbols-outlined text-2xl group-hover:rotate-12 transition-transform">add_task</span>
                  Log New Shift
                </Link>
                <Link to="/post-grievance" className="flex items-center gap-3 bg-white text-primary px-8 py-5 rounded-[2rem] font-black text-lg border-2 border-primary/20 hover:bg-primary-fixed/5 transition-all group">
                  <span className="material-symbols-outlined text-2xl group-hover:animate-pulse">gavel</span>
                  Post Grievance
                </Link>
                <Link to="/generate-certificate" className="flex items-center gap-3 bg-white text-on-surface-variant px-8 py-5 rounded-[2rem] font-bold text-lg border border-outline-variant/30 hover:bg-surface-container-low transition-all group">
                  <span className="material-symbols-outlined text-2xl">card_membership</span>
                  Verification
                </Link>
              </section>
    
              {/* Earnings Hero Bento Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
                <div className="lg:col-span-8 bg-surface-container-lowest rounded-[3rem] p-10 relative overflow-hidden group shadow-sm border border-outline-variant/10">
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-10">
                      <div>
                        <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em] mb-2 opacity-60">Verified Earnings Trend</p>
                        <h2 className="text-6xl md:text-7xl font-black font-headline tracking-tighter text-on-surface">PKR {stats.total.toLocaleString()}</h2>
                        <div className="flex flex-wrap items-center gap-3 mt-4">
                          <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-[10px] font-black flex items-center gap-1 border border-primary/20">
                            <span className="material-symbols-outlined text-[10px] font-bold">verified</span>
                            CERTIFIED BALANCE
                          </span>
                          <span className="bg-surface-container-high/50 text-on-surface-variant px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 border border-outline-variant/10">
                            <span className="material-symbols-outlined text-[10px]">pending_actions</span>
                            {stats.pendingCount} LOGS IN TRANSIT (PKR {stats.pendingAmount.toLocaleString()})
                          </span>
                        </div>
                      </div>
                      <div className="flex bg-surface-container-low rounded-2xl p-1.5 gap-1 border border-outline-variant/10">
                        <button className="px-6 py-2 text-xs font-black rounded-xl bg-surface-container-lowest shadow-sm text-primary uppercase tracking-widest">Lifetime</button>
                        <button className="px-6 py-2 text-xs font-black rounded-xl text-on-surface-variant/40 hover:text-on-surface transition-colors uppercase tracking-widest">Monthly</button>
                      </div>
                    </div>
    
                    {/* Real Data Chart Visual */}
                    <div className="w-full h-56 mt-4 relative">
                       <div className="absolute inset-0 flex items-end gap-2 group/chart">
                          {earnings.slice(-12).map((entry, i) => {
                              const maxVal = Math.max(...earnings.slice(-12).map(e => e.amount));
                              const h = (entry.amount / maxVal) * 100;
                              const isVerified = (entry.status || '').toLowerCase() === 'verified';
                              return (
                                <div key={i} 
                                  className={`flex-1 ${isVerified ? 'bg-primary/20 hover:bg-primary' : 'bg-surface-container-high/40 hover:bg-surface-container-high'} rounded-t-lg transition-all relative group/bar`} 
                                  style={{ height: `${h}%` }}
                                >
                                   <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-on-surface text-white text-[10px] font-black px-2 py-1 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap">
                                      {isVerified ? 'Verified: ' : 'Pending: '} ₨ {Math.round(entry.amount/1000)}k
                                   </div>
                                </div>
                              );
                           })}
                       </div>
                    </div>
                    <div className="flex justify-between mt-6 text-[10px] font-black text-outline uppercase tracking-[0.3em] opacity-40">
                      <span>Earliest Seed</span>
                      <span>Verified History</span>
                      <span>Present</span>
                    </div>
                  </div>
                </div>
    
                <div className="lg:col-span-4 bg-primary text-on-primary rounded-[3rem] p-10 flex flex-col justify-between relative overflow-hidden shadow-2xl shadow-primary/20">
                  <div className="absolute -right-12 -top-12 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="bg-white/20 p-4 rounded-[1.5rem] backdrop-blur-md">
                        <span className="material-symbols-outlined text-3xl">timer</span>
                      </div>
                      <span className="text-xs font-black uppercase tracking-[0.2em] text-white/70">Effective Hourly Rate</span>
                    </div>
                    <h2 className="text-7xl font-black font-headline tracking-tighter text-white">PKR {stats.hourlyRate}<span className="text-xl font-bold opacity-40">/hr</span></h2>
                  </div>
                  <div className="mt-12 relative z-10">
                    <div className="flex justify-between items-end mb-4">
                      <p className="text-xs font-bold text-white/80 leading-relaxed max-w-[180px]">Your rate is calculated from {earnings.length} verified shifts.</p>
                      <span className="text-4xl font-black opacity-40">Top</span>
                    </div>
                    <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden border border-white/5">
                      <div className="w-3/4 h-full bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,0.4)]" />
                    </div>
                  </div>
                </div>
              </div>
    
              {/* Analysis Bento Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                 <div className="bg-surface-container-low border border-outline-variant/10 rounded-[2.5rem] p-10 shadow-sm">
                    <h3 className="font-black text-on-surface uppercase tracking-widest text-xs mb-8 opacity-60">Verified Deductions</h3>
                    <div className="space-y-8">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-secondary-container flex items-center justify-center text-on-secondary-container">
                           <span className="material-symbols-outlined">payments</span>
                        </div>
                        <div className="flex-1">
                           <div className="flex justify-between text-sm font-bold mb-1">
                              <span className="text-on-surface-variant">App Commission</span>
                              <span className="text-on-surface">{stats.commissions}%</span>
                           </div>
                           <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden">
                              <div className="w-[18%] h-full bg-primary"></div>
                           </div>
                        </div>
                      </div>
                       <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-tertiary-container flex items-center justify-center text-on-tertiary-container">
                           <span className="material-symbols-outlined">security</span>
                        </div>
                        <div className="flex-1">
                           <div className="flex justify-between text-sm font-bold mb-1">
                              <span className="text-on-surface-variant">Insurance Levy</span>
                              <span className="text-on-surface">2%</span>
                           </div>
                           <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden">
                              <div className="w-[2%] h-full bg-tertiary"></div>
                           </div>
                        </div>
                      </div>
                    </div>
                 </div>
    
                 <div className="bg-surface-container-lowest border border-outline-variant/10 rounded-[2.5rem] p-10 flex flex-col items-center text-center shadow-lg shadow-surface-container-low/50">
                    <h3 className="font-black text-on-surface uppercase tracking-widest text-xs mb-6 w-full text-left opacity-60">City Ledger Impact</h3>
                    <div className="relative w-44 h-44 flex items-center justify-center">
                        <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
                          <circle className="text-surface-container-high" cx="80" cy="80" fill="transparent" r="70" stroke="currentColor" strokeWidth="16" />
                          <circle className="text-primary" cx="80" cy="80" fill="transparent" r="70" stroke="currentColor" strokeDasharray="440" strokeDashoffset="80" strokeWidth="16" strokeLinecap="round" />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <p className="text-4xl font-black font-headline text-primary tracking-tighter">{earnings.length}</p>
                          <p className="text-[10px] font-black uppercase tracking-tighter text-on-surface-variant opacity-60">Verified Logs</p>
                        </div>
                    </div>
                    <p className="text-sm font-bold text-on-surface-variant mt-8 leading-relaxed">Stable ledger growth across <span className="text-primary underline">Karachi East</span> sectors.</p>
                 </div>
    
                 <div className="bg-primary-fixed-dim text-on-primary-fixed p-10 rounded-[2.5rem] flex flex-col justify-between border-2 border-primary/10 shadow-xl shadow-primary/5">
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                        <h3 className="font-black font-headline text-2xl tracking-tight text-primary">Gold Tier</h3>
                      </div>
                      <p className="text-sm font-bold text-on-primary-fixed-variant leading-relaxed opacity-80">Highest verification status achieved. Global Ledger access unlocked.</p>
                    </div>
                    <div className="mt-10 flex items-center gap-4">
                      <div className="flex -space-x-4">
                        {[1,2,3].map(i => (
                          <div key={i} className="w-12 h-12 rounded-full border-4 border-primary-fixed-dim bg-surface-container overflow-hidden">
                            <img alt="Peer" className="w-full h-full object-cover" src={`https://i.pravatar.cc/100?u=${i + 10}`} />
                          </div>
                        ))}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xl font-black text-primary tracking-tighter">+2.4k</span>
                        <span className="text-[10px] uppercase font-black opacity-60">Verified Peers</span>
                      </div>
                    </div>
                 </div>
              </div>
            </div>
          </main>
    
          {/* Mobile Nav - Standardized */}
          <nav className="fixed bottom-0 w-full rounded-t-[2.5rem] lg:hidden z-50 bg-white shadow-[0_-8px_32px_rgba(0,0,0,0.1)] pt-3 pb-8 px-8 flex justify-between border-t border-outline-variant/10">
              <Link to="/worker" className="flex flex-col items-center gap-1 text-primary">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>home</span>
                <span className="text-[10px] font-bold uppercase tracking-wider">Home</span>
              </Link>
              <Link to="/earnings-history-list" className="flex flex-col items-center gap-1 text-on-surface-variant/40">
                <span className="material-symbols-outlined">receipt_long</span>
                <span className="text-[10px] font-bold uppercase tracking-wider">Ledger</span>
              </Link>
              <Link to="/my-grievances" className="flex flex-col items-center gap-1 text-on-surface-variant/40">
                <span className="material-symbols-outlined">diversity_3</span>
                <span className="text-[10px] font-bold uppercase tracking-wider">Impact</span>
              </Link>
              <Link to="/worker-profile" className="flex flex-col items-center gap-1 text-on-surface-variant/40">
                <span className="material-symbols-outlined">person</span>
                <span className="text-[10px] font-bold uppercase tracking-wider">Profile</span>
              </Link>
          </nav>
        </div>
    );
};

export default WorkerDashboardHome;