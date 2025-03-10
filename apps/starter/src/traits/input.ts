import { trait } from 'koota';
import * as THREE from 'three';

/**
 * Input trait for free-roam flight:
 * - forward: +1 (W) or 0 (none)
 * - strafe: +1 (D), -1 (A), or 0
 * - boost: true when Space is held
 * - brake: true when S is held
 * - mouseDelta: frame-by-frame mouse movement (x=Yaw, y=Pitch)
 * - roll: +1 (R), -1 (Q), or 0 for rolling the ship
 */
export const Input = trait({
	forward: 0,
	strafe: 0,
	boost: false,
	brake: false,
	roll: 0, // +1 for roll right (R), -1 for roll left (Q)
	mouseDelta: () => new THREE.Vector2(),
});

// export const Input = trait(() => new THREE.Vector2());
