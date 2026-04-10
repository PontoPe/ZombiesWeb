import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import {
  CHRONICLE_ENTRIES,
  CHRONICLE_SECTIONS,
  CREW_META,
  type ChronicleEntry,
  type ChronicleSection,
} from '../../data/aetherChronicle';

// ── Constants ───────────────────────────────────────────────

const CANVAS_W = 1920;
const CANVAS_H = 1320;

const FONTS = {
  title: "'Cinzel', serif",
  mono: "'IBM Plex Mono', monospace",
  body: "'EB Garamond', serif",
  hand: "'Caveat', cursive",
};

const SECTION_COLORS: Record<ChronicleSection, string> = {
  main: '#c9a24a',
  dim63: '#d46a3a',
  agartha: '#7ecfcf',
  deceptio: '#b25d9e',
  proditone: '#5aaa5a',
  agonia: '#d44444',
  broken: '#4a90d9',
  darkAether: '#8855cc',
};

// ── Spiral geometry ─────────────────────────────────────────
// The official timeline is an outward spiral starting near the center.
// We model each section as a segment of a multi-arm spiral.

interface SpiralNode {
  x: number;
  y: number;
  entry: ChronicleEntry;
  section: ChronicleSection;
  angle: number;
}

/**
 * Generate spiral coordinates.
 * The spiral is an Archimedean spiral: r = a + b*theta
 * centered on the canvas.
 */
function generateSpiralLayout(): {
  nodes: SpiralNode[];
  paths: { section: ChronicleSection; points: { x: number; y: number }[] }[];
} {
  const cx = CANVAS_W / 2;
  const cy = CANVAS_H / 2;

  // Group entries by section
  const sectionEntries: Record<string, ChronicleEntry[]> = {};
  for (const sec of CHRONICLE_SECTIONS) {
    sectionEntries[sec.id] = CHRONICLE_ENTRIES.filter(e => e.section === sec.id);
  }

  const allNodes: SpiralNode[] = [];
  const allPaths: { section: ChronicleSection; points: { x: number; y: number }[] }[] = [];

  // Layout parameters per section.
  // The canvas is 1920×1320, center (960, 660).
  // Four distinct spatial clusters matching the reference image:
  //   Red   (center)      → main
  //   Green (upper-left)  → agartha
  //   Blue  (right)       → dim63
  //   Yellow(lower-left)  → fractures (deceptio / proditone / agonia / broken / darkAether)
  const sectionLayout: {
    id: ChronicleSection;
    startAngle: number;
    totalSweep: number;
    startRadius: number;
    endRadius: number;
    offsetX: number; // from canvas center (960, 660)
    offsetY: number;
  }[] = [
    // ── CLUSTER 1 · Main Timeline — large center spiral ──────────────────
    { id: 'main',      startAngle: Math.PI * 0.5, totalSweep: Math.PI * 9,   startRadius: 40,  endRadius: 460, offsetX:    0, offsetY:    0 },

    // ── CLUSTER 2 · Agartha — small upper-left spiral ────────────────────
    { id: 'agartha',   startAngle: Math.PI * 0.3, totalSweep: Math.PI * 3.5, startRadius: 18,  endRadius: 148, offsetX: -565, offsetY: -275 },

    // ── CLUSTER 3 · Dimension 63 — medium right-side spiral ──────────────
    { id: 'dim63',     startAngle: Math.PI * 0.5, totalSweep: Math.PI * 5.5, startRadius: 28,  endRadius: 290, offsetX:  548, offsetY: -105 },

    // ── CLUSTER 4 · Fractures — small lower-left cluster (all share center)
    { id: 'deceptio',  startAngle: Math.PI * 0.5, totalSweep: Math.PI * 1.5, startRadius: 18,  endRadius:  90, offsetX: -535, offsetY:  325 },
    { id: 'proditone', startAngle: Math.PI * 1.3, totalSweep: Math.PI * 2.0, startRadius: 35,  endRadius: 125, offsetX: -535, offsetY:  325 },
    { id: 'agonia',    startAngle: Math.PI * 2.6, totalSweep: Math.PI * 1.5, startRadius: 58,  endRadius: 162, offsetX: -535, offsetY:  325 },
    { id: 'broken',    startAngle: Math.PI * 3.6, totalSweep: Math.PI * 1.8, startRadius: 88,  endRadius: 198, offsetX: -535, offsetY:  325 },
    { id: 'darkAether',startAngle: Math.PI * 5.0, totalSweep: Math.PI * 0.6, startRadius: 182, endRadius: 215, offsetX: -535, offsetY:  325 },
  ];

  for (const layout of sectionLayout) {
    const entries = sectionEntries[layout.id];
    if (!entries || entries.length === 0) continue;

    const pathPoints: { x: number; y: number }[] = [];
    const n = entries.length;

    for (let i = 0; i < n; i++) {
      const t = n === 1 ? 0.5 : i / (n - 1);
      const angle = layout.startAngle + t * layout.totalSweep;
      const radius = layout.startRadius + t * (layout.endRadius - layout.startRadius);

      const x = cx + layout.offsetX + Math.cos(angle) * radius;
      const y = cy + layout.offsetY + Math.sin(angle) * radius;

      allNodes.push({
        x,
        y,
        entry: entries[i],
        section: layout.id,
        angle,
      });

      pathPoints.push({ x, y });
    }

    // Add intermediate points for smoother curves
    const smoothPoints: { x: number; y: number }[] = [];
    const INTERP_COUNT = Math.max(n * 3, 30);
    for (let i = 0; i <= INTERP_COUNT; i++) {
      const t = i / INTERP_COUNT;
      const angle = layout.startAngle + t * layout.totalSweep;
      const radius = layout.startRadius + t * (layout.endRadius - layout.startRadius);
      smoothPoints.push({
        x: cx + layout.offsetX + Math.cos(angle) * radius,
        y: cy + layout.offsetY + Math.sin(angle) * radius,
      });
    }

    allPaths.push({ section: layout.id, points: smoothPoints });
  }

  return { nodes: allNodes, paths: allPaths };
}

