import React, { useState, useRef, useMemo, useCallback, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PointerLockControls, useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';
import { pickRandomDocuments, type LabDocument } from '../../data/labDocuments';
import DocumentViewer from './DocumentViewer';
import LabTerminal from './LabTerminal';

// ── Constants ────────────────────────────────────────────────

const DOC_COUNT = 14;
const GLOW_RANGE = 3.2;
const GLOW_IDLE = 0.03;
const GLOW_NEAR = 0.08;
const GLOW_TARGET = 0.28;

// FPS controller
const EYE_HEIGHT = 1.6;
const MOVE_SPEED = 2.6;
const PLAYER_RADIUS = 0.3;
const PICKUP_RANGE = 2.2;

// Room bounds (walls at ±8 on x, ±6 on z)
const ROOM_HALF_X = 8;
const ROOM_HALF_Z = 6;
const ROOM_MIN_X = -ROOM_HALF_X + PLAYER_RADIUS;
const ROOM_MAX_X = ROOM_HALF_X - PLAYER_RADIUS;
const ROOM_MIN_Z = -ROOM_HALF_Z + PLAYER_RADIUS;
const ROOM_MAX_Z = ROOM_HALF_Z - PLAYER_RADIUS;

// Furniture AABBs (XZ plane) the player can't walk through
const OBSTACLES: Array<{ minX: number; maxX: number; minZ: number; maxZ: number }> = [
  { minX: -1.2, maxX: 1.2, minZ: -3.2, maxZ: -1.8 },     // desk
  { minX: -7.5, maxX: -6.5, minZ: -6.0, maxZ: -5.0 },    // filing cabinet (at [-7, 0, -5.5])
  { minX: 6.0, maxX: 7.8, minZ: -5.0, maxZ: -3.8 },      // shelf
  { minX: 6.4, maxX: 7.8, minZ: -2.2, maxZ: -1.2 },      // psx cabinet
  { minX: 0.2, maxX: 1.4, minZ: -5.2, maxZ: -4.2 },      // chair (at [0.8, 0.3, -4.7])
  { minX: 7.4, maxX: 8.0, minZ: 3.8, maxZ: 4.6 },        // barricaded door (at [7.9, 0, 4.2], narrow)
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

const ROOM_W = ROOM_HALF_X * 2;
const ROOM_D = ROOM_HALF_Z * 2;
const CEIL_H = 3.2;

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
        <planeGeometry args={[ROOM_W, ROOM_D]} />
      </mesh>
      {/* Ceiling */}
      <mesh position={[0, CEIL_H, 0]} rotation={[Math.PI / 2, 0, 0]} material={ceilMat}>
        <planeGeometry args={[ROOM_W, ROOM_D]} />
      </mesh>
      {/* Back wall */}
      <mesh position={[0, CEIL_H / 2, -ROOM_HALF_Z]} material={wallMat}>
        <planeGeometry args={[ROOM_W, CEIL_H]} />
      </mesh>
      {/* Front wall */}
      <mesh position={[0, CEIL_H / 2, ROOM_HALF_Z]} rotation={[0, Math.PI, 0]} material={wallMat}>
        <planeGeometry args={[ROOM_W, CEIL_H]} />
      </mesh>
      {/* Left wall */}
      <mesh position={[-ROOM_HALF_X, CEIL_H / 2, 0]} rotation={[0, Math.PI / 2, 0]} material={wallMat}>
        <planeGeometry args={[ROOM_D, CEIL_H]} />
      </mesh>
      {/* Right wall */}
      <mesh position={[ROOM_HALF_X, CEIL_H / 2, 0]} rotation={[0, -Math.PI / 2, 0]} material={wallMat}>
        <planeGeometry args={[ROOM_D, CEIL_H]} />
      </mesh>
    </group>
  );
}

// ── Props / furniture ────────────────────────────────────────

function Desk() {
  const { scene } = useGLTF('/3dassets/psx_dining_table.glb');
  return (
    <group position={[0, 0, -2.5]}>
      <primitive object={scene.clone()} />
    </group>
  );
}

