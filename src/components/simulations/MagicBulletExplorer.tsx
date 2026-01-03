'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Types
interface Cell {
    id: number;
    type: 'human' | 'bacteria';
    x: number;
    y: number;
    size: number;
    state: 'normal' | 'stained' | 'dying' | 'dead';
    color: string;
}

interface Compound {
    id: string;
    name: string;
    fullName: string;
    color: string;
    effect: 'stain-all' | 'kill-all' | 'selective';
    description: string;
}

type SimulationStep = 'intro' | 'testing' | 'result' | 'revelation';

const COMPOUNDS: Compound[] = [
    {
        id: 'A',
        name: 'Compound A',
        fullName: 'General Blue Stain',
        color: '#3b82f6',
        effect: 'stain-all',
        description: 'A general organic stain that binds to all cellular tissue'
    },
    {
        id: 'B',
        name: 'Compound B',
        fullName: 'Non-selective Cytotoxin',
        color: '#ef4444',
        effect: 'kill-all',
        description: 'A toxic compound that kills all living cells'
    },
    {
        id: 'C',
        name: 'Compound C',
        fullName: 'Prontosil (Red Azo Dye)',
        color: '#dc2626',
        effect: 'selective',
        description: 'A synthetic red azo dye discovered by Gerhard Domagk'
    }
];

// Generate initial cells
const generateCells = (): Cell[] => {
    const cells: Cell[] = [];

    // Human cells (large, circular) - 6 cells
    for (let i = 0; i < 6; i++) {
        cells.push({
            id: i,
            type: 'human',
            x: 80 + (i % 3) * 180 + Math.random() * 40,
            y: 80 + Math.floor(i / 3) * 160 + Math.random() * 40,
            size: 70 + Math.random() * 20,
            state: 'normal',
            color: 'rgba(255, 200, 180, 0.8)'
        });
    }

    // Bacteria (small, rod-shaped) - 12 bacteria
    for (let i = 0; i < 12; i++) {
        cells.push({
            id: 100 + i,
            type: 'bacteria',
            x: 60 + Math.random() * 480,
            y: 60 + Math.random() * 300,
            size: 20 + Math.random() * 10,
            state: 'normal',
            color: 'rgba(180, 180, 200, 0.9)'
        });
    }

    return cells;
};

