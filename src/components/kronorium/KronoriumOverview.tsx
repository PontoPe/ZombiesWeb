import React, { useCallback } from 'react';
import ReactFlow, {
  Background,
  BackgroundVariant,
  Handle,
  MarkerType,
  MiniMap,
  Panel,
  Position,
  useReactFlow,
  type Edge,
  type Node,
  type NodeProps,
  type ReactFlowInstance,
} from 'reactflow';
import 'reactflow/dist/style.css';

type OverviewTone = 'primordial' | 'aether' | 'dimension63' | 'breakCycle' | 'darkAether';

interface OverviewStep {
  id: string;
  label: string;
  tone: OverviewTone;
}

interface OverviewGroup {
  id: string;
  label: string;
  subtitle: string;
  tone: OverviewTone;
  x: number;
  y: number;
  steps: OverviewStep[];
}

interface OverviewNodeData {
  label: string;
  subtitle?: string;
  tone: OverviewTone;
}

const NODE_W = 300;
const NODE_H = 58;
const NODE_GAP = 129;
const GROUP_W = 390;
const GROUP_HEADER = 46;

const TONE_COLORS: Record<OverviewTone, { accent: string; bg: string; border: string }> = {
  primordial: { accent: '#00e5ff', bg: '#07191d', border: '#00e5ff40' },
  aether: { accent: '#c9a24a', bg: '#17130d', border: '#c9a24a40' },
  dimension63: { accent: '#ce93d8', bg: '#180f1c', border: '#ce93d840' },
  breakCycle: { accent: '#44ee66', bg: '#0d1a10', border: '#44ee6640' },
  darkAether: { accent: '#7aa991', bg: '#0b1914', border: '#7aa99140' },
};

const EDGE_LABEL_PADDING: [number, number] = [9, 5];

const groupHeight = (count: number) => GROUP_HEADER + 28 + (count - 1) * NODE_GAP + NODE_H + 34;

