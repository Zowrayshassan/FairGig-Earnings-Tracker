import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { apiRequest } from '../../services/api';

const ResetPassword = () => {
    const { token } = useParams();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            await apiRequest('auth', '/reset-password', {
                method: 'POST',
                body: JSON.stringify({ token, password })
            });
            setMessage('Your password has been successfully reset.');
            setTimeout(() => navigate('/login'), 3000);
        } catch (err: any) {
            setError(err.message || 'Failed to reset password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-background font-body text-on-surface min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
            <div className="fixed bottom-0 left-0 -z-10 w-1/2 h-1/2 bg-primary/3 blur-[100px] rounded-full"></div>
            
            <div className="w-full max-w-md bg-surface-container-lowest p-8 sm:p-12 rounded-[2.5rem] shadow-sm z-10">
                <header className="mb-10 text-center">
                    <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 rounded-3xl bg-primary/10 flex items-center justify-center">
                            <span className="material-symbols-outlined text-primary text-4xl">key_visualizer</span>
                        </div>
                    </div>
                    <h1 className="font-headline text-3xl font-bold text-on-surface mb-2">New Password</h1>
                    <p className="text-on-surface-variant">Update your security credentials</p>
                </header>

                {message ? (
                    <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-3xl text-center">
                        <span className="material-symbols-outlined text-emerald-500 text-4xl mb-4">verified_user</span>
                        <p className="text-emerald-800 font-medium">{message}</p>
                        <p className="text-emerald-600/70 text-xs mt-4 uppercase tracking-[0.2em] font-black">Redirecting to login...</p>
                    </div>
                ) : (
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {error && (
                            <div className="bg-error-container/10 p-4 rounded-2xl border border-error/10 text-error text-sm font-medium">
                                {error}
                            </div>
                        )}
                        
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-on-surface-variant ml-1" htmlFor="password">Set New Password</label>
                            <input 
                                className="w-full bg-surface-container-low border-none rounded-2xl px-5 py-4 focus:bg-white focus:ring-0 focus:border-b-2 focus:border-primary transition-all" 
                                id="password" 
                                type="password" 
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required 
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-on-surface-variant ml-1" htmlFor="confirm">Confirm New Password</label>
                            <input 
                                className="w-full bg-surface-container-low border-none rounded-2xl px-5 py-4 focus:bg-white focus:ring-0 focus:border-b-2 focus:border-primary transition-all" 
                                id="confirm" 
                                type="password" 
                                placeholder="••••••••"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required 
                            />
                        </div>

                        <button 
                            disabled={loading}
                            className="w-full bg-primary text-white py-4 px-6 rounded-2xl font-headline font-bold text-lg hover:shadow-xl hover:shadow-primary/20 transition-all disabled:opacity-50" 
                            type="submit"
                        >
                            {loading ? 'Updating Credentials...' : 'Update Password'}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ResetPassword;
