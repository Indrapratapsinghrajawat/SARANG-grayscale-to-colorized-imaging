import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";

// Orbiting body component
const OrbitalBody = ({ radius, speed, size, color, emissive }: {
  radius: number;
  speed: number;
  size: number;
  color: string;
  emissive: string;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const angle = useRef(Math.random() * Math.PI * 2);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    angle.current += speed * delta;
    meshRef.current.position.x = Math.cos(angle.current) * radius;
    meshRef.current.position.z = Math.sin(angle.current) * radius;
    meshRef.current.position.y = Math.sin(angle.current * 0.5) * radius * 0.15;
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[size, 16, 16]} />
      <meshStandardMaterial
        color={color}
        emissive={emissive}
        emissiveIntensity={0.8}
        transparent
        opacity={0.9}
      />
    </mesh>
  );
};

// Orbit ring
const OrbitRing = ({ radius }: { radius: number }) => {
  const points = useMemo(() => {
    const pts: [number, number, number][] = [];
    for (let i = 0; i <= 128; i++) {
      const a = (i / 128) * Math.PI * 2;
      pts.push([Math.cos(a) * radius, 0, Math.sin(a) * radius]);
    }
    return pts;
  }, [radius]);

  return (
    <Line points={points} color="#00ffff" transparent opacity={0.08} lineWidth={0.5} />
  );
};

// Particles
const Particles = ({ count = 300 }: { count?: number }) => {
  const ref = useRef<THREE.Points>(null);

  const [positions, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const r = 3 + Math.random() * 12;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.4;
      pos[i * 3 + 2] = r * Math.cos(phi);
      sz[i] = 0.5 + Math.random() * 1.5;
    }
    return [pos, sz];
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.02;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        color="#00ffff"
        size={0.04}
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

// Mouse parallax camera controller
const CameraController = () => {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  useFrame(() => {
    target.current.x += (mouse.current.x * 1.5 - target.current.x) * 0.02;
    target.current.y += (-mouse.current.y * 1 - target.current.y) * 0.02;
    camera.position.x = target.current.x;
    camera.position.y = target.current.y + 2;
    camera.lookAt(0, 0, 0);
  });

  return null;
};

// Core glowing sphere
const Core = () => {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const s = 1 + Math.sin(state.clock.elapsedTime * 1.5) * 0.05;
    ref.current.scale.setScalar(s);
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial
        color="#00ffff"
        emissive="#00ffff"
        emissiveIntensity={2}
        transparent
        opacity={0.9}
      />
    </mesh>
  );
};

const Scene = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
  });

  return (
    <>
      <CameraController />
      <ambientLight intensity={0.1} />
      <pointLight position={[0, 0, 0]} intensity={2} color="#00ffff" distance={20} />

      <group ref={groupRef}>
        <Core />
        
        <OrbitRing radius={2.5} />
        <OrbitRing radius={4.5} />
        <OrbitRing radius={7} />

        <OrbitalBody radius={2.5} speed={0.8} size={0.15} color="#00ffff" emissive="#00ffff" />
        <OrbitalBody radius={4.5} speed={0.5} size={0.2} color="#4488ff" emissive="#4488ff" />
        <OrbitalBody radius={7} speed={0.3} size={0.12} color="#cc9944" emissive="#cc9944" />
        <OrbitalBody radius={3.5} speed={-0.6} size={0.08} color="#00dddd" emissive="#00dddd" />
        <OrbitalBody radius={5.5} speed={0.4} size={0.1} color="#00aaff" emissive="#00aaff" />

        <Particles count={250} />
      </group>
    </>
  );
};

export const SolarSystem = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  // Check reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined' && 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) return null;

  return (
    <div className="absolute inset-0 z-0" style={{ opacity: 0.7 }}>
      <Canvas
        camera={{ position: [0, 2, 10], fov: 60 }}
        dpr={isMobile ? 1 : Math.min(window.devicePixelRatio, 1.5)}
        gl={{ antialias: !isMobile, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
      >
        <Scene />
      </Canvas>
    </div>
  );
};
