# From Royce

Next.js Pages Router portfolio, Ethos blog and Work catalogue. Firebase Hosting rewrites application requests to the `nextApp` v2 function in `us-central1`. Express owns the public read APIs and verifies Firebase owner tokens before all record writes. Neon PostgreSQL stores posts and projects. Firebase Storage stores images.

## Requirements

- Node.js 22.23.3, the same version pinned in production CI.
- Run `npm ci` at the root and `npm ci --omit=dev` in `functions`. Both lockfiles are required.
- Local environment settings go in ignored `.env.local` files, never source control. The frontend requires the `NEXT_PUBLIC_FIREBASE_*` settings in `firebase.ts`. These client settings are public configuration, not database credentials.
- API development uses `LOCAL_DATABASE_URL`; deployed Functions use `DATABASE_URL`. Never print or put database URLs in page props. Production SSL behavior must be verified against the driver and provider; the explicit old TLS override is still an open review item.

## Development

`npm run dev` runs the frontend. In another terminal, run the Express wrapper with `NODE_ENV=development node functions/index.js` (port5002). Supply a local database connection and schema first. Do not point tests or seed scripts at production. New Work records should be real owner content, not restored dummy entries.

## Checks

```sh
npm run typecheck
npm run lint
npm test
npm run build
```

Strict TypeScript uses GSAP's shipped types rather than local `any` declarations. Focused tests use fake databases/SDK responses and cover calendar dates across timezones, stable slugs and invalid titles, SSR404/503 handling, project serialization, and sign-in persistence ordering/failures. They do not write live records or sign into the owner's account.

Browser scripts `tests/menu-keyboard.cjs` and `tests/reduced-motion.cjs` require Playwright plus Chromium in the test environment. Run them against a production build (`npm run build`, `npm start -- -p 3208`), setting `MENU_TEST_URL` or `MOTION_TEST_URL` to the local portfolio URL. Set `CHROME_BIN` only when using a system Chromium executable. Verify images and animations have finished before screenshots. Native iOS Safari and screen-reader testing remain separate.

## Deployment

Main CI pins Node and Firebase CLI, installs Functions from its lockfile, assembles `.next`, `public` and source into the Functions directory, runs focused checks, then deploys `functions,hosting` to `from-royce`. Deployments are serialized and never cancel an in-flight production release.

A frontend build alone does not verify the database schema, Storage rules or production behavior. After deployment check public APIs, anonymous write denial, detail-page HTML/meta and real404s, images, menu keyboard behavior, and the expected Node/runtime configuration. Avoid dummy production writes as a smoke test.

The PR Hosting preview workflow is not an isolated SSR environment. Its credentials/deployment path and branch-matched backend remain open work; do not treat a preview URL as proof of PR server behavior or give fork code production secrets.

## Current limits

No versioned Storage rules/emulator suite is in this repository yet. Upload idempotency/orphan handling, TLS effective configuration, memory capacity/alerts, isolated staging and dependency audit follow-up are still open. A memory increase needs owner approval. Ethos responsive derivative work is a separate change and must preserve originals and post content.
