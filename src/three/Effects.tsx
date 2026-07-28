import {
  EffectComposer,
  Bloom,
  Vignette,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { isMobileDevice } from "../lib/useIsMobile";

const mobile = isMobileDevice();

export function Effects() {
  if (mobile) {
    return (
      <EffectComposer multisampling={0}>
        <Vignette
          offset={0.28}
          darkness={0.72}
          blendFunction={BlendFunction.NORMAL}
        />
      </EffectComposer>
    );
  }

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
