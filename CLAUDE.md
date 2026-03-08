# Birthday Project

A single-page birthday website for Yuga (turning 26).

## Stack
- Vite 6 + React 19 (no TypeScript)
- CSS Modules for component styles
- framer-motion ^12, canvas-confetti, react-icons

## Commands
- `npm run dev` — start dev server at http://localhost:5173
- `npm run build` — production build to `dist/`
- `npm run preview` — preview production build

## Project Structure
```
src/
├── index.css                  # Global CSS tokens and .glass utility
├── App.jsx                    # Root layout
├── products.js                # Shop product data (CATEGORIES + PRODUCTS arrays)
└── components/
    ├── ParticleBackground.jsx  # Fixed animated orb layer (pure CSS)
    ├── Hero.jsx                # 100vh hero with confetti (two-phase burst + shower) + balloons
    ├── Gallery.jsx             # 3D skewed box grid (50×33) with hover image reveal
    ├── Gallery.module.css
    ├── WishWheel.jsx           # Radial orbital timeline — nodes orbit center; click to expand wish card
    ├── WishWheel.module.css
    ├── ShopSection.jsx         # Self-contained gift shop — manages view state (home/products/confirmed)
    ├── ShopHero.jsx            # Shop landing page ("Your Birthday Boutique") with Start Shopping CTA
    ├── ShopHero.module.css
    ├── CategoryGrid.jsx        # 3 category cards (Bags, Jewellery, Clothes)
    ├── CategoryGrid.module.css
    ├── ProductCard.jsx         # Individual selectable product card
    ├── ProductCard.module.css
    ├── ProductGrid.jsx         # 4-column product grid + sticky confirm footer
    ├── ProductGrid.module.css
    ├── Confirmation.jsx        # Confetti + single/multi item confirmation screen
    └── Confirmation.module.css
```

## Page Order (App.jsx)
Hero → Gallery → WishWheel → ShopSection

## Shop Flow (ShopSection.jsx)
```
home (ShopHero + CategoryGrid stacked)
  → "Start Shopping" scrolls down to CategoryGrid
  → click category → products view (ProductGrid)
    → select items + confirm → confirmed view (Confirmation + confetti)
    → "Let me look again" → back to home
  → ← Back → back to home
```

## Design System
All design tokens live in `src/index.css` as CSS custom properties. Key tokens:
- `--accent-gold/pink/purple/mint` — the four accent colors
- `--glow-*` — matching box/text shadow glows
- `--glass-bg/blur/border/radius/shadow` — glassmorphism values
- `.glass` — global utility class applied to all cards

## Customization
- **Person name/age:** Edit `Hero.jsx`
- **Wish wheel data:** Edit `timelineData` and `birthdayMessage` in `WishWheel.jsx`. Node images use `/public/profile.jpeg`; wish card header uses `/public/wish.jpeg`.
- **Gallery images:** Replace `/public/Gemini_Generated_Image_kx1v28kx1v28kx1v.png` (default) and `/public/IMG_3247.jpeg` (hover) with your own photos. Image paths are referenced in `Gallery.jsx` `BoxesCore`.
- **Shop products:** Edit `PRODUCTS` array in `src/products.js`. Each product needs `id`, `category` (`'bags'|'jewellery'|'clothes'`), `name`, `description`, `image`.
- **Shop categories:** Edit `CATEGORIES` array in `src/products.js`.
