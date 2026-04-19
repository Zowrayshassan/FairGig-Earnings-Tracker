import React from 'react';
import { Link } from 'react-router-dom';

const ReviewScreenshotDetail = () => {
  return (
    <div className="bg-background font-body text-on-surface min-h-screen">
      {/* Standardized Verifier SideNavBar */}
      <aside className="h-screen w-64 fixed left-0 top-0 border-r-0 bg-emerald-950 dark:bg-slate-950 shadow-xl flex flex-col py-6 z-50">
        <div className="px-6 mb-10 text-emerald-100/50">
            <Link to="/pending-reviews" className="flex items-center gap-2 hover:text-white transition-all text-xs font-bold mb-4 uppercase tracking-widest">
                <span className="material-symbols-outlined text-sm">arrow_back</span>
                BACK
            </Link>
          <Link to="/" className="text-2xl font-bold text-white tracking-tightest font-headline">FairGig Verifier</Link>
          <p className="text-emerald-500 text-[10px] font-bold uppercase tracking-widest mt-1 opacity-80">Verification Officer</p>
        </div>
        <nav className="flex-1 space-y-1">
          <Link to="/verifier" className="flex items-center gap-3 text-emerald-300/70 hover:text-white px-4 py-3 mx-2 transition-colors hover:bg-emerald-800/40 rounded-lg">
            <span className="material-symbols-outlined">dashboard</span>
            <span className="font-['Plus_Jakarta_Sans'] font-medium text-sm tracking-tight">Dashboard</span>
          </Link>
          <Link to="/pending-reviews" className="flex items-center gap-3 bg-emerald-900/50 text-emerald-100 rounded-lg px-4 py-3 mx-2 transition-all">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>fact_check</span>
            <span className="font-['Plus_Jakarta_Sans'] font-medium text-sm tracking-tight">Pending Reviews</span>
          </Link>
          <Link to="/verifier-history" className="flex items-center gap-3 text-emerald-300/70 hover:text-white px-4 py-3 mx-2 transition-colors hover:bg-emerald-800/40 rounded-lg">
            <span className="material-symbols-outlined">history</span>
            <span className="font-['Plus_Jakarta_Sans'] font-medium text-sm tracking-tight">History</span>
          </Link>
        </nav>
        <div className="mt-auto px-4 pt-6 border-t border-emerald-900/30">
          <a className="flex items-center gap-3 text-emerald-300/70 hover:text-white px-4 py-3 transition-colors hover:bg-emerald-800/40 rounded-lg" href="#">
            <span className="material-symbols-outlined">help_outline</span>
            <span className="font-['Plus_Jakarta_Sans'] font-medium text-sm tracking-tight">Help Center</span>
          </a>
          <Link to="/" className="flex items-center gap-3 text-emerald-300/70 hover:text-white px-4 py-3 transition-colors hover:bg-emerald-800/40 rounded-lg">
            <span className="material-symbols-outlined">logout</span>
            <span className="font-['Plus_Jakarta_Sans'] font-medium text-sm tracking-tight">Log Out</span>
          </Link>
        </div>
      </aside>

      {/* TopNavBar Shell - Standardized */}
      <header className="fixed top-0 right-0 w-[calc(100%-16rem)] z-40 bg-white/80 backdrop-blur-xl border-b border-outline-variant/10 flex justify-between items-center px-8 h-16">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative w-96 group focus-within:ring-2 focus-within:ring-emerald-500/30 rounded-full transition-all">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-900 transition-colors">search</span>
            <input className="w-full bg-surface-container-low border-none rounded-full py-2 pl-10 pr-4 text-sm outline-none focus:ring-0 placeholder:text-slate-400" placeholder="Search verification IDs or worker names..." type="text"/>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <button className="hover:bg-slate-100/50 rounded-full p-2 transition-all relative">
            <span className="material-symbols-outlined text-slate-600">notifications</span>
            <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full border-2 border-white"></span>
          </button>
          <div className="flex items-center gap-3 pl-6 border-l border-emerald-100/20">
            <div className="text-right">
              <p className="text-sm font-bold text-emerald-900 leading-none">Sarah Jenkins</p>
              <p className="text-[10px] text-slate-500 font-bold tracking-widest uppercase mt-1">Level 4 Official</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-primary-fixed overflow-hidden border-2 border-primary-fixed shadow-sm">
              <img alt="Verifier Avatar" className="h-full w-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB89RPLvo0ZKG77oEtZdGk1un2gHBJLJF2V2iqSnN0tnwVwlnUeiIJJlwIgXixH1cxSQoCduZBBCHyFcixHn4Iz9NMTShd_IVIoETtq9Mj6MD2Wsp3X3b86lCJqkmncUgki2jSQNlPylD9CLYPtt22DKx8OquYTm-um5rMjiZiZUlEaGucVU9jSyR0eqZMSmx1AXtRBwuCoGdCB-XTvyuSu3UuFYaTVmrCvWuLYerCiP6v4qtJd9F2gQmJ8UOI1qffICUwx4vxHjgkr"/>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="lg:ml-64 pt-16 h-screen overflow-hidden flex">
        {/* LEFT PANEL: SCREENSHOT VIEWER */}
        <section className="flex-1 bg-surface-container-low relative overflow-hidden flex flex-col">
          <div className="p-6 flex items-center justify-between bg-white/40 backdrop-blur-sm z-10 border-b border-surface-container-high">
            <div className="flex items-center gap-4">
              <h2 className="font-headline font-black text-xl text-emerald-900 flex items-center gap-2">
                <span className="material-symbols-outlined text-emerald-900">image</span>
                Verification Case #7749-X
              </h2>
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-[10px] font-black uppercase tracking-widest shadow-sm">Manual Review Required</span>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-white rounded-xl transition-all shadow-sm border border-transparent hover:border-outline-variant">
                <span className="material-symbols-outlined">zoom_in</span>
              </button>
              <button className="p-2 hover:bg-white rounded-xl transition-all shadow-sm border border-transparent hover:border-outline-variant">
                <span className="material-symbols-outlined">zoom_out</span>
              </button>
              <div className="w-[1px] h-6 bg-surface-container-high mx-2"></div>
              <button className="p-2 hover:bg-white rounded-xl transition-all shadow-sm border border-transparent hover:border-outline-variant">
                <span className="material-symbols-outlined">download</span>
              </button>
            </div>
          </div>
          {/* ZOOMABLE IMAGE CANVAS */}
          <div className="flex-1 overflow-auto p-12 flex items-center justify-center bg-[radial-gradient(#e5e9e6_1px,transparent_1px)] [background-size:24px_24px]">
            <div className="relative group">
              <div className="absolute -inset-4 bg-emerald-500/5 blur-2xl rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative bg-white shadow-2xl rounded-2xl overflow-hidden ring-1 ring-black/5 max-w-4xl cursor-zoom-in group-hover:scale-[1.01] transition-transform">
                <img alt="Gig Platform Earnings Screenshot" className="w-full h-auto" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCHnle-gGLGKSRMo5W1kalO_BAcUtpBDGjJ5uDm8LMEaTzSYNac7Rx3aqubFJZhfaIthIJkVoOlmEYwRCF9Y-vYgWilaSRlDQS29KGVVbxf_szVWZtqvqwh-Lvyto_uw0oPJjagBlNeL3r1diAodENQ97YUR1BHjLalbbcjN8UfTBChoK1iIahcwgQ6eHAe6D6jwP3kuxfaj-MacIkr312aPHHCmMmLNOntVDuYdHUoeXKA0COjQHQmgrbP9udxe2mTlHwfy--2SWhp"/>
                {/* AI HIGHLIGHT OVERLAYS */}
                <div className="absolute top-[15%] left-[20%] w-[120px] h-[40px] border-2 border-error rounded-lg shadow-[0_0_20px_rgba(186,26,26,0.3)] animate-pulse">
                  <span className="absolute -top-7 left-0 bg-error text-white text-[9px] font-black px-2 py-1 rounded shadow-lg flex items-center gap-1">
                    <span className="material-symbols-outlined text-[12px]" style={{ fontVariationSettings: "'FILL' 1" }}>warning</span>
                    ANOMALY
                  </span>
                </div>
                <div className="absolute bottom-[28%] right-[15%] w-[180px] h-[60px] border-2 border-emerald-500 rounded-lg shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                  <span className="absolute -top-7 right-0 bg-emerald-500 text-white text-[9px] font-black px-2 py-1 rounded shadow-lg flex items-center gap-1">
                    <span className="material-symbols-outlined text-[12px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    VERIFIED ZONE
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* RIGHT SIDEBAR: DETAILS & ACTIONS */}
        <aside className="w-[420px] bg-white border-l border-surface-container-high flex flex-col shadow-[-4px_0_24px_rgba(0,0,0,0.02)] z-20">
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {/* WORKER & SHIFT DETAILS */}
            <section className="p-8 border-b border-surface-container-low">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-headline font-black text-emerald-900 tracking-tight text-lg">Worker & Shift</h3>
              </div>
              <div className="bg-surface-container-low rounded-[2rem] p-6 space-y-5 shadow-inner">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-900 border border-emerald-200 shadow-sm">
                    <span className="material-symbols-outlined text-2xl">person</span>
                  </div>
                  <div>
                    <p className="font-black text-emerald-900">Arjun Malhotra</p>
                    <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mt-1">ID: FG-9921-XPR</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="bg-white/50 p-4 rounded-2xl">
                    <p className="text-[9px] font-black uppercase tracking-[0.2em] text-on-surface-variant mb-2">Date</p>
                    <p className="text-sm font-black text-emerald-900">Oct 24, 2023</p>
                  </div>
                  <div className="bg-white/50 p-4 rounded-2xl">
                    <p className="text-[9px] font-black uppercase tracking-[0.2em] text-on-surface-variant mb-2">Platform</p>
                    <p className="text-sm font-black text-emerald-900 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span> DeliverEase
                    </p>
                  </div>
                </div>
                <div className="pt-4 flex justify-between px-2">
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-[0.2em] text-on-surface-variant mb-1">Reported Hours</p>
                    <p className="text-2xl font-black text-emerald-900">8.5 hrs</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] font-black uppercase tracking-[0.2em] text-on-surface-variant mb-1">Reported Earnings</p>
                    <p className="text-2xl font-black text-emerald-900">₨ 14,200</p>
                  </div>
                </div>
              </div>
            </section>
            {/* AI ANOMALY SERVICE RESULTS */}
            <section className="p-8">
              <div className="flex items-center gap-2 mb-6">
                <span className="material-symbols-outlined text-emerald-500">auto_awesome</span>
                <h3 className="font-headline font-black text-emerald-900 tracking-tight text-lg">AI Insights</h3>
              </div>
              <div className="space-y-4">
                {/* ANOMALY 1 */}
                <div className="p-5 rounded-2xl border border-error/10 bg-error-container/10 flex gap-4 transition-all hover:bg-error-container/20">
                  <span className="material-symbols-outlined text-error mt-0.5">text_fields</span>
                  <div>
                    <p className="text-sm font-black text-emerald-900">Font mismatch detected</p>
                    <p className="text-xs text-on-surface-variant mt-2 leading-relaxed italic">The digit '4' in total earnings uses a 2px variation from standard Helvetica Neue. High probability of manual edit.</p>
                    <div className="mt-3 flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-error text-white text-[8px] font-black rounded-full uppercase tracking-widest shadow-sm">94% CONFIDENCE</span>
                    </div>
                  </div>
                </div>
                {/* VERIFIED POSITIVE */}
                <div className="p-5 rounded-2xl border border-emerald-500/10 bg-emerald-100/20 flex gap-4 transition-all hover:bg-emerald-100/30">
                  <span className="material-symbols-outlined text-emerald-500 mt-0.5">verified_user</span>
                  <div>
                    <p className="text-sm font-black text-emerald-900">Metadata Authentic</p>
                    <p className="text-xs text-on-surface-variant mt-2 leading-relaxed italic">EXIF data confirms capture on iPhone 13 at the reported GPS coordinates.</p>
                  </div>
                </div>
              </div>
            </section>
            {/* INTERNAL NOTES */}
            <section className="px-8 pb-8">
              <label className="block text-[10px] font-black uppercase tracking-widest text-on-surface-variant mb-3 pl-1">Internal Notes</label>
              <textarea className="w-full bg-surface-container-low border border-outline-variant/30 rounded-2xl p-4 text-sm focus:ring-4 focus:ring-emerald-500/10 transition-all outline-none min-h-[120px] placeholder:text-slate-400 placeholder:italic italic font-medium" placeholder="Type your observations here for audit history..."></textarea>
            </section>
          </div>
          {/* ACTION BUTTONS FOOTER */}
          <div className="p-8 bg-white border-t border-surface-container-high grid grid-cols-1 gap-4">
            <button className="w-full bg-emerald-900 text-white font-black py-4 rounded-2xl flex items-center justify-center gap-2 shadow-xl shadow-emerald-900/20 hover:bg-emerald-950 active:scale-[0.98] transition-all uppercase text-xs tracking-widest">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
              Approve Shift
            </button>
            <div className="grid grid-cols-2 gap-4">
              <button className="bg-error text-white font-black py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-error/90 active:scale-[0.98] transition-all uppercase text-[10px] tracking-widest shadow-lg shadow-error/10">
                <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>flag</span>
                Flag
              </button>
              <button className="bg-surface-container text-on-surface-variant font-black py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-surface-container-highest active:scale-[0.98] transition-all uppercase text-[10px] tracking-widest border border-outline-variant/30">
                <span className="material-symbols-outlined text-[18px]">block</span>
                Unverifiable
              </button>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default ReviewScreenshotDetail;
