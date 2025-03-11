import { createActions } from 'koota';
import * as THREE from 'three';
import { IsPlayer, Transform, IsCamera } from './traits';

export const actions = createActions((world) => ({
	spawnPlayer: () => world.spawn(IsPlayer, Transform),
	spawnCamera: (position: [number, number, number]) => {
		return world.spawn(Transform({ position: new THREE.Vector3(...position) }), IsCamera);
	},
}));
