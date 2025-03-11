import { createWorld } from 'koota';
import { SpatialHashMap, Time } from './traits';

export const world = createWorld(Time, SpatialHashMap);
