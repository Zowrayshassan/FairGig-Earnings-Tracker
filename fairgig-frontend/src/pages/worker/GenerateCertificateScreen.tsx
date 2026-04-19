import WorkerSidebar from '../../components/WorkerSidebar';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiRequest } from '../../services/api';

const GenerateCertificateScreen = () => {
  const [earnings, setEarnings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));

    const fetchData = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
        const data = await apiRequest('earnings', `?workerId=${storedUser.id}`);
        setEarnings(data.filter((e: any) => (e.status || '').toLowerCase() === 'verified'));
      } catch (err) {
          console.error(err);
      } finally {
          setLoading(false);
      }
    };
    fetchData();
  }, []);

  const totalVerified = earnings.reduce((acc, curr) => acc + curr.amount, 0);
  const platforms = Array.from(new Set(earnings.map(e => e.platform))).join(', ');
  const avgHourly = earnings.length > 0 ? Math.round(totalVerified / earnings.reduce((a,b) => a + b.hoursWorked, 0)) : 0;

  const handleDownload = async () => {
      try {
          const body = {
              workerName: user?.name || 'Ahmed Khan',
              workerId: user?.id || 'W-001',
              totalEarnings: totalVerified,
              period: 'Last 90 Days',
              platforms: platforms || 'Standard Platforms'
          };
          
          const response = await fetch('http://127.0.0.1:5003/api/render/certificate', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(body)
          });
          
          const html = await response.text();
          const win = window.open('', '_blank');
          if (win) {
              win.document.write(html);
              win.document.close();
          }
      } catch (err) {
          alert('Failed to generate certificate');
      }
  };
  return (
    <div className="bg-[#f6faf7] text-on-surface font-body min-h-screen">
      {/* Sidebar Navigation - Standardized */}
      <WorkerSidebar />

      {/* Top App Bar - Standardized with Back Button */}
      <header className="sticky top-0 w-full z-50 bg-[#f6faf7]/80 backdrop-blur-xl border-b border-outline-variant/10">
        <div className="flex justify-between items-center px-6 py-4 mx-auto w-full max-w-full">
          <div className="flex items-center gap-4">
            <Link to="/worker" className="flex items-center gap-2 text-primary hover:bg-surface-container-low px-4 py-2 rounded-xl transition-all font-bold">
              <span className="material-symbols-outlined text-lg">arrow_back</span>
              Back
            </Link>
            <div className="h-6 w-px bg-outline-variant/30 mx-2"></div>
            <Link to="/worker" className="text-2xl font-extrabold text-primary font-headline tracking-tighter">FairGig</Link>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex bg-surface-container-low rounded-full px-4 py-2 items-center gap-2">
              <span className="material-symbols-outlined text-sm">search</span>
              <input className="bg-transparent border-none focus:ring-0 text-sm w-48 p-0" placeholder="Search certifications..." type="text" />
            </div>
            <button className="material-symbols-outlined p-2 rounded-full hover:bg-emerald-50 text-primary">notifications</button>
            <button className="material-symbols-outlined p-2 rounded-full hover:bg-emerald-50 text-primary">settings</button>
            <div className="w-8 h-8 rounded-full bg-surface-container overflow-hidden border border-outline-variant/30">
              <img alt="Profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQ48dNQTg5eFTEzdkw_55v9ZCeXyjHAqYwHXIUln8WC-20vvyni9NB9hJlpKoUNf1HE-CNSw8gxVtbX3xN4KDZ4SIxz3Kc7cJLfbtRdsRZU_4qMQstw1jGOfy_6N7wsSpsxBxDbz-RXFiXsZiLg-R3m7hsTksQiX0jNfo_4szR6nvT2DekJXli6AJ8osP6wT2InXlM7g4zsb_ExMzpJnhlOVzmmoLemR5-u_crQ2Dm41T2RkU58dRfCsGk87VIpUOBAEl7N3ZFo-TX" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="lg:ml-72 min-h-screen pt-8 pb-32 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Hero Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl font-black font-headline tracking-tighter text-primary">Certification</h1>
              <p className="text-on-surface-variant max-w-lg text-lg leading-relaxed font-medium">Generate a tamper-proof earnings certificate verified by the FairGig ethical ledger protocol.</p>
            </div>
            <div className="flex items-center gap-3 bg-primary-fixed text-on-primary-fixed-variant px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest border border-primary/10 shadow-sm">
              <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
              Verified Profile
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Control Panel */}
            <div className="lg:col-span-5 space-y-8">
              <div className="bg-surface-container-lowest p-8 rounded-[2.5rem] shadow-sm border border-outline-variant/5">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-3 bg-secondary-container rounded-2xl text-on-secondary-container">
                    <span className="material-symbols-outlined">calendar_today</span>
                  </div>
                  <h3 className="font-bold text-lg text-on-surface">Report Parameters</h3>
                </div>
                
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant opacity-60">Certification Type</label>
                    <select className="w-full bg-surface-container-low border-none rounded-2xl py-4 px-4 text-sm font-bold focus:ring-2 focus:ring-primary/20 cursor-pointer">
                      <option>Full Earnings Report</option>
                      <option>Employment Verification</option>
                      <option>Tax Compliance Statement</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant opacity-60">Start Date</label>
                      <input type="date" className="w-full bg-surface-container-low border-none rounded-2xl py-4 px-4 text-sm font-bold focus:ring-2 focus:ring-primary/20" defaultValue="2023-10-01" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant opacity-60">End Date</label>
                      <input type="date" className="w-full bg-surface-container-low border-none rounded-2xl py-4 px-4 text-sm font-bold focus:ring-2 focus:ring-primary/20" defaultValue="2023-12-31" />
                    </div>
                  </div>

                  <button className="w-full bg-primary-container text-on-primary-container py-5 rounded-[2rem] font-bold shadow-lg shadow-primary-container/10 border border-primary/10 mt-8 hover:brightness-110 active:scale-95 transition-all text-sm tracking-tight">
                    Update Preview
                  </button>
                </div>
              </div>

              {/* Security Badge */}
              <div className="bg-primary p-8 rounded-[2.5rem] text-on-primary relative overflow-hidden shadow-xl shadow-primary/10">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-16 -mt-16"></div>
                <div className="relative z-10 flex items-start gap-4">
                    <span className="material-symbols-outlined text-4xl mt-1">security</span>
                    <div>
                        <h4 className="font-bold text-lg mb-2">Protocol Verified</h4>
                        <p className="text-xs opacity-80 leading-relaxed font-medium">This document is hashed on the FairGig public ledger. Anyone can verify its authenticity by scanning the QR code.</p>
                    </div>
                </div>
              </div>
            </div>

            {/* Document Preview */}
            <div className="lg:col-span-7 sticky top-28">
              <div className="bg-slate-200 dark:bg-slate-800 p-8 rounded-[3rem] shadow-inner flex justify-center">
                <div className="bg-white w-full max-w-sm aspect-[1/1.414] shadow-2xl rounded-2xl p-10 flex flex-col relative overflow-hidden text-slate-800 pointer-events-none origin-top transition-transform hover:scale-[1.02]">
                    <div className="flex justify-between items-start mb-8">
                         <div>
                            <h2 className="text-xl font-black text-primary font-headline">FAIRGIG LEDGER</h2>
                            <p className="text-[8px] uppercase tracking-[0.2em] font-bold opacity-60">Protocol Version 4.2.1-Secure</p>
                         </div>
                         <div className="text-right">
                             <p className="text-[8px] font-black uppercase">Certificate ID: FG-2023-88219</p>
                             <p className="text-[8px] font-bold opacity-50">Issued: Dec 31, 2023</p>
                         </div>
                    </div>

                    <div className="space-y-6 flex-1">
                        <section>
                            <h3 className="text-2xl font-black font-headline tracking-tighter text-primary mb-2">Earnings Certification</h3>
                            <p className="text-[9px] font-medium opacity-60">This document certifies the professional activity and earnings for:</p>
                        </section>

                        <section className="bg-slate-50 p-4 rounded-xl border border-slate-100 mb-6 font-sans">
                            <p className="text-sm font-black mb-1 not-italic">{user?.name || 'Ahmed Khan'}</p>
                            <p className="text-[9px] font-bold opacity-50 not-italic">Verified Logistic Specialist • Member since June 2022</p>
                        </section>

                        <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                            {[
                                { label: 'Period Covered', value: 'Oct \'23 - Dec \'23' },
                                { label: 'Total Verified Earnings', value: `PKR ${totalVerified.toLocaleString()}` },
                                { label: 'Platform Performance', value: 'Level 12 (Gold)' },
                                { label: 'Grievance Factor', value: '0.0% (Clean)' },
                                { label: 'Platform Breakdown', value: platforms || 'None' },
                                { label: 'Effective Hourly', value: `PKR ${avgHourly} / hr` },
                            ].map((item, idx) => (
                                <div key={idx} className="space-y-1">
                                    <label className="text-[7px] font-bold uppercase tracking-widest opacity-40">{item.label}</label>
                                    <p className="text-[10px] font-black not-italic">{item.value}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="pt-8 border-t border-slate-100 flex justify-between items-end mt-12">
                         <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center border border-slate-200">
                             <div className="w-10 h-10 border-2 border-slate-300 rounded border-dashed opacity-50"></div>
                         </div>
                         <div className="text-right">
                             <p className="text-[7px] font-black">LEGAL TAMPER-EVIDENT DOCUMENT</p>
                             <p className="text-[6px] font-bold opacity-40 max-w-[120px] ml-auto">FairGig Certification is legally recognized as valid proof of income for rental agreements and local banking in participating regions.</p>
                         </div>
                    </div>
                </div>
                
                {/* Floating Action Buttons over Preview */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-3 pointer-events-auto">
                    <button className="bg-white text-primary w-12 h-12 rounded-full shadow-xl flex items-center justify-center hover:scale-110 active:scale-90 transition-all">
                        <span className="material-symbols-outlined">zoom_in</span>
                    </button>
                    <button 
                        onClick={handleDownload}
                        className="bg-primary text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-2 font-bold text-sm hover:brightness-110 active:scale-95 transition-all"
                    >
                        <span className="material-symbols-outlined text-lg">download</span>
                        Download PDF
                    </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Nav - Standardized */}
      <nav className="fixed bottom-0 w-full rounded-t-[2.5rem] lg:hidden z-50 bg-white shadow-2xl pt-3 pb-8 px-8 flex justify-between border-t border-outline-variant/10">
          <Link to="/worker" className="flex flex-col items-center gap-1 text-on-surface-variant/50">
            <span className="material-symbols-outlined">home</span>
            <span className="text-[10px] font-bold uppercase tracking-wider">Home</span>
          </Link>
          <Link to="/log-earnings" className="flex flex-col items-center gap-1 text-on-surface-variant/50">
            <span className="material-symbols-outlined">receipt_long</span>
            <span className="text-[10px] font-bold uppercase tracking-wider">Ledger</span>
          </Link>
          <Link to="/my-grievances-list" className="flex flex-col items-center gap-1 text-on-surface-variant/50">
            <span className="material-symbols-outlined">diversity_3</span>
            <span className="text-[10px] font-bold uppercase tracking-wider">Impact</span>
          </Link>
          <Link to="/worker-profile" className="flex flex-col items-center gap-1 text-on-surface-variant/50">
            <span className="material-symbols-outlined">person</span>
            <span className="text-[10px] font-bold uppercase tracking-wider">Profile</span>
          </Link>
      </nav>
    </div>
  );
};

export default GenerateCertificateScreen;
