# ZombiesWeb

ZombiesWeb is a Call of Duty Zombies knowledge platform that combines structured guide data with interactive storytelling systems.

The project is split into three product surfaces:
- **Operative Hub** — map database, buildables, Easter Egg steps, and setup context
- **The Kronorium** — an interactive lore graph and chronicle timeline across every map
- **Richtofen's Lab** — a first-person 3D scene for lore recovery through exploration

## Why this project is different

Most fan resources present data as static pages. ZombiesWeb treats information as an experience:
- Timeline data is modeled as a connected entity graph, not disconnected articles.
- The chronicle is visualized as a physical outward spiral, matching the in-universe book.
- The lab scene is spatial and interactive — lore discovery happens through movement and context.
- Map guide pages stay static and fast so they work on a phone or second monitor while playing.

## Technical stack

- **Astro 6** — routing, page composition, static-first output
- **React 19** — interactive islands for canvases and stateful UI
- **Tailwind CSS v4** — via `@tailwindcss/vite`
- **GSAP** — landing-page animations (parallax, particles, mouse-follow glare)
- **React Flow** — the Kronorium map-timeline graph
- **React Three Fiber + Drei** — Three.js scene graph for Richtofen's Lab
- **Fabric.js** — reserved for a planned theorist corkboard surface

## Landing page

The home page is a split OPS / LORE diptych built in [src/pages/index.astro](src/pages/index.astro):

- **OPS panel** — HUD brackets, scanlines, and a parallax grid that tracks the cursor via GSAP
- **LORE panel** — aged-paper background, burned corners, water-ring stains, a "CLASSIFIED" rubber stamp, a mouse-following glare streak, and amber dust particles that spawn on hover
- Center divider with the Group 935 emblem

## Operative Hub (Map Guides)

Lives under [src/pages/maps/](src/pages/maps/) with data in [src/data/maps.ts](src/data/maps.ts) and [src/data/mapGuides.ts](src/data/mapGuides.ts).

- **Map database** at `/maps` — grouped by game (WAW, BO1, BO2, BO3, BO4), showing release date, crew, setting, wonder weapon, main-quest presence, and pip/star ratings for setup difficulty, EE difficulty, and community rating.
- **Individual guide pages** at `/maps/[slug]` — typed sections for buildables with part-spawn locations, numbered Easter Egg step walkthroughs, perks, and map-specific extras (shield builds, wonder weapon upgrades, etc.).
- Crew groupings cover Ultimis, Primis, Victis, Chaos, Aether, Pentagon, Alcatraz, Shadows, and Celebrities casts.

## The Kronorium

Mounted at `/kronorium` ([src/components/kronorium/KronoriumPage.tsx](src/components/kronorium/KronoriumPage.tsx)) as a tabbed workspace with two timeline views.

### Map Timeline — [KronoriumTimeline.tsx](src/components/kronorium/KronoriumTimeline.tsx)

A React Flow canvas representing the entire Aether story as a connected graph.

- **Seven custom node types**: `title`, `event` (map cards), `dimension` headers, `branchReason` labels, `fracture` labels, `endState` badges, and invisible `waypoint` routing nodes.
- **~110 nodes / ~60 edges** defined in [src/data/kronorium.ts](src/data/kronorium.ts), organized across the Original Dimension, Dimension 63, Agartha, Empty Earth, and the Agonia / Deceptio / Proditone fractures plus the Cycle and Broken timelines.
- **Special journey edges** — dashed, colored strokes tracing the Primis crew's cross-fracture path (Origins → The Giant → Der Eisendrache → Zetsubou → Gorod Krovi → Revelations), a purple "soul collection" convergence, and an animated golden "Cycle" back-edge from Revelations to the Great War.
- **Crew filter** — click a crew button to dim all non-matching events. Structural labels (titles, dimensions, branch reasons, fractures) stay lit only if a matching event is reachable downstream via a reverse-BFS over the edge graph, so a fracture like "Broken Timeline" only stays lit if its sub-branch actually contains an event from the selected crew.
- **Lore modal** — clicking a map node opens a detailed entry from [src/data/mapLore.ts](src/data/mapLore.ts) with `prelude`, `quest`, and `aftermath` subsections plus header metadata (setting, crew, story impact, zombie controller).
- **Custom zoom controls**, a **draggable minimap** with absolute panning, and a sidebar link to Richtofen's Lab.

### Chronicles Timeline

Driven by [src/data/aetherChronicle.ts](src/data/aetherChronicle.ts) — every entry from the "Complete Aether Timeline" chronicle, sectioned by Primary Timeline, Dimension 63, Agartha, Deceptio / Proditone / Agonia Fractures, Broken Cycle, and Dark Aether. Each entry is tagged with crew (Ultimis / Primis / Victis) and a canonical date.

