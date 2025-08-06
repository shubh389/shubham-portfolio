import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Points,
  PointMaterial,
  Sphere,
  MeshDistortMaterial,
  OrbitControls,
  useTexture,
  Text3D,
  Center,
} from "@react-three/drei";
import { motion } from "framer-motion";
import * as THREE from "three";

// Animated Particles Component
function AnimatedParticles({ count = 5000 }) {
  const mesh = useRef<THREE.Points>(null);
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // Random positions in a sphere
      const radius = Math.random() * 20 + 5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      // Gradient colors from cyan to purple to pink
      const colorChoice = Math.random();
      if (colorChoice < 0.33) {
        colors[i * 3] = 0.02; // R - cyan
        colors[i * 3 + 1] = 0.71; // G
        colors[i * 3 + 2] = 0.83; // B
      } else if (colorChoice < 0.66) {
        colors[i * 3] = 0.54; // R - purple
        colors[i * 3 + 1] = 0.17; // G
        colors[i * 3 + 2] = 0.89; // B
      } else {
        colors[i * 3] = 0.92; // R - pink
        colors[i * 3 + 1] = 0.26; // G
        colors[i * 3 + 2] = 0.6; // B
      }
    }

    return [positions, colors];
  }, [count]);

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.2;
      mesh.current.rotation.y = state.clock.elapsedTime * 0.05;

      // Update positions for wave effect
      const positions = mesh.current.geometry.attributes.position
        .array as Float32Array;
      for (let i = 0; i < count; i++) {
        const wave = Math.sin(state.clock.elapsedTime * 2 + i * 0.01) * 0.1;
        positions[i * 3 + 1] += wave * 0.01;
      }
      mesh.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <Points ref={mesh} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        vertexColors
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-color"
          array={colors}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>
    </Points>
  );
}

// Floating 3D Model Component
function FloatingLaptop({ mouse }: { mouse: { x: number; y: number } }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current && groupRef.current) {
      // Floating animation
      meshRef.current.position.y =
        Math.sin(state.clock.elapsedTime * 0.8) * 0.3;

      // Mouse interaction
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        mouse.y * 0.3,
        0.1,
      );
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        mouse.x * 0.3,
        0.1,
      );

      // Auto rotation
      groupRef.current.rotation.z =
        Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={[2, 0, 0]}>
      <mesh ref={meshRef} scale={1.5}>
        {/* Laptop Base */}
        <boxGeometry args={[2, 0.1, 1.4]} />
        <MeshDistortMaterial
          color="#0a0a0a"
          transparent
          opacity={0.8}
          distort={0.1}
          speed={2}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>

      {/* Laptop Screen */}
      <mesh position={[0, 0.55, -0.5]} rotation={[-0.2, 0, 0]} scale={1.5}>
        <boxGeometry args={[1.8, 1.2, 0.05]} />
        <MeshDistortMaterial
          color="#000010"
          transparent
          opacity={0.9}
          distort={0.05}
          speed={1}
          emissive="#001122"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Screen Glow */}
      <mesh position={[0, 0.55, -0.48]} rotation={[-0.2, 0, 0]} scale={1.5}>
        <boxGeometry args={[1.6, 1.0, 0.01]} />
        <meshBasicMaterial
          color="#00ffff"
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Floating Elements around laptop */}
      <mesh position={[-1.5, 1, 0.5]} scale={0.3}>
        <octahedronGeometry />
        <MeshDistortMaterial
          color="#8b5cf6"
          transparent
          opacity={0.7}
          distort={0.3}
          speed={3}
          emissive="#8b5cf6"
          emissiveIntensity={0.2}
        />
      </mesh>

      <mesh position={[1.8, -0.5, 1]} scale={0.2}>
        <icosahedronGeometry />
        <MeshDistortMaterial
          color="#ec4899"
          transparent
          opacity={0.6}
          distort={0.4}
          speed={2.5}
          emissive="#ec4899"
          emissiveIntensity={0.3}
        />
      </mesh>
    </group>
  );
}

// Animated Waves Component
function AnimatedWaves() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const positions = meshRef.current.geometry.attributes.position
        .array as Float32Array;
      const time = state.clock.elapsedTime;

      for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i];
        const z = positions[i + 2];
        positions[i + 1] =
          Math.sin(x * 0.5 + time) * Math.cos(z * 0.5 + time) * 0.5;
      }

      meshRef.current.geometry.attributes.position.needsUpdate = true;
      meshRef.current.geometry.computeVertexNormals();
    }
  });

  return (
    <mesh ref={meshRef} position={[0, -3, -5]} rotation={[-Math.PI / 3, 0, 0]}>
      <planeGeometry args={[20, 20, 50, 50]} />
      <MeshDistortMaterial
        color="#0a0a0a"
        transparent
        opacity={0.4}
        wireframe
        distort={0.1}
        speed={1}
      />
    </mesh>
  );
}

// Mouse tracking hook
function useMousePosition() {
  const { camera, gl } = useThree();
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    gl.domElement.addEventListener("mousemove", handleMouseMove);
    return () =>
      gl.domElement.removeEventListener("mousemove", handleMouseMove);
  }, [gl]);

  return mouse.current;
}

// Lighting setup
function Lighting() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00ffff" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
      <spotLight
        position={[0, 20, 0]}
        angle={0.3}
        penumbra={1}
        intensity={0.5}
        color="#ec4899"
        castShadow
      />
    </>
  );
}

// Main scene component
function Scene() {
  const mouse = useMousePosition();

  return (
    <>
      <Lighting />
      <AnimatedParticles count={3000} />
      <FloatingLaptop mouse={mouse} />
      <AnimatedWaves />

      {/* Background sphere with gradient */}
      <Sphere args={[50]} position={[0, 0, -30]}>
        <meshBasicMaterial
          color="#000005"
          transparent
          opacity={0.3}
          side={THREE.BackSide}
        />
      </Sphere>
    </>
  );
}

// Main Three.js Canvas Component
export function ThreeScene() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 75 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
