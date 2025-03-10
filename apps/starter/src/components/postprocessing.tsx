import { Bloom, EffectComposer, SMAA } from '@react-three/postprocessing';

export function PostProcessing() {
  return (
    <EffectComposer multisampling={1}>
      <Bloom
        luminanceThreshold={0.5}
        luminanceSmoothing={0.8}
        height={100}
        mipmapBlur
        intensity={0.4}
      />
      <SMAA />
    </EffectComposer>
  );
}
