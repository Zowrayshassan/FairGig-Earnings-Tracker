import WorkerSidebar from '../../components/WorkerSidebar';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiRequest } from '../../services/api';

const EarningsHistoryList = () => {
    const [earnings, setEarnings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user') || '{}'));
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
            navigate('/');
            return;
        }
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);

        const fetchData = async () => {
            try {
                // Fetch from Port 8001 using the exact ID
                const data = await apiRequest('earnings', `?workerId=${parsedUser.id}`);
                // Sort by date descending
                const sorted = data.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
                setEarnings(sorted);
            } catch (err) {
                console.error("Failed to fetch earnings", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [navigate]);

    const verifiedEarnings = earnings.filter(e => (e.status || '').toLowerCase() === 'verified');
    const pendingEarnings = earnings.filter(e => (e.status || '').toLowerCase() === 'pending');
    
    const totalBalance = verifiedEarnings.reduce((acc, curr) => acc + curr.amount, 0);
    const pendingBalance = pendingEarnings.reduce((acc, curr) => acc + curr.amount, 0);

    const filteredEarnings = earnings.filter(e => 
      e.platform.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return (
        <div className="min-h-screen bg-background flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
        </div>
    );

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
                            <input 
                              className="bg-transparent border-none focus:ring-0 text-sm w-48 p-0" 
                              placeholder="Search entries..." 
                              type="text" 
                              value={searchTerm}
                              onChange={(e) => setSearchTerm(e.target.value)}
                            />
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
                    {/* Header Section */}
                    <header className="mb-12">
                        <p className="text-primary font-bold tracking-widest text-xs uppercase mb-3">Financial Summary</p>
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                            <div className="space-y-4">
                                <h1 className="text-5xl md:text-7xl font-black font-headline tracking-tighter text-on-surface">Earnings History</h1>
                                <p className="text-on-surface-variant max-w-xl text-lg font-medium leading-relaxed">
                                    A transparent, tamper-proof record of your labor. Every hour accounted for, every cent verified in the SQL Ledger.
                                </p>
                            </div>
                             <div className="bg-surface-container-lowest p-8 rounded-[2.5rem] border border-outline-variant/10 shadow-sm flex flex-col items-end min-w-[280px]">
                                <span className="text-on-surface-variant text-xs font-bold uppercase tracking-widest mb-1 opacity-60">Verified Balance</span>
                                <span className="text-5xl font-extrabold text-primary tracking-tighter italic">PKR {totalBalance.toLocaleString()}</span>
                                <div className="flex flex-col items-end gap-1 mt-3">
                                    <div className="flex items-center gap-1.5 text-primary text-xs font-black">
                                        <span className="material-symbols-outlined text-sm">verified</span>
                                        {verifiedEarnings.length} Shifts Audited
                                    </div>
                                    <div className="flex items-center gap-1.5 text-on-surface-variant/40 text-[10px] font-bold uppercase tracking-widest">
                                        <span className="material-symbols-outlined text-xs">pending_actions</span>
                                        PKR {pendingBalance.toLocaleString()} In Transit
                                    </div>
                                </div>
                            </div>
                        </div>
                    </header>

                    {/* Ledger Table */}
                    <div className="bg-surface-container-lowest rounded-[2.5rem] overflow-hidden border border-outline-variant/10 shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="text-on-surface-variant text-[10px] font-black uppercase tracking-[0.2em] bg-surface-container-low/50">
                                        <th className="px-10 py-6">Timestamp & Source</th>
                                        <th className="px-10 py-6">Shift Hours</th>
                                        <th className="px-10 py-6">Net Earnings</th>
                                        <th className="px-10 py-6">Ledger Status</th>
                                        <th className="px-10 py-6 text-right">Verification</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-surface-container-low">
                                    {filteredEarnings.map((entry, idx) => (
                                        <tr key={idx} className="hover:bg-surface-container-low/30 transition-colors group">
                                            <td className="px-10 py-6">
                                                <div className="flex items-center gap-4">
                                                    <div className={`w-10 h-10 rounded-2xl bg-primary-fixed text-on-primary-fixed-variant flex items-center justify-center`}>
                                                        <span className="material-symbols-outlined text-sm">
                                                          {entry.platform.toLowerCase().includes('panda') ? 'delivery_dining' : 'motorcycle'}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-on-surface text-sm">
                                                          {new Date(entry.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                                        </div>
                                                        <div className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest opacity-60">{entry.platform}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-10 py-6 font-bold text-on-surface text-sm">{entry.hoursWorked || 0} hrs</td>
                                            <td className="px-10 py-6 font-black text-primary text-sm">PKR {entry.amount.toLocaleString()}</td>
                                            <td className="px-10 py-6">
                                                <span className={`inline-flex items-center px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${(entry.status || '').toLowerCase() === 'verified' ? 'bg-primary-fixed text-on-primary-fixed-variant' : (entry.status || '').toLowerCase() === 'rejected' ? 'bg-error-container text-on-error-container' : 'bg-surface-container-high text-on-surface-variant'}`}>
                                                    {entry.status || 'PENDING'}
                                                </span>
                                            </td>
                                            <td className="px-10 py-6">
                                                <div className="flex items-center justify-end gap-3 opacity-60 group-hover:opacity-100 transition-opacity">
                                                    {entry.screenshotUrl ? (
                                                        <div className="flex items-center gap-2 group/proof">
                                                            <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700 border border-emerald-200 shadow-sm relative overflow-hidden">
                                                                <img src={`http://127.0.0.1:8001${entry.screenshotUrl}`} alt="Proof" className="w-full h-full object-cover opacity-60 group-hover/proof:opacity-100 transition-opacity" />
                                                                <span className="material-symbols-outlined text-xs absolute pointer-events-none">image</span>
                                                            </div>
                                                            <span className="text-[10px] font-black text-emerald-700 uppercase tracking-tighter">Evidence Secure</span>
                                                        </div>
                                                    ) : (
                                                        <div className="flex items-center gap-2 opacity-30 italic">
                                                            <span className="material-symbols-outlined text-xs">block</span>
                                                            <span className="text-[10px] font-bold uppercase tracking-tighter">No Proof</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {filteredEarnings.length === 0 && (
                                      <tr>
                                        <td colSpan={5} className="px-10 py-20 text-center text-on-surface-variant font-medium">No ledger entries found tracking this platform.</td>
                                      </tr>
                                    )}
                                </tbody>
                            </table>
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
                <Link to="/earnings-history-list" className="flex flex-col items-center gap-1 text-primary">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>receipt_long</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider">Ledger</span>
                </Link>
                <Link to="/my-grievances-list" className="flex flex-col items-center gap-1 text-on-surface-variant/50">
                    <span className="material-symbols-outlined">diversity_3</span>
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

export default EarningsHistoryList;
