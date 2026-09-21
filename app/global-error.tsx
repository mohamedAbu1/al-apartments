'use client';

import StatusScreen from './components/status-screen';

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <html lang="en"><body><StatusScreen code="500" eyebrow="TEMPORARILY UNAVAILABLE" title="We are making the route clear." text="The application needs a fresh start. Try again, or return home while we restore the experience." onRetry={reset} action="Reload experience" secondaryHref="/" secondaryLabel="Return home"/></body></html>;
}
