import WorkerSidebar from '../../components/WorkerSidebar';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiRequest } from '../../services/api';

const EarningsLogger = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [user] = useState(() => JSON.parse(localStorage.getItem('user') || '{"id":"1", "name":"Ahmed Khan"}'));

    const [formData, setFormData] = useState({
        platform: '',
        date: new Date().toISOString().split('T')[0],
        hours: '',
        amount: '',
        deductions: '0',
    });
    const [screenshot, setScreenshot] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const nextStep = () => {
        if (step === 1 && (!formData.platform || !formData.date || !formData.hours)) {
            setError("Please fill in all shift details.");
            return;
        }
        if (step === 2 && !formData.amount) {
            setError("Please enter your gross earnings.");
            return;
        }
        setError(null);
        setStep(step + 1);
    };

    const prevStep = () => setStep(step - 1);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsUploading(true);
        setError(null);

        try {
            let screenshotUrl = null;

            // 1. Upload Screenshot if exists
            if (screenshot) {
                const uploadFormData = new FormData();
                uploadFormData.append('file', screenshot);
                const uploadRes = await apiRequest('earnings', '/upload', {
                    method: 'POST',
                    body: uploadFormData
                });
                screenshotUrl = uploadRes.url;
            }

            const payload = {
                workerId: String(user.id || '1'),
                city: 'Karachi',
                platform: formData.platform,
                amount: parseFloat(formData.amount || '0'),
                deductions: parseFloat(formData.deductions || '0'),
                date: formData.date,
                status: "Pending",
                screenshotUrl: screenshotUrl
            };

            await apiRequest('earnings', '', {
                method: 'POST',
                body: JSON.stringify(payload)
            });
            navigate('/worker');
        } catch (err: any) {
            setError(err.message || "Failed to log shift. Check backend.");
        } finally {
            setIsUploading(false);
        }
    };

    const netPay = (parseFloat(formData.amount || '0') - parseFloat(formData.deductions || '0')).toLocaleString();

    return (
        <div className="bg-background text-on-surface font-body min-h-screen">
            <WorkerSidebar />

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
                </div>
            </header>

            <main className="lg:ml-72 pt-12 pb-32 px-6">
                <div className="max-w-3xl mx-auto transition-all duration-500">
                    <div className="mb-12 text-center lg:text-left">
                        <span className="text-primary font-bold tracking-widest text-xs uppercase mb-4 block tracking-[0.2em]">Step {step} of 3 • Ethical Ledger</span>
                        <h1 className="text-5xl md:text-6xl font-black font-headline tracking-tighter text-on-surface mb-4">Log New Shift</h1>
                        <p className="text-on-surface-variant text-lg leading-relaxed font-medium">
                            {step === 1 && "Start by providing the context of your gig work."}
                            {step === 2 && "The ledger needs accurate financial data to calculate market trends."}
                            {step === 3 && "Verify and commit your shift to the immutable record."}
                        </p>
                    </div>

                    <div className="flex items-center justify-between mb-12 px-8 relative">
                        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-surface-container-high -z-10 -translate-y-1/2"></div>
                        <div className="flex flex-col items-center gap-3">
                            <div className={`h-12 w-12 rounded-2xl flex items-center justify-center font-black transition-all ${step >= 1 ? 'bg-primary text-on-primary shadow-xl shadow-primary/20 scale-110' : 'bg-surface-container-high text-on-surface-variant'}`}>1</div>
                            <span className={`text-[10px] font-black uppercase tracking-widest ${step >= 1 ? 'text-primary' : 'text-on-surface-variant opacity-40'}`}>Context</span>
                        </div>
                        <div className="flex flex-col items-center gap-3">
                            <div className={`h-12 w-12 rounded-2xl flex items-center justify-center font-black transition-all ${step >= 2 ? 'bg-primary text-on-primary shadow-xl shadow-primary/20 scale-110' : 'bg-surface-container-high text-on-surface-variant'}`}>2</div>
                            <span className={`text-[10px] font-black uppercase tracking-widest ${step >= 2 ? 'text-primary' : 'text-on-surface-variant opacity-40'}`}>Financials</span>
                        </div>
                        <div className="flex flex-col items-center gap-3">
                            <div className={`h-12 w-12 rounded-2xl flex items-center justify-center font-black transition-all ${step >= 3 ? 'bg-primary text-on-primary shadow-xl shadow-primary/20 scale-110' : 'bg-surface-container-high text-on-surface-variant'}`}>3</div>
                            <span className={`text-[10px] font-black uppercase tracking-widest ${step >= 3 ? 'text-primary' : 'text-on-surface-variant opacity-40'}`}>Verify</span>
                        </div>
                    </div>

                    {error && (
                        <div className="mb-8 p-4 bg-error/10 border border-error/20 rounded-2xl text-error text-sm font-bold flex items-center gap-3 animate-shake">
                            <span className="material-symbols-outlined">error</span>
                            {error}
                        </div>
                    )}

                    <form className="space-y-10" onSubmit={handleSubmit}>
                        {step === 1 && (
                            <section className="bg-surface-container-lowest p-10 rounded-[2.5rem] shadow-sm border border-outline-variant/10 animate-fade-in">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="p-4 bg-primary-container text-white rounded-[1.25rem]">
                                        <span className="material-symbols-outlined text-3xl">work_history</span>
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-black font-headline tracking-tighter text-on-surface">Shift Information</h2>
                                        <p className="text-xs font-medium text-on-surface-variant">Tell us where and when you worked.</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-60">Platform</label>
                                        <div className="relative">
                                            <select 
                                                name="platform"
                                                value={formData.platform}
                                                onChange={handleInputChange}
                                                className="w-full bg-surface-container-low border-none rounded-2xl py-4 px-5 text-sm font-bold appearance-none focus:ring-4 focus:ring-primary/10 transition-all cursor-pointer"
                                            >
                                                <option value="">Select Platform</option>
                                                <option value="Uber">Uber</option>
                                                <option value="Careem">Careem</option>
                                                <option value="Bykea">Bykea</option>
                                                <option value="Foodpanda">Foodpanda</option>
                                                <option value="InDrive">InDrive</option>
                                                <option value="Cheetay">Cheetay</option>
                                                <option value="Savyour">Savyour</option>
                                            </select>
                                            <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
                                                <span className="material-symbols-outlined text-primary">expand_more</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-60">Shift Date</label>
                                        <input 
                                            type="date" 
                                            name="date"
                                            value={formData.date}
                                            onChange={handleInputChange}
                                            className="w-full bg-surface-container-low border-none rounded-2xl py-4 px-5 text-sm font-bold focus:ring-4 focus:ring-primary/10 transition-all font-body" 
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-60">Hours Worked</label>
                                        <div className="relative">
                                            <input 
                                                type="number" 
                                                name="hours"
                                                value={formData.hours}
                                                onChange={handleInputChange}
                                                className="w-full bg-surface-container-low border-none rounded-2xl py-4 px-5 text-sm font-bold focus:ring-4 focus:ring-primary/10 transition-all" 
                                                placeholder="0.0" 
                                                step="0.5" 
                                            />
                                            <span className="absolute right-5 top-1/2 -translate-y-1/2 text-[10px] font-black uppercase tracking-widest text-on-surface-variant">hrs</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-12 flex justify-end">
                                    <button type="button" onClick={nextStep} className="bg-primary text-on-primary px-10 py-5 rounded-2xl font-black text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">
                                        Save & Continue
                                    </button>
                                </div>
                            </section>
                        )}

                        {step === 2 && (
                            <section className="bg-surface-container-lowest p-10 rounded-[2.5rem] shadow-sm border border-outline-variant/10 animate-slide-up">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="p-4 bg-tertiary text-white rounded-[1.25rem]">
                                        <span className="material-symbols-outlined text-3xl">payments</span>
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-black font-headline tracking-tighter text-on-surface">Financial Ledger</h2>
                                        <p className="text-xs font-medium text-on-surface-variant">Report your earnings and platform fees.</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-60">Gross Earned (PKR)</label>
                                        <input 
                                            type="number" 
                                            name="amount"
                                            value={formData.amount}
                                            onChange={handleInputChange}
                                            className="w-full bg-surface-container-low border-none rounded-2xl py-4 px-5 text-2xl font-black text-primary transition-all focus:ring-4 focus:ring-primary/10" 
                                            placeholder="0" 
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-60">Platform Deductions (PKR)</label>
                                        <input 
                                            type="number" 
                                            name="deductions"
                                            value={formData.deductions}
                                            onChange={handleInputChange}
                                            className="w-full bg-surface-container-low border-none rounded-2xl py-4 px-5 text-2xl font-black text-error/60 transition-all focus:ring-4 focus:ring-error/10" 
                                            placeholder="0" 
                                        />
                                    </div>
                                </div>
                                <div className="mt-8 p-6 bg-surface-container rounded-2xl border border-outline-variant/5">
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs font-black uppercase tracking-widest opacity-60">Net Earnings</span>
                                        <span className="text-3xl font-black text-primary font-headline">PKR {netPay}</span>
                                    </div>
                                </div>
                                <div className="mt-12 flex justify-between">
                                    <button type="button" onClick={prevStep} className="text-on-surface-variant font-bold hover:underline px-4">Back</button>
                                    <button type="button" onClick={nextStep} className="bg-primary text-on-primary px-10 py-5 rounded-2xl font-black text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">
                                        Review Ledger
                                    </button>
                                </div>
                            </section>
                        )}

                        {step === 3 && (
                            <section className="bg-surface-container-lowest p-10 rounded-[2.5rem] shadow-sm border border-outline-variant/10 animate-fade-in shadow-2xl shadow-primary/5">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="p-4 bg-primary text-on-primary rounded-[1.25rem]">
                                        <span className="material-symbols-outlined text-3xl">verified</span>
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-black font-headline tracking-tighter text-on-surface">Commit to Ledger</h2>
                                        <p className="text-xs font-medium text-on-surface-variant">Review your shift context one last time.</p>
                                    </div>
                                </div>
                                
                                <div className="space-y-4 mb-10">
                                    <div className="flex justify-between p-4 bg-surface-container-low rounded-xl">
                                        <span className="text-xs font-bold opacity-60 uppercase tracking-widest">Platform</span>
                                        <span className="font-black text-primary">{formData.platform}</span>
                                    </div>
                                    <div className="flex justify-between p-4 bg-surface-container-low rounded-xl">
                                        <span className="text-xs font-bold opacity-60 uppercase tracking-widest">Date</span>
                                        <span className="font-black">{formData.date}</span>
                                    </div>
                                    
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-60">Upload Proof (Screenshot)</label>
                                        <div 
                                            className="border-2 border-dashed border-primary/30 bg-primary/5 rounded-[2rem] p-12 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-primary/10 transition-all group relative overflow-hidden"
                                            onClick={() => document.getElementById('screenshot-upload')?.click()}
                                        >
                                            <input 
                                                type="file" 
                                                id="screenshot-upload" 
                                                accept="image/*" 
                                                className="hidden" 
                                                onChange={(e) => setScreenshot(e.target.files?.[0] || null)}
                                            />
                                            {screenshot ? (
                                                <div className="flex flex-col items-center animate-bounce-in">
                                                    <span className="material-symbols-outlined text-4xl text-emerald-600 mb-2">check_circle</span>
                                                    <p className="text-sm font-black text-on-surface">{screenshot.name}</p>
                                                    <p className="text-[10px] text-emerald-600 uppercase font-black mt-1">Ready for Ledger Audit</p>
                                                </div>
                                            ) : (
                                                <>
                                                    <div className="flex gap-4 mb-4">
                                                        {/* Mock Placeholder Thumbnails to show what's expected */}
                                                        <div className="w-16 h-20 bg-surface-container rounded-lg border border-outline-variant/20 flex flex-col items-center justify-center gap-1 opacity-40">
                                                            <span className="material-symbols-outlined text-xs">receipt</span>
                                                            <div className="w-8 h-1 bg-outline-variant/30 rounded-full"></div>
                                                            <div className="w-6 h-1 bg-outline-variant/30 rounded-full"></div>
                                                        </div>
                                                        <div className="w-20 h-24 bg-white rounded-xl flex items-center justify-center shadow-xl group-hover:rotate-6 transition-transform border border-primary/10">
                                                            <span className="material-symbols-outlined text-4xl text-primary">add_a_photo</span>
                                                        </div>
                                                        <div className="w-16 h-20 bg-surface-container rounded-lg border border-outline-variant/20 flex flex-col items-center justify-center gap-1 opacity-40">
                                                            <span className="material-symbols-outlined text-xs">dashboard</span>
                                                            <div className="w-8 h-1 bg-outline-variant/30 rounded-full"></div>
                                                            <div className="w-6 h-1 bg-outline-variant/30 rounded-full"></div>
                                                        </div>
                                                    </div>
                                                    <p className="text-lg font-black text-on-surface">Drop Earnings Screenshot</p>
                                                    <p className="text-xs text-on-surface-variant mt-1 font-medium">Platform history page or daily summary proof</p>
                                                    <div className="mt-6 flex gap-2">
                                                        <span className="px-3 py-1 bg-surface-container rounded-full text-[10px] font-bold text-outline uppercase tracking-widest">PNG</span>
                                                        <span className="px-3 py-1 bg-surface-container rounded-full text-[10px] font-bold text-outline uppercase tracking-widest">JPG</span>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex justify-between p-4 bg-primary/5 rounded-xl border border-primary/10">
                                        <span className="text-xs font-bold text-primary uppercase tracking-widest">Immutable Income</span>
                                        <span className="font-black text-primary">PKR {parseFloat(formData.amount).toLocaleString()}</span>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-4">
                                    <button 
                                        type="submit" 
                                        disabled={isUploading}
                                        className="w-full bg-primary text-on-primary py-6 rounded-2xl font-black text-xl font-headline tracking-tighter hover:scale-[1.02] active:scale-95 transition-all shadow-2xl shadow-primary/20 flex items-center justify-center gap-3 disabled:opacity-50"
                                    >
                                        {isUploading ? (
                                            <div className="w-6 h-6 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
                                        ) : (
                                            <>
                                                <span className="material-symbols-outlined">security</span>
                                                Finalize & Commit Shift
                                            </>
                                        )}
                                    </button>
                                    <button type="button" onClick={prevStep} className="w-full py-4 text-on-surface-variant font-bold text-sm hover:underline">
                                        Wait, let me edit something
                                    </button>
                                </div>
                            </section>
                        )}
                    </form>
                </div>
            </main>
        </div>
    );
};

export default EarningsLogger;
