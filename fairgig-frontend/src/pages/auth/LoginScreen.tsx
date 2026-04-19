import React from 'react';
import { Link } from 'react-router-dom';

const LoginScreen = () => {
  return (
    <>
      
{/* Suppressing Shared Nav Shells per focused task rule */}
<main className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
{/* Brand Narrative Section (Left Desktop) */}
<div className="hidden lg:flex flex-col gap-8 pr-12">
<header className="space-y-2">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-primary text-4xl" data-icon="account_balance_wallet" style={{ fontVariationSettings: "'FILL' 1" }}>account_balance_wallet</span>
<h1 className="font-headline font-extrabold text-4xl text-primary tracking-tight">FairGig</h1>
</div>
<p className="font-headline text-on-surface-variant text-xl">The Ethical Ledger</p>
</header>
<div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-2xl shadow-on-surface/5">
<img alt="Worker checking digital ledger" className="absolute inset-0 w-full h-full object-cover" data-alt="Modern clean workspace with a person checking a transparent digital dashboard on a tablet, soft morning light, high-end editorial feel" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDMByWzUFVrF_QI5_mo3IIzUojlfaI-QPpEAkqOtlYoW9bXDAuf-Lui--7l-Yf9W6Uy_aHQTdvMeX9LkpfGX-hu04iaQZVc6LiSUUJIN_c2gd_0Rntcojut6OJ7DNi1sZLXZ_EKGT1UaTSC36h1HyZovKHLzb1RZfpRDoJkywPD94cvydGU6G7xlaM2E5LDe0Z36F3fR1Nk0x0R0KrEcWzSSR0pU-9_kqBse_mRfFu9uGMNopT9JBaEKamr4GtG5rTNQJ4Rhs5Jg5hf"/>
<div className="absolute inset-0 bg-primary/20 backdrop-blur-[2px]"></div>
<div className="absolute bottom-8 left-8 right-8 p-6 bg-surface/70 backdrop-blur-xl rounded-2xl">
<p className="font-headline font-semibold text-primary leading-tight text-lg italic">"Transparency is the foundation of dignity in the gig economy."</p>
</div>
</div>
<div className="grid grid-cols-3 gap-4">
<div className="bg-surface-container-low p-4 rounded-2xl">
<p className="text-primary font-headline font-bold text-2xl">100%</p>
<p className="text-on-surface-variant text-xs font-medium uppercase tracking-wider">Verifiable</p>
</div>
<div className="bg-surface-container-low p-4 rounded-2xl">
<p className="text-primary font-headline font-bold text-2xl">Fair</p>
<p className="text-on-surface-variant text-xs font-medium uppercase tracking-wider">Advocacy</p>
</div>
<div className="bg-surface-container-low p-4 rounded-2xl">
<p className="text-primary font-headline font-bold text-2xl">24/7</p>
<p className="text-on-surface-variant text-xs font-medium uppercase tracking-wider">Support</p>
</div>
</div>
</div>
{/* Login Form Section (Right/Mobile) */}
<div className="flex justify-center lg:justify-start w-full">
<div className="w-full max-w-md bg-surface-container-lowest p-8 sm:p-12 rounded-[2.5rem] shadow-sm">
{/* Mobile Branding */}
<div className="lg:hidden flex flex-col items-center mb-8 gap-2">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-primary text-3xl" data-icon="account_balance_wallet" style={{ fontVariationSettings: "'FILL' 1" }}>account_balance_wallet</span>
<h1 className="font-headline font-extrabold text-2xl text-primary tracking-tight">FairGig</h1>
</div>
<p className="text-on-surface-variant text-sm font-medium">Track your gig earnings fairly</p>
</div>
<div className="mb-10 text-center lg:text-left">
<h2 className="font-headline text-3xl font-bold text-on-surface mb-2">Welcome Back</h2>
<p className="text-on-surface-variant font-body">Sign in to your ethical ledger</p>
</div>
<form className="space-y-6">
{/* Role Selector */}
<div className="space-y-3">
<label className="text-sm font-semibold text-on-surface-variant ml-1">Account Type</label>
<div className="flex bg-surface-container-low p-1.5 rounded-2xl gap-1">
<button className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all bg-surface-container-lowest text-primary shadow-sm" type="button">
                                Worker
                            </button>
<button className="flex-1 py-2.5 rounded-xl text-sm font-medium transition-all text-on-surface-variant hover:bg-surface-container-high" type="button">
                                Verifier
                            </button>
<button className="flex-1 py-2.5 rounded-xl text-sm font-medium transition-all text-on-surface-variant hover:bg-surface-container-high" type="button">
                                Advocate
                            </button>
</div>
</div>
{/* Email Field */}
<div className="space-y-2">
<label className="text-sm font-semibold text-on-surface-variant ml-1" htmlFor="email">Email Address</label>
<div className="relative">
<input className="w-full bg-surface-container-low border-none rounded-2xl px-5 py-4 fairgig-input font-body text-on-surface transition-all placeholder:text-on-surface-variant/40" id="email" placeholder="name@fairgig.com" type="email"/>
</div>
</div>
{/* Password Field */}
<div className="space-y-2">
<div className="flex justify-between items-center px-1">
<label className="text-sm font-semibold text-on-surface-variant" htmlFor="password">Password</label>
<a className="text-xs font-semibold text-primary hover:underline underline-offset-4" href="#">Forgot Password?</a>
</div>
<div className="relative">
<input className="w-full bg-surface-container-low border-none rounded-2xl px-5 py-4 fairgig-input font-body text-on-surface transition-all placeholder:text-on-surface-variant/40" id="password" placeholder="••••••••" type="password"/>
</div>
</div>
{/* Action Buttons */}
<div className="pt-4 space-y-4">
<button className="w-full bg-primary-gradient text-white py-4 px-6 rounded-2xl font-headline font-bold text-lg hover:shadow-xl hover:shadow-primary/20 active:scale-[0.98] transition-all" type="submit">
                            Sign In
                        </button>
<div className="relative flex items-center py-2">
<div className="flex-grow border-t border-outline-variant/30"></div>
<span className="flex-shrink mx-4 text-on-surface-variant/50 text-xs font-medium">NEW TO FAIRGIG?</span>
<div className="flex-grow border-t border-outline-variant/30"></div>
</div>
<button className="w-full bg-surface-container-low text-primary py-4 px-6 rounded-2xl font-headline font-bold text-lg hover:bg-secondary-container transition-all active:scale-[0.98]" type="button">
                            Sign Up
                        </button>
</div>
</form>
<footer className="mt-12 text-center">
<p className="text-xs text-on-surface-variant/60 leading-relaxed">
                        By continuing, you agree to FairGig's <a className="underline" href="#">Terms of Service</a> and <a className="underline" href="#">Privacy Policy</a>. Built for worker equity.
                    </p>
</footer>
</div>
</div>
</main>
{/* Visual Embellishments: Background Shapes */}
<div className="fixed top-0 right-0 -z-10 w-1/3 h-1/3 bg-primary/5 blur-[120px] rounded-full"></div>
<div className="fixed bottom-0 left-0 -z-10 w-1/2 h-1/2 bg-primary/3 blur-[100px] rounded-full"></div>

    </>
  );
};

export default LoginScreen;
