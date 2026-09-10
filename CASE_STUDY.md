# Building NOVA: A Case Study in Design-Led Frontend Engineering

## The Problem

Most portfolio e-commerce projects look like Shopify clones — a logo, a product grid, a cart. They demonstrate CRUD competence but not product or design judgment. I wanted to build something that answered a harder question: can I take strong art direction (editorial layout, oversized typography, asymmetrical composition) and combine it with genuinely solid engineering — real state management boundaries, accessibility, performance discipline — without either side compromising the other?

## Goal

Build NOVA: a premium, editorial-inspired storefront with a complete purchase flow (browse → cart → checkout → order history), paired with an internal admin dashboard for managing that store — two genuinely different design languages living in one codebase, sharing real data.

## Design Inspiration & System

I used a single reference site (Nuro) purely for high-level principles — bold art direction, oversized type, asymmetrical composition, scroll storytelling — never copying its layouts, colors, or copy directly. From there I built an original design system: a warm ivory/charcoal palette with one restrained terracotta accent, a Manrope-based type scale defined as design tokens, and a "clay" tactile layer (soft, rounded, shadowed interactive elements) used deliberately *only* for buttons, badges, and floating controls — not the whole interface. The brief I wrote for myself was explicit about this: claymorphism as accent, not identity, to avoid the generic "Dribbble concept" look.

The admin dashboard uses a completely different visual language on purpose — dense, conventional SaaS patterns, sharp `rounded-lg` corners instead of clay, fast/functional motion instead of slow editorial reveals. Two systems, one codebase, each fit to its actual job.

## Architecture

**Component → Custom Hook → TanStack Query → API layer** for anything server-shaped (products, categories) — even though there's no real backend, the API layer's functions (`fetchProducts`, `fetchProductBySlug`) return real Promises with simulated network latency, matching the exact shape a real `axios.get(...)` call would have. Swapping in a real backend later means changing the inside of a handful of functions, not rewriting every component that consumes them.

**Redux Toolkit** for genuinely global client state — cart, wishlist, order history, auth session, and (deliberately, in its own separate slice) admin product edits. That last one was a specific architectural decision worth calling out: the storefront's product data flows through TanStack Query, simulating a read-only API response. Admin needs to *mutate* products. Rather than making the "API layer" secretly stateful and writable — which would misrepresent what a real API boundary looks like — Admin gets its own Redux-backed copy of the catalog, seeded from the same source data. Two slices, one clear reason for the split.

**Plain React state** for everything local and temporary — form fields mid-edit, which filter sheet is open, which product gallery image is active.

## Technical Decisions Worth Highlighting

**Derived, not stored, calculated values.** Discount prices, cart subtotals, order totals — none of these are stored as their own state field. They're computed at render time from source values (`price`, `discount`, `quantity`). This meant a product's price could change in the mock catalog and every discount badge, cart line, and order total downstream would update correctly, automatically, with zero risk of drift.

**Derived "Customers" from real orders, not a fake table.** Rather than inventing a disconnected mock customer database for the admin Customers page, I wrote a `deriveCustomers()` function that aggregates unique customers directly from real placed orders — order count, total spent, last order date, all genuinely computed. Place a real order through checkout, and it correctly appears in Admin's customer list. This is a small thing, but it's the difference between a page that *looks* like a feature and one that actually *is* one.

**One shared motion vocabulary, not five.** Early in the build, each new section's scroll-reveal animation was hand-typed with slightly different durations and viewport thresholds — a real, if small, form of drift. I centralized the pattern into two shared utilities (`fadeUp`/`fadeUpDelay`) so every editorial section shares one deliberate "voice," while grids correctly use a different, appropriately-tuned stagger pattern for their shape. Admin, separately, uses a faster, more functional motion language on purpose — the two are consistent *within* their own context, deliberately different *between* contexts.

**Route-based code splitting.** The entire Admin bundle — including Recharts, a genuinely large charting library — only downloads for an authenticated admin visiting `/admin`. A storefront customer never pays that cost. This was confirmed, not assumed: I ran a production build and read the actual chunk output to verify the split worked as intended, rather than trusting that `React.lazy` alone was sufficient.

## Challenges & How I Solved Them

**A tsconfig edit silently broke JSX compilation across the entire app.** While adding path aliases for shadcn/ui, an edit to `tsconfig.json` dropped the `jsx: "react-jsx"` compiler option, cascading into ~80 "Cannot use JSX" errors across every file in the Problems panel. The fix wasn't 80 individual corrections — it was recognizing the pattern (every error traced to one missing config value) and restoring the full, correct compiler options in one pass. A good reminder that a wall of errors is often one root cause, not eighty.

**shadcn's CLI installed a react-aria-components-based Sheet, not the Radix-based one I'd written against.** My first `CartDrawer` implementation used `open`/`onOpenChange` props assuming Radix's API; the actual generated component used React Aria's `isOpen` naming and a different composition pattern entirely. Rather than guess again, I asked for the real generated file's source and rewrote the integration against its actual prop contract — a concrete lesson in verifying library APIs directly rather than assuming based on naming conventions from a different (if similar) ecosystem.

**A hook-order violation crashed the Product Details page.** Adding wishlist state to a component with early `return` statements for loading/error states meant a Redux hook sometimes ran, sometimes didn't, depending on render path — React's Rules of Hooks violated. The fix (and the broader lesson): every hook call must sit above any conditional return, with no exceptions, because React tracks hook identity by call order, not name.

**shadcn's `init` silently overwrote my design tokens.** Running the CLI to add the Sheet component injected its own `--muted`, `--accent`, and font variables into the same CSS custom-property names my design system already used — invisible until specific text (discount labels, the Add to Cart button) started rendering in shadcn's default neutral gray instead of NOVA's terracotta. The fix was reconciling the two token systems deliberately: shadcn's semantic variable *names* (`--muted`, `--accent`) now resolve to NOVA's actual brand values, so both my own components and shadcn's stay correctly themed from one source of truth.

## Performance & Accessibility

Beyond code splitting, I ran a systematic accessibility pass rather than fixing issues reactively: found and corrected an invalid nested-interactive-element bug (a button inside a link), added a skip-to-content link, audited every heading level for correct hierarchy, and checked every image's alt text — most were already correct, which itself was worth documenting, since a clean audit is still evidence of care, not a wasted step. Reduced-motion support was similarly targeted, not blanket-applied: I audited every animation in the app and found exactly one — a continuously looping price badge — that actually needed a `prefers-reduced-motion` gate, and explained why the rest (one-time entrance reveals, hover-triggered interactions) didn't.

## What I'd Do Differently With More Time

- A real backend and payment processor, closing the gap the mock layers are honest about
- Individual order detail pages, not just the list view
- Persisted admin catalog edits (currently reset on refresh, unlike orders)
- A genuinely redesigned mobile admin experience, rather than the honest "desktop required" scope boundary I shipped instead

## Lessons Learned

The biggest one: a wall of red errors is usually not a wall of separate problems. Nearly every major debugging session in this build — the tsconfig JSX flood, the shadcn Sheet API mismatch, the token collision — turned out to be one root cause with many visible symptoms. Learning to find the *one* thing before touching two dozen files saved real time, repeatedly.

The second: architectural honesty is a feature, not a limitation. Every mock or simplified piece of this project — payment, auth, the admin/storefront data split — is documented for exactly what it is and why. That turned out to be more valuable than pretending those pieces were more real than they are.