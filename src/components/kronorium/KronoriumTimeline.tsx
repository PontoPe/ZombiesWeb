import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import ReactFlow, {
  Background,
  BackgroundVariant,
  MiniMap,
  Panel,
  useReactFlow,
  type Node,
  type Edge,
  type NodeProps,
  Handle,
  Position,
} from 'reactflow';
import 'reactflow/dist/style.css';
import {
  TIMELINE_NODES,
  TIMELINE_EDGES,
  type TimelineNode,
  type TimelineNodeType,
} from '../../data/kronorium';
import { MAP_LORE_BY_NODE } from '../../data/mapLore';
import MapLoreModal from './MapLoreModal';

// ── Node-type colour map for minimap ────────────────────────

const TYPE_ACCENT: Record<TimelineNodeType, string> = {
  title:        '#00e5ff',
  event:        '#c9a24a',
  dimension:    '#00e5ff',
  branchReason: '#7aa991',
  fracture:     '#cc2222',
  endState:     '#cc2222',
  waypoint:     'transparent',
};

// ── Crew definitions for filter UI ──────────────────────────

const CREWS = [
  { id: 'Primis',      color: '#4fc3f7' },
  { id: 'Ultimis',     color: '#ffb74d' },
  { id: 'Victis',      color: '#81c784' },
  { id: 'Marines',     color: '#a5a5a5' },
  { id: 'Celebrities', color: '#e57373' },
  { id: 'Mob Crew',    color: '#ff8a65' },
  { id: 'SoE Crew',    color: '#ce93d8' },
  { id: 'CIA/CDC',     color: '#90a4ae' },
] as const;

// ══════════════════════════════════════════════════════════════
//  Custom node components  (horizontal flow: left/right handles)
// ══════════════════════════════════════════════════════════════

/* ── Title ────────────────────────────────────────────────── */

function TitleNode({ data }: NodeProps) {
  const dimmed: boolean = data.dimmed ?? false;
  return (
    <div style={{ pointerEvents: 'none', textAlign: 'center', userSelect: 'none', opacity: dimmed ? 0.15 : 1 }}>
      <Handle type="source" position={Position.Right} style={{ opacity: 0 }} />
      <div
        style={{
          fontSize: 22,
          color: '#00e5ff',
          fontFamily: "'Cinzel', serif",
          fontWeight: 700,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
        }}
      >
        {data.label}
      </div>
    </div>
  );
}

/* ── Event (rich map card) ────────────────────────────────── */

function EventNode({ data, selected }: NodeProps) {
  const n: TimelineNode = data.node;
  const dimmed: boolean = data.dimmed ?? false;
  const accent = '#c9a24a';

  return (
    <div
      style={{
        background: selected ? '#1e1810' : '#17130d',
        border: `1px solid ${selected ? accent : '#2e2416'}`,
        borderTop: `2px solid ${accent}`,
        borderRadius: 2,
        padding: '10px 14px 12px',
        width: 240,
        cursor: 'pointer',
        boxShadow: selected
          ? `0 0 0 1px ${accent}50, 0 4px 24px #00000090`
          : '0 2px 8px #00000060',
        transition: 'box-shadow 0.15s, border-color 0.15s, background 0.15s, opacity 0.3s',
        position: 'relative',
        opacity: dimmed ? 0.15 : 1,
      }}
    >
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: accent, width: 7, height: 7, border: 'none', borderRadius: 1 }}
      />
      <Handle
        type="target"
        id="top"
        position={Position.Top}
        style={{ background: accent, width: 7, height: 7, border: 'none', borderRadius: 1, opacity: 0 }}
      />
      <Handle
        type="target"
        id="bottom"
        position={Position.Bottom}
        style={{ background: accent, width: 7, height: 7, border: 'none', borderRadius: 1, opacity: 0 }}
      />

      <div
        style={{
          fontSize: 8,
          color: accent,
          letterSpacing: '0.18em',
          marginBottom: 6,
          fontFamily: "'IBM Plex Mono', monospace",
          textTransform: 'uppercase',
          opacity: 0.8,
        }}
      >
        Aether Story
      </div>

      <div
        style={{
          fontSize: 13,
          color: '#ede0c8',
          fontFamily: "'Cinzel', serif",
          fontWeight: 600,
          lineHeight: 1.25,
          marginBottom: 6,
        }}
      >
        {n.label}
      </div>

      {n.date && (
        <div
          style={{
            fontSize: 9,
            color: '#7a6a50',
            fontFamily: "'IBM Plex Mono', monospace",
            letterSpacing: '0.08em',
            marginBottom: 2,
          }}
        >
          {n.date}
        </div>
      )}

      {n.location && (
        <div
          style={{
            fontSize: 9,
            color: '#4a3a22',
            fontFamily: "'IBM Plex Mono', monospace",
            letterSpacing: '0.06em',
          }}
        >
          {n.location}
        </div>
      )}

      <Handle
        type="source"
        position={Position.Right}
        style={{ background: accent, width: 7, height: 7, border: 'none', borderRadius: 1 }}
      />
      <Handle
        type="source"
        id="bottom"
        position={Position.Bottom}
        style={{ background: accent, width: 7, height: 7, border: 'none', borderRadius: 1, opacity: 0 }}
      />
      <Handle
        type="source"
        id="top"
        position={Position.Top}
        style={{ background: accent, width: 7, height: 7, border: 'none', borderRadius: 1, opacity: 0 }}
      />
    </div>
  );
}

