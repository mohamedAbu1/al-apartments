'use client';

import { ChevronLeft, ChevronRight, Expand, Image as ImageIcon, X } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function JourneyGallery({ images, title }: { images: string[]; title: string }) {
  const [active, setActive] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const current = images[active] || images[0];
  const move = (direction: number) => setActive((value) => (value + direction + images.length) % images.length);
  useEffect(() => {
    if (!lightboxOpen) return;
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === 'Escape') setLightboxOpen(false); };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [lightboxOpen]);
  return <div className="journey-gallery" aria-label={`${title} gallery`}>
    <div className="journey-gallery-main" style={{ backgroundImage: `linear-gradient(120deg,rgba(3,18,31,.28),rgba(3,18,31,0) 65%),url(${current})` }}>
      <div className="journey-gallery-top"><span><ImageIcon size={14}/> {active + 1} / {images.length}</span><button type="button" aria-label="View full image" onClick={() => setLightboxOpen(true)}><Expand size={16}/></button></div>
      {images.length > 1 && <div className="journey-gallery-controls"><button type="button" onClick={() => move(-1)} aria-label="Previous image"><ChevronLeft size={19}/></button><button type="button" onClick={() => move(1)} aria-label="Next image"><ChevronRight size={19}/></button></div>}
    </div>
    {images.length > 1 && <div className="journey-gallery-thumbs" role="tablist" aria-label="Journey photos">{images.map((image, index) => <button type="button" role="tab" aria-selected={active === index} aria-label={`Show image ${index + 1}`} className={active === index ? 'active' : ''} key={image} onClick={() => setActive(index)}><img src={image} alt=""/></button>)}</div>}
    {lightboxOpen && <div className="journey-lightbox" role="dialog" aria-modal="true" aria-label={`${title} full screen gallery`} onClick={() => setLightboxOpen(false)}><button type="button" className="journey-lightbox-close" aria-label="Close gallery" onClick={() => setLightboxOpen(false)}><X size={22}/></button><img src={current} alt={`${title} image ${active + 1}`} onClick={(event) => event.stopPropagation()}/>{images.length > 1 && <><button type="button" className="journey-lightbox-prev" aria-label="Previous image" onClick={(event) => { event.stopPropagation(); move(-1); }}><ChevronLeft size={24}/></button><button type="button" className="journey-lightbox-next" aria-label="Next image" onClick={(event) => { event.stopPropagation(); move(1); }}><ChevronRight size={24}/></button></>}</div>}
  </div>;
}
