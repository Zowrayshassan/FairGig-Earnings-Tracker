import React from 'react';
import { Link } from 'react-router-dom';

const GrievanceDetail = () => {
  return (
    <div className="bg-background text-on-surface font-body selection:bg-primary/10 min-h-screen">
      {/* Standardized Advocate SideNavBar */}
      <aside className="fixed left-0 top-0 bottom-0 w-72 h-screen z-50 bg-white shadow-[4px_0px_20px_rgba(0,0,0,0.02)] flex flex-col h-full p-6 border-r border-surface-container-low">
        <div className="px-4 mb-10 text-primary/50">
            <Link to="/grievances-board" className="flex items-center gap-2 hover:text-primary transition-all text-xs font-bold mb-4 uppercase tracking-widest">
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
      <main className="ml-72 pt-24 px-10 pb-12 max-w-7xl mx-auto">
        <div className="p-10">
            {/* Breadcrumbs & Header */}
            <div className="mb-12 flex justify-between items-end">
               <div>
                  <div className="flex items-center gap-3 text-on-surface-variant/40 text-[10px] font-black uppercase tracking-widest mb-4">
                     <Link to="/grievances-board" className="hover:text-primary transition-colors">Grievances</Link>
                     <span className="material-symbols-outlined text-xs">chevron_right</span>
                     <span className="text-primary opacity-100">GR-8842-EMEA</span>
                  </div>
                  <h2 className="text-5xl font-headline font-black tracking-tightest text-on-surface leading-tight">Unpaid Waiting Time & Algorithm Bias</h2>
               </div>
               <div className="flex items-center gap-3">
                  <span className="bg-amber-100 text-amber-950 px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-sm">
                     <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span> Under Investigation
                  </span>
               </div>
            </div>

            <div className="grid grid-cols-12 gap-12">
               {/* Content Left */}
               <div className="col-span-8 space-y-12">
                  {/* Case Statement */}
                  <div className="bg-white rounded-[3rem] p-10 border border-surface-container-low shadow-sm relative overflow-hidden">
                     <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
                        <span className="material-symbols-outlined text-[10rem]">format_quote</span>
                     </div>
                     <div className="flex items-center justify-between mb-8 pb-8 border-b border-slate-50">
                        <div className="flex items-center gap-6">
                           <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-primary/10">
                              <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLkRidE0nDIxxTsREHshTr3QhhjRYEpOc5F_CRzAa9DFDipg9Xyo6Q3eIlq1OEMUGzIOF62DLBaO-KTE1doWXWPSxO3JD2z36_Hk2AMCpYiZNyktmkSQBjqufE-wkTuqNjoEuw9ffMK8hs0noakYu-UzhsnDy0RWatq2OFVVWmmpG3nB2XTU8SpTfVyVOLL34gzCNMAcbg9xNPFsqNqDOoLA5EntUpqCzcZxUvzZHf7M_YCMcgYwvwg4Epul5JCyMoF9WMkMiQaTQf"/>
                           </div>
                           <div>
                              <h3 className="text-xl font-black text-on-surface font-headline leading-tight">Amara Okafor</h3>
                              <p className="text-xs text-on-surface-variant font-bold flex items-center gap-2 mt-1">
                                 <span className="material-symbols-outlined text-emerald-500 text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                                 Verified Partner • ID: 9942-X
                              </p>
                           </div>
                        </div>
                        <div className="text-right">
                           <p className="text-[10px] text-on-surface-variant/40 font-black uppercase tracking-widest mb-1">Filed On</p>
                           <p className="font-bold text-sm">Oct 24, 2023</p>
                        </div>
                     </div>
                     <p className="text-xl font-medium text-on-surface leading-relaxed text-slate-700 italic">
                        "I was assigned to the Central London hub at 08:00 AM. Despite being active and 'at the pin' for 145 minutes, the algorithm recorded zero active hours. My earnings for this block were withheld. This is the third time this week the geo-fencing has failed to recognize my presence at the designated pickup point."
                     </p>
                     
                     <div className="mt-10 p-6 bg-slate-50 rounded-3xl flex items-center justify-between border border-slate-100">
                        <div className="flex items-center gap-3">
                           <span className="material-symbols-outlined text-primary">translate</span>
                           <p className="text-sm font-bold text-slate-600">Original statement in Igbo available</p>
                        </div>
                        <button className="text-primary font-black text-[10px] uppercase tracking-widest hover:underline">View Source</button>
                     </div>
                  </div>

                  {/* Evidence Gallery */}
                  <div className="space-y-6">
                     <h4 className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest px-4">Evidence & System Logs</h4>
                     <div className="grid grid-cols-3 gap-6 h-80">
                        <div className="col-span-2 bg-white rounded-[2.5rem] overflow-hidden border border-surface-container-low shadow-sm relative group cursor-zoom-in">
                           <img className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAMiHA8VleqGz964HZLK7zGLI80W60xINt9LUQxoVVF0XLC_v_3IWf59G3xJl1Ibc3kTNbAT2RPnWLHU7zXNuZL0XecHuBg-oZhkNgFMLITqo09DSJ5pee7UoIUFKIa4Yp926UECJZPKxHHa18z6ywPyaQECZwADMVUFDhnHsNWbMh7O6gwUUjwluYKqsV-hUKlkWxdo5nBuQR_UZB_DJ6jiH_D2_uB2s3jIOTzaoy2WN4iuUc4B2TmpVXqnSPKQxDUJTF9PpN9U-OP"/>
                           <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                           <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg">GPS Telemetry Log</div>
                        </div>
                        <div className="space-y-6">
                           <div className="h-1/2 bg-white rounded-[2.5rem] overflow-hidden border border-surface-container-low shadow-sm group relative cursor-zoom-in">
                              <img className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCw04KxHUzUleLASyX81vaapHLNzHISrTxNPfG0caduwPrYV7lf6hKcLUcAXgPbhw8Gd9P4ZkOZnHEfRQ4nCrxVS4dhEvHiJUXUwdNAm8G1-2I8MzsDOTUeagE-w-NIJqNzg2oAeQvWjO3marEtGbyIz7rhudk0lqNdtem484xUQ0RPEexaceruC9FY8nPsnkyjC4fNnxXyCIwTgCgTSz4mXkrjE0cB5pM_MIhnefaBiFhPudnTG0s2f-gF8eu4Jsu1eTp-bvm6OFQU"/>
                           </div>
                           <div className="h-1/2 bg-white rounded-[2.5rem] overflow-hidden border border-surface-container-low shadow-sm group relative cursor-zoom-in">
                              <img className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuANnOSiPH9ePZAzD_ExRncGpX1gRdChtM8ZhVEMpe1ZTM6x5nunx3XNUmRt1PG7AQKxkjeQYP6QfZh350ENC1W6LqJi-tfgsvEcx6E7LC6_5eZ8CNgtqYVyxWKpGD5X7jNDyVtY68MZnt9IDcjytXegkbwA1HBZk5YlAVnH_XlqjvQlOOjjMK7nUlmbfS7HF2crREiTXAYtsk8-UuNkUfQyAPxwDACgM8iKVtkPZaAhaOUNi-3fSi4JxYnS-OenO9YmIEkDXvH9hekm"/>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Right Column */}
               <div className="col-span-4 space-y-8">
                  <div className="bg-primary p-8 rounded-[3rem] shadow-2xl shadow-primary/20 text-white">
                     <h4 className="text-xs font-black uppercase tracking-widest opacity-60 mb-6 text-center">Grievance Actions</h4>
                     <div className="grid grid-cols-2 gap-4">
                        <button className="flex flex-col items-center justify-center gap-3 p-6 bg-white/10 rounded-3xl hover:bg-white/20 transition-all border border-white/10">
                           <span className="material-symbols-outlined">label</span>
                           <span className="text-[10px] font-black uppercase tracking-widest">Tag</span>
                        </button>
                        <button className="flex flex-col items-center justify-center gap-3 p-6 bg-white/10 rounded-3xl hover:bg-white/20 transition-all border border-white/10">
                           <span className="material-symbols-outlined">chat</span>
                           <span className="text-[10px] font-black uppercase tracking-widest">Internal</span>
                        </button>
                        <button className="col-span-2 flex items-center justify-center gap-3 p-5 bg-white text-primary rounded-3xl font-black uppercase tracking-widest text-[10px] hover:scale-105 active:scale-95 transition-all shadow-xl">
                           <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                           Resolve Case
                        </button>
                        <button className="col-span-2 flex items-center justify-center gap-3 p-5 bg-error text-white rounded-3xl font-black uppercase tracking-widest text-[10px] hover:opacity-90 transition-all">
                           <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>gpp_maybe</span>
                           Escalate to Legal
                        </button>
                     </div>
                  </div>

                  <div className="bg-white rounded-[3rem] p-8 border border-surface-container-low shadow-sm">
                     <h4 className="text-[10px] font-black text-on-surface uppercase tracking-widest mb-6 px-2">Market Context</h4>
                     <div className="space-y-6">
                        {[
                           { id: "GR-8810", title: "Waiting time drift - Zone B", date: "YESTERDAY", status: "Open" },
                           { id: "GR-8792", title: "Geo-fence error @ King's X", date: "OCT 22", status: "Resolved" }
                        ].map((issue, i) => (
                           <div key={i} className="group cursor-pointer p-4 hover:bg-slate-50 rounded-2xl transition-all border border-transparent hover:border-slate-100">
                              <div className="flex justify-between items-center mb-2">
                                 <span className="text-[8px] font-black text-primary bg-primary/5 px-2 py-1 rounded-lg tracking-widest uppercase">{issue.id}</span>
                                 <span className="text-[8px] font-bold text-on-surface-variant/40">{issue.date}</span>
                              </div>
                              <h5 className="text-sm font-bold group-hover:text-primary transition-colors">{issue.title}</h5>
                              <p className={`text-[8px] font-black uppercase tracking-widest mt-2 ${issue.status === 'Open' ? 'text-amber-600' : 'text-emerald-600'}`}>{issue.status}</p>
                           </div>
                        ))}
                     </div>
                     <button className="w-full mt-8 py-4 bg-slate-50 text-slate-400 font-black rounded-2xl text-[10px] uppercase tracking-widest border border-slate-100 hover:bg-white transition-all">
                        View Hub Patterns
                     </button>
                  </div>
               </div>
            </div>
        </div>
      </main>
    </div>
  );
};

export default GrievanceDetail;
