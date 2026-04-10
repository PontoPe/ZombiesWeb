import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import ReactFlow, {
  MiniMap,
  Panel,
  useReactFlow,
  MarkerType,
  type Node,
  type Edge,
  type NodeProps,
  Handle,
  Position,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { LORE_EVENTS, LORE_CONNECTIONS, type LoreEvent, type StoryThread } from '../../data/kronorium';

// ── Constants ────────────────────────────────────────────────

// Colors visible on both parchment canvas and the dark detail panel
const THREAD_COLOR: Record<StoryThread, string> = {
  aether: '#b83000',  // vermillion — reads on parchment and on dark
  chaos: '#1a50c4',   // royal blue — reads on parchment and on dark
};

const THREAD_LABEL: Record<StoryThread, string> = {
  aether: 'Aether Story',
  chaos: 'Chaos Story',
};

// ── Custom node ──────────────────────────────────────────────

function LoreEventNode({ data, selected }: NodeProps) {
  const event: LoreEvent = data.event;
  const accent = THREAD_COLOR[event.thread];

  return (
    <div
      style={{
        background: selected ? '#c8a870' : '#d6bc8e',
        border: `1px solid ${accent}60`,
        borderTop: `3px solid ${accent}`,
        borderRadius: 1,
        padding: '8px 12px 10px',
        width: 190,
        cursor: 'pointer',
        boxShadow: selected
          ? `0 0 0 1px ${accent}50, 0 4px 16px rgba(0,0,0,0.30)`
          : '0 1px 5px rgba(0,0,0,0.18)',
        transition: 'box-shadow 0.15s, border-color 0.15s, background 0.15s',
        position: 'relative',
      }}
    >
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: accent, width: 7, height: 7, border: 'none', borderRadius: 1 }}
      />

      <div
        style={{
          fontSize: 7,
          color: accent,
          letterSpacing: '0.18em',
          marginBottom: 5,
          fontFamily: "'IBM Plex Mono', monospace",
          textTransform: 'uppercase',
          opacity: 0.85,
        }}
      >
        {THREAD_LABEL[event.thread]}
      </div>

      <div
        style={{
          fontSize: 11,
          color: '#1a0d00',
          fontFamily: "'Cinzel', serif",
          fontWeight: 700,
          lineHeight: 1.2,
          marginBottom: 5,
        }}
      >
        {event.title}
      </div>

      <div
        style={{
          fontSize: 8,
          color: '#4a2c0a',
          fontFamily: "'IBM Plex Mono', monospace",
          letterSpacing: '0.06em',
          marginBottom: 2,
        }}
      >
        {event.date}
      </div>

      <div
        style={{
          fontSize: 8,
          color: '#6a4a1a',
          fontFamily: "'IBM Plex Mono', monospace",
          letterSpacing: '0.04em',
        }}
      >
        {event.location}
      </div>

      <Handle
        type="source"
        position={Position.Right}
        style={{ background: accent, width: 7, height: 7, border: 'none', borderRadius: 1 }}
      />
    </div>
  );
}

const nodeTypes = { loreEvent: LoreEventNode };

// ── Row divider node ─────────────────────────────────────────

function RowLabelNode({ data }: NodeProps) {
  return (
    <div
      style={{
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        userSelect: 'none',
      }}
    >
      <div style={{ width: 32, height: 2, background: data.color + 'cc' }} />
      <span
        style={{
          fontSize: 8,
          color: data.color,
          fontFamily: "'IBM Plex Mono', monospace",
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          fontWeight: 700,
          textShadow: '0 1px 2px rgba(255,255,255,0.4)',
        }}
      >
        {data.label}
      </span>
      <div style={{ width: 2500, height: 1, background: data.color + '40' }} />
    </div>
  );
}

const fullNodeTypes = { loreEvent: LoreEventNode, rowLabel: RowLabelNode };

// ── Custom zoom controls (finer steps than default) ─────────

const ZOOM_STEP = 1.25;

function CustomZoomControls() {
  const { zoomTo, getZoom, fitView } = useReactFlow();

  const btnStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 26,
    height: 26,
    background: 'rgba(212, 188, 142, 0.92)',
    border: 'none',
    borderBottom: '1px solid rgba(100, 60, 20, 0.35)',
    color: '#3a1a00',
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
          border: '1px solid rgba(100, 60, 20, 0.5)',
          borderRadius: 2,
          overflow: 'hidden',
        }}
      >
        <button
          style={btnStyle}
          title="Zoom in"
          onClick={() => zoomTo(Math.min(getZoom() * ZOOM_STEP, 2), { duration: 200 })}
        >
          +
        </button>
        <button
          style={btnStyle}
          title="Zoom out"
          onClick={() => zoomTo(Math.max(getZoom() / ZOOM_STEP, 0.15), { duration: 200 })}
        >
          −
        </button>
        <button
          style={{ ...btnStyle, borderBottom: 'none', fontSize: 13 }}
          title="Fit view"
          onClick={() => fitView({ padding: 0.12, duration: 200 })}
        >
          ⊞
        </button>
      </div>
    </Panel>
  );
}

