"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Float, MeshDistortMaterial } from "@react-three/drei"
import type * as THREE from "three"

export default function HeroScene() {
  const particlesRef = useRef<THREE.Points>(null)
  const sphereRef = useRef<THREE.Mesh>(null)

  // Create particles
  const particleCount = 2000
  const positions = new Float32Array(particleCount * 3)

  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3
    positions[i3] = (Math.random() - 0.5) * 15
    positions[i3 + 1] = (Math.random() - 0.5) * 15
    positions[i3 + 2] = (Math.random() - 0.5) * 15
  }

  useFrame((state, delta) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += delta * 0.05
    }

    if (sphereRef.current) {
      sphereRef.current.rotation.y += delta * 0.1
      sphereRef.current.rotation.z += delta * 0.05
    }
  })

  return (
    <>
      <color attach="background" args={["#000000"]} />
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 5]} intensity={1} />

      {/* Particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute 
            attach="attributes-position" 
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial size={0.05} color="#4f46e5" sizeAttenuation transparent opacity={0.8} />
      </points>

      {/* Center sphere */}
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh ref={sphereRef} position={[0, 0, 0]}>
          <sphereGeometry args={[2, 64, 64]} />
          <MeshDistortMaterial
            color="#4f46e5"
            attach="material"
            distort={0.4}
            speed={1.5}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
      </Float>

      {/* Orbital rings */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[3.5, 0.05, 16, 100]} />
        <meshStandardMaterial color="#a855f7" emissive="#a855f7" emissiveIntensity={0.5} transparent opacity={0.6} />
      </mesh>

      <mesh rotation={[Math.PI / 3, Math.PI / 6, 0]}>
        <torusGeometry args={[4.5, 0.05, 16, 100]} />
        <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={0.5} transparent opacity={0.6} />
      </mesh>
    </>
  )
}

