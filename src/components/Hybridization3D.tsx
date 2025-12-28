'use client';

import { useRef, useState, Suspense, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Html, Line } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

// Hook to detect if on mobile device
function useIsMobile() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return isMobile;
}

// Atom sphere component
function Atom({ position, color, label, size = 0.4 }: {
    position: [number, number, number];
    color: string;
    label: string;
    size?: number;
}) {
    const meshRef = useRef<THREE.Mesh>(null);

    return (
        <group position={position}>
            <mesh ref={meshRef}>
                <sphereGeometry args={[size, 32, 32]} />
                <meshStandardMaterial
                    color={color}
                    metalness={0.3}
                    roughness={0.4}
                    emissive={color}
                    emissiveIntensity={0.1}
                />
            </mesh>
            <Html center style={{ pointerEvents: 'none' }}>
                <div style={{
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '16px',
                    textShadow: '0 1px 3px rgba(0,0,0,0.5)'
                }}>
                    {label}
                </div>
            </Html>
        </group>
    );
}

// Bond line between atoms
function Bond({ start, end, color }: {
    start: [number, number, number];
    end: [number, number, number];
    color: string;
}) {
    return (
        <Line
            points={[start, end]}
            color={color}
            lineWidth={3}
            opacity={0.8}
        />
    );
}

// Double bond - two parallel lines
function DoubleBond({ start, end, color }: {
    start: [number, number, number];
    end: [number, number, number];
    color: string;
}) {
    const offset = 0.08;
    return (
        <>
            <Line
                points={[
                    [start[0], start[1] + offset, start[2]],
                    [end[0], end[1] + offset, end[2]]
                ]}
                color={color}
                lineWidth={3}
                opacity={0.9}
            />
            <Line
                points={[
                    [start[0], start[1] - offset, start[2]],
                    [end[0], end[1] - offset, end[2]]
                ]}
                color={color}
                lineWidth={3}
                opacity={0.9}
            />
        </>
    );
}

// Triple bond - three parallel lines
function TripleBond({ start, end, color }: {
    start: [number, number, number];
    end: [number, number, number];
    color: string;
}) {
    const offset = 0.1;
    return (
        <>
            <Line
                points={[start, end]}
                color={color}
                lineWidth={3}
                opacity={0.9}
            />
            <Line
                points={[
                    [start[0], start[1] + offset, start[2]],
                    [end[0], end[1] + offset, end[2]]
                ]}
                color={color}
                lineWidth={2}
                opacity={0.7}
            />
            <Line
                points={[
                    [start[0], start[1] - offset, start[2]],
                    [end[0], end[1] - offset, end[2]]
                ]}
                color={color}
                lineWidth={2}
                opacity={0.7}
            />
        </>
    );
}

// Angle arc indicator
function AngleIndicator({ center, point1, point2, angle, color }: {
    center: [number, number, number];
    point1: [number, number, number];
    point2: [number, number, number];
    angle: string;
    color: string;
}) {
    const radius = 0.5;
    const segments = 32;

    // Calculate vectors
    const v1 = new THREE.Vector3(...point1).sub(new THREE.Vector3(...center)).normalize();
    const v2 = new THREE.Vector3(...point2).sub(new THREE.Vector3(...center)).normalize();

    // Create arc points
    const points: THREE.Vector3[] = [];
    const angleRad = v1.angleTo(v2);

    for (let i = 0; i <= segments; i++) {
        const t = i / segments;
        const vec = v1.clone().lerp(v2, t).normalize().multiplyScalar(radius);
        points.push(new THREE.Vector3(...center).add(vec));
    }

    return (
        <group>
            <Line
                points={points.map(p => [p.x, p.y, p.z] as [number, number, number])}
                color={color}
                lineWidth={2}
                dashed
                dashScale={10}
            />
            <Html position={[center[0], center[1] + 0.8, center[2]]}>
                <div style={{
                    background: `${color}22`,
                    border: `2px solid ${color}`,
                    borderRadius: '20px',
                    padding: '4px 12px',
                    color: color,
                    fontWeight: 'bold',
                    fontSize: '14px',
                    whiteSpace: 'nowrap',
                    backdropFilter: 'blur(10px)'
                }}>
                    {angle}
                </div>
            </Html>
        </group>
    );
}

