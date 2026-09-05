# CODEBASE_CONTEXT.md
Forensic audit of `shree-it-solutions` (aka Aroh IT Solutions).
Generated: 2026-09-05. Read-only — no source files were modified.

---

## 1. REPO MAP

```
shree-it-solutions/
├── .env                      # Runtime secrets (gitignored)
├── .gitignore
├── AGENTS.md                 # Next.js agent-specific rules
├── CLAUDE.md                 # Single-line stub ("be nice")
├── README.md                 # Boilerplate create-next-app readme
├── button_67.html            # Standalone HTML prototype (not in app routing)
├── pimple_button.html        # Standalone HTML prototype (not in app routing)
├── compress_services.bat     # Windows batch script to compress service images
├── components.json           # shadcn/ui configuration
├── eslint.config.mjs         # ESLint flat config
├── next.config.ts            # Empty Next.js config (no options set)
├── next-env.d.ts             # Generated TS env types (do not edit)
├── package.json
├── package-lock.json         # npm lockfile (npm is the package manager)
├── postcss.config.mjs        # @tailwindcss/postcss plugin
├── tsconfig.json
├── public/                   # Static assets served at /
│   ├── Artboard 1–8.svg      # Brand SVGs (logos, icons)
│   ├── logos/                # UNKNOWN — contents not listed
│   ├── model/                # UNKNOWN — contents not listed
│   ├── portfolio/            # Portfolio project screenshots (PNG)
│   ├── services/             # Service page images (WEBP)
│   └── why-choose-us-*.png   # Three section photos
└── src/
    ├── app/                  # Next.js App Router
    │   ├── globals.css       # SINGLE global stylesheet; all design tokens here
    │   ├── layout.tsx        # Root layout (fonts, header, footer, toaster, GA)
    │   ├── page.tsx          # Home route /
    │   ├── about/page.tsx    # /about
    │   ├── contact/page.tsx  # /contact (client component)
    │   ├── portfolio/page.tsx# /portfolio
    │   ├── services/         # /services
    │   │   ├── page.tsx
    │   │   └── service-image.tsx
    │   ├── svg-showcase/     # /svg-showcase (internal dev page)
    │   │   └── page.tsx
    │   └── api/contact/      # POST /api/contact (Brevo email)
    │       └── route.ts
    ├── components/
    │   ├── home/             # Section-level page components
    │   │   ├── CTASection.tsx
    │   │   ├── Globe.tsx
    │   │   ├── Hero.tsx
    │   │   ├── ServicesOverview.tsx
    │   │   └── WhyChooseUs.tsx
    │   ├── layout/           # Shell components
    │   │   ├── Footer.tsx
    │   │   ├── Header.tsx
    │   │   └── SubpageHero.tsx
    │   └── ui/               # shadcn/ui primitives (customised)
    │       ├── Chatbot.tsx   # Bespoke — NOT a shadcn component
    │       ├── FadeIn.tsx    # Bespoke animation wrapper
    │       ├── button.tsx
    │       ├── card.tsx
    │       ├── checkbox.tsx
    │       ├── input.tsx
    │       ├── label.tsx
    │       ├── navigation-menu.tsx
    │       ├── sheet.tsx
    │       ├── sonner.tsx
    │       └── textarea.tsx
    └── lib/
        ├── utils.ts          # cn() helper (clsx + tailwind-merge)
        └── validations/
            └── contact.ts    # Zod schema for contact form
```

**Monorepo/workspace:** No. Single package, single `package.json`.

---

## 2. LANGUAGES & RUNTIME

| Item | Value | Source |
|------|-------|--------|
| Languages | TypeScript 5.x, TSX, CSS | `package.json:47`, file extensions |
| JS allowed | Yes (`allowJs: true`) | `tsconfig.json:6` |
| TS target | ES2017 | `tsconfig.json:3` |
| TS strict | `true` | `tsconfig.json:7` |
| Module resolution | `bundler` | `tsconfig.json:11` |
| Node version | UNKNOWN — no `.nvmrc`, no `engines` field | `package.json` |
| Browser targets | UNKNOWN — no `browserslist` in `package.json` or `postcss.config.mjs` |
| React | 19.2.4 | `package.json:24` |
| React DOM | 19.2.4 | `package.json:25` |

---

## 3. FRAMEWORK & ARCHITECTURE

- **Framework:** Next.js `16.2.10` (`package.json:22`)
- **Rendering model:** Hybrid — SSG for most pages (no `getServerSideProps` equivalents found), SSR for `/api/contact` route handler, client components where interactivity is needed.
- **Router type:** App Router (`src/app/` directory). File-system based.
- **Entry points:**
  - Root layout: `src/app/layout.tsx` — wraps all routes with `<html>`, fonts, `<Header>`, `<Footer>`, `<Toaster>`, and Google Analytics.
  - Root page: `src/app/page.tsx`
- **Server vs client component boundaries:**
  - Server components (default): `layout.tsx`, `about/page.tsx`, `services/page.tsx`, `portfolio/page.tsx`, `svg-showcase/page.tsx`
  - Client components (`"use client"`): `contact/page.tsx`, `Header.tsx`, `SubpageHero.tsx`, `Hero.tsx`, `ServicesOverview.tsx`, `WhyChooseUs.tsx`, `CTASection.tsx`, `Globe.tsx`, `Chatbot.tsx`, `FadeIn.tsx`, `service-image.tsx`, `sonner.tsx`, `sheet.tsx`
  - API route (Node.js): `src/app/api/contact/route.ts`

