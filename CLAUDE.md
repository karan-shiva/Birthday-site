# Birthday Project

A single-page birthday website for Alex (turning 25, March 15 2026).

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
└── components/
    ├── ParticleBackground.jsx  # Fixed animated orb layer (pure CSS)
    ├── Hero.jsx                # 100vh hero with confetti + balloons
    ├── Gallery.jsx             # Photo/gradient gallery grid
    ├── Messages.jsx            # Wish cards grid
```

## Design System
All design tokens live in `src/index.css` as CSS custom properties. Key tokens:
- `--accent-gold/pink/purple/mint` — the four accent colors
- `--glow-*` — matching box/text shadow glows
- `--glass-bg/blur/border/radius/shadow` — glassmorphism values
- `.glass` — global utility class applied to all cards

## Customization
- **Person name/age:** Edit `Hero.jsx`
- **Wish cards:** Edit `WISHES` array in `Messages.jsx`
- **Gallery photos:** Replace gradient `<div>` backgrounds in `Gallery.jsx` with real `<img>` tags
