'use client';

import StatusScreen from './components/status-screen';

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <StatusScreen code="500" eyebrow="A SMALL DETOUR" title="Something interrupted the journey." text="We could not finish loading this page. Try again, and if the problem continues, return to the home page and start fresh." onRetry={reset} action="Try again" secondaryHref="/" secondaryLabel="Return home"/>;
}
