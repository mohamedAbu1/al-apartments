'use client';

import { ChevronLeft, ChevronRight, Expand, Image as ImageIcon } from 'lucide-react';
import { useState } from 'react';

export default function JourneyGallery({ images, title }: { images: string[]; title: string }) {
  const [active, setActive] = useState(0);
  const current = images[active] || images[0];
  const move = (direction: number) => setActive((value) => (value + direction + images.length) % images.length);
  return <div className="journey-gallery" aria-label={`${title} gallery`}>
    <div className="journey-gallery-main" style={{ backgroundImage: `linear-gradient(120deg,rgba(3,18,31,.28),rgba(3,18,31,0) 65%),url(${current})` }}>
      <div className="journey-gallery-top"><span><ImageIcon size={14}/> {active + 1} / {images.length}</span><button type="button" aria-label="View full image"><Expand size={16}/></button></div>
      {images.length > 1 && <div className="journey-gallery-controls"><button type="button" onClick={() => move(-1)} aria-label="Previous image"><ChevronLeft size={19}/></button><button type="button" onClick={() => move(1)} aria-label="Next image"><ChevronRight size={19}/></button></div>}
    </div>
    {images.length > 1 && <div className="journey-gallery-thumbs" role="tablist" aria-label="Journey photos">{images.map((image, index) => <button type="button" role="tab" aria-selected={active === index} aria-label={`Show image ${index + 1}`} className={active === index ? 'active' : ''} key={image} onClick={() => setActive(index)}><img src={image} alt=""/></button>)}</div>}
  </div>;
}
