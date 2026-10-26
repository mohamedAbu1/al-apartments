import { prisma } from './prisma';
import { Prisma } from '@prisma/client';
import type { TripPackage } from '../data';

export type TravelLanguage = 'en' | 'ar' | 'de' | 'es' | 'it' | 'zh' | 'fr';

type DbTrip = { id: string; title: string | null; description: string | null; cover_image: string | null; solo_price: number | string | null; group_price: number | string | null; duration: number | null; duration_unit: string | null; currency: string | null; gallery_images: string | null; category_names: string | null; city_names: string | null; review_count: number | string | null; average_rating: number | string | null };
type DbDay = { trip_id: string; day_number: number; activities: string | null };
type DbTaxonomy = { id: string; name: string | null; images: string | null };
export type TravelTaxonomyItem = { id: string; name: string; image: string; tripCount: number };

function parseJson(value: string | null, fallback: unknown = {}) { if (!value) return fallback; try { return JSON.parse(value); } catch { return fallback; } }
function normalizeLanguage(language?: string): TravelLanguage { return ['en', 'ar', 'de', 'es', 'it', 'zh', 'fr'].includes(language || '') ? language as TravelLanguage : 'en'; }
function localized(value: string | null, fallback = '', language: TravelLanguage = 'en') { const parsed = parseJson(value, value || fallback) as Record<string, string> | string; if (typeof parsed === 'string') return parsed || fallback; return parsed[language] || parsed.en || parsed.ar || parsed.de || Object.values(parsed).find(Boolean) || fallback; }
const localImageHosts = new Set(['montutraveleg.com', 'www.montutraveleg.com', 'onetimelifetravel.com', 'www.onetimelifetravel.com', 'wasettravel.com', 'www.wasettravel.com']);
const canonicalImageBase = 'https://montutraveleg.com/images/';
const trackedCatalogImages = new Set([
  '1200px-Rote_Pyramide_(Dahschur)_04.jpg', 'Giza-Pyramid-Complex-Trip-1-e1668979516849.webp',
  'HurghadaHulaHulaIslandFull-DayBoatTrip.webp', 'Khan-el-Khalili.webp', 'Lounge-area-on-Nile-Dream-720x540.jpeg',
  'Tunis-Village-2.jpg', 'egyptian-musiem-in-cairo-oriental-tours-egypt.jpg', 'montu-car-transfer-hero.png',
  'mortuary-temple-hatshepsut.webp', 'nile-cruise-egypt-slider-1200x600.jpg', 'old-cairo-district.jpg',
  'pexels-zaki25-16114957.webp', 'ai/egypt-hero.png', 'ai/cairo-market-ai.png', 'ai/desert-adventure-ai.png',
  'ai/luxury-stay-ai.png', 'ai/museum-culture-ai.png', 'ai/nile-cruise-ai.png', 'ai/red-sea-ai.png', 'ai/siwa-oasis-ai.png',
]);
const catalogFallbacks = ['/images/ai/egypt-hero.png', '/images/ai/nile-cruise-ai.png', '/images/ai/red-sea-ai.png', '/images/ai/siwa-oasis-ai.png', '/images/ai/cairo-market-ai.png', '/images/ai/desert-adventure-ai.png'];

/**
 * The imported catalog contains image URLs from the previous site. Keep URLs
 * from other providers intact, but transparently serve legacy catalog images
 * from this deployment when their filename is available in public/images.
 */