/* ── Dimension header ─────────────────────────────────────── */

function DimensionNode({ data }: NodeProps) {
  const n: TimelineNode = data.node;
  const dimmed: boolean = data.dimmed ?? false;
  return (
    <div
      style={{
        textAlign: 'center',
        padding: '6px 14px',
        width: 180,
        userSelect: 'none',
        opacity: dimmed ? 0.15 : 1,
      }}
    >
      <Handle type="target" position={Position.Left} style={{ opacity: 0 }} />
      <Handle type="target" id="top" position={Position.Top} style={{ opacity: 0 }} />
      <Handle type="target" id="bottom" position={Position.Bottom} style={{ opacity: 0 }} />
      <div
        style={{
          fontSize: 13,
          color: n.color ?? '#00e5ff',
          fontFamily: "'Cinzel', serif",
          fontWeight: 700,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          lineHeight: 1.3,
        }}
      >
        {n.label}
      </div>
      <Handle type="source" position={Position.Right} style={{ opacity: 0 }} />
      <Handle type="source" id="bottom" position={Position.Bottom} style={{ opacity: 0 }} />
      <Handle type="source" id="top" position={Position.Top} style={{ opacity: 0 }} />
    </div>
  );
}

/* ── Branch reason (small explanatory text) ───────────────── */

function BranchReasonNode({ data }: NodeProps) {
  const n: TimelineNode = data.node;
  const dimmed: boolean = data.dimmed ?? false;
  return (
    <div
      style={{
        textAlign: 'center',
        padding: '3px 8px',
        width: 200,
        userSelect: 'none',
        opacity: dimmed ? 0.15 : 1,
      }}
    >
      <Handle type="target" position={Position.Left} style={{ opacity: 0 }} />
      <Handle type="target" id="top" position={Position.Top} style={{ opacity: 0 }} />
      <Handle type="target" id="bottom" position={Position.Bottom} style={{ opacity: 0 }} />
      <div
        style={{
          fontSize: 10,
          color: n.color ?? '#7aa991',
          fontFamily: "'IBM Plex Mono', monospace",
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          lineHeight: 1.35,
        }}
      >
        {n.label}
      </div>
      <Handle type="source" position={Position.Right} style={{ opacity: 0 }} />
      <Handle type="source" id="bottom" position={Position.Bottom} style={{ opacity: 0 }} />
      <Handle type="source" id="top" position={Position.Top} style={{ opacity: 0 }} />
    </div>
  );
}

/* ── Fracture / timeline label (coloured badge) ───────────── */

