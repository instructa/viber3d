import { Physics } from '@react-three/rapier';
import { Stats, useGLTF, Environment, OrbitControls } from '@react-three/drei';
import SpaceFighter from './SpaceFighter';
import { useControls } from 'leva';

// Preload ship model to avoid loading during gameplay
useGLTF.preload('/models/ship.gltf');

// Define the environment preset type
type EnvironmentPreset = 'sunset' | 'night';

const GameScene = () => {
  // Environment presets available in drei
  const environmentPresets: EnvironmentPreset[] = ['sunset', 'night'];

  // Leva controls for environment
  const { preset, intensity } = useControls('Environment', {
    preset: {
      value: 'sunset' as EnvironmentPreset,
      options: environmentPresets,
    },
    intensity: {
      value: 0.4,
      min: 0,
      max: 2,
      step: 0.1,
    },
  });

  // Ship rotation controls
  const { rotationX, rotationY, rotationZ } = useControls('Ship Rotation', {
    rotationX: { value: 0, min: -Math.PI, max: Math.PI, step: 0.01 },
    rotationY: { value: 0, min: -Math.PI, max: Math.PI, step: 0.01 },
    rotationZ: { value: 0, min: -Math.PI, max: Math.PI, step: 0.01 },
  });

  return (
    <>
      <Environment preset={preset} />
      <ambientLight intensity={intensity} />
      <Physics debug timeStep="vary" gravity={[0, 0, 0]}>
        <SpaceFighter rotation={[rotationX, rotationY, rotationZ]} />
      </Physics>
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        makeDefault
      />
      <Stats />
    </>
  );
};

export default GameScene;
