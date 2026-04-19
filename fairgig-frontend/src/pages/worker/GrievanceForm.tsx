import WorkerSidebar from '../../components/WorkerSidebar';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiRequest } from '../../services/api';

const GrievanceForm = () => {
  const [platform, setPlatform] = useState('uber');
  const [category, setCategory] = useState('Commission Hike (Platform Fee Increase)');
  const [description, setDescription] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/');
      return;
    }
    setUser(JSON.parse(storedUser));
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) {
      alert("Please provide a description of the issue.");
      return;
    }

    setIsSubmitting(true);
    try {
      await apiRequest('grievances', '', {
        method: 'POST',
        body: JSON.stringify({
          workerId: user.id,
          platform: platform,
          complaint: description,
          category: category,
          status: 'OPEN',
          isAnonymous: isAnonymous
        })
      });
      
      alert("Grievance filed successfully! It has been documented in the Advocacy Ledger.");
      navigate('/worker');
    } catch (err) {
      console.error("Submission failed", err);
      alert("Failed to submit grievance. Please ensure the Grievance Service is running.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
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

      {/* Main Content Area */}
      <main className="lg:ml-72 min-h-screen pt-12 pb-32 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Header Narrative */}
          <div className="mb-12">
            <span className="text-primary font-bold tracking-widest text-xs uppercase mb-4 block">Grievance Submission</span>
            <h1 className="text-5xl md:text-6xl font-black font-headline tracking-tighter text-on-surface mb-4">Post a Grievance</h1>
            <p className="text-on-surface-variant text-lg leading-relaxed font-medium">
              Your data is your power. Document the platform discrepancies and join a collective ledger of worker rights. We prioritize your privacy and impact.
            </p>
          </div>

          <form className="space-y-12" onSubmit={handleSubmit}>
            {/* Platform Selection */}
            <section>
              <h3 className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-6">Select Platform</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { id: 'uber', name: 'Uber', icon: 'directions_car' },
                  { id: 'foodpanda', name: 'Foodpanda', icon: 'delivery_dining' },
                  { id: 'bykea', name: 'Bykea', icon: 'motorcycle' },
                  { id: 'careem', name: 'Careem', icon: 'local_taxi' },
                  { id: 'deliveroo', name: 'Deliveroo', icon: 'delivery_dining' },
                  { id: 'other', name: 'Other', icon: 'add' },
                ].map(p => (
                  <label key={p.id} className="relative cursor-pointer group" onClick={() => setPlatform(p.id)}>
                    <input className="peer sr-only" name="platform" type="radio" value={p.id} checked={platform === p.id} onChange={() => setPlatform(p.id)} />
                    <div className={`bg-surface-container-lowest border-2 ${platform === p.id ? 'border-primary bg-primary-fixed/20 shadow-lg shadow-primary/10' : 'border-outline-variant/10 shadow-sm'} p-5 rounded-[2rem] transition-all flex flex-col items-center gap-3 hover:bg-surface-container-low`}>
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${platform === p.id ? 'bg-primary text-white' : 'bg-surface-container-high text-primary'}`}>
                        <span className="material-symbols-outlined">{p.icon}</span>
                      </div>
                      <span className="text-xs font-bold text-on-surface">{p.name}</span>
                    </div>
                  </label>
                ))}
              </div>
            </section>

            {/* Category Dropdown */}
            <div className="space-y-3">
              <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.2em]">Grievance Category</label>
              <div className="relative">
                <select 
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-surface-container-low border-none rounded-2xl py-5 px-6 text-on-surface font-bold text-sm lg:text-base appearance-none focus:ring-4 focus:ring-primary/10 transition-all"
                >
                  <option>Commission Hike (Platform Fee Increase)</option>
                  <option>Unfair Deactivation / Account Lock</option>
                  <option>Wage Theft / Missing Earnings</option>
                  <option>Safety Concern / Workplace Hazard</option>
                  <option>Inaccurate GPS / Distance Tracking</option>
                </select>
                <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none">
                  <span className="material-symbols-outlined text-primary">expand_more</span>
                </div>
              </div>
            </div>

            {/* Description Area */}
            <div className="space-y-3">
              <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.2em]">Detailed Description</label>
              <textarea 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-surface-container-low border-none rounded-[2rem] p-8 text-on-surface font-medium focus:ring-4 focus:ring-primary/10 transition-all resize-none placeholder:text-outline-variant" 
                placeholder="Provide a detailed account of the issue..." 
                rows={8}
                required
              ></textarea>
            </div>

            {/* Upload + Anonymity */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.2em]">Supporting Evidence</label>
                <div className="relative h-40 group cursor-pointer opacity-50">
                  <div className="h-full bg-surface-container-lowest border-2 border-dashed border-outline-variant/30 rounded-[2rem] flex flex-col items-center justify-center gap-2">
                    <span className="material-symbols-outlined text-3xl text-primary">add_a_photo</span>
                    <p className="text-xs font-bold text-on-surface-variant">Attachments Coming Soon</p>
                  </div>
                </div>
              </div>

              <div className="bg-surface-container-low rounded-[2rem] p-8 flex flex-col justify-between border border-outline-variant/10">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-on-surface">Post Anonymously</h4>
                    <p className="text-xs text-on-surface-variant mt-1 font-medium">Hide your profile from public view.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input className="sr-only peer" type="checkbox" checked={isAnonymous} onChange={() => setIsAnonymous(!isAnonymous)} />
                    <div className="w-14 h-7 bg-outline-variant rounded-full peer peer-checked:bg-primary after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:after:translate-x-full"></div>
                  </label>
                </div>
                <div className="pt-6 border-t border-outline-variant/10 mt-6 flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>shield</span>
                  <p className="text-[11px] text-on-surface-variant italic font-medium">Encrypted via SQL Advocacy Ledger.</p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-12 text-center">
              <button 
                disabled={isSubmitting}
                className={`w-full bg-primary text-on-primary py-6 rounded-[2.5rem] font-black text-xl font-headline tracking-tighter transition-all shadow-2xl shadow-primary/20 ${isSubmitting ? 'opacity-70 cursor-wait' : 'hover:scale-[1.02] active:scale-95'}`} 
                type="submit"
              >
                {isSubmitting ? 'Documenting...' : 'Submit Grievance'}
              </button>
              <p className="text-on-surface-variant text-[11px] mt-8 font-medium">
                Agreeing to our <a className="underline font-bold text-primary" href="#">Collective Action Policy</a>
              </p>
            </div>
          </form>
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
          <Link to="/post-grievance" className="flex flex-col items-center gap-1 text-primary">
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

export default GrievanceForm;