function pointsToSmoothPath(points: { x: number; y: number }[]): string {
  if (points.length < 2) return '';
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length - 1; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const next = points[i + 1];
    const cpx1 = (prev.x + curr.x) / 2;
    const cpy1 = (prev.y + curr.y) / 2;
    const cpx2 = (curr.x + next.x) / 2;
    const cpy2 = (curr.y + next.y) / 2;
    if (i === 1) {
      d += ` Q ${curr.x} ${curr.y} ${cpx2} ${cpy2}`;
    } else {
      d += ` Q ${curr.x} ${curr.y} ${cpx2} ${cpy2}`;
    }
  }
  const last = points[points.length - 1];
  d += ` L ${last.x} ${last.y}`;
  return d;
}

// ── Detail Panel ────────────────────────────────────────────

function DetailPanel({
  entry,
  section,
  onClose,
  position,
}: {
  entry: ChronicleEntry;
  section: ChronicleSection;
  onClose: () => void;
  position: { x: number; y: number };
}) {
  const color = SECTION_COLORS[section];
  const crewColor = CREW_META[entry.crew].color;
  const crewLabel = CREW_META[entry.crew].label;

  return (
    <div
      onClick={e => e.stopPropagation()}
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        width: 360,
        background: 'rgba(14, 11, 7, 0.96)',
        border: `1px solid ${color}60`,
        borderLeft: `3px solid ${color}`,
        padding: '16px 20px',
        zIndex: 100,
        pointerEvents: 'auto',
        boxShadow: `0 0 30px ${color}15, 0 8px 32px rgba(0,0,0,0.7)`,
        animation: 'panelFadeIn 0.25s ease-out',
        maxHeight: 400,
        overflowY: 'auto',
      }}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        style={{
          position: 'absolute',
          top: 8,
          right: 10,
          background: 'none',
          border: 'none',
          color: '#7a6a50',
          fontSize: 16,
          cursor: 'pointer',
          fontFamily: FONTS.mono,
          padding: '2px 6px',
        }}
      >
        ×
      </button>

      {/* Date */}
      <div
        style={{
          fontSize: 9,
          color: '#7a6a50',
          fontFamily: FONTS.mono,
          letterSpacing: '0.08em',
          marginBottom: 4,
        }}
      >
        {entry.date}
      </div>

      {/* Section tag */}
      <div
        style={{
          display: 'inline-block',
          fontSize: 7,
          color,
          fontFamily: FONTS.mono,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          border: `1px solid ${color}40`,
          padding: '2px 8px',
          marginBottom: 8,
        }}
      >
        {CHRONICLE_SECTIONS.find(s => s.id === section)?.label}
      </div>

      {/* Crew */}
      {crewLabel && (
        <span
          style={{
            fontSize: 7,
            color: crewColor,
            fontFamily: FONTS.mono,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginLeft: 8,
          }}
        >
          {crewLabel}
        </span>
      )}

      {/* Title */}
      {entry.title && (
        <div
          style={{
            fontSize: 16,
            color: '#ede0c8',
            fontFamily: FONTS.title,
            fontWeight: 600,
            lineHeight: 1.3,
            marginTop: 8,
            marginBottom: 8,
          }}
        >
          {entry.title}
        </div>
      )}

      {/* Description */}
      <div
        style={{
          fontSize: 14,
          color: '#c8b48e',
          fontFamily: FONTS.body,
          lineHeight: 1.65,
          marginTop: entry.title ? 0 : 8,
        }}
      >
        {entry.description}
      </div>

      {/* Source */}
      {entry.source && (
        <div
          style={{
            marginTop: 12,
            fontSize: 9,
            color: '#4a3a22',
            fontFamily: FONTS.mono,
            letterSpacing: '0.06em',
            fontStyle: 'italic',
          }}
        >
          Source: {entry.source}
        </div>
      )}
    </div>
  );
}

