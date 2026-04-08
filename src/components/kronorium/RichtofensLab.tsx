import React, { useState, useRef, useMemo, useCallback, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PointerLockControls } from '@react-three/drei';
import * as THREE from 'three';
import { pickRandomDocuments, type LabDocument } from '../../data/labDocuments';
import DocumentViewer from './DocumentViewer';

// ── Constants ────────────────────────────────────────────────

const DOC_COUNT = 7;
const GLOW_RANGE = 3.2;
const GLOW_IDLE = 0.03;
const GLOW_NEAR = 0.08;
const GLOW_TARGET = 0.28;

// FPS controller
const EYE_HEIGHT = 1.6;
const MOVE_SPEED = 2.6;
const PLAYER_RADIUS = 0.3;
const PICKUP_RANGE = 2.2;

// Room bounds (walls at ±5 on x, ±4 on z)
const ROOM_MIN_X = -5 + PLAYER_RADIUS;
const ROOM_MAX_X = 5 - PLAYER_RADIUS;
const ROOM_MIN_Z = -4 + PLAYER_RADIUS;
const ROOM_MAX_Z = 4 - PLAYER_RADIUS;

// Furniture AABBs (XZ plane) the player can't walk through
const OBSTACLES: Array<{ minX: number; maxX: number; minZ: number; maxZ: number }> = [
  { minX: -1.2, maxX: 1.2, minZ: -2.1, maxZ: -0.9 },      // desk
  { minX: -4.55, maxX: -3.85, minZ: -3.3, maxZ: -2.7 },   // filing cabinet
  { minX: 3.15, maxX: 4.85, minZ: -2.7, maxZ: -2.3 },     // shelf
  { minX: 0.55, maxX: 1.05, minZ: -0.25, maxZ: 0.25 },    // chair
];

function collidesAt(x: number, z: number): boolean {
  if (x < ROOM_MIN_X || x > ROOM_MAX_X) return true;
  if (z < ROOM_MIN_Z || z > ROOM_MAX_Z) return true;
  for (const o of OBSTACLES) {
    if (
      x > o.minX - PLAYER_RADIUS &&
      x < o.maxX + PLAYER_RADIUS &&
      z > o.minZ - PLAYER_RADIUS &&
      z < o.maxZ + PLAYER_RADIUS
    ) {
      return true;
    }
  }
  return false;
}

// ── Interactable document mesh ───────────────────────────────

interface DocProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
  doc: LabDocument;
  isTargeted: boolean;
}