// SP3 Tetrahedral structure
function SP3Structure({ color }: { color: string }) {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
        }
    });

    // Tetrahedral positions (109.5 degrees)
    const tetrahedralAngle = Math.acos(-1 / 3); // ~109.5 degrees
    const bondLength = 1.2;

    const positions: [number, number, number][] = [
        [0, bondLength, 0], // Top
        [bondLength * Math.sin(tetrahedralAngle), -bondLength * 0.33, 0], // Front
        [-bondLength * Math.sin(tetrahedralAngle) * 0.5, -bondLength * 0.33, bondLength * Math.sin(tetrahedralAngle) * 0.866], // Back right
        [-bondLength * Math.sin(tetrahedralAngle) * 0.5, -bondLength * 0.33, -bondLength * Math.sin(tetrahedralAngle) * 0.866] // Back left
    ];

    return (
        <group ref={groupRef}>
            {/* Central Carbon */}
            <Atom position={[0, 0, 0]} color={color} label="C" size={0.5} />

            {/* Hydrogen atoms */}
            {positions.map((pos, i) => (
                <Atom key={i} position={pos} color="#888888" label="H" size={0.35} />
            ))}

            {/* Bonds */}
            {positions.map((pos, i) => (
                <Bond key={`bond-${i}`} start={[0, 0, 0]} end={pos} color={color} />
            ))}

            {/* Angle indicator */}
            <AngleIndicator
                center={[0, 0, 0]}
                point1={positions[0]}
                point2={positions[1]}
                angle="109.5°"
                color={color}
            />
        </group>
    );
}

// SP2 Trigonal Planar structure
function SP2Structure({ color }: { color: string }) {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
        }
    });

    const bondLength = 1.2;
    const positions: [number, number, number][] = [
        [0, bondLength, 0], // Top (H)
        [-bondLength * Math.cos(Math.PI / 6), -bondLength * Math.sin(Math.PI / 6), 0], // Bottom left (C)
        [bondLength * Math.cos(Math.PI / 6), -bondLength * Math.sin(Math.PI / 6), 0] // Bottom right (H)
    ];

    return (
        <group ref={groupRef}>
            {/* Central Carbon */}
            <Atom position={[0, 0, 0]} color={color} label="C" size={0.5} />

            {/* Atoms */}
            <Atom position={positions[0]} color="#888888" label="H" size={0.35} />
            <Atom position={positions[1]} color={color} label="C" size={0.4} />
            <Atom position={positions[2]} color="#888888" label="H" size={0.35} />

            {/* Single bonds to H atoms */}
            <Bond start={[0, 0, 0]} end={positions[0]} color={color} />
            <Bond start={[0, 0, 0]} end={positions[2]} color={color} />

            {/* Double bond C=C */}
            <DoubleBond start={[0, 0, 0]} end={positions[1]} color="#22c55e" />

            {/* Double bond label */}
            <Html position={[-0.8, -0.8, 0]}>
                <div style={{
                    background: 'rgba(34, 197, 94, 0.2)',
                    border: '1px solid #22c55e',
                    borderRadius: '8px',
                    padding: '2px 8px',
                    color: '#22c55e',
                    fontWeight: 'bold',
                    fontSize: '11px',
                    whiteSpace: 'nowrap',
                }}>
                    C═C
                </div>
            </Html>

            {/* p orbital visualization (π bond) */}
            <mesh position={[0, 0, 0]} rotation={[0, 0, 0]}>
                <cylinderGeometry args={[0.1, 0.1, 1.5, 16]} />
                <meshStandardMaterial
                    color="#22c55e"
                    transparent
                    opacity={0.3}
                />
            </mesh>

            {/* Angle indicator */}
            <AngleIndicator
                center={[0, 0, 0]}
                point1={positions[0]}
                point2={positions[2]}
                angle="120°"
                color={color}
            />
        </group>
    );
}