const GROUPS: OverviewGroup[] = [
  {
    id: 'primordial',
    label: 'Primordial Era & The Great War',
    subtitle: 'Agartha, Keepers, Apothicons',
    tone: 'primordial',
    x: 80,
    y: 60,
    steps: [
      { id: 'A', label: 'Agartha & The Keepers', tone: 'primordial' },
      { id: 'B', label: 'Discovery of Dark Aether', tone: 'primordial' },
      { id: 'C', label: 'Shadowman & Keepers Corrupted -> Apothicons', tone: 'primordial' },
      { id: 'D', label: '5 AD: Apothicons launch Element 115 Meteors', tone: 'primordial' },
      { id: 'E', label: '1292-1299: The Great War', tone: 'primordial' },
      { id: 'F', label: 'Primis & Keepers defeat Apothicons', tone: 'primordial' },
    ],
  },
  {
    id: 'aether',
    label: 'Aether Original Timeline',
    subtitle: '1930s - 2025',
    tone: 'aether',
    x: 80,
    y: 1005,
    steps: [
      { id: 'G', label: '1931: Group 935 Founded by Maxis', tone: 'aether' },
      { id: 'H', label: '1939-1940: Teleportation & Zombie Genesis', tone: 'aether' },
      { id: 'I', label: '1940: Richtofen corrupted on Moon (MPD)', tone: 'aether' },
      { id: 'J', label: '1945: Surtos - Nacht, Verruckt, Shi No Numa', tone: 'aether' },
      { id: 'K', label: '1945: Der Riese - Samantha enters MPD', tone: 'aether' },
      { id: 'L', label: '1956-1963: Ultimis Time Travel (Kino, Ascension, Shangri-La)', tone: 'aether' },
      { id: 'M', label: 'Oct 13, 2025 (Moon): Richtofen swaps souls with Sam', tone: 'aether' },
      { id: 'N', label: '2025: Maxis nukes Earth', tone: 'aether' },
      { id: 'O', label: '2030s: Post-Apocalyptic Earth (Victis Journey)', tone: 'aether' },
      { id: 'P', label: 'Victis activates towers -> Apocalyptic Dead End', tone: 'aether' },
    ],
  },
  {
    id: 'dimension63',
    label: 'Dimension 63 & The Cycle',
    subtitle: 'Origins through Revelations',
    tone: 'dimension63',
    x: 80,
    y: 2490,
    steps: [
      { id: 'Q', label: '1918 (Origins): Primis forms, frees Sam', tone: 'dimension63' },
      { id: 'R', label: '1944 (Shadows of Evil): Apothicons breach D63', tone: 'dimension63' },
      { id: 'S', label: 'Primis steals Summoning Key', tone: 'dimension63' },
      { id: 'T', label: 'Primis creates Fractures (Deceptio, Proditione, Agonia) to save Ultimis souls', tone: 'dimension63' },
      { id: 'U', label: 'Revelations: Apothicons banished', tone: 'dimension63' },
      { id: 'V', label: 'Dr. Monty sends Primis to 1292 AD (The Cycle is Sealed)', tone: 'dimension63' },
    ],
  },
  {
    id: 'break-cycle',
    label: 'Breaking the Cycle',
    subtitle: 'BO4',
    tone: 'breakCycle',
    x: 800,
    y: 2918,
    steps: [
      { id: 'W', label: '1941 (Blood of the Dead): Kronorium changes, Cycle breaks', tone: 'breakCycle' },
      { id: 'X', label: 'Nikolai executes Grand Scheme', tone: 'breakCycle' },
      { id: 'Y', label: 'Victis builds Agarthan Device in Siberia', tone: 'breakCycle' },
      { id: 'Z', label: 'Tag der Toten: Summoning Key destroyed', tone: 'breakCycle' },
      { id: 'AA', label: 'Aether Multiverse Banished to Dark Aether', tone: 'breakCycle' },
    ],
  },
  {
    id: 'dark-aether',
    label: 'Dark Aether Saga',
    subtitle: '1944 - 2026+',
    tone: 'darkAether',
    x: 800,
    y: 3745,
    steps: [
      { id: 'AB', label: '1944 (Vanguard): Endstation cyclotron breaches Dark Aether', tone: 'darkAether' },
      { id: 'AC', label: 'Gabriel Krafft & Allied forces stop Kortifex', tone: 'darkAether' },
      { id: 'AD', label: '1983-1985 (BOCW): Omega reactivates Endstation', tone: 'darkAether' },
      { id: 'AE', label: '1985 (Forsaken): Samantha sacrifices herself to seal breaches', tone: 'darkAether' },
      { id: 'AF', label: 'Richtofen (Director) shuts down Requiem, arrests staff', tone: 'darkAether' },
      { id: 'AG', label: '1990-1991 (BO6): Project Janus & Terminus Breakout', tone: 'darkAether' },
      { id: 'AH', label: 'Liberty Falls: S.A.M. AI takes Sentinel Artifact', tone: 'darkAether' },
      { id: 'AI', label: '2021/2023 (MWIII): Zakhaev triggers Zaravan breach (Operation Deadbolt)', tone: 'darkAether' },
      { id: 'AJ', label: '2025/2026 (BO7): The Abyssal Convergence', tone: 'darkAether' },
      { id: 'AK', label: 'Warden captures Ex-Requiem & Alt-Timelines Crews', tone: 'darkAether' },
      { id: 'AL', label: 'Crews dismantle Shadowsmiths in the Heart of the Dark Aether', tone: 'darkAether' },
    ],
  },
];

function OverviewGroupNode({ data }: NodeProps<OverviewNodeData>) {
  const colors = TONE_COLORS[data.tone];

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: colors.bg + 'cc',
        border: `1px solid ${colors.border}`,
        borderRadius: 2,
        boxShadow: 'inset 0 0 34px #00000060',
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          padding: '14px 18px 10px',
          borderBottom: `1px solid ${colors.border}`,
          background: '#0e0b0790',
        }}
      >
        <div
          style={{
            color: colors.accent,
            fontFamily: "'Cinzel', serif",
            fontSize: 15,
            fontWeight: 700,
            letterSpacing: '0.08em',
            lineHeight: 1.2,
            textTransform: 'uppercase',
          }}
        >
          {data.label}
        </div>
        <div
          style={{
            color: '#7a6a50',
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 8,
            letterSpacing: '0.14em',
            marginTop: 5,
            textTransform: 'uppercase',
          }}
        >
          {data.subtitle}
        </div>
      </div>
    </div>
  );
}

