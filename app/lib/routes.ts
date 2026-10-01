export type AppSection = 'trip' | 'stay' | 'buy-home' | 'land';

export const routes = {
  home: (section?: AppSection, hash = '') => `/${section ? `?mode=${section}` : ''}${hash}`,
  search: (section?: AppSection) => `/search${section ? `?mode=${section}` : ''}`,
  section: (section: AppSection) => section === 'trip' ? '/travel' : section === 'stay' ? '/stays' : '/homes',
  sectionGuide: (section: AppSection) => `${section === 'trip' ? '/travel' : section === 'stay' ? '/stays' : '/homes'}#guide`,
  sectionSearch: (section: AppSection) => `${section === 'trip' ? '/travel' : section === 'stay' ? '/stays' : '/homes'}#search`,
  property: (id: string) => `/property/${encodeURIComponent(id)}`,
  contact: '/contact',
  listProperty: '/list-property',
  about: '/about',
  faq: '/faq',
  login: '/login',
  register: '/register',
};