function FractureNode({ data }: NodeProps) {
  const n: TimelineNode = data.node;
  const dimmed: boolean = data.dimmed ?? false;
  const bg = n.color ?? '#cc2222';
  const hasContent = !!n.summary;
  return (
    <div
      style={{
        textAlign: 'center',
        padding: '5px 10px',
        width: 160,
        background: bg + '28',
        border: `1px solid ${bg}60`,
        borderRadius: 2,
        userSelect: 'none',
        cursor: hasContent ? 'pointer' : 'default',
        opacity: dimmed ? 0.15 : 1,
        transition: 'opacity 0.3s',
      }}
    >
      <Handle type="target" position={Position.Left} style={{ background: bg, width: 6, height: 6, border: 'none', borderRadius: 1 }} />
      <div
        style={{
          fontSize: 10,
          color: bg === '#22cc44' ? '#44ee66' : '#ff5555',
          fontFamily: "'IBM Plex Mono', monospace",
          fontWeight: 700,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          lineHeight: 1.3,
        }}
      >
        {n.label}
      </div>
      <Handle type="source" position={Position.Right} style={{ background: bg, width: 6, height: 6, border: 'none', borderRadius: 1 }} />
    </div>
  );
}

/* ── End-state (UNIVERSE DESTROYED, CHILDREN ARE SAFE) ────── */

function EndStateNode({ data }: NodeProps) {
  const n: TimelineNode = data.node;
  const color = n.color ?? '#cc2222';
  const isGood = color === '#22cc44';
  return (
    <div
      style={{
        textAlign: 'center',
        padding: '6px 12px',
        width: 160,
        userSelect: 'none',
      }}
    >
      <Handle type="target" position={Position.Left} style={{ background: color, width: 6, height: 6, border: 'none', borderRadius: 1 }} />
      <div
        style={{
          fontSize: 11,
          color: isGood ? '#44ee66' : '#ff4444',
          fontFamily: "'Cinzel', serif",
          fontWeight: 700,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          lineHeight: 1.3,
        }}
      >
        {n.label}
      </div>
    </div>
  );
}

/* ── Waypoint (invisible routing node) ─────────────────────── */

function WaypointNode() {
  return (
    <div style={{ width: 0, height: 0, position: 'relative' }}>
      <Handle type="target" position={Position.Left} style={{ opacity: 0, width: 1, height: 1 }} />
      <Handle type="target" id="right" position={Position.Right} style={{ opacity: 0, width: 1, height: 1 }} />
      <Handle type="target" id="top" position={Position.Top} style={{ opacity: 0, width: 1, height: 1 }} />
      <Handle type="target" id="bottom" position={Position.Bottom} style={{ opacity: 0, width: 1, height: 1 }} />
      <Handle type="source" position={Position.Right} style={{ opacity: 0, width: 1, height: 1 }} />
      <Handle type="source" id="left" position={Position.Left} style={{ opacity: 0, width: 1, height: 1 }} />
      <Handle type="source" id="top" position={Position.Top} style={{ opacity: 0, width: 1, height: 1 }} />
      <Handle type="source" id="bottom" position={Position.Bottom} style={{ opacity: 0, width: 1, height: 1 }} />
    </div>
  );
}

const nodeTypes = {
  title:        TitleNode,
  event:        EventNode,
  dimension:    DimensionNode,
  branchReason: BranchReasonNode,
  fracture:     FractureNode,
  endState:     EndStateNode,
  waypoint:     WaypointNode,
};

// ── Custom zoom controls ─────────────────────────────────────

const ZOOM_STEP = 1.25;

function CustomZoomControls() {
  const { zoomTo, getZoom, fitView } = useReactFlow();

  const btnStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 26,
    height: 26,
    background: '#17130d',
    border: 'none',
    borderBottom: '1px solid #2e2416',
    color: '#7a6a50',
    fontSize: 16,
    cursor: 'pointer',
    padding: 0,
    lineHeight: 1,
  };

  return (
    <Panel position="bottom-left">
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          border: '1px solid #2e2416',
          borderRadius: 2,
          overflow: 'hidden',
        }}
      >
        <button style={btnStyle} title="Zoom in" onClick={() => zoomTo(Math.min(getZoom() * ZOOM_STEP, 2), { duration: 200 })}>+</button>
        <button style={btnStyle} title="Zoom out" onClick={() => zoomTo(Math.max(getZoom() / ZOOM_STEP, 0.15), { duration: 200 })}>−</button>
        <button style={{ ...btnStyle, borderBottom: 'none', fontSize: 13 }} title="Fit view" onClick={() => fitView({ padding: 0.12, duration: 200 })}>⊞</button>
      </div>
    </Panel>
  );
}

// ── Minimap absolute panning ─────────────────────────────────

