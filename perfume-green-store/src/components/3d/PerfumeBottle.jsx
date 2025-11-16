import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

export default function PerfumeBottle({ product, position, onClick }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [rotation, setRotation] = useState(0);

  useFrame((state, delta) => {
    if (hovered) {
      setRotation(prev => prev + delta * 2);
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    } else {
      meshRef.current.position.y = THREE.MathUtils.lerp(
        meshRef.current.position.y,
        position[1],
        0.1
      );
    }
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      hovered ? rotation : 0,
      0.1
    );
  });

  return (
    <group position={position}>
      {/* Bottle body */}
      <mesh
        ref={meshRef}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <cylinderGeometry args={[0.3, 0.25, 1.2, 32]} />
        <meshPhysicalMaterial
          color={product.color}
          transparent
          opacity={0.6}
          roughness={0.1}
          metalness={0.1}
          transmission={0.9}
          thickness={0.5}
          envMapIntensity={1}
        />
      </mesh>

      {/* Bottle cap */}
      <mesh position={[0, 0.7, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 0.2, 32]} />
        <meshStandardMaterial color="#8b7355" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Liquid inside */}
      <mesh position={[0, -0.1, 0]}>
        <cylinderGeometry args={[0.28, 0.23, 1.0, 32]} />
        <meshStandardMaterial
          color={product.color}
          transparent
          opacity={0.8}
          emissive={product.color}
          emissiveIntensity={hovered ? 0.3 : 0.1}
        />
      </mesh>

      {/* Glow effect when hovered */}
      {hovered && (
        <pointLight
          position={[0, 0, 0]}
          intensity={2}
          distance={3}
          color={product.color}
        />
      )}

      {/* Product name label */}
      <Text
        position={[0, -0.8, 0]}
        fontSize={0.12}
        color="#2d5016"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#ffffff"
      >
        {product.name}
      </Text>

      {/* Price label */}
      <Text
        position={[0, -1.0, 0]}
        fontSize={0.1}
        color="#4a7c2f"
        anchorX="center"
        anchorY="middle"
      >
        ${product.price}
      </Text>

      {/* Eco badge */}
      {product.eco_certified && (
        <mesh position={[0.4, 0.3, 0]}>
          <circleGeometry args={[0.1, 32]} />
          <meshBasicMaterial color="#7fb069" />
        </mesh>
      )}
    </group>
  );
}
