'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';

// Dynamic import for 3D viewer
const MoleculeViewer3D = dynamic(() => import('../MoleculeViewer'), {
    ssr: false,
    loading: () => (
        <div style={{
            height: '200px',
            background: 'rgba(0,0,0,0.3)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--neutral-400)'
        }}>
            Loading 3D structure...
        </div>
    )
});

// Molecule data with functional groups
const SULFA_MOLECULES = [
    {
        id: 'prontosil',
        name: 'Prontosil',
        formula: 'C₁₂H₁₃N₅O₂S',
        pubchemCid: 66895,
        mw: 291.33,
        color: '#dc2626',
        role: 'The first commercially available antibacterial drug (1935)',
        discoverer: 'Gerhard Domagk',
        functionalGroups: [
            {
                name: 'Azo Group',
                symbol: '-N=N-',
                color: '#f97316',
                role: 'Chromophore - Gives red color',
                drugEffect: 'Metabolized in the body, releasing the active drug'
            },
            {
                name: 'Sulfonamide',
                symbol: '-SO₂NH₂',
                color: '#10b981',
                role: 'Active antibacterial group',
                drugEffect: 'Inhibits bacterial folic acid synthesis'
            },
            {
                name: 'Aniline Groups',
                symbol: '-NH₂ (×2)',
                color: '#3b82f6',
                role: 'Aromatic amines from dye chemistry',
                drugEffect: 'Provide structural scaffold for drug binding'
            }
        ]
    },
    {
        id: 'sulfanilamide',
        name: 'Sulfanilamide',
        formula: 'C₆H₈N₂O₂S',
        pubchemCid: 5333,
        mw: 172.20,
        color: '#10b981',
        role: 'The active metabolite of Prontosil - the true antibiotic',
        discoverer: 'Jacques & Thérèse Tréfouël (1935)',
        functionalGroups: [
            {
                name: 'Sulfonamide',
                symbol: '-SO₂NH₂',
                color: '#10b981',
                role: 'Active antibacterial group',
                drugEffect: 'Competitively inhibits bacterial dihydropteroate synthase'
            },
            {
                name: 'Para-Amino',
                symbol: 'p-NH₂',
                color: '#3b82f6',
                role: 'Mimics PABA (para-aminobenzoic acid)',
                drugEffect: 'Tricks bacteria into incorporating drug instead of PABA'
            },
            {
                name: 'Benzene Ring',
                symbol: 'C₆H₄',
                color: '#8b5cf6',
                role: 'Aromatic core from aniline',
                drugEffect: 'Provides rigidity and proper spacing for enzyme binding'
            }
        ]
    }
];

// Story phases
const STORY_PHASES = [
    {
        phase: 'dye-origins',
        title: '🏭 The Dye Factory Origins',
        year: '1850s-1920s',
        content: `The giants of pharmaceuticals (Bayer, BASF, Hoechst) started as **dye manufacturers**. 
        Scientists quickly realized that the same aromatic building blocks used for vibrant dyes—especially 
        **Aniline** and **Phenol**—could build biologically active molecules.`
    },
    {
        phase: 'magic-bullet',
        title: '🎯 The Magic Bullet Theory',
        year: '1900s',
        content: `Nobel laureate **Paul Ehrlich** noticed that certain dyes would stain specific bacteria 
        while leaving human cells untouched. His revolutionary idea: *If a dye can selectively target a 
        bacterium to color it, could we attach a toxic "warhead" to kill bacteria without harming the host?*`
    },
    {
        phase: 'sulfa-breakthrough',
        title: '💊 The Sulfa Breakthrough',
        year: '1935',
        content: `**Gerhard Domagk** at Bayer tested a red azo dye called **Prontosil**. It was inactive 
        in test tubes but miraculously cured bacterial infections in mice! The secret: the human body 
        metabolizes the dye, releasing **Sulfanilamide**—the first true antibiotic.`
    }
];

type ViewMode = '2d' | '3d';