---

## 4. BUILD & TOOLING

**Package manager:** npm — confirmed by `package-lock.json` presence.

**Bundler:** Next.js built-in (Webpack/Turbopack depending on mode). No explicit override in `next.config.ts` (empty config).

**Transpiler:** Next.js SWC.

**PostCSS:** `@tailwindcss/postcss` plugin (`postcss.config.mjs:3`). No other plugins.

**npm scripts:**

| Script | What it does |
|--------|-------------|
| `dev` | `next dev` — starts dev server |
| `build` | `next build` — production bundle |
| `start` | `next start` — production server |
| `lint` | `eslint` (flat config, no file args — lints all) |

**ESLint:** Flat config (`eslint.config.mjs`). Extends `eslint-config-next/core-web-vitals` and `eslint-config-next/typescript`. Ignores `.next/`, `out/`, `build/`, `next-env.d.ts`.

**Test framework:** None. No test runner, no test files found.

**Git hooks:** None detected (no `.husky`, no `lint-staged` in `package.json`).

**Other tooling files:**
- `compress_services.bat` — Windows batch, manually compresses service images. Not part of the build.
- `button_67.html`, `pimple_button.html` — Standalone HTML prototypes in repo root. Not used by the app.

---

## 5. STYLING SYSTEM

### CSS Approach

**Tailwind CSS v4** (via `tailwindcss@^4`, `@tailwindcss/postcss@^4`) with shadcn/ui CSS variable tokens. No CSS Modules, no SCSS, no styled-components. **100% Tailwind utility classes** with a single global stylesheet for token definitions.

### Config Files

| File | Purpose |
|------|---------|
| `src/app/globals.css` | The ONLY stylesheet. All tokens defined here. Imported at `layout.tsx:4`. |
| `postcss.config.mjs` | Enables Tailwind via `@tailwindcss/postcss`. |
| `components.json` | shadcn CLI config — points `tailwind.css` to `globals.css`. |

There is **no `tailwind.config.js/ts`** — Tailwind v4 uses CSS-native `@theme` blocks instead.

### Design Token Setup — FULL `globals.css` Token List

**Tailwind v4 `@theme inline` block** (`globals.css:7–29`) — maps CSS vars to Tailwind color utilities:

```css
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-sans);
  --font-heading: var(--font-heading);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-tertiary: var(--tertiary);
  --color-tertiary-foreground: var(--tertiary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --radius-sm: calc(var(--radius) * 0.6);
  --radius-md: calc(var(--radius) * 0.8);
  --radius-lg: var(--radius);
}
```

### Every Color Value in the Codebase

#### Semantic Tokens — Light Mode (`:root`, `globals.css:31–53`)

| Token | Value | Tailwind class |
|-------|-------|----------------|
| `--background` | `#F8F9FA` | `bg-background` |
| `--foreground` | `#1A1A1A` | `text-foreground` |
| `--card` | `#F8F9FA` | `bg-card` |
| `--card-foreground` | `#1A1A1A` | `text-card-foreground` |
| `--popover` | `#F8F9FA` | `bg-popover` |
| `--popover-foreground` | `#1A1A1A` | `text-popover-foreground` |
| `--primary` | `#003366` | `bg-primary` / `text-primary` |
| `--primary-foreground` | `#F8F9FA` | `text-primary-foreground` |
| `--secondary` | `#1A1A1A` | `bg-secondary` |
| `--secondary-foreground` | `#F8F9FA` | `text-secondary-foreground` |
| `--tertiary` | `#0066CC` | `bg-tertiary` / `text-tertiary` |
| `--tertiary-foreground` | `#F8F9FA` | `text-tertiary-foreground` |
| `--muted` | `#e9ecef` | `bg-muted` |
| `--muted-foreground` | `#6c757d` | `text-muted-foreground` |
| `--accent` | `#0066CC` | `bg-accent` |
| `--accent-foreground` | `#F8F9FA` | `text-accent-foreground` |
| `--destructive` | `#ef4444` | `text-destructive` / `bg-destructive` |
| `--border` | `#dee2e6` | `border-border` |
| `--input` | `#dee2e6` | `border-input` |
| `--ring` | `#003366` | `ring-ring` |
| `--radius` | `0.75rem` | derived radius tokens |

#### Semantic Tokens — Dark Mode (`.dark`, `globals.css:55–76`)

| Token | Value |
|-------|-------|
| `--background` | `#1A1A1A` |
| `--foreground` | `#F8F9FA` |
| `--card` | `#212529` |
| `--card-foreground` | `#F8F9FA` |
| `--popover` | `#212529` |
| `--popover-foreground` | `#F8F9FA` |
| `--primary` | `#0066CC` |
| `--primary-foreground` | `#F8F9FA` |
| `--secondary` | `#343a40` |
| `--secondary-foreground` | `#F8F9FA` |
| `--tertiary` | `#003366` |
| `--tertiary-foreground` | `#F8F9FA` |
| `--muted` | `#343a40` |
| `--muted-foreground` | `#adb5bd` |
| `--accent` | `#003366` |
| `--accent-foreground` | `#F8F9FA` |
| `--destructive` | `#ef4444` |
| `--border` | `#495057` |
| `--input` | `#495057` |
| `--ring` | `#0066CC` |

