import React from 'react';
import { Link } from 'react-router-dom';

const SettingsAccount = () => {
  return (
    <>
      
{/* SideNavBar Component */}
<aside className="h-full w-80 fixed left-0 top-0 z-[60] bg-white dark:bg-emerald-950 flex flex-col p-8 space-y-6 shadow-2xl dark:shadow-none font-['Plus_Jakarta_Sans'] text-lg font-medium text-emerald-900 dark:text-emerald-50">
<div className="mb-8">
<span className="text-2xl font-black text-emerald-900 dark:text-emerald-50">FairGig</span>
</div>
<div className="flex flex-col items-start mb-10">
<div className="w-16 h-16 rounded-2xl overflow-hidden mb-4 ring-2 ring-emerald-100 dark:ring-emerald-800">
<img className="w-full h-full object-cover" data-alt="Portrait of a professional worker with a friendly expression, soft natural office lighting, high-end editorial photography style" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCR5jZn1ZK8kfOiXqXQq9uH8ORtlkc4Fyl0J7d3x5EyjPDHgZxzqh7kuD0FU8emeiT50BtYB1CTY89AvBp69JE9cMEen6FDOIkzTCpOKiblepLnzPK-g7oo8k6iz-RN_OHJ-pBuBKKNLI3CaEJjXutczA3aMxX0umgmMrGwJuwBg3-Ymqq2gYxWcOIZIpiLK0GSJkGIJh3Ri6fjxx0TvOsW00cinph9vqTEfG-t7VQxHEU-skjruvw3pintNlraizVkjLWL1SDLI-sn"/>
</div>
<h2 className="text-xl font-bold tracking-tight">Settings</h2>
<p className="text-sm font-normal text-emerald-700/70 dark:text-emerald-300/70">Manage your ethical ledger</p>
</div>
<nav className="flex-1 space-y-2">
{/* Active State: Account Settings */}
<a className="flex items-center gap-4 px-4 py-3 text-emerald-900 dark:text-emerald-50 font-bold bg-emerald-50 dark:bg-emerald-900/40 rounded-xl hover:pl-2 transition-all duration-300 ease-out" href="#">
<span className="material-symbols-outlined" data-icon="settings">settings</span>
<span>Account Settings</span>
</a>
<a className="flex items-center gap-4 px-4 py-3 text-emerald-700/70 dark:text-emerald-300/70 hover:pl-2 transition-all duration-300 ease-out" href="#">
<span className="material-symbols-outlined" data-icon="notifications_active">notifications_active</span>
<span>Notification Prefs</span>
</a>
<a className="flex items-center gap-4 px-4 py-3 text-emerald-700/70 dark:text-emerald-300/70 hover:pl-2 transition-all duration-300 ease-out" href="#">
<span className="material-symbols-outlined" data-icon="shield">shield</span>
<span>Security</span>
</a>
<a className="flex items-center gap-4 px-4 py-3 text-emerald-700/70 dark:text-emerald-300/70 hover:pl-2 transition-all duration-300 ease-out" href="#">
<span className="material-symbols-outlined" data-icon="contact_support">contact_support</span>
<span>Help Center</span>
</a>
<a className="flex items-center gap-4 px-4 py-3 text-emerald-700/70 dark:text-emerald-300/70 hover:pl-2 transition-all duration-300 ease-out" href="#">
<span className="material-symbols-outlined" data-icon="policy">policy</span>
<span>Privacy Policy</span>
</a>
</nav>
<button className="mt-auto flex items-center justify-center gap-2 w-full py-4 bg-error-container text-on-error-container rounded-2xl font-bold active:scale-95 transition-transform duration-150">
<span className="material-symbols-outlined" data-icon="logout">logout</span>
<span>Logout</span>
</button>
</aside>
{/* Main Content Canvas */}
<main className="ml-80 flex-1 p-12 max-w-6xl mx-auto">
<header className="mb-12">
<h1 className="text-5xl font-extrabold text-primary tracking-tighter mb-2">Account Settings</h1>
<p className="text-on-surface-variant text-lg">Update your professional identity and personal preferences.</p>
</header>
{/* Bento Grid Layout */}
<div className="grid grid-cols-12 gap-6">
{/* Profile Section (Large Card) */}
<section className="col-span-8 bg-surface-container-lowest rounded-[2rem] p-8 shadow-sm border border-emerald-50/50">
<div className="flex justify-between items-start mb-8">
<h3 className="text-2xl font-bold text-primary">Public Profile</h3>
<button className="px-6 py-2 bg-primary text-on-primary rounded-xl font-semibold shadow-lg shadow-emerald-900/10 hover:bg-primary-container transition-colors">Save Changes</button>
</div>
<div className="grid grid-cols-2 gap-8">
<div className="space-y-6">
<div className="group">
<label className="block text-sm font-bold text-primary mb-2 px-1">Full Name</label>
<input className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 focus:bg-surface-container-lowest focus:ring-0 focus:border-b-2 focus:border-primary transition-all" type="text" value="Arsalan Ahmed"/>
</div>
<div className="group">
<label className="block text-sm font-bold text-primary mb-2 px-1">Email Address</label>
<input className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 focus:bg-surface-container-lowest focus:ring-0 focus:border-b-2 focus:border-primary transition-all" type="email" value="arsalan.ahmed@fairgig.com"/>
</div>
</div>
<div className="space-y-6">
<div className="group">
<label className="block text-sm font-bold text-primary mb-2 px-1">Work ID</label>
<input className="w-full bg-surface-container text-on-surface-variant border-none rounded-xl px-4 py-3 cursor-not-allowed" readonly="" type="text" value="FG-99283-X"/>
</div>
<div className="group">
<label className="block text-sm font-bold text-primary mb-2 px-1">Location</label>
<select className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 focus:bg-surface-container-lowest focus:ring-0 focus:border-b-2 focus:border-primary transition-all">
<option>Lahore, Pakistan</option>
<option>Karachi, Pakistan</option>
<option>Islamabad, Pakistan</option>
</select>
</div>
</div>
<div className="col-span-2">
<label className="block text-sm font-bold text-primary mb-2 px-1">Professional Bio (English &amp; Urdu)</label>
<textarea className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 focus:bg-surface-container-lowest focus:ring-0 focus:border-b-2 focus:border-primary transition-all leading-relaxed" rows="4">Dedicated logistics specialist with 5+ years of experience in ethical gig work. Committed to transparency and quality service.
تعمیراتی اور لاجسٹکس کے شعبے میں پانچ سالہ تجربہ۔ شفافیت اور معیاری کام میری پہچان ہے۔</textarea>
</div>
</div>
</section>
{/* Verification Status (Small Bento Card) */}
<section className="col-span-4 bg-primary-container text-on-primary-container rounded-[2rem] p-8 flex flex-col justify-between relative overflow-hidden">
<div className="relative z-10">
<span className="material-symbols-outlined text-4xl mb-4" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
<h3 className="text-2xl font-bold mb-2">Verified Ledger</h3>
<p className="text-on-primary-container/80 text-sm">Your digital trust score is at 98%. This ranks you in the top 1% of the FairGig community.</p>
</div>
<div className="mt-6 py-2 px-4 bg-primary/20 backdrop-blur-md rounded-full inline-flex items-center gap-2 self-start border border-primary/30 relative z-10">
<div className="w-2 h-2 rounded-full bg-primary-fixed-dim animate-pulse"></div>
<span className="text-xs font-bold tracking-widest uppercase">Level 5 Worker</span>
</div>
{/* Abstract background element */}
<div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
</section>
{/* Security Fast Action (Wide Bento Card) */}
<section className="col-span-5 bg-white rounded-[2rem] p-8 shadow-sm border border-emerald-50/50 flex items-center gap-6">
<div className="w-16 h-16 rounded-2xl bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed">
<span className="material-symbols-outlined text-3xl">lock_reset</span>
</div>
<div className="flex-1">
<h4 className="font-bold text-lg text-emerald-900">Security Checkup</h4>
<p className="text-on-surface-variant text-sm">Update your password or enable Two-Factor Authentication.</p>
</div>
<button className="p-3 hover:bg-surface-container rounded-full transition-colors text-emerald-900">
<span className="material-symbols-outlined">chevron_right</span>
</button>
</section>
{/* Notification Quick Toggle (Wide Bento Card) */}
<section className="col-span-7 bg-white rounded-[2rem] p-8 shadow-sm border border-emerald-50/50 flex items-center justify-between">
<div className="flex items-center gap-6">
<div className="w-16 h-16 rounded-2xl bg-secondary-container flex items-center justify-center text-on-secondary-container">
<span className="material-symbols-outlined text-3xl">mail</span>
</div>
<div>
<h4 className="font-bold text-lg text-emerald-900">Earnings Reports</h4>
<p className="text-on-surface-variant text-sm">Receive weekly ledger summaries via email.</p>
</div>
</div>
{/* Toggle UI */}
<div className="w-14 h-8 bg-primary rounded-full relative flex items-center px-1">
<div className="w-6 h-6 bg-white rounded-full absolute right-1 shadow-md"></div>
</div>
</section>
{/* Data Export (Square Card) */}
<section className="col-span-4 bg-surface-container-low rounded-[2rem] p-8 flex flex-col items-center text-center">
<div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-4 shadow-inner">
<span className="material-symbols-outlined text-4xl text-primary">download</span>
</div>
<h4 className="font-bold text-emerald-900 mb-2">Export Data</h4>
<p className="text-xs text-on-surface-variant mb-6 leading-relaxed">Download your entire earnings history and contract ledger in CSV or PDF format.</p>
<button className="w-full py-3 bg-white text-primary font-bold rounded-xl border border-outline-variant/30 hover:bg-emerald-50 transition-colors">Start Export</button>
</section>
{/* Help & Support Spotlight (Wide Card) */}
<section className="col-span-8 bg-surface-container-high rounded-[2rem] p-10 flex gap-10 overflow-hidden relative">
<div className="flex-1 relative z-10">
<h3 className="text-3xl font-extrabold text-emerald-900 mb-4 tracking-tight">Need assistance?</h3>
<p className="text-on-surface-variant mb-8 max-w-md">Our support team is available 24/7 to help you navigate your grievances or technical issues.</p>
<div className="flex gap-4">
<button className="px-8 py-4 bg-primary text-on-primary rounded-2xl font-bold shadow-lg shadow-emerald-900/10">Open Help Center</button>
<button className="px-8 py-4 bg-white text-emerald-900 rounded-2xl font-bold border border-outline-variant/20">Chat with Support</button>
</div>
</div>
<div className="w-1/3 relative z-10 flex items-center justify-center">
<div className="relative">
<img className="w-48 h-48 object-contain" data-alt="Abstract 3D illustration of a helpful robot and human hand connecting, soft mint and emerald tones, clean studio lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCDJof0W7wfpHtvLnEGVX28I4ShuMtkX1pzK1qLzwo-gtZjqc25KQYvj4m2niioKl9MzXYCCM9Q9iUz8QqQi1CHzHH1yOxupHGhQvzfcFyrrWx8unqOk1HHUsl7cqpuR6GlLZnl8MlGNw7NGV65-DBiayeYkyQueltTKi9EOhuSbr1H1WFupU3JGngH4OlBo6tWHvNV23P14qNcqcnCIvShQFybUMA28kYYPB_YPzq1pFCKYPoD20fVCaoWv-0ynrgNG6Okga_9wgk-"/>
</div>
</div>
{/* Artistic gradient overlay */}
<div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-emerald-100/30 to-transparent"></div>
</section>
</div>
{/* Footer / Identity Anchor */}
<footer className="mt-20 flex justify-between items-center opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
<div className="flex gap-8 items-center">
<span className="text-xs font-bold tracking-widest uppercase">FairGig Protocol v2.4</span>
<span className="text-xs font-bold tracking-widest uppercase">Ethical Ledger Certified</span>
</div>
<div className="flex gap-4">
<div className="w-8 h-8 rounded-full bg-on-surface"></div>
<div className="w-8 h-8 rounded-full bg-primary"></div>
<div className="w-8 h-8 rounded-full bg-secondary"></div>
</div>
</footer>
</main>
{/* Contextual FAB (Suppressed on Settings according to rules, but visual mock requires it for UI completeness if interpreting 'primary purpose' as settings navigation shortcut) */}
{/* Suppression logic applied: No FAB on Settings Page. */}

    </>
  );
};

export default SettingsAccount;
