import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiRequest } from '../../services/api';

const Login = () => {
  const [role, setRole] = useState<'Worker' | 'Verifier' | 'Advocate'>('Worker');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const data = await apiRequest('auth', '/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      });

      // Save tokens and user info (SOFTEC Token Refresh Compliance)
      localStorage.setItem('token', data.token);
      localStorage.setItem('refreshToken', data.refreshToken);
      localStorage.setItem('user', JSON.stringify(data.user));

      console.log(`Log in successful for role: ${data.user.role}`);
      
      // Navigate based on data from server
      if (data.user.role === 'Worker') navigate('/worker');
      else if (data.user.role === 'Verifier') navigate('/verifier');
      else if (data.user.role === 'Advocate') navigate('/advocate');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background font-body text-on-surface min-h-screen flex items-center justify-center p-6 sm:p-12 relative overflow-hidden">
      {/* Visual Embellishments */}
      <div className="fixed top-0 right-0 -z-10 w-1/3 h-1/3 bg-primary/5 blur-[120px] rounded-full"></div>
      <div className="fixed bottom-0 left-0 -z-10 w-1/2 h-1/2 bg-primary/3 blur-[100px] rounded-full"></div>

      <main className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10">
        {/* Brand Narrative Section (Left Desktop) */}
        <div className="hidden lg:flex flex-col gap-8 pr-12">
          <header className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>account_balance_wallet</span>
              <h1 className="font-headline font-extrabold text-4xl text-primary tracking-tight">FairGig</h1>
            </div>
            <p className="font-headline text-on-surface-variant text-xl">The Ethical Ledger</p>
          </header>
          
          <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-2xl shadow-on-surface/5">
            <img 
               alt="Worker checking digital ledger" 
               className="absolute inset-0 w-full h-full object-cover" 
               src="https://lh3.googleusercontent.com/aida-public/AB6AXuDMByWzUFVrF_QI5_mo3IIzUojlfaI-QPpEAkqOtlYoW9bXDAuf-Lui--7l-Yf9W6Uy_aHQTdvMeX9LkpfGX-hu04iaQZVc6LiSUUJIN_c2gd_0Rntcojut6OJ7DNi1sZLXZ_EKGT1UaTSC36h1HyZovKHLzb1RZfpRDoJkywPD94cvydGU6G7xlaM2E5LDe0Z36F3fR1Nk0x0R0KrEcWzSSR0pU-9_kqBse_mRfFu9uGMNopT9JBaEKamr4GtG5rTNQJ4Rhs5Jg5hf"
            />
            <div className="absolute inset-0 bg-primary/20 backdrop-blur-[2px]"></div>
            <div className="absolute bottom-8 left-8 right-8 p-6 bg-surface/70 backdrop-blur-xl rounded-2xl">
              <p className="font-headline font-semibold text-primary leading-tight text-lg italic">
                "Transparency is the foundation of dignity in the gig economy."
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-surface-container-low p-4 rounded-2xl">
              <p className="text-primary font-headline font-bold text-2xl">100%</p>
              <p className="text-on-surface-variant text-xs font-medium uppercase tracking-wider">Verifiable</p>
            </div>
            <div className="bg-surface-container-low p-4 rounded-2xl">
              <p className="text-primary font-headline font-bold text-2xl">Fair</p>
              <p className="text-on-surface-variant text-xs font-medium uppercase tracking-wider">Advocacy</p>
            </div>
            <div className="bg-surface-container-low p-4 rounded-2xl">
              <p className="text-primary font-headline font-bold text-2xl">24/7</p>
              <p className="text-on-surface-variant text-xs font-medium uppercase tracking-wider">Support</p>
            </div>
          </div>
        </div>

        {/* Login Form Section (Right/Mobile) */}
        <div className="flex justify-center lg:justify-start w-full">
          <div className="w-full max-w-md bg-surface-container-lowest p-8 sm:p-12 rounded-[2.5rem] shadow-sm">
            {/* Mobile Branding */}
            <div className="lg:hidden flex flex-col items-center mb-8 gap-2">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>account_balance_wallet</span>
                <h1 className="font-headline font-extrabold text-2xl text-primary tracking-tight">FairGig</h1>
              </div>
              <p className="text-on-surface-variant text-sm font-medium">Track your gig earnings fairly</p>
            </div>
            
            <div className="mb-10 text-center lg:text-left">
              <h2 className="font-headline text-3xl font-bold text-on-surface mb-2">Welcome Back</h2>
              <p className="text-on-surface-variant font-body">Sign in to your ethical ledger</p>
              {error && <p className="mt-4 text-sm text-red-500 bg-red-50 p-2 rounded-lg border border-red-100">{error}</p>}
            </div>
            
            <form className="space-y-6" onSubmit={handleLogin}>
              {/* Role Selector */}
              <div className="space-y-3">
                <label className="text-sm font-semibold text-on-surface-variant ml-1">Account Type</label>
                <div className="flex bg-surface-container-low p-1.5 rounded-2xl gap-1">
                  {(['Worker', 'Verifier', 'Advocate'] as const).map((r) => (
                    <button 
                      key={r}
                      type="button"
                      onClick={() => setRole(r)}
                      className={`flex-1 py-2.5 rounded-xl text-sm transition-all ${role === r ? 'font-semibold bg-surface-container-lowest text-primary shadow-sm' : 'font-medium text-on-surface-variant hover:bg-surface-container-high'}`}
                    >
                        {r}
                    </button>
                  ))}
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-on-surface-variant ml-1" htmlFor="email">Email Address</label>
                <div className="relative">
                  <input 
                    className="w-full bg-surface-container-low border-none rounded-2xl px-5 py-4 focus:bg-white focus:ring-0 focus:border-b-2 focus:border-primary font-body text-on-surface transition-all placeholder:text-on-surface-variant/40" 
                    id="email" 
                    placeholder="name@fairgig.com" 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <label className="text-sm font-semibold text-on-surface-variant" htmlFor="password">Password</label>
                  <Link className="text-xs font-semibold text-primary hover:underline underline-offset-4" to="/forgot-password">Forgot Password?</Link>
                </div>
                <div className="relative">
                  <input 
                    className="w-full bg-surface-container-low border-none rounded-2xl px-5 py-4 focus:bg-white focus:ring-0 focus:border-b-2 focus:border-primary font-body text-on-surface transition-all placeholder:text-on-surface-variant/40" 
                    id="password" 
                    placeholder="••••••••" 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 space-y-4">
                <button 
                  disabled={loading}
                  className="w-full bg-gradient-to-br from-[#00513f] to-[#006b54] text-white py-4 px-6 rounded-2xl font-headline font-bold text-lg hover:shadow-xl hover:shadow-primary/20 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed" 
                  type="submit"
                >
                    {loading ? 'Authenticating...' : 'Sign In'}
                </button>
                
                <div className="relative flex items-center py-2">
                  <div className="flex-grow border-t border-outline-variant/30"></div>
                  <span className="flex-shrink mx-4 text-on-surface-variant/50 text-xs font-medium">NEW TO FAIRGIG?</span>
                  <div className="flex-grow border-t border-outline-variant/30"></div>
                </div>
                
                <Link to="/signup" className="block w-full text-center bg-surface-container-low text-primary py-4 px-6 rounded-2xl font-headline font-bold text-lg hover:bg-secondary-container transition-all active:scale-[0.98]">
                    Sign Up
                </Link>
              </div>
            </form>
            
            <footer className="mt-12 text-center">
              <p className="text-xs text-on-surface-variant/60 leading-relaxed">
                  By continuing, you agree to FairGig's <a className="underline" href="#">Terms of Service</a> and <a className="underline" href="#">Privacy Policy</a>. Built for worker equity.
              </p>
            </footer>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
