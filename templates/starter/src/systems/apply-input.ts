import { World } from 'koota';
import { Input, Movement, Time, Transform } from '../traits';
import * as THREE from 'three';

const MOUSE_SENSITIVITY = 0.005; // Reduced sensitivity to minimize direct rotation

/**
 * convertInputToMovement:
 * Applies mouse pitch & yaw, forward & strafe thrust,
 * brake damping, and optional boost factor.
 */
export function convertInputToMovement(world: World) {
	const { delta } = world.get(Time)!;

	world.query(Input, Transform, Movement).updateEach(([input, transform, movement]) => {
		const { velocity, thrust } = movement;

		transform.rotation.x -= input.mouseDelta.y * MOUSE_SENSITIVITY;
		transform.rotation.y -= input.mouseDelta.x * MOUSE_SENSITIVITY;

		// Apply roll based on Q/R keys
		const ROLL_SPEED = 3.0 * delta; // Adjust roll speed as needed
		if (input.roll !== 0) {
			transform.rotation.z += input.roll * ROLL_SPEED;
		}

		// (No clamp => full freedom to loop or look up/down as in No Man's Sky)

		// 2) Compute local directions
		const forwardDir = new THREE.Vector3(0, 0, -1).applyEuler(transform.rotation);
		const strafeDir = new THREE.Vector3(1, 0, 0).applyEuler(transform.rotation);

		// 3) Determine thrust force
		const boostFactor = input.boost ? 2 : 1;
		const thrustForce = thrust * delta * 100 * boostFactor;

		// Forward/back
		velocity.addScaledVector(forwardDir, input.forward * thrustForce);

		// Strafe left/right
		velocity.addScaledVector(strafeDir, input.strafe * thrustForce);

		// 4) Brake
		if (input.brake) {
			// Slight damping each frame if S is pressed
			velocity.multiplyScalar(0.98);
		}
	});
}
