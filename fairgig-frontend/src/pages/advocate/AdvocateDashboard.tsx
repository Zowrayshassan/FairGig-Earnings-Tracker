import React from 'react';
import { Link } from 'react-router-dom';

const AdvocateDashboard = () => {
  return (
    <div className="bg-background text-on-surface font-body selection:bg-primary/10 min-h-screen">
      {/* SideNavBar (Standardized Sleek Pattern) */}
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
          <Link to="/" className="flex items-center gap-3 px-4 py-3 hover:bg-error-container/10 hover:text-error rounded-xl transition-all text-sm font-medium">
            <span className="material-symbols-outlined">logout</span>
            Sign Out
          </Link>
        </div>
      </aside>

      {/* TopNavBar Header Pattern */}
      <header className="fixed top-0 right-0 w-[calc(100%-18rem)] z-40 bg-white/80 backdrop-blur-xl border-b border-surface-container-low flex justify-between items-center px-10 h-20">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative w-96 group focus-within:ring-2 focus-within:ring-primary/30 rounded-full transition-all">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">search</span>
            <input className="w-full bg-surface-container-low border-none rounded-full py-2 pl-10 pr-4 text-sm outline-none focus:ring-0 placeholder:text-slate-400 font-body" placeholder="Search markets, platform IDs, or grievances..." type="text"/>
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
              <img alt="Advocate Profile" className="h-full w-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCXzYKRvz5688gSjTzH_D_5AR3GgvRuJevb91qBvjb1b_ghjRXEYCq56QkDuFjaFnBfzFwqTTqG4EB59mwXlXaT2FcsK4OvDJTJ0pl3M8c2I4yTC1SF3NN4VSYg-3MgcxvhUxpoquYFWh0Fy9TYStpYcq3vYlZfpjXMYxKuq6RDyNJrvzvQY71FBet9pcNeRq_AQW30x8Xkj--LhkLu4Gu8Jjby_8lfPe4MoSgrmKm7PJL3HGnph-KKCUhsdfSJsfyRy3ZCa7TBpR"/>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="ml-72 pt-24 px-10 pb-12 overflow-x-hidden">
         {/* Title Section */}
         <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-end mb-12">
               <div>
                  <h1 className="text-5xl font-black text-primary font-headline tracking-tightest mb-3">Global Oversight</h1>
                  <p className="text-on-surface-variant max-w-2xl text-lg leading-relaxed">
                     Monitoring fair earnings distribution and algorithm accountability across 24 markets.
                     <span className="text-primary font-bold ml-1">Live ledger status: Healthy.</span>
                  </p>
               </div>
               <div className="flex gap-4">
                  <div className="bg-white p-6 rounded-3xl shadow-sm border border-surface-container-low min-w-[200px]">
                     <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant mb-2">Verified Shift Data</p>
                     <p className="text-3xl font-black text-primary">1.2M <span className="text-sm font-medium text-emerald-500">+4%</span></p>
                  </div>
                  <div className="bg-primary p-6 rounded-3xl shadow-xl shadow-primary/20 min-w-[200px] text-white">
                     <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-2">Total Recovered</p>
                     <p className="text-3xl font-black">$42.8M</p>
                  </div>
               </div>
            </div>

            {/* Grid Layout Bento */}
            <div className="grid grid-cols-12 gap-8">
               {/* Left Column - Trends */}
               <div className="col-span-8 space-y-8">
                  <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-surface-container-low">
                     <div className="flex justify-between items-center mb-8">
                        <div>
                           <h3 className="text-xl font-black text-on-surface font-headline">Commission Rate Variance</h3>
                           <p className="text-sm text-on-surface-variant">Cross-platform analysis for Q4 2023</p>
                        </div>
                        <div className="flex items-center gap-2 bg-surface-container-low p-1 rounded-xl">
                           <button className="px-4 py-1.5 bg-white shadow-sm rounded-lg text-xs font-bold text-primary transition-all">Daily</button>
                           <button className="px-4 py-1.5 rounded-lg text-xs font-bold text-on-surface-variant/60 hover:text-on-surface transition-all">Weekly</button>
                        </div>
                     </div>
                     <div className="h-80 bg-surface-container-low/30 rounded-3xl relative overflow-hidden flex items-end px-8 gap-4">
                        {[40, 65, 45, 90, 55, 75, 50, 85, 60, 95, 40].map((h, i) => (
                           <div key={i} className="flex-1 bg-gradient-to-t from-primary to-primary-container rounded-t-xl transition-all hover:scale-x-110 cursor-pointer group relative" style={{ height: `${h}%` }}>
                              <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-on-surface text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                 {h}%
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>

                  <div className="grid grid-cols-2 gap-8">
                     <Link to="/income-map" className="group bg-surface-container-lowest p-8 rounded-[2.5rem] shadow-sm border border-transparent hover:border-primary/10 transition-all">
                        <div className="w-12 h-12 rounded-2xl bg-secondary-container flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                           <span className="material-symbols-outlined">map</span>
                        </div>
                        <h4 className="text-lg font-black text-on-surface font-headline mb-2">Income Heatmap</h4>
                        <p className="text-sm text-on-surface-variant leading-relaxed">Visualize real-time earnings density vs platform commission spikes in EMEA.</p>
                     </Link>
                     <Link to="/grievances-board" className="group bg-surface-container-lowest p-8 rounded-[2.5rem] shadow-sm border border-transparent hover:border-primary/10 transition-all">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-900 mb-6 group-hover:scale-110 transition-transform">
                           <span className="material-symbols-outlined">rule_folder</span>
                        </div>
                        <h4 className="text-lg font-black text-on-surface font-headline mb-2">Resolution Ledger</h4>
                        <p className="text-sm text-on-surface-variant leading-relaxed">Current audit status of 1,240 systemic grievance claims across 4 major platforms.</p>
                     </Link>
                  </div>
               </div>

               {/* Right Column - Status Feed */}
               <div className="col-span-4 space-y-8">
                  <div className="bg-surface-container-low/50 p-8 rounded-[2.5rem] border border-surface-container-high h-full">
                     <h3 className="text-lg font-black text-on-surface font-headline mb-6">Critical Alerts</h3>
                     <div className="space-y-6">
                        {[
                           { label: "Commission Spike", market: "Lahore, PK", type: "error", desc: "Uber auto-commission rate hit 42% for 2h during peak rain." },
                           { label: "Delayed Payouts", market: "London, UK", type: "warning", desc: "Deliveroo reporting API failure for instant driver pay." },
                           { label: "New Regulation", market: "Global", type: "primary", desc: "Transparency Act 2024 compliance data received from Foodpanda." }
                        ].map((alert, i) => (
                           <div key={i} className="bg-white p-5 rounded-3xl shadow-sm border border-surface-container-low transition-all hover:translate-x-1 cursor-pointer">
                              <div className="flex items-center gap-2 mb-2">
                                 <span className={`w-2 h-2 rounded-full ${alert.type === 'error' ? 'bg-error' : alert.type === 'warning' ? 'bg-secondary' : 'bg-primary'}`}></span>
                                 <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant">{alert.label}</p>
                              </div>
                              <p className="text-sm font-black text-on-surface mb-1">{alert.market}</p>
                              <p className="text-xs text-on-surface-variant leading-relaxed italic">"{alert.desc}"</p>
                           </div>
                        ))}
                     </div>
                     <button className="w-full mt-8 py-4 bg-white rounded-2xl text-[10px] font-black uppercase tracking-widest text-primary border border-primary/10 hover:bg-primary hover:text-white transition-all">
                        View Full Incident Log
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </main>
    </div>
  );
};

export default AdvocateDashboard;