function MiniMapAbsolutePan() {
  const { setCenter, getZoom } = useReactFlow();
  const dragging = useRef(false);

  useEffect(() => {
    const svg = document.querySelector('.react-flow__minimap svg') as SVGSVGElement | null;
    if (!svg) return;

    const panTo = (e: PointerEvent) => {
      const ctm = svg.getScreenCTM();
      if (!ctm) return;
      const pt = new DOMPoint(e.clientX, e.clientY).matrixTransform(ctm.inverse());
      setCenter(pt.x, pt.y, { zoom: getZoom(), duration: 0 });
    };
    const onDown = (e: PointerEvent) => { e.preventDefault(); dragging.current = true; svg.setPointerCapture(e.pointerId); panTo(e); };
    const onMove = (e: PointerEvent) => { if (dragging.current) panTo(e); };
    const onUp   = () => { dragging.current = false; };

    svg.addEventListener('pointerdown', onDown);
    svg.addEventListener('pointermove', onMove);
    svg.addEventListener('pointerup', onUp);
    svg.addEventListener('lostpointercapture', onUp);
    return () => {
      svg.removeEventListener('pointerdown', onDown);
      svg.removeEventListener('pointermove', onMove);
      svg.removeEventListener('pointerup', onUp);
      svg.removeEventListener('lostpointercapture', onUp);
    };
  }, [setCenter, getZoom]);

  return null;
}



// ══════════════════════════════════════════════════════════════
//  Main component
// ══════════════════════════════════════════════════════════════

interface SelectedDetail {
  id: string;
  label: string;
  summary?: string;
  date?: string;
  location?: string;
  mapId?: string;
}

// Estimated rendered heights per node type so we can vertically centre
// each node on its row. ReactFlow positions by top-left corner, but
// Left/Right handles sit at 50 % of the node height. Offsetting by
// half the height makes handles on the same row line up perfectly.
const HEIGHT_EST: Record<TimelineNodeType, number> = {
  title:        30,
  event:        100,
  dimension:    36,
  branchReason: 22,
  fracture:     32,
  endState:     34,
  waypoint:     0,
};

