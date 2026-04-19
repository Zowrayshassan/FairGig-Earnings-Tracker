import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const WorkerSidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [user, setUser] = useState<{ id?: string, name?: string, email?: string }>(() => JSON.parse(localStorage.getItem('user') || '{}'));

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleLogout = (e: React.MouseEvent) => {
        e.preventDefault();
        localStorage.clear();
        navigate('/');
    };

    const isActive = (path: string) => location.pathname === path;

    return (
        <aside className="h-screen w-72 fixed left-0 top-0 hidden lg:flex flex-col bg-surface-container-low border-r border-outline-variant/10 py-8 z-40 transition-all">
            <div className="px-6 mb-10 pt-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center overflow-hidden border-2 border-primary/20 shadow-sm">
                        <img alt="User profile" className="w-full h-full object-cover" src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name || 'Worker Portal'}`} />
                    </div>
                    <div className="flex flex-col">
                        <p className="text-sm font-black text-on-surface truncate w-36 font-headline tracking-tight">{user?.name || 'Worker Portal'}</p>
                        <p className="text-[9px] uppercase tracking-widest text-primary font-bold">The Ethical Ledger</p>
                    </div>
                </div>
            </div>

            <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto">
                <Link to="/worker" className={`flex items-center gap-3 px-4 py-3.5 transition-all rounded-xl font-bold text-sm ${isActive('/worker') ? 'bg-primary/10 text-primary' : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'}`}>
                    <span className="material-symbols-outlined text-[20px]" style={isActive('/worker') ? { fontVariationSettings: "'FILL' 1" } : {}}>dashboard</span>
                    <span>Dashboard</span>
                </Link>
                <Link to="/earnings-history-list" className={`flex items-center gap-3 px-4 py-3.5 transition-all rounded-xl font-bold text-sm ${isActive('/earnings-history-list') ? 'bg-primary/10 text-primary' : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'}`}>
                    <span className="material-symbols-outlined text-[20px]" style={isActive('/earnings-history-list') ? { fontVariationSettings: "'FILL' 1" } : {}}>account_balance_wallet</span>
                    <span>Earnings Ledger</span>
                </Link>
                <Link to="/generate-certificate" className={`flex items-center gap-3 px-4 py-3.5 transition-all rounded-xl font-bold text-sm ${isActive('/generate-certificate') ? 'bg-primary/10 text-primary' : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'}`}>
                    <span className="material-symbols-outlined text-[20px]" style={isActive('/generate-certificate') ? { fontVariationSettings: "'FILL' 1" } : {}}>verified</span>
                    <span>Verification</span>
                </Link>
                <Link to="/post-grievance" className={`flex items-center gap-3 px-4 py-3.5 transition-all rounded-xl font-bold text-sm ${isActive('/post-grievance') || isActive('/my-grievances') ? 'bg-primary/10 text-primary' : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'}`}>
                    <span className="material-symbols-outlined text-[20px]" style={isActive('/post-grievance') || isActive('/my-grievances') ? { fontVariationSettings: "'FILL' 1" } : {}}>campaign</span>
                    <span>Advocacy Hub</span>
                </Link>
                <Link to="/community" className={`flex items-center gap-3 px-4 py-3.5 transition-all rounded-xl font-bold text-sm opacity-50 cursor-not-allowed ${isActive('/community') ? 'bg-primary/10 text-primary' : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'}`}>
                    <span className="material-symbols-outlined text-[20px]" style={isActive('/community') ? { fontVariationSettings: "'FILL' 1" } : {}}>groups</span>
                    <span>Community</span>
                </Link>
            </nav>

            <div className="px-6 mt-auto pt-6 border-t border-outline-variant/10 flex flex-col gap-2">
                <button className="w-full py-4 px-4 bg-primary text-on-primary rounded-xl font-black text-sm hover:bg-primary-container hover:text-primary-container-on transition-all shadow-md shadow-primary/20 active:scale-[0.98]">
                    Export Data
                </button>
                <div className="flex items-center justify-between mt-4">
                    <button className="flex items-center gap-2 px-2 py-2 text-on-surface-variant/70 hover:text-on-surface transition-all text-xs font-bold">
                        <span className="material-symbols-outlined text-[16px]">help</span>
                        Help Center
                    </button>
                    <button onClick={handleLogout} className="flex items-center gap-2 px-2 py-2 text-error hover:bg-error/10 hover:text-error rounded-lg transition-all text-xs font-bold">
                        <span className="material-symbols-outlined text-[16px]">logout</span>
                        Logout
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default WorkerSidebar;