function FilingCabinet() {
  const { scene, animations } = useGLTF('/3dassets/filing_cabinet.glb');
  const groupRef = useRef<THREE.Group>(null!);
  const { actions } = useAnimations(animations, groupRef);
  const openRef = useRef<Record<string, boolean>>({});


  const handleClick = useCallback(() => {
    if (!actions) return;
    const names = Object.keys(actions);
    for (const name of names) {
      const action = actions[name];
      if (!action) continue;
      const isOpen = openRef.current[name] ?? false;
      action.paused = false;
      action.clampWhenFinished = true;
      action.setLoop(THREE.LoopOnce, 1);
      if (isOpen) {
        action.timeScale = -1;
        if (action.time === 0) action.time = action.getClip().duration;
        action.play();
      } else {
        action.timeScale = 1;
        action.reset().play();
      }
      openRef.current[name] = !isOpen;
    }
  }, [actions]);

  return (
    <group
      ref={groupRef}
      position={[-7, 0, -5.5]}
      rotation={[0, Math.PI / 2, 0]}
      scale={[1.2, 1.2, 1.2]}
      onClick={handleClick}
    >
      <primitive object={scene} />
    </group>
  );
}

function PsxCabinet() {
  const { scene } = useGLTF('/3dassets/psx_cabinet.glb');
  return (
    <group position={[7, 0, -1.7]} rotation={[0, -Math.PI / 2, 0]} scale={[1.1, 1.1, 1.1]}>
      <primitive object={scene.clone()} />
    </group>
  );
}

function Shelf() {
  const woodMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#2e2218', roughness: 0.8 }),
    [],
  );
  return (
    <group position={[7, 0, -4.4]}>
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
  const { scene } = useGLTF('/3dassets/low_poly_notice_board.glb');
  return (
    <group position={[0, 2.0, -5.93]} rotation={[Math.PI / 2, 0, 0]} scale={[18, 18, 18]}>
      <primitive object={scene.clone()} />
    </group>
  );
}

function Chair() {
  const { scene } = useGLTF('/3dassets/psx_chair.glb');
  return (
    <group position={[0.8, 0.3, -4.7]} rotation={[Math.PI / 2, Math.PI / 2, Math.PI]}>
      <primitive object={scene.clone()} />
    </group>
  );
}

function OldComputer() {
  const { scene } = useGLTF('/3dassets/old_computer.glb');
  const cloned = useMemo(() => {
    const c = scene.clone(true);
    // Tag every mesh so the raycast can identify it as the computer
    c.traverse((child: any) => {
      if (child.isMesh) {
        child.userData = { interactable: 'computer' };
      }
    });
    return c;
  }, [scene]);
  return (
    <group position={[-0.2, 0.78, -2.55]} rotation={[0, Math.PI / 2 + 0.15, 0]} scale={[1.33, 1.33, 1.33]}>
      <primitive object={cloned} />
    </group>
  );
}

function Mauser() {
  const { scene } = useGLTF('/3dassets/mauser_c-96_psx_ps1_style.glb');
  return (
    <group position={[0.85, 0.82, -2.7]} rotation={[0, -0.4, Math.PI / 2]} scale={[0.1, 0.1, 0.1]}>
      <primitive object={scene.clone()} />
    </group>
  );
}

function RayGun() {
  const { scene } = useGLTF('/3dassets/minecraft_raygun.glb');
  return (
    <group position={[7.2, 0.685, -2]} rotation={[0, 0.8, Math.PI / 2]} scale={[0.15, 0.15, 0.15]}>
      <primitive object={scene.clone()} />
    </group>
  );
}

function OldBook() {
  const { scene } = useGLTF('/3dassets/psx_old_book.glb');
  return (
    <group position={[-1.5, 0.031, -2.74]} rotation={[0, 0.6, 0]} scale={[0.3, 0.3, 0.3]}>
      <primitive object={scene.clone()} />
    </group>
  );
}

function BluePen() {
  const { scene } = useGLTF('/3dassets/low_poly_pen_blue.glb');
  return (
    <group position={[-0.2, 0.8, -2.3]} rotation={[0, 1.2, 0]} scale={[0.15, 0.15, 0.15]}>
      <primitive object={scene.clone()} />
    </group>
  );
}

// ── Blood decals ────────────────────────────────────────────

function BloodyDragMark() {
  const { scene } = useGLTF('/3dassets/bloody_drag_mark_decal_psx.glb');
  return (
    <group position={[0.3, 1.01, -6]} rotation={[0, Math.PI / 2, 0]} scale={[0.167, 0.167, 0.167]}>
      <primitive object={scene.clone()} />
    </group>
  );
}

function HelpBloodDecal() {
  const { scene } = useGLTF('/3dassets/help_blood_decal_psx.glb');
  return (
    <group position={[-3.5, 1.5, -5.96]} rotation={[0, -Math.PI / 2, 0]} scale={[0.286, 0.286, 0.286]}>
      <primitive object={scene.clone()} />
    </group>
  );
}

