import WorkerSidebar from '../../components/WorkerSidebar';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiRequest } from '../../services/api';

const WorkerProfile = () => {
    const navigate = useNavigate();
    const [user] = useState(() => JSON.parse(localStorage.getItem('user') || '{"name":"Worker", "id":"1", "email":"worker@fairgig.com"}'));
    const [earnings, setEarnings] = useState<any[]>([]);
    const [totalEarnings, setTotalEarnings] = useState(0);

    useEffect(() => {
        const fetchEarnings = async () => {
            try {
                const data = await apiRequest('earnings', `?workerId=${user.id || '1'}`);
                if (Array.isArray(data)) {
                    setEarnings(data.slice(0, 3)); // top 3 recent
                    setTotalEarnings(data.reduce((sum, e) => sum + e.amount, 0));
                }
            } catch (err) {
                console.error("Earnings fetch error", err);
            }
        };
        fetchEarnings();
    }, [user.id]);

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
                        <input className="bg-transparent border-none focus:ring-0 text-sm w-48 p-0" placeholder="Search profiles..." type="text" />
                    </div>
                    <div className="flex gap-1">
                        <button className="material-symbols-outlined p-2 rounded-full hover:bg-surface-container-low transition-colors text-primary">notifications</button>
                        <button className="material-symbols-outlined p-2 rounded-full hover:bg-surface-container-low transition-colors text-primary">settings</button>
                    </div>
                </div>
            </div>
        </header>

        <main className="lg:ml-72 pt-8 pb-32 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Hero Section */}
                <section className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <span className="bg-tertiary-fixed text-on-tertiary-fixed-variant px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-2 border border-tertiary/10">
                                <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
                                Gold Tier Worker
                            </span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-extrabold font-headline tracking-tighter text-primary">
                            {user.name}
                        </h1>
                        <p className="text-on-surface-variant max-w-md text-lg leading-relaxed font-medium">
                            Account: {user.email} <br /> Maintaining a 4.9/5 impact score on FairGig.
                        </p>
                    </div>
                    <div className="hidden md:block">
                        <button className="bg-primary text-on-primary px-8 py-4 rounded-2xl font-bold flex items-center gap-3 hover:bg-primary-container transition-all active:scale-95 shadow-lg shadow-primary/10">
                            <span className="material-symbols-outlined">edit_square</span>
                            Update Profile
                        </button>
                    </div>
                </section>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    {/* Earnings Card */}
                    <div className="md:col-span-8 bg-surface-container-lowest p-8 rounded-[2.5rem] shadow-sm border border-outline-variant/10 flex flex-col justify-between min-h-[320px]">
                        <div>
                            <h3 className="text-on-surface-variant font-bold text-sm uppercase tracking-widest mb-4 opacity-70">Total Verified Earnings</h3>
                            <div className="flex items-baseline gap-2">
                                <span className="text-sm font-bold text-primary">PKR</span>
                                <span className="text-6xl md:text-8xl font-black font-headline tracking-tighter text-primary-container">{totalEarnings.toLocaleString()}</span>
                            </div>
                        </div>
                        <div className="mt-8 bg-surface-container-low rounded-2xl p-6 flex items-center justify-between">
                            <div className="flex flex-col">
                                <span className="text-xs text-on-surface-variant font-bold uppercase tracking-widest opacity-60">Platform Growth</span>
                                <span className="text-xl font-bold text-on-surface">+14.2% This Month</span>
                            </div>
                            <div className="flex items-end gap-1.5 h-12">
                                {[20, 30, 40, 60, 100].map((h, i) => (
                                    <div key={i} className="w-2.5 rounded-full bg-primary" style={{ height: `${h}%`, opacity: (i + 1) / 5 }}></div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Credential Vault */}
                    <div className="md:col-span-4 bg-primary text-on-primary p-8 rounded-[2.5rem] flex flex-col justify-center gap-6 relative overflow-hidden shadow-xl shadow-primary/10">
                        <div className="z-10">
                            <h3 className="text-primary-fixed text-xs font-bold uppercase tracking-widest mb-6 opacity-70">Credential Vault</h3>
                            <div className="space-y-6">
                                {[
                                    { label: 'Platform ID', value: `FG-${user.id}-WF`, icon: 'verified_user' },
                                    { label: 'Verified Email', value: user.email, icon: 'email' },
                                    { label: 'Role', value: user.role || 'Worker', icon: 'shield' },
                                ].map((item, idx) => (
                                    <div key={idx} className="space-y-1">
                                        <label className="text-[10px] uppercase font-bold opacity-60 tracking-wider font-headline">{item.label}</label>
                                        <div className="flex items-center justify-between border-b border-primary-container pb-2">
                                            <span className="font-headline font-bold text-sm">{item.value}</span>
                                            <span className="material-symbols-outlined text-sm opacity-50">{item.icon}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
                    </div>

                    {/* Recent Shifts */}
                    <div className="md:col-span-12 bg-surface-container-low p-10 rounded-[2.5rem] border border-outline-variant/5">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-on-surface font-headline font-extrabold text-3xl tracking-tight">Recent Activity Log</h3>
                            <Link to="/earnings-history-list" className="text-primary font-bold text-sm flex items-center gap-2 hover:underline">
                                View Full History <span className="material-symbols-outlined text-sm">arrow_forward</span>
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {earnings.length > 0 ? earnings.map((shift: any) => (
                                <div key={shift.id} className="bg-surface-container-lowest p-6 rounded-3xl hover:shadow-xl transition-all cursor-pointer group border border-outline-variant/10 shadow-sm">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="p-3 bg-secondary-container rounded-2xl">
                                            <span className="material-symbols-outlined text-on-secondary-container">local_shipping</span>
                                        </div>
                                        <span className="text-[10px] font-bold text-on-surface-variant opacity-60 uppercase tracking-widest">{shift.date}</span>
                                    </div>
                                    <h4 className="font-bold text-lg text-on-surface group-hover:text-primary transition-colors">{shift.platform}</h4>
                                    <p className="text-xs text-on-surface-variant mb-4 font-medium">{shift.city} · Extracted</p>
                                    <div className="flex justify-between items-center pt-5 border-t border-surface-container-low">
                                        <span className="text-sm font-black text-primary">PKR {shift.amount}</span>
                                        <span className="bg-primary-fixed text-on-primary-fixed-variant px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-tighter">Verified</span>
                                    </div>
                                </div>
                            )) : (
                                <p className="text-on-surface-variant">No shifts logged yet.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </main>

        {/* Mobile Bottom Navigation - Standardized */}
        <nav className="fixed bottom-0 w-full rounded-t-[2.5rem] lg:hidden z-50 bg-white shadow-2xl pt-3 pb-8 px-8 flex justify-between border-t border-outline-variant/10">
            <Link to="/worker" className="flex flex-col items-center gap-1 text-on-surface-variant/50">
                <span className="material-symbols-outlined">home</span>
                <span className="text-[10px] font-bold uppercase tracking-wider">Home</span>
            </Link>
            <Link to="/log-earnings" className="flex flex-col items-center gap-1 text-on-surface-variant/50">
                <span className="material-symbols-outlined">receipt_long</span>
                <span className="text-[10px] font-bold uppercase tracking-wider">Ledger</span>
            </Link>
            <Link to="/my-grievances" className="flex flex-col items-center gap-1 text-on-surface-variant/50">
                <span className="material-symbols-outlined">diversity_3</span>
                <span className="text-[10px] font-bold uppercase tracking-wider">Impact</span>
            </Link>
            <Link to="/worker-profile" className="flex flex-col items-center gap-1 text-primary">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>person</span>
                <span className="text-[10px] font-bold uppercase tracking-wider">Profile</span>
            </Link>
        </nav>
    </div>
    );
};

export default WorkerProfile;