import Link from 'next/link';
import { ArrowLeft, Mail } from 'lucide-react';
import SiteHeader from '../components/site-header';

export default function ForgotPasswordPage() {
  return <main className="app-shell min-h-screen"><SiteHeader minimal/><div className="grid min-h-[calc(100vh-90px)] place-items-center px-5 py-10"><div className="w-full max-w-md"><Link href="/login" className="auth-back"><ArrowLeft size={15}/> Back to sign in</Link><div className="auth-card professional-auth-card"><div className="auth-brand"><span>A</span><div><strong>Al-Aroum</strong><small>PROPERTY & LAND</small></div></div><p className="teal-text mb-2 text-sm font-bold">Account recovery</p><h1 className="display-title text-4xl font-bold">Reset your password</h1><p className="muted-text mt-3 leading-7">Enter your email and we will send you a secure reset link.</p><label className="auth-label mt-7"><Mail size={16}/> Email address</label><input className="mt-2 w-full" type="email" placeholder="name@example.com"/><button className="gradient-button mt-5 w-full rounded-full px-5 py-3 font-bold">Send reset link</button></div></div></div></main>;
}
