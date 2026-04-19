import React from 'react';
import { Link } from 'react-router-dom';
import heroImage from '../../assets/hero_v2.png';

const LandingPage = () => {
  return (
    <div className="bg-background min-h-screen font-body text-on-surface selection:bg-primary/20">
      {/* Premium Glass NavBar */}
      <nav className="fixed top-0 w-full z-50 glass-nav border-b border-outline-variant/10 px-8 py-5">
        <div className="max-w-screen-2xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-2xl shadow-primary/30">
              <span className="material-symbols-outlined text-white text-3xl">balance</span>
            </div>
            <span className="text-3xl font-black font-headline bg-clip-text text-transparent bg-gradient-to-r from-[#00513f] to-emerald-600 tracking-tight">FairGig</span>
          </div>
          <div className="hidden lg:flex items-center gap-10 text-sm font-bold text-on-surface-variant/80 uppercase tracking-widest">
            <a href="#about" className="hover:text-primary transition-all hover:scale-105">Our Mission</a>
            <a href="#roles" className="hover:text-primary transition-all hover:scale-105">Role Solutions</a>
            <a href="#impact" className="hover:text-primary transition-all hover:scale-105">Impact</a>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/login" className="px-6 py-2 text-sm font-extrabold text-primary hover:bg-primary/5 rounded-full transition-all">Login</Link>
            <Link to="/signup" className="px-8 py-3 bg-primary text-white rounded-2xl text-sm font-extrabold shadow-[0_20px_40px_-10px_rgba(16,185,129,0.3)] hover:shadow-primary/40 hover:-translate-y-0.5 transition-all border border-white/10 active:scale-95">Get Started</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header id="about" className="relative pt-0 pb-24 lg:pt-56 lg:pb-40 overflow-hidden px-8 lg:px-20">
        <div className="max-w-screen-2xl  grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div className="relative z-10 text-center lg:text-left space-y-10">
            <div className="inline-flex items-center gap-3 px-6 py-2.5 bg-emerald-100 rounded-full text-emerald-900 text-xs font-black uppercase tracking-[0.2em] animate-slide-right border border-emerald-200 shadow-sm">
              <span className="material-symbols-outlined text-sm font-bold">shield_with_heart</span>
              The Ethical Ledger Protocol
            </div>
            <h1 className="text-6xl lg:text-[5.5rem] font-black font-headline text-on-surface leading-[1.05] tracking-tight animate-fade-in-up">
              Algorithmic <br />
              <span className="text-primary italic">Justice</span> for the <br />
              Gig Economy
            </h1>
            <p className="text-xl lg:text-2xl text-on-surface-variant/80 leading-relaxed max-w-2xl mx-auto lg:mx-0 animate-fade-in-up delay-200">
              Join the world's first decentralized auditing network for gig workers.
              Secure your earnings, track your reputation, and resolve disputes on an immutable ledger.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start animate-fade-in-up delay-400">
              <Link to="/signup" className="px-12 py-5 bg-gradient-to-br from-[#00513f] to-[#006b54] text-white rounded-[2rem] font-black text-xl shadow-[0_30px_60px_-15px_rgba(16,185,129,0.4)] hover:shadow-primary/50 hover:-translate-y-1 transition-all active:scale-95 flex items-center justify-center gap-4 group">
                Join the Network
                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">rocket_launch</span>
              </Link>
              <a href="#roles" className="px-12 py-5 bg-white/50 backdrop-blur-md border border-outline-variant text-on-surface rounded-[2rem] font-black text-xl hover:bg-white hover:shadow-xl transition-all text-center">
                Learn More
              </a>
            </div>
          </div>

          <div className="relative group animate-fade-in-up delay-600">
            <div className="relative z-10 p-2 animate-float">
              <img
                src={heroImage}
                alt="FairGig Ecosystem Visualization"
                className="w-full h-auto rounded-[3.5rem] shadow-[0_80px_160px_-40px_rgba(0,81,63,0.25)] border-[8px] border-white/80 backdrop-blur-sm"
              />
            </div>
            {/* High-Fidelity Decors */}

          </div>
        </div>

        {/* Background Sophistication */}
        <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-emerald-50/40 via-transparent to-transparent -z-10"></div>
        <div className="absolute top-1/4 left-0 w-64 h-64 bg-primary/5 blur-[150px] -z-10"></div>
      </header>

      {/* Role Solutions Section */}
      <section id="roles" className="py-32 bg-white px-8 lg:px-20 relative overflow-hidden">
        <div className="max-w-screen-2xl mx-auto">
          <div className="text-center mb-24 space-y-4">
            <h2 className="text-4xl lg:text-6xl font-black font-headline text-on-surface tracking-tight">One Platform. Three Pillars.</h2>
            <p className="text-on-surface-variant/80 text-xl font-medium max-w-3xl mx-auto italic">Bridging the gap between workers, auditors, and policy-makers through transparency.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Worker Card */}
            <div className="p-12 rounded-[3.5rem] bg-surface-container-lowest border border-outline-variant/5 shadow-sm hover:shadow-2xl hover:shadow-primary/10 transition-all hover:-translate-y-2 group">
              <div className="w-16 h-16 bg-emerald-100 rounded-3xl flex items-center justify-center text-primary mb-10 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>person_pin</span>
              </div>
              <h3 className="text-3xl font-black mb-6">Gig Worker</h3>
              <p className="text-on-surface-variant/90 text-lg leading-relaxed mb-8">Take control of your data. Log every payout, track platform performance, and initiate audits for unfair rating drops or wage theft.</p>
              <Link to="/login" className="text-primary font-black text-lg flex items-center gap-3 group-hover:gap-5 transition-all">
                Enter Dashboard <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
            </div>

            {/* Verifier Card */}
            <div className="p-12 rounded-[3.5rem] bg-[#002a21] text-white shadow-sm hover:shadow-2xl hover:shadow-emerald-950/20 transition-all hover:-translate-y-2 group">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-3xl flex items-center justify-center text-white mb-10 group-hover:scale-110 transition-transform shadow-lg">
                <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
              </div>
              <h3 className="text-3xl font-black mb-6">Auditor</h3>
              <p className="text-emerald-100/70 text-lg leading-relaxed mb-8">Maintain the ledger. Review evidence, verify earnings screenshots, and guarantee the platform remain trusted and unbiased.</p>
              <Link to="/verifier" className="text-emerald-400 font-black text-lg flex items-center gap-3 group-hover:gap-5 transition-all">
                Access Audit Hub <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
            </div>

            {/* Advocate Card */}
            <div className="p-12 rounded-[3.5rem] bg-surface-container-lowest border border-outline-variant/5 shadow-sm hover:shadow-2xl hover:shadow-primary/10 transition-all hover:-translate-y-2 group">
              <div className="w-16 h-16 bg-emerald-700 rounded-3xl flex items-center justify-center text-white mb-10 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>monitoring</span>
              </div>
              <h3 className="text-3xl font-black mb-6">Advocate</h3>
              <p className="text-on-surface-variant/90 text-lg leading-relaxed mb-8">Drive systemic change. Use aggregate data to monitor income trends, identify biases, and build cases for fair labor legislation.</p>
              <Link to="/advocate" className="text-primary font-black text-lg flex items-center gap-3 group-hover:gap-5 transition-all">
                View Insights <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section Placeholder */}
      <section id="impact" className="py-24 bg-surface-container-low px-8 lg:px-20">
        <div className="max-w-screen-2xl mx-auto bg-primary rounded-[4rem] p-16 lg:p-24 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="relative z-10">
            <h4 className="text-xl font-bold uppercase tracking-[0.4em] mb-6 opacity-80">The Result of Justice</h4>
            <p className="text-4xl lg:text-7xl font-black font-headline leading-tight mb-12 italic">"1.2M Disputes Resolved Globally"</p>
            <Link to="/signup" className="inline-block px-12 py-5 bg-white text-primary rounded-[2rem] font-black text-xl hover:scale-105 transition-all active:scale-95 shadow-2xl">Secure Your Future Today</Link>
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-emerald-800 to-primary-container opacity-50"></div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 border-t border-outline-variant/10 px-8 lg:px-20 bg-surface-container-lowest">
        <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <span className="material-symbols-outlined text-white">balance</span>
              </div>
              <span className="text-2xl font-black font-headline tracking-tight">FairGig</span>
            </div>
            <p className="text-on-surface-variant/60 text-sm max-w-sm">Building the future of algorithmic labor justice through decentralized auditing and community governance.</p>
          </div>
          <p className="text-on-surface-variant/40 text-sm font-bold uppercase tracking-widest italic">© 2026 The Ethical Ledger</p>
          <div className="flex gap-10">
            <Link to="/dev" className="text-sm font-extrabold text-on-surface-variant/30 hover:text-primary transition-colors tracking-widest">DEV CONSOLE</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
