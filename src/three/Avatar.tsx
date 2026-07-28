import {
  useEffect,
  useMemo,
  useRef,
  forwardRef,
} from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

const lerp = THREE.MathUtils.lerp;

export const Avatar = forwardRef<THREE.Group>(function Avatar(_props, ref) {
  const local = useRef<THREE.Group>(null!);
  const { scene } = useGLTF("/model.glb");
  const headRef = useRef<THREE.Object3D | null>(null);
  const s = useMemo(() => ({ yaw: 0, pitch: 0 }), []);

  // Find the head bone for mouse tracking
  useEffect(() => {
    scene.traverse((o) => {
      if (o.name === "Head" || o.name === "head") {
        headRef.current = o;
      }
      if ((o as THREE.Mesh).isMesh) {
        o.castShadow = true;
        o.receiveShadow = true;
        const mat = (o as THREE.Mesh).material as THREE.MeshStandardMaterial;
        if (mat && "envMapIntensity" in mat) mat.envMapIntensity = 0.5;
      }
    });
  }, [scene]);

  // Mouse tracking
  useFrame(({ pointer }) => {
    s.yaw = lerp(s.yaw, pointer.x * 0.15, 0.05);
    s.pitch = lerp(s.pitch, -pointer.y * 0.1, 0.05);
    if (headRef.current) {
      headRef.current.rotation.y += s.yaw * 0.01;
      headRef.current.rotation.x += s.pitch * 0.01;
    }
  });

  const groupRef = (el: THREE.Group) => {
    (local as React.MutableRefObject<THREE.Group | null>).current = el;
    if (ref) {
      if (typeof ref === "function") ref(el);
      else ref.current = el;
    }
  };

  return (
    <group ref={groupRef} position={[0, -1.42, 0]} dispose={null}>
      <primitive object={scene} />
    </group>
  );
});

useGLTF.preload("/model.glb");