// ── Minimap absolute panning (viewport jumps to pointer) ────

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

    const onDown = (e: PointerEvent) => {
      e.preventDefault();
      dragging.current = true;
      svg.setPointerCapture(e.pointerId);
      panTo(e);
    };

    const onMove = (e: PointerEvent) => {
      if (!dragging.current) return;
      panTo(e);
    };

    const onUp = () => {
      dragging.current = false;
    };

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

// ── Row label nodes (static decorators) ─────────────────────

const ROW_LABELS: Node[] = [
  {
    id: '__label-aether-1',
    type: 'rowLabel',
    position: { x: 100, y: 30 },
    data: { label: 'Aether Story — Main Chain', color: '#b83000' },
    selectable: false,
    draggable: false,
  },
  {
    id: '__label-aether-2',
    type: 'rowLabel',
    position: { x: 100, y: 310 },
    data: { label: 'Aether Story — Branches & Primis', color: '#b83000' },
    selectable: false,
    draggable: false,
  },
  {
    id: '__label-chaos',
    type: 'rowLabel',
    position: { x: 100, y: 630 },
    data: { label: 'Chaos Story', color: '#1a50c4' },
    selectable: false,
    draggable: false,
  },
];

// ── Main component ───────────────────────────────────────────

export default function KronoriumTimeline() {
  const [activeThread, setActiveThread] = useState<'all' | StoryThread>('all');
  const [selectedEvent, setSelectedEvent] = useState<LoreEvent | null>(null);

  const nodes: Node[] = useMemo(() => {
    const eventNodes: Node[] = LORE_EVENTS
      .filter(e => activeThread === 'all' || e.thread === activeThread)
      .map(event => ({
        id: event.id,
        type: 'loreEvent',
        position: { x: event.x, y: event.y },
        data: { event },
        selectable: true,
        draggable: false,
      }));

    const labels = activeThread === 'all'
      ? ROW_LABELS
      : ROW_LABELS.filter(l => {
          if (activeThread === 'aether') return l.id !== '__label-chaos';
          return l.id === '__label-chaos';
        });

    return [...labels, ...eventNodes];
  }, [activeThread]);

  const edges: Edge[] = useMemo(() => {
    const visibleIds = new Set(
      LORE_EVENTS
        .filter(e => activeThread === 'all' || e.thread === activeThread)
        .map(e => e.id)
    );

    return LORE_CONNECTIONS
      .filter(conn => visibleIds.has(conn.source) && visibleIds.has(conn.target))
      .map(conn => {
        const sourceEvent = LORE_EVENTS.find(e => e.id === conn.source);
        const accent = sourceEvent ? THREAD_COLOR[sourceEvent.thread] : '#c9a24a';
        return {
          id: conn.id,
          source: conn.source,
          target: conn.target,
          ...(conn.label ? { label: conn.label } : {}),
          animated: false,
          style: { stroke: accent, strokeWidth: 2.2, strokeOpacity: 0.80 },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            width: 14,
            height: 14,
            color: accent,
          },
          labelStyle: {
            fill: '#2a1200',
            fontFamily: 'IBM Plex Mono',
            fontSize: 9,
            letterSpacing: '0.08em',
          },
          labelBgStyle: { fill: '#d4bb8a', fillOpacity: 0.92 },
          labelBgPadding: [4, 6] as [number, number],
        };
      });
  }, [activeThread]);

  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    if (node.type === 'rowLabel') return;
    const event = LORE_EVENTS.find(e => e.id === node.id) ?? null;
    setSelectedEvent(prev => (prev?.id === event?.id ? null : event));
  }, []);

  const onPaneClick = useCallback(() => {
    setSelectedEvent(null);
  }, []);

  const filterBtn = (
    value: 'all' | StoryThread,
    label: string,
    accent: string
  ) => (
    <button
      key={value}
      onClick={() => {
        setActiveThread(value);
        setSelectedEvent(null);
      }}
      style={{
        background: activeThread === value ? accent + '18' : 'transparent',
        border: `1px solid ${activeThread === value ? accent : '#2e2416'}`,
        color: activeThread === value ? accent : '#4a3a22',
        padding: '7px 14px',
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: 10,
        letterSpacing: '0.12em',
        cursor: 'pointer',
        textAlign: 'left' as const,
        textTransform: 'uppercase' as const,
        transition: 'all 0.15s',
        width: '100%',
      }}
    >
      {label}
    </button>
  );

  return (
    <div style={{ display: 'flex', height: '100%', fontFamily: 'sans-serif' }}>
      <style>{`
        @keyframes redBlink {
          0%, 100% {
            border-color: #cc4444;
            box-shadow: 0 0 12px rgba(204, 68, 68, 0.6), inset 0 0 8px rgba(204, 68, 68, 0.3);
            color: #cc4444;
          }
          50% {
            border-color: #8b1a1a;
            box-shadow: 0 0 6px rgba(204, 68, 68, 0.3), inset 0 0 4px rgba(204, 68, 68, 0.1);
            color: #5a4a32;
          }
        }
        .lab-link {
          animation: redBlink 1.2s ease-in-out infinite !important;
        }
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
        {/* Filters */}
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
            Filter by Thread
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            {filterBtn('all',    '◈  All Events',    '#ede0c8')}
            {filterBtn('aether', '◆  Aether Story',  '#b83000')}
            {filterBtn('chaos',  '◆  Chaos Story',   '#1a50c4')}
          </div>

          <a
            href="/kronorium/lab"
            className="lab-link"
            style={{
              display: 'block',
              marginTop: 12,
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

        {/* Event detail or instructions */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '18px 18px' }}>
          {selectedEvent ? (
            <div>
              <div
                style={{
                  fontSize: 8,
                  color: THREAD_COLOR[selectedEvent.thread],
                  letterSpacing: '0.2em',
                  fontFamily: "'IBM Plex Mono', monospace",
                  textTransform: 'uppercase',
                  marginBottom: 10,
                  opacity: 0.8,
                }}
              >
                {THREAD_LABEL[selectedEvent.thread]}
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
                {selectedEvent.title}
              </div>

              <div
                style={{
                  fontSize: 10,
                  color: '#7a6a50',
                  fontFamily: "'IBM Plex Mono', monospace",
                  letterSpacing: '0.08em',
                  marginBottom: 3,
                }}
              >
                {selectedEvent.date}
              </div>

              <div
                style={{
                  fontSize: 10,
                  color: '#4a3a22',
                  fontFamily: "'IBM Plex Mono', monospace",
                  letterSpacing: '0.06em',
                  marginBottom: 16,
                }}
              >
                {selectedEvent.location}
              </div>

              <div
                style={{
                  height: 1,
                  background: THREAD_COLOR[selectedEvent.thread] + '30',
                  marginBottom: 16,
                }}
              />

              <div
                style={{
                  fontSize: 13.5,
                  color: '#c8b48e',
                  fontFamily: "'EB Garamond', serif",
                  lineHeight: 1.65,
                  marginBottom: 20,
                }}
              >
                {selectedEvent.summary}
              </div>

              {selectedEvent.mapId && (
                <a
                  href={`/maps/${selectedEvent.mapId}`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    fontSize: 10,
                    color: THREAD_COLOR[selectedEvent.thread],
                    fontFamily: "'IBM Plex Mono', monospace",
                    letterSpacing: '0.12em',
                    textDecoration: 'none',
                    border: `1px solid ${THREAD_COLOR[selectedEvent.thread]}40`,
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
              <div
                style={{
                  fontSize: 10,
                  color: '#2e2416',
                  fontFamily: "'IBM Plex Mono', monospace",
                  letterSpacing: '0.12em',
                  lineHeight: 1.8,
                  marginTop: 8,
                  marginBottom: 28,
                }}
              >
                Select an event on the timeline to read the entry.
              </div>

              <div
                style={{
                  fontSize: 9,
                  color: '#221a10',
                  fontFamily: "'IBM Plex Mono', monospace",
                  letterSpacing: '0.1em',
                  lineHeight: 2,
                }}
              >
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
      <div
        style={{
          flex: 1,
          position: 'relative',
          backgroundImage: 'url("/images/kronorium-timeline.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          border: '2px solid #6b3d1a',
        }}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={fullNodeTypes}
          onNodeClick={onNodeClick}
          onPaneClick={onPaneClick}
          fitView
          fitViewOptions={{ padding: 0.12 }}
          minZoom={0.15}
          maxZoom={2}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={true}
          style={{ background: 'rgba(210, 185, 140, 0.30)' }}
          proOptions={{ hideAttribution: true }}
        >
          <CustomZoomControls />

          <MiniMap
            zoomable
            zoomStep={5}
            style={{
              background: '#d6bc8e',
              border: '1px solid rgba(100, 60, 20, 0.5)',
              borderRadius: 2,
            }}
            maskColor="rgba(200, 170, 110, 0.75)"
            nodeColor={(node: Node) => {
              if (node.type === 'rowLabel') return 'transparent';
              const event = LORE_EVENTS.find(e => e.id === node.id);
              return event ? THREAD_COLOR[event.thread] : '#7a1a00';
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
            gap: 7,
            background: 'rgba(212, 188, 142, 0.92)',
            border: '1px solid rgba(100, 60, 20, 0.55)',
            padding: '10px 14px',
            backdropFilter: 'blur(4px)',
          }}
        >
          {(['aether', 'chaos'] as StoryThread[]).map(t => (
            <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div
                style={{
                  width: 20,
                  height: 2.5,
                  background: THREAD_COLOR[t],
                  borderRadius: 1,
                }}
              />
              <span
                style={{
                  fontSize: 9,
                  color: THREAD_COLOR[t],
                  fontFamily: "'IBM Plex Mono', monospace",
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                }}
              >
                {THREAD_LABEL[t]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