function OverviewStepNode({ data, selected }: NodeProps<OverviewNodeData>) {
  const colors = TONE_COLORS[data.tone];
  const handleStyle: React.CSSProperties = {
    background: colors.accent,
    border: 'none',
    borderRadius: 1,
    height: 7,
    opacity: 0,
    width: 7,
  };

  return (
    <div
      style={{
        alignItems: 'center',
        background: selected ? '#1e1810' : '#17130d',
        border: `1px solid ${selected ? colors.accent : colors.border}`,
        borderLeft: `3px solid ${colors.accent}`,
        borderRadius: 2,
        boxShadow: selected ? `0 0 0 1px ${colors.accent}50, 0 4px 24px #00000080` : '0 2px 9px #00000066',
        color: '#ede0c8',
        display: 'flex',
        fontFamily: "'EB Garamond', serif",
        fontSize: 16,
        fontWeight: 600,
        justifyContent: 'center',
        lineHeight: 1.25,
        minHeight: NODE_H,
        padding: '9px 14px',
        textAlign: 'center',
        width: NODE_W,
      }}
    >
      <Handle type="target" position={Position.Top} id="top" style={handleStyle} />
      <Handle type="target" position={Position.Left} id="left" style={handleStyle} />
      <Handle type="target" position={Position.Right} id="right" style={handleStyle} />
      <Handle type="source" position={Position.Bottom} id="bottom" style={handleStyle} />
      <Handle type="source" position={Position.Left} id="left" style={handleStyle} />
      <Handle type="source" position={Position.Right} id="right" style={handleStyle} />
      {data.label}
    </div>
  );
}

const nodeTypes = {
  overviewGroup: OverviewGroupNode,
  overviewStep: OverviewStepNode,
};

const createNodes = (): Node<OverviewNodeData>[] => {
  const nodes: Node<OverviewNodeData>[] = [];

  for (const group of GROUPS) {
    nodes.push({
      id: `group-${group.id}`,
      type: 'overviewGroup',
      position: { x: group.x, y: group.y },
      data: { label: group.label, subtitle: group.subtitle, tone: group.tone },
      draggable: false,
      selectable: false,
      style: { width: GROUP_W, height: groupHeight(group.steps.length) },
      zIndex: 0,
    });

    group.steps.forEach((step, index) => {
      nodes.push({
        id: step.id,
        type: 'overviewStep',
        position: {
          x: group.x + (GROUP_W - NODE_W) / 2,
          y: group.y + GROUP_HEADER + 28 + index * NODE_GAP,
        },
        data: { label: step.label, tone: step.tone },
        draggable: false,
        selectable: true,
        zIndex: 2,
      });
    });
  }

  return nodes;
};

const chainEdges = (ids: string[], tone: OverviewTone): Edge[] =>
  ids.slice(0, -1).map((id, index) => ({
    id: `${id}-${ids[index + 1]}`,
    source: id,
    target: ids[index + 1],
    sourceHandle: 'bottom',
    targetHandle: 'top',
    type: 'smoothstep',
    markerEnd: { type: MarkerType.ArrowClosed, color: TONE_COLORS[tone].accent },
    style: { stroke: TONE_COLORS[tone].accent, strokeOpacity: 0.68, strokeWidth: 1.8 },
  }));

