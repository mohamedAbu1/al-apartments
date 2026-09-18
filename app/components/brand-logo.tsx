export default function BrandLogo({ compact = false }: { compact?: boolean }) {
  return <span className={`brand-logo ${compact ? 'brand-logo-compact' : ''}`} aria-label="Al-Aroum">
    <svg className="brand-logo-mark" viewBox="0 0 58 58" role="img" aria-hidden="true">
      <defs>
        <linearGradient id="logoFront" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#22e3c2"/><stop offset="1" stopColor="#11a9d4"/></linearGradient>
        <linearGradient id="logoSide" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#0d94c4"/><stop offset="1" stopColor="#07567d"/></linearGradient>
        <linearGradient id="logoRoof" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#7effe3"/><stop offset="1" stopColor="#25cde1"/></linearGradient>
        <filter id="logoShadow" x="-30%" y="-30%" width="160%" height="170%"><feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#00d6d0" floodOpacity=".3"/></filter>
      </defs>
      <path d="M29 4 51 17v25L29 54 7 42V17L29 4Z" fill="#08283b" stroke="#27d8d0" strokeOpacity=".35"/>
      <path d="m29 8 18 11v20L29 50V8Z" fill="url(#logoSide)" opacity=".96"/>
      <path d="M29 8 11 19v20l18 11V8Z" fill="url(#logoFront)" filter="url(#logoShadow)"/>
      <path d="m29 8 18 11-18 11-18-11L29 8Z" fill="url(#logoRoof)"/>
      <path d="M20 36V21l9-6 9 6v15l-9 5-9-5Z" fill="#062338" fillOpacity=".82"/>
      <path d="m29 15 9 6-9 5-9-5 9-6Z" fill="#c9fff2" fillOpacity=".95"/>
      <path d="M24 24h3v12h-3V24Zm7 0h3v12h-3V24Z" fill="#1cd7d0"/>
      <path d="m29 15 9 6v15l-9 5V26l9-5-9-6Z" fill="#0b6c91" opacity=".28"/>
    </svg>
    {!compact && <span className="brand-logo-copy"><strong>Al-Aroum</strong><small>PROPERTY &amp; LAND</small></span>}
  </span>;
}
