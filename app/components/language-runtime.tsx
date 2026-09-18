'use client';

import { useEffect } from 'react';
import { Language, languages } from '../i18n';

// Static copy is kept in one place so server-rendered routes also switch language
// without duplicating page markup or losing the selected language on navigation.
const ar: Record<string, string> = {
  'YOUR NEXT ESCAPE':'رحلتك القادمة', 'Search':'بحث', 'Language':'اللغة', 'Filters':'الفلاتر', 'Clear all':'مسح الكل', 'results':'نتيجة', 'Operation':'نوع العملية', 'Property type':'نوع العقار', 'City or neighborhood':'المدينة أو الحي', 'Min price':'الحد الأدنى للسعر', 'Max price':'الحد الأقصى للسعر', 'Status':'الحالة', 'All':'الكل', 'Sort by':'ترتيب حسب', 'Newest first':'الأحدث أولًا', 'Explore.':'استكشف.', 'Dream.':'احلم.', 'Discover.':'اكتشف.', 'Company':'الشركة', 'Privacy':'الخصوصية', 'Terms':'الشروط', 'TRAVEL & STAYS':'السفر والإقامات', '© 2026 Al-Aroum. All rights reserved.':'© 2026 Al-Aroum. جميع الحقوق محفوظة.',
  'Find the most beautiful places around the world and make your trip unforgettable.':'اعثر على أجمل الأماكن حول العالم واجعل رحلتك لا تُنسى.', 'Explore Now':'استكشف الآن', 'Watch Video':'شاهد الفيديو',
  'Destination':'الوجهة', 'Where to?':'إلى أين؟', 'Check In':'تاريخ الوصول', 'Add date':'أضف تاريخًا', 'Check Out':'تاريخ المغادرة', 'Travelers':'المسافرون', '2 Travelers':'مسافران',
  'TOP DESTINATIONS':'أفضل الوجهات', 'Popular Destinations':'الوجهات الرائجة', 'View All':'عرض الكل', 'From':'ابتداءً من', 'EXPERIENCES':'التجارب', 'More Than':'أكثر من', 'Just Places':'مجرد أماكن', 'We create unforgettable moments that stay with you forever.':'نصنع لحظات لا تُنسى تبقى معك إلى الأبد.', 'Discover Experiences':'اكتشف التجارب', 'Adventure':'المغامرة', 'Thrilling activities in stunning locations.':'أنشطة مشوقة في مواقع مذهلة.', 'Cultural Tours':'جولات ثقافية', 'Immerse in local culture and traditions.':'عش الثقافة والتقاليد المحلية.', 'Relaxation':'الاسترخاء', 'Unwind and relax in paradise destinations.':'استرخِ واستمتع بالهدوء في وجهات ساحرة.', 'Food & Drink':'المأكولات والمشروبات', "Savor the world's best cuisines and flavors.":'تذوق أفضل المأكولات والنكهات حول العالم.', 'FEATURED EXPERIENCE':'تجربة مميزة', 'Live Your':'عِش', 'Best Story.':'أجمل حكاياتك.', 'Watch Now':'شاهد الآن',
  'TRAVEL SMARTER':'سافر بذكاء', 'Get Exclusive Travel Deals':'احصل على عروض سفر حصرية', 'Sign up and get up to 30% off your first trip!':'سجّل واحصل على خصم يصل إلى 30٪ على رحلتك الأولى!', 'Best Price Guarantee':'ضمان أفضل سعر', 'We offer the best prices for your trip.':'نقدم أفضل الأسعار لرحلتك.', '24/7 Support':'دعم على مدار الساعة', "We're here to help you anytime.":'نحن هنا لمساعدتك في أي وقت.', 'Easy Booking':'حجز سهل', 'Book your trip effortlessly.':'احجز رحلتك بكل سهولة.', 'Secure Payments':'مدفوعات آمنة', 'Your payments are safe with us.':'مدفوعاتك آمنة معنا.', 'Subscribe':'اشترك', 'Enter your email':'أدخل بريدك الإلكتروني',
  'CURATED DESTINATIONS':'وجهات مختارة', 'Go somewhere':'اذهب إلى مكان', 'beautiful.':'جميل.', 'From island mornings to mountain air, discover places selected for the feeling they leave behind.':'من صباحات الجزر إلى هواء الجبال، اكتشف أماكن اخترناها لشعورها الذي يبقى معك.', 'Explore all places':'استكشف كل الأماكن', 'Find your':'اعثر على', 'north':'وجهتك', 'THE WORLD, CURATED':'العالم كما نختاره لك', 'Where will you':'إلى أين', 'go next?':'ستذهب بعد ذلك؟', 'Every destination has a different rhythm. Choose the one that feels like yours.':'لكل وجهة إيقاع مختلف. اختر ما يشبهك.', 'TRAVEL BY FEELING':'سافر حسب إحساسك', 'Start with a feeling.':'ابدأ بإحساس.', 'Whether you want to slow down, get lost, or taste something new, there is a destination waiting for you.':'سواء أردت التمهل أو الضياع أو تذوق شيء جديد، هناك وجهة بانتظارك.', 'Quiet mornings':'صباحات هادئة', 'Sea & sunshine':'البحر وأشعة الشمس', 'Culture & stories':'الثقافة والحكايات', 'Mountain air':'هواء الجبال',
  'BEYOND THE STAY':'أبعد من الإقامة', 'Make room for':'اترك مساحة لـ', 'the unexpected.':'ما هو غير متوقع.', 'The best trips are not measured in places visited, but in the moments you bring home.':'لا تُقاس الرحلات الأفضل بعدد الأماكن التي تزورها، بل باللحظات التي تعود بها إلى المنزل.', 'Find your experience':'اعثر على تجربتك', 'CHOOSE YOUR OWN STORY':'اختر حكايتك', 'What are you':'ما الذي', 'in the mood for?':'ترغب فيه اليوم؟', 'Meet the people, rituals, and stories that give a place its soul.':'تعرّف إلى الناس والطقوس والحكايات التي تمنح المكان روحه.', 'Trade the rush for still water, warm light, and slow afternoons.':'استبدل العجلة بمياه هادئة وضوء دافئ وظهيرات بطيئة.', 'Taste the destination through its markets, tables, and traditions.':'تذوق الوجهة عبر أسواقها وموائدها وتقاليدها.', 'A slower way to discover the world':'طريقة أبطأ لاكتشاف العالم',
  'More reasons':'أسباب أكثر', 'to go.':'للذهاب.', 'Thoughtful offers for the trips you have been imagining.':'عروض مدروسة للرحلات التي تتخيلها.', 'UP TO':'خصم يصل إلى', 'OFF':'خصم', 'HANDPICKED FOR YOU':'مختارة لك', 'Good trips.':'رحلات رائعة.', 'Better value.':'وقيمة أفضل.', 'Offers change with the season, but the feeling of finding a great place stays the same.':'تتغير العروض مع الموسم، لكن متعة العثور على مكان رائع تبقى كما هي.', 'FIRST ESCAPE':'الرحلة الأولى', '30% off your first trip':'خصم 30٪ على رحلتك الأولى', 'LONGER STAYS':'إقامات أطول', 'Stay seven, save more':'أقم سبع ليالٍ ووفر أكثر', 'LAST MINUTE':'عروض اللحظة الأخيرة', 'Beautiful places, closer':'أماكن جميلة أقرب إليك', 'See stays':'شاهد الإقامات', 'Members get more':'مزايا أكثر للأعضاء', 'Offers with a pulse':'عروض متجددة', 'Clear from the start':'واضحة منذ البداية', "DON'T MISS THE GOOD ONES":'لا تفوّت العروض المميزة', 'Get the next deal':'احصل على العرض القادم', 'in your inbox.':'في بريدك الإلكتروني.',
  'NEED TO KNOW':'ما تحتاج إلى معرفته', 'Questions,':'أسئلة', 'answered.':'وأجوبة.', 'Everything you need to make your next booking feel easy.':'كل ما تحتاجه لجعل حجزك القادم سهلًا.', 'How do I search for a stay?':'كيف أبحث عن إقامة؟', 'Can I save a property for later?':'هل يمكنني حفظ عقار لوقت لاحق؟', 'How do I contact an owner or host?':'كيف أتواصل مع المالك أو المضيف؟', 'What payment methods are supported?':'ما طرق الدفع المتاحة؟', 'How can I list my property?':'كيف أضيف عقاري؟', 'Our support team can guide you through this step and help you find the right option for your trip.':'يمكن لفريق الدعم إرشادك خلال هذه الخطوة ومساعدتك في العثور على الخيار المناسب لرحلتك.',
  'WE ARE HERE TO HELP':'نحن هنا لمساعدتك', 'Let’s plan your':'لنخطط لـ', 'next story.':'حكايتك القادمة.', 'Have a question about a place, a booking, or listing your property? Our team is ready to help.':'هل لديك سؤال عن مكان أو حجز أو إضافة عقارك؟ فريقنا مستعد لمساعدتك.', 'Email us':'راسلنا', 'Chat with us':'تحدث معنا', 'Usually replies in minutes':'نرد عادة خلال دقائق', 'Call us':'اتصل بنا', 'Name':'الاسم', 'How can we help?':'كيف يمكننا مساعدتك؟', 'Tell us a little about your request':'أخبرنا قليلًا عن طلبك', 'Send message':'إرسال الرسالة',
  'STAY IN THE LOOP':'ابقَ على اطلاع', 'Make room for your next story.':'اترك مساحة لحكايتك القادمة.', 'Get thoughtful travel inspiration and new opportunities before everyone else.':'احصل على إلهام سفر مدروس وفرص جديدة قبل الجميع.', 'Your email address':'بريدك الإلكتروني', 'Create account':'إنشاء حساب', 'All rights reserved.':'جميع الحقوق محفوظة.', 'Account recovery':'استعادة الحساب', 'Reset your password':'إعادة تعيين كلمة المرور', 'Enter your email and we will send you a secure reset link.':'أدخل بريدك الإلكتروني وسنرسل لك رابطًا آمنًا لإعادة التعيين.', 'Send reset link':'إرسال رابط إعادة التعيين',
  'Back to results':'العودة إلى النتائج', 'View all photos':'عرض كل الصور', 'Area':'المساحة', 'Rooms':'الغرف', 'Bathrooms':'الحمامات', 'About this property':'عن هذا العقار', 'Location on the map':'الموقع على الخريطة', 'Price':'السعر', 'Contact owner':'تواصل مع المالك', 'Book a viewing':'احجز موعد معاينة', 'Save to favorites':'حفظ في المفضلة', 'Chat will open after you sign in.':'ستُفتح المحادثة بعد تسجيل الدخول.', 'Similar properties':'عقارات مشابهة', 'For rent':'للإيجار', 'For sale':'للبيع', 'Apartment':'شقة', 'Villa':'فيلا', 'Chalet':'شاليه', 'Residential land':'أرض سكنية', 'Agricultural land':'أرض زراعية', 'North Coast, Egypt':'الساحل الشمالي، مصر', 'Dahab, South Sinai':'دهب، جنوب سيناء', 'Marsa Alam, Egypt':'مرسى علم، مصر', 'Ras Sudr, South Sinai':'رأس سدر، جنوب سيناء', 'Ain Sokhna, Egypt':'العين السخنة، مصر', 'White Sands Coastal Chalet':'شاليه وايت ساندز الساحلي', 'The Quiet Cypress House':'منزل السرو الهادئ', 'Palm Grove Residence':'إقامة بالم جروف', 'Beachfront Investment Plot':'قطعة استثمارية على الواجهة البحرية', 'Build-ready Agricultural Land':'أرض زراعية جاهزة للبناء', 'A calm coastal stay with open views, modern interiors, and space designed for families and short escapes.':'إقامة ساحلية هادئة بإطلالات مفتوحة وتصميم عصري ومساحة مناسبة للعائلات والرحلات القصيرة.', 'A distinctive villa near the sea with generous spaces, a private garden, and strong investment potential.':'فيلا مميزة بالقرب من البحر بمساحات واسعة وحديقة خاصة وإمكانات استثمارية قوية.', 'A fully furnished apartment in a peaceful resort, close to the beach and essential services.':'شقة مفروشة بالكامل في منتجع هادئ بالقرب من الشاطئ والخدمات الأساسية.', 'A promising plot for a hospitality or residential project near the sea.':'قطعة واعدة لمشروع ضيافة أو سكن بالقرب من البحر.', 'A spacious plot suitable for agricultural investment or development, with clear road access.':'قطعة واسعة مناسبة للاستثمار الزراعي أو التطوير مع طريق وصول واضح.',
  'DISCOVER YOUR NEXT STAY':'اكتشف إقامتك القادمة', 'Find a place':'اعثر على مكان', 'worth staying.':'يستحق الإقامة.', 'Search verified properties, land opportunities, and stays selected for your next move.':'ابحث عن عقارات موثوقة وفرص أراضٍ وإقامات مختارة لخطوتك القادمة.', 'REFINE RESULTS':'تخصيص النتائج', 'CURATED FOR YOU':'مختارة لك', 'Price: Low to high':'السعر: من الأقل إلى الأعلى', '1+ rooms':'غرفة فأكثر', '2+ rooms':'غرفتان فأكثر', '3+ rooms':'3 غرف فأكثر', '4+ rooms':'4 غرف فأكثر', 'New':'جديد', 'Pre-owned':'مستعمل', 'Land':'أرض', 'Live area preview':'معاينة المنطقة', 'Explore on map':'استكشف على الخريطة', 'Explore':'استكشف', 'See properties by neighborhood and distance':'شاهد العقارات حسب الحي والمسافة', 'Open map':'فتح الخريطة', 'No properties found':'لم يتم العثور على عقارات', 'Try adjusting your filters.':'جرّب تعديل الفلاتر.'
};

