import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { apiRequest } from '../../services/api';

const EarningsLoggerForm = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<{ type: 'success' | 'error', msg: string } | null>(null);
  
  const [formData, setFormData] = useState({
    platform: '',
    date: new Date().toISOString().split('T')[0],
    hoursWorked: '',
    amount: '',
    deductions: ''
  });
  const [screenshot, setScreenshot] = useState<File | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!formData.platform || !formData.amount || !formData.hoursWorked) {
        setUploadStatus({ type: 'error', msg: 'Please fill in all required fields.' });
        return;
    }

    setIsUploading(true);
    setUploadStatus(null);

    try {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
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

        // 2. Prepare Payload
        const amountNum = parseFloat(formData.amount);
        const deductionsNum = parseFloat(formData.deductions || '0');
        const hoursNum = parseFloat(formData.hoursWorked);

        const payload = {
          workerId: user?.id?.toString() || '1',
          city: user?.city || 'Karachi',
          platform: formData.platform,
          date: formData.date,
          amount: isNaN(amountNum) ? 0 : amountNum,
          deductions: isNaN(deductionsNum) ? 0 : deductionsNum,
          hoursWorked: isNaN(hoursNum) ? 0 : hoursNum,
          status: "Pending",
          screenshotUrl: screenshotUrl
        };

        // 3. Save to Ledger
        await apiRequest('earnings', '', {
            method: 'POST',
            body: JSON.stringify(payload)
        });

        setUploadStatus({ type: 'success', msg: 'Shift saved to ledger! Status: Pending Verification.' });
        // Reset form
        setFormData({ platform: '', date: new Date().toISOString().split('T')[0], hoursWorked: '', amount: '', deductions: '' });
        setScreenshot(null);
    } catch (err: any) {
        setUploadStatus({ type: 'error', msg: err.message });
    } finally {
        setIsUploading(false);
    }
  };

  const handleCSVUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadStatus(null);
    
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const formData = new FormData();
      formData.append('file', file);

      await apiRequest('earnings', `/import?workerId=${user.id || '1'}`, {
        method: 'POST',
        body: formData
      });

      setUploadStatus({ type: 'success', msg: 'CSV logs imported successfully!' });
    } catch (err: any) {
      setUploadStatus({ type: 'error', msg: err.message });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      
{/* TopNavBar */}
{/* ... Header remains same ... */}

{/* Main Content Canvas */}
<main className="max-w-4xl mx-auto px-6 pt-12">
{/* Header & Action Header */}
<div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
<div>
<span className="text-primary font-semibold tracking-wider text-xs uppercase mb-2 block">Ethical Ledger Entry</span>
<h1 className="text-4xl md:text-5xl font-extrabold text-primary tracking-tight leading-tight">Log New Shift</h1>
<p className="text-on-surface-variant mt-2 max-w-md">Contribute your data to the collective ledger. Transparent work for a fair industry.</p>
{uploadStatus && (
    <div className={`mt-4 p-3 rounded-lg text-sm font-bold ${uploadStatus.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>
        {uploadStatus.msg}
    </div>
)}
</div>
<div className="flex gap-3">
<div className="relative">
<input 
    type="file" 
    id="csv-upload" 
    accept=".csv" 
    className="hidden" 
    onChange={handleCSVUpload}
    disabled={isUploading}
/>
<label 
    htmlFor="csv-upload" 
    className={`flex items-center gap-2 px-5 py-2.5 bg-surface-container-highest text-on-surface-variant font-semibold rounded-xl hover:bg-surface-variant transition-all active:scale-95 cursor-pointer ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}
>
<span className="material-symbols-outlined text-lg">upload_file</span>
{isUploading ? 'Importing...' : 'Bulk CSV Import'}
</label>
</div>
</div>
</div>
{/* Stepper Visualization */}
<div className="flex items-center justify-between mb-10 px-4 relative">
<div className="absolute top-1/2 left-0 w-full h-0.5 bg-surface-container-high -z-10 -translate-y-1/2"></div>
<div className="flex flex-col items-center gap-2">
<div className="h-10 w-10 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold shadow-lg shadow-primary/20">1</div>
<span className="text-xs font-bold text-primary font-label">Context</span>
</div>
<div className="flex flex-col items-center gap-2">
<div className="h-10 w-10 rounded-full bg-surface-container-high text-on-surface-variant flex items-center justify-center font-bold">2</div>
<span className="text-xs font-medium text-on-surface-variant font-label">Financials</span>
</div>
<div className="flex flex-col items-center gap-2">
<div className="h-10 w-10 rounded-full bg-surface-container-high text-on-surface-variant flex items-center justify-center font-bold">3</div>
<span className="text-xs font-medium text-on-surface-variant font-label">Verify</span>
</div>
</div>
{/* Form Canvas */}
<div className="space-y-8">
{/* Step 1: Work Context Card */}
<section className="bg-surface-container-lowest p-8 md:p-10 rounded-[2rem] shadow-sm transition-all hover:shadow-md">
<div className="flex items-center gap-4 mb-8">
<div className="p-3 bg-primary-container/10 rounded-2xl text-primary-container">
<span className="material-symbols-outlined scale-125" data-icon="work_history">work_history</span>
</div>
<div>
<h2 className="text-xl font-bold text-primary">Shift Information</h2>
<p className="text-sm text-on-surface-variant">Tell us where and when you worked.</p>
</div>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
<div className="space-y-2">
<label className="text-sm font-bold text-on-surface-variant ml-1">Platform</label>
<div className="relative">
<select name="platform" value={formData.platform} onChange={handleInputChange} className="w-full bg-surface-container-low border-none rounded-xl py-3.5 px-4 focus:ring-2 focus:ring-primary appearance-none">
<option value="">Select Platform</option>
<option value="Uber">Uber</option>
<option value="Careem">Careem</option>
<option value="Fiverr">Fiverr</option>
<option value="Upwork">Upwork</option>
<option value="Deliveroo">Deliveroo</option>
</select>
<span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant" data-icon="expand_more">expand_more</span>
</div>
</div>
<div className="space-y-2">
<label className="text-sm font-bold text-on-surface-variant ml-1">Shift Date</label>
<input name="date" value={formData.date} onChange={handleInputChange} className="w-full bg-surface-container-low border-none rounded-xl py-3.5 px-4 focus:ring-2 focus:ring-primary" type="date"/>
</div>
<div className="space-y-2">
<label className="text-sm font-bold text-on-surface-variant ml-1">Hours Worked</label>
<div className="relative">
<input name="hoursWorked" value={formData.hoursWorked} onChange={handleInputChange} className="w-full bg-surface-container-low border-none rounded-xl py-3.5 px-4 focus:ring-2 focus:ring-primary" placeholder="0.0" step="0.5" type="number"/>
<span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-on-surface-variant">hrs</span>
</div>
</div>
</div>
</section>
{/* Step 2: Financial Ledger Card */}
<section className="bg-surface-container-lowest p-8 md:p-10 rounded-[2rem] shadow-sm transition-all hover:shadow-md">
<div className="flex items-center gap-4 mb-8">
<div className="p-3 bg-tertiary-fixed/30 rounded-2xl text-on-tertiary-fixed-variant">
<span className="material-symbols-outlined scale-125" data-icon="payments">payments</span>
</div>
<div>
<h2 className="text-xl font-bold text-primary">Earnings Ledger</h2>
<p className="text-sm text-on-surface-variant">Break down your revenue and platform fees.</p>
</div>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
<div className="space-y-2">
<label className="text-sm font-bold text-on-surface-variant ml-1">Gross Earned</label>
<div className="relative group">
<div className="absolute left-4 top-1/2 -translate-y-1/2 text-primary font-bold">$</div>
<input name="amount" value={formData.amount} onChange={handleInputChange} className="w-full bg-surface-container-low border-none rounded-xl py-4 pl-10 pr-4 focus:ring-2 focus:ring-primary text-xl font-headline font-bold text-primary transition-all" placeholder="0.00" type="number"/>
</div>
</div>
<div className="space-y-2">
<label className="text-sm font-bold text-on-surface-variant ml-1">Total Deductions</label>
<div className="relative">
<div className="absolute left-4 top-1/2 -translate-y-1/2 text-error font-bold">-</div>
<input name="deductions" value={formData.deductions} onChange={handleInputChange} className="w-full bg-surface-container-low border-none rounded-xl py-4 pl-10 pr-4 focus:ring-2 focus:ring-error text-xl font-headline font-bold text-error/80 transition-all" placeholder="0.00" type="number"/>
</div>
<p className="text-[10px] text-on-surface-variant px-1 italic">Includes platform fees, fuel, and equipment.</p>
</div>
<div className="md:col-span-2 lg:col-span-1 bg-primary-container/5 rounded-2xl p-6 flex flex-col justify-center border border-primary/5">
<span className="text-xs font-bold text-primary tracking-widest uppercase mb-1">Calculated Net Pay</span>
<div className="flex items-baseline gap-1">
<span className="text-3xl font-extrabold text-primary font-headline">₨ {(parseFloat(formData.amount || '0') - parseFloat(formData.deductions || '0')).toLocaleString()}</span>
<span className="text-sm font-medium text-primary/60">USD</span>
</div>
</div>
</div>
</section>
{/* Step 3: Verification Card (Upload) */}
<section className="bg-surface-container-lowest p-8 md:p-10 rounded-[2rem] shadow-sm transition-all hover:shadow-md">
<div className="flex items-center gap-4 mb-6">
<div className="p-3 bg-primary-fixed/40 rounded-2xl text-on-primary-fixed-variant">
<span className="material-symbols-outlined scale-125" data-icon="verified_user">verified_user</span>
</div>
<div>
<h2 className="text-xl font-bold text-primary">Verification Proof</h2>
<p className="text-sm text-on-surface-variant">Upload a screenshot of your platform dashboard for verification.</p>
</div>
</div>
{/* Drag and Drop Area */}
<div 
  className="border-2 border-dashed border-outline-variant/30 bg-surface-container-low/50 rounded-3xl p-10 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-surface-container-low transition-all group relative"
  onClick={() => document.getElementById('screenshot-upload')?.click()}
>
<input 
    type="file" 
    id="screenshot-upload" 
    accept="image/*" 
    className="hidden" 
    onChange={(e) => setScreenshot(e.target.files?.[0] || null)}
/>
<div className="h-16 w-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 group-hover:scale-110 transition-transform">
<span className="material-symbols-outlined text-3xl text-primary" data-icon="cloud_upload">cloud_upload</span>
</div>
<p className="text-on-surface font-semibold">{screenshot ? screenshot.name : 'Drop your screenshot here'}</p>
<p className="text-sm text-on-surface-variant mt-1">or <span className="text-primary font-bold underline">browse files</span> from your device</p>
<p className="text-[10px] text-outline mt-6 uppercase tracking-widest">{screenshot ? 'Click to change' : 'Supports PNG, JPG (Max 5MB)'}</p>
</div>
</section>
{/* Final Actions */}
<div className="flex flex-col md:flex-row gap-4 pt-6">
<button 
  onClick={handleSave}
  disabled={isUploading}
  className="flex-1 py-5 bg-primary text-on-primary rounded-[1.25rem] font-bold text-lg shadow-xl shadow-primary/20 hover:bg-primary-container transition-all active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-50"
>
<span className="material-symbols-outlined" data-icon="save">save</span>
                    {isUploading ? 'Saving...' : 'Save Shift to Ledger'}
                </button>
<button className="px-8 py-5 bg-surface-container-high text-on-surface-variant rounded-[1.25rem] font-bold text-lg hover:bg-surface-variant transition-all active:scale-[0.98]">
                    Clear Form
                </button>
</div>
</div>
</main>
{/* Bottom Navigation (Mobile Only) */}
<nav className="fixed bottom-0 left-0 w-full flex justify-around items-center px-4 pb-8 pt-3 bg-white/80 dark:bg-emerald-950/80 backdrop-blur-2xl rounded-t-[2rem] lg:hidden z-50 shadow-[0_-4px_24px_rgba(0,0,0,0.04)]">
<a className="flex flex-col items-center justify-center text-emerald-800/50" href="#">
<span className="material-symbols-outlined mb-1" data-icon="home">home</span>
<span className="text-[11px] font-medium font-body">Home</span>
</a>
<a className="flex flex-col items-center justify-center bg-primary text-white rounded-2xl px-5 py-2" href="#">
<span className="material-symbols-outlined mb-1" data-icon="receipt_long">receipt_long</span>
<span className="text-[11px] font-medium font-body">Ledger</span>
</a>
<a className="flex flex-col items-center justify-center text-emerald-800/50" href="#">
<span className="material-symbols-outlined mb-1" data-icon="diversity_3">diversity_3</span>
<span className="text-[11px] font-medium font-body">Impact</span>
</a>
<a className="flex flex-col items-center justify-center text-emerald-800/50" href="#">
<span className="material-symbols-outlined mb-1" data-icon="person">person</span>
<span className="text-[11px] font-medium font-body">Profile</span>
</a>
</nav>
{/* Visual Accent Element */}
<div className="fixed top-0 right-0 -z-10 w-1/3 h-1/2 bg-gradient-to-br from-primary-container/10 to-transparent blur-3xl opacity-50 pointer-events-none"></div>
<div className="fixed bottom-0 left-0 -z-10 w-1/4 h-1/3 bg-gradient-to-tr from-tertiary-fixed/10 to-transparent blur-3xl opacity-50 pointer-events-none"></div>

    </>
  );
};

export default EarningsLoggerForm;
