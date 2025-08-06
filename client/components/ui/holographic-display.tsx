import { useRef, useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, MeshDistortMaterial, Sphere, Ring } from "@react-three/drei";
import * as THREE from "three";

interface HolographicDisplayProps {
  isVisible: boolean;
  mouse: { x: number; y: number };
}

function HolographicSphere({ mouse }: { mouse: { x: number; y: number } }) {
  const sphereRef = useRef<THREE.Mesh>(null);
  const ringsRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      sphereRef.current.rotation.y = state.clock.elapsedTime * 0.3;

      // Mouse interaction
      sphereRef.current.position.x = THREE.MathUtils.lerp(
        sphereRef.current.position.x,
        mouse.x * 0.5,
        0.1,
      );
      sphereRef.current.position.y = THREE.MathUtils.lerp(
        sphereRef.current.position.y,
        mouse.y * 0.3,
        0.1,
      );
    }

    if (ringsRef.current) {
      ringsRef.current.rotation.x = state.clock.elapsedTime * 0.5;
      ringsRef.current.rotation.z = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <group position={[3, 0, 0]}>
      {/* Central holographic sphere */}
      <Sphere ref={sphereRef} args={[0.8]} scale={1.2}>
        <MeshDistortMaterial
          color="#00ffff"
          transparent
          opacity={0.6}
          distort={0.4}
          speed={2}
          roughness={0}
          metalness={0.8}
          emissive="#003344"
          emissiveIntensity={0.3}
        />
      </Sphere>

      {/* Orbiting rings */}
      <group ref={ringsRef}>
        <Ring args={[1.5, 1.6, 32]} rotation={[Math.PI / 2, 0, 0]}>
          <meshBasicMaterial
            color="#00ffff"
            transparent
            opacity={0.4}
            side={THREE.DoubleSide}
          />
        </Ring>
        <Ring args={[2, 2.1, 32]} rotation={[0, Math.PI / 4, 0]}>
          <meshBasicMaterial
            color="#8b5cf6"
            transparent
            opacity={0.3}
            side={THREE.DoubleSide}
          />
        </Ring>
        <Ring args={[2.5, 2.6, 32]} rotation={[Math.PI / 3, 0, Math.PI / 6]}>
          <meshBasicMaterial
            color="#ec4899"
            transparent
            opacity={0.2}
            side={THREE.DoubleSide}
          />
        </Ring>
      </group>

      {/* Floating data points */}
      {[...Array(8)].map((_, i) => (
        <Sphere
          key={i}
          args={[0.05]}
          position={[
            Math.cos((i / 8) * Math.PI * 2) * 3,
            Math.sin((i / 8) * Math.PI * 2) * 3,
            Math.sin(i) * 2,
          ]}
        >
          <meshBasicMaterial
            color={
              i % 3 === 0 ? "#00ffff" : i % 3 === 1 ? "#8b5cf6" : "#ec4899"
            }
            transparent
            opacity={0.8}
          />
        </Sphere>
      ))}

      {/* Holographic text */}
      <Text
        position={[0, -3, 0]}
        fontSize={0.3}
        color="#00ffff"
        anchorX="center"
        anchorY="middle"
        font="/fonts/inter-bold.woff"
      >
        FULL STACK
      </Text>
      <Text
        position={[0, -3.5, 0]}
        fontSize={0.2}
        color="#8b5cf6"
        anchorX="center"
        anchorY="middle"
        font="/fonts/inter-bold.woff"
      >
        DEVELOPER
      </Text>
    </group>
  );
}

function HolographicCode() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y =
        Math.sin(state.clock.elapsedTime * 0.6) * 0.2;
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  const codeLines = [
    "const developer = {",
    "  name: 'Shubham',",
    "  skills: ['React', 'Node.js'],",
    "  passion: 'Building the future'",
    "}",
  ];

  return (
    <group ref={groupRef} position={[-4, 1, -1]}>
      {codeLines.map((line, i) => (
        <Text
          key={i}
          position={[0, -i * 0.3, 0]}
          fontSize={0.15}
          color="#00ff88"
          anchorX="left"
          anchorY="middle"
          font="/fonts/fira-code.woff"
        >
          {line}
        </Text>
      ))}

      {/* Code container */}
      <mesh position={[1.5, -0.6, -0.1]} scale={[3, 1.8, 0.1]}>
        <boxGeometry />
        <meshBasicMaterial
          color="#001122"
          transparent
          opacity={0.3}
          wireframe
        />
      </mesh>
    </group>
  );
}

export function HolographicDisplay({
  isVisible,
  mouse,
}: HolographicDisplayProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !isVisible) return null;

  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 75 }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#00ffff" />
        <pointLight
          position={[-10, -10, -10]}
          intensity={0.3}
          color="#8b5cf6"
        />

        <HolographicSphere mouse={mouse} />
        <HolographicCode />
      </Canvas>
    </div>
  );
}

// Holographic UI overlay component
export function HolographicUI() {
  const [isActive, setIsActive] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsActive(true);
      controls.start({
        opacity: 1,
        scale: 1,
        transition: { duration: 1.5, ease: "easeOut" },
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, [controls]);

  const dataPoints = [
    { label: "REACT", value: "95%", color: "#00ffff" },
    { label: "NODE.JS", value: "90%", color: "#8b5cf6" },
    { label: "BLOCKCHAIN", value: "85%", color: "#ec4899" },
    { label: "AI/ML", value: "80%", color: "#00ff88" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={controls}
      className="absolute top-20 right-10 pointer-events-none z-20"
    >
      <div className="relative">
        {/* Holographic border effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-lg blur-sm" />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-xl rounded-lg border border-cyan-500/30" />

        {/* Content */}
        <div className="relative p-6 space-y-4">
          <div className="text-cyan-400 text-sm font-mono uppercase tracking-wider">
            ▸ SYSTEM STATUS
          </div>

          {dataPoints.map((point, i) => (
            <motion.div
              key={point.label}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2.5 + i * 0.2 }}
              className="flex items-center justify-between space-x-4"
            >
              <span className="text-white/80 text-xs font-mono">
                {point.label}
              </span>
              <div className="flex items-center space-x-2">
                <div className="w-16 h-1 bg-white/20 rounded">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: point.value }}
                    transition={{ delay: 3 + i * 0.2, duration: 1 }}
                    className="h-full rounded"
                    style={{ backgroundColor: point.color }}
                  />
                </div>
                <span
                  className="text-xs font-mono"
                  style={{ color: point.color }}
                >
                  {point.value}
                </span>
              </div>
            </motion.div>
          ))}

          {/* Animated cursor */}
          <motion.div
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="w-2 h-4 bg-cyan-400"
          />
        </div>
      </div>
    </motion.div>
  );
}
