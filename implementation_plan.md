# Header and Mobile Navigation Updates

This plan addresses the mobile navigation implementation (R1), desktop header tightening (R2), and auditing/fixing two-column sections on mobile (R3).

## R3 Audit Report: Two-Column Blocks

As requested, here is the audit of every two-column block you listed before fixing anything:

1. **Statement band on `/` (`src/app/page.tsx`)**
   - **Status**: Squeezes on mobile.
   - **Reason**: The responsive class `max-[900px]:grid-cols-1` is being overridden by an inline style `gridTemplateColumns: "minmax(0,1fr) minmax(0,1.35fr)"`.

2. **Section heads on `/` (`src/components/home/ServicesOverview.tsx` and `src/components/home/ProcessRail.tsx`)**
   - **Status**: Squeezes between 820px and 900px.
   - **Reason**: They use `grid-cols-[...]` with a break point of `max-[820px]:grid-cols-1`. Below 900px but above 820px, they are squeezed.

3. **Contact page split (`src/app/contact/page.tsx`)**
   - **Status**: Squeezes on mobile.
   - **Reason**: Similar to the statement band, `max-[900px]:grid-cols-1` is overridden by an inline style `gridTemplateColumns: "minmax(0,.85fr) minmax(0,1.15fr)"`.

4. **Capability slab content (`src/components/home/ServicesOverview.tsx`)**
   - **Status**: Squeezes between 760px and 900px.
   - **Reason**: Uses `max-[760px]:grid-cols-1`, so it remains in two columns until 760px.

5. **The process rail (`src/components/home/ProcessRail.tsx`)**
   - **Status**: Collapses fine.
   - **Reason**: It is a 4-column block that gracefully collapses to 2 columns at 980px, and 1 column at 600px. This handles its own breakpoints well, though its header block needs the 900px fix mentioned in point #2.

6. **The work rows on `/`**
   - **Status**: Not applicable.
   - **Reason**: There are no work/portfolio rows on the home page. The portfolio page (`src/app/portfolio/page.tsx`) uses a standard 3-column `md:grid-cols-2 lg:grid-cols-3` card grid that behaves correctly.

## Proposed Changes

### 1. Mobile Navigation (`src/components/layout/MobileMenu.tsx` & `Header.tsx`)
- `sheet.tsx` was completely removed from the repository, so I will build the mobile menu from scratch. This is cleaner anyway, as it avoids Radix UI dialog dependencies and gives exact control over the wipe-down motion and focus trapping.
- **Trigger**: A 44x44px button added to `Header.tsx` (left of the CTA) on mobile, toggling a Menu/X Lucide icon.
- **Panel**: A fixed full-screen overlay starting below the 74px header.
- **Content**: Left-aligned stacked links (type-h3) separated by 1px hairlines and generous vertical padding (56px). Includes the CTA button at the bottom and the studio line.
- **Behaviour & Motion**: Focus trapped, closes on Escape or link click, body scroll locked. The wipe-down is a CSS `transform: translateY` transition over 280ms, gracefully disabling on `prefers-reduced-motion`.

### 2. Desktop Header Tightening (`src/components/layout/Header.tsx`)
- Restructure the nav cluster to sit hard right.
- Add a 1px vertical `var(--border)` divider, 24px tall, with 20px gaps on either side, placed exactly between the last nav link and the CTA.
- Use `usePathname` from `next/navigation` to detect the active route, setting its color to `var(--foreground)` without pills or underlines.
- Apply a 200ms colour shift on hover for inactive links.

### 3. Two-Column Block Fixes
- **`src/app/page.tsx`**: Move the grid column specification to standard Tailwind classes to prevent inline styles from overriding the 900px breakpoint. Let the header text (`h2`) expand to full width on mobile instead of `16ch`.
- **`src/app/contact/page.tsx`**: Same fix for the contact split.
- **`src/components/home/ServicesOverview.tsx`**: Standardize the breakpoint to `max-[900px]` for both the section header and the capability slabs to prevent squeezing.
- **`src/components/home/ProcessRail.tsx`**: Standardize the section header breakpoint to `max-[900px]`.

## Verification Plan
1. Capture screenshots of the mobile header and open mobile menu at 390px in both themes.
2. Verify tab cycle/focus trapping inside the mobile menu and Escape key behaviour.
3. Capture screenshots of the desktop header at 1440px (both themes), one at the top and one scrolled, on a non-home route (e.g., `/contact`) to demonstrate the active state.
4. Capture full-page screenshots of `/` and `/contact` at 390px (both themes) to confirm two-column blocks collapse correctly.
