'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ArrowLeft, ArrowRight, Check, Eye, EyeOff, LockKeyhole, Mail, Phone, UserRound } from 'lucide-react';
import { Language, translations } from '../i18n';

type Mode = 'login' | 'register';

export default function AuthForm({ mode, language }: { mode: Mode; language: Language }) {
  const t = translations[language];
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [notice, setNotice] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const isRegister = mode === 'register';
  const passwordScore = [password.length >= 8, /[A-Z]/.test(password), /\d/.test(password), /[^A-Za-z0-9]/.test(password)].filter(Boolean).length;
  const strength = passwordScore >= 4 ? t.strong : passwordScore >= 2 ? t.medium : t.weak;
  const BackIcon = language === 'en' ? ArrowLeft : ArrowRight;

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const nextErrors: Record<string, string> = {};
    const email = String(form.get('email') || '');
    if (!email) nextErrors.email = t.required;
    else if (!/^\S+@\S+\.\S+$/.test(email)) nextErrors.email = t.invalidEmail;
    if (!password) nextErrors.password = t.required;
    if (isRegister && !form.get('fullName')) nextErrors.fullName = t.required;
    if (isRegister && password !== String(form.get('confirmPassword') || '')) nextErrors.confirmPassword = t.passwordMismatch;
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    setNotice('');
    setSubmitting(true);
    try {
      const response = await fetch('/api/auth', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ mode, email, password, fullName: form.get('fullName'), phone: form.get('phone') }) });
      const data = await response.json();
      if (!response.ok) { setErrors({ form: data.message || 'Something went wrong.' }); return; }
      setNotice(isRegister ? t.accountCreated : t.loginSuccess);
    } catch { setErrors({ form: 'Unable to connect to the server.' }); }
    finally { setSubmitting(false); }
  };

  return <div className="auth-form-shell"><Link href="/" className="auth-back"><BackIcon size={15}/> {t.backHome}</Link><div className="auth-card professional-auth-card"><div className="auth-brand"><span>A</span><div><strong>Al-Aroum</strong><small>PROPERTY & LAND</small></div></div><div className="mb-8"><p className="teal-text mb-2 text-sm font-bold">{isRegister ? t.createAccount : t.signIn}</p><h1 className="display-title text-4xl font-bold">{isRegister ? t.createAccount : t.welcomeBack}</h1><p className="muted-text mt-2">{t.authSubtitle}</p></div><form onSubmit={submit} noValidate className="space-y-4">
    {isRegister && <Field name="fullName" label={t.fullName} icon={<UserRound size={17}/>} error={errors.fullName}/>}<Field name="email" label={t.email} type="email" icon={<Mail size={17}/>} error={errors.email}/>{isRegister && <Field name="phone" label={t.phone} type="tel" icon={<Phone size={17}/>} />}<div><label className="auth-label" htmlFor="password"><LockKeyhole size={15}/>{t.password}</label><div className="password-field"><input id="password" name="password" type={showPassword ? 'text' : 'password'} value={password} onChange={(event) => setPassword(event.target.value)} placeholder="••••••••"/><button type="button" aria-label="Toggle password visibility" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff size={17}/> : <Eye size={17}/>}</button></div>{errors.password && <p className="form-error">{errors.password}</p>}{isRegister && password && <div className="password-meter"><div><span>{t.passwordStrength}</span><strong>{strength}</strong></div><i className={`score score-${passwordScore}`}/></div>}</div>{isRegister && <Field name="confirmPassword" label={t.confirmPassword} type="password" icon={<LockKeyhole size={17}/>} error={errors.confirmPassword}/>} {isRegister && <div><label className="auth-label"><span className="check-box"><Check size={12}/></span><input type="checkbox" required/> {t.acceptTerms}</label></div>}{!isRegister && <div className="flex items-center justify-between text-sm"><label className="auth-check"><input type="checkbox" name="remember"/> {t.remember}</label><Link href="/forgot-password" className="teal-text font-bold">{t.forgotPassword}</Link></div>}{errors.form && <p className="form-error">{errors.form}</p>}{notice && <div className="success-notice">{notice}</div>}<button type="submit" disabled={submitting} className="gradient-button w-full rounded-full px-5 py-3.5 font-bold">{submitting ? '...' : isRegister ? t.createAccount : t.signIn}</button></form><div className="auth-divider"><span>{isRegister ? t.alreadyAccount : t.noAccount}</span><Link href={isRegister ? '/login' : '/register'} className="teal-text font-bold">{isRegister ? t.signIn : t.createAccount} <ArrowRight size={14}/></Link></div><p className="demo-notice">{t.demoNotice}</p></div></div>;
}

function Field({ name, label, type = 'text', icon, error }: { name: string; label: string; type?: string; icon: React.ReactNode; error?: string }) {
  return <div><label className="auth-label" htmlFor={name}>{icon}{label}</label><div className="auth-input-wrap"><input id={name} name={name} type={type} placeholder={label}/></div>{error && <p className="form-error">{error}</p>}</div>;
}

