import { World } from 'koota';
import { Transform, IsPlayer, Time } from '../traits';

export const updatePlayerRotation = (world: World) => {
	const { delta } = world.get(Time)!;

	world.query(IsPlayer, Transform).updateEach(([transform]) => {
		// Use delta for frame-independent rotation
		transform.rotation.y += delta * 0.5;
	});
};
