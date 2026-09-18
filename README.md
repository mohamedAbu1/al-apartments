# Al-Aroum Apartments

An English, responsive Next.js + React + Tailwind landing page for holiday apartments, villas, chalets, and land listings.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## MySQL setup

1. Create a local MySQL database using `db/schema.sql`, or use Prisma directly.
2. Copy `.env.example` to `.env` and update `DATABASE_URL` with your local MySQL password.
3. Generate the Prisma client and sync the schema:

```bash
npx prisma generate
npx prisma db push
```

The Prisma model in `prisma/schema.prisma` is ready for apartments, villas, chalets, and land with rent/sale purposes.

## Design

The interface is English and LTR, with the teal/navy/cream palette, rounded cards, large destination hero, search panel, apartment cards, land opportunities, and owner CTA based on the supplied visual references.
