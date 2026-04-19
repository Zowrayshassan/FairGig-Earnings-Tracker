import React from 'react';
import { Link } from 'react-router-dom';

const ForgotPasswordScreenFixed = () => {
  return (
    <>
      
<main className="min-h-screen w-full flex items-center justify-center p-4 md:p-8 relative overflow-hidden">
{/* Subtle Architectural Background Elements */}
<div className="absolute top-[-10%] right-[-10%] w-[40rem] h-[40rem] bg-primary-fixed/20 rounded-full blur-[120px] -z-10"></div>
<div className="absolute bottom-[-5%] left-[-5%] w-[30rem] h-[30rem] bg-secondary-fixed/30 rounded-full blur-[100px] -z-10"></div>
{/* Main Layout Grid */}
<div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
{/* Left Side: Content */}
<div className="w-full max-w-lg mx-auto lg:mx-0">
{/* Brand Anchor */}
<div className="mb-8 text-center lg:text-left">
<h1 className="headline-font text-3xl font-extrabold tracking-tight text-primary">FairGig</h1>
<p className="text-on-surface-variant font-medium mt-1">The Ethical Ledger</p>
</div>
{/* Content Card */}
<div className="bg-surface-container-lowest rounded-[2rem] p-8 md:p-12 shadow-[0_32px_64px_-12px_rgba(24,29,27,0.06)] border border-outline-variant/10">
<header className="mb-10">
<div className="mb-8 inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-surface-container-low text-primary">
<span className="material-symbols-outlined text-3xl" data-icon="lock_reset">lock_reset</span>
</div>
<h2 className="headline-font text-3xl font-bold text-on-surface tracking-tight mb-4">Forgot Password</h2>
<p className="text-on-surface-variant leading-relaxed">
                            No worries, it happens. Please enter the email address associated with your account and we'll send a secure link to reset your password.
                        </p>
</header>
{/* Reset Form */}
<form action="#" className="space-y-8" method="POST">
<div className="space-y-2">
<label className="text-sm font-semibold text-on-surface-variant ml-1" htmlFor="email">Work Email Address</label>
<div className="relative">
<div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-on-surface-variant">
<span className="material-symbols-outlined text-xl" data-icon="mail">mail</span>
</div>
<input className="w-full bg-surface-container-low border-none rounded-xl py-4 pl-12 pr-4 text-on-surface placeholder:text-outline-variant focus:ring-0 focus:bg-surface-container-lowest transition-all duration-300 border-b-2 border-transparent focus:border-primary" id="email" name="email" placeholder="name@fairgig.com" required="" type="email"/>
</div>
</div>
<div className="pt-2">
<button className="w-full bg-gradient-to-br from-primary to-primary-container text-on-primary py-4 px-6 rounded-xl font-bold headline-font text-lg shadow-lg hover:shadow-primary/20 hover:scale-[1.01] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-3" type="submit">
<span>Send Reset Link</span>
<span className="material-symbols-outlined" data-icon="arrow_forward">arrow_forward</span>
</button>
</div>
</form>
<footer className="mt-12 text-center">
<a className="inline-flex items-center gap-2 text-on-surface-variant hover:text-primary font-semibold transition-colors group" href="/login">
<span className="material-symbols-outlined text-lg group-hover:-translate-x-1 transition-transform" data-icon="keyboard_backspace">keyboard_backspace</span>
<span>Back to Login</span>
</a>
</footer>
</div>
{/* Contextual Decorative Visual */}
<div className="mt-12 opacity-40 grayscale hidden md:flex justify-center lg:justify-start gap-8">
<div className="flex flex-col items-center gap-2">
<div className="w-12 h-1 bg-outline-variant/30 rounded-full"></div>
<div className="w-8 h-1 bg-outline-variant/30 rounded-full"></div>
</div>
</div>
</div>
{/* Right Side Visual Support (Properly Separated) */}
<div className="hidden lg:flex justify-center items-center h-full">
<div className="relative w-full max-w-md aspect-square overflow-hidden rounded-[3rem] shadow-2xl">
<img alt="Modern professional workspace" className="w-full h-full object-cover" data-alt="abstract architectural photography showing clean lines of a modern building facade with soft shadows and soft mint green highlights" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBY2havkm2OE2-8TdAl8-AxVu1AVZmCR33elOYZoj42nqYc3Tkv-6tyRt04V-t2Amuxknu8e_Xv5ikf6c_l6eTmLmEnlz-kP2rnhAAThwy7Vodo2xIkm4o43rY64kTWTDxqK757Z1iZlbSXT9_7nplcb0tKjUdoZYJOddtOIz6dKvZx0l89rWoALbYfzN5b8XpYcX_FyElmZV7N6fkQ9fYKAlhlYhtqWo49TJDw6jkbHriwGbiWLTKNPmYdfu9clcfqFqnvaqxb8SwV"/>
<div className="absolute inset-0 bg-primary/10 mix-blend-multiply"></div>
<div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent"></div>
</div>
</div>
</div>
{/* Success Feedback Overlay (Hidden) */}
<div className="fixed inset-0 bg-surface/90 backdrop-blur-md z-50 flex items-center justify-center p-6 hidden">
<div className="bg-surface-container-lowest max-w-md w-full p-10 rounded-[2.5rem] shadow-2xl text-center">
<div className="w-20 h-20 bg-primary-fixed text-on-primary-fixed-variant rounded-full flex items-center justify-center mx-auto mb-8">
<span className="material-symbols-outlined text-5xl" data-icon="mark_email_read" style={{ fontVariationSettings: "'FILL' 1" }}>mark_email_read</span>
</div>
<h3 className="headline-font text-2xl font-bold text-on-surface mb-4">Check your inbox</h3>
<p className="text-on-surface-variant leading-relaxed mb-8">
                    We've sent a password reset link to your email. Please click the link to create a new password.
                </p>
<button className="w-full bg-secondary text-on-secondary py-4 rounded-xl font-bold">Resend Link</button>
</div>
</div>
</main>

    </>
  );
};

export default ForgotPasswordScreenFixed;