#### Hardcoded Color Values (NOT in token system)

These will resist a palette swap and require manual edits:

| Value | Where | File | Line |
|-------|-------|------|------|
| `#003366` (bg) | Hero section background | `Hero.tsx` | 11 |
| `#003366` (gradient from) | Hero gradient overlay | `Hero.tsx` | 34 |
| `#003366` (gradient via) | Hero gradient overlay | `Hero.tsx` | 34 |
| `#003366` (gradient from) | Hero bottom gradient | `Hero.tsx` | 35 |
| `#F8F9FA` (text) | Hero h1 | `Hero.tsx` | 50 |
| `#F8F9FA` (text) | Hero paragraph | `Hero.tsx` | 54 |
| `#F8F9FA` (button bg) | Hero CTA button | `Hero.tsx` | 59 |
| `#003366` (button text) | Hero CTA button | `Hero.tsx` | 59 |
| `#F8F9FA`/`/90` | Hero CTA button hover | `Hero.tsx` | 59 |
| `white` (border, text) | Hero outline button | `Hero.tsx` | 63 |
| `#003366` (button text hover) | Hero outline button hover | `Hero.tsx` | 63 |
| `#003366` (section bg) | ServicesOverview section | `ServicesOverview.tsx` | 44 |
| `white` (text) | ServicesOverview heading | `ServicesOverview.tsx` | 53 |
| `white/80` (text) | ServicesOverview subheading | `ServicesOverview.tsx` | 54 |
| `white/10` (card border) | ServicesOverview cards | `ServicesOverview.tsx` | 70 |
| `white/5` (card bg) | ServicesOverview cards | `ServicesOverview.tsx` | 70 |
| `white/30` (card border hover) | ServicesOverview cards | `ServicesOverview.tsx` | 70 |
| `white/10` (card hover bg) | ServicesOverview cards | `ServicesOverview.tsx` | 70 |
| `white/10` (icon container) | ServicesOverview icons | `ServicesOverview.tsx` | 73 |
| `white` (icon color) | ServicesOverview icons | `ServicesOverview.tsx` | 74 |
| `white` (CardTitle text) | ServicesOverview titles | `ServicesOverview.tsx` | 76 |
| `white/80` (CardDescription) | ServicesOverview desc | `ServicesOverview.tsx` | 79 |
| `#03366` (typo: button text) | ServicesOverview "View All" | `ServicesOverview.tsx` | 93 |
| `#003366` (button hover text) | ServicesOverview "View All" | `ServicesOverview.tsx` | 93 |
| `blue-500/10` (gradient to) | WhyChooseUs gradient | `WhyChooseUs.tsx` | 62 |
| `#003366` (section bg) | About page CTA section | `about/page.tsx` | 90 |
| `white` (heading text) | About page CTA | `about/page.tsx` | 93 |
| `bg-black` / `hover:bg-black` | About page CTA button | `about/page.tsx` | 94 |
| `text-blue-300` | About SubpageHero span | `about/page.tsx` | 39 |
| `blue-500/20` (gradient to) | About story section | `about/page.tsx` | 81 |
| `text-blue-300` | Services SubpageHero span | `services/page.tsx` | 61 |
| `text-blue-300` | Portfolio SubpageHero span | `portfolio/page.tsx` | 58 |
| `text-blue-300` | Contact SubpageHero span | `contact/page.tsx` | 67 |
| `#003366` (section bg) | Portfolio CTA section | `portfolio/page.tsx` | 136 |
| `white` (text) | Portfolio CTA heading | `portfolio/page.tsx` | 138 |
| `white/80` | Portfolio CTA paragraph | `portfolio/page.tsx` | 139 |
| `#F8F9FA` (button bg) | Portfolio CTA button | `portfolio/page.tsx` | 142 |
| `#003366` (button text) | Portfolio CTA button | `portfolio/page.tsx` | 142 |
| `#F8F9FA/90` (button hover) | Portfolio CTA button | `portfolio/page.tsx` | 142 |
| `#003366` (bg, SubpageHero) | SubpageHero section | `SubpageHero.tsx` | 12 |
| `white` (text h1) | SubpageHero heading | `SubpageHero.tsx` | 31 |
| `white/80` (text p) | SubpageHero paragraph | `SubpageHero.tsx` | 39 |
| `border-gray-300` | Contact checkbox | `contact/page.tsx` | 155 |
| `rgba(255,255,255,0.35)` (stroke) | Globe graticule lines | `Globe.tsx` | 59 |
| `rgba(255,255,255,0.6)` (stroke) | Globe sphere outline | `Globe.tsx` | 66 |
| `#ffffff` (fill) | Globe continents | `Globe.tsx` | 73 |
| `rgba(255,255,255,0.5)` | Globe glow | `Globe.tsx` | 149 |
| `#003366` (email header bg) | HTML email template | `api/contact/route.ts` | 35 |
| `#0066CC` (label color) | HTML email template | `api/contact/route.ts` | 37 |
| `#0066CC` (border-left) | HTML email value boxes | `api/contact/route.ts` | 38, 39 |
| `#e0e0e0` (checkerboard) | SVG showcase background | `svg-showcase/page.tsx` | 49 |
| `#f5f5f5` (checkerboard base) | SVG showcase background | `svg-showcase/page.tsx` | 52 |
| `rgba(0,0,0,0.05)` | `.shadow-modern` | `globals.css` | 120 |
| `rgba(0,0,0,0.02)` | `.shadow-modern` | `globals.css` | 120 |
| `rgba(0,51,102,0.12)` | `.shadow-modern:hover` | `globals.css` | 124 |
| `rgba(0,51,102,0.05)` | `.shadow-modern:hover` | `globals.css` | 124 |
| `rgba(0,0,0,0.3)` | `.dark .shadow-modern` | `globals.css` | 129 |
| `rgba(0,0,0,0.2)` | `.dark .shadow-modern` | `globals.css` | 129 |
| `rgba(0,0,0,0.5)` | `.dark .shadow-modern:hover` | `globals.css` | 132 |
| `rgba(0,0,0,0.3)` | `.dark .shadow-modern:hover` | `globals.css` | 132 |

