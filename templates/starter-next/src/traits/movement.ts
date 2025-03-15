import { trait } from 'koota';
import * as THREE from 'three';

export const Movement = trait({
	velocity: () => new THREE.Vector3(),
	thrust: 1,
	damping: 0.95,
	force: () => new THREE.Vector3(),
});
