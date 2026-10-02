'use client';

import Link from 'next/link';
import { Send, Star } from 'lucide-react';
import { useEffect, useState } from 'react';

type Review = { id: string; name: string | null; comment: string | null; rating: number; time?: string | null };

export default function JourneyReviewForm({ tripId }: { tripId: string }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch(`/api/trip-reviews?tripId=${encodeURIComponent(tripId)}`).then((response) => response.ok ? response.json() : null).then((result) => setReviews(result?.reviews || [])).catch(() => setReviews([]));
    fetch('/api/auth/me').then((response) => response.ok ? response.json() : null).then((result) => setUser(result?.user || null)).catch(() => setUser(null));
  }, [tripId]);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true); setMessage('');
    const response = await fetch('/api/trip-reviews', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ tripId, comment, rating }) });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) setMessage(result.message || 'Unable to save your review.');
    else { setReviews((current) => [result.review, ...current]); setComment(''); setMessage('Your review was published successfully.'); }
    setBusy(false);
  }

  return <div className="journey-review-content">{reviews.length > 0 && <div className="journey-review-list">{reviews.map((review) => <article key={review.id}><div className="journey-review-card-head"><strong>{review.name || 'Traveller'}</strong><span>{'★'.repeat(review.rating)}</span></div><p>{review.comment}</p><small>{review.time || 'Verified traveller'}</small></article>)}</div>}{user ? <form className="journey-review-form" onSubmit={submit}><strong>Share your experience</strong><div className="journey-review-rating" aria-label="Rating">{[1, 2, 3, 4, 5].map((value) => <button type="button" key={value} className={value <= rating ? 'active' : ''} aria-label={`${value} stars`} onClick={() => setRating(value)}><Star size={17} fill="currentColor" /></button>)}</div><textarea value={comment} onChange={(event) => setComment(event.target.value)} placeholder="Tell future travellers what stood out..." minLength={10} maxLength={1000} required/><button className="primary-cta" type="submit" disabled={busy}><Send size={14}/>{busy ? 'Publishing...' : 'Publish review'}</button>{message && <small className="journey-review-message">{message}</small>}</form> : <Link href="/login" className="journey-review-login">Sign in to write a review</Link>}</div>;
}
