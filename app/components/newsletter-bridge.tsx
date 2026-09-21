'use client';

import { useEffect } from 'react';

export default function NewsletterBridge() {
  useEffect(() => {
    const send = async (container: HTMLElement, event?: Event) => {
      if (!container.querySelector('input[type="email"]') || !/subscribe|اشترك/i.test(container.textContent || '')) return;
      event?.preventDefault();
      const input = container.querySelector<HTMLInputElement>('input[type="email"]');
      if (!input?.value) return;
      const button = container.querySelector<HTMLButtonElement>('button');
      if (button) button.disabled = true;
      try {
        const response = await fetch('/api/newsletter', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: input.value }) });
        if (!response.ok) throw new Error('newsletter');
        input.value = '';
        const note = document.createElement('p'); note.className = 'form-success'; note.setAttribute('role', 'status'); note.textContent = 'You are on the list. Thank you.'; container.appendChild(note);
      } catch { const note = document.createElement('p'); note.className = 'form-error'; note.setAttribute('role', 'alert'); note.textContent = 'Please try again with a valid email.'; container.appendChild(note); }
      finally { if (button) button.disabled = false; }
    };
    const onSubmit = (event: Event) => send(event.target as HTMLFormElement, event);
    const onClick = (event: Event) => { const button = event.target as HTMLElement; const container = button.closest<HTMLElement>('.deal-form'); if (container) send(container, event); };
    document.addEventListener('submit', onSubmit); document.addEventListener('click', onClick);
    return () => { document.removeEventListener('submit', onSubmit); document.removeEventListener('click', onClick); };
  }, []);
  return null;
}
