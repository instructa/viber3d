import { World } from 'koota';
import { Input, IsPlayer } from '../traits';

// We'll keep a simple in-memory state of the keys and mouse movement.
const state = {
	forward: 0, // +1 when W is down
	strafe: 0, // +1 when D is down, -1 when A is down
	brake: false, // true when S is down
	boost: false, // true when SPACE is down
	roll: 0, // +1 when R is down, -1 when Q is down
	mouseDeltaX: 0,
	mouseDeltaY: 0,
	pointerLocked: false,
};

// Function to request pointer lock
const requestPointerLock = () => {
	const canvas = document.querySelector('canvas');
	if (canvas && !state.pointerLocked) {
		canvas.requestPointerLock =
			canvas.requestPointerLock ||
			(canvas as any).mozRequestPointerLock ||
			(canvas as any).webkitRequestPointerLock;

		canvas.requestPointerLock();
	}
};

// Function to handle pointer lock change
const handlePointerLockChange = () => {
	state.pointerLocked =
		document.pointerLockElement === document.querySelector('canvas') ||
		(document as any).mozPointerLockElement === document.querySelector('canvas') ||
		(document as any).webkitPointerLockElement === document.querySelector('canvas');
};

// Set up pointer lock event listeners
document.addEventListener('pointerlockchange', handlePointerLockChange);
document.addEventListener('mozpointerlockchange', handlePointerLockChange);
document.addEventListener('webkitpointerlockchange', handlePointerLockChange);

// Listen for key presses
window.addEventListener('keydown', (e) => {
	switch (e.key.toLowerCase()) {
		case 'w':
		case 'arrowup':
			state.forward = 1;
			break;
		case 's':
		case 'arrowdown':
			state.brake = true;
			break;
		case 'a':
		case 'arrowleft':
			state.strafe = -1;
			break;
		case 'd':
		case 'arrowright':
			state.strafe = 1;
			break;
		case ' ':
			state.boost = true;
			break;
		case 'q':
			state.roll = -1; // Roll left
			break;
		case 'r':
			state.roll = 1; // Roll right
			break;
	}

	// Request pointer lock on any key press if not already locked
	requestPointerLock();
});

// Listen for mouse clicks to request pointer lock
window.addEventListener('click', () => {
	requestPointerLock();
});

window.addEventListener('keyup', (e) => {
	switch (e.key.toLowerCase()) {
		case 'w':
		case 'arrowup':
			state.forward = 0;
			break;
		case 's':
		case 'arrowdown':
			state.brake = false;
			break;
		case 'a':
		case 'arrowleft':
			state.strafe = 0;
			break;
		case 'd':
		case 'arrowright':
			state.strafe = 0;
			break;
		case ' ':
			state.boost = false;
			break;
		case 'q':
			if (state.roll === -1) state.roll = 0; // Only reset if this key caused the roll
			break;
		case 'r':
			if (state.roll === 1) state.roll = 0; // Only reset if this key caused the roll
			break;
	}
});

// Listen for mouse movement
window.addEventListener('mousemove', (e) => {
	// Only accumulate movement deltas if pointer is locked
	if (state.pointerLocked) {
		// Accumulate movement deltas
		state.mouseDeltaX += e.movementX;
		state.mouseDeltaY += e.movementY;
	}
});

/**
 * pollInput system:
 * Pushes our key/mouse state into each player entity's Input component.
 */
export function pollInput(world: World) {
	world.query(IsPlayer, Input).updateEach(([input]) => {
		// Transfer keyboard/boost/brake state
		input.forward = state.forward;
		input.strafe = state.strafe;
		input.boost = state.boost;
		input.brake = state.brake;
		input.roll = state.roll;
		// Copy mouse delta
		input.mouseDelta.set(state.mouseDeltaX, state.mouseDeltaY);
	});

	// Reset the mouse delta after we've used it this frame
	state.mouseDeltaX = 0;
	state.mouseDeltaY = 0;
}
