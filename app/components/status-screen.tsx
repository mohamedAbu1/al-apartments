import Link from 'next/link';
import { ArrowLeft, ArrowRight, Compass, Home, RefreshCw, Search } from 'lucide-react';
import BrandLogo from './brand-logo';

type StatusScreenProps = { code: string; eyebrow: string; title: string; text: string; action?: string; href?: string; onRetry?: () => void; secondaryHref?: string; secondaryLabel?: string };

export default function StatusScreen({ code, eyebrow, title, text, action, href, onRetry, secondaryHref, secondaryLabel }: StatusScreenProps) {
  return <main className="status-screen"><div className="status-glow status-glow-one"/><div className="status-glow status-glow-two"/><div className="status-shell"><Link href="/" className="status-brand"><BrandLogo/></Link><div className="status-content"><div className="status-code">{code}</div><span className="status-eyebrow"><Compass size={14}/>{eyebrow}</span><h1>{title}</h1><p>{text}</p><div className="status-actions">{onRetry ? <button type="button" onClick={onRetry} className="status-primary"><RefreshCw size={15}/>{action || 'Try again'}</button> : href && <Link href={href} className="status-primary">{action || 'Back to home'}<ArrowRight size={15}/></Link>}{secondaryHref && <Link href={secondaryHref} className="status-secondary">{secondaryLabel || 'Explore the site'}<ArrowLeft size={15}/></Link>}</div></div><div className="status-quick-links"><Link href="/"><Home size={14}/> Home</Link><Link href="/search?mode=trip"><Search size={14}/> Find a journey</Link></div></div></main>;
}
