'use client';

import { FormEvent, useState } from 'react';

export default function NewsletterForm({ compact = false, label = 'Subscribe' }: { compact?: boolean; label?: string }) {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setState('loading');
    try {
      const response = await fetch('/api/newsletter', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email }) });
      if (!response.ok) throw new Error('newsletter');
      setState('success');
      setEmail('');
    } catch { setState('error'); }
  };
  return <div className={compact ? 'newsletter-form-wrap compact' : 'newsletter-form-wrap'}>
    <form onSubmit={submit} noValidate>
      <input aria-label="Your email address" type="email" required value={email} onChange={(event) => { setEmail(event.target.value); setState('idle'); }} placeholder="Your email address" />
      <button type="submit" disabled={state === 'loading'}>{state === 'loading' ? '...' : label}</button>
    </form>
    {state === 'success' && <p className="form-success" role="status">You are on the list. Thank you.</p>}
    {state === 'error' && <p className="form-error" role="alert">Please try again with a valid email.</p>}
  </div>;
}
