import WorkerSidebar from '../../components/WorkerSidebar';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const MyGrievancesList = () => {
    const [user] = useState(() => JSON.parse(localStorage.getItem('user') || '{}'));
    return (
        <div className="bg-background text-on-surface font-body min-h-screen">
            {/* Sidebar Navigation - Standardized */}
            <WorkerSidebar />

            {/* Standard Top Header with Back Button */}
            <header className="sticky top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-outline-variant/10">
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
                        <div className="hidden md:flex bg-surface-container-low rounded-full px-4 py-2 items-center gap-2 border border-outline-variant/10">
                            <span className="material-symbols-outlined text-sm text-on-surface-variant">search</span>
                            <input className="bg-transparent border-none focus:ring-0 text-sm w-48 p-0" placeholder="Search grievance archive..." type="text" />
                        </div>
                        <div className="flex gap-1">
                            <button className="material-symbols-outlined p-2 rounded-full hover:bg-surface-container-low transition-colors text-primary">notifications</button>
                            <button className="material-symbols-outlined p-2 rounded-full hover:bg-surface-container-low transition-colors text-primary">settings</button>
                             <Link to="/worker-profile" className="w-8 h-8 rounded-full bg-surface-container overflow-hidden border border-outline-variant/30 ml-2">
                                <img alt="Account" className="w-full h-full object-cover" src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name || 'Worker'}`} />
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            <main className="lg:ml-72 pt-12 pb-32 px-6">
                <div className="max-w-7xl mx-auto">
                    {/* Hero Section */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                        <div className="max-w-2xl">
                            <h1 className="text-5xl md:text-7xl font-black text-primary font-headline tracking-tighter mb-4 leading-none">
                                Grievance Ledger
                            </h1>
                            <p className="text-xl text-on-surface-variant font-medium leading-relaxed max-w-lg">
                                Track your active disputes and historical resolutions in our transparent, ethical labor environment.
                            </p>
                        </div>
                        <Link to="/post-grievance" className="bg-primary text-on-primary font-bold px-8 py-4 rounded-[2rem] shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-3">
                            <span className="material-symbols-outlined">add_circle</span>
                            Post New Grievance
                        </Link>
                    </div>

                    {/* Bento Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                        {/* Featured Card (Open Dispute) */}
                        <div className="md:col-span-8 bg-surface-container-lowest p-10 rounded-[2.5rem] shadow-sm flex flex-col justify-between group hover:shadow-xl transition-all relative overflow-hidden border border-outline-variant/5">
                            <div className="absolute top-0 right-0 p-10">
                                <span className="bg-tertiary-fixed text-on-tertiary-fixed-variant px-5 py-2 rounded-full text-[10px] font-black tracking-widest uppercase border border-tertiary/10">In Review</span>
                            </div>
                            <div>
                                <span className="text-primary font-bold text-[10px] tracking-[0.2em] mb-3 block uppercase">Case ID: FG-8829-X</span>
                                <h2 className="text-3xl font-extrabold text-on-surface mb-4 font-headline tracking-tight">Unfair Deduction - Trip #4021</h2>
                                <p className="text-on-surface-variant leading-relaxed max-w-lg mb-8 font-medium">
                                    Automatic penalty applied for alleged late arrival despite GPS data showing traffic obstruction at the warehouse gate. Evidence submitted for audit.
                                </p>
                            </div>
                            <div className="flex items-center justify-between mt-auto pt-8 border-t border-surface-container-low">
                                <div className="flex gap-10">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] uppercase tracking-widest text-on-surface-variant font-black opacity-40">Filed Date</span>
                                        <span className="font-bold text-on-surface">Oct 24, 2023</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] uppercase tracking-widest text-on-surface-variant font-black opacity-40">Platform</span>
                                        <span className="font-bold text-on-surface">Bykea</span>
                                    </div>
                                </div>
                                <button className="text-primary font-black text-sm flex items-center gap-1 hover:underline tracking-tight">
                                    View Details <span className="material-symbols-outlined">arrow_forward</span>
                                </button>
                            </div>
                        </div>

                        {/* Status Summary */}
                        <div className="md:col-span-4 bg-primary text-on-primary p-10 rounded-[2.5rem] flex flex-col justify-center items-center text-center shadow-2xl shadow-primary/20 relative overflow-hidden">
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
                            <div className="w-20 h-20 bg-primary-container rounded-3xl flex items-center justify-center mb-6 shadow-inner z-10">
                                <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>gavel</span>
                            </div>
                            <h3 className="text-3xl font-black font-headline tracking-tighter mb-2 z-10">2 Pending</h3>
                            <p className="text-primary-fixed text-sm font-medium opacity-80 leading-relaxed z-10">Mediators are currently auditing your recent submissions.</p>
                        </div>

                        {/* Secondary Cards */}
                        <div className="md:col-span-4 bg-surface-container-lowest p-8 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all border border-outline-variant/10">
                            <div className="flex justify-between items-start mb-6">
                                <span className="bg-primary-fixed text-on-primary-fixed-variant px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">Resolved</span>
                                <span className="text-on-surface-variant font-mono text-[10px] opacity-40">FG-7712-B</span>
                            </div>
                            <h3 className="text-xl font-bold text-on-surface mb-3 tracking-tight font-headline">Safety Equipment Reimbursement</h3>
                            <p className="text-sm text-on-surface-variant mb-6 line-clamp-2 font-medium">Request for PPE costs incurred during the monsoon surge shifts.</p>
                            <div className="flex items-center gap-4 text-[10px] font-black text-on-surface-variant/40 uppercase tracking-widest">
                                <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-sm">calendar_today</span> Sep 12</span>
                                <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>mode_comment</span> 2</span>
                            </div>
                        </div>

                        <div className="md:col-span-4 bg-surface-container-lowest p-8 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all border border-outline-variant/10">
                            <div className="flex justify-between items-start mb-6">
                                <span className="bg-error-container text-on-error-container px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">Open</span>
                                <span className="text-on-surface-variant font-mono text-[10px] opacity-40">FG-9001-Z</span>
                            </div>
                            <h3 className="text-xl font-bold text-on-surface mb-3 tracking-tight font-headline">Platform Access Glitch</h3>
                            <p className="text-sm text-on-surface-variant mb-6 line-clamp-2 font-medium">Unable to login during peak hours causing loss of incentive qualification.</p>
                            <div className="flex items-center gap-4 text-[10px] font-black text-on-surface-variant/40 uppercase tracking-widest">
                                <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-sm">calendar_today</span> Oct 28</span>
                                <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-sm">mode_comment</span> 0</span>
                            </div>
                        </div>

                         <div className="md:col-span-4 bg-surface-container-low p-8 rounded-[2.5rem] border-4 border-dashed border-outline-variant/20 flex flex-col items-center justify-center text-center cursor-pointer group hover:bg-surface-container transition-all">
                            <div className="w-16 h-16 rounded-3xl bg-surface-container-high flex items-center justify-center group-hover:scale-110 transition-transform mb-4 shadow-sm">
                                <span className="material-symbols-outlined text-primary text-3xl">history</span>
                            </div>
                            <span className="text-sm font-black text-on-surface uppercase tracking-widest">Dispute Archive</span>
                            <span className="text-[10px] text-on-surface-variant font-bold mt-1">View 14 Resolved Entries</span>
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
                <Link to="/earnings-history-list" className="flex flex-col items-center gap-1 text-on-surface-variant/50">
                    <span className="material-symbols-outlined">receipt_long</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider">Ledger</span>
                </Link>
                <Link to="/my-grievances" className="flex flex-col items-center gap-1 text-primary transition-all">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>diversity_3</span>
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

export default MyGrievancesList;
