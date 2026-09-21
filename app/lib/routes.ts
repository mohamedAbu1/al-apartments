export type AppSection = 'trip' | 'stay' | 'buy-home' | 'land';

export const routes = {
  home: (section?: AppSection, hash = '') => `/${section ? `?mode=${section}` : ''}${hash}`,
  search: (section?: AppSection) => `/search${section ? `?mode=${section}` : ''}`,
  property: (id: string) => `/property/${encodeURIComponent(id)}`,
  contact: '/contact',
  about: '/about',
  faq: '/faq',
  login: '/login',
  register: '/register',
};
