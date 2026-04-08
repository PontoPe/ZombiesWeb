import React, { useState, useRef, useMemo, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { pickRandomDocuments, type LabDocument } from '../../data/labDocuments';
import DocumentViewer from './DocumentViewer';

// ── Constants ────────────────────────────────────────────────

const DOC_COUNT = 7;
const GLOW_RANGE = 3.2;
const GLOW_IDLE = 0.02;
const GLOW_NEAR = 0.06;
const GLOW_HOVER = 0.18;

// ── Interactable document mesh ───────────────────────────────

interface DocProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
  doc: LabDocument;
  onPick: (doc: LabDocument) => void;
}

function DocPaper({ position, rotation = [0, 0, 0], scale = [0.28, 0.38, 1], doc, onPick }: DocProps) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const matRef = useRef<THREE.MeshStandardMaterial>(null!);
  const [hovered, setHovered] = useState(false);

  useFrame(({ camera }) => {
    if (!matRef.current) return;
    const dist = camera.position.distanceTo(new THREE.Vector3(...position));
    const proximity = Math.max(0, 1 - dist / GLOW_RANGE);
    const target = hovered && proximity > 0.1
      ? GLOW_HOVER * proximity
      : proximity > 0.05
        ? GLOW_NEAR * proximity
        : GLOW_IDLE;
    matRef.current.emissiveIntensity = THREE.MathUtils.lerp(
      matRef.current.emissiveIntensity,
      target,
      0.08,
    );
  });

  const handleOver = useCallback(() => {
    setHovered(true);
    document.body.style.cursor = 'pointer';
  }, []);
  const handleOut = useCallback(() => {
    setHovered(false);
    document.body.style.cursor = '';
  }, []);

  return (
    <mesh
      ref={meshRef}
      position={position}
      rotation={rotation}
      scale={scale}
      onPointerOver={handleOver}
      onPointerOut={handleOut}
      onClick={() => onPick(doc)}
    >
      <planeGeometry args={[1, 1.35]} />
      <meshStandardMaterial
        ref={matRef}
        color="#c0aa80"
        roughness={1}
        emissive="#c9a24a"
        emissiveIntensity={0}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// ── Room geometry ────────────────────────────────────────────

function Room() {
  const wallMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#2a2820', roughness: 0.92, side: THREE.BackSide }),
    [],
  );
  const floorMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#1e1a14', roughness: 0.85 }),
    [],
  );
  const ceilMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#1a1816', roughness: 0.95, side: THREE.BackSide }),
    [],
  );

  return (
    <group>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} material={floorMat}>
        <planeGeometry args={[10, 8]} />
      </mesh>
      {/* Ceiling */}
      <mesh position={[0, 3.2, 0]} rotation={[Math.PI / 2, 0, 0]} material={ceilMat}>
        <planeGeometry args={[10, 8]} />
      </mesh>
      {/* Back wall */}
      <mesh position={[0, 1.6, -4]} material={wallMat}>
        <planeGeometry args={[10, 3.2]} />
      </mesh>
      {/* Left wall */}
      <mesh position={[-5, 1.6, 0]} rotation={[0, Math.PI / 2, 0]} material={wallMat}>
        <planeGeometry args={[8, 3.2]} />
      </mesh>
      {/* Right wall */}
      <mesh position={[5, 1.6, 0]} rotation={[0, -Math.PI / 2, 0]} material={wallMat}>
        <planeGeometry args={[8, 3.2]} />
      </mesh>
    </group>
  );
}

// ── Props / furniture ────────────────────────────────────────

function Desk() {
  const woodMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#3a2a18', roughness: 0.75 }),
    [],
  );
  return (
    <group position={[0, 0, -1.5]}>
      {/* Top */}
      <mesh position={[0, 0.74, 0]} material={woodMat}>
        <boxGeometry args={[2.4, 0.06, 1.2]} />
      </mesh>
      {/* Legs */}
      {[[-1.1, 0.37, -0.5], [1.1, 0.37, -0.5], [-1.1, 0.37, 0.5], [1.1, 0.37, 0.5]].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]} material={woodMat}>
          <boxGeometry args={[0.06, 0.74, 0.06]} />
        </mesh>
      ))}
    </group>
  );
}

function FilingCabinet() {
  const metalMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#2e3028', roughness: 0.6, metalness: 0.3 }),
    [],
  );
  return (
    <group position={[-4.2, 0, -3]}>
      <mesh position={[0, 0.7, 0]} material={metalMat}>
        <boxGeometry args={[0.6, 1.4, 0.5]} />
      </mesh>
      {/* Open drawer */}
      <mesh position={[0, 1.1, 0.2]} material={metalMat}>
        <boxGeometry args={[0.52, 0.28, 0.15]} />
      </mesh>
    </group>
  );
}

