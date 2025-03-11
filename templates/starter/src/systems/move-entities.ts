import { World } from 'koota';
import { Transform, Movement, Time } from '../traits';

export function moveEntities(world: World) {
	// Get the delta time from the world clock
	const { delta } = world.get(Time)!;

	// Query the relevant entities
	const results = world.query(Transform, Movement);

	// Update the data of each entity
	results.updateEach(([{ position }, { velocity, damping }]) => {
		// Move the position by the velocity for a slice of time
		position.x += velocity.x * delta;
		position.y += velocity.y * delta;
		position.z += velocity.z * delta;

		// Damp the velocity
		velocity.multiplyScalar(damping);
	});
}
