import { useRef, useMemo } from "react";
import { Canvas, useFrame, extend } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import * as THREE from "three";

// Custom shader material for dynamic wave background
const WaveShaderMaterial = shaderMaterial(
  // Uniforms
  {
    uTime: 0,
    uMouse: new THREE.Vector2(0, 0),
    uResolution: new THREE.Vector2(1, 1),
    uColor1: new THREE.Color("#06b6d4"),
    uColor2: new THREE.Color("#8b5cf6"),
    uColor3: new THREE.Color("#ec4899"),
  },
  // Vertex shader
  `
    varying vec2 vUv;
    varying vec3 vPosition;
    uniform float uTime;
    uniform vec2 uMouse;
    
    void main() {
      vUv = uv;
      vPosition = position;
      
      vec3 pos = position;
      float wave1 = sin(pos.x * 0.5 + uTime * 0.8) * 0.1;
      float wave2 = cos(pos.y * 0.3 + uTime * 0.6) * 0.1;
      float wave3 = sin(pos.x * 0.8 + pos.y * 0.4 + uTime * 1.2) * 0.05;
      
      pos.z += wave1 + wave2 + wave3;
      
      // Mouse interaction
      float mouseInfluence = distance(pos.xy, uMouse * 10.0);
      pos.z += sin(mouseInfluence * 0.5 + uTime * 2.0) * 0.2 * exp(-mouseInfluence * 0.1);
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  // Fragment shader
  `
    varying vec2 vUv;
    varying vec3 vPosition;
    uniform float uTime;
    uniform vec2 uMouse;
    uniform vec2 uResolution;
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    uniform vec3 uColor3;
    
    void main() {
      vec2 uv = vUv;
      vec2 center = vec2(0.5);
      
      // Dynamic gradient based on position and time
      float dist = distance(uv, center);
      float angle = atan(uv.y - center.y, uv.x - center.x);
      
      // Animated color mixing
      float colorMix1 = sin(dist * 10.0 - uTime * 2.0) * 0.5 + 0.5;
      float colorMix2 = cos(angle * 3.0 + uTime * 1.5) * 0.5 + 0.5;
      float colorMix3 = sin(uv.x * 5.0 + uv.y * 3.0 + uTime * 0.8) * 0.5 + 0.5;
      
      // Mouse interaction effect
      vec2 mousePos = uMouse;
      float mouseDist = distance(uv, mousePos);
      float mouseEffect = exp(-mouseDist * 8.0) * sin(uTime * 4.0) * 0.3;
      
      // Color interpolation
      vec3 color = mix(uColor1, uColor2, colorMix1);
      color = mix(color, uColor3, colorMix2);
      color += mouseEffect;
      
      // Add some noise
      float noise = sin(uv.x * 100.0) * cos(uv.y * 100.0) * 0.02;
      color += noise;
      
      // Fade edges
      float vignette = 1.0 - dist * 1.2;
      color *= vignette;
      
      gl_FragColor = vec4(color, 0.6);
    }
  `,
);

// Extend Three.js to include our custom material
extend({ WaveShaderMaterial });

function AnimatedShaderPlane({ mouse }: { mouse: { x: number; y: number } }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<any>(null);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uTime = state.clock.elapsedTime;
      materialRef.current.uMouse.set(mouse.x, mouse.y);
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -5]} scale={[20, 15, 1]}>
      <planeGeometry args={[1, 1, 64, 64]} />
      <waveShaderMaterial
        ref={materialRef}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

export function ShaderBackground() {
  const mouse = useRef({ x: 0, y: 0 });

  const handleMouseMove = (event: MouseEvent) => {
    mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
  };

  return (
    <div className="absolute inset-0 -z-20">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        onCreated={({ gl }) => {
          gl.domElement.addEventListener("mousemove", handleMouseMove);
        }}
      >
        <AnimatedShaderPlane mouse={mouse.current} />
      </Canvas>
    </div>
  );
}
