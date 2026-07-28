import { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { Avatar } from "./Avatar";
import { Lighting } from "./Lighting";
import { Effects } from "./Effects";
import { rig } from "./cameraRig";
import { isMobileDevice } from "../lib/useIsMobile";

const mobile = isMobileDevice();

/**
 * Applies the scroll-driven rig to the camera and avatar every frame, layers
 * pointer parallax on top, and keeps the DOM backlight glow glued to the
 * avatar's on-screen position so he never floats in dead black.
 */
function RigUpdater({
  avatar,
}: {
  avatar: React.RefObject<THREE.Group | null>;
}) {
  const target = useMemo(() => new THREE.Vector3(), []);
  const proj = useMemo(() => new THREE.Vector3(), []);
  const par = useMemo(() => ({ x: 0, y: 0 }), []);
  const glowRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    glowRef.current = document.getElementById("avatarGlow");
  }, []);

  useFrame(({ camera, pointer }) => {
    par.x = THREE.MathUtils.lerp(par.x, pointer.x * 0.07, 0.05);
    par.y = THREE.MathUtils.lerp(par.y, pointer.y * 0.045, 0.05);
    camera.position.set(rig.camX + par.x, rig.camY + par.y, rig.camZ);
    camera.lookAt(target.set(rig.tgtX, rig.tgtY, rig.tgtZ));

    const g = avatar.current;
    if (g) {
      g.position.set(rig.avX, rig.avY, rig.avZ);
      g.rotation.y = rig.avRY;
    }

    // Backlight glow follows the avatar's chest in screen space.
    const el = glowRef.current;
    if (el) {
      proj.set(rig.avX, rig.avY + 1.05, rig.avZ).project(camera);
      const x = (proj.x * 0.5 + 0.5) * 100;
      const y = (-proj.y * 0.5 + 0.5) * 100;
      const scale = THREE.MathUtils.clamp(2.1 / rig.camZ, 0.45, 1.35);
      el.style.left = `${x}%`;
      el.style.top = `${y}%`;
      el.style.transform = `translate(-50%, -50%) scale(${scale})`;
    }
  });
  return null;
}

export function Scene() {
  const avatarRef = useRef<THREE.Group>(null);

  return (
    <div className="scene-layer">
      {/* Ambient corner glows — fill the frame edges with atmosphere */}
      <div className="blob blob-amber" />
      <div className="blob blob-teal" />

      {/* Backlight glow behind the avatar (position driven by RigUpdater) */}
      <div className="avatar-glow" id="avatarGlow">
        <div className="avatar-glow-amber" />
        <div className="avatar-glow-teal" />
      </div>

      <Canvas
        shadows
        dpr={mobile ? [1, 1.5] : [1, 2]}
        gl={{
          alpha: true,
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.18,
          outputColorSpace: THREE.SRGBColorSpace,
        }}
        camera={{ position: [0, 0.1, 1.95], fov: 30, near: 0.1, far: 100 }}
      >
        <fog attach="fog" args={["#0B0A08", 6.5, 15]} />

        <Suspense fallback={null}>
          <Lighting />
          <Avatar ref={avatarRef} />
          <RigUpdater avatar={avatarRef} />

          {mobile ? null : (
            <ContactShadows
              position={[0, -1.44, 0]}
              opacity={0.55}
              scale={10}
              blur={2.6}
              far={4}
              color="#000000"
            />
          )}

          <Effects />
        </Suspense>
      </Canvas>
    </div>
  );
}
