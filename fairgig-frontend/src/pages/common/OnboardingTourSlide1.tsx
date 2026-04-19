import React from 'react';
import { Link } from 'react-router-dom';

const OnboardingTourSlide1 = () => {
  return (
    <>
      
{/* Onboarding Navigation Suppressed as per UX Policy (Linear/Transactional) */}
<main className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
{/* Illustration Section with Asymmetric Layout */}
<div className="relative group order-2 md:order-1">
{/* Glassmorphism Backdrop for the Image */}
<div className="absolute -inset-4 bg-primary/5 rounded-[2rem] blur-2xl group-hover:bg-primary/10 transition-all duration-700"></div>
<div className="relative aspect-square rounded-[2.5rem] overflow-hidden bg-surface-container-lowest shadow-2xl transition-transform duration-500 hover:scale-[1.02]">
<img alt="FairGig Worker Illustration" className="w-full h-full object-cover" data-alt="Modern professional worker in a clean uniform using a sleek mobile app interface to log work hours in a bright contemporary office setting with soft green accents." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDw9WwNy1H_5jMUfJ05MkXw77V4J3zsqAkj5PdM8Wum7gMmn1tDn61-JkiBVOnMwKnpD53_FsOTguTqbQqff1pI1fEz13pe3BJfnT8yge-59FPPymHx3d9WQvwCeljtRiy09ALLOtB2B2ardSdQm_cgka_hyTNE5i7inrd6NZ88KSOXHqxknMq6g7LBPum7CERSCTkzf3UHlXu3MPDXiQwvGdMINAU0pZPLq3vXIzA45DKb6DN4TwJ-mqPuB4tkfrcf2Bp_kPYeFBkb"/>
{/* Floating Data Badge (Editorial Layering) */}
<div className="absolute bottom-6 right-6 bg-white/80 backdrop-blur-xl p-4 rounded-2xl shadow-lg border border-white/20">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-on-primary">
<span className="material-symbols-outlined" data-icon="check_circle">check_circle</span>
</div>
<div>
<p className="text-[10px] font-bold uppercase tracking-widest text-primary">Status</p>
<p className="text-sm font-semibold text-on-surface">Shift Verified</p>
</div>
</div>
</div>
</div>
</div>
{/* Content Section */}
<div className="space-y-8 order-1 md:order-2 flex flex-col items-start text-left">
{/* Progress Indicator */}
<div className="flex gap-2">
<div className="h-1.5 w-8 rounded-full bg-primary"></div>
<div className="h-1.5 w-3 rounded-full bg-outline-variant/30"></div>
<div className="h-1.5 w-3 rounded-full bg-outline-variant/30"></div>
</div>
<div className="space-y-4">
<h1 className="text-4xl md:text-5xl font-extrabold text-on-surface leading-[1.1] tracking-tight">
                    Take Control of Your Earnings
                </h1>
<p className="text-lg text-on-surface-variant leading-relaxed max-w-md">
                    Log every hour and every rupee to build a verifiable record of your labor.
                </p>
</div>
<div className="flex flex-col sm:flex-row items-center gap-6 w-full pt-4">
{/* Primary Action with Subtle Gradient */}
<button className="w-full sm:w-auto px-10 py-4 bg-gradient-to-br from-primary to-primary-container text-on-primary rounded-xl font-bold text-lg shadow-xl shadow-primary/20 hover:scale-[1.03] active:scale-95 transition-all duration-300 flex items-center justify-center gap-3">
<span>Next</span>
<span className="material-symbols-outlined" data-icon="arrow_forward">arrow_forward</span>
</button>
{/* Skip Link (Editorial Style) */}
<button className="text-primary font-semibold hover:text-primary-container transition-colors px-4 py-2">
                    Skip
                </button>
</div>
{/* Trust Badge / Ethical Ledger Detail */}
<div className="pt-8 flex items-center gap-4 border-t border-outline-variant/20 w-full">
<div className="p-2 rounded-lg bg-surface-container-low">
<span className="material-symbols-outlined text-primary" data-icon="shield_with_heart" style={{ fontVariationSettings: "'FILL' 1" }}>shield_with_heart</span>
</div>
<p className="text-xs text-on-surface-variant leading-snug">
                    Your data is secured in the <span className="text-primary font-bold">Veridian Ledger</span>, ensuring total transparency and fairness.
                </p>
</div>
</div>
</main>
{/* Contextual Floating Indicator (Non-interactive Footer Hint) */}
<footer className="fixed bottom-10 left-1/2 -translate-x-1/2 md:hidden">
<div className="bg-surface-container-highest/50 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20">
<p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.2em]">Step 1 of 3</p>
</div>
</footer>

    </>
  );
};

export default OnboardingTourSlide1;
