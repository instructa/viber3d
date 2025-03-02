import { Physics } from '@react-three/rapier';
import { Stats, useGLTF, OrbitControls } from '@react-three/drei';
import SpaceFighter from './components/SpaceFighter';
import { useControls } from 'leva';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';

useGLTF.preload('/models/ship.gltf');

const GameScene = () => {
  const { intensity } = useControls('Environment', {
    intensity: {
      value: 0.4,
      min: 0,
      max: 2,
      step: 0.1,
    },
  });

  const { rotationX, rotationY, rotationZ } = useControls('Ship Rotation', {
    rotationX: { value: 0, min: -Math.PI, max: Math.PI, step: 0.01 },
    rotationY: { value: 0, min: -Math.PI, max: Math.PI, step: 0.01 },
    rotationZ: { value: 0, min: -Math.PI, max: Math.PI, step: 0.01 },
  });

  return (
    <>
     <Canvas
      gl={{
        antialias: false
      }}
    >
      <ambientLight intensity={intensity} />
      <Physics debug timeStep="vary" gravity={[0, 0, 0]}>
        <Suspense fallback={null}>
          <SpaceFighter rotation={[rotationX, rotationY, rotationZ]} />
        </Suspense>
      </Physics>
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        makeDefault
      />
      <Stats />
      </Canvas>
    </>
  );
};

export default GameScene;
