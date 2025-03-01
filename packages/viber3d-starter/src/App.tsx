import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import GameScene from './components/GameScene';
import './styles.css';

export default function App() {
  return (
    <Canvas
      gl={{
        antialias: false,
        toneMapping: 3, // ACESFilmicToneMapping
        outputColorSpace: 'srgb', // Modern replacement for outputEncoding
      }}
      style={{
        background: '#eee',
      }}
    >
      <Suspense fallback={null}>
        <GameScene />
      </Suspense>
    </Canvas>
  );
}
