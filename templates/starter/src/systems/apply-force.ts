import { World } from 'koota';
import { Movement } from '../traits';

export function applyForce(world: World) {
	world.query(Movement).updateEach(([{ force, velocity }]) => {
		velocity.add(force);

		// Damp force
		if (force.length() > 0.01) {
			force.multiplyScalar(1 - 0.1);
		} else {
			force.setScalar(0);
		}
	});
}
