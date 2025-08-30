# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `yarn dev` - Start development server on http://localhost:3000
- `yarn build` - Production build
- `yarn build:dev` - Development build with NEXT_PUBLIC_MODE=dev
- `yarn start` - Start production server
- `yarn lint` - Run ESLint (next/core-web-vitals)

## Architecture Overview

This is a Next.js 14 e-commerce using App Router with comprehensive TypeScript integration.

### Core Stack
- **Frontend**: Next.js 14 (App Router), TypeScript, Material-UI v5 with Emotion
- **State Management**: Redux Toolkit with example UI slice (snackbar feedback)
- **Authentication**: NextAuth with Firebase Auth integration (Credentials + optional Google OAuth)
- **Database**: Firebase (Firestore/Storage/Auth) with env-driven configuration
- **Styling**: Material-UI theming system with custom overrides

### Key Directory Structure

**Core Application**
- `src/app/` - Next.js App Router pages and API routes (includes page components directly)
- `src/components/` - Reusable UI components (common/, layout/)

**Business Logic**
- `src/services/` - API service layers (productService, cartService, userService, etc.)
- `src/store/` - Redux Toolkit store configuration and slices
- `src/hooks/` - Custom React hooks and context hooks

**Configuration & Theme**
- `src/config/` - App configuration (authOptions.ts, firebase.ts, routes.ts, tokens.ts)
- `src/theme/` - Complete Material-UI theme system with typography, palette, overrides, breakpoints
- `src/core/` - Shared components, hooks, and i18n configuration

**Utilities**
- `src/utils/` - Helper functions (crypto, currency, date, localStorage, etc.)
- `src/types/` - TypeScript type definitions organized by domain

### Authentication Architecture
- NextAuth configuration in `src/config/authOptions.ts`
- API route at `src/app/api/auth/[...nextauth]/route.ts`
- Firebase Auth integration for credentials
- Google OAuth auto-enabled when GOOGLE_CLIENT_ID/GOOGLE_CLIENT_SECRET env vars exist
- Route protection disabled by default in middleware.ts (re-enable with withAuth as needed)

### State Management Pattern
- Redux store created in `src/store/index.ts` with StoreProvider
- Example UI feedback system: `src/store/components` + `src/core/components/SnackBar`
- Custom hooks in `src/hooks/` for common state operations

### Theme System Architecture
- Main theme configuration exported from `src/theme/index.ts`
- Component overrides in `src/theme/overrides/` (appBar, button, card, chip, input, etc.)
- Typography system in `src/theme/typography/index.ts`
- Applied globally via ThemeComponent in `src/app/layout.tsx`

## Development Rules

### Material-UI Component Requirements
**CRITICAL**: This project enforces strict Material-UI usage:
- **ALWAYS use Material-UI components** - Never use other UI frameworks or plain HTML elements
- **ALWAYS use Typography component** - Never use `<h1>`, `<p>`, `<span>`, or plain HTML text elements
- **NEVER override Typography styles** - Use theme variants instead of custom fontSize/fontWeight
- **NEVER hardcode colors, spacing, or other values** - Always use theme.palette, theme.spacing, theme.breakpoints, etc.
- All text must use `<Typography variant="h1|body1|caption|etc">` with appropriate variants
- Import from `@mui/material` and follow established theme structure

### Testing Requirements
- **Puppeteer MCP Testing**: Always test responsive design at mobile width only:
  - Mobile: 393px width (iPhone 14 Pro)
- Test navigation, content formatting, and interactive elements at this breakpoint

### Figma MCP Integration
- **Always ignore mock UI elements** when using Figma MCP tools:
  - Ignore "Status Bar/iPhone" components (these are for mockups only)
  - Ignore "URL Bar/iPhone" components (these are for mockups only)
- Focus only on the actual app content and UI components

### Environment Setup
- Copy `.env.example` to `.env` and configure required variables
- Required: `NEXTAUTH_SECRET`, Firebase public keys
- Optional: `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` for Google OAuth

## Code Style Guidelines

- Follow existing TypeScript patterns and import conventions
- Leverage the established theme system for consistent UI
- Use Redux Toolkit patterns for state management
- Keep Firebase configuration in env variables (no secrets in repo)
- Follow Material-UI sx prop and styled components patterns
- Use existing service layer patterns for API interactions
- When using puppeteer don't start another sever, a dev server is likely already running on port 3000
- Never override typography styles like line-height, font-weight, etc
- App primary display language is Spanish
- Instead of using margin bottom, use container flex box with gap
- Don't test with puppeteer unless explicitly asked to