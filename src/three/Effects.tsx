import {
  EffectComposer,
  Bloom,
  Vignette,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

/**
 * Restrained cinematic post: a little bloom on the amber/teal highlights and a
 * vignette to darken the edges and focus center. Over-bloomed reads cheap, so
 * the threshold is kept high and the intensity low.
 */
export function Effects() {
  return (
    <EffectComposer multisampling={4}>
      <Bloom
        intensity={0.55}
        luminanceThreshold={0.72}
        luminanceSmoothing={0.25}
        mipmapBlur
      />
      <Vignette
        offset={0.28}
        darkness={0.72}
        blendFunction={BlendFunction.NORMAL}
      />
    </EffectComposer>
  );
}
