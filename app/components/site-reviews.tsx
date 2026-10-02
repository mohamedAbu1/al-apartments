'use client';

import { MessageCircle, Send, Star } from 'lucide-react';
import { useEffect, useState } from 'react';

type Review = { id: string; name: string; comment: string; rating: number; avatar_url?: string | null };

export default function SiteReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);
  const [signedIn, setSignedIn] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    Promise.all([fetch('/api/site-reviews', { cache: 'no-store' }), fetch('/api/auth/me', { cache: 'no-store' })])
      .then(async ([reviewsResponse, userResponse]) => {
        const reviewData = await reviewsResponse.json();
        setReviews(reviewData.reviews || []);
        setSignedIn(userResponse.ok && Boolean((await userResponse.json()).user));
      })
      .catch(() => setMessage('Reviews will appear here as soon as they are published.'));
  }, []);

  async function submit() {
    setBusy(true); setMessage('');
    try {
      const response = await fetch('/api/site-reviews', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ comment, rating }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Unable to publish your review.');
      setReviews((current) => [data.review, ...current].slice(0, 12)); setComment(''); setMessage('Thank you for sharing your experience.');
    } catch (error) { setMessage(error instanceof Error ? error.message : 'Unable to publish your review.'); }
    finally { setBusy(false); }
  }

  return <section className="site-reviews-section" aria-labelledby="site-reviews-title"><div className="site-reviews-heading"><div><span className="travel-studio-kicker"><MessageCircle size={14}/> TRAVELLER VOICES</span><h2 id="site-reviews-title">What guests say<br/><em>about Montu Travel.</em></h2><p>Independent thoughts from people who planned a stay, journey, or experience with our team.</p></div><div className="site-reviews-score"><strong>{reviews.length ? (reviews.reduce((sum, item) => sum + item.rating, 0) / reviews.length).toFixed(1) : '—'}</strong><span>{reviews.length ? `${reviews.length} guest reviews` : 'Be the first to share'}</span></div></div><div className="site-reviews-grid">{reviews.length ? reviews.map((review) => <article className="site-review-card" key={review.id}><div className="site-review-card-top"><span className="site-review-avatar">{review.name.charAt(0).toUpperCase()}</span><div><strong>{review.name}</strong><small>Verified traveller</small></div><span className="site-review-stars">{Array.from({ length: 5 }, (_, index) => <Star key={index} size={13} fill={index < review.rating ? 'currentColor' : 'none'}/>)}</span></div><p>{review.comment}</p></article>) : <div className="site-reviews-empty"><MessageCircle size={22}/><strong>No guest stories yet.</strong><span>Be the first to share how Montu Travel helped shape your plans.</span></div>}<div className="site-review-form"><div><strong>Share your experience</strong><small>General feedback about Montu Travel</small></div>{signedIn ? <><div className="site-review-rating" aria-label="Choose rating">{Array.from({ length: 5 }, (_, index) => <button type="button" key={index} className={index < rating ? 'active' : ''} onClick={() => setRating(index + 1)} aria-label={`${index + 1} stars`}><Star size={17} fill="currentColor"/></button>)}</div><textarea value={comment} onChange={(event) => setComment(event.target.value)} placeholder="Tell future travellers what stood out..." maxLength={500}/><button type="button" className="primary-cta" onClick={submit} disabled={busy || comment.trim().length < 10}>{busy ? 'Publishing...' : 'Publish review'} <Send size={14}/></button></> : <a href="/login" className="site-review-login">Sign in to write a review <Send size={14}/></a>}{message && <small className="site-review-message" role="status">{message}</small>}</div></div></section>;
}