// ── Section Legend ───────────────────────────────────────────

function SectionLegend({
  activeSection,
  onToggle,
}: {
  activeSection: ChronicleSection | null;
  onToggle: (s: ChronicleSection | null) => void;
}) {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 16,
        left: 16,
        background: 'rgba(14, 11, 7, 0.92)',
        border: '1px solid #2e2416',
        padding: '12px 16px',
        zIndex: 50,
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
      }}
    >
      <div
        style={{
          fontSize: 8,
          color: '#4a3a22',
          fontFamily: FONTS.mono,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          marginBottom: 4,
        }}
      >
        Sections
      </div>
      <button
        onClick={() => onToggle(null)}
        style={{
          background: activeSection === null ? '#c9a24a18' : 'transparent',
          border: `1px solid ${activeSection === null ? '#c9a24a' : '#2e2416'}`,
          color: activeSection === null ? '#c9a24a' : '#4a3a22',
          padding: '3px 10px',
          fontFamily: FONTS.mono,
          fontSize: 8,
          letterSpacing: '0.1em',
          cursor: 'pointer',
          textAlign: 'left',
          textTransform: 'uppercase',
        }}
      >
        All
      </button>
      {CHRONICLE_SECTIONS.map(sec => {
        const color = SECTION_COLORS[sec.id];
        const active = activeSection === sec.id;
        return (
          <button
            key={sec.id}
            onClick={() => onToggle(active ? null : sec.id)}
            style={{
              background: active ? color + '18' : 'transparent',
              border: `1px solid ${active ? color : '#2e2416'}`,
              color: active ? color : '#4a3a22',
              padding: '3px 10px',
              fontFamily: FONTS.mono,
              fontSize: 8,
              letterSpacing: '0.1em',
              cursor: 'pointer',
              textAlign: 'left',
              textTransform: 'uppercase',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: color,
                display: 'inline-block',
                flexShrink: 0,
              }}
            />
            {sec.label}
          </button>
        );
      })}
    </div>
  );
}

// ── Main Component ──────────────────────────────────────────

