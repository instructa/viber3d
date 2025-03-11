import { trait } from 'koota';
import * as THREE from 'three';

// A transform just like CSS!
export const Transform = trait({
  position: () => new THREE.Vector3(),
  rotation: () => new THREE.Euler(),
  scale: () => new THREE.Vector3(1, 1, 1),
});
