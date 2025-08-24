# Repository Guidelines

## Project Structure & Modules
- `src/app`: Next.js App Router pages and API routes (e.g., `src/app/page.tsx`, `src/app/api/auth/[...nextauth]/route.ts`).
- `src/core`: Design system, shared components, hooks, theme, and i18n.
- `src/store`: Redux Toolkit store (`StoreProvider`, `components` slice for UI state).
- `src/config`: Runtime config (auth options, Firebase, routes, tokens).
- `src/utils`, `src/types`, `src/hooks`, `src/icons`; static assets in `public/`.

## Build, Test, and Development
- `yarn dev`: Start local dev server on `http://localhost:3000`.
- `yarn build`: Production build.
- `yarn start`: Start the production server.
- `yarn lint`: Run ESLint (`next/core-web-vitals`).

## Coding Style & Naming
- Language: TypeScript (strict) and React functional components.
- Imports: Use `@/` alias for `src/*` (see `tsconfig.json`).
- Indentation/format: 2 spaces; keep files small and cohesive.
- Components: PascalCase file names (`SampleWidget.tsx`).
- Hooks: camelCase prefixed with `use` (`useLocalStorage.ts`).
- Modules/dirs: lowercase (`utils/formatters.ts`).
- UI: MUI v5 + Emotion; theme and overrides live under `src/core/theme`.

## Testing Guidelines
- Frameworks are not yet configured. If adding tests, prefer Jest + React Testing Library.
- Naming: `*.test.ts` / `*.test.tsx` colocated with the file or under `__tests__/`.
- Aim for unit tests on utilities/selectors and component tests for critical UI.

## Commit & Pull Requests
- Commit style: Use Conventional Commits where possible (`feat:`, `fix:`, `chore:`, `refactor:`). Example: `fix: correct filterItems call in formatQuoteList`.
- Branch names: `feature/...`, `fix/...` aligned to the change scope.
- PRs: Include a clear description, linked issues, screenshots for UI changes, and manual test notes (steps and expected results).

## Security & Configuration
- Auth: NextAuth with Google and Credentials. Required envs: `NEXTAUTH_SECRET`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`.
- Firebase: All keys read from env; see `.env.example` and `src/config/firebase.ts`.
- Do not commit secrets. Use a local `.env` (gitignored).

## Architecture Overview
- Next.js App Router, Redux Toolkit for state, MUI for UI, NextAuth for auth, and Firebase (Firestore/Storage/Auth) for data.