function Shelf() {
  const woodMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#2e2218', roughness: 0.8 }),
    [],
  );
  return (
    <group position={[4, 0, -2.5]}>
      {/* Shelf boards */}
      <mesh position={[0, 1.6, 0]} material={woodMat}>
        <boxGeometry args={[1.6, 0.04, 0.3]} />
      </mesh>
      <mesh position={[0, 2.2, 0]} material={woodMat}>
        <boxGeometry args={[1.6, 0.04, 0.3]} />
      </mesh>
      {/* Side brackets */}
      <mesh position={[-0.78, 1.9, 0]} material={woodMat}>
        <boxGeometry args={[0.04, 0.64, 0.28]} />
      </mesh>
      <mesh position={[0.78, 1.9, 0]} material={woodMat}>
        <boxGeometry args={[0.04, 0.64, 0.28]} />
      </mesh>
      {/* Jar props */}
      <mesh position={[-0.4, 1.72, 0]}>
        <cylinderGeometry args={[0.06, 0.06, 0.2, 8]} />
        <meshStandardMaterial color="#2a4a3a" roughness={0.4} transparent opacity={0.7} />
      </mesh>
      <mesh position={[0.2, 1.72, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.22, 8]} />
        <meshStandardMaterial color="#3a2a2a" roughness={0.5} transparent opacity={0.6} />
      </mesh>
    </group>
  );
}

function WallBoard() {
  const boardMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#4a3a20', roughness: 0.9 }),
    [],
  );
  return (
    <mesh position={[0, 2.0, -3.95]} material={boardMat}>
      <boxGeometry args={[2.0, 1.2, 0.04]} />
    </mesh>
  );
}

function Chair() {
  const mat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#2a2218', roughness: 0.8 }),
    [],
  );
  return (
    <group position={[0.8, 0, 0]} rotation={[0.3, 0.5, 0.8]}>
      <mesh position={[0, 0.22, 0]} material={mat}>
        <boxGeometry args={[0.4, 0.04, 0.4]} />
      </mesh>
      {[[-0.17, 0.11, -0.17], [0.17, 0.11, -0.17], [-0.17, 0.11, 0.17], [0.17, 0.11, 0.17]].map((p, i) => (
        <mesh key={i} position={p as [number, number, number]} material={mat}>
          <boxGeometry args={[0.03, 0.22, 0.03]} />
        </mesh>
      ))}
      <mesh position={[0, 0.5, -0.18]} material={mat}>
        <boxGeometry args={[0.4, 0.55, 0.03]} />
      </mesh>
    </group>
  );
}

// ── Flickering light ─────────────────────────────────────────

function FlickerLight() {
  const lightRef = useRef<THREE.PointLight>(null!);

  useFrame(({ clock }) => {
    if (!lightRef.current) return;
    const t = clock.elapsedTime;
    const flicker = 0.6 + Math.sin(t * 12) * 0.08 + Math.sin(t * 27) * 0.05 + Math.random() * 0.12;
    lightRef.current.intensity = flicker;
  });

  return (
    <>
      <pointLight
        ref={lightRef}
        position={[0, 3.0, -1.5]}
        color="#e8c880"
        intensity={0.7}
        distance={12}
        decay={2}
        castShadow
      />
      {/* Bulb mesh */}
      <mesh position={[0, 3.05, -1.5]}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshStandardMaterial color="#ffe0a0" emissive="#ffe0a0" emissiveIntensity={2} />
      </mesh>
      {/* Wire */}
      <mesh position={[0, 3.12, -1.5]}>
        <cylinderGeometry args={[0.005, 0.005, 0.12, 4]} />
        <meshStandardMaterial color="#333" />
      </mesh>
    </>
  );
}

// ── Document spawn positions ─────────────────────────────────

const DOC_SPAWNS: Array<{
  position: [number, number, number];
  rotation: [number, number, number];
  scale?: [number, number, number];
}> = [
  // Desk papers
  { position: [-0.6, 0.78, -1.3], rotation: [-Math.PI / 2, 0, 0.12] },
  { position: [0.4, 0.78, -1.6], rotation: [-Math.PI / 2, 0, -0.08] },
  { position: [-0.1, 0.785, -1.1], rotation: [-Math.PI / 2, 0, 0.25] },
  // Wall board
  { position: [-0.5, 2.15, -3.91], rotation: [0, 0, 0.04] },
  { position: [0.4, 1.85, -3.91], rotation: [0, 0, -0.06] },
  // Filing cabinet top
  { position: [-4.2, 1.42, -2.85], rotation: [-0.3, 0.1, 0.05] },
  // Shelf
  { position: [4.3, 2.24, -2.4], rotation: [0, -0.2, 0.03], scale: [0.24, 0.32, 1] },
];

