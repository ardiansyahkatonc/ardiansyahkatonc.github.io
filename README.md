# kat.on

## Project Overview
kat.on is an AI-Native Product Studio focused on helping the Indonesian public sector build better digital services through AI, automation, and context engineering. This repository contains the official MVP website for the studio and the launch platform for our flagship product, ARIA.

## Mission
Technology should simplify work, not make it more complicated. We design AI-native products that help organizations manage knowledge, streamline workflows, and accelerate digital transformation while keeping people at the center of every decision.

## Tech Stack
- **Framework**: [Astro](https://astro.build)
- **Styling**: Vanilla CSS (CSS Variables & minimal utilities)
- **Deployment**: GitHub Pages
- **Architecture**: Static Site Generation (SSG), JS-Free frontend

## Architecture
The project strictly separates data from presentation:
- **Configuration** (`src/config/`): Houses `brand`, `metadata`, `navigation`, `social`, `products`, and `journey` settings.
- **Layouts** (`src/layouts/`): Houses `BaseLayout.astro` which controls global HTML structure, SEO metadata injection, and persistent UI (Header/Footer).
- **Components** (`src/components/`): Modularized UI pieces split into layout components and reusable UI components.
- **Pages** (`src/pages/`): Astro routing (index, aria, 404, sitemap endpoint).
- **CSS** (`src/styles/`): A pure vanilla CSS foundation (`global.css`, `layout.css`, `typography.css`) mapping to design tokens.

## Design System
Built on the **Essential Component Foundation (ECF)**.
- Adheres to strict design tokens mapped to CSS custom properties.
- Reusable UI primitives located in `src/components/ui/` (Button, Badge, Card, Container, Section).
- Ensures WCAG AA accessibility, responsive grid layouts, and consistent spacing rules.

## Development

Starts the local development server at `localhost:4321`.
```bash
npm run dev
```

Generates the production-ready static site into `./dist/`.
```bash
npm run build
```

## Deployment
Push changes to the `main` branch. GitHub Actions will automatically trigger the build and deploy to GitHub Pages.

## Roadmap
- [ ] Initialize Blog/Insights section using Astro Content Collections.
- [ ] Implement multi-language support (ID/EN).
- [ ] Replace placeholder social links and contact info.
- [ ] Add explicit security and data privacy messaging.

## License
MIT License. See [LICENSE](LICENSE) for details.