**Count of hardcoded one-off hex values (palette-swap will miss):** ≥ 48 instances across 9 files.

#### Notable Color Groups Summary
- **`#003366`** (deep navy blue) = acts as the brand primary in light mode and as hardcoded section backgrounds everywhere.
- **`#0066CC`** (medium blue) = accent/tertiary in light, primary in dark.
- **`#F8F9FA`** (near-white) = background base and foreground-on-dark.
- **`text-blue-300`** = Tailwind raw utility, used for accent spans in all SubpageHero titles (4 files). This is NOT a custom token; it maps to Tailwind's built-in palette.

### Dark Mode

- **Implemented:** Yes.
- **Mechanism:** CSS class strategy (`globals.css:5`: `@custom-variant dark (&:is(.dark *))`). Tailwind uses the `.dark` class on an ancestor element.
- **Toggle location:** The `next-themes` package (`^0.4.6`) is installed as a dependency but **no ThemeProvider is rendered in `layout.tsx`**. No theme toggle UI component exists anywhere in the component tree. **Dark mode is effectively inoperable at runtime** — there is no mechanism to add the `.dark` class to `<html>`. INFERENCE: dark mode CSS exists but the toggle was never wired up.

### Typography

| Role | Font Family | Variable | Loading |
|------|-------------|----------|---------|
| Body / sans | Inter | `--font-sans` | `next/font/google` — `layout.tsx:8` |
| Headings | Geist | `--font-heading` | `next/font/google` — `layout.tsx:13` |

Both fonts use `subsets: ["latin"]`. Variables injected on `<html>` classname (`layout.tsx:36`). Applied via `@theme inline` in `globals.css:10–11`.

### Spacing / Radius / Shadow / Breakpoints

| Category | Values | Source |
|----------|--------|--------|
| Base radius | `0.75rem` (`--radius`) | `globals.css:52` |
| Derived radii | sm = `0.75*0.6=0.45rem`, md = `0.75*0.8=0.6rem`, lg = `0.75rem` | `globals.css:26–28` |
| Shadows | `.shadow-modern` utility class (elevation + hover lift) | `globals.css:119–133` |
| Spacing | Tailwind defaults (no custom scale defined) | INFERENCE from absence of `@theme` spacing entries |
| Breakpoints | Tailwind defaults (`sm:640px, md:768px, lg:1024px, xl:1280px`) | INFERENCE from absence of custom breakpoints |

### Global Stylesheets and Load Order

1. `tailwindcss` (via PostCSS) — `globals.css:1`
2. `tw-animate-css` — `globals.css:2`
3. `shadcn/tailwind.css` — `globals.css:3`
4. Custom tokens and utilities — `globals.css:5–134`

**`globals.css` is imported once, at `layout.tsx:4`.** No other CSS imports exist anywhere in the codebase.

---

## 6. UI COMPONENT INVENTORY

### Component Library

**shadcn/ui** style `"base-nova"` (`components.json:3`), built on **`@base-ui/react@^1.6.0`** primitives (NOT Radix UI — this is the Base UI fork). `cssVariables: true`, `iconLibrary: "lucide"`. All primitives are vendored into `src/components/ui/` and customized per-repo.

### Icon Set

**Lucide React `^1.24.0`** (`package.json:21`). Used pervasively. No other icon library.

### Animation Libraries

| Library | Version | Usage |
|---------|---------|-------|
| `framer-motion` | `^12.42.2` | Used in `Header.tsx`, `Hero.tsx`, `ServicesOverview.tsx`, `WhyChooseUs.tsx`, `CTASection.tsx`, `FadeIn.tsx`, `Chatbot.tsx`, `about/page.tsx`, `contact/page.tsx` — scroll-triggered fades, spring nav animations |
| `tw-animate-css` | `^1.4.0` | Imported in `globals.css:2` — provides Tailwind `animate-*` utilities used in `CTASection.tsx` and `SubpageHero.tsx` (spinning wave SVGs) |
| `three` | `^0.185.1` | Used exclusively in `Globe.tsx` for the 3D WebGL globe |

### Reusable UI Primitives (`src/components/ui/`)

