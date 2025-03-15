import { createRemoved, World } from 'koota';
import { SpatialHashMap, Transform } from '../traits';

const Removed = createRemoved();

export const updateSpatialHashing = (world: World) => {
  const spatialHashMap = world.get(SpatialHashMap);

  // Add entities to the spatial hash map
  world.query(Transform).updateEach(([{ position }], entity) => {
    spatialHashMap!.setEntity(entity, position.x, position.y, position.z);
  });

  // Remove entities from the spatial hash map
  world.query(Removed(Transform)).forEach((entity) => {
    spatialHashMap!.removeEntity(entity);
  });
};
