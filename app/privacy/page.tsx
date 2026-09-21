import SiteFooter from '../components/site-footer';
import SiteHeader from '../components/site-header';

export default function PrivacyPage() {
  return <main className="inner-page"><SiteHeader/><section className="legal-page"><span className="eyebrow">YOUR PRIVACY</span><h1>Privacy <em>policy.</em></h1><p>We collect only the information needed to manage accounts, respond to requests, and improve the Al-Aroum experience. We never sell personal information.</p><h2>What we collect</h2><p>Account details, contact requests, viewing requests, saved properties, and newsletter subscriptions. Payment information should only be processed through an approved payment provider.</p><h2>How we use it</h2><p>We use your information to provide requested services, communicate about inquiries, protect accounts, and meet legal obligations.</p><h2>Your choices</h2><p>You can request access, correction, or deletion of your data by contacting us through the Contact page.</p></section><SiteFooter/></main>;
}
