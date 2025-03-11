import { useQueryFirst } from 'koota/react';
import { IsCamera, Ref, Transform } from '../traits';
import { PerspectiveCamera } from '@react-three/drei';
import { Entity } from 'koota';
import { ComponentRef, useCallback } from 'react';

function CameraView({ entity }: { entity: Entity }) {
  const setInitial = useCallback(
    (camera: ComponentRef<typeof PerspectiveCamera> | null) => {
      if (!camera) return;
      entity.add(Ref(camera));
    },
    [entity]
  );

  return <PerspectiveCamera ref={setInitial} makeDefault />;
}

export function CameraRenderer() {
  const camera = useQueryFirst(IsCamera, Transform);
  if (!camera) return null;
  return <CameraView entity={camera} />;
}
