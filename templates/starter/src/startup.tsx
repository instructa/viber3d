import { useFrame } from '@react-three/fiber';
import { useActions, useWorld } from 'koota/react';
import { useEffect } from 'react';
import { actions } from './actions';
import { updateSpatialHashing } from './systems/update-spatial-hashing';

export function Startup({
	initialCameraPosition = [0, 0, 50],
}: {
	initialCameraPosition?: [number, number, number];
}) {
	const { spawnPlayer, spawnCamera } = useActions(actions);
	const world = useWorld();

	useEffect(() => {
		// Spawn camera
		spawnCamera(initialCameraPosition);

		// Spawn player (without movement)
		const player = spawnPlayer();

		return () => {
			player.destroy();
		};
	}, [spawnPlayer, spawnCamera, initialCameraPosition]);

	useFrame(() => {
		updateSpatialHashing(world);
	});

	return null;
}