| Component | Path | Library base |
|-----------|------|-------------|
| `Button` / `buttonVariants` | `src/components/ui/button.tsx` | `@base-ui/react/button` |
| `Card`, `CardHeader`, etc. | `src/components/ui/card.tsx` | None (div-based) |
| `Input` | `src/components/ui/input.tsx` | `@base-ui/react/input` |
| `Label` | `src/components/ui/label.tsx` | — |
| `Textarea` | `src/components/ui/textarea.tsx` | — |
| `Checkbox` | `src/components/ui/checkbox.tsx` | — |
| `NavigationMenu` (full) | `src/components/ui/navigation-menu.tsx` | `@base-ui/react/navigation-menu` |
| `Sheet` (drawer) | `src/components/ui/sheet.tsx` | `@base-ui/react/dialog` |
| `Toaster` (sonner wrapper) | `src/components/ui/sonner.tsx` | `sonner` |
| `FadeIn` | `src/components/ui/FadeIn.tsx` | Bespoke (framer-motion) |
| `Chatbot` | `src/components/ui/Chatbot.tsx` | Bespoke (no library) |

### Layout / Section Components

| Component | Path |
|-----------|------|
| `Header` (floating bottom nav) | `src/components/layout/Header.tsx` |
| `Footer` | `src/components/layout/Footer.tsx` |
| `SubpageHero` | `src/components/layout/SubpageHero.tsx` |
| `Hero` | `src/components/home/Hero.tsx` |
| `Globe` | `src/components/home/Globe.tsx` |
| `ServicesOverview` | `src/components/home/ServicesOverview.tsx` |
| `WhyChooseUs` | `src/components/home/WhyChooseUs.tsx` |
| `CTASection` | `src/components/home/CTASection.tsx` |
| `ServiceImage` | `src/app/services/service-image.tsx` |

### Pages / Routes

| Route | File | Type |
|-------|------|------|
| `/` | `src/app/page.tsx` | Server component |
| `/about` | `src/app/about/page.tsx` | Server component |
| `/services` | `src/app/services/page.tsx` | Server component |
| `/portfolio` | `src/app/portfolio/page.tsx` | Server component |
| `/contact` | `src/app/contact/page.tsx` | Client component |
| `/svg-showcase` | `src/app/svg-showcase/page.tsx` | Server component (internal dev page) |
| `POST /api/contact` | `src/app/api/contact/route.ts` | API route (Node.js) |

### Components with Hardcoded Styling That Resist Token Swap

| Component | Issue |
|-----------|-------|
| `Hero.tsx` | Entire section uses `bg-[#003366]` and `text-[#F8F9FA]` inline; gradient overlays hardcode `#003366` |
| `ServicesOverview.tsx` | Section bg `bg-[#003366]`, all text/card colors are hardcoded `white` variants |
| `SubpageHero.tsx` | Section bg `bg-[#003366]`, text hardcoded white |
| `CTASection.tsx` | Uses `bg-primary` correctly but the wave SVGs use `currentColor` (fine) |
| `about/page.tsx` | Bottom CTA section uses `bg-[#003366]`, CTA button is `bg-black hover:bg-black` |
| `portfolio/page.tsx` | Bottom CTA section uses `bg-[#003366]`, button uses raw hex |
| `Globe.tsx` | WebGL canvas texture uses hardcoded `#ffffff` for continent fill and `rgba(255,255,255,…)` for grid lines |
| `contact/page.tsx` | Checkbox uses `border-gray-300` |
| `api/contact/route.ts` | HTML email template has inline styles with `#003366` and `#0066CC` |
| `svg-showcase/page.tsx` | Checkerboard background uses hardcoded `#e0e0e0` / `#f5f5f5` |
| `globals.css` | `.shadow-modern` uses `rgba(0,51,102,…)` — the numeric form of `#003366` |

---

## 7. STATE & DATA

| Category | Implementation |
|----------|---------------|
| Client state | React `useState`/`useEffect` only. No Redux, Zustand, Jotai, etc. |
| Server state / fetching | `fetch()` called client-side in `contact/page.tsx:35` for form submission. No SWR, React Query, or tRPC. |
| Form management | `react-hook-form@^7.81.0` with `@hookform/resolvers@^5.4.0` + Zod schema |
| Validation | `zod@^4.4.3` — schema at `src/lib/validations/contact.ts` |
| Chatbot state | `localStorage` persistence (`aroh_chat_history`, `aroh_chat_count`) via `useEffect` in `Chatbot.tsx:138–170` |
| Fuzzy search (chatbot) | `fuse.js@^7.5.0` for NLP intent matching |
| Caching | None — no ISR/revalidate tags, no client-side cache layer |
| Toast notifications | `sonner@^2.0.7` via `<Toaster>` in root layout |

---

## 8. BACKEND & DATA LAYER

| Category | Value |
|----------|-------|
| API style | REST. Single route: `POST /api/contact` |
| Route location | `src/app/api/contact/route.ts` |
| Database | None. No ORM, no schema, no migration files. |
| Auth | None. No authentication. |
| Email/SMTP | Brevo (formerly Sendinblue) transactional email API at `https://api.brevo.com/v3/smtp/email` (`route.ts:77`) |
| CRM | Brevo contacts API at `https://api.brevo.com/v3/contacts` (`route.ts:105`) — triggered when `subscribe: true` |
| Middleware | None (`middleware.ts` absent) |
| File uploads | None |
| External data at runtime | World Atlas TopoJSON fetched from `https://unpkg.com/world-atlas@2.0.2/land-110m.json` (`Globe.tsx:10`) at client runtime |

