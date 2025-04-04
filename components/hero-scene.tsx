"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Float, MeshDistortMaterial } from "@react-three/drei"
import { useTheme } from "next-themes"
import type * as THREE from "three"

export default function HeroScene() {
  const { resolvedTheme } = useTheme()
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

  const isDark = resolvedTheme === "dark"

  return (
    <>
      <color attach="background" args={[isDark ? "#030712" : "#ffffff"]} />
      <ambientLight intensity={isDark ? 0.1 : 0.2} />
      <directionalLight position={[10, 10, 5]} intensity={isDark ? 0.5 : 1} />

      {/* Particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute 
            attach="attributes-position" 
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial 
          size={0.05} 
          color={isDark ? "#4f46e5" : "#6366f1"} 
          sizeAttenuation 
          transparent 
          opacity={isDark ? 0.8 : 0.6} 
        />
      </points>

      {/* Center sphere */}
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh ref={sphereRef} position={[0, 0, 0]}>
          <sphereGeometry args={[2, 64, 64]} />
          <MeshDistortMaterial
            color={isDark ? "#4f46e5" : "#6366f1"}
            attach="material"
            distort={0.4}
            speed={1.5}
            roughness={isDark ? 0.3 : 0.2}
            metalness={isDark ? 0.9 : 0.8}
          />
        </mesh>
      </Float>

      {/* Orbital rings */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[3.5, 0.05, 16, 100]} />
        <meshStandardMaterial 
          color={isDark ? "#4338ca" : "#818cf8"} 
          emissive={isDark ? "#4338ca" : "#818cf8"} 
          emissiveIntensity={isDark ? 0.8 : 0.5} 
          transparent 
          opacity={isDark ? 0.8 : 0.6} 
        />
      </mesh>

      <mesh rotation={[Math.PI / 3, Math.PI / 6, 0]}>
        <torusGeometry args={[4.5, 0.05, 16, 100]} />
        <meshStandardMaterial 
          color={isDark ? "#4f46e5" : "#6366f1"} 
          emissive={isDark ? "#4f46e5" : "#6366f1"} 
          emissiveIntensity={isDark ? 0.8 : 0.5} 
          transparent 
          opacity={isDark ? 0.8 : 0.6} 
        />
      </mesh>
    </>
  )
}

