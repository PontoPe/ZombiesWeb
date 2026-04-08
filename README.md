# ZombiesWeb

ZombiesWeb is a Call of Duty Zombies reference site.

It currently includes:
- A map guide section
- A Kronorium timeline view
- Richtofen's Lab document exploration scene

## Stack

- Astro
- React
- Three.js with React Three Fiber
- React Flow

## Requirements

- Node.js 22.12.0 or newer
- npm

## Run locally

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

By default, Astro runs on http://localhost:4321.

## Build

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Project layout

- public/images: map images and parts assets
- src/pages: Astro routes
- src/components: React components for map and lore interfaces
- src/data: map, lore, and lab content
- src/layouts: shared page layouts
