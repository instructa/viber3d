import { World } from 'koota';
import { Movement, MaxSpeed } from '../traits';

export function limitSpeed(world: World) {
	// Query the relevant entities
	world.query(Movement, MaxSpeed).updateEach(([{ velocity }, { maxSpeed }]) => {
		velocity.clampLength(0, maxSpeed)
    });
}
