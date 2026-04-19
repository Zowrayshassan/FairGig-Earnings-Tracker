import WorkerSidebar from '../../components/WorkerSidebar';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiRequest } from '../../services/api';

const WorkerDashboard = () => {
  const [earnings, setEarnings] = useState<any[]>([]);
  const [cityMedian, setCityMedian] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [backendOffline, setBackendOffline] = useState(false);

  const [user] = useState(() => JSON.parse(localStorage.getItem('user') || '{}'));
  const userId = user?.id || '1';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const earningsData = await apiRequest('earnings', `?workerId=${userId}`);
        if (Array.isArray(earningsData)) {
          setEarnings(earningsData);
          if (earningsData.length > 0) {
            const city = earningsData[0].city || 'Karachi';
            try {
              const stats = await apiRequest('earnings', `/stats/city-median?city=${city}`);
              setCityMedian(stats.median || 0);
            } catch { /* city median optional */ }
          }
        }
      } catch (err) {
        console.warn('Earnings backend offline — showing empty state:', err);
        setBackendOffline(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [userId]);

  const totalEarnings = earnings.reduce((sum, e) => sum + (e.amount || 0), 0);
  const totalVerified = earnings.length;
  const avgHourly = totalVerified > 0 ? Math.round(totalEarnings / (totalVerified * 4)) : 0;
  const vsMedian = cityMedian > 0 ? Math.round((totalEarnings / 4 / cityMedian) * 100) : 0;

  const handleGenerateCertificate = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5003/api/render/certificate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          workerName: user.name || 'Worker',
          workerId: user.id || '1',
          totalEarnings,
          period: 'Latest Ledger Cycle',
          platforms: [...new Set(earnings.map((e: any) => e.platform))].join(', ')
        })
      });
      const html = await response.text();
      const win = window.open('', '_blank');
      if (win) {
        win.document.write(html);
        win.document.close();
      }
    } catch (err) {
      alert('Error generating certificate. Ensure Renderer service is running on Port 5003.');
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
    </div>
  );

  return (
    <div className="bg-background text-on-surface font-body min-h-screen">
      {/* Sidebar Navigation */}
      <WorkerSidebar />

      {/* Top App Bar */}
      <header className="sticky top-0 w-full z-30 bg-background/80 backdrop-blur-xl border-b border-outline-variant/10 lg:pl-72">
        <div className="flex justify-between items-center px-6 py-4">
          <div className="flex items-center gap-3">
            <Link to="/worker" className="text-2xl font-extrabold text-primary font-headline tracking-tighter lg:hidden">FairGig</Link>
            <span className="bg-primary/10 text-primary text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest border border-primary/20">Live</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="material-symbols-outlined p-2 rounded-full hover:bg-surface-container-low transition-colors text-primary">notifications</button>
            <Link to="/worker-profile" className="w-8 h-8 rounded-full bg-surface-container overflow-hidden border border-outline-variant/30 flex items-center justify-center bg-primary-container">
              <img alt="Profile" className="w-full h-full object-cover" src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name || 'Worker'}`} />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="lg:ml-72 pt-8 pb-32 px-6">
        <div className="max-w-7xl mx-auto">

          {/* Quick Actions Bar */}
          <section className="flex flex-wrap gap-4 mb-12">
            <Link to="/log-earnings" className="flex items-center gap-3 bg-primary text-on-primary px-8 py-5 rounded-[2rem] font-black text-lg shadow-2xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all group">
              <span className="material-symbols-outlined text-2xl group-hover:rotate-12 transition-transform">add_task</span>
              Log New Shift
            </Link>
            <Link to="/post-grievance" className="flex items-center gap-3 bg-white text-primary px-8 py-5 rounded-[2rem] font-black text-lg border-2 border-primary/20 hover:bg-primary/5 transition-all group">
              <span className="material-symbols-outlined text-2xl group-hover:animate-pulse">gavel</span>
              Post Grievance
            </Link>
            <button onClick={handleGenerateCertificate} className="flex items-center gap-3 bg-white text-on-surface-variant px-8 py-5 rounded-[2rem] font-bold text-lg border border-outline-variant/30 hover:bg-surface-container-low transition-all group">
              <span className="material-symbols-outlined text-2xl">card_membership</span>
              Get Certificate
            </button>
          </section>

          {/* Backend Offline Banner */}
          {backendOffline && (
            <div className="mb-8 p-5 bg-amber-50 border border-amber-200 rounded-2xl flex items-center gap-4">
              <span className="material-symbols-outlined text-amber-500 text-3xl">wifi_off</span>
              <div>
                <p className="font-black text-amber-700">Earnings service offline</p>
                <p className="text-sm text-amber-600 font-medium">Start the backend: <code className="bg-amber-100 px-2 py-0.5 rounded font-mono">cd backend/earnings && python main.py</code></p>
              </div>
            </div>
          )}

          {/* Earnings Hero Bento Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">

            {/* Earnings Chart Card */}
            <div className="lg:col-span-8 bg-surface-container-lowest rounded-[3rem] p-10 relative overflow-hidden shadow-sm border border-outline-variant/10">
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-10">
                  <div>
                    <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em] mb-2 opacity-60">Verified Earnings Trend</p>
                    <h2 className="text-6xl md:text-7xl font-black font-headline tracking-tighter text-on-surface">
                      PKR {totalEarnings.toLocaleString()}
                    </h2>
                    <div className="flex items-center gap-2 mt-4">
                      <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-black flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm font-bold">trending_up</span>
                        {totalVerified} Verified Logs
                      </span>
                      <span className="text-xs font-bold text-on-surface-variant opacity-60 uppercase tracking-widest">Live Sync</span>
                    </div>
                  </div>
                  <div className="flex bg-surface-container-low rounded-2xl p-1.5 border border-outline-variant/10">
                    <button className="px-6 py-2 text-xs font-black rounded-xl bg-surface-container-lowest shadow-sm text-primary uppercase tracking-widest">Real-Time</button>
                  </div>
                </div>

                {/* Chart */}
                <div className="w-full h-56 mt-4 relative">
                  <div className="absolute inset-0 flex items-end gap-2">
                    {earnings.length > 0 ? earnings.slice(-12).map((e: any, i: number) => (
                      <div key={i} className="flex-1 bg-primary/20 rounded-t-lg transition-all hover:bg-primary relative group" style={{ height: `${Math.max(5, Math.min(100, (e.amount / 1000) * 10))}%` }}>
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-on-surface text-white text-[10px] font-black px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          PKR {e.amount}
                        </div>
                      </div>
                    )) : (
                      [40, 60, 45, 90, 65, 80, 55, 100, 70, 85, 95, 75].map((h, i) => (
                        <div key={i} className="flex-1 bg-primary/10 rounded-t-lg" style={{ height: `${h}%` }} />
                      ))
                    )}
                  </div>
                </div>
                <div className="flex justify-between mt-4 text-[10px] font-black text-outline uppercase tracking-[0.3em] opacity-40">
                  <span>{earnings.length > 0 ? 'Your Shifts' : 'Sample Data'}</span>
                  <span>Log shifts to populate</span>
                </div>
              </div>
            </div>

            {/* Hourly Rate Card */}
            <div className="lg:col-span-4 bg-primary text-on-primary rounded-[3rem] p-10 flex flex-col justify-between relative overflow-hidden shadow-2xl shadow-primary/20">
              <div className="absolute -right-12 -top-12 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="bg-white/20 p-4 rounded-[1.5rem] backdrop-blur-md">
                    <span className="material-symbols-outlined text-3xl">timer</span>
                  </div>
                  <span className="text-xs font-black uppercase tracking-[0.2em] text-white/70">Effective Hourly Rate</span>
                </div>
                <h2 className="text-7xl font-black font-headline tracking-tighter text-white">
                  PKR {avgHourly}<span className="text-xl font-bold opacity-40">/hr</span>
                </h2>
              </div>
              <div className="mt-12 relative z-10">
                <div className="flex justify-between items-end mb-4">
                  <p className="text-xs font-bold text-white/80 leading-relaxed max-w-[180px]">
                    Your performance is <span className="font-black text-white underline">{vsMedian > 0 ? `${vsMedian}%` : '—'}</span> of city median.
                  </p>
                  <span className="text-2xl font-black opacity-40">Market</span>
                </div>
                <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden border border-white/5">
                  <div className="h-full bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,0.4)] transition-all" style={{ width: `${Math.min(100, vsMedian || 0)}%` }} />
                </div>
              </div>
            </div>
          </div>

          {/* Additional Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-surface-container-low border border-outline-variant/10 rounded-[2.5rem] p-10 shadow-sm">
              <h3 className="font-black text-on-surface uppercase tracking-widest text-xs mb-8 opacity-60">Platform Fees</h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-secondary-container flex items-center justify-center text-on-secondary-container">
                    <span className="material-symbols-outlined">payments</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between text-sm font-bold mb-1">
                      <span className="text-on-surface-variant">App Commission</span>
                      <span className="text-on-surface">~18%</span>
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
                      <span className="text-on-surface">~2%</span>
                    </div>
                    <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden">
                      <div className="w-[2%] h-full bg-tertiary"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-surface-container-lowest border border-outline-variant/10 rounded-[2.5rem] p-10 flex flex-col items-center text-center shadow-sm">
              <h3 className="font-black text-on-surface uppercase tracking-widest text-xs mb-6 w-full text-left opacity-60">Ledger Activity</h3>
              <div className="relative w-44 h-44 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
                  <circle className="text-surface-container-high" cx="80" cy="80" fill="transparent" r="70" stroke="currentColor" strokeWidth="16" />
                  <circle className="text-primary" cx="80" cy="80" fill="transparent" r="70" stroke="currentColor" strokeDasharray="440" strokeDashoffset={Math.max(0, 440 - (totalVerified * 20))} strokeWidth="16" strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <p className="text-4xl font-black font-headline text-primary tracking-tighter">{totalVerified}</p>
                  <p className="text-[10px] font-black uppercase tracking-tighter text-on-surface-variant opacity-60">Shifts</p>
                </div>
              </div>
              <p className="text-sm font-bold text-on-surface-variant mt-6 leading-relaxed">
                {totalVerified > 0 ? `${totalVerified} shifts logged in your Ethical Ledger.` : 'Log your first shift to get started.'}
              </p>
            </div>

            <div className="bg-primary/5 border-2 border-primary/10 rounded-[2.5rem] p-10 flex flex-col justify-between shadow-sm">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                  <h3 className="font-black font-headline text-2xl tracking-tight text-primary">Verified Worker</h3>
                </div>
                <p className="text-sm font-bold text-on-surface-variant leading-relaxed opacity-80">
                  Your ledger is cryptographically verified. Download your certificate for banks and regulators.
                </p>
              </div>
              <button onClick={handleGenerateCertificate} className="mt-8 w-full py-4 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-all flex items-center justify-center gap-2">
                <span className="material-symbols-outlined">download</span>
                Download Certificate
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Nav */}
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

export default WorkerDashboard;
