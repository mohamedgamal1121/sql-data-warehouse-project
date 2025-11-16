import { Canvas } from '@react-three/fiber';
import { PointerLockControls, Stars } from '@react-three/drei';
import { Suspense } from 'react';
import Environment from '../components/3d/Environment';
import ProductShowroom from '../components/3d/ProductShowroom';

function LoadingScreen() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-forest-green to-leaf-green">
      <div className="text-center">
        <div className="text-6xl mb-4 animate-bounce">🌿</div>
        <div className="text-white text-xl font-display">Loading your botanical paradise...</div>
      </div>
    </div>
  );
}

export default function MainScene() {
  return (
    <div className="fixed inset-0">
      <Suspense fallback={<LoadingScreen />}>
        <Canvas
          shadows
          camera={{ position: [0, 2, 10], fov: 75 }}
          gl={{ antialias: true, alpha: false }}
        >
          {/* Background */}
          <color attach="background" args={['#87ceeb']} />
          <fog attach="fog" args={['#87ceeb', 10, 50]} />
          
          {/* Stars for atmosphere */}
          <Stars radius={100} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />
          
          {/* Environment and lighting */}
          <Environment />
          
          {/* Product showroom */}
          <ProductShowroom />
          
          {/* First-person controls */}
          <PointerLockControls
            selector="#instructions"
            makeDefault
          />
        </Canvas>
      </Suspense>

      {/* Instructions overlay for pointer lock */}
      <div
        id="instructions"
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm pointer-events-none"
        style={{ display: 'none' }}
      >
        <div className="glass-effect rounded-2xl p-8 text-center pointer-events-auto">
          <h3 className="text-2xl font-bold text-white mb-4">Click to Explore</h3>
          <p className="text-gray-200">
            Use WASD or Arrow keys to move around
            <br />
            Move your mouse to look around
            <br />
            Press ESC to exit
          </p>
        </div>
      </div>
    </div>
  );
}
