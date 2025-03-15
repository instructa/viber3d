import { Entity } from 'koota';
import * as THREE from 'three';
import { Transform } from '../traits';

export const sortEntitiesByDistance = (position: THREE.Vector3, entities: Entity[]) => {
	return [...entities].sort((a, b) => {
		const transformA = a.get(Transform);
		const transformB = b.get(Transform);

		if (!transformA || !transformB) return 0;

		const distanceA = position.distanceTo(transformA.position);
		const distanceB = position.distanceTo(transformB.position);

		return distanceA - distanceB;
	});
};