function DocPaper({ position, rotation = [0, 0, 0], scale = [0.28, 0.38, 1], doc, isTargeted }: DocProps) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const matRef = useRef<THREE.MeshStandardMaterial>(null!);

  useFrame(({ camera }) => {
    if (!matRef.current) return;
    const dist = camera.position.distanceTo(new THREE.Vector3(...position));
    const proximity = Math.max(0, 1 - dist / GLOW_RANGE);
    const target = isTargeted
      ? GLOW_TARGET
      : proximity > 0.05
        ? GLOW_NEAR * proximity
        : GLOW_IDLE;
    matRef.current.emissiveIntensity = THREE.MathUtils.lerp(
      matRef.current.emissiveIntensity,
      target,
      0.12,
    );
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      rotation={rotation}
      scale={scale}
      userData={{ docId: doc.id }}
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
      {/* Front wall (closes the room behind the player) */}
      <mesh position={[0, 1.6, 4]} rotation={[0, Math.PI, 0]} material={wallMat}>
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

interface FlickerLightProps {
  position: [number, number, number];
  color?: string;
  bulbColor?: string;
  baseIntensity?: number;
  distance?: number;
  phase?: number;
  /** [min, max] seconds the bulb stays lit between flickers */
  onDwell?: [number, number];
  /** [min, max] seconds the bulb drops dark during a flicker */
  offDwell?: [number, number];
}

function FlickerLight({
  position,
  color = '#e8c880',
  bulbColor = '#ffe0a0',
  baseIntensity = 1.6,
  distance = 22,
  phase = 0,
  onDwell = [0.6, 2.8],
  offDwell = [0.04, 0.22],
}: FlickerLightProps) {
  const lightRef = useRef<THREE.PointLight>(null!);
  const bulbMatRef = useRef<THREE.MeshStandardMaterial>(null!);
  const blinkStateRef = useRef({ nextToggle: 0, on: true });

  useFrame(({ clock }) => {
    if (!lightRef.current) return;
    const t = clock.elapsedTime + phase;

    // Hard on/off flicker — both lights use this, just with different dwell ranges
    if (t > blinkStateRef.current.nextToggle) {
      blinkStateRef.current.on = !blinkStateRef.current.on;
      const range = blinkStateRef.current.on ? onDwell : offDwell;
      const dwell = range[0] + Math.random() * (range[1] - range[0]);
      blinkStateRef.current.nextToggle = t + dwell;
    }
    if (!blinkStateRef.current.on) {
      lightRef.current.intensity = 0;
      if (bulbMatRef.current) bulbMatRef.current.emissiveIntensity = 0.2;
      return;
    }

    // Continuous subtle flicker while lit
    const flicker =
      baseIntensity +
      Math.sin(t * 12) * 0.18 +
      Math.sin(t * 27) * 0.1 +
      (Math.random() - 0.5) * 0.28;
    lightRef.current.intensity = Math.max(0, flicker);
    if (bulbMatRef.current) {
      bulbMatRef.current.emissiveIntensity = 2.2 + flicker * 0.6;
    }
  });

  return (
    <>
      <pointLight
        ref={lightRef}
        position={position}
        color={color}
        intensity={baseIntensity}
        distance={distance}
        decay={1.6}
        castShadow
      />
      {/* Bulb mesh */}
      <mesh position={[position[0], position[1] + 0.05, position[2]]}>
        <sphereGeometry args={[0.07, 10, 10]} />
        <meshStandardMaterial
          ref={bulbMatRef}
          color={bulbColor}
          emissive={bulbColor}
          emissiveIntensity={3}
        />
      </mesh>
      {/* Wire */}
      <mesh position={[position[0], position[1] + 0.12, position[2]]}>
        <cylinderGeometry args={[0.005, 0.005, 0.12, 4]} />
        <meshStandardMaterial color="#333" />
      </mesh>
    </>
  );
}

// ── FPS Controller ───────────────────────────────────────────

interface FPSControllerProps {
  docs: LabDocument[];
  paused: boolean;
  onLockChange: (locked: boolean) => void;
  onTargetChange: (id: string | null) => void;
  onPickDoc: (doc: LabDocument) => void;
}

function FPSController({
  docs,
  paused,
  onLockChange,
  onTargetChange,
  onPickDoc,
}: FPSControllerProps) {
  const { camera, scene, gl } = useThree();
  const controlsRef = useRef<any>(null);
  const keysRef = useRef<Record<string, boolean>>({});
  const raycasterRef = useRef(new THREE.Raycaster());
  const targetIdRef = useRef<string | null>(null);
  const lockedRef = useRef(false);
  const docsRef = useRef(docs);
  const onPickDocRef = useRef(onPickDoc);

  useEffect(() => {
    docsRef.current = docs;
  }, [docs]);
  useEffect(() => {
    onPickDocRef.current = onPickDoc;
  }, [onPickDoc]);

  // Unlock the pointer when the app asks us to pause (e.g. doc viewer opens)
  useEffect(() => {
    if (paused && controlsRef.current?.isLocked) {
      controlsRef.current.unlock();
    }
  }, [paused]);

  // Attempt pickup on E / F / Mouse1
  useEffect(() => {
    const tryPick = () => {
      if (!lockedRef.current) return;
      const id = targetIdRef.current;
      if (!id) return;
      const doc = docsRef.current.find(d => d.id === id);
      if (doc) onPickDocRef.current(doc);
    };

    const onKeyDown = (e: KeyboardEvent) => {
      keysRef.current[e.code] = true;
      if (e.code === 'KeyE' || e.code === 'KeyF') {
        tryPick();
      }
    };
    const onKeyUp = (e: KeyboardEvent) => {
      keysRef.current[e.code] = false;
    };
    const onMouseDown = (e: MouseEvent) => {
      if (e.button === 0) tryPick();
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    const dom = gl.domElement;
    dom.addEventListener('mousedown', onMouseDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      dom.removeEventListener('mousedown', onMouseDown);
    };
  }, [gl]);

  // Fix eye height once on mount so the OrbitControls-era starting position
  // doesn't leave the player floating.
  useEffect(() => {
    camera.position.y = EYE_HEIGHT;
  }, [camera]);

  const forward = useMemo(() => new THREE.Vector3(), []);
  const right = useMemo(() => new THREE.Vector3(), []);
  const move = useMemo(() => new THREE.Vector3(), []);
  const centerNdc = useMemo(() => new THREE.Vector2(0, 0), []);

  useFrame((_, delta) => {
    if (paused || !lockedRef.current) {
      if (targetIdRef.current !== null) {
        targetIdRef.current = null;
        onTargetChange(null);
      }
      return;
    }

    // Movement
    camera.getWorldDirection(forward);
    forward.y = 0;
    if (forward.lengthSq() > 0) forward.normalize();
    right.crossVectors(forward, camera.up).normalize();

    move.set(0, 0, 0);
    const k = keysRef.current;
    if (k['KeyW'] || k['ArrowUp']) move.add(forward);
    if (k['KeyS'] || k['ArrowDown']) move.sub(forward);
    if (k['KeyD'] || k['ArrowRight']) move.add(right);
    if (k['KeyA'] || k['ArrowLeft']) move.sub(right);

    if (move.lengthSq() > 0) {
      move.normalize().multiplyScalar(MOVE_SPEED * delta);
      // Slide along walls: resolve X and Z independently
      const nextX = camera.position.x + move.x;
      if (!collidesAt(nextX, camera.position.z)) camera.position.x = nextX;
      const nextZ = camera.position.z + move.z;
      if (!collidesAt(camera.position.x, nextZ)) camera.position.z = nextZ;
    }
    camera.position.y = EYE_HEIGHT;

    // Raycast from the screen center for pickup targeting
    raycasterRef.current.setFromCamera(centerNdc, camera);
    const hits = raycasterRef.current.intersectObjects(scene.children, true);
    let found: string | null = null;
    for (const h of hits) {
      if (h.distance > PICKUP_RANGE) break;
      const id = (h.object.userData as { docId?: string } | undefined)?.docId;
      if (id) {
        found = id;
        break;
      }
      // Non-doc object blocks the ray (wall, furniture) — stop searching
      break;
    }
    if (found !== targetIdRef.current) {
      targetIdRef.current = found;
      onTargetChange(found);
    }
  });

  return (
    <PointerLockControls
      ref={controlsRef}
      onLock={() => {
        lockedRef.current = true;
        onLockChange(true);
      }}
      onUnlock={() => {
        lockedRef.current = false;
        onLockChange(false);
        if (targetIdRef.current !== null) {
          targetIdRef.current = null;
          onTargetChange(null);
        }
      }}
    />
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

interface LabSceneProps {
  docs: LabDocument[];
  targetedId: string | null;
  paused: boolean;
  onPickDoc: (doc: LabDocument) => void;
  onLockChange: (locked: boolean) => void;
  onTargetChange: (id: string | null) => void;
}

function LabScene({
  docs,
  targetedId,
  paused,
  onPickDoc,
  onLockChange,
  onTargetChange,
}: LabSceneProps) {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.32} color="#5a4a30" />
      {/* Main desk light — mostly on with occasional quick flickers */}
      <FlickerLight
        position={[0, 3.0, -1.5]}
        color="#ffe2a8"
        bulbColor="#ffe8b0"
        baseIntensity={2.2}
        distance={24}
        onDwell={[2.5, 6.0]}
        offDwell={[0.03, 0.1]}
      />
      {/* Second bulb over the entrance/chair side — snappier blink cadence */}
      <FlickerLight
        position={[0, 3.0, 1.8]}
        color="#ffd890"
        bulbColor="#ffe0a0"
        baseIntensity={1.9}
        distance={22}
        phase={1.7}
        onDwell={[0.8, 3.0]}
        offDwell={[0.05, 0.2]}
      />
      {/* Warm fill so the far corners never go pitch black even during a blink */}
      <pointLight position={[-3.5, 2.2, 2.5]} color="#8a6030" intensity={0.45} distance={12} decay={1.8} />
      <pointLight position={[3.5, 2.2, 2.5]} color="#8a6030" intensity={0.35} distance={10} decay={1.8} />

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
            isTargeted={targetedId === doc.id}
          />
        );
      })}

      {/* FPS walk + look + raycast pickup */}
      <FPSController
        docs={docs}
        paused={paused}
        onLockChange={onLockChange}
        onTargetChange={onTargetChange}
        onPickDoc={onPickDoc}
      />
    </>
  );
}