function BloodyHand({ position, rotation, scale }: {
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
}) {
  const { scene } = useGLTF('/3dassets/psx_bloody_hand.glb');
  const cloned = useMemo(() => {
    const c = scene.clone(true);
    c.traverse((child: any) => {
      if (child.isMesh && child.material) {
        const mat = child.material.clone();
        mat.transparent = true;
        mat.alphaTest = 0.5;
        // If the model uses a map (texture), it should have alpha;
        // otherwise force white parts invisible by treating white as transparent
        if (!mat.map) {
          mat.opacity = 0.9;
        }
        child.material = mat;
      }
    });
    return c;
  }, [scene]);
  return (
    <group position={position} rotation={rotation ?? [0, 0, 0]} scale={scale ?? [1, 1, 1]}>
      <primitive object={cloned} />
    </group>
  );
}

// ── Barricaded door (planks nailed across) ──────────────────

function BarricadedDoor() {
  const woodMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#3a2a18', roughness: 0.9 }),
    [],
  );
  return (
    <group position={[7.9, 0, 4.2]} rotation={[0, -Math.PI / 2, 0]}>
      {/* Door frame */}
      <mesh position={[0, 1.2, 0]}>
        <boxGeometry args={[1.0, 2.4, 0.1]} />
        <meshStandardMaterial color="#1a1410" roughness={0.95} />
      </mesh>
      {/* Planks nailed across */}
      <mesh position={[0, 1.6, 0.08]} rotation={[0, 0, 0.15]} material={woodMat}>
        <boxGeometry args={[1.2, 0.12, 0.04]} />
      </mesh>
      <mesh position={[0, 1.0, 0.08]} rotation={[0, 0, -0.1]} material={woodMat}>
        <boxGeometry args={[1.1, 0.12, 0.04]} />
      </mesh>
      <mesh position={[0, 0.5, 0.08]} rotation={[0, 0, 0.05]} material={woodMat}>
        <boxGeometry args={[1.15, 0.12, 0.04]} />
      </mesh>
    </group>
  );
}

// ── Preload all GLB assets ──────────────────────────────────

useGLTF.preload('/3dassets/psx_dining_table.glb');
useGLTF.preload('/3dassets/filing_cabinet.glb');
useGLTF.preload('/3dassets/psx_cabinet.glb');
useGLTF.preload('/3dassets/low_poly_notice_board.glb');
useGLTF.preload('/3dassets/psx_chair.glb');
useGLTF.preload('/3dassets/old_computer.glb');
useGLTF.preload('/3dassets/mauser_c-96_psx_ps1_style.glb');
useGLTF.preload('/3dassets/minecraft_raygun.glb');
useGLTF.preload('/3dassets/psx_old_book.glb');
useGLTF.preload('/3dassets/low_poly_pen_blue.glb');
useGLTF.preload('/3dassets/bloody_drag_mark_decal_psx.glb');
useGLTF.preload('/3dassets/help_blood_decal_psx.glb');
useGLTF.preload('/3dassets/psx_bloody_hand.glb');

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
  terminalOpen: boolean;
  onLockChange: (locked: boolean) => void;
  onTargetChange: (id: string | null) => void;
  onPickDoc: (doc: LabDocument) => void;
  onInteract: (type: string) => void;
  onControlsReady?: (controls: { lock: () => void }) => void;
}

