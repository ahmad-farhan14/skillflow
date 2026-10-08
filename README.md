This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Supabase Auth

Authentication uses Supabase email/password auth with cookie-based sessions.

1. Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SUPABASE_URL`,
   `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, and `NEXT_PUBLIC_SITE_URL` to your
   Supabase project URL, publishable key, and application origin.
2. In the Supabase dashboard, enable Email authentication and add
   `http://localhost:3000/auth/confirm` to the project's allowed redirect URLs.
   Add your deployed `/auth/confirm` URL before deploying.
3. Start the app with `npm run dev`. The public landing page is at `/`; sign
   in at `/login` or create an account at `/signup`. The protected workspace
   is at `/dashboard`.

## Reader and validated progress

The dashboard opens roadmap topics in a split-view reader with Quick Notes and
the current module checklist. A topic can only be completed after submitting a
20–2,000 character reflection; the authenticated progress record is stored in
Supabase and protected by row-level security.

Before using topic completion, apply
[`db/migrations/20261008000000_topic_learning_progress.sql`](./db/migrations/20261008000000_topic_learning_progress.sql)
to the Supabase project (for example, in the SQL Editor). This table uses the
client roadmap topic IDs, which are separate from the UUID topic records in the
initial database seed.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
