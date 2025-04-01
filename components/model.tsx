"use client";

import { useRef, Suspense } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { Mesh } from "three";

function ModelContent() {
  const meshRef = useRef<Mesh>(null);
  const { scene } = useGLTF('/models/model.gltf');

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <primitive 
      object={scene} 
      ref={meshRef}
      scale={[0.02, 0.02, 0.02]}
      position={[-1, -2, -2]}
    />
  );
}

function FallbackMesh() {
  const meshRef = useRef<Mesh>(null);
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="purple" />
    </mesh>
  );
}

export default function Model() {
  return (
    <Suspense fallback={<FallbackMesh />}>
      <ModelContent />
    </Suspense>
  );
}