---

## 9. THIRD-PARTY SERVICES

**Key names only — no secret values.**

| Service | Purpose | Initialized At | Env Vars |
|---------|---------|---------------|----------|
| **Brevo** | Transactional email + CRM contacts | `src/app/api/contact/route.ts:20` | `BREVO_API_KEY` |
| **Google Analytics** | Web analytics | `src/app/layout.tsx:3,46` via `@next/third-parties/google` | Placeholder `G-XXXXXXXXXX` hardcoded — not yet a real env var |
| **Google Fonts** (CDN) | Font loading (Inter, Geist) | `src/app/layout.tsx:2,8,13` via `next/font/google` | None |
| **unpkg.com** | World Atlas JSON for Globe component | `src/components/home/Globe.tsx:10` | None |

**Categories with no implementation found:** payments, SMS, error monitoring (e.g., Sentry), CMS, search, AI/LLM, maps, file storage/CDN, feature flags, queues/cron.

**`.env` file access was denied** — env var names were derived from source code only.

---

## 10. INFRASTRUCTURE

| Category | Value | Source |
|----------|-------|--------|
| Hosting target | INFERENCE: Vercel — README mentions Vercel deploy, `.gitignore` ignores `.vercel` directory | `README.md:33`, `.gitignore:37` |
| CI/CD | None found — no `.github/workflows/`, no `vercel.json`, no `Dockerfile` | Absence |
| Containerization | None | Absence |
| Environments | UNKNOWN — only `.env` (gitignored, denied) found. No `.env.example`. | |
| Domains/redirects | None configured in `next.config.ts` (empty config) | `next.config.ts:3–5` |
| Headers | None configured | `next.config.ts` |
| `next.config.ts` | Effectively empty — `{}` config | `next.config.ts` |

---

## 11. QUALITY & RISK

### Test Coverage
**Zero tests.** No test runner, no test files, no coverage config.

### TypeScript Strictness
`strict: true` in `tsconfig.json:7`. However:
- `Globe.tsx:43` uses `any` annotation: `function buildTexture(land: any)` and `as any` casts on lines 53, 69, 84.
- No systematic `any` density scan was possible without running the compiler.

### Accessibility
- `aria-label` present on nav links and chat buttons (`Header.tsx:108, 138`).
- `sr-only` span present on sheet close button (`sheet.tsx:75`).
- `alt` text on all `<img>` tags found.
- `<input type="checkbox">` on contact form (`contact/page.tsx:152`) uses a raw `<input>` not the shadcn `Checkbox` component — inconsistent.
- No skip links, no focus management for the Chatbot modal on mobile, no ARIA roles for the custom chatbot dialog.

### Dead Code
- `NavigationMenu` component (`navigation-menu.tsx`) imported nowhere in the app — dead shadcn component.
- `Sheet` / `SheetTrigger` etc. (`sheet.tsx`) imported nowhere — dead shadcn component.
- `Checkbox` (`checkbox.tsx`) imported nowhere (contact form uses raw `<input type="checkbox">`) — dead shadcn component.
- `ServiceImage` has an unused `hovered` state (`service-image.tsx:13`) — dead state variable.

### Duplicated Components
- `about/page.tsx` and `portfolio/page.tsx` both have bottom CTA sections with `bg-[#003366]` identical structure — not extracted into a shared component.
- `CTASection.tsx` also provides this pattern but is not reused.

### Deprecated / Vulnerable Dependencies
- `@base-ui/react@^1.6.0` — relatively new library, API may still be volatile.
- `react-globe.gl@^2.38.0` and `cobe@^2.0.1` are in `dependencies` but `Globe.tsx` uses a custom THREE.js implementation and imports from neither — both are unused dead dependencies.

### TODO/FIXME Clusters
- `layout.tsx:22`: `"YOUR_GOOGLE_SEARCH_CONSOLE_VERIFICATION_KEY"` — placeholder not replaced.
- `layout.tsx:45–46`: Comment says to replace `G-XXXXXXXXXX` with real GA ID.
- `ServicesOverview.tsx:93`: `text-[#03366]` — likely a typo for `#003366` (missing a `0`).
- `about/page.tsx:82`: `"Team Photo Placeholder"` text in the story section.
- `Footer.tsx:35,39`: Placeholder address and phone number.
- `Footer.tsx:52–54`: Social links are all `href="#"`.

---

## 12. DESIGN-INJECTION MAP

### a) Where to define a new color palette for app-wide propagation

**Single file:** `src/app/globals.css`

- Lines 31–53: `:root { }` block — light mode semantic tokens
- Lines 55–76: `.dark { }` block — dark mode semantic tokens
- Lines 119–133: `.shadow-modern` — shadow values referencing `rgba(0,51,102,…)` = `#003366`

Changing values in `:root` / `.dark` will propagate to every component that uses the semantic Tailwind tokens (`bg-primary`, `text-muted-foreground`, etc.).

### b) Naming convention for new tokens

The existing convention is **shadcn semantic naming** — all custom properties follow the pattern `--[semantic-role]` and `--[semantic-role]-foreground`. Tokens are registered in Tailwind via `@theme inline` as `--color-[role]`.