export default function SpiralTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [viewBox, setViewBox] = useState({ x: 0, y: 0, w: CANVAS_W, h: CANVAS_H });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [selectedEntry, setSelectedEntry] = useState<SpiralNode | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<ChronicleSection | null>(null);
  const [panelPos, setPanelPos] = useState({ x: 0, y: 0 });
  const [bgAlpha, setBgAlpha] = useState(0.55);
  const [stretchedSection, setStretchedSection] = useState<ChronicleSection | null>(null);

  // Generate layout once
  const { nodes, paths } = useMemo(() => generateSpiralLayout(), []);

  // ── Stretched layout: compute straight-line positions for a section ──
  const getStretchedPositions = useCallback(
    (section: ChronicleSection) => {
      const sectionNodes = nodes.filter(n => n.section === section);
      const n = sectionNodes.length;
      if (n === 0) return { nodePositions: new Map<string, { x: number; y: number }>(), pathPoints: [] as { x: number; y: number }[] };

      // Lay out as a horizontal line centered in the current viewBox
      const margin = 80;
      const lineY = CANVAS_H / 2;
      const lineStartX = margin;
      const lineEndX = CANVAS_W - margin;

      const nodePositions = new Map<string, { x: number; y: number }>();
      const pathPoints: { x: number; y: number }[] = [];

      for (let i = 0; i < n; i++) {
        const t = n === 1 ? 0.5 : i / (n - 1);
        const x = lineStartX + t * (lineEndX - lineStartX);
        const y = lineY;
        nodePositions.set(sectionNodes[i].entry.id, { x, y });
        pathPoints.push({ x, y });
      }

      return { nodePositions, pathPoints };
    },
    [nodes]
  );

  // Current stretched data (memoized)
  const stretchedData = useMemo(() => {
    if (!stretchedSection) return null;
    return getStretchedPositions(stretchedSection);
  }, [stretchedSection, getStretchedPositions]);

  // Helper to get the effective position of a node
  const getNodePos = useCallback(
    (node: SpiralNode) => {
      if (stretchedSection === node.section && stretchedData) {
        const pos = stretchedData.nodePositions.get(node.entry.id);
        if (pos) return pos;
      }
      return { x: node.x, y: node.y };
    },
    [stretchedSection, stretchedData]
  );

  // ── Path click (not on a node) → stretch/unstretch ──
  const handlePathClick = useCallback(
    (section: ChronicleSection, e: React.MouseEvent) => {
      e.stopPropagation();
      setStretchedSection(prev => (prev === section ? null : section));
      setSelectedEntry(null);
    },
    []
  );

  // ── Zoom ──

  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      e.preventDefault();
      const factor = e.deltaY > 0 ? 1.12 : 0.89;
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;

      const mouseX = ((e.clientX - rect.left) / rect.width) * viewBox.w + viewBox.x;
      const mouseY = ((e.clientY - rect.top) / rect.height) * viewBox.h + viewBox.y;

      const newW = Math.max(300, Math.min(CANVAS_W * 2, viewBox.w * factor));
      const newH = Math.max(200, Math.min(CANVAS_H * 2, viewBox.h * factor));

      const ratioX = (mouseX - viewBox.x) / viewBox.w;
      const ratioY = (mouseY - viewBox.y) / viewBox.h;

      setViewBox({
        x: mouseX - ratioX * newW,
        y: mouseY - ratioY * newH,
        w: newW,
        h: newH,
      });
    },
    [viewBox]
  );

  // ── Pan ──

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (e.button !== 0) return;
      // Don't start drag if we clicked a node
      const target = e.target as HTMLElement;
      if (target.closest('.spiral-node')) return;

      setIsDragging(true);
      setDragStart({ x: e.clientX, y: e.clientY });
      (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    },
    []
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging) return;
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;

      const dx = ((e.clientX - dragStart.x) / rect.width) * viewBox.w;
      const dy = ((e.clientY - dragStart.y) / rect.height) * viewBox.h;

      setViewBox(vb => ({
        ...vb,
        x: vb.x - dx,
        y: vb.y - dy,
      }));
      setDragStart({ x: e.clientX, y: e.clientY });
    },
    [isDragging, dragStart, viewBox.w, viewBox.h]
  );

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // ── Node click ──

  const handleNodeClick = useCallback(
    (node: SpiralNode, e: React.MouseEvent) => {
      e.stopPropagation();
      if (selectedEntry?.entry.id === node.entry.id) {
        setSelectedEntry(null);
        return;
      }
      setSelectedEntry(node);

      // Position the panel near the click point
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      let px = e.clientX - rect.left + 12;
      let py = e.clientY - rect.top - 60;
      // Keep panel inside viewport
      if (px + 380 > rect.width) px = px - 390;
      if (py + 300 > rect.height) py = rect.height - 420;
      if (py < 10) py = 10;
      if (px < 10) px = 10;
      setPanelPos({ x: px, y: py });
    },
    [selectedEntry]
  );

  // Close panel on background click
  const handleBgClick = useCallback(() => {
    setSelectedEntry(null);
    setStretchedSection(null);
  }, []);

  // Reset zoom
  const handleReset = useCallback(() => {
    setViewBox({ x: 0, y: 0, w: CANVAS_W, h: CANVAS_H });
    setSelectedEntry(null);
  }, []);

  // ── Compute node radius based on zoom ──
  const baseNodeRadius = viewBox.w / CANVAS_W * 6;
  const titleNodeRadius = viewBox.w / CANVAS_W * 9;
  const strokeW = Math.max(1.2, viewBox.w / CANVAS_W * 2.5);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        background: '#0a0806',
        cursor: isDragging ? 'grabbing' : 'grab',
        userSelect: 'none',
      }}
      onClick={handleBgClick}
    >
      {/* CSS animations */}
      <style>{`
        @keyframes panelFadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes nodeGlow {
          0%, 100% { filter: drop-shadow(0 0 3px var(--glow-color)); }
          50%      { filter: drop-shadow(0 0 8px var(--glow-color)); }
        }
        @keyframes pathDraw {
          from { stroke-dashoffset: var(--path-length); }
          to   { stroke-dashoffset: 0; }
        }
        .spiral-node { transition: transform 0.15s, filter 0.15s; }
        .spiral-node:hover { filter: brightness(1.4); }
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 10px; height: 10px;
          border-radius: 50%;
          background: #c9a24a;
          border: 1px solid #2e2416;
          cursor: pointer;
        }
        input[type="range"]::-webkit-slider-runnable-track {
          background: #2e2416;
          border-radius: 2px;
        }
        input[type="range"]::-moz-range-thumb {
          width: 10px; height: 10px;
          border-radius: 50%;
          background: #c9a24a;
          border: 1px solid #2e2416;
          cursor: pointer;
        }
        input[type="range"]::-moz-range-track {
          background: #2e2416;
          border-radius: 2px;
        }
      `}</style>

      {/* SVG Canvas */}
      <svg
        width="100%"
        height="100%"
        viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`}
        preserveAspectRatio="xMidYMid meet"
        onWheel={handleWheel}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        style={{ display: 'block', touchAction: 'none' }}
      >
        {/* Background image */}
        <image
          href="/images/kronorium-timeline.jpg"
          x="0"
          y="0"
          width={CANVAS_W}
          height={CANVAS_H}
          preserveAspectRatio="xMidYMid slice"
          opacity={stretchedSection ? 0 : bgAlpha}
          style={{ transition: 'opacity 0.5s ease-in-out' }}
        />

        {/* Vignette overlay */}
        <defs>
          <radialGradient id="vignette" cx="50%" cy="50%" r="70%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="100%" stopColor="#0a0806" stopOpacity="0.7" />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <rect x="0" y="0" width={CANVAS_W} height={CANVAS_H} fill="url(#vignette)" opacity={stretchedSection ? 0 : 1} style={{ transition: 'opacity 0.5s ease-in-out' }} />

        {/* Section paths (spiral lines) */}
        {paths.map(({ section, points }) => {
          const color = SECTION_COLORS[section];
          const isActive = activeSection === null || activeSection === section;
          const isStretched = stretchedSection === section;
          const isOtherStretched = stretchedSection !== null && stretchedSection !== section;

          // Use stretched path points if this section is stretched
          const effectivePoints = isStretched && stretchedData
            ? stretchedData.pathPoints
            : points;
          const pathD = pointsToSmoothPath(effectivePoints);

          // When another section is stretched, fade this one out
          const glowOpacity = isOtherStretched ? 0 : isActive ? (isStretched ? 0.25 : 0.15) : 0.03;
          const lineOpacity = isOtherStretched ? 0 : isActive ? 0.8 : 0.12;

          return (
            <g key={section} style={{ transition: 'opacity 0.5s ease-in-out' }}>
              {/* Glow layer */}
              <path
                d={pathD}
                fill="none"
                stroke={color}
                strokeWidth={strokeW * 3}
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity={glowOpacity}
                style={{ transition: 'all 0.5s ease-in-out' }}
              />
              {/* Main line */}
              <path
                d={pathD}
                fill="none"
                stroke={color}
                strokeWidth={isStretched ? strokeW * 1.5 : strokeW}
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity={lineOpacity}
                style={{ transition: 'all 0.5s ease-in-out' }}
              />
              {/* Invisible wider hit area for clicking */}
              <path
                d={pathD}
                fill="none"
                stroke="transparent"
                strokeWidth={Math.max(strokeW * 8, 14)}
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ cursor: isOtherStretched ? 'default' : 'pointer', pointerEvents: isOtherStretched ? 'none' : 'auto' }}
                onClick={e => handlePathClick(section, e)}
              />
            </g>
          );
        })}

        {/* Nodes */}
        {nodes.map(node => {
          const color = SECTION_COLORS[node.section];
          const crewColor = CREW_META[node.entry.crew].color;
          const hasTitle = !!node.entry.title;
          const isActive = activeSection === null || activeSection === node.section;
          const isHovered = hoveredNode === node.entry.id;
          const isSelected = selectedEntry?.entry.id === node.entry.id;
          const isStretched = stretchedSection === node.section;
          const isOtherStretched = stretchedSection !== null && stretchedSection !== node.section;
          const r = hasTitle ? titleNodeRadius : baseNodeRadius;
          const pos = getNodePos(node);

          // Fade out nodes from other sections when one is stretched
          const nodeOpacity = isOtherStretched ? 0 : isActive ? 1 : 0.15;

          return (
            <g
              key={node.entry.id}
              className="spiral-node"
              style={{
                cursor: isOtherStretched ? 'default' : 'pointer',
                opacity: nodeOpacity,
                transition: 'opacity 0.5s ease-in-out',
                pointerEvents: isOtherStretched ? 'none' : 'auto',
                ['--glow-color' as any]: color,
              }}
              onClick={e => handleNodeClick(node, e)}
              onMouseEnter={() => setHoveredNode(node.entry.id)}
              onMouseLeave={() => setHoveredNode(null)}
            >
              {/* Outer glow ring for titled/key events */}
              {hasTitle && (
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={r * 2}
                  fill="none"
                  stroke={color}
                  strokeWidth={0.5}
                  opacity={isHovered || isSelected ? 0.6 : 0.2}
                  style={{ transition: 'all 0.5s ease-in-out' }}
                />
              )}

              {/* Node circle */}
              <circle
                cx={pos.x}
                cy={pos.y}
                r={r}
                fill={isSelected ? color : `${color}30`}
                stroke={color}
                strokeWidth={isHovered || isSelected ? 2 : 1}
                style={{ transition: 'all 0.5s ease-in-out' }}
              />

              {/* Inner crew color dot */}
              <circle
                cx={pos.x}
                cy={pos.y}
                r={r * 0.4}
                fill={node.entry.crew !== 'none' ? crewColor : color}
                opacity={0.9}
                style={{ transition: 'all 0.5s ease-in-out' }}
              />

              {/* Title label — rotated when stretched to avoid overlap */}
              {hasTitle && (
                <text
                  x={pos.x}
                  y={pos.y - r - 6}
                  textAnchor={isStretched ? 'start' : 'middle'}
                  fill={isHovered || isSelected ? '#ede0c8' : color}
                  fontSize={isHovered || isSelected ? 11 : 9}
                  fontFamily={FONTS.title}
                  fontWeight="600"
                  letterSpacing="0.05em"
                  transform={isStretched ? `rotate(-45 ${pos.x} ${pos.y - r - 6})` : undefined}
                  style={{
                    transition: 'all 0.5s ease-in-out',
                    filter: isHovered || isSelected
                      ? `drop-shadow(0 0 4px ${color}80)`
                      : 'none',
                    pointerEvents: 'none',
                  }}
                >
                  {node.entry.title}
                </text>
              )}

              {/* Date label on hover */}
              {isHovered && (
                <text
                  x={pos.x}
                  y={pos.y + r + 14}
                  textAnchor="middle"
                  fill="#7a6a50"
                  fontSize={8}
                  fontFamily={FONTS.mono}
                  letterSpacing="0.04em"
                  style={{ pointerEvents: 'none', transition: 'all 0.5s ease-in-out' }}
                >
                  {node.entry.date.length > 30
                    ? node.entry.date.slice(0, 28) + '…'
                    : node.entry.date}
                </text>
              )}
            </g>
          );
        })}
      </svg>

      {/* Detail panel */}
      {selectedEntry && (
        <DetailPanel
          entry={selectedEntry.entry}
          section={selectedEntry.section}
          onClose={() => setSelectedEntry(null)}
          position={panelPos}
        />
      )}

      {/* Section legend */}
      <SectionLegend activeSection={activeSection} onToggle={setActiveSection} />

      {/* Controls */}
      <div
        style={{
          position: 'absolute',
          top: 16,
          right: 16,
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          zIndex: 50,
        }}
      >
        <button
          onClick={e => {
            e.stopPropagation();
            setViewBox(vb => {
              const factor = 0.75;
              const newW = Math.max(300, vb.w * factor);
              const newH = Math.max(200, vb.h * factor);
              return {
                x: vb.x + (vb.w - newW) / 2,
                y: vb.y + (vb.h - newH) / 2,
                w: newW,
                h: newH,
              };
            });
          }}
          style={controlBtnStyle}
          title="Zoom in"
        >
          +
        </button>
        <button
          onClick={e => {
            e.stopPropagation();
            setViewBox(vb => {
              const factor = 1.35;
              const newW = Math.min(CANVAS_W * 2, vb.w * factor);
              const newH = Math.min(CANVAS_H * 2, vb.h * factor);
              return {
                x: vb.x + (vb.w - newW) / 2,
                y: vb.y + (vb.h - newH) / 2,
                w: newW,
                h: newH,
              };
            });
          }}
          style={controlBtnStyle}
          title="Zoom out"
        >
          −
        </button>
        <button
          onClick={e => {
            e.stopPropagation();
            handleReset();
          }}
          style={controlBtnStyle}
          title="Reset view"
        >
          ⟲
        </button>

        {/* Alpha slider */}
        <div
          onClick={e => e.stopPropagation()}
          style={{
            marginTop: 8,
            background: 'rgba(14, 11, 7, 0.9)',
            border: '1px solid #2e2416',
            padding: '8px 6px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 4,
          }}
        >
          <span
            style={{
              fontSize: 7,
              color: '#4a3a22',
              fontFamily: "'IBM Plex Mono', monospace",
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
            }}
          >
            BG
          </span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={bgAlpha}
            onChange={e => setBgAlpha(parseFloat(e.target.value))}
            style={{
              width: 24,
              height: 80,
              writingMode: 'vertical-lr',
              direction: 'rtl',
              appearance: 'none',
              WebkitAppearance: 'none',
              background: 'transparent',
              cursor: 'pointer',
            }}
          />
          <span
            style={{
              fontSize: 8,
              color: '#7a6a50',
              fontFamily: "'IBM Plex Mono', monospace",
            }}
          >
            {Math.round(bgAlpha * 100)}%
          </span>
        </div>
      </div>

      {/* Hint */}
      <div
        style={{
          position: 'absolute',
          bottom: 16,
          right: 16,
          fontSize: 9,
          color: '#4a3a22',
          fontFamily: FONTS.mono,
          letterSpacing: '0.08em',
          zIndex: 50,
          textAlign: 'right',
          pointerEvents: 'none',
        }}
      >
        Scroll to zoom · Drag to pan · Click nodes for details · Click a line to straighten
      </div>
    </div>
  );
}

const controlBtnStyle: React.CSSProperties = {
  width: 32,
  height: 32,
  background: 'rgba(14, 11, 7, 0.9)',
  border: '1px solid #2e2416',
  color: '#7a6a50',
  fontSize: 16,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontFamily: "'IBM Plex Mono', monospace",
};