function imageUrl(value: string) {
  const source = value.trim().replace('/iamges/', '/images/');
  if (!source) return '';
  if (source.startsWith('/images/')) return `${canonicalImageBase}${source.slice('/images/'.length)}`;

  try {
    const parsed = new URL(source);
    if (localImageHosts.has(parsed.hostname.toLowerCase()) && parsed.pathname.includes('/images/')) {
      const imagePath = parsed.pathname.slice(parsed.pathname.indexOf('/images/') + '/images/'.length);
      return imagePath ? `${canonicalImageBase}${imagePath.split('/').map((part) => encodeURIComponent(decodeURIComponent(part))).join('/')}` : '';
    }
  } catch {
    // Preserve non-URL values so a valid relative or CDN path is not lost.
  }

  return source;
}
function fallbackImageForText(value: string, index = 0) {
  const text = value.toLowerCase();
  if (/red sea|hurghada|sharm|marsa alam|snorkel|diving|beach/.test(text)) return '/images/ai/red-sea-ai.png';
  if (/nile|luxor|aswan|felucca|cruise|philae|karnak|kom ombo|edfu/.test(text)) return '/images/ai/nile-cruise-ai.png';
  if (/cairo|giza|pyramid|museum|histor|temple/.test(text)) return '/images/ai/cairo-market-ai.png';
  if (/siwa|oasis|desert|dahab|sinai|safari/.test(text)) return '/images/ai/siwa-oasis-ai.png';
  return catalogFallbacks[index % catalogFallbacks.length];
}
function safeCatalogImage(value: string | null, fallback: string, index = 0) {
  const normalized = value ? imageUrl(value) : '';
  if (!normalized) return fallback;
  try {
    const parsed = new URL(normalized);
    if (parsed.hostname.toLowerCase() === 'montutraveleg.com' || parsed.hostname.toLowerCase() === 'www.montutraveleg.com') {
      const imagePath = parsed.pathname.replace(/^\/images\//, '');
      return trackedCatalogImages.has(imagePath) ? normalized : fallbackImageForText(`${value} ${fallback}`, index);
    }
  } catch {
    return fallback;
  }
  return normalized;
}
function firstImage(value: string | null) {
  const parsed = parseJson(value, value || '');
  const candidates = Array.isArray(parsed) ? parsed : [parsed];
  for (const candidate of candidates) {
    const raw = typeof candidate === 'string' ? candidate : candidate && typeof candidate === 'object' ? (candidate as { url?: string; image?: string; src?: string }).url || (candidate as { image?: string }).image || (candidate as { src?: string }).src : '';
    if (raw) return imageUrl(raw);
  }
  return '';
}
function toPrice(value: number | string | null) { const price = Number(value || 0); return Number.isFinite(price) ? price : 0; }

function mapTrip(row: DbTrip, days: DbDay[] = [], language: TravelLanguage = 'en'): TripPackage {
  const priceValue = toPrice(row.group_price ?? row.solo_price);
  const currency = row.currency || 'USD';
  const unit = row.duration_unit || 'days';
  const durationNumber = row.duration || 1;
  const fallback = fallbackImageForText(`${row.title || ''} ${row.description || ''} ${row.city_names || ''}`);
  const gallery = (parseJson(row.gallery_images, []) as Array<{ url?: string }>).map((image, index) => image.url ? safeCatalogImage(image.url, fallback, index) : '').filter(Boolean);
  const cities = (row.city_names || '').split('||').filter(Boolean);
  const category = (row.category_names || '').split('||').filter(Boolean)[0] || 'Egypt journeys';
  const itinerary = days.sort((a, b) => a.day_number - b.day_number).map((day) => localized(day.activities, `Day ${day.day_number}`, language));
  const image = safeCatalogImage(row.cover_image || gallery[0] || '', fallback);
  const rating = Number(row.average_rating || 0);
  return { id: row.id, title: localized(row.title, 'Egypt journey', language), description: localized(row.description, 'A carefully planned Egyptian journey with local support throughout.', language), category, route: cities.join(' · ') || 'Egypt', duration: `${durationNumber} ${unit}`, price: `From ${currency} ${priceValue.toLocaleString('en-US')}`, priceValue, rating: rating ? rating.toFixed(1) : 'New', reviewCount: Number(row.review_count || 0), image, gallery: gallery.length ? gallery : [image], highlights: language === 'ar' ? 'دعم محلي · تجارب مختارة · تفاصيل انتقال واضحة' : 'Local support · Curated experiences · Clear transfer details', itinerary: itinerary.length ? itinerary : language === 'ar' ? ['الوصول والترحيب المحلي', 'زيارات وتجارب مختارة', 'المغادرة مع دعم محلي'] : ['Arrival and local welcome', 'Curated visits and experiences', 'Departure with local support'] };
}

async function queryTrips(id?: string, language: TravelLanguage = 'en') {
  const path = `$.${language}`;
  const where = id ? Prisma.sql`WHERE t.id = ${id}` : Prisma.empty;
  return prisma.$queryRaw<DbTrip[]>(Prisma.sql`SELECT t.id, t.title, t.description, t.cover_image, t.solo_price, t.group_price, t.duration, t.duration_unit, t.currency, t.gallery_images, GROUP_CONCAT(DISTINCT COALESCE(JSON_UNQUOTE(JSON_EXTRACT(c.name, ${path})), JSON_UNQUOTE(JSON_EXTRACT(c.name, '$.en'))) SEPARATOR '||') AS category_names, GROUP_CONCAT(DISTINCT COALESCE(JSON_UNQUOTE(JSON_EXTRACT(ci.name, ${path})), JSON_UNQUOTE(JSON_EXTRACT(ci.name, '$.en'))) SEPARATOR '||') AS city_names, COUNT(DISTINCT r.id) AS review_count, AVG(r.rating) AS average_rating FROM trips t LEFT JOIN trip_categories tc ON tc.trip_id = t.id LEFT JOIN categories c ON c.id = tc.category_id LEFT JOIN trip_cities tci ON tci.trip_id = t.id LEFT JOIN cities ci ON ci.id = tci.city_id LEFT JOIN reviews r ON r.trip_id = t.id ${where} GROUP BY t.id ORDER BY t.created_at DESC`);
}
async function queryDays(tripId: string, language: TravelLanguage = 'en') { const path = `$.${language}`; return prisma.$queryRaw<DbDay[]>(Prisma.sql`SELECT td.trip_id, td.day_number, GROUP_CONCAT(COALESCE(JSON_UNQUOTE(JSON_EXTRACT(da.activity_translations, ${path})), JSON_UNQUOTE(JSON_EXTRACT(da.activity_translations, '$.en'))) ORDER BY da.time SEPARATOR ' · ') AS activities FROM trip_days td LEFT JOIN day_activities da ON da.day_id = td.id WHERE td.trip_id = ${tripId} GROUP BY td.trip_id, td.day_number ORDER BY td.day_number`); }

async function queryTaxonomy(table: 'categories' | 'cities', joinTable: 'trip_categories' | 'trip_cities', foreignKey: 'category_id' | 'city_id') {
  return prisma.$queryRaw<Array<DbTaxonomy & { trip_count: number | string }>>(Prisma.sql`SELECT x.id, x.name, x.images, COUNT(DISTINCT j.trip_id) AS trip_count FROM ${Prisma.raw(table)} x LEFT JOIN ${Prisma.raw(joinTable)} j ON j.${Prisma.raw(foreignKey)} = x.id GROUP BY x.id ORDER BY trip_count DESC, x.created_at DESC`);
}

export async function getTravelTrips(language?: string) {
  const locale = normalizeLanguage(language);
  const rows = await queryTrips(undefined, locale);
  const days = await Promise.all(rows.map((row) => queryDays(row.id, locale)));
  return rows.map((row, index) => mapTrip(row, days[index], locale));
}

export async function getTravelTrip(id: string, language?: string) {
  const locale = normalizeLanguage(language);
  try {
    const rows = await queryTrips(id, locale);
    if (rows[0]) {
      let days: DbDay[] = [];
      try { days = await queryDays(id, locale); } catch (error) { console.error('Trip days query failed; using fallback itinerary.', error); }
      return mapTrip(rows[0], days, locale);
    }
  } catch (error) {
    console.error('Trip detail query failed; database data is unavailable.', error);
  }
  return undefined;
}
export async function getTravelTaxonomy(language?: string) {
  const locale = normalizeLanguage(language);
  try {
    const [categoryRows, cityRows] = await Promise.all([
      queryTaxonomy('categories', 'trip_categories', 'category_id'),
      queryTaxonomy('cities', 'trip_cities', 'city_id'),
    ]);
    const map = (row: DbTaxonomy & { trip_count: number | string }, index: number): TravelTaxonomyItem => { const name = localized(row.name, 'Egypt', locale); return { id: row.id, name, image: safeCatalogImage(firstImage(row.images), fallbackImageForText(name, index), index), tripCount: Number(row.trip_count || 0) }; };
    return { categories: categoryRows.map(map), cities: cityRows.map(map) };
  } catch (error) {
    console.error('Travel taxonomy query failed; database data is unavailable.', error);
    throw error;
  }
}
