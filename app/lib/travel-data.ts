import { prisma } from './prisma';
import type { TripPackage } from '../data';

type DbTrip = { id: string; title: string | null; description: string | null; cover_image: string | null; solo_price: number | string | null; group_price: number | string | null; duration: number | null; duration_unit: string | null; currency: string | null; gallery_images: string | null; category_names: string | null; city_names: string | null; review_count: number | string | null; average_rating: number | string | null };
type DbDay = { trip_id: string; day_number: number; activities: string | null };
type DbTaxonomy = { id: string; name: string | null; images: string | null };
export type TravelTaxonomyItem = { id: string; name: string; image: string; tripCount: number };

function parseJson(value: string | null, fallback: unknown = {}) { if (!value) return fallback; try { return JSON.parse(value); } catch { return fallback; } }
function localized(value: string | null, fallback = '') { const parsed = parseJson(value, value || fallback) as Record<string, string> | string; if (typeof parsed === 'string') return parsed || fallback; return parsed.en || parsed.ar || parsed.de || Object.values(parsed).find(Boolean) || fallback; }
const localImageHosts = new Set(['montutraveleg.com', 'www.montutraveleg.com', 'onetimelifetravel.com', 'www.onetimelifetravel.com', 'wasettravel.com', 'www.wasettravel.com']);
const canonicalImageBase = 'https://montutraveleg.com/images/';

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

function mapTrip(row: DbTrip, days: DbDay[] = []): TripPackage {
  const priceValue = toPrice(row.group_price ?? row.solo_price);
  const currency = row.currency || 'USD';
  const unit = row.duration_unit || 'days';
  const durationNumber = row.duration || 1;
  const gallery = (parseJson(row.gallery_images, []) as Array<{ url?: string }>).map((image) => image.url ? imageUrl(image.url) : '').filter(Boolean);
  const cities = (row.city_names || '').split('||').filter(Boolean);
  const category = (row.category_names || '').split('||').filter(Boolean)[0] || 'Egypt journeys';
  const itinerary = days.sort((a, b) => a.day_number - b.day_number).map((day) => localized(day.activities, `Day ${day.day_number}`));
  const image = imageUrl(row.cover_image || gallery[0] || '');
  const rating = Number(row.average_rating || 0);
  return { id: row.id, title: localized(row.title, 'Egypt journey'), description: localized(row.description, 'A carefully planned Egyptian journey with local support throughout.'), category, route: cities.join(' · ') || 'Egypt', duration: `${durationNumber} ${unit}`, price: `From ${currency} ${priceValue.toLocaleString('en-US')}`, priceValue, rating: rating ? rating.toFixed(1) : 'New', reviewCount: Number(row.review_count || 0), image, gallery: gallery.length ? gallery : [image], highlights: 'Local support · Curated experiences · Clear transfer details', itinerary: itinerary.length ? itinerary : ['Arrival and local welcome', 'Curated visits and experiences', 'Departure with local support'] };
}

async function queryTrips(id?: string) {
  const where = id ? `WHERE t.id = ${JSON.stringify(id)}` : '';
  return prisma.$queryRawUnsafe<DbTrip[]>(`SELECT t.id, t.title, t.description, t.cover_image, t.solo_price, t.group_price, t.duration, t.duration_unit, t.currency, t.gallery_images, GROUP_CONCAT(DISTINCT JSON_UNQUOTE(JSON_EXTRACT(c.name, '$.en')) SEPARATOR '||') AS category_names, GROUP_CONCAT(DISTINCT JSON_UNQUOTE(JSON_EXTRACT(ci.name, '$.en')) SEPARATOR '||') AS city_names, COUNT(DISTINCT r.id) AS review_count, AVG(r.rating) AS average_rating FROM trips t LEFT JOIN trip_categories tc ON tc.trip_id = t.id LEFT JOIN categories c ON c.id = tc.category_id LEFT JOIN trip_cities tci ON tci.trip_id = t.id LEFT JOIN cities ci ON ci.id = tci.city_id LEFT JOIN reviews r ON r.trip_id = t.id ${where} GROUP BY t.id ORDER BY t.created_at DESC`);
}
async function queryDays(tripId: string) { return prisma.$queryRawUnsafe<DbDay[]>(`SELECT td.trip_id, td.day_number, GROUP_CONCAT(JSON_UNQUOTE(JSON_EXTRACT(da.activity_translations, '$.en')) ORDER BY da.time SEPARATOR ' · ') AS activities FROM trip_days td LEFT JOIN day_activities da ON da.day_id = td.id WHERE td.trip_id = ${JSON.stringify(tripId)} GROUP BY td.trip_id, td.day_number ORDER BY td.day_number`); }

async function queryTaxonomy(table: 'categories' | 'cities', joinTable: 'trip_categories' | 'trip_cities', foreignKey: 'category_id' | 'city_id') {
  return prisma.$queryRawUnsafe<Array<DbTaxonomy & { trip_count: number | string }>>(`SELECT x.id, x.name, x.images, COUNT(DISTINCT j.trip_id) AS trip_count FROM ${table} x LEFT JOIN ${joinTable} j ON j.${foreignKey} = x.id GROUP BY x.id ORDER BY trip_count DESC, x.created_at DESC`);
}

export async function getTravelTrips() { const rows = await queryTrips(); const days = await Promise.all(rows.map((row) => queryDays(row.id))); return rows.map((row, index) => mapTrip(row, days[index])); }
export async function getTravelTrip(id: string) { const rows = await queryTrips(id); if (rows[0]) return mapTrip(rows[0], await queryDays(id)); return undefined; }
export async function getTravelTaxonomy() {
  const [categoryRows, cityRows] = await Promise.all([
    queryTaxonomy('categories', 'trip_categories', 'category_id'),
    queryTaxonomy('cities', 'trip_cities', 'city_id'),
  ]);
  const map = (row: DbTaxonomy & { trip_count: number | string }): TravelTaxonomyItem => ({ id: row.id, name: localized(row.name, 'Egypt'), image: firstImage(row.images), tripCount: Number(row.trip_count || 0) });
  return { categories: categoryRows.map(map), cities: cityRows.map(map) };
}