const createEdges = (): Edge[] => [
  ...chainEdges(['A', 'B', 'C', 'D', 'E', 'F'], 'primordial'),
  ...chainEdges(['G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P'], 'aether'),
  ...chainEdges(['Q', 'R', 'S', 'T', 'U', 'V'], 'dimension63'),
  ...chainEdges(['W', 'X', 'Y', 'Z', 'AA'], 'breakCycle'),
  ...chainEdges(['AB', 'AC', 'AD', 'AE', 'AF', 'AG', 'AH', 'AI', 'AJ', 'AK', 'AL'], 'darkAether'),
  {
    id: 'F-G',
    source: 'F',
    target: 'G',
    sourceHandle: 'bottom',
    targetHandle: 'top',
    type: 'smoothstep',
    markerEnd: { type: MarkerType.ArrowClosed, color: '#c9a24a' },
    style: { stroke: '#c9a24a', strokeOpacity: 0.72, strokeWidth: 2 },
  },
  {
    id: 'P-Q',
    source: 'P',
    target: 'Q',
    sourceHandle: 'bottom',
    targetHandle: 'top',
    label: 'Multiversal Pivot',
    labelStyle: { fill: '#c9a24a', fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, letterSpacing: '0.12em' },
    labelBgStyle: { fill: '#0e0b07', fillOpacity: 0.9 },
    labelBgPadding: EDGE_LABEL_PADDING,
    type: 'smoothstep',
    markerEnd: { type: MarkerType.ArrowClosed, color: '#ce93d8' },
    style: { stroke: '#ce93d8', strokeOpacity: 0.74, strokeWidth: 2 },
  },
  {
    id: 'V-E',
    source: 'V',
    target: 'E',
    sourceHandle: 'left',
    targetHandle: 'left',
    label: 'Perpetual Loop',
    labelStyle: { fill: '#c9a24a', fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, letterSpacing: '0.12em' },
    labelBgStyle: { fill: '#0e0b07', fillOpacity: 0.9 },
    labelBgPadding: EDGE_LABEL_PADDING,
    type: 'smoothstep',
    animated: true,
    markerEnd: { type: MarkerType.ArrowClosed, color: '#c9a24a' },
    style: { stroke: '#c9a24a', strokeDasharray: '6 4', strokeOpacity: 0.7, strokeWidth: 2 },
  },
  {
    id: 'T-W',
    source: 'T',
    target: 'W',
    sourceHandle: 'right',
    targetHandle: 'left',
    label: 'Timeline Altered',
    labelStyle: { fill: '#44ee66', fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, letterSpacing: '0.12em' },
    labelBgStyle: { fill: '#0e0b07', fillOpacity: 0.9 },
    labelBgPadding: EDGE_LABEL_PADDING,
    type: 'smoothstep',
    markerEnd: { type: MarkerType.ArrowClosed, color: '#44ee66' },
    style: { stroke: '#44ee66', strokeDasharray: '5 4', strokeOpacity: 0.82, strokeWidth: 2.2 },
  },
  {
    id: 'AA-AB',
    source: 'AA',
    target: 'AB',
    sourceHandle: 'bottom',
    targetHandle: 'top',
    type: 'smoothstep',
    markerEnd: { type: MarkerType.ArrowClosed, color: '#7aa991' },
    style: { stroke: '#7aa991', strokeOpacity: 0.78, strokeWidth: 2.2 },
  },
];

const OVERVIEW_NODES = createNodes();
const OVERVIEW_EDGES = createEdges();

function OverviewZoomControls() {
  const { fitView, getZoom, zoomTo } = useReactFlow();

  const btnStyle: React.CSSProperties = {
    alignItems: 'center',
    background: '#17130d',
    border: 'none',
    borderBottom: '1px solid #2e2416',
    color: '#7a6a50',
    cursor: 'pointer',
    display: 'flex',
    fontSize: 16,
    height: 26,
    justifyContent: 'center',
    lineHeight: 1,
    padding: 0,
    width: 26,
  };

  return (
    <Panel position="bottom-left">
      <div style={{ border: '1px solid #2e2416', borderRadius: 2, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <button style={btnStyle} title="Zoom in" onClick={() => zoomTo(Math.min(getZoom() * 1.25, 1.4), { duration: 200 })}>+</button>
        <button style={btnStyle} title="Zoom out" onClick={() => zoomTo(Math.max(getZoom() / 1.25, 0.08), { duration: 200 })}>-</button>
        <button style={{ ...btnStyle, borderBottom: 'none', fontSize: 13 }} title="Fit view" onClick={() => fitView({ padding: 0.08, duration: 200 })}>[]</button>
      </div>
    </Panel>
  );
}

export default function KronoriumOverview() {
  const onInit = useCallback((instance: ReactFlowInstance) => {
    instance.fitView({ padding: 0.08 });
  }, []);

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <ReactFlow
        nodes={OVERVIEW_NODES}
        edges={OVERVIEW_EDGES}
        nodeTypes={nodeTypes}
        onInit={onInit}
        minZoom={0.08}
        maxZoom={1.4}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable
        style={{ background: '#0e0b07' }}
        proOptions={{ hideAttribution: true }}
      >
        <Background variant={BackgroundVariant.Dots} gap={36} size={1} color="#1e1810" />
        <OverviewZoomControls />
        <Panel position="top-left">
          <div
            style={{
              background: '#110e09dd',
              border: '1px solid #2e2416',
              borderRadius: 2,
              color: '#7a6a50',
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 9,
              letterSpacing: '0.14em',
              padding: '9px 12px',
              textTransform: 'uppercase',
            }}
          >
            Overview Flow
          </div>
        </Panel>
        <MiniMap
          pannable
          zoomable
          style={{ background: '#110e09', border: '1px solid #2e2416', borderRadius: 2 }}
          maskColor="rgba(14,11,7,0.85)"
          nodeColor={(node: Node<OverviewNodeData>) => TONE_COLORS[node.data.tone].accent}
          nodeStrokeWidth={0}
        />
      </ReactFlow>
    </div>
  );
}
