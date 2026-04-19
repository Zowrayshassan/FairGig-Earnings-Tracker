import WorkerSidebar from '../../components/WorkerSidebar';
import React from 'react';
import { Link } from 'react-router-dom';

const PostGrievanceForm = () => {
  return (
    <>
      
{/* TopNavBar */}
<header className="sticky top-0 w-full z-50 bg-[#f6faf7]/70 dark:bg-emerald-950/70 backdrop-blur-xl">
<div className="flex justify-between items-center px-6 py-3 mx-auto w-full">
<div className="flex items-center gap-4">
<span className="text-2xl font-extrabold text-emerald-900 dark:text-emerald-50 font-headline tracking-tight">FairGig</span>
</div>
<div className="flex items-center gap-4">
<div className="hidden md:flex items-center bg-surface-container-low px-4 py-2 rounded-full">
<span className="material-symbols-outlined text-on-surface-variant text-sm">search</span>
<input className="bg-transparent border-none focus:ring-0 text-sm text-on-surface ml-2 w-64" placeholder="Search grievance archive..." type="text"/>
</div>
<div className="flex gap-2">
<button className="p-2 rounded-full hover:bg-emerald-50 transition-colors">
<span className="material-symbols-outlined text-emerald-900" data-icon="notifications">notifications</span>
</button>
<button className="p-2 rounded-full hover:bg-emerald-50 transition-colors">
<span className="material-symbols-outlined text-emerald-900" data-icon="settings">settings</span>
</button>
<div className="w-10 h-10 rounded-full overflow-hidden bg-surface-container-high ml-2 border-2 border-primary-fixed">
<img alt="User profile" data-alt="professional portrait of a gig worker with a friendly expression in a modern urban setting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCd3WpDBwtOZ2PHGvXf_rPhSmPNU_sGJx4u7QTa7MqR93pc0sO2iUfmva8s3VXwSVx9xnrHc3nwWZG7Fzsn1FE953lBptsRExPNMQKB595nQN9FdXftkYmWMwsKBqWw4vDU7qCqRSGWFSNZtSWjU_afO-DsgHz4a0zA5izyp9jTb3K1DGqBvz-RqdeoYNIVpTQSc9bqxEMVcGdHsp4xMxbgbdKK4SIz9XHqKawFXyRDzLcaEqjqf_c26jBs9KvhDcYRYYBBGdAOG2sz"/>
</div>
</div>
</div>
</div>
</header>
<div className="flex min-h-[calc(100vh-64px)]">
{/* SideNavBar (Desktop Only) */}
<WorkerSidebar />
{/* Main Content Area (Canvas) */}
<main className="flex-1 w-full max-w-5xl mx-auto px-6 py-12 pb-32">
<div className="max-w-2xl mx-auto">
{/* Header Section */}
<div className="mb-12">
<span className="text-primary font-bold tracking-widest text-xs uppercase mb-4 block">Grievance Submission</span>
<h1 className="text-5xl md:text-6xl font-extrabold text-on-surface font-headline tracking-tighter mb-4">Post a Grievance</h1>
<p className="text-on-surface-variant text-lg leading-relaxed max-w-prose">
                        Your data is your power. Document the platform discrepancies and join a collective ledger of worker rights. We prioritize your privacy and impact.
                    </p>
</div>
{/* Form Container */}
<form className="space-y-10">
{/* Platform Picker (Asymmetric Bento Style) */}
<section>
<h3 className="text-sm font-bold text-on-surface mb-4">SELECT PLATFORM</h3>
<div className="grid grid-cols-2 md:grid-cols-4 gap-3">
<label className="relative cursor-pointer group">
<input defaultChecked className="peer sr-only" name="platform" type="radio"/>
<div className="bg-surface-container-lowest border-2 border-transparent peer-checked:border-primary peer-checked:bg-primary-fixed/20 p-4 rounded-2xl transition-all flex flex-col items-center gap-2 group-hover:bg-surface-container">
<div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center">
<span className="material-symbols-outlined text-primary" data-icon="directions_car">directions_car</span>
</div>
<span className="text-xs font-bold text-on-surface">Uber</span>
</div>
</label>
<label className="relative cursor-pointer group">
<input className="peer sr-only" name="platform" type="radio"/>
<div className="bg-surface-container-lowest border-2 border-transparent peer-checked:border-primary peer-checked:bg-primary-fixed/20 p-4 rounded-2xl transition-all flex flex-col items-center gap-2 group-hover:bg-surface-container">
<div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center">
<span className="material-symbols-outlined text-primary" data-icon="delivery_dining">delivery_dining</span>
</div>
<span className="text-xs font-bold text-on-surface">Deliveroo</span>
</div>
</label>
<label className="relative cursor-pointer group">
<input className="peer sr-only" name="platform" type="radio"/>
<div className="bg-surface-container-lowest border-2 border-transparent peer-checked:border-primary peer-checked:bg-primary-fixed/20 p-4 rounded-2xl transition-all flex flex-col items-center gap-2 group-hover:bg-surface-container">
<div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center">
<span className="material-symbols-outlined text-primary" data-icon="shopping_bag">shopping_bag</span>
</div>
<span className="text-xs font-bold text-on-surface">Instacart</span>
</div>
</label>
<label className="relative cursor-pointer group">
<input className="peer sr-only" name="platform" type="radio"/>
<div className="bg-surface-container-lowest border-2 border-transparent peer-checked:border-primary peer-checked:bg-primary-fixed/20 p-4 rounded-2xl transition-all flex flex-col items-center gap-2 group-hover:bg-surface-container">
<div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center">
<span className="material-symbols-outlined text-primary" data-icon="add">add</span>
</div>
<span className="text-xs font-bold text-on-surface">Other</span>
</div>
</label>
</div>
</section>
{/* Category Dropdown */}
<div className="space-y-2">
<label className="text-sm font-bold text-on-surface">GRIEVANCE CATEGORY</label>
<div className="relative">
<select className="w-full bg-surface-container-low border-none rounded-xl py-4 px-4 text-on-surface appearance-none focus:ring-2 focus:ring-primary transition-all">
<option>Commission Hike (Platform Fee Increase)</option>
<option>Unfair Deactivation / Account Lock</option>
<option>Wage Theft / Missing Earnings</option>
<option>Safety Concern / Workplace Hazard</option>
<option>Inaccurate GPS / Distance Tracking</option>
</select>
<div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
<span className="material-symbols-outlined text-on-surface-variant">expand_more</span>
</div>
</div>
</div>
{/* Description Area */}
<div className="space-y-2">
<label className="text-sm font-bold text-on-surface">DETAILED DESCRIPTION</label>
<textarea className="w-full bg-surface-container-low border-none rounded-2xl p-6 text-on-surface focus:ring-2 focus:ring-primary transition-all resize-none placeholder:text-on-surface-variant/50" placeholder="Provide a detailed account of the issue. Include dates, ride IDs, or communication logs..." rows="6"></textarea>
</div>
{/* Multi-Functional Layout: Upload + Toggle */}
<div className="grid md:grid-cols-2 gap-8 items-start">
{/* Photo Upload */}
<div className="space-y-2">
<label className="text-sm font-bold text-on-surface uppercase">Supporting Evidence</label>
<div className="relative group">
<div className="bg-surface-container-lowest border-2 border-dashed border-outline-variant rounded-2xl p-8 flex flex-col items-center justify-center gap-2 transition-all group-hover:border-primary group-hover:bg-primary-fixed/5">
<span className="material-symbols-outlined text-4xl text-on-surface-variant group-hover:text-primary" data-icon="add_a_photo">add_a_photo</span>
<p className="text-xs text-on-surface-variant font-medium">Upload Screenshots or Photos</p>
<input className="absolute inset-0 opacity-0 cursor-pointer" type="file"/>
</div>
<p className="text-[10px] text-on-surface-variant mt-2 italic">Max size 10MB. Formats: JPG, PNG, PDF.</p>
</div>
</div>
{/* Anonymity Toggle */}
<div className="bg-surface-container-low rounded-2xl p-6 flex flex-col justify-between h-full">
<div className="flex items-center justify-between">
<div>
<h4 className="font-bold text-on-surface">Post Anonymously</h4>
<p className="text-xs text-on-surface-variant mt-1">Hide your profile from public view.</p>
</div>
<label className="relative inline-flex items-center cursor-pointer">
<input className="sr-only peer" type="checkbox" value=""/>
<div className="w-14 h-7 bg-outline-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-primary"></div>
</label>
</div>
<div className="mt-4 pt-4 border-t border-outline-variant/20">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-primary text-sm" data-icon="shield" style={{ fontVariationSettings: "'FILL' 1" }}>shield</span>
<p className="text-[11px] text-on-surface-variant italic">Data is encrypted via The Ethical Ledger protocol.</p>
</div>
</div>
</div>
</div>
{/* Submit Button */}
<div className="pt-8">
<button className="w-full bg-gradient-to-br from-primary to-primary-container text-on-primary py-5 rounded-2xl font-extrabold text-xl font-headline tracking-tight hover:shadow-2xl hover:shadow-primary/30 transition-all active:scale-[0.98]" type="submit">
                            Submit Grievance
                        </button>
<p className="text-center text-on-surface-variant text-xs mt-6 px-12">
                            By submitting, you agree to our <a className="underline font-bold text-primary" href="#">Collective Action Policy</a> and confirm this information is accurate to the best of your knowledge.
                        </p>
</div>
</form>
</div>
</main>
</div>
{/* BottomNavBar (Mobile Only) */}
<nav className="fixed bottom-0 w-full rounded-t-[2rem] lg:hidden z-50 bg-white/80 dark:bg-emerald-950/80 backdrop-blur-2xl shadow-[0_-4px_24px_rgba(0,0,0,0.04)]">
<div className="flex justify-around items-center px-4 pb-8 pt-3">
<a className="flex flex-col items-center justify-center text-emerald-800/50 dark:text-emerald-200/40" href="#">
<span className="material-symbols-outlined" data-icon="home">home</span>
<span className="text-[11px] font-medium font-['Inter'] mt-1">Home</span>
</a>
<a className="flex flex-col items-center justify-center text-emerald-800/50 dark:text-emerald-200/40" href="#">
<span className="material-symbols-outlined" data-icon="receipt_long">receipt_long</span>
<span className="text-[11px] font-medium font-['Inter'] mt-1">Ledger</span>
</a>
<a className="flex flex-col items-center justify-center bg-emerald-900 dark:bg-emerald-100 text-white dark:text-emerald-950 rounded-2xl px-5 py-2" href="#">
<span className="material-symbols-outlined" data-icon="diversity_3" style={{ fontVariationSettings: "'FILL' 1" }}>diversity_3</span>
<span className="text-[11px] font-medium font-['Inter'] mt-1">Impact</span>
</a>
<a className="flex flex-col items-center justify-center text-emerald-800/50 dark:text-emerald-200/40" href="#">
<span className="material-symbols-outlined" data-icon="person">person</span>
<span className="text-[11px] font-medium font-['Inter'] mt-1">Profile</span>
</a>
</div>
</nav>

    </>
  );
};

export default PostGrievanceForm;