export default function SulfaDrugDiscoveryPanel() {
    const [selectedMolecule, setSelectedMolecule] = useState(SULFA_MOLECULES[0]);
    const [viewMode, setViewMode] = useState<ViewMode>('2d');
    const [activePhase, setActivePhase] = useState(0);
    const [hoveredGroup, setHoveredGroup] = useState<string | null>(null);
    const [image2dUrl, setImage2dUrl] = useState<string | null>(null);
    const [imageLoading, setImageLoading] = useState(true);

    // Fetch 2D structure from PubChem
    useEffect(() => {
        setImageLoading(true);
        const url = `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${selectedMolecule.pubchemCid}/PNG?image_size=300x300`;
        setImage2dUrl(url);
        setImageLoading(false);
    }, [selectedMolecule]);

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
                background: 'linear-gradient(135deg, rgba(220, 38, 38, 0.1) 0%, rgba(16, 185, 129, 0.1) 100%)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '2rem' }}>🧬</span>
                    <h3 style={{
                        fontSize: '1.5rem',
                        fontWeight: 700,
                        color: 'white',
                        margin: 0
                    }}>
                        The Chemical Cousins Hypothesis
                    </h3>
                </div>
                <p style={{ color: 'var(--neutral-400)', margin: 0, fontSize: '0.95rem' }}>
                    How dye chemistry gave birth to the antibiotic revolution
                </p>
            </div>

            {/* Story Timeline */}
            <div style={{
                padding: '1.5rem 2rem',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                    {STORY_PHASES.map((phase, idx) => (
                        <button
                            key={phase.phase}
                            onClick={() => setActivePhase(idx)}
                            style={{
                                flex: 1,
                                padding: '0.75rem',
                                background: activePhase === idx
                                    ? 'rgba(139, 92, 246, 0.2)'
                                    : 'rgba(255, 255, 255, 0.05)',
                                border: activePhase === idx
                                    ? '1px solid rgba(139, 92, 246, 0.5)'
                                    : '1px solid rgba(255, 255, 255, 0.1)',
                                borderRadius: '10px',
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}
                        >
                            <div style={{
                                fontSize: '0.85rem',
                                fontWeight: 600,
                                color: activePhase === idx ? 'var(--primary-400)' : 'var(--neutral-400)'
                            }}>
                                {phase.title.split(' ')[0]}
                            </div>
                            <div style={{
                                fontSize: '0.7rem',
                                color: 'var(--neutral-500)',
                                marginTop: '0.25rem'
                            }}>
                                {phase.year}
                            </div>
                        </button>
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={activePhase}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        style={{
                            padding: '1.25rem',
                            background: 'rgba(0, 0, 0, 0.3)',
                            borderRadius: '12px'
                        }}
                    >
                        <h4 style={{
                            color: 'var(--primary-400)',
                            marginBottom: '0.75rem',
                            fontSize: '1.1rem'
                        }}>
                            {STORY_PHASES[activePhase].title}
                        </h4>
                        <p style={{
                            color: 'var(--neutral-300)',
                            lineHeight: 1.7,
                            margin: 0,
                            fontSize: '0.95rem'
                        }}>
                            {STORY_PHASES[activePhase].content}
                        </p>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Molecule Explorer */}
            <div style={{ padding: '1.5rem 2rem' }}>
                <h4 style={{
                    color: 'white',
                    marginBottom: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                }}>
                    💊 Explore the Molecules
                </h4>

                {/* Molecule Selection */}
                <div style={{
                    display: 'flex',
                    gap: '0.75rem',
                    marginBottom: '1.5rem'
                }}>
                    {SULFA_MOLECULES.map(mol => (
                        <motion.button
                            key={mol.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setSelectedMolecule(mol)}
                            style={{
                                flex: 1,
                                padding: '1rem',
                                background: selectedMolecule.id === mol.id
                                    ? `${mol.color}20`
                                    : 'rgba(255, 255, 255, 0.05)',
                                border: selectedMolecule.id === mol.id
                                    ? `2px solid ${mol.color}`
                                    : '2px solid rgba(255, 255, 255, 0.1)',
                                borderRadius: '12px',
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}
                        >
                            <div style={{
                                fontSize: '1.1rem',
                                fontWeight: 700,
                                color: selectedMolecule.id === mol.id ? mol.color : 'var(--neutral-300)'
                            }}>
                                {mol.name}
                            </div>
                            <div style={{
                                fontSize: '0.8rem',
                                color: 'var(--neutral-500)',
                                marginTop: '0.25rem'
                            }}>
                                {mol.formula}
                            </div>
                        </motion.button>
                    ))}
                </div>

                {/* Structure Viewer */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '1.5rem'
                }}>
                    {/* Left: Structure View */}
                    <div>
                        {/* View Toggle */}
                        <div style={{
                            display: 'flex',
                            gap: '0.5rem',
                            marginBottom: '1rem'
                        }}>
                            <button
                                onClick={() => setViewMode('2d')}
                                style={{
                                    padding: '0.5rem 1rem',
                                    background: viewMode === '2d' ? 'var(--primary-500)' : 'var(--neutral-800)',
                                    border: 'none',
                                    borderRadius: '8px',
                                    color: 'white',
                                    fontWeight: 500,
                                    cursor: 'pointer'
                                }}
                            >
                                2D Structure
                            </button>
                            <button
                                onClick={() => setViewMode('3d')}
                                style={{
                                    padding: '0.5rem 1rem',
                                    background: viewMode === '3d' ? 'var(--primary-500)' : 'var(--neutral-800)',
                                    border: 'none',
                                    borderRadius: '8px',
                                    color: 'white',
                                    fontWeight: 500,
                                    cursor: 'pointer'
                                }}
                            >
                                3D Structure
                            </button>
                        </div>

                        {/* Structure Display */}
                        <div style={{
                            background: viewMode === '2d' ? 'white' : 'rgba(0,0,0,0.3)',
                            borderRadius: '16px',
                            overflow: 'hidden',
                            border: `2px solid ${selectedMolecule.color}40`
                        }}>
                            {viewMode === '2d' ? (
                                <div style={{
                                    height: '280px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    position: 'relative'
                                }}>
                                    {image2dUrl && (
                                        <img
                                            src={image2dUrl}
                                            alt={selectedMolecule.name}
                                            style={{
                                                maxWidth: '100%',
                                                maxHeight: '100%',
                                                objectFit: 'contain'
                                            }}
                                        />
                                    )}
                                </div>
                            ) : (
                                <div style={{ height: '280px' }}>
                                    <MoleculeViewer3D
                                        moleculeName={selectedMolecule.name}
                                        height={280}
                                    />
                                </div>
                            )}
                        </div>

                        {/* Molecule Info */}
                        <div style={{
                            marginTop: '1rem',
                            padding: '1rem',
                            background: `${selectedMolecule.color}10`,
                            borderRadius: '12px',
                            border: `1px solid ${selectedMolecule.color}30`
                        }}>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                marginBottom: '0.5rem',
                                fontSize: '0.85rem'
                            }}>
                                <span style={{ color: 'var(--neutral-400)' }}>Formula:</span>
                                <span style={{ color: 'white', fontWeight: 600 }}>{selectedMolecule.formula}</span>
                            </div>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                marginBottom: '0.5rem',
                                fontSize: '0.85rem'
                            }}>
                                <span style={{ color: 'var(--neutral-400)' }}>Molecular Weight:</span>
                                <span style={{ color: 'white', fontWeight: 600 }}>{selectedMolecule.mw} g/mol</span>
                            </div>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                fontSize: '0.85rem'
                            }}>
                                <span style={{ color: 'var(--neutral-400)' }}>Discovered by:</span>
                                <span style={{ color: 'white', fontWeight: 600 }}>{selectedMolecule.discoverer}</span>
                            </div>
                        </div>
                    </div>

                    {/* Right: Functional Groups */}
                    <div>
                        <h5 style={{
                            color: 'var(--neutral-300)',
                            marginBottom: '1rem',
                            fontSize: '0.95rem'
                        }}>
                            🔬 Functional Groups (Click for details)
                        </h5>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {selectedMolecule.functionalGroups.map((group, idx) => (
                                <motion.div
                                    key={group.name}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    onClick={() => setHoveredGroup(
                                        hoveredGroup === group.name ? null : group.name
                                    )}
                                    style={{
                                        padding: '1rem',
                                        background: hoveredGroup === group.name
                                            ? `${group.color}20`
                                            : 'rgba(255, 255, 255, 0.05)',
                                        borderRadius: '12px',
                                        border: `2px solid ${group.color}${hoveredGroup === group.name ? '' : '40'}`,
                                        cursor: 'pointer',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.75rem',
                                        marginBottom: hoveredGroup === group.name ? '0.75rem' : 0
                                    }}>
                                        <div style={{
                                            width: 40,
                                            height: 40,
                                            borderRadius: '10px',
                                            background: `${group.color}30`,
                                            border: `2px solid ${group.color}`,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontWeight: 700,
                                            fontSize: '0.7rem',
                                            color: group.color
                                        }}>
                                            {group.symbol}
                                        </div>
                                        <div>
                                            <div style={{
                                                color: 'white',
                                                fontWeight: 600,
                                                fontSize: '0.95rem'
                                            }}>
                                                {group.name}
                                            </div>
                                            <div style={{
                                                color: 'var(--neutral-500)',
                                                fontSize: '0.8rem'
                                            }}>
                                                {group.role}
                                            </div>
                                        </div>
                                    </div>

                                    <AnimatePresence>
                                        {hoveredGroup === group.name && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                style={{
                                                    padding: '0.75rem',
                                                    background: 'rgba(0, 0, 0, 0.3)',
                                                    borderRadius: '8px'
                                                }}
                                            >
                                                <div style={{
                                                    color: 'var(--neutral-400)',
                                                    fontSize: '0.8rem',
                                                    marginBottom: '0.25rem'
                                                }}>
                                                    Drug Discovery Role:
                                                </div>
                                                <div style={{
                                                    color: group.color,
                                                    fontSize: '0.9rem',
                                                    fontWeight: 500
                                                }}>
                                                    {group.drugEffect}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            ))}
                        </div>

                        {/* Key Insight */}
                        <div style={{
                            marginTop: '1.5rem',
                            padding: '1rem',
                            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
                            borderRadius: '12px',
                            border: '1px solid rgba(16, 185, 129, 0.3)'
                        }}>
                            <div style={{
                                fontSize: '0.85rem',
                                color: '#10b981',
                                fontWeight: 600,
                                marginBottom: '0.5rem'
                            }}>
                                💡 Key Insight
                            </div>
                            <p style={{
                                color: 'var(--neutral-300)',
                                fontSize: '0.85rem',
                                lineHeight: 1.6,
                                margin: 0
                            }}>
                                {selectedMolecule.role}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
