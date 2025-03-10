import { useFrame } from '@react-three/fiber';
import { useWorld } from 'koota/react';
import { syncView } from './systems/sync-view';
import { updateTime } from './systems/update-time';
import { updatePlayerRotation } from './systems/update-player-rotation';

export function GameLoop() {
	const world = useWorld();

	useFrame(() => {
		// Start
		updateTime(world);

		// Update game state
		updatePlayerRotation(world);

		// Sync view state
		syncView(world);
	});

	return null;
}
