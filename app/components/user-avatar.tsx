'use client';

import { useState } from 'react';

export default function UserAvatar({ name, src, size = 'md', className = '' }: { name?: string | null; src?: string | null; size?: 'sm' | 'md' | 'lg'; className?: string }) {
  const [failed, setFailed] = useState(false);
  const initials = (name || 'Montu').trim().split(/\s+/).slice(0, 2).map((part) => part[0]).join('').toUpperCase() || 'M';
  return <span className={`user-avatar user-avatar-${size} ${failed || !src ? 'user-avatar-generated' : ''} ${className}`} aria-label={`${name || 'User'} avatar`}>
    {src && !failed ? <img src={src} alt="" onError={() => setFailed(true)} /> : <><i className="user-avatar-orbit user-avatar-orbit-one"/><i className="user-avatar-orbit user-avatar-orbit-two"/><b>{initials}</b></>}
  </span>;
}
