## Next.js + MUI + Redux Starter

Opinionated starter template using Next.js App Router, Material UI v5 (with Emotion), Redux Toolkit, NextAuth, and Firebase.

### Tech Stack
- Next.js 14 (App Router) + TypeScript
- Material UI v5 + Emotion (custom theme + component overrides)
- Redux Toolkit (`src/store`) with example UI slice (snackbar)
- NextAuth (Credentials + optional Google)
- Firebase (Firestore/Storage/Auth) via env-driven config

### Project Structure
- `src/app`: Routes and API (`src/app/page.tsx`, `src/app/api/auth/[...nextauth]/route.ts`)
- `src/core`: Theme, overrides, shared components/hooks (`src/core/theme/*`)
- `src/store`: Redux store and slices (`components` slice)
- `src/config`: `authOptions.ts`, `firebase.ts`, `routes.ts`, `tokens.ts`
- `src/utils`, `src/types`, `src/hooks`, `public/`

### Setup
1) Install deps:
   - `yarn install` (or `npm install`)
2) Configure env:
   - Copy `.env.example` to `.env` and fill values.
   - Required: `NEXTAUTH_SECRET`, Firebase public keys.
   - Optional: `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` for Google OAuth.
3) Run dev server:
   - `yarn dev` then open http://localhost:3000

### Scripts
- `yarn dev`: Start dev server
- `yarn build`: Production build
- `yarn start`: Start production server
- `yarn lint`: Run ESLint (`next/core-web-vitals`)

### Auth & Firebase
- Auth config lives in `src/config/authOptions.ts`. Credentials auth uses Firebase Auth. Google provider auto-enables when env vars exist.
- NextAuth API route: `src/app/api/auth/[...nextauth]/route.ts`
- Firebase config reads from env in `src/config/firebase.ts` (no secrets in repo).
- Route protection is disabled by default in `src/middleware.ts`. Re-enable with `withAuth` as needed.

### Theming
- MUI theme and global component overrides are defined in `src/core/theme/` and applied via `ThemeComponent` in `src/app/layout.tsx`.

### State Management
- Store is created in `src/store/index.ts` and provided via `StoreProvider`.
- Example UI feedback is implemented with `src/store/components` + `src/core/components/SnackBar`.

### Notes
- This repo is a template: add your own features, slices, and pages. Keep modules focused and leverage the theme system for consistent UI.
