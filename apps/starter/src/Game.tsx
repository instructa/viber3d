import { Canvas } from '@react-three/fiber';
import { CameraRenderer } from './components/camera-renderer';
import { PlayerRenderer } from './components/player-renderer';
import { GameLoop } from './gameloop';
import { Startup } from './startup';
import { Color } from 'three';

export function Game() {
	return (
		<>
			<Canvas style={{ background: 'white' }} shadows={false} gl={{ alpha: false }}>
				<color attach="background" args={[new Color('#ffffff')]} />
				<Startup initialCameraPosition={[0, 0, 10]} />
				<GameLoop />

				<CameraRenderer />
				<PlayerRenderer />

				<ambientLight intensity={1.02} />
				<directionalLight position={[10.41789, -5.97702, 10]} intensity={2.98} color={'#c31829'} />
				<directionalLight position={[10.55754, 5.89323, 9.99894]} intensity={4.88} color={'#ffffff'} />
			</Canvas>
		</>
	);
}
