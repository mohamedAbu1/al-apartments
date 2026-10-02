'use client';

import { LogOut } from 'lucide-react';
import { useState } from 'react';

export default function LogoutButton({ className = '' }: { className?: string }) {
  const [busy, setBusy] = useState(false);
  async function logout() {
    setBusy(true);
    try { await fetch('/api/auth/logout', { method: 'POST' }); } finally { window.location.href = '/?mode=trip'; }
  }
  return <button type="button" className={`logout-button ${className}`} onClick={logout} disabled={busy}><LogOut size={16}/>{busy ? 'Signing out...' : 'Sign out'}</button>;
}
