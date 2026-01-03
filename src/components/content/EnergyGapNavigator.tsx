'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

interface MoleculeData {
    name: string;
    formula: string;
    lambdaMax: number;
    energyGap: number;
    absorbedColor: string;
    resultColor: string;
    resultColorHex: string;
    description: string;
    pubchemCid: number;
}

const MOLECULES: Record<string, MoleculeData> = {
    benzene: {
        name: 'Benzene',
        formula: 'C₆H₆',
        lambdaMax: 255,
        energyGap: 4.8,
        absorbedColor: 'UV (invisible)',
        resultColor: 'Colorless',
        resultColorHex: 'transparent',
        description: 'Large energy gap (4.8 eV) means benzene only absorbs UV light, not visible light.',
        pubchemCid: 241
    },
    azulene: {
        name: 'Azulene',
        formula: 'C₁₀H₈',
        lambdaMax: 580,
        energyGap: 2.1,
        absorbedColor: 'Orange (580-600nm)',
        resultColor: 'Deep Blue',
        resultColorHex: '#1e40af',
        description: 'Small energy gap (2.1 eV) means azulene absorbs orange light, reflecting its complementary color: blue.',
        pubchemCid: 9231
    }
};

// 3D Molecule Viewer
function MoleculeViewer3D({ pubchemCid }: { pubchemCid: number }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const viewerRef = useRef<any>(null);
    const rotationRef = useRef<number | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!containerRef.current) return;

        const loadViewer = async () => {
            setIsLoading(true);
            try {
                const $3Dmol = await import('3dmol');
                if (viewerRef.current) viewerRef.current.clear();

                const viewer = $3Dmol.createViewer(containerRef.current, {
                    backgroundColor: 'rgba(15, 17, 22, 0.8)',
                    antialias: true,
                });
                viewerRef.current = viewer;

                const response = await fetch(`https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${pubchemCid}/SDF?record_type=3d`);
                const sdfData = await response.text();

                viewer.addModel(sdfData, 'sdf');
                viewer.setStyle({}, {
                    stick: { radius: 0.15, colorscheme: 'Jmol' },
                    sphere: { scale: 0.3, colorscheme: 'Jmol' }
                });
                viewer.zoomTo();
                viewer.render();

                const rotate = () => {
                    if (viewerRef.current) {
                        viewerRef.current.rotate(0.5, 'y');
                        viewerRef.current.render();
                        rotationRef.current = requestAnimationFrame(rotate);
                    }
                };
                rotate();
                setIsLoading(false);
            } catch {
                setIsLoading(false);
            }
        };

        const timer = setTimeout(loadViewer, 100);
        return () => {
            clearTimeout(timer);
            if (rotationRef.current) cancelAnimationFrame(rotationRef.current);
            if (viewerRef.current) viewerRef.current.clear();
        };
    }, [pubchemCid]);

    return (
        <div style={{ position: 'relative', height: '100%', minHeight: '200px', borderRadius: '12px', overflow: 'hidden' }}>
            {isLoading && (
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>
                    🔬 Loading...
                </div>
            )}
            <div ref={containerRef} style={{ width: '100%', height: '100%', minHeight: '200px' }} />
        </div>
    );
}