const attrs = ['placeholder', 'aria-label', 'title', 'alt'];
export function translateStaticText(value: string, language: Language) {
  if (language !== 'ar') return value;
  const leading = value.match(/^\s*/)?.[0] ?? '';
  const trailing = value.match(/\s*$/)?.[0] ?? '';
  const core = value.trim();
  if (ar[core]) return `${leading}${ar[core]}${trailing}`;
  if (core.startsWith('Explore ')) return `${leading}استكشف ${core.slice(8)}${trailing}`;
  const count = core.match(/^(\d+)\s+results?$/i);
  if (count) return `${leading}${count[1]} نتيجة${trailing}`;
  const rooms = core.match(/^(\d+)\+\s+rooms?$/i);
  if (rooms) return `${leading}${rooms[1]} غرفة فأكثر${trailing}`;
  if (core === 'Toggle theme') return `${leading}تبديل المظهر${trailing}`;
  if (core === 'Notifications') return `${leading}الإشعارات${trailing}`;
  if (core === 'Save') return `${leading}حفظ${trailing}`;
  return value;
}

export default function LanguageRuntime({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const originalText = new WeakMap<Node, string>();
    const apply = (language: Language) => {
      document.documentElement.lang = language;
      document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
      document.body.classList.toggle('rtl', language === 'ar');
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      let node: Node | null;
      while ((node = walker.nextNode())) {
        const parent = node.parentElement;
        if (!parent || ['SCRIPT', 'STYLE', 'NOSCRIPT'].includes(parent.tagName)) continue;
        const original = originalText.get(node) ?? node.textContent ?? '';
        originalText.set(node, original);
        node.textContent = translateStaticText(original, language);
      }
      document.querySelectorAll<HTMLElement>('*').forEach((element) => {
        attrs.forEach((attr) => {
          const value = element.getAttribute(attr);
          const key = `data-i18n-original-${attr}`;
          if (value && !element.getAttribute(key)) element.setAttribute(key, value);
          const original = element.getAttribute(key);
          if (original) element.setAttribute(attr, translateStaticText(original, language));
        });
      });
    };
    const saved = window.localStorage.getItem('al-aroum-language') as Language | null;
    apply(saved && languages.some((item) => item.code === saved) ? saved : 'en');
    const onChange = (event: Event) => apply((event as CustomEvent<Language>).detail);
    window.addEventListener('language-change', onChange);
    const observer = new MutationObserver(() => {
      const current = document.documentElement.lang as Language;
      if (current === 'ar') apply(current);
    });
    observer.observe(document.body, { childList: true, subtree: true });
    return () => { window.removeEventListener('language-change', onChange); observer.disconnect(); };
  }, []);
  return <>{children}</>;
}