// ── Scene wrapper ────────────────────────────────────────────

function LabScene({
  docs,
  onPickDoc,
}: {
  docs: LabDocument[];
  onPickDoc: (doc: LabDocument) => void;
}) {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.04} color="#4a4030" />
      <FlickerLight />
      {/* Secondary dim fill from doorway */}
      <pointLight position={[0, 2, 3.5]} color="#3050a0" intensity={0.08} distance={8} decay={2} />

      {/* Room */}
      <Room />
      <Desk />
      <FilingCabinet />
      <Shelf />
      <WallBoard />
      <Chair />

      {/* Interactable documents */}
      {docs.map((doc, i) => {
        const spawn = DOC_SPAWNS[i];
        if (!spawn) return null;
        return (
          <DocPaper
            key={doc.id}
            position={spawn.position}
            rotation={spawn.rotation}
            scale={spawn.scale}
            doc={doc}
            onPick={onPickDoc}
          />
        );
      })}

      {/* Camera controls */}
      <OrbitControls
        target={[0, 1.2, -1.5]}
        minDistance={1.5}
        maxDistance={5.5}
        minPolarAngle={0.4}
        maxPolarAngle={1.55}
        minAzimuthAngle={-Math.PI / 2.5}
        maxAzimuthAngle={Math.PI / 2.5}
        enableDamping
        dampingFactor={0.06}
        enablePan={false}
        rotateSpeed={0.5}
        zoomSpeed={0.6}
      />
    </>
  );
}

// ── Main exported component ──────────────────────────────────

export default function RichtofensLab() {
  const [docs] = useState(() => pickRandomDocuments(DOC_COUNT));
  const [viewingDoc, setViewingDoc] = useState<LabDocument | null>(null);
  const [foundIds, setFoundIds] = useState<Set<string>>(new Set());

  const handlePick = useCallback((doc: LabDocument) => {
    setFoundIds(prev => new Set(prev).add(doc.id));
    setViewingDoc(doc);
    document.body.style.cursor = '';
  }, []);

  const handleClose = useCallback(() => {
    setViewingDoc(null);
  }, []);

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', background: '#0a0806' }}>
      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 1.6, 3.2], fov: 55, near: 0.1, far: 50 }}
        shadows
        style={{ width: '100%', height: '100%' }}
        gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 0.9 }}
      >
        <fog attach="fog" args={['#0a0806', 3, 12]} />
        <LabScene docs={docs} onPickDoc={handlePick} />
      </Canvas>

      {/* HUD overlay — found counter + hint */}
      <div
        style={{
          position: 'absolute',
          bottom: 20,
          left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: 10,
          letterSpacing: '0.18em',
          color: '#4a3a22',
          textTransform: 'uppercase',
          pointerEvents: 'none',
          textAlign: 'center',
        }}
      >
        {foundIds.size === 0
          ? 'Look around the lab. Zoom in to find hidden documents.'
          : foundIds.size >= DOC_COUNT
            ? `All ${DOC_COUNT} documents recovered.`
            : `${foundIds.size} / ${DOC_COUNT} documents found`}
      </div>

      {/* Back link */}
      <a
        href="/kronorium"
        style={{
          position: 'absolute',
          top: 16,
          left: 20,
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: 10,
          letterSpacing: '0.18em',
          color: '#4a3a22',
          textDecoration: 'none',
          textTransform: 'uppercase',
          zIndex: 5,
        }}
      >
        ← Kronorium
      </a>

      {/* Lab title */}
      <div
        style={{
          position: 'absolute',
          top: 16,
          right: 20,
          fontFamily: "'Cinzel', serif",
          fontSize: 12,
          letterSpacing: '0.25em',
          color: '#3a2e1e',
          textTransform: 'uppercase',
          zIndex: 5,
        }}
      >
        Richtofen&apos;s Lab
      </div>

      {/* Document viewer overlay */}
      {viewingDoc && (
        <DocumentViewer
          doc={viewingDoc}
          onClose={handleClose}
          found={foundIds.size}
          total={DOC_COUNT}
        />
      )}
    </div>
  );
}
