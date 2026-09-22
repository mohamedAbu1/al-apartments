import InnerPage from '../components/inner-page';
import type { AppSection } from '../lib/routes';
export default async function AboutPage({ searchParams }: { searchParams: Promise<{ mode?: string }> }) {
  const mode = (await searchParams).mode;
  const section: AppSection | 'default' = mode === 'trip' || mode === 'stay' || mode === 'buy-home' || mode === 'land' ? mode : 'default';
  const content = section === 'land' ? {
    eyebrow: 'LAND, MADE CLEAR',
    title: <>Land should<br/><em>move you forward.</em></>,
    description: 'Al-Aroum brings clarity to land opportunities through realistic potential, local context, and the details that support a sound decision.',
    cards: [
      { title: 'Clear potential', text: 'Understand use, access, documents, and the opportunity before you move.', image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=900&q=90' },
      { title: 'Grounded decisions', text: 'Every opportunity is shaped around the facts that matter on the ground.', image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=900&q=90' },
      { title: 'Human guidance', text: 'A clearer conversation from the first question to the next step.', image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=90' },
    ],
  } : {
    eyebrow: 'OUR STORY',
    title: <>Travel should<br/><em>feel like you.</em></>,
    description: 'Al-Aroum brings together thoughtful places, local experiences, and the confidence to go somewhere new.',
    cards: [
      { title: 'Curated with care', text: 'Every place is selected for the details that make a stay feel special.', image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=900&q=90' },
      { title: 'People first', text: 'We believe the best journeys begin with a human recommendation.', image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=90' },
      { title: 'Built for discovery', text: 'A calmer way to find the places you have been looking for.', image: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=90' },
    ],
  };
  return <InnerPage section={section} eyebrow={content.eyebrow} title={content.title} description={content.description} cards={content.cards}/>;
}