export default function MagicBulletExplorer() {
    const [step, setStep] = useState<SimulationStep>('intro');
    const [cells, setCells] = useState<Cell[]>(generateCells());
    const [selectedCompound, setSelectedCompound] = useState<Compound | null>(null);
    const [testResults, setTestResults] = useState<string[]>([]);
    const [currentTest, setCurrentTest] = useState<number>(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [showRevelation, setShowRevelation] = useState(false);
    const slideRef = useRef<HTMLDivElement>(null);

    const resetSimulation = () => {
        setCells(generateCells());
        setSelectedCompound(null);
        setTestResults([]);
        setCurrentTest(0);
        setStep('intro');
        setShowRevelation(false);
    };

    const applyCompound = async (compound: Compound) => {
        if (isAnimating) return;
        setIsAnimating(true);
        setSelectedCompound(compound);

        // Apply effect based on compound type
        if (compound.effect === 'stain-all') {
            // All cells turn blue
            setCells(prev => prev.map(cell => ({
                ...cell,
                state: 'stained',
                color: compound.color
            })));

            setTimeout(() => {
                setTestResults(prev => [...prev, 'stain-all']);
                setCurrentTest(prev => prev + 1);
                setStep('result');
                setIsAnimating(false);
            }, 1500);

        } else if (compound.effect === 'kill-all') {
            // All cells die
            setCells(prev => prev.map(cell => ({
                ...cell,
                state: 'dying',
                color: '#666'
            })));

            setTimeout(() => {
                setCells(prev => prev.map(cell => ({
                    ...cell,
                    state: 'dead',
                    size: cell.size * 0.3
                })));
                setTestResults(prev => [...prev, 'kill-all']);
                setCurrentTest(prev => prev + 1);
                setStep('result');
                setIsAnimating(false);
            }, 1500);

        } else if (compound.effect === 'selective') {
            // Only bacteria turn red
            setCells(prev => prev.map(cell => ({
                ...cell,
                state: cell.type === 'bacteria' ? 'stained' : 'normal',
                color: cell.type === 'bacteria' ? compound.color : cell.color
            })));

            setTimeout(() => {
                // Bacteria die
                setCells(prev => prev.map(cell =>
                    cell.type === 'bacteria'
                        ? { ...cell, state: 'dying', size: cell.size * 0.5 }
                        : cell
                ));

                setTimeout(() => {
                    setCells(prev => prev.filter(cell => cell.type === 'human'));
                    setTestResults(prev => [...prev, 'selective']);
                    setCurrentTest(prev => prev + 1);
                    setStep('result');
                    setIsAnimating(false);
                }, 1000);
            }, 1500);
        }
    };

    const getResultMessage = () => {
        const lastResult = testResults[testResults.length - 1];
        switch (lastResult) {
            case 'stain-all':
                return {
                    icon: '❌',
                    title: 'Failure! No Selectivity',
                    message: 'This molecule binds to ALL organic tissue. As a drug, this would cause massive side effects because it cannot distinguish between the "enemy" and the "host".',
                    color: '#3b82f6'
                };
            case 'kill-all':
                return {
                    icon: '☠️',
                    title: 'Danger! Systemic Toxicity',
                    message: 'While this molecule kills bacteria, it is equally toxic to human cells. In Drug Discovery, a high "Kill Rate" is useless if the Therapeutic Index is too low.',
                    color: '#ef4444'
                };
            case 'selective':
                return {
                    icon: '🎯',
                    title: 'Success! The Magic Bullet!',
                    message: 'You found the "Magic Bullet"! This synthetic dye selectively binds to bacterial structures. This discovery by Paul Ehrlich and Gerhard Domagk proved that chemical dyes could be targeted medicine.',
                    color: '#10b981'
                };
            default:
                return null;
        }
    };

    return (
        <div style={{
            background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.95) 100%)',
            borderRadius: '24px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            overflow: 'hidden'
        }}>
            {/* Header */}
            <div style={{
                padding: '1.5rem 2rem',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                background: 'rgba(0, 0, 0, 0.3)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '2rem' }}>🔬</span>
                    <h3 style={{
                        fontSize: '1.5rem',
                        fontWeight: 700,
                        color: 'white',
                        margin: 0
                    }}>
                        The Magic Bullet Explorer
                    </h3>
                </div>
                <p style={{ color: 'var(--neutral-400)', margin: 0, fontSize: '0.95rem' }}>
                    Discover how Paul Ehrlich&apos;s concept of selective targeting led to the first antibiotics
                </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', minHeight: '450px' }}>
                {/* Microscope Slide */}
                <div
                    ref={slideRef}
                    style={{
                        position: 'relative',
                        background: 'linear-gradient(180deg, #1a1a2e 0%, #16213e 100%)',
                        borderRight: '1px solid rgba(255, 255, 255, 0.1)',
                        overflow: 'hidden'
                    }}
                >
                    {/* Microscope overlay effect */}
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'radial-gradient(circle at center, transparent 60%, rgba(0,0,0,0.5) 100%)',
                        pointerEvents: 'none',
                        zIndex: 10
                    }} />

                    {/* Grid pattern */}
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
                        backgroundSize: '40px 40px',
                        pointerEvents: 'none'
                    }} />

                    {/* Cells */}
                    <AnimatePresence>
                        {cells.map(cell => (
                            <motion.div
                                key={cell.id}
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{
                                    scale: 1,
                                    opacity: cell.state === 'dead' ? 0.3 : 1,
                                    x: cell.x,
                                    y: cell.y
                                }}
                                exit={{ scale: 0, opacity: 0 }}
                                transition={{ duration: 0.5 }}
                                style={{
                                    position: 'absolute',
                                    width: cell.size,
                                    height: cell.type === 'bacteria' ? cell.size * 2.5 : cell.size,
                                    borderRadius: cell.type === 'bacteria' ? '40%' : '50%',
                                    background: cell.color,
                                    border: cell.type === 'human'
                                        ? '2px solid rgba(255, 255, 255, 0.3)'
                                        : '1px solid rgba(255, 255, 255, 0.2)',
                                    boxShadow: cell.state === 'stained'
                                        ? `0 0 20px ${cell.color}`
                                        : 'none',
                                    transform: cell.type === 'bacteria' ? 'rotate(45deg)' : 'none'
                                }}
                            >
                                {/* Nucleus for human cells */}
                                {cell.type === 'human' && cell.state !== 'dead' && (
                                    <div style={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        width: '40%',
                                        height: '40%',
                                        borderRadius: '50%',
                                        background: cell.state === 'stained'
                                            ? 'rgba(0, 0, 100, 0.6)'
                                            : 'rgba(150, 100, 100, 0.6)',
                                        border: '1px solid rgba(255, 255, 255, 0.2)'
                                    }} />
                                )}
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {/* Legend */}
                    <div style={{
                        position: 'absolute',
                        bottom: '1rem',
                        left: '1rem',
                        display: 'flex',
                        gap: '1rem',
                        background: 'rgba(0, 0, 0, 0.6)',
                        padding: '0.5rem 1rem',
                        borderRadius: '8px',
                        fontSize: '0.75rem',
                        zIndex: 20
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <div style={{ width: 16, height: 16, borderRadius: '50%', background: 'rgba(255, 200, 180, 0.8)' }} />
                            <span style={{ color: 'var(--neutral-300)' }}>Human Cell</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <div style={{ width: 10, height: 20, borderRadius: '40%', background: 'rgba(180, 180, 200, 0.9)', transform: 'rotate(45deg)' }} />
                            <span style={{ color: 'var(--neutral-300)' }}>Bacteria</span>
                        </div>
                    </div>
                </div>

                {/* Control Panel */}
                <div style={{
                    padding: '1.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    background: 'rgba(0, 0, 0, 0.2)'
                }}>
                    {step === 'intro' && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            <div style={{
                                padding: '1rem',
                                background: 'rgba(139, 92, 246, 0.1)',
                                borderRadius: '12px',
                                border: '1px solid rgba(139, 92, 246, 0.3)',
                                marginBottom: '1rem'
                            }}>
                                <p style={{
                                    color: 'var(--neutral-300)',
                                    fontSize: '0.9rem',
                                    margin: 0,
                                    lineHeight: 1.6
                                }}>
                                    🧪 <strong>Welcome to the 19th-century lab!</strong><br /><br />
                                    Your goal is to find a molecule that can identify and destroy bacteria
                                    <strong style={{ color: '#10b981' }}> without harming the human patient</strong>.
                                </p>
                            </div>

                            <p style={{
                                color: 'var(--neutral-400)',
                                fontSize: '0.85rem',
                                marginBottom: '1rem'
                            }}>
                                Select a compound to test:
                            </p>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                {COMPOUNDS.map(compound => (
                                    <motion.button
                                        key={compound.id}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => {
                                            setStep('testing');
                                            applyCompound(compound);
                                        }}
                                        disabled={isAnimating}
                                        style={{
                                            padding: '1rem',
                                            background: 'rgba(255, 255, 255, 0.05)',
                                            border: `2px solid ${compound.color}40`,
                                            borderRadius: '12px',
                                            cursor: isAnimating ? 'not-allowed' : 'pointer',
                                            textAlign: 'left',
                                            opacity: isAnimating ? 0.5 : 1
                                        }}
                                    >
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                            <div style={{
                                                width: 40,
                                                height: 50,
                                                background: `linear-gradient(180deg, ${compound.color}40 0%, ${compound.color} 100%)`,
                                                borderRadius: '6px 6px 12px 12px',
                                                border: '2px solid rgba(255,255,255,0.3)',
                                                position: 'relative'
                                            }}>
                                                <div style={{
                                                    position: 'absolute',
                                                    top: -6,
                                                    left: '50%',
                                                    transform: 'translateX(-50%)',
                                                    width: 16,
                                                    height: 8,
                                                    background: '#555',
                                                    borderRadius: '4px 4px 0 0'
                                                }} />
                                            </div>
                                            <div>
                                                <div style={{
                                                    color: 'white',
                                                    fontWeight: 600,
                                                    fontSize: '0.95rem'
                                                }}>
                                                    {compound.name}
                                                </div>
                                                <div style={{
                                                    color: 'var(--neutral-400)',
                                                    fontSize: '0.8rem'
                                                }}>
                                                    {compound.fullName}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {step === 'testing' && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            style={{ textAlign: 'center', padding: '2rem 0' }}
                        >
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                                style={{ fontSize: '3rem', marginBottom: '1rem' }}
                            >
                                🧪
                            </motion.div>
                            <p style={{ color: 'var(--neutral-300)' }}>
                                Applying {selectedCompound?.fullName}...
                            </p>
                        </motion.div>
                    )}

                    {step === 'result' && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            {(() => {
                                const result = getResultMessage();
                                if (!result) return null;

                                return (
                                    <div style={{
                                        padding: '1.25rem',
                                        background: `${result.color}15`,
                                        borderRadius: '12px',
                                        border: `1px solid ${result.color}40`
                                    }}>
                                        <div style={{
                                            fontSize: '2.5rem',
                                            textAlign: 'center',
                                            marginBottom: '0.75rem'
                                        }}>
                                            {result.icon}
                                        </div>
                                        <h4 style={{
                                            color: result.color,
                                            textAlign: 'center',
                                            marginBottom: '0.75rem',
                                            fontSize: '1.1rem'
                                        }}>
                                            {result.title}
                                        </h4>
                                        <p style={{
                                            color: 'var(--neutral-300)',
                                            fontSize: '0.85rem',
                                            lineHeight: 1.6,
                                            margin: 0
                                        }}>
                                            {result.message}
                                        </p>
                                    </div>
                                );
                            })()}

                            <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
                                {testResults[testResults.length - 1] === 'selective' ? (
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => setShowRevelation(true)}
                                        style={{
                                            flex: 1,
                                            padding: '0.75rem',
                                            background: 'linear-gradient(135deg, #10b981, #059669)',
                                            border: 'none',
                                            borderRadius: '10px',
                                            color: 'white',
                                            fontWeight: 600,
                                            cursor: 'pointer'
                                        }}
                                    >
                                        🧬 See Molecular Secret
                                    </motion.button>
                                ) : (
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={resetSimulation}
                                        style={{
                                            flex: 1,
                                            padding: '0.75rem',
                                            background: 'var(--neutral-700)',
                                            border: 'none',
                                            borderRadius: '10px',
                                            color: 'white',
                                            fontWeight: 500,
                                            cursor: 'pointer'
                                        }}
                                    >
                                        🔄 Try Again
                                    </motion.button>
                                )}
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>

            {/* Molecular Revelation Modal */}
            <AnimatePresence>
                {showRevelation && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            background: 'rgba(0, 0, 0, 0.9)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 1000,
                            padding: '2rem'
                        }}
                        onClick={() => setShowRevelation(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            onClick={e => e.stopPropagation()}
                            style={{
                                background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
                                borderRadius: '24px',
                                padding: '2rem',
                                maxWidth: '700px',
                                width: '100%',
                                border: '1px solid rgba(255, 255, 255, 0.1)'
                            }}
                        >
                            <h3 style={{
                                color: 'white',
                                textAlign: 'center',
                                marginBottom: '1.5rem',
                                fontSize: '1.5rem'
                            }}>
                                🧬 The Molecular Revelation
                            </h3>

                            {/* Transformation Animation */}
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '2rem',
                                marginBottom: '2rem',
                                flexWrap: 'wrap'
                            }}>
                                {/* Prontosil */}
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{
                                        width: 150,
                                        height: 150,
                                        background: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)',
                                        borderRadius: '16px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginBottom: '0.75rem',
                                        border: '2px solid #dc2626',
                                        boxShadow: '0 0 30px rgba(220, 38, 38, 0.3)'
                                    }}>
                                        <div style={{ color: 'white', fontWeight: 700, fontSize: '1.2rem' }}>
                                            Prontosil<br />
                                            <span style={{ fontSize: '0.8rem', opacity: 0.8 }}>
                                                (Red Azo Dye)
                                            </span>
                                        </div>
                                    </div>
                                    <div style={{ color: 'var(--neutral-400)', fontSize: '0.85rem' }}>
                                        Contains <strong style={{ color: '#dc2626' }}>N=N</strong> bond
                                    </div>
                                </div>

                                {/* Arrow */}
                                <motion.div
                                    animate={{ x: [0, 10, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                    style={{
                                        fontSize: '2rem',
                                        color: '#10b981'
                                    }}
                                >
                                    ⚡→
                                </motion.div>

                                {/* Sulfanilamide */}
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{
                                        width: 150,
                                        height: 150,
                                        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                                        borderRadius: '16px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginBottom: '0.75rem',
                                        border: '2px solid #10b981',
                                        boxShadow: '0 0 30px rgba(16, 185, 129, 0.3)'
                                    }}>
                                        <div style={{ color: 'white', fontWeight: 700, fontSize: '1.1rem' }}>
                                            Sulfanilamide<br />
                                            <span style={{ fontSize: '0.75rem', opacity: 0.8 }}>
                                                (Active Drug)
                                            </span>
                                        </div>
                                    </div>
                                    <div style={{ color: 'var(--neutral-400)', fontSize: '0.85rem' }}>
                                        Contains <strong style={{ color: '#10b981' }}>-SO₂NH₂</strong> group
                                    </div>
                                </div>
                            </div>

                            {/* Explanation */}
                            <div style={{
                                background: 'rgba(16, 185, 129, 0.1)',
                                borderRadius: '12px',
                                padding: '1.25rem',
                                border: '1px solid rgba(16, 185, 129, 0.3)'
                            }}>
                                <p style={{
                                    color: 'var(--neutral-200)',
                                    fontSize: '0.95rem',
                                    lineHeight: 1.7,
                                    margin: 0
                                }}>
                                    <strong style={{ color: '#10b981' }}>💡 Key Insight:</strong><br /><br />
                                    In the human body, the Azo bond (<strong>N=N</strong>) of Prontosil is
                                    <strong> metabolized</strong>, releasing <strong>Sulfanilamide</strong> — the
                                    first commercially successful antibacterial drug!<br /><br />
                                    This proves that the <strong>Aromatic Scaffolds</strong> originally developed
                                    for the fashion industry were the secret keys to the antibiotic revolution.
                                </p>
                            </div>

                            <button
                                onClick={() => {
                                    setShowRevelation(false);
                                    resetSimulation();
                                }}
                                style={{
                                    marginTop: '1.5rem',
                                    width: '100%',
                                    padding: '1rem',
                                    background: 'var(--neutral-700)',
                                    border: 'none',
                                    borderRadius: '12px',
                                    color: 'white',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    fontSize: '1rem'
                                }}
                            >
                                ✅ Complete Simulation
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