// SP Linear structure  
function SPStructure({ color }: { color: string }) {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
        }
    });

    const bondLength = 1.3;

    return (
        <group ref={groupRef}>
            {/* Central Carbon */}
            <Atom position={[0, 0, 0]} color={color} label="C" size={0.5} />

            {/* Left H */}
            <Atom position={[-bondLength, 0, 0]} color="#888888" label="H" size={0.35} />

            {/* Right C */}
            <Atom position={[bondLength, 0, 0]} color={color} label="C" size={0.4} />

            {/* Single bond to H */}
            <Bond start={[0, 0, 0]} end={[-bondLength, 0, 0]} color={color} />

            {/* Triple bond C≡C */}
            <TripleBond start={[0, 0, 0]} end={[bondLength, 0, 0]} color="#ef4444" />

            {/* Triple bond label */}
            <Html position={[0.65, -0.6, 0]}>
                <div style={{
                    background: 'rgba(239, 68, 68, 0.2)',
                    border: '1px solid #ef4444',
                    borderRadius: '8px',
                    padding: '2px 8px',
                    color: '#ef4444',
                    fontWeight: 'bold',
                    fontSize: '11px',
                    whiteSpace: 'nowrap',
                }}>
                    C≡C
                </div>
            </Html>

            {/* p orbitals (2 π bonds) */}
            <mesh position={[0.65, 0, 0]} rotation={[0, 0, 0]}>
                <cylinderGeometry args={[0.08, 0.08, 1.2, 16]} />
                <meshStandardMaterial color="#ef4444" transparent opacity={0.25} />
            </mesh>
            <mesh position={[0.65, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.08, 0.08, 1.2, 16]} />
                <meshStandardMaterial color="#ef4444" transparent opacity={0.25} />
            </mesh>

            {/* Angle indicator */}
            <Html position={[0, 1, 0]}>
                <div style={{
                    background: `${color}22`,
                    border: `2px solid ${color}`,
                    borderRadius: '20px',
                    padding: '4px 12px',
                    color: color,
                    fontWeight: 'bold',
                    fontSize: '14px',
                    whiteSpace: 'nowrap',
                    backdropFilter: 'blur(10px)'
                }}>
                    180°
                </div>
            </Html>
        </group>
    );
}

// Main scene
function Scene({ activeType, color, isMobile }: { activeType: number; color: string; isMobile: boolean }) {
    return (
        <>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} />

            {activeType === 0 && <SP3Structure color={color} />}
            {activeType === 1 && <SP2Structure color={color} />}
            {activeType === 2 && <SPStructure color={color} />}

            <OrbitControls
                enableZoom={true}
                enablePan={false}
                minDistance={isMobile ? 4 : 3}
                maxDistance={isMobile ? 10 : 8}
                autoRotate
                autoRotateSpeed={0.5}
                // Touch support
                touches={{
                    ONE: THREE.TOUCH.ROTATE,
                    TWO: THREE.TOUCH.DOLLY_PAN
                }}
                // Enable touch rotation
                enableRotate={true}
            />
        </>
    );
}

// Loading fallback
function Loader() {
    return (
        <Html center>
            <div style={{ color: 'white', fontSize: '1rem' }}>Loading 3D...</div>
        </Html>
    );
}

interface Hybridization3DProps {
    title?: string;
}