export default function KronoriumTimeline() {
  const [selected, setSelected] = useState<SelectedDetail | null>(null);
  const [loreNodeId, setLoreNodeId] = useState<string | null>(null);
  const [crewFilter, setCrewFilter] = useState<string | null>(null);

  const matchingNodeIds = useMemo(() => {
    if (!crewFilter) return null;
    return new Set(
      TIMELINE_NODES
        .filter(n => n.crew?.includes(crewFilter))
        .map(n => n.id),
    );
  }, [crewFilter]);

  // Structural nodes (title/dimension/branchReason/fracture) stay lit if any
  // matching event is reachable downstream from them. Compute by reverse-BFS
  // from each matching event, collecting all ancestor nodes. The cycle edge
  // (ag-revelations → great-war) is excluded so reachability stays a DAG and
  // doesn't make every label trivially "kept".
  const keptAncestorIds = useMemo(() => {
    if (!matchingNodeIds) return null;
    const reverseAdj = new Map<string, string[]>();
    for (const e of TIMELINE_EDGES) {
      if (e.id === 'e-cycle') continue;
      const arr = reverseAdj.get(e.target);
      if (arr) arr.push(e.source);
      else reverseAdj.set(e.target, [e.source]);
    }
    const kept = new Set<string>(matchingNodeIds);
    const queue: string[] = [...matchingNodeIds];
    while (queue.length) {
      const cur = queue.shift()!;
      const parents = reverseAdj.get(cur);
      if (!parents) continue;
      for (const p of parents) {
        if (!kept.has(p)) {
          kept.add(p);
          queue.push(p);
        }
      }
    }
    return kept;
  }, [matchingNodeIds]);

  const nodes: Node[] = useMemo(() =>
    TIMELINE_NODES.map(n => {
      let dimmed = false;
      if (matchingNodeIds) {
        if (n.nodeType === 'event') {
          dimmed = !matchingNodeIds.has(n.id);
        } else if (
          n.nodeType === 'title' ||
          n.nodeType === 'dimension' ||
          n.nodeType === 'branchReason' ||
          n.nodeType === 'fracture'
        ) {
          dimmed = !keptAncestorIds!.has(n.id);
        }
      }
      return {
        id: n.id,
        type: n.nodeType,
        position: { x: n.x, y: n.y - HEIGHT_EST[n.nodeType] / 2 },
        data: { node: n, label: n.label, dimmed },
        selectable: n.nodeType === 'event' || n.nodeType === 'fracture',
        draggable: false,
      };
    }),
  [matchingNodeIds, keptAncestorIds]);

  const edges: Edge[] = useMemo(() =>
    TIMELINE_EDGES.map(e => {
      const isCycle = e.id === 'e-cycle';
      const isConverge = e.id === 'e-gk-rev';
      const isJourney = e.id === 'e-eis-zet' || e.id === 'e-zet-gk' || e.id === 'e-giant-eis' || e.id === 'e-origins-giant';
      const journeyColor = e.id === 'e-eis-zet' ? '#42a5f5' : e.id === 'e-zet-gk' ? '#66bb6a' : e.id === 'e-giant-eis' ? '#4a3a22' : e.id === 'e-origins-giant' ? '#4a3a22' : undefined;
      const isSpecial = isCycle || isConverge || isJourney;
      const dimmed = matchingNodeIds
        ? !(matchingNodeIds.has(e.source) || matchingNodeIds.has(e.target))
        : false;
      return {
        id: e.id,
        source: e.source,
        target: e.target,
        ...(e.sourceHandle ? { sourceHandle: e.sourceHandle } : {}),
        ...(e.targetHandle ? { targetHandle: e.targetHandle } : {}),
        ...(e.label ? {
          label: e.label,
          labelStyle: { fill: '#c9a24a', fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, letterSpacing: '0.12em' },
          labelBgStyle: { fill: '#0e0b07', fillOpacity: 0.9 },
          labelBgPadding: [6, 3] as [number, number],
        } : {}),
        type: 'smoothstep',
        animated: isCycle,
        style: {
          stroke: isCycle ? '#c9a24a' : journeyColor ?? (isConverge ? '#ab47bc' : '#4a3a22'),
          strokeWidth: isSpecial ? 2 : 1.5,
          strokeOpacity: dimmed ? 0.08 : isSpecial ? 0.7 : 0.55,
          ...(isCycle ? { strokeDasharray: '6 3' } : {}),
          ...((isConverge || isJourney) ? { strokeDasharray: '4 4' } : {}),
        },
      };
    }),
  [matchingNodeIds]);

  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    if (node.type !== 'event' && node.type !== 'fracture') return;
    const n: TimelineNode | undefined = TIMELINE_NODES.find(t => t.id === node.id);
    if (!n) return;
    setSelected(prev =>
      prev?.label === n.label
        ? null
        : { id: n.id, label: n.label, summary: n.summary, date: n.date, location: n.location, mapId: n.mapId },
    );
  }, []);

  const onPaneClick = useCallback(() => setSelected(null), []);

  const onInit = useCallback((instance: import('reactflow').ReactFlowInstance) => {
    // First fit the full graph, then zoom in 7 levels toward the left ("beginning of time")
    instance.fitView({ padding: 0.12 });

    // Use rAF to let fitView settle before adjusting
    requestAnimationFrame(() => {
      const vp = instance.getViewport();
      const newZoom = Math.min(vp.zoom * Math.pow(ZOOM_STEP, 5), 2);
      const ratio = newZoom / vp.zoom;

      const container = document.querySelector('.react-flow');
      const rect = container?.getBoundingClientRect();
      const containerW = rect?.width ?? window.innerWidth;
      const containerH = rect?.height ?? window.innerHeight;

      // Focal point: left side of the canvas, vertically centred
      const focalX = containerW * 0.05;
      const focalY = containerH / 2;

      const newX = focalX - (focalX - vp.x) * ratio;
      const newY = focalY - (focalY - vp.y) * ratio;

      instance.setViewport({ x: newX, y: newY, zoom: newZoom }, { duration: 0 });
    });
  }, []);

  return (
    <div style={{ display: 'flex', height: '100%', fontFamily: 'sans-serif' }}>
      <style>{`
        @keyframes redBlink {
          0%, 100% { border-color: #cc4444; box-shadow: 0 0 12px rgba(204,68,68,.6), inset 0 0 8px rgba(204,68,68,.3); color: #cc4444; }
          50%       { border-color: #8b1a1a; box-shadow: 0 0 6px rgba(204,68,68,.3), inset 0 0 4px rgba(204,68,68,.1); color: #5a4a32; }
        }
        .lab-link { animation: redBlink 1.2s ease-in-out infinite !important; }
      `}</style>

      {/* ── Left panel ── */}
      <div
        style={{
          width: 280,
          flexShrink: 0,
          background: '#110e09',
          borderRight: '1px solid #2e2416',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        <div style={{ padding: '18px 18px 16px', borderBottom: '1px solid #2e2416' }}>
          <div
            style={{
              fontSize: 8,
              color: '#4a3a22',
              letterSpacing: '0.22em',
              fontFamily: "'IBM Plex Mono', monospace",
              textTransform: 'uppercase',
              marginBottom: 10,
            }}
          >
            Aether Timeline
          </div>
          <a
            href="/kronorium/lab"
            className="lab-link"
            style={{
              display: 'block',
              padding: '8px 14px',
              border: '1px solid #2e2416',
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 10,
              letterSpacing: '0.12em',
              color: '#5a4a32',
              textDecoration: 'none',
              textTransform: 'uppercase',
              textAlign: 'left',
              transition: 'all 0.15s',
              borderRadius: '2px',
            }}
          >
            ⚗  Richtofen&apos;s Lab
          </a>
        </div>

        {/* ── Crew filter ── */}
        <div style={{ padding: '12px 18px', borderBottom: '1px solid #2e2416' }}>
          <div
            style={{
              fontSize: 8,
              color: '#4a3a22',
              letterSpacing: '0.22em',
              fontFamily: "'IBM Plex Mono', monospace",
              textTransform: 'uppercase',
              marginBottom: 8,
            }}
          >
            Filter by Crew
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            {CREWS.map(c => {
              const active = crewFilter === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => setCrewFilter(active ? null : c.id)}
                  style={{
                    fontSize: 8,
                    fontFamily: "'IBM Plex Mono', monospace",
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: active ? '#0e0b07' : c.color + '90',
                    background: active ? c.color : 'transparent',
                    border: `1px solid ${active ? c.color : c.color + '30'}`,
                    borderRadius: 2,
                    padding: '3px 8px',
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                  }}
                >
                  {c.id}
                </button>
              );
            })}
          </div>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '18px 18px' }}>
          {selected ? (
            <div>
              <div
                style={{
                  fontSize: 8,
                  color: '#c9a24a',
                  letterSpacing: '0.2em',
                  fontFamily: "'IBM Plex Mono', monospace",
                  textTransform: 'uppercase',
                  marginBottom: 10,
                  opacity: 0.8,
                }}
              >
                Aether Story
              </div>

              <div
                style={{
                  fontSize: 17,
                  color: '#ede0c8',
                  fontFamily: "'Cinzel', serif",
                  fontWeight: 600,
                  lineHeight: 1.3,
                  marginBottom: 10,
                }}
              >
                {selected.label}
              </div>

              {selected.date && (
                <div style={{ fontSize: 10, color: '#7a6a50', fontFamily: "'IBM Plex Mono', monospace", letterSpacing: '0.08em', marginBottom: 3 }}>
                  {selected.date}
                </div>
              )}

              {selected.location && (
                <div style={{ fontSize: 10, color: '#4a3a22', fontFamily: "'IBM Plex Mono', monospace", letterSpacing: '0.06em', marginBottom: 16 }}>
                  {selected.location}
                </div>
              )}

              <div style={{ height: 1, background: '#c9a24a30', marginBottom: 16 }} />

              {selected.summary && (
                <div style={{ fontSize: 13.5, color: '#c8b48e', fontFamily: "'EB Garamond', serif", lineHeight: 1.65, marginBottom: 20 }}>
                  {selected.summary}
                </div>
              )}

              {MAP_LORE_BY_NODE[selected.id] && (
                <button
                  onClick={() => setLoreNodeId(selected.id)}
                  style={{
                    display: 'block',
                    marginTop: 0,
                    marginBottom: 10,
                    fontSize: 10,
                    color: '#ede0c8',
                    fontFamily: "'IBM Plex Mono', monospace",
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    background: '#1e1810',
                    border: '1px solid #c9a24a60',
                    padding: '8px 14px',
                    cursor: 'pointer',
                    transition: 'border-color 0.15s, background 0.15s',
                    borderRadius: 2,
                    width: '100%',
                    textAlign: 'center',
                  }}
                >
                  ⛧ Read Full Lore
                </button>
              )}

              {selected.mapId && (
                <a
                  href={`/maps/${selected.mapId}`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    fontSize: 10,
                    color: '#c9a24a',
                    fontFamily: "'IBM Plex Mono', monospace",
                    letterSpacing: '0.12em',
                    textDecoration: 'none',
                    border: '1px solid #c9a24a40',
                    padding: '7px 14px',
                    textTransform: 'uppercase',
                    transition: 'border-color 0.15s',
                  }}
                >
                  Open Map Guide →
                </a>
              )}
            </div>
          ) : (
            <div>
              <div style={{ fontSize: 10, color: '#2e2416', fontFamily: "'IBM Plex Mono', monospace", letterSpacing: '0.12em', lineHeight: 1.8, marginTop: 8, marginBottom: 28 }}>
                Select an event on the timeline to read the entry.
              </div>
              <div style={{ fontSize: 9, color: '#221a10', fontFamily: "'IBM Plex Mono', monospace", letterSpacing: '0.1em', lineHeight: 2 }}>
                <div>PAN ········· drag canvas</div>
                <div>ZOOM ········ scroll wheel</div>
                <div>MINIMAP ····· click to jump</div>
                <div>SELECT ······ click a node</div>
                <div>DESELECT ···· click canvas</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Canvas ── */}
      <div style={{ flex: 1, position: 'relative' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodeClick={onNodeClick}
          onPaneClick={onPaneClick}
          onInit={onInit}
          minZoom={0.08}
          maxZoom={2}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={true}
          style={{ background: '#0e0b07' }}
          proOptions={{ hideAttribution: true }}
        >
          <Background variant={BackgroundVariant.Dots} gap={36} size={1} color="#1e1810" />
          <CustomZoomControls />
          <MiniMap
            zoomable
            zoomStep={5}
            style={{ background: '#110e09', border: '1px solid #2e2416', borderRadius: 2 }}
            maskColor="rgba(14,11,7,0.85)"
            nodeColor={(node: Node) => {
              const n = TIMELINE_NODES.find(t => t.id === node.id);
              if (!n) return 'transparent';
              const base = n.color ?? TYPE_ACCENT[n.nodeType] ?? '#c9a24a';
              if (matchingNodeIds && n.nodeType === 'event' && !matchingNodeIds.has(n.id)) return '#1a1510';
              return base;
            }}
            nodeStrokeWidth={0}
          />
          <MiniMapAbsolutePan />
        </ReactFlow>

        {/* Legend */}
        <div
          style={{
            position: 'absolute',
            top: 16,
            right: 16,
            pointerEvents: 'none',
            display: 'flex',
            flexDirection: 'column',
            gap: 6,
            background: '#110e09cc',
            border: '1px solid #2e2416',
            padding: '10px 14px',
            backdropFilter: 'blur(4px)',
          }}
        >
          {[
            { color: '#00e5ff', label: 'Dimension' },
            { color: '#c9a24a', label: 'Map / Event' },
            { color: '#7aa991', label: 'Branch Reason' },
            { color: '#ff5555', label: 'Fracture / Bad End' },
            { color: '#44ee66', label: 'Good End / True TL' },
            { color: '#ab47bc', label: 'Soul Collection', dashed: true },
            { color: '#4a3a22', label: 'Cleanup Journey', dashed: true },
          ].map(l => (
            <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 16, height: 2, background: l.dashed ? 'transparent' : l.color, borderRadius: 1, opacity: 0.7, ...( l.dashed ? { borderBottom: `2px dashed ${l.color}` } : {}) }} />
              <span
                style={{
                  fontSize: 9,
                  color: l.color + '90',
                  fontFamily: "'IBM Plex Mono', monospace",
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                }}
              >
                {l.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Lore Modal ── */}
      {loreNodeId && MAP_LORE_BY_NODE[loreNodeId] && (
        <MapLoreModal
          entry={MAP_LORE_BY_NODE[loreNodeId]}
          onClose={() => setLoreNodeId(null)}
        />
      )}
    </div>
  );
}