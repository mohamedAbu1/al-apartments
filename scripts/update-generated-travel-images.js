const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const base = 'https://montutraveleg.com/images/ai/';

const categories = {
  '0d2a8cbd-6b41-45a9-afb3-7c04612e2a4e': 'cat-night-3d.png',
  '2be1fffc-e268-48a5-a151-08e38d30eeb2': 'cat-spiritual-3d.png',
  '3fc23c91-b776-40be-8632-ea8eb1ea07ec': 'cat-luxury-3d.png',
  '44cfdb87-24e7-433b-94fb-cd362f6bafe1': 'cat-night-3d.png',
  '7d792cf0-8e88-4aeb-a9ab-120ac007b3cd': 'cat-family-3d.png',
  '897806e2-7985-4e16-8d35-a8f3385f42bb': 'cat-adventure-3d.png',
  '95c5d3a9-ed86-4f44-89c9-12e8ff5d5b09': 'cat-historical-3d.png',
  'c58dc169-5f31-4be8-bded-b646a08efd07': 'cat-wellness-3d.png',
  'da4dfcd7-721b-4164-8247-d49ff05a7b35': 'cat-one-day-3d.png',
};

const cities = {
  '1ed14170-d227-4441-8f08-6935196b0229': 'city-luxor-3d.png',
  '2445bb36-4332-4aef-a49a-969ebf428b2c': 'city-cairo-3d.png',
  '33e4d8c6-6222-4222-b65b-90a0fdb18f60': 'city-hurghada-3d.png',
  '8b5a00d0-20ea-4261-b2c7-e27a56df5429': 'city-siwa-3d.png',
  'b1bac522-aa55-4d19-aae5-67e1fd01b9db': 'city-aswan-3d.png',
  'b8eba369-14bb-4deb-8cc5-b0803bb2fcc6': 'city-alexandria-3d.png',
  'ca22f2e8-f676-48ed-9bc6-15c1067cba65': 'city-marsa-alam-3d.png',
  'd3c82f49-bfd4-4945-ace9-b80131394726': 'city-sharm-3d.png',
  'e57bfa98-dc0f-4c3c-bc89-3b8e7d45278c': 'city-fayoum-3d.png',
};

const trips = {
  '036a8012-6821-43c7-a96f-14df97af0dc1': 'trip-luxor-3d.png', '07a9c24a-0fba-4725-80b3-96a0d4bce91e': 'trip-luxor-3d.png', '0aa68c34-7ebd-41db-a582-f9be52217454': 'trip-luxor-3d.png',
  '131e4a4b-572d-48a8-9bf2-b242b553e53f': 'trip-cairo-3d.png', '1f39450b-4764-4f54-930c-46350f4b68db': 'trip-siwa-3d.png', '24eff393-24c5-4160-adcd-fb640c74f028': 'trip-luxor-3d.png',
  '26357c6e-69d2-4275-aac2-e172b49172d5': 'trip-luxor-3d.png', '2935ee95-29d9-48a7-9024-1eb82f6e6f1a': 'trip-red-sea-3d.png', '2e3b3427-0a1b-4ff2-b1aa-7958b101c21f': 'trip-luxor-3d.png',
  '31c9297b-c1c4-4e3b-b004-34fd8f10f4f9': 'trip-luxor-3d.png', '4396d686-5fb3-41c8-a6eb-a0dabee3009c': 'trip-luxor-3d.png', '48d12df4-a787-4a64-aa65-eecb27a74a07': 'trip-luxor-3d.png',
  '4ab8e7d9-d794-4646-9407-10a15f58e688': 'trip-luxor-3d.png', '4ba2c69e-9c76-41f4-80b8-60ae230e1a28': 'trip-luxor-3d.png', '5d446bbf-6ac1-4172-a7de-5f906b663a05': 'trip-luxor-3d.png',
  '63fe4466-3a04-405c-8862-64007f79f14c': 'trip-luxor-3d.png', '6a3c332b-1ffb-46a3-9995-dfb8feb48a7d': 'trip-luxor-3d.png', '716fdb81-c055-4d1e-a9c4-99520afc3994': 'trip-cairo-3d.png',
  '837f8b3a-5de4-41a7-9dbc-6e8e41371b3b': 'trip-red-sea-3d.png', '8601c884-3c35-469f-a2b7-b8bb897b90fe': 'trip-luxor-3d.png', '8ddb3cd5-5292-4c78-a6e1-33409fc59d6d': 'trip-luxor-3d.png',
  '9814e300-f176-4f45-9ff6-281543c2bd2f': 'trip-siwa-3d.png', 'a26b82ef-f343-4da6-bb41-9378ba9f1599': 'trip-red-sea-3d.png', 'a504f676-4f38-44f5-8a06-fa8edbeaf3cc': 'trip-cairo-3d.png',
  'afd190b1-192d-4b21-aa46-d19bbde7cbe0': 'trip-luxor-3d.png', 'b45c448f-822f-4aa3-9e02-02ab08f81c62': 'trip-luxor-3d.png', 'b94772cf-035a-4060-8761-22bfe4c88360': 'trip-luxor-3d.png',
  'c2341501-963d-4a33-accc-f7e031a2636f': 'trip-siwa-3d.png', 'cd265f65-db3f-4020-830a-e11972f1dca8': 'trip-cairo-3d.png', 'd39c533a-191a-439b-8998-08bdaf2b39b9': 'trip-cairo-3d.png',
  'f25b340a-1edf-4667-a8cc-da215ff9c309': 'trip-luxor-3d.png',
};

async function updateImages(table, column, entries) {
  for (const [id, file] of Object.entries(entries)) {
    const value = table === 'trips' ? `${base}${file}` : JSON.stringify([`${base}${file}`]);
    await prisma.$executeRawUnsafe(`UPDATE ${table} SET ${column} = ? WHERE id = ?`, value, id);
  }
}

async function main() {
  await updateImages('categories', 'images', categories);
  await updateImages('cities', 'images', cities);
  await updateImages('trips', 'cover_image', trips);
  const [categoryCount, cityCount, tripCount] = await Promise.all([
    prisma.$queryRawUnsafe(`SELECT COUNT(*) AS count FROM categories WHERE images LIKE ?`, `%${base}%`),
    prisma.$queryRawUnsafe(`SELECT COUNT(*) AS count FROM cities WHERE images LIKE ?`, `%${base}%`),
    prisma.$queryRawUnsafe(`SELECT COUNT(*) AS count FROM trips WHERE cover_image LIKE ?`, `${base}%`),
  ]);
  console.log(JSON.stringify({ categories: Number(categoryCount[0].count), cities: Number(cityCount[0].count), trips: Number(tripCount[0].count) }));
}

main().catch((error) => { console.error(error.message); process.exitCode = 1; }).finally(() => prisma.$disconnect());