export default function Hybridization3D({ title }: Hybridization3DProps) {
    const [activeTab, setActiveTab] = useState(0);
    const isMobile = useIsMobile();

    const hybridizations = [
        {
            name: 'sp³',
            shape: 'Tetrahedral',
            angle: '109.5°',
            example: 'Methane (CH₄)',
            description: '4 equivalent sp³ orbitals arranged tetrahedrally',
            color: '#8b5cf6'
        },
        {
            name: 'sp²',
            shape: 'Trigonal Planar',
            angle: '120°',
            example: 'Ethene (C₂H₄)',
            description: '3 sp² orbitals in plane + 1 unhybridized p orbital',
            color: '#06b6d4'
        },
        {
            name: 'sp',
            shape: 'Linear',
            angle: '180°',
            example: 'Ethyne (C₂H₂)',
            description: '2 sp orbitals linear + 2 unhybridized p orbitals',
            color: '#f59e0b'
        }
    ];

    const current = hybridizations[activeTab];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
                background: 'var(--gradient-card)',
                border: '1px solid var(--card-border)',
                borderRadius: '20px',
                padding: '1.5rem',
                margin: '2rem 0'
            }}
        >
            {/* Header */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '1.5rem'
            }}>
                <span style={{ fontSize: '1.5rem' }}>🔬</span>
                <h4 style={{
                    margin: 0,
                    fontSize: '1.1rem',
                    color: 'var(--neutral-100)'
                }}>
                    {title || 'Interactive 3D Hybridization'}
                </h4>
                <span style={{
                    marginLeft: 'auto',
                    padding: '0.25rem 0.75rem',
                    background: 'var(--neutral-800)',
                    borderRadius: '20px',
                    fontSize: '0.75rem',
                    color: 'var(--neutral-400)'
                }}>
                    {isMobile ? '👆 Touch to rotate' : '🖱️ Drag to rotate'}
                </span>
            </div>

            {/* Tabs */}
            <div style={{
                display: 'flex',
                gap: '0.5rem',
                marginBottom: '1rem'
            }}>
                {hybridizations.map((h, index) => (
                    <button
                        key={h.name}
                        onClick={() => setActiveTab(index)}
                        style={{
                            flex: 1,
                            padding: '0.75rem',
                            background: activeTab === index
                                ? `linear-gradient(135deg, ${h.color}33 0%, ${h.color}11 100%)`
                                : 'var(--neutral-800)',
                            border: activeTab === index
                                ? `2px solid ${h.color}`
                                : '1px solid var(--neutral-700)',
                            borderRadius: '12px',
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                        }}
                    >
                        <div style={{
                            fontSize: '1.25rem',
                            fontWeight: 700,
                            color: activeTab === index ? h.color : 'var(--neutral-400)'
                        }}>
                            {h.name}
                        </div>
                        <div style={{
                            fontSize: '0.75rem',
                            color: 'var(--neutral-400)'
                        }}>
                            {h.shape}
                        </div>
                    </button>
                ))}
            </div>

            {/* 3D Canvas */}
            <div style={{
                background: 'linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.6) 100%)',
                borderRadius: isMobile ? '12px' : '16px',
                height: isMobile ? '280px' : '350px',
                overflow: 'hidden',
                touchAction: 'none' // Prevent scroll interference on mobile
            }}>
                <Canvas
                    camera={{ position: [0, 0, isMobile ? 6 : 5], fov: 50 }}
                    style={{ background: 'transparent', touchAction: 'none' }}
                >
                    <Suspense fallback={<Loader />}>
                        <Scene activeType={activeTab} color={current.color} isMobile={isMobile} />
                    </Suspense>
                </Canvas>
            </div>

            {/* Info */}
            <div style={{
                marginTop: '1rem',
                textAlign: 'center'
            }}>
                <div style={{
                    display: 'inline-block',
                    padding: '0.5rem 1.5rem',
                    background: `${current.color}22`,
                    border: `1px solid ${current.color}44`,
                    borderRadius: '20px',
                    marginBottom: '0.75rem'
                }}>
                    <span style={{
                        fontSize: '1.5rem',
                        fontWeight: 700,
                        color: current.color
                    }}>
                        {current.angle}
                    </span>
                    <span style={{
                        color: 'var(--neutral-400)',
                        marginLeft: '0.5rem'
                    }}>
                        bond angle
                    </span>
                </div>

                <p style={{
                    color: 'var(--neutral-300)',
                    fontSize: '0.9rem',
                    margin: '0 0 0.5rem'
                }}>
                    {current.description}
                </p>

                <p style={{
                    color: 'var(--neutral-400)',
                    fontSize: '0.85rem',
                    margin: 0
                }}>
                    Example: <strong style={{ color: 'var(--neutral-200)' }}>{current.example}</strong>
                </p>
            </div>
        </motion.div>
    );
}
