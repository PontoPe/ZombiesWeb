# ZombiesWeb

ZombiesWeb is a Call of Duty Zombies knowledge platform that combines structured guide data with interactive storytelling systems.

The project is intentionally split into three product surfaces:
- A map operations layer (guides, setup context, and decision support)
- A Kronorium timeline layer (narrative graph and lore navigation)
- A 3D lab layer (first-person exploration, environmental interaction, and collectible document recovery)

## Why this project is different

Most fan resources present data as static pages. ZombiesWeb treats information as an experience:
- Timeline data is modeled as connected entities, not disconnected articles.
- The lab scene is spatial and interactive, so lore discovery happens through movement and context.
- UI and environment systems are built to support atmosphere without sacrificing readability and control.

## Technical stack

- Astro for routing and page composition
- React for interactive interfaces and stateful systems
- Three.js via React Three Fiber for 3D rendering
- Drei for scene utilities (pointer lock, model loading helpers)
- React Flow for timeline graph interaction

## 3D Lab Architecture

The lab is implemented as a real-time first-person scene with four core subsystems:

1. Scene composition
- Room geometry, lighting, props, and document surfaces are composed in modular scene components.
- Environmental objects are a mix of procedural geometry and imported GLB assets.

2. Interaction model
- A center-screen raycast resolves contextual targets.
- Targets include documents and scene interactables (for example, terminal access points).
- Interaction state drives prompts and overlays, not hardcoded screen buttons.

3. Player controller
- Pointer-lock first-person navigation with collision constraints.
- Pause-aware lock handling for overlays such as document and terminal views.

4. Narrative delivery
- Documents are drawn from a typed content pool and rendered through template-specific viewer layouts.
- Progress is tracked through recovered document IDs.

## 3D Assets Pipeline

### Runtime location
- GLB assets are served from public/3dassets.

Current scene assets include:
- Environment and props: psx_dining_table.glb, filing_cabinet.glb, psx_cabinet.glb, psx_chair.glb, low_poly_notice_board.glb, old_computer.glb
- Decorative/interactive props: low_poly_pen_blue.glb, psx_old_book.glb, mauser_c-96_psx_ps1_style.glb, minecraft_raygun.glb
- Decals and effects: bloody_drag_mark_decal_psx.glb, help_blood_decal_psx.glb, psx_bloody_hand.glb

### Import pattern
- Assets are loaded through useGLTF.
- Reused models should be cloned before placement to avoid shared transform/material side effects.
- Key assets are preloaded to reduce first-view hitching.

### Authoring guidelines
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

Default local URL:
- http://localhost:4321

Production build:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

## Project layout

- public/3dassets: GLB models used by the lab scene
- public/images: map and supporting image assets
- src/pages: Astro route entrypoints
- src/components: React UI and 3D scene components
- src/data: typed content sources (maps, timeline, lab documents)
- src/layouts: shared page shells
