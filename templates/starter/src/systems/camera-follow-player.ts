import { World } from 'koota';
import { IsCamera, IsPlayer, Transform } from '../traits';
import * as THREE from 'three';

// Camera configuration for space game feel
const CAMERA_CONFIG = {
	// Base offset from player (slightly above and behind)
	offset: new THREE.Vector3(0, 2, 8),
	// How far the camera looks ahead of the player's movement
	lookAheadDistance: 10,
	// How much the camera rotates with the player
	rotationInfluence: 0.7,
	// Damping factors for smooth transitions
	positionDamping: 0.05,
	rotationDamping: 0.08,
	// Limits for camera movement
	minDistance: 5,
	maxDistance: 12,
};

export const cameraFollowPlayer = (world: World) => {
	const player = world.queryFirst(IsPlayer, Transform);
	if (!player) return;

	const playerTransform = player.get(Transform)!;

	// Calculate the desired camera position
	const offsetRotated = CAMERA_CONFIG.offset.clone().applyEuler(
		new THREE.Euler(
			playerTransform.rotation.x * CAMERA_CONFIG.rotationInfluence,
			playerTransform.rotation.y * CAMERA_CONFIG.rotationInfluence,
			0 // Don't roll with the player
		)
	);

	world.query(IsCamera, Transform).updateEach(([cameraTransform]) => {
		// Calculate target position with look-ahead
		const playerForward = new THREE.Vector3(0, 0, -1)
			.applyEuler(playerTransform.rotation)
			.multiplyScalar(CAMERA_CONFIG.lookAheadDistance);

		const targetPosition = new THREE.Vector3().copy(playerTransform.position).add(offsetRotated);

		// Calculate look-at point (ahead of the player)
		const lookAtPoint = new THREE.Vector3().copy(playerTransform.position).add(playerForward);

		// Smoothly move camera position
		cameraTransform.position.lerp(targetPosition, CAMERA_CONFIG.positionDamping);

		// Calculate and apply camera rotation
		const targetRotation = new THREE.Quaternion().setFromRotationMatrix(
			new THREE.Matrix4().lookAt(cameraTransform.position, lookAtPoint, new THREE.Vector3(0, 1, 0))
		);

		// Apply smooth rotation using quaternion slerp
		const currentQuat = new THREE.Quaternion().setFromEuler(cameraTransform.rotation);
		currentQuat.slerp(targetRotation, CAMERA_CONFIG.rotationDamping);
		cameraTransform.rotation.setFromQuaternion(currentQuat);

		// Ensure camera stays within distance limits
		const distanceToPlayer = cameraTransform.position.distanceTo(playerTransform.position);
		if (distanceToPlayer < CAMERA_CONFIG.minDistance || distanceToPlayer > CAMERA_CONFIG.maxDistance) {
			const idealDistance = THREE.MathUtils.clamp(
				distanceToPlayer,
				CAMERA_CONFIG.minDistance,
				CAMERA_CONFIG.maxDistance
			);
			const direction = cameraTransform.position
				.clone()
				.sub(playerTransform.position)
				.normalize()
				.multiplyScalar(idealDistance);
			cameraTransform.position.copy(playerTransform.position).add(direction);
		}
	});
};
