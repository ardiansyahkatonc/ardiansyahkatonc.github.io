<<<<<<< HEAD
# kat.on

## Project Description
kat.on is an AI-Native Product Studio focused on helping the Indonesian public sector build better digital services through AI, automation, and context engineering. This repository contains the official MVP website for the studio.

## Tech Stack
- **Framework**: [Astro](https://astro.build)
- **Styling**: Vanilla CSS (CSS Variables & minimal utilities)
- **Deployment**: GitHub Pages
- **Architecture**: Static Site Generation (SSG), JS-Free frontend

## Architecture
The project strictly separates data from presentation:
- **Configuration** (`src/config/`): Houses `brand`, `metadata`, `navigation`, `social`, `products`, and `journey` settings.
- **Layouts** (`src/layouts/`): Houses `BaseLayout.astro` which controls global HTML structure, SEO metadata injection, and persistent UI (Header/Footer).
- **Components** (`src/components/`): Modularized UI pieces split into `layout` and `sections`.
- **CSS** (`src/styles/`): A pure vanilla CSS foundation (`global.css`) mapping to design tokens. No heavy frameworks or runtime styling are used.

## Folder Structure
```text
/
├── public/               # Static assets (robots.txt, favicon, og-image)
├── src/
│   ├── components/       # UI building blocks
│   │   ├── layout/       # Header, Footer, Navigation
│   │   └── sections/     # Hero, Mission, FeaturedProduct, Projects, etc.
│   ├── config/           # Centralized TypeScript config files
│   ├── layouts/          # Base HTML wrappers
│   ├── pages/            # Astro routing (index, 404, sitemap endpoint)
│   └── styles/           # Global design tokens and utilities
├── astro.config.mjs      # Astro build configuration
└── package.json          # Node dependencies and scripts
```

## Commands

### Development
Starts the local development server at `localhost:4321`.
```bash
npm run dev
```

### Build
Generates the production-ready static site into `./dist/`.
```bash
npm run build
```

### Deploy
Push changes to the `main` branch. GitHub Actions will automatically trigger the build and deploy to GitHub Pages.

## Roadmap
- [ ] Initialize Blog/Insights section using Astro Content Collections.
- [ ] Add standalone product landing pages (e.g., `/aria`).
- [ ] Implement multi-language support (ID/EN).

## License
MIT License. See [LICENSE](LICENSE) for details.
=======
# ardiansyahkatonc.github.io/
Official website of kat.on — AI-Native Product Studio.
>>>>>>> ba3c8258230e06702f988d069adc5eb2a3d6370b