// ── Main exported component ──────────────────────────────────

export default function RichtofensLab() {
  const [docs] = useState(() => pickRandomDocuments(DOC_COUNT));
  const [viewingDoc, setViewingDoc] = useState<LabDocument | null>(null);
  const [foundIds, setFoundIds] = useState<Set<string>>(new Set());
  const [locked, setLocked] = useState(false);
  const [targetedId, setTargetedId] = useState<string | null>(null);

  const handlePick = useCallback((doc: LabDocument) => {
    setFoundIds(prev => new Set(prev).add(doc.id));
    setViewingDoc(doc);
  }, []);

  const handleClose = useCallback(() => {
    setViewingDoc(null);
  }, []);

  const paused = viewingDoc !== null;
  const targetedDoc = targetedId ? docs.find(d => d.id === targetedId) : null;

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', background: '#0a0806' }}>
      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, EYE_HEIGHT, 2.5], fov: 70, near: 0.1, far: 50 }}
        shadows
        style={{ width: '100%', height: '100%' }}
        gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.35 }}
      >
        <fog attach="fog" args={['#120d08', 8, 22]} />
        <LabScene
          docs={docs}
          targetedId={targetedId}
          paused={paused}
          onPickDoc={handlePick}
          onLockChange={setLocked}
          onTargetChange={setTargetedId}
        />
      </Canvas>

      {/* Crosshair */}
      {locked && !paused && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: 4,
            height: 4,
            marginLeft: -2,
            marginTop: -2,
            borderRadius: '50%',
            background: targetedDoc ? '#e8c880' : 'rgba(232, 200, 128, 0.55)',
            boxShadow: targetedDoc ? '0 0 6px #e8c880' : 'none',
            pointerEvents: 'none',
            zIndex: 4,
          }}
        />
      )}

      {/* Pickup prompt */}
      {locked && !paused && targetedDoc && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(50% + 22px)',
            left: '50%',
            transform: 'translateX(-50%)',
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 11,
            letterSpacing: '0.18em',
            color: '#e8c880',
            textTransform: 'uppercase',
            pointerEvents: 'none',
            textShadow: '0 0 8px rgba(0,0,0,0.9)',
            whiteSpace: 'nowrap',
            zIndex: 4,
          }}
        >
          [ E ] Read document
        </div>
      )}

      {/* Click-to-play overlay (shown when pointer is not locked) */}
      {!locked && !paused && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 14,
            background: 'rgba(8, 6, 4, 0.55)',
            color: '#c9a24a',
            fontFamily: "'IBM Plex Mono', monospace",
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            pointerEvents: 'none',
            zIndex: 6,
            textShadow: '0 0 8px rgba(0,0,0,0.9)',
          }}
        >
          <div style={{ fontFamily: "'Cinzel', serif", fontSize: 22, letterSpacing: '0.3em' }}>
            Click to enter
          </div>
          <div style={{ fontSize: 10, color: '#8a7040' }}>
            WASD · Move &nbsp; · &nbsp; Mouse · Look &nbsp; · &nbsp; E / F / Click · Pick up &nbsp; · &nbsp; Esc · Pause
          </div>
        </div>
      )}

      {/* HUD — found counter */}
      <div
        style={{
          position: 'absolute',
          bottom: 20,
          left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: 10,
          letterSpacing: '0.18em',
          color: '#6a5028',
          textTransform: 'uppercase',
          pointerEvents: 'none',
          textAlign: 'center',
          textShadow: '0 0 6px rgba(0,0,0,0.8)',
          zIndex: 3,
        }}
      >
        {foundIds.size >= DOC_COUNT
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
          color: '#6a5028',
          textDecoration: 'none',
          textTransform: 'uppercase',
          zIndex: 7,
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
          color: '#5a4628',
          textTransform: 'uppercase',
          zIndex: 3,
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