Two interchangeable views:

- **Spiral view** — [SpiralTimeline.tsx](src/components/kronorium/SpiralTimeline.tsx) — renders every chronicle entry on an outward Archimedean spiral on a large canvas, matching the in-universe Kronorium book layout. Per-section color coding; pan and zoom to explore.
- **List view** — [AetherChronicle.tsx](src/components/kronorium/AetherChronicle.tsx) — a typewriter-styled sectioned list with section navigation pills and crew filtering.

## Richtofen's Lab

Mounted at `/kronorium/lab` ([src/pages/kronorium/lab.astro](src/pages/kronorium/lab.astro)) via [RichtofensLab.tsx](src/components/kronorium/RichtofensLab.tsx).

Four core subsystems:

1. **Scene composition** — a closed room (±8 × ±6 units) built from a mix of procedural geometry and imported PSX/low-poly GLB props: desks, filing cabinets, chairs, a notice board, an old computer, books, a Mauser C-96, a Ray Gun, and blood-decal overlays.
2. **Interaction model** — center-screen raycast resolves contextual targets within a pickup range. Targets include lab documents and the terminal. Interaction state drives on-screen prompts rather than hardcoded UI buttons.
3. **Player controller** — pointer-lock first-person movement with per-axis AABB collision against room walls and furniture. Lock handling is pause-aware so document and terminal overlays don't conflict with mouselook.
4. **Narrative delivery** — on each visit, 14 documents are drawn from a typed pool in [src/data/labDocuments.ts](src/data/labDocuments.ts) and rendered through [DocumentViewer.tsx](src/components/kronorium/DocumentViewer.tsx) using template-specific layouts (autopsy, blueprint, field-ops, dossier, research). Documents have file numbers, rubber stamps, margin notes, and per-template metadata.

A dedicated [LabTerminal.tsx](src/components/kronorium/LabTerminal.tsx) provides an in-scene terminal interactable.

## Content data sources

All primary content lives in [src/data/](src/data/) as typed TypeScript modules:

- [maps.ts](src/data/maps.ts) — map database (game, setting, crew, wonder weapon, ratings)
- [mapGuides.ts](src/data/mapGuides.ts) — extended per-map guide content (buildables, EE steps, perks, shields, wonder-weapon upgrades)
- [mapLore.ts](src/data/mapLore.ts) — deep lore entries per timeline node (prelude / quest / aftermath)
- [kronorium.ts](src/data/kronorium.ts) — Kronorium graph: nodes and edges for the Map Timeline
- [aetherChronicle.ts](src/data/aetherChronicle.ts) — chronicle entries powering the Spiral and List views
- [labDocuments.ts](src/data/labDocuments.ts) — typed lab document pool with template discriminators

## 3D assets pipeline

Assets are served from [public/3dassets/](public/3dassets/):

- Environment and props: `psx_dining_table.glb`, `filing_cabinet.glb`, `psx_cabinet.glb`, `psx_chair.glb`, `low_poly_notice_board.glb`, `old_computer.glb`, `psx_jug.glb`
- Decorative / interactive props: `low_poly_pen_blue.glb`, `psx_old_book.glb`, `mauser_c-96_psx_ps1_style.glb`, `minecraft_raygun.glb`
- Decals and effects: `bloody_drag_mark_decal_psx.glb`, `help_blood_decal_psx.glb`, `psx_bloody_hand.glb`

**Import pattern**

- Assets load through `useGLTF`.
- Reused models are cloned before placement to avoid shared transform and material side effects.
- Key assets are preloaded to reduce first-view hitching.

**Authoring guidelines**

- Maintain consistent real-world scale before export.
- Prefer optimized topology and compressed texture sets.
- Validate orientation and pivot points in-engine to minimize per-instance correction work.

## Requirements

- Node.js 22.12.0 or newer
- npm

## Development

Install dependencies:

```bash
npm install
```

Run locally:

```bash
npm run dev
```

Default local URL: `http://localhost:4321`

Production build:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

## Project layout

```
public/
  3dassets/         GLB models used by the lab scene
  images/           map thumbnails and supporting imagery
src/
  pages/
    index.astro     landing page (OPS / LORE diptych)
    maps/           map database and individual guide routes
    kronorium/      timeline workspace + lab route
  components/
    maps/           map gallery and card components
    kronorium/      timeline, chronicle, lab, and modal components
  data/             typed content sources
  layouts/          Layout, OpsLayout, LoreLayout shells
  styles/           global styles
```
