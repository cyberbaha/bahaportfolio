import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import * as THREE from "three";
import { rig } from "./cameraRig";

const RIM_BASE = 320;
const KICK_BASE = 14;

/**
 * The signature warm/cool split.
 *
 * Rule that keeps it cinematic instead of muddy: amber and teal must never mix
 * on the FRONT of the figure. Amber owns everything the camera sees; teal lives
 * strictly BEHIND the avatar so it can only graze silhouette edges. The rim
 * intensity follows rig.rim, so the teal glow swells/fades as sections change.
 */
export function Lighting() {
  const rimRef = useRef<THREE.SpotLight>(null);
  const kickRef = useRef<THREE.PointLight>(null);

  useFrame(() => {
    if (rimRef.current) rimRef.current.intensity = RIM_BASE * rig.rim;
    if (kickRef.current) kickRef.current.intensity = KICK_BASE * rig.rim;
  });

  return (
    <>
      {/* A hair of warm ambient so the dark side reads as shadow, not void */}
      <ambientLight intensity={0.07} color="#2a2016" />

      {/* KEY — amber, front-upper-left, frontal enough to model the face
          under the cap brim instead of skimming past it */}
      <directionalLight
        castShadow
        position={[-1.9, 2.6, 3.4]}
        intensity={4.6}
        color="#F5A623"
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0004}
      >
        <orthographicCamera
          attach="shadow-camera"
          args={[-3, 3, 3, -3, 0.1, 20]}
        />
      </directionalLight>

      {/* RIM — teal, strictly behind and above-right. Narrow cone aimed
          forward: it can only paint the silhouette edge. */}
      <spotLight
        ref={rimRef}
        position={[3.2, 2.8, -2.8]}
        angle={0.5}
        penumbra={0.8}
        intensity={RIM_BASE}
        distance={14}
        color="#2DD4BF"
      />

      {/* Secondary teal kicker, low behind-left, so BOTH shoulders get a cool
          edge and the figure fully separates from the black */}
      <pointLight
        ref={kickRef}
        position={[-1.2, 1.2, -2.2]}
        intensity={KICK_BASE}
        distance={7}
        color="#2DD4BF"
      />

      {/* FACE LIFT — small warm glow just in front of the face so eyes/skin
          read under the cap shadow. Tight falloff, invisible elsewhere. */}
      <pointLight
        position={[0.35, 0.55, 1.5]}
        intensity={5}
        distance={3.5}
        color="#FFD9A0"
      />

      {/* FILL — barely-there warm from front-right; keeps amber shadows from
          crushing to pure black without flattening the key */}
      <directionalLight
        position={[2.6, 0.4, 2.6]}
        intensity={0.18}
        color="#FFD9A0"
      />

      {/* Dim env purely for specular in the glasses; low so it never flattens
          the key/rim contrast */}
      <Environment preset="studio" environmentIntensity={0.06} />
    </>
  );
}
