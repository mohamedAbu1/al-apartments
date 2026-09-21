import StatusScreen from './components/status-screen';

export default function NotFound() {
  return <StatusScreen code="404" eyebrow="THE ROAD BENDS HERE" title="This page went somewhere else." text="The page you are looking for is no longer here, or the address may have changed. Let us help you find a better next step." href="/" action="Return home" secondaryHref="/destinations" secondaryLabel="Explore destinations"/>;
}
