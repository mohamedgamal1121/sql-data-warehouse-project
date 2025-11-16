import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sky, Cloud } from '@react-three/drei';
import * as THREE from 'three';

// Ground with grass texture
export function Ground() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial color="#4a7c2f" roughness={0.8} />
    </mesh>
  );
}

// Animated trees
export function Tree({ position }) {
  const treeRef = useRef();
  
  useFrame((state) => {
    if (treeRef.current) {
      treeRef.current.rotation.z = Math.sin(state.clock.elapsedTime + position[0]) * 0.05;
    }
  });

  return (
    <group position={position} ref={treeRef}>
      {/* Trunk */}
      <mesh position={[0, 1, 0]} castShadow>
        <cylinderGeometry args={[0.3, 0.4, 2, 8]} />
        <meshStandardMaterial color="#5d4037" roughness={0.9} />
      </mesh>
      
      {/* Foliage - multiple layers */}
      <mesh position={[0, 3, 0]} castShadow>
        <coneGeometry args={[1.5, 2, 8]} />
        <meshStandardMaterial color="#2d5016" roughness={0.7} />
      </mesh>
      <mesh position={[0, 4, 0]} castShadow>
        <coneGeometry args={[1.2, 1.5, 8]} />
        <meshStandardMaterial color="#4a7c2f" roughness={0.7} />
      </mesh>
      <mesh position={[0, 5, 0]} castShadow>
        <coneGeometry args={[0.8, 1, 8]} />
        <meshStandardMaterial color="#7fb069" roughness={0.7} />
      </mesh>
    </group>
  );
}

// Floating particles
export function Particles({ count = 100 }) {
  const particlesRef = useRef();
  
  const particles = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    particles[i * 3] = (Math.random() - 0.5) * 50;
    particles[i * 3 + 1] = Math.random() * 10;
    particles[i * 3 + 2] = (Math.random() - 0.5) * 50;
  }

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      
      const positions = particlesRef.current.geometry.attributes.position.array;
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        positions[i3 + 1] += Math.sin(state.clock.elapsedTime + i) * 0.001;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#7fb069"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

// Animated butterfly
export function Butterfly({ position }) {
  const butterflyRef = useRef();
  const wingLeftRef = useRef();
  const wingRightRef = useRef();

  useFrame((state) => {
    if (butterflyRef.current) {
      const t = state.clock.elapsedTime;
      butterflyRef.current.position.x = position[0] + Math.sin(t * 0.5) * 3;
      butterflyRef.current.position.y = position[1] + Math.sin(t * 2) * 0.5;
      butterflyRef.current.position.z = position[2] + Math.cos(t * 0.5) * 3;
      
      // Wing flapping
      if (wingLeftRef.current && wingRightRef.current) {
        const flap = Math.sin(t * 10) * 0.5;
        wingLeftRef.current.rotation.y = -flap;
        wingRightRef.current.rotation.y = flap;
      }
    }
  });

  return (
    <group ref={butterflyRef} position={position}>
      {/* Body */}
      <mesh>
        <cylinderGeometry args={[0.02, 0.02, 0.2, 8]} />
        <meshStandardMaterial color="#2d5016" />
      </mesh>
      
      {/* Left wing */}
      <mesh ref={wingLeftRef} position={[-0.1, 0, 0]}>
        <circleGeometry args={[0.15, 16]} />
        <meshStandardMaterial color="#ffa500" side={THREE.DoubleSide} />
      </mesh>
      
      {/* Right wing */}
      <mesh ref={wingRightRef} position={[0.1, 0, 0]}>
        <circleGeometry args={[0.15, 16]} />
        <meshStandardMaterial color="#ffa500" side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

// Flower
export function Flower({ position }) {
  return (
    <group position={position}>
      {/* Stem */}
      <mesh position={[0, 0.3, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.6, 8]} />
        <meshStandardMaterial color="#4a7c2f" />
      </mesh>
      
      {/* Petals */}
      {[0, 1, 2, 3, 4].map((i) => (
        <mesh
          key={i}
          position={[
            Math.cos((i / 5) * Math.PI * 2) * 0.1,
            0.6,
            Math.sin((i / 5) * Math.PI * 2) * 0.1
          ]}
          rotation={[Math.PI / 2, 0, (i / 5) * Math.PI * 2]}
        >
          <circleGeometry args={[0.08, 16]} />
          <meshStandardMaterial color="#ff6b9d" side={THREE.DoubleSide} />
        </mesh>
      ))}
      
      {/* Center */}
      <mesh position={[0, 0.6, 0]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial color="#ffa500" />
      </mesh>
    </group>
  );
}

// Product display pedestal
export function Pedestal({ position, children }) {
  return (
    <group position={position}>
      {/* Base */}
      <mesh position={[0, -0.5, 0]} castShadow>
        <cylinderGeometry args={[0.6, 0.7, 0.2, 32]} />
        <meshStandardMaterial color="#8b7355" metalness={0.3} roughness={0.7} />
      </mesh>
      
      {/* Column */}
      <mesh position={[0, 0, 0]} castShadow>
        <cylinderGeometry args={[0.4, 0.5, 1, 32]} />
        <meshStandardMaterial color="#a8c686" roughness={0.6} />
      </mesh>
      
      {/* Top platform */}
      <mesh position={[0, 0.6, 0]} castShadow>
        <cylinderGeometry args={[0.5, 0.4, 0.2, 32]} />
        <meshStandardMaterial color="#8b7355" metalness={0.3} roughness={0.7} />
      </mesh>
      
      {/* Decorative vines */}
      <mesh position={[0.4, 0, 0]}>
        <torusGeometry args={[0.1, 0.02, 8, 32]} />
        <meshStandardMaterial color="#4a7c2f" />
      </mesh>
      
      {children}
    </group>
  );
}

export default function Environment() {
  return (
    <>
      <Sky sunPosition={[100, 20, 100]} />
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight position={[0, 5, 0]} intensity={0.5} color="#7fb069" />
      
      <Ground />
      <Particles count={150} />
      
      {/* Trees around the scene */}
      <Tree position={[-10, 0, -10]} />
      <Tree position={[10, 0, -10]} />
      <Tree position={[-10, 0, 10]} />
      <Tree position={[10, 0, 10]} />
      <Tree position={[-15, 0, 0]} />
      <Tree position={[15, 0, 0]} />
      
      {/* Butterflies */}
      <Butterfly position={[5, 3, 5]} />
      <Butterfly position={[-5, 4, -5]} />
      <Butterfly position={[0, 3, -8]} />
      
      {/* Flowers scattered around */}
      <Flower position={[-3, -1.4, 2]} />
      <Flower position={[4, -1.4, -3]} />
      <Flower position={[-5, -1.4, -4]} />
      <Flower position={[6, -1.4, 3]} />
      <Flower position={[2, -1.4, 5]} />
      
      <Cloud position={[-10, 8, -10]} speed={0.2} opacity={0.3} />
      <Cloud position={[10, 9, -15]} speed={0.3} opacity={0.3} />
    </>
  );
}
