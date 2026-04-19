import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiRequest } from '../../services/api';

const SignUp = () => {
  const [role, setRole] = useState<'Worker' | 'Verifier' | 'Advocate'>('Worker');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await apiRequest('auth', '/register', {
        method: 'POST',
        body: JSON.stringify({ name, email, password, role })
      });
      console.log('Registration successful');
      navigate('/'); // Go back to login
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background selection:bg-primary-fixed selection:text-on-primary-fixed min-h-screen flex flex-col md:flex-row font-body text-on-surface">
      {/* Left Brand Section */}
      <div className="hidden md:flex md:w-1/3 lg:w-2/5 relative bg-primary overflow-hidden items-center justify-center p-12">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-primary-fixed-dim blur-[120px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-primary-container blur-[120px]"></div>
        </div>
        
        <div className="relative z-10 max-w-md">
          <div className="mb-12">
            <span className="text-primary-fixed font-headline font-extrabold text-3xl tracking-tighter">FairGig</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-headline font-extrabold text-white leading-tight mb-6">
            The Ethical Ledger for Global Labor.
          </h1>
          <p className="text-primary-fixed/80 text-lg font-body leading-relaxed mb-8">
            Join a transparent ecosystem where every hour is accounted for and every worker is valued. Secure your earnings on a ledger that cannot be altered.
          </p>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-primary-container p-3 rounded-xl">
                <span className="material-symbols-outlined text-primary-fixed">verified</span>
              </div>
              <div>
                <h3 className="text-white font-semibold">Verified Identity</h3>
                <p className="text-primary-fixed/60 text-sm">Blockchain-backed credentials for every participant.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-primary-container p-3 rounded-xl">
                <span className="material-symbols-outlined text-primary-fixed">account_balance_wallet</span>
              </div>
              <div>
                <h3 className="text-white font-semibold">Instant Settlement</h3>
                <p className="text-primary-fixed/60 text-sm">Direct, transparent payment flows without middlemen.</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-12 left-12 right-12">
          <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
            <div className="h-full w-1/4 bg-primary-fixed"></div>
          </div>
          <div className="mt-4 flex justify-between text-xs font-label uppercase tracking-widest text-primary-fixed/40">
            <span>Registration</span>
            <span>Step 01 of 04</span>
          </div>
        </div>
      </div>

      {/* Right Form Section */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-24 bg-surface">
        <div className="max-w-xl mx-auto w-full">
          <div className="md:hidden mb-8">
            <span className="text-primary font-headline font-extrabold text-2xl tracking-tighter">FairGig</span>
          </div>
          
          <div className="mb-10">
            <h2 className="text-3xl font-headline font-extrabold text-on-surface tracking-tight mb-2">Create your account</h2>
            <p className="text-on-surface-variant font-body">Already have an account? <Link to="/" className="text-primary font-semibold hover:underline">Log in</Link></p>
            {error && <p className="mt-4 text-sm text-red-500 bg-red-50 p-2 rounded-lg border border-red-100">{error}</p>}
          </div>
          
          <form className="space-y-6" onSubmit={handleRegister}>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-label font-semibold text-on-surface mb-2">Full Name</label>
                <input 
                  className="w-full px-4 py-3 bg-surface-container-low border-none rounded-xl focus:bg-surface-container-lowest focus:ring-0 focus:outline-none focus:ring-2 focus:ring-primary transition-all text-on-surface placeholder:text-outline-variant" 
                  placeholder="Enter your legal name" 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-label font-semibold text-on-surface mb-2">Email Address</label>
                <input 
                  className="w-full px-4 py-3 bg-surface-container-low border-none rounded-xl focus:bg-surface-container-lowest focus:ring-0 focus:outline-none focus:ring-2 focus:ring-primary transition-all text-on-surface placeholder:text-outline-variant" 
                  placeholder="name@company.com" 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="py-4">
              <label className="block text-sm font-label font-semibold text-on-surface mb-4">Choose Your Role</label>
              <div className="grid grid-cols-3 gap-3">
                {(['Worker', 'Verifier', 'Advocate'] as const).map((r) => {
                   const isWorker = r === 'Worker';
                   const isVerifier = r === 'Verifier';
                   const icon = isWorker ? 'engineering' : isVerifier ? 'verified_user' : 'campaign';
                   const active = role === r;

                   return (
                      <label key={r} onClick={() => setRole(r)} className={`relative flex flex-col items-center justify-center p-4 border-2 ${active ? 'border-primary bg-primary-container text-white' : 'border-transparent bg-surface-container-low text-on-surface hover:bg-surface-container'} rounded-2xl cursor-pointer transition-all group`}>
                         <span className={`material-symbols-outlined mb-2 ${active ? 'text-primary-fixed' : ''}`}>{icon}</span>
                         <span className="text-xs font-semibold uppercase tracking-wider">{r}</span>
                      </label>
                   )
                })}
              </div>
            </div>

            {/* Conditionally rendered Worker Fields */}
            {role === 'Worker' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div>
                  <label className="block text-sm font-label font-semibold text-on-surface mb-2">Phone Number</label>
                  <div className="flex gap-2">
                    <div className="w-24 px-4 py-3 bg-surface-container-low rounded-xl flex items-center justify-center text-sm font-semibold text-on-surface-variant">
                      +1
                    </div>
                    <input className="flex-1 px-4 py-3 bg-surface-container-low border-none rounded-xl focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-primary transition-all text-on-surface placeholder:text-outline-variant" placeholder="(555) 000-0000" type="tel" />
                  </div>
                  <p className="mt-2 text-xs text-on-surface-variant italic">Required for secure ledger verification</p>
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-label font-semibold text-on-surface mb-2">Password</label>
              <div className="relative">
                <input 
                  className="w-full px-4 py-3 bg-surface-container-low border-none rounded-xl focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-primary transition-all text-on-surface placeholder:text-outline-variant" 
                  placeholder="Create a secure password" 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button className="absolute right-4 top-1/2 -translate-y-1/2 text-outline-variant hover:text-primary" type="button">
                  <span className="material-symbols-outlined text-sm">visibility</span>
                </button>
              </div>
            </div>

            <div className="space-y-4 pt-4">
              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="relative flex items-center justify-center">
                  <input defaultChecked className="peer sr-only" type="checkbox" />
                  <div className="w-6 h-6 rounded-lg bg-surface-container-low peer-checked:bg-primary transition-colors flex items-center justify-center">
                    <span className="material-symbols-outlined text-white text-lg opacity-0 peer-checked:opacity-100 transition-opacity" style={{ fontVariationSettings: "'wght' 700" }}>check</span>
                  </div>
                </div>
                <div className="flex-1">
                  <span className="text-sm font-medium text-on-surface">Verify Email Address</span>
                  <p className="text-xs text-on-surface-variant">A secure link will be sent to confirm your identity.</p>
                </div>
              </label>

              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="relative flex items-center justify-center">
                  <input className="peer sr-only" type="checkbox" />
                  <div className="w-6 h-6 rounded-lg bg-surface-container-low peer-checked:bg-primary transition-colors flex items-center justify-center border border-outline-variant/30 peer-checked:border-primary">
                     <span className="material-symbols-outlined text-white text-lg opacity-0 peer-checked:opacity-100 transition-opacity" style={{ fontVariationSettings: "'wght' 700" }}>check</span>
                  </div>
                </div>
                <span className="text-sm font-medium text-on-surface">I accept the <a className="text-primary hover:underline" href="#">Terms of Service</a> and <a className="text-primary hover:underline" href="#">Privacy Policy</a></span>
              </label>
            </div>

            <div className="pt-6">
              <button 
                disabled={loading}
                className="w-full bg-primary hover:bg-primary-container text-white font-headline font-bold py-4 rounded-xl shadow-lg shadow-primary/10 transition-all active:scale-[0.98] disabled:opacity-50" 
                type="submit"
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
            </div>

            <div className="flex items-center gap-4 py-4">
              <div className="h-px flex-1 bg-surface-container-high"></div>
              <span className="text-xs font-label uppercase tracking-widest text-outline-variant">Or sign up with</span>
              <div className="h-px flex-1 bg-surface-container-high"></div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-2 py-3 px-4 bg-surface-container-lowest border border-outline-variant/20 rounded-xl hover:bg-surface-container-low transition-all font-semibold text-sm" type="button">
                <img alt="Google Logo" className="w-5 h-5" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBosXbPtD_-yVO648xRIkSF0H585CXPnIl-22PP__Ki_mN--Fx9bHAtrNEWZcqtVKwCnlPiFyemNhCBV7Os_K_HWdY3xvk3rpdzjBxKV2mE9tChoEH64dWxzNu2Yzn-P8lcSDBLMJ_3c-Okxo7by-DZGid6ffLXdIApr7DdMDdi4q_Q14ucXHCG1XOX3xz30GGRC6Ongzaxn4_v2id6HqstxMU6p4uY4fyOCPndqjcazPoIOBfDXYTIMs7WC7ix92LOJFS65tl6teJu" />
                Google
              </button>
              <button className="flex items-center justify-center gap-2 py-3 px-4 bg-surface-container-lowest border border-outline-variant/20 rounded-xl hover:bg-surface-container-low transition-all font-semibold text-sm" type="button">
                <span className="material-symbols-outlined text-on-surface" style={{ fontVariationSettings: "'FILL' 1" }}>terminal</span>
                Web3 Auth
              </button>
            </div>
          </form>

          <div className="mt-12 p-6 bg-tertiary-fixed rounded-2xl flex items-center gap-4">
            <span className="material-symbols-outlined text-on-tertiary-fixed-variant">info</span>
            <p className="text-sm font-medium text-on-tertiary-fixed-variant">
              FairGig uses advanced cryptographic ledgers. Your data is encrypted and only shared with your explicit consent.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
