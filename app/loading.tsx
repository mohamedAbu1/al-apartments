import BrandLogo from './components/brand-logo';

export default function Loading() {
  return <main className="loading-screen" aria-label="Loading Al-Aroum"><div className="loading-card"><BrandLogo/><div className="loading-orbit"><span/><span/><span/></div><p>Preparing your next place...</p><div className="loading-bar"><i/></div></div></main>;
}