// Energy Level Diagram with Animation
function EnergyDiagram({ energyGap, isTransition }: { energyGap: number; isTransition: boolean }) {
    const maxGap = 5.0;
    const gapPercentage = (energyGap / maxGap) * 100;
    const homoY = 80;
    const lumoY = 80 - (gapPercentage * 0.6);

    return (
        <div style={{
            height: '100%',
            background: 'rgba(0,0,0,0.3)',
            borderRadius: '12px',
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <div style={{ fontSize: '0.8rem', color: '#94a3b8', textAlign: 'center', marginBottom: '0.5rem' }}>
                Energy Level Diagram
            </div>
            <svg viewBox="0 0 120 100" style={{ flex: 1, maxHeight: '180px' }}>
                {/* Energy axis */}
                <line x1="15" y1="10" x2="15" y2="90" stroke="#475569" strokeWidth="1" />
                <text x="8" y="15" fontSize="6" fill="#94a3b8">E</text>
                <polygon points="15,8 13,14 17,14" fill="#475569" />

                {/* LUMO Level */}
                <motion.g
                    animate={{ y: isTransition ? [0, -5, 0] : 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <motion.line
                        x1="30"
                        y1={lumoY}
                        x2="90"
                        y2={lumoY}
                        stroke="#ef4444"
                        strokeWidth="3"
                        animate={{ y1: lumoY, y2: lumoY }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                    />
                    <text x="95" y={lumoY + 3} fontSize="7" fill="#ef4444" fontWeight="bold">LUMO</text>
                </motion.g>

                {/* HOMO Level */}
                <line x1="30" y1={homoY} x2="90" y2={homoY} stroke="#3b82f6" strokeWidth="3" />
                <text x="95" y={homoY + 3} fontSize="7" fill="#3b82f6" fontWeight="bold">HOMO</text>

                {/* Electrons in HOMO */}
                <circle cx="50" cy={homoY - 5} r="4" fill="#3b82f6" />
                <circle cx="70" cy={homoY - 5} r="4" fill="#3b82f6" />

                {/* Energy gap arrow */}
                <motion.line
                    x1="60"
                    y1={homoY - 8}
                    x2="60"
                    y2={lumoY + 5}
                    stroke="#fbbf24"
                    strokeWidth="1.5"
                    strokeDasharray="3,2"
                    animate={{ y2: lumoY + 5 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                />
                <motion.text
                    x="62"
                    y={(homoY + lumoY) / 2}
                    fontSize="6"
                    fill="#fbbf24"
                    animate={{ y: (homoY + lumoY) / 2 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                    ΔE
                </motion.text>

                {/* Photon absorption animation */}
                {isTransition && (
                    <motion.circle
                        cx="50"
                        cy={homoY - 5}
                        r="4"
                        fill="#fbbf24"
                        initial={{ cy: homoY - 5 }}
                        animate={{ cy: lumoY + 5 }}
                        transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 1 }}
                    />
                )}
            </svg>

            {/* Energy Gap Value */}
            <motion.div
                key={energyGap}
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                style={{
                    textAlign: 'center',
                    padding: '0.5rem',
                    background: 'rgba(251, 191, 36, 0.1)',
                    borderRadius: '8px',
                    marginTop: '0.5rem'
                }}
            >
                <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Energy Gap</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fbbf24' }}>
                    {energyGap.toFixed(1)} eV
                </div>
            </motion.div>
        </div>
    );
}

// Beaker with Dynamic Color
function ColorBeaker({ color, colorName }: { color: string; colorName: string }) {
    return (
        <div style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0,0,0,0.2)',
            borderRadius: '12px',
            padding: '1rem'
        }}>
            <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.5rem' }}>
                Resulting Solution
            </div>

            {/* Beaker SVG */}
            <svg viewBox="0 0 80 100" style={{ width: '80px', height: '100px' }}>
                {/* Beaker outline */}
                <path
                    d="M15 20 L15 80 Q15 90 25 90 L55 90 Q65 90 65 80 L65 20"
                    fill="none"
                    stroke="#64748b"
                    strokeWidth="2"
                />
                {/* Beaker lip */}
                <path d="M10 20 L15 20 M65 20 L70 20" stroke="#64748b" strokeWidth="2" />

                {/* Liquid with animation */}
                <motion.path
                    d="M17 30 L17 78 Q17 88 27 88 L53 88 Q63 88 63 78 L63 30 Z"
                    fill={color === 'transparent' ? 'rgba(200, 200, 200, 0.1)' : color}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    style={{ filter: color !== 'transparent' ? 'drop-shadow(0 0 10px ' + color + ')' : 'none' }}
                />

                {/* Light ray passing through */}
                <motion.line
                    x1="5"
                    y1="50"
                    x2="75"
                    y2="50"
                    stroke={color === 'transparent' ? 'white' : '#60a5fa'}
                    strokeWidth="2"
                    strokeDasharray="4,4"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, repeat: Infinity }}
                />
            </svg>

            {/* Color Label */}
            <motion.div
                key={colorName}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                style={{
                    marginTop: '0.75rem',
                    padding: '0.5rem 1rem',
                    background: color === 'transparent' ? 'rgba(255,255,255,0.1)' : color + '30',
                    borderRadius: '8px',
                    border: `1px solid ${color === 'transparent' ? 'rgba(255,255,255,0.2)' : color}`,
                    textAlign: 'center'
                }}
            >
                <div style={{
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    color: color === 'transparent' ? '#94a3b8' : color
                }}>
                    {colorName}
                </div>
            </motion.div>
        </div>
    );
}

export default function EnergyGapNavigator() {
    const [selectedMolecule, setSelectedMolecule] = useState<'benzene' | 'azulene'>('benzene');
    const [isTransitioning, setIsTransitioning] = useState(false);

    const molecule = MOLECULES[selectedMolecule];

    const handleSwitch = (mol: 'benzene' | 'azulene') => {
        if (mol !== selectedMolecule) {
            setIsTransitioning(true);
            setTimeout(() => {
                setSelectedMolecule(mol);
                setTimeout(() => setIsTransitioning(false), 500);
            }, 200);
        }
    };

    return (
        <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            borderRadius: '20px',
            border: '1px solid rgba(139, 92, 246, 0.3)',
            overflow: 'hidden',
            marginTop: '2rem'
        }}>
            {/* Header */}
            <div style={{
                padding: '1.25rem',
                background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(59, 130, 246, 0.15) 100%)',
                borderBottom: '1px solid rgba(139, 92, 246, 0.2)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '2rem' }}>⚡</span>
                    <div>
                        <h3 style={{ margin: 0, fontSize: '1.3rem', fontWeight: 700, color: '#a78bfa' }}>
                            The Energy Gap Navigator
                        </h3>
                        <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                            Interactive HOMO-LUMO Simulation
                        </span>
                    </div>
                </div>
                <p style={{ margin: 0, color: '#cbd5e1', fontSize: '0.9rem' }}>
                    Compare how conjugation length affects the energy gap and molecular color
                </p>
            </div>

            {/* Molecule Selector */}
            <div style={{
                display: 'flex',
                gap: '0.5rem',
                padding: '1rem',
                background: 'rgba(0,0,0,0.2)'
            }}>
                {(['benzene', 'azulene'] as const).map(mol => (
                    <motion.button
                        key={mol}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleSwitch(mol)}
                        style={{
                            flex: 1,
                            padding: '0.75rem',
                            background: selectedMolecule === mol
                                ? mol === 'benzene'
                                    ? 'linear-gradient(135deg, rgba(148, 163, 184, 0.2) 0%, rgba(100, 116, 139, 0.2) 100%)'
                                    : 'linear-gradient(135deg, rgba(30, 64, 175, 0.3) 0%, rgba(59, 130, 246, 0.3) 100%)'
                                : 'transparent',
                            border: selectedMolecule === mol
                                ? mol === 'benzene'
                                    ? '2px solid #94a3b8'
                                    : '2px solid #3b82f6'
                                : '1px solid rgba(255,255,255,0.1)',
                            borderRadius: '12px',
                            cursor: 'pointer',
                            transition: 'all 0.3s'
                        }}
                    >
                        <div style={{ fontSize: '1.5rem', marginBottom: '4px' }}>
                            {mol === 'benzene' ? '⬡' : '💎'}
                        </div>
                        <div style={{
                            fontSize: '0.9rem',
                            fontWeight: 600,
                            color: selectedMolecule === mol
                                ? mol === 'benzene' ? '#e2e8f0' : '#60a5fa'
                                : '#64748b'
                        }}>
                            {MOLECULES[mol].name}
                        </div>
                        <div style={{ fontSize: '0.7rem', color: '#64748b' }}>
                            {MOLECULES[mol].formula}
                        </div>
                    </motion.button>
                ))}
            </div>

            {/* Main Visualization Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '1rem',
                padding: '1rem',
                minHeight: '280px'
            }}>
                {/* 3D Viewer */}
                <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '12px', overflow: 'hidden' }}>
                    <div style={{ padding: '0.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', textAlign: 'center' }}>
                        <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>3D Structure</span>
                    </div>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={selectedMolecule}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            style={{ height: '220px' }}
                        >
                            <MoleculeViewer3D pubchemCid={molecule.pubchemCid} />
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Energy Diagram */}
                <EnergyDiagram energyGap={molecule.energyGap} isTransition={isTransitioning} />

                {/* Color Beaker */}
                <ColorBeaker color={molecule.resultColorHex} colorName={molecule.resultColor} />
            </div>

            {/* Scientific Explanation */}
            <motion.div
                key={selectedMolecule}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                    margin: '0 1rem 1rem',
                    padding: '1rem',
                    background: selectedMolecule === 'benzene'
                        ? 'rgba(148, 163, 184, 0.1)'
                        : 'rgba(30, 64, 175, 0.15)',
                    borderRadius: '12px',
                    border: `1px solid ${selectedMolecule === 'benzene' ? '#94a3b8' : '#3b82f6'}30`
                }}
            >
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                    gap: '1rem',
                    marginBottom: '1rem'
                }}>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '0.7rem', color: '#64748b' }}>λ max</div>
                        <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fbbf24' }}>
                            {molecule.lambdaMax} nm
                        </div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Energy Gap</div>
                        <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#a78bfa' }}>
                            {molecule.energyGap} eV
                        </div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Absorbs</div>
                        <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#f97316' }}>
                            {molecule.absorbedColor}
                        </div>
                    </div>
                </div>

                <p style={{
                    margin: 0,
                    fontSize: '0.9rem',
                    color: '#cbd5e1',
                    lineHeight: 1.6,
                    textAlign: 'center',
                    fontStyle: 'italic'
                }}>
                    💡 {molecule.description}
                </p>
            </motion.div>

            {/* Quantum Equation Reminder */}
            <div style={{
                padding: '1rem',
                background: 'rgba(0,0,0,0.3)',
                borderTop: '1px solid rgba(255,255,255,0.05)',
                textAlign: 'center'
            }}>
                <span style={{ fontFamily: 'serif', fontSize: '1.1rem', color: '#a78bfa' }}>
                    ΔE = hc/λ
                </span>
                <span style={{ fontSize: '0.8rem', color: '#64748b', marginLeft: '1rem' }}>
                    Lower ΔE → Longer λ → Visible absorption → Color!
                </span>
            </div>
        </div>
    );
}
