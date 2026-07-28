import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import * as THREE from "three";
import { rig } from "./cameraRig";
import { isMobileDevice } from "../lib/useIsMobile";

const RIM_BASE = 320;
const KICK_BASE = 14;
const mobile = isMobileDevice();

export function Lighting() {
  const rimRef = useRef<THREE.SpotLight>(null);
  const kickRef = useRef<THREE.PointLight>(null);

  useFrame(() => {
    if (rimRef.current) rimRef.current.intensity = RIM_BASE * rig.rim;
    if (kickRef.current) kickRef.current.intensity = KICK_BASE * rig.rim;
  });

  return (
    <>
      <ambientLight intensity={0.07} color="#2a2016" />

      <directionalLight
        castShadow={!mobile}
        position={[-1.9, 2.6, 3.4]}
        intensity={4.6}
        color="#F5A623"
        shadow-mapSize={mobile ? [512, 512] : [2048, 2048]}
        shadow-bias={-0.0004}
      >
        <orthographicCamera
          attach="shadow-camera"
          args={[-3, 3, 3, -3, 0.1, 20]}
        />
      </directionalLight>

      <spotLight
        ref={rimRef}
        position={[3.2, 2.8, -2.8]}
        angle={0.5}
        penumbra={0.8}
        intensity={RIM_BASE}
        distance={14}
        color="#2DD4BF"
      />

      <pointLight
        ref={kickRef}
        position={[-1.2, 1.2, -2.2]}
        intensity={KICK_BASE}
        distance={7}
        color="#2DD4BF"
      />

      <pointLight
        position={[0.35, 0.55, 1.5]}
        intensity={5}
        distance={3.5}
        color="#FFD9A0"
      />

      <directionalLight
        position={[2.6, 0.4, 2.6]}
        intensity={0.18}
        color="#FFD9A0"
      />

      <Environment preset="studio" environmentIntensity={0.06} />
    </>
  );
}
