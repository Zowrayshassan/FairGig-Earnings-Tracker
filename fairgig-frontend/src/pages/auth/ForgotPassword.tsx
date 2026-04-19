import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { apiRequest } from '../../services/api';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);
        setError(null);

        try {
            await apiRequest('auth', '/forgot-password', {
                method: 'POST',
                body: JSON.stringify({ email })
            });
            setMessage('A reset link has been generated. Check the backend console for the simulation link.');
        } catch (err: any) {
            setError(err.message || 'Failed to request password reset');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-background font-body text-on-surface min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
            <div className="fixed top-0 right-0 -z-10 w-1/3 h-1/3 bg-primary/5 blur-[120px] rounded-full"></div>
            
            <div className="w-full max-w-md bg-surface-container-lowest p-8 sm:p-12 rounded-[2.5rem] shadow-sm z-10">
                <header className="mb-10 text-center">
                    <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 rounded-3xl bg-primary/10 flex items-center justify-center">
                            <span className="material-symbols-outlined text-primary text-4xl">lock_reset</span>
                        </div>
                    </div>
                    <h1 className="font-headline text-3xl font-bold text-on-surface mb-2">Reset Password</h1>
                    <p className="text-on-surface-variant">Enter your email to recover your ledger access</p>
                </header>

                {message ? (
                    <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-3xl text-center">
                        <span className="material-symbols-outlined text-emerald-500 text-4xl mb-4">check_circle</span>
                        <p className="text-emerald-800 font-medium mb-6">{message}</p>
                        <Link to="/login" className="inline-block px-8 py-3 bg-emerald-600 text-white rounded-2xl font-bold text-sm uppercase tracking-widest shadow-lg shadow-emerald-200">
                            Back to Login
                        </Link>
                    </div>
                ) : (
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {error && (
                            <div className="bg-error-container/10 p-4 rounded-2xl border border-error/10 text-error text-sm font-medium">
                                {error}
                            </div>
                        )}
                        
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-on-surface-variant ml-1" htmlFor="email">Work Email</label>
                            <input 
                                className="w-full bg-surface-container-low border-none rounded-2xl px-5 py-4 focus:bg-white focus:ring-0 focus:border-b-2 focus:border-primary transition-all" 
                                id="email" 
                                type="email" 
                                placeholder="name@fairgig.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required 
                            />
                        </div>

                        <button 
                            disabled={loading}
                            className="w-full bg-primary text-white py-4 px-6 rounded-2xl font-headline font-bold text-lg hover:shadow-xl hover:shadow-primary/20 transition-all disabled:opacity-50" 
                            type="submit"
                        >
                            {loading ? 'Processing...' : 'Generate Reset Link'}
                        </button>

                        <div className="text-center pt-4">
                            <Link to="/login" className="text-sm font-black text-primary hover:underline underline-offset-4">
                                &larr; Back to Login
                            </Link>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ForgotPassword;
