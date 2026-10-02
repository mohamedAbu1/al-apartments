import SiteFooter from '../components/site-footer';
import SiteHeader from '../components/site-header';

const sections = [
  ['Information we collect', 'We collect the information you choose to share with Montu Travel, including your name, email address, phone number, travel preferences, account details, booking requests, and messages sent to our team. We may also receive technical information such as browser type, device information, and pages visited to keep the website secure and improve the experience.'],
  ['How we use your information', 'We use information to create and manage accounts, respond to enquiries, prepare journey proposals, confirm availability, provide customer support, process requests through our trusted partners, and improve our services. We do not sell personal information.'],
  ['Cookies and analytics', 'We use essential cookies to keep the website working and to remember preferences such as language, theme, and session state. Where analytics are enabled, aggregated usage information helps us understand which pages and journeys are useful.'],
  ['Sharing and protection', 'We share only the details needed to fulfil a request with relevant travel planners, accommodation providers, transport partners, or payment providers. We use reasonable technical and organisational safeguards, but no internet transmission can be guaranteed to be completely secure.'],
  ['Your choices', 'You may ask us to access, correct, or delete personal information held about you, subject to legal and operational requirements. You may also opt out of marketing messages at any time. Contact us and include enough detail for us to identify your request.'],
  ['Retention', 'We retain information only for as long as it is needed to provide the requested service, resolve disputes, maintain business records, or meet legal obligations.'],
];

export default function PrivacyPolicyPage() {
  return <main className="inner-page"><SiteHeader section="trip"/><section className="legal-page"><span className="eyebrow">MONTU TRAVEL · YOUR PRIVACY</span><h1>Privacy <em>policy.</em></h1><p className="legal-lead">A clear explanation of how Montu Travel collects, uses, and protects information when you explore Egypt with us.</p><div className="legal-meta"><span>Effective date</span><strong>October 2, 2026</strong></div>{sections.map(([title, text]) => <section key={title}><h2>{title}</h2><p>{text}</p></section>)}<section><h2>Contact the owner</h2><p>If you have a privacy question or want to exercise your rights, contact the owner directly:</p><ul><li><strong>Owner:</strong> Ahmed Youssef Awad</li><li><strong>Phone / WhatsApp:</strong> <a href="https://wa.me/201038822537">+20 10 3882 2537</a></li><li><strong>Email:</strong> <a href="mailto:info@montutraveleg.com">info@montutraveleg.com</a></li></ul></section></section><SiteFooter section="trip"/></main>;
}