function FPSController({
  docs,
  paused,
  terminalOpen,
  onLockChange,
  onTargetChange,
  onPickDoc,
  onInteract,
  onControlsReady,
}: FPSControllerProps) {
  const { camera, scene, gl } = useThree();
  const controlsRef = useRef<any>(null);
  const keysRef = useRef<Record<string, boolean>>({});
  const raycasterRef = useRef(new THREE.Raycaster());
  const targetIdRef = useRef<string | null>(null);
  const lockedRef = useRef(false);
  const docsRef = useRef(docs);
  const onPickDocRef = useRef(onPickDoc);
  const onInteractRef = useRef(onInteract);

  useEffect(() => {
    docsRef.current = docs;
  }, [docs]);
  useEffect(() => {
    onPickDocRef.current = onPickDoc;
  }, [onPickDoc]);
  useEffect(() => {
    onInteractRef.current = onInteract;
  }, [onInteract]);
  useEffect(() => {
    onControlsReady?.({
      lock: () => controlsRef.current?.lock(),
    });
    return () => onControlsReady?.({ lock: () => {} });
  }, [onControlsReady]);

  // Track whether we were locked before a pause so we can restore it
  const wasLockedBeforePause = useRef(false);

  useEffect(() => {
    if (paused) {
      // Unlock whenever a modal overlay is open so the cursor can be used.
      if (controlsRef.current?.isLocked) {
        wasLockedBeforePause.current = true;
        controlsRef.current.unlock();
      }
    } else if (wasLockedBeforePause.current) {
      // Unpause: re-lock after a short delay (browsers require a user gesture
      // gap before re-locking pointer, but the overlay click/keypress counts)
      wasLockedBeforePause.current = false;
      const timer = setTimeout(() => {
        controlsRef.current?.lock();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [paused, terminalOpen]);

  // Attempt pickup / interact on E / F
  useEffect(() => {
    const tryPick = () => {
      if (!lockedRef.current) return;
      const id = targetIdRef.current;
      if (!id) return;
      // Check if it's an interactable (prefixed with @)
      if (id.startsWith('@')) {
        onInteractRef.current(id.slice(1));
        return;
      }
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

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, []);

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
      const ud = h.object.userData as { docId?: string; interactable?: string } | undefined;
      if (ud?.docId) {
        found = ud.docId;
        break;
      }
      if (ud?.interactable) {
        found = `@${ud.interactable}`;
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
  { position: [-1.385, 0.055, -2.59], rotation: [-Math.PI / 2, 0, -0.859], scale: [0.212, 0.2, 0.01] },
  { position: [0.4, 0.82, -2.5], rotation: [-Math.PI / 2, 0, -0.08] },
  { position: [0.8, 0.82, -2.4], rotation: [-Math.PI / 2, 0, 0.25] },
  // Wall board (notice board on back wall)
  { position: [-0.5, 2.15, -5.89], rotation: [0, 0, 0.04] },
  { position: [0.4, 1.85, -5.89], rotation: [0, 0, -0.06] },
  // Floor scattered
  { position: [3.2, 0.01, 2], rotation: [-Math.PI / 2, 0, 0.4] },
  { position: [-3.5, 0.01, 3.5], rotation: [-Math.PI / 2, 0, -0.2] },
  { position: [5, 0.01, 0.5], rotation: [-Math.PI / 2, 0, 1.1] },
  // Shelf
  { position: [7.3, 2.24, -4.3], rotation: [Math.PI / 2, 0, 0.03], scale: [0.24, 0.32, 1] },
  // On/near filing cabinet
  { position: [-6.7, 1.445, -5.7], rotation: [-Math.PI / 2, 0, 0.15], scale: [0.22, 0.3, 1] },
  // Near psx cabinet
  { position: [7.0, 0.67, -1.5], rotation: [-Math.PI / 2, 0, -0.1], scale: [0.24, 0.32, 1] },
  // Left wall area floor
  { position: [-5.5, 0.01, -1], rotation: [-Math.PI / 2, 0, 0.7] },
  // Near barricaded door
  { position: [5.5, 0.01, 4.5], rotation: [-Math.PI / 2, 0, -0.5] },
  // Near jug
  { position: [-6.0, 0.01, 2.5], rotation: [-Math.PI / 2, 0, 0.3] },
];

// ── Scene wrapper ────────────────────────────────────────────

interface LabSceneProps {
  docs: LabDocument[];
  targetedId: string | null;
  paused: boolean;
  terminalOpen: boolean;
  onPickDoc: (doc: LabDocument) => void;
  onLockChange: (locked: boolean) => void;
  onTargetChange: (id: string | null) => void;
  onInteract: (type: string) => void;
  onControlsReady?: (controls: { lock: () => void }) => void;
}

function LabScene({
  docs,
  targetedId,
  paused,
  terminalOpen,
  onPickDoc,
  onLockChange,
  onTargetChange,
  onInteract,
  onControlsReady,
}: LabSceneProps) {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.25} color="#5a4a30" />
      {/* Main desk light — mostly on with occasional quick flickers */}
      <FlickerLight
        position={[0, 3.0, -2.5]}
        color="#ffe2a8"
        bulbColor="#ffe8b0"
        baseIntensity={2.2}
        distance={26}
        onDwell={[2.5, 6.0]}
        offDwell={[0.03, 0.1]}
      />
      {/* Second bulb over the entrance side — snappier blink cadence */}
      <FlickerLight
        position={[0, 3.0, 3.0]}
        color="#ffd890"
        bulbColor="#ffe0a0"
        baseIntensity={1.9}
        distance={22}
        phase={1.7}
        onDwell={[0.8, 3.0]}
        offDwell={[0.05, 0.2]}
      />
      {/* Third bulb in the back-left corner for the bigger room */}
      <FlickerLight
        position={[-5, 3.0, -3.5]}
        color="#e8c070"
        bulbColor="#ffd890"
        baseIntensity={1.4}
        distance={18}
        phase={3.2}
        onDwell={[1.0, 4.0]}
        offDwell={[0.06, 0.25]}
      />
      {/* Warm fill so the far corners never go pitch black */}
      <pointLight position={[-6, 2.2, 4]} color="#8a6030" intensity={0.45} distance={14} decay={1.8} />
      <pointLight position={[6, 2.2, 4]} color="#8a6030" intensity={0.35} distance={12} decay={1.8} />
      <pointLight position={[6, 2.2, -4]} color="#7a5020" intensity={0.3} distance={10} decay={1.8} />

      {/* Room structure */}
      <Room />

      {/* Furniture */}
      <Desk />
      <Chair />
      <FilingCabinet />
      <PsxCabinet />
      <Shelf />
      <WallBoard />
      <BarricadedDoor />

      {/* Props */}
      <OldComputer />
      <Mauser />
      <RayGun />
      <OldBook />
      <BluePen />

      {/* Blood decals */}
      <BloodyDragMark />
      <HelpBloodDecal />

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
        terminalOpen={terminalOpen}
        onLockChange={onLockChange}
        onTargetChange={onTargetChange}
        onPickDoc={onPickDoc}
        onInteract={onInteract}
        onControlsReady={onControlsReady}
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
  const [terminalOpen, setTerminalOpen] = useState(false);
  const controlsApiRef = useRef<{ lock: () => void } | null>(null);

  const handlePick = useCallback((doc: LabDocument) => {
    setFoundIds(prev => new Set(prev).add(doc.id));
    setViewingDoc(doc);
  }, []);

  const handleClose = useCallback(() => {
    setViewingDoc(null);
  }, []);

  const handleInteract = useCallback((type: string) => {
    if (type === 'computer') {
      setTerminalOpen(true);
    }
  }, []);

  const handleTerminalClose = useCallback(() => {
    setTerminalOpen(false);
    controlsApiRef.current?.lock();
  }, []);

  const paused = viewingDoc !== null || terminalOpen;
  const targetedDoc = targetedId && !targetedId.startsWith('@') ? docs.find(d => d.id === targetedId) : null;
  const targetedInteractable = targetedId?.startsWith('@') ? targetedId.slice(1) : null;

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', background: '#0a0806' }}>
      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, EYE_HEIGHT, 4], fov: 70, near: 0.1, far: 50 }}
        shadows
        style={{ width: '100%', height: '100%' }}
        gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.35 }}
      >
        <fog attach="fog" args={['#120d08', 10, 28]} />
        <LabScene
          docs={docs}
          targetedId={targetedId}
          paused={paused}
          terminalOpen={terminalOpen}
          onPickDoc={handlePick}
          onLockChange={setLocked}
          onTargetChange={setTargetedId}
          onInteract={handleInteract}
          onControlsReady={(controls) => {
            controlsApiRef.current = controls;
          }}
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
            background: (targetedDoc || targetedInteractable) ? '#e8c880' : 'rgba(232, 200, 128, 0.55)',
            boxShadow: (targetedDoc || targetedInteractable) ? '0 0 6px #e8c880' : 'none',
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

      {/* Computer interact prompt */}
      {locked && !paused && targetedInteractable === 'computer' && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(50% + 22px)',
            left: '50%',
            transform: 'translateX(-50%)',
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 11,
            letterSpacing: '0.18em',
            color: '#33cc33',
            textTransform: 'uppercase',
            pointerEvents: 'none',
            textShadow: '0 0 8px rgba(0,0,0,0.9)',
            whiteSpace: 'nowrap',
            zIndex: 4,
          }}
        >
          [ E ] Use terminal
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
            WASD · Move &nbsp; · &nbsp; Mouse · Look &nbsp; · &nbsp; E / F · Pick up &nbsp; · &nbsp; Esc · Pause
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

      {/* Terminal overlay */}
      {terminalOpen && <LabTerminal onClose={handleTerminalClose} />}
    </div>
  );
}