To add a new token:
1. Add `--my-token: #value;` in `:root` and optionally `.dark { }` in `globals.css`
2. Add `--color-my-token: var(--my-token);` inside `@theme inline { }` in `globals.css`
3. Use as `bg-my-token`, `text-my-token`, `border-my-token` in Tailwind classes.

Do not introduce a `tailwind.config.ts` — Tailwind v4 does not use one; configuration is CSS-only.

### c) Files/components that hardcode colors and need manual edits (full list)

| File | Hardcoded instances |
|------|---------------------|
| `src/components/home/Hero.tsx` | `bg-[#003366]`, gradient `from-[#003366]`, `via-[#003366]/90`, `to-[#003366]`, button colors `bg-[#F8F9FA] text-[#003366]`, outline button `border-white text-white hover:text-[#003366]` |
| `src/components/home/ServicesOverview.tsx` | `bg-[#003366]` section, all `text-white`, `border-white`, `bg-white/…` cards, hover states, `text-[#03366]` (typo), hover:text-[#003366]` button |
| `src/components/home/WhyChooseUs.tsx` | `from-primary/10 via-background to-blue-500/10` gradient |
| `src/components/layout/SubpageHero.tsx` | `bg-[#003366]` section, `text-white`, `text-white/80` |
| `src/components/home/Globe.tsx` | Canvas: `rgba(255,255,255,0.35)`, `rgba(255,255,255,0.6)`, `#ffffff`; DOM: `rgba(255,255,255,0.5)` |
| `src/app/about/page.tsx` | `bg-[#003366]` CTA, `text-white`, `bg-black hover:bg-black` button, `text-blue-300` span, `from-primary/20 to-blue-500/20` |
| `src/app/services/page.tsx` | `text-blue-300` span |
| `src/app/portfolio/page.tsx` | `bg-[#003366]` CTA, `text-white`, `text-white/80`, `bg-[#F8F9FA] text-[#003366]` button, `text-blue-300` span |
| `src/app/contact/page.tsx` | `border-gray-300` checkbox, `text-blue-300` span |
| `src/app/api/contact/route.ts` | HTML email template inline styles: `background-color: #003366`, `color: #0066CC`, `border-left: 4px solid #0066CC` |
| `src/app/svg-showcase/page.tsx` | Checkerboard `#e0e0e0`, `#f5f5f5` (decorative, low priority) |
| `src/app/globals.css` | `.shadow-modern` `rgba(0,51,102,…)` values |

**Special case — `text-blue-300`:** Used in `about/page.tsx:39`, `services/page.tsx:61`, `portfolio/page.tsx:58`, `contact/page.tsx:67`. This is a Tailwind built-in color (`blue-300` = `#93c5fd`). It does not participate in the token system. To make it palette-swappable, convert to a custom token like `text-accent-highlight`.

### d) Generated / vendored / build-output — do NOT hand-edit

| Path | Reason |
|------|--------|
| `.next/` | Build output. Regenerated on every `next build`. |
| `next-env.d.ts` | Auto-generated by Next.js TypeScript plugin. |
| `node_modules/` | npm dependencies. |
| `package-lock.json` | Auto-managed by npm. |
| `*.tsbuildinfo` | TypeScript incremental build cache. |

### e) Blast radius — routes/components that visibly change with a palette swap

**Token-level swap in `globals.css` `:root` / `.dark`:**

| Route / Component | What changes |
|-------------------|-------------|
| ALL routes | Body background (`--background`), body text (`--foreground`), border colors (`--border`) |
| `Header.tsx` | Nav bar background (`bg-background/95`), active indicator (`bg-foreground`), chat button (`text-primary`, `bg-primary/10`, `bg-primary`, ping `bg-primary/30`), tooltips (`bg-foreground`) |
| `Footer.tsx` | Background, text, `text-primary` heading, icon hover colors |
| `WhyChooseUs.tsx` | Section background, heading, paragraph, icon color `text-primary`, gradient `from-primary/10` |
| `CTASection.tsx` | Section background/text via `bg-primary text-primary-foreground` |
| `about/page.tsx` | Value icons, gradient, CTA section partially |
| `services/page.tsx` | Icon containers, "Discuss" button |
| `portfolio/page.tsx` | Card icon badge, CardTitle hover, "Visit Website" button hover |
| `contact/page.tsx` | Form input focus rings, icon colors, submit button |
| `svg-showcase/page.tsx` | Heading accent span `text-primary`, download link `text-primary` |
| `Chatbot.tsx` | Header `bg-primary`, user bubble `bg-primary`, send button `bg-primary`, focus ring `ring-primary/50`, option button hover `border-primary hover:bg-primary/5` |
| All shadcn UI primitives | `button.tsx` default/outline/link variants; `card.tsx`; `input.tsx`; `navigation-menu.tsx`; `sonner.tsx` |

**Hardcoded sections NOT changed by token swap (require file edits):**
- `Hero.tsx` entire background + buttons
- `ServicesOverview.tsx` entire section + cards
- `SubpageHero.tsx` — used on About, Services, Portfolio, Contact pages (4 routes)
- `Globe.tsx` canvas colors
- Email template in `api/contact/route.ts`

### f) Existing constraints a new design must respect

1. **The Globe component** (`Globe.tsx`) renders a WebGL canvas. Its continent/grid colors are hard-typed into the canvas drawing API. The globe always appears on a dark navy background (`Hero.tsx` section uses `bg-[#003366]`). Any new primary color must either: (a) remain dark enough to contrast with white globe geometry, or (b) require Globe.tsx canvas color edits.

2. **No active dark mode toggle** — the dark mode token set exists in CSS but is never activated at runtime. A palette swap should either: (a) also wire up a ThemeProvider, or (b) ignore the `.dark` block.

3. **`text-blue-300`** accents used on all subpage hero titles are Tailwind built-in, not a custom token. They will not respond to token changes; they hardcode a specific hue.

4. **Brand SVGs** (`/Artboard 1–8.svg`, `/logos/`) — contents not audited (access to `logos/` directory was not listed). SVGs likely contain hardcoded fill colors matching the `#003366`/`#0066CC` palette. Palette changes may create contrast clashes with these assets.

5. **Portfolio screenshots** (`/portfolio/*.png`) and **service images** (`/services/*.webp`) are real photographs/designs of external websites. They are not recolorable.

6. **Email template** (`route.ts:28–75`) is an inline HTML string. It has its own inline CSS using the brand colors. It must be edited separately and is completely decoupled from the CSS token system.

7. **No print styles, no email CSS template file, no third-party widget styling** (no maps embeds, no payment widgets).

8. **`components.json`** `"style": "base-nova"` — if re-running the shadcn CLI, it will use this style. Ensure new tokens respect the shadcn `cssVariables: true` mode.

### g) Safest implementation path for a restyle

**Recommendation: Token-level swap FIRST, then manual component edits.**

**Rationale:**

The token system in `globals.css` is well-structured and comprehensive. The majority of interactive UI (buttons, inputs, chatbot, header, footer) correctly uses semantic tokens and will update automatically with a `:root` change. However, ~9 files contain hardcoded hex values for large visual sections (hero, services, subpage heroes, CTAs). These sections use a "dark navy full-bleed" design pattern that is explicitly not mediated by tokens.

**Step-by-step:**

1. **Edit `globals.css`** `:root { }` and `.dark { }` blocks only. Replace all hex values with new palette values. Confirm `@theme inline` block needs no changes (it references vars, not hardcoded colors). Also update `rgba(0,51,102,…)` values in `.shadow-modern`.

2. **Find and replace `#003366`** across: `Hero.tsx`, `ServicesOverview.tsx`, `SubpageHero.tsx`, `about/page.tsx`, `portfolio/page.tsx`. This is the dominant hardcoded value. Consider replacing it with `var(--primary)` or a new token to stay in-system.

3. **Replace `text-blue-300`** in 4 files with a custom token (e.g., `text-highlight`) defined in `globals.css` for palette-safe accent spans.

4. **Update email template** in `route.ts` manually (inline styles, not CSS classes).

5. **Update Globe canvas colors** in `Globe.tsx` if globe background color changes.

6. **Do not** touch `.next/`, `next-env.d.ts`, `node_modules/`, `package-lock.json`.

Do **not** attempt a component-level rewrite — the codebase is coherent enough that a token swap achieves ~70% of the work. The remaining 30% is targeted find-and-replace of `#003366` and `white`/`text-white` in the listed files.

---

## 13. UNKNOWNS

- **Node.js version** — no `.nvmrc`, no `engines` field in `package.json`. Would resolve with: check `.node-version` if present, or `node --version` on the dev machine.
- **Browser targets** — no `browserslist` config. Would resolve by checking `package.json` for a `"browserslist"` key or a `.browserslistrc` file (neither found).
- **`.env` contents** — file access was denied. The only confirmed key name is `BREVO_API_KEY` (from `route.ts:20`). Other vars (if any) are unknown. Would resolve with: read `.env` or request a `.env.example`.
- **`public/logos/` directory contents** — listed as a subdirectory but not enumerated. Likely brand logos with hardcoded colors. Would resolve with: `list_dir public/logos/`.
- **`public/model/` directory contents** — listed as a subdirectory but not enumerated. Purpose unknown. Would resolve with: `list_dir public/model/`.
- **`CLAUDE.md` content** — file exists at root (11 bytes). Not read. Would resolve with: read the file.
- **`shadcn/tailwind.css`** — imported in `globals.css:3` as a package import. Its exact token contributions are unknown without inspecting `node_modules/shadcn/tailwind.css`. Would resolve with: `view_file node_modules/shadcn/tailwind.css`.
- **`react-globe.gl` and `cobe` usage** — both are in `dependencies` but no imports were found in source. Confirmed dead/unused based on full component tree read, but cannot rule out dynamic imports not encountered. Would resolve with: `grep -r "react-globe\|cobe" src/`.
- **Dark mode ThemeProvider** — `next-themes` is installed but no `ThemeProvider` was found in `layout.tsx`. Checked all files; not wired up. Would resolve with: confirm no provider exists elsewhere using a global grep for `ThemeProvider`.
- **Vercel hosting** — inferred from README and `.gitignore`. No `vercel.json` exists to confirm project configuration. Would resolve with: check Vercel dashboard or presence of `vercel.json`.
- **Google Analytics ID** — `G-XXXXXXXXXX` is a placeholder in `layout.tsx:46`. The real ID is unknown. Would resolve with: read `.env`.
- **Artboard SVG colors** — the 8 SVG files in `public/` likely contain hardcoded fill colors matching the brand palette. Their internal color values were not audited. Would resolve with: read each SVG file.
