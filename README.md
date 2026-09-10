# NOVA — Premium E-Commerce Platform

A design-forward, editorial-inspired e-commerce experience built to explore modern React architecture, motion design, and full-stack product thinking — from storefront to checkout to an internal admin dashboard.

Live demo: _add your deployed URL here_

---

## Overview

NOVA reimagines e-commerce as a brand experience rather than a product grid. The storefront draws on editorial art direction — oversized typography, asymmetrical composition, scroll-triggered reveals — layered with a secondary tactile "clay" UI language for interactive controls (buttons, badges, floating elements). The admin dashboard deliberately breaks from that language entirely, adopting a conventional, usability-first SaaS design, since data-dense internal tools and consumer-facing brand experiences have different jobs to do.

## Features

**Storefront**
- Editorial homepage: hero, brand story, featured product, category exploration, new arrivals
- Full product catalog with search, category/price/rating filters, sort, and URL-synced state
- Product detail pages with an accessible, keyboard-navigable image gallery
- Wishlist, cart (drawer + full page), and a real 4-step checkout (shipping → delivery → payment → review) with Zod-validated forms
- Order history, persisted to `localStorage`
- Account/profile pages

**Admin**
- Dashboard with live and baseline-estimated metrics, charted with Recharts
- Full product CRUD (create, edit, delete) backed by Redux
- Orders and Customers views, both derived live from real order data — no fake tables
- Role-gated access, fully separated visual shell from the storefront

**Auth**
- Mock authentication with two roles (customer, admin), route-guarded, session-persisted

## Design System

- **Palette:** warm ivory background, deep charcoal text, one bold terracotta accent — deliberately restrained, not a rainbow interface
- **Typography:** Manrope, self-hosted, with a custom scale (display/headline/title/body/caption) defined as Tailwind v4 `@theme` tokens
- **Motion:** two distinct motion languages — slower, editorial reveals on the storefront (`cubic-bezier(0.16, 1, 0.3, 1)`), fast/functional cascades in admin — built on Framer Motion, with `prefers-reduced-motion` respected for continuous/decorative animation
- **Clay/tactile layer:** rounded, soft-shadowed interactive elements (buttons, badges, floating price tags), used selectively rather than applied to the whole UI

## Architecture

Component → Custom Hook → TanStack Query → API layer → (mock data, shaped like a real fetch)


- **Server-shaped state** (products, categories): TanStack Query, reading from a mock API layer with simulated network latency — the API layer's function signatures match what a real REST call would look like, so swapping in a real backend later is a contained change, not a rewrite
- **Global client state** (cart, wishlist, orders, admin product edits, auth session): Redux Toolkit
- **Local/transient UI state**: plain React state
- **Forms**: React Hook Form + Zod, shared validation schema pattern across Checkout, Login, and the Admin product form

## Tech Stack

React 18 · TypeScript · Vite · Tailwind CSS v4 · Framer Motion · Redux Toolkit · TanStack Query · React Router · React Hook Form + Zod · Recharts · shadcn/ui (react-aria-components-based)

## Folder Structure

src/
├── api/ # Mock API layer, shaped like real REST calls
├── components/ # layout, navigation, editorial, products, cart,
│ checkout, filters, account, admin, auth, ui
├── pages/
├── hooks/
├── redux/
├── types/
├── data/ # Mock catalog, categories, demo accounts
└── lib/ # Motion tokens, layout tokens, derived-data helpers


## State Management Rationale

| State | Tool | Why |
|---|---|---|
| Products, categories | TanStack Query | Server-shaped data — caching, loading/error states, and a swap-in path to a real API |
| Cart, wishlist, orders, auth session | Redux Toolkit | Genuinely global, read from multiple unrelated components simultaneously |
| Admin product edits | Redux Toolkit (separate slice) | Deliberately *not* the same slice as the read-only storefront catalog — mutating what's meant to simulate a read-only API response would be architecturally wrong |
| Form fields, modal/drawer open state | React state | Local, temporary, single-component concerns |

## Known Limitations (Honest, By Design)

This is a portfolio/demo project, and several simplifications are intentional, not oversights:

- **No real backend.** The "API layer" simulates network latency but reads from static mock data.
- **No real payment processing.** Checkout's payment step is a fully validated UI with no data transmitted anywhere — explicitly disclosed on the form itself.
- **Mock authentication.** Two demo accounts, no real password hashing or server-side session — see `src/data/mockAccounts.ts` for credentials and reasoning.
- **Admin product edits don't persist to `localStorage`** (unlike Orders, which do) — a refresh resets the catalog to its original mock state.
- **Admin is desktop/tablet-only** (below `lg` breakpoint, a "Desktop Required" message shows) — a deliberate scope decision, not a bug; dense data tables and multi-chart dashboards don't meaningfully redesign for a phone screen without a much larger separate effort.
- **"Customers" in Admin are derived from unique emails across real orders**, not a real customer database — genuinely computed from real data, but there's no standalone customer record beyond what an order implies.

## Performance & Accessibility

- Route-based code splitting (`React.lazy` + `Suspense`) — the entire Admin bundle (including Recharts) only loads for authenticated admin users, never for storefront visitors
- Vendor chunk splitting (React, Framer Motion, Redux, Recharts) for better long-term browser caching across deploys
- Self-hosted, subset font loading (4 weights, not a full variable family)
- `prefers-reduced-motion` respected for continuous animation
- Semantic HTML, labeled form fields, accessible dialogs (via react-aria-components), skip-to-content link, and a full heading-hierarchy/alt-text audit pass

## Environment Variables

VITE_API_BASE_URL= # Not currently used (mock data layer) — reserved for a real backend swap


## Getting Started

```bash
npm install
npm run dev
```

**Demo accounts** (see login page):
- Customer: `alex@nova.com` / `customer123`
- Admin: `admin@nova.com` / `admin123`

## Future Improvements

- Real backend + payment processor integration
- Persisted admin catalog edits
- Individual order detail pages (`/orders/:id`)
- Real customer accounts, not order-derived
- Mobile-responsive admin dashboard