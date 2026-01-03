'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import EnergyGapNavigator from './EnergyGapNavigator';

interface DiscoveryTool {
    id: string;
    icon: string;
    title: string;
    subtitle: string;
    color: string;
    description: string;
    howItWorks: string[];
    realWorldExample: string;
    interactiveDemo?: {
        type: 'fluorescence' | 'spr' | 'imaging';
        data: any;
    };
}

const DISCOVERY_TOOLS: DiscoveryTool[] = [
    {
        id: 'fluorescent-probes',
        icon: '💡',
        title: 'Fluorescent Molecular Probes',
        subtitle: 'Making the invisible visible',
        color: '#eab308',
        description: 'Most drugs and biomolecules are colorless. Researchers attach highly conjugated "fluorescent tags" to see where drugs travel inside cells.',
        howItWorks: [
            'Synthesize drug with a covalently attached fluorophore (e.g., FITC, rhodamine)',
            'Add tagged drug to cells in culture',
            'Use fluorescence microscopy to track the glowing drug',
            'Map exactly which organelles or receptors the drug binds to'
        ],
        realWorldExample: 'Fluorescein-labeled Taxol is used to visualize how this cancer drug binds to microtubules during cell division, helping optimize dosing schedules.',
        interactiveDemo: {
            type: 'fluorescence',
            data: {
                excitation: 495,
                emission: 519,
                stokesShift: 24
            }
        }
    },
    {
        id: 'bio-imaging',
        icon: '🔬',
        title: 'Bio-Imaging & Cellular Tracking',
        subtitle: 'Watching drugs in real-time',
        color: '#22c55e',
        description: 'Fluorescence microscopy allows scientists to watch drug molecules moving through living cells in real-time, revealing their mechanism of action.',
        howItWorks: [
            'Live cells on microscope stage',
            'Add fluorescently-tagged drug',
            'Time-lapse imaging captures drug distribution',
            'Quantify drug concentration in different compartments',
            'Correlate location with therapeutic effect'
        ],
        realWorldExample: 'GFP-tagged insulin receptors revealed that diabetes drugs like Metformin enhance receptor recycling to the cell surface.',
        interactiveDemo: {
            type: 'imaging',
            data: {
                compartments: ['Membrane', 'Cytoplasm', 'Nucleus', 'Mitochondria']
            }
        }
    },
    {
        id: 'spr',
        icon: '⚛️',
        title: 'Structure-Property Relationship (SPR)',
        subtitle: 'Predicting color from structure',
        color: '#8b5cf6',
        description: 'Using quantum mechanics, drug designers predict how adding functional groups changes a molecule\'s electronic properties, color, and biological potency.',
        howItWorks: [
            'Calculate HOMO-LUMO gap using DFT (Density Functional Theory)',
            'Predict absorption wavelength from ΔE = hc/λ',
            'Model how -OH, -NO₂, -NH₂ groups shift the gap',
            'Correlate electronic properties with receptor binding',
            'Design drugs with optimal color for tracking'
        ],
        realWorldExample: 'Adding a para-amino group (-NH2) to phenazopyridine shifts its absorption 30nm toward red, intensifying its orange color.',
        interactiveDemo: {
            type: 'spr',
            data: {
                baseGap: 3.1,
                modifications: [
                    { group: '-OH', shift: -0.15 },
                    { group: '-NO₂', shift: 0.25 },
                    { group: '-NH₂', shift: -0.35 }
                ]
            }
        }
    },
    {
        id: 'chromophore-design',
        icon: '🎨',
        title: 'Chromophore Engineering',
        subtitle: 'Designing color into drugs',
        color: '#ec4899',
        description: 'Drug designers intentionally build chromophores into molecules to create built-in compliance markers, enabling visual confirmation that patients are taking their medication.',
        howItWorks: [
            'Identify metabolically stable positions in drug scaffold',
            'Attach chromophore without blocking active site',
            'Ensure chromophore survives liver metabolism',
            'Choose color distinct from natural body fluids',
            'Validate that color change correlates with drug levels'
        ],
        realWorldExample: 'Rifampicin\'s red-orange color is used globally to confirm TB patients are taking their 6-month treatment regimen correctly.',
        interactiveDemo: {
            type: 'spr',
            data: { extended: true }
        }
    }
];

const FUNCTIONAL_GROUP_EFFECTS = [
    { group: '-OH (Hydroxyl)', effect: 'Increases water solubility, enables H-bonding with receptors', color: '#3b82f6' },
    { group: '-NH₂ (Amino)', effect: 'Electron donation extends conjugation (red-shift), protonation at physiological pH', color: '#8b5cf6' },
    { group: '-NO₂ (Nitro)', effect: 'Electron withdrawal shortens conjugation (blue-shift), metabolic activation', color: '#ef4444' },
    { group: '-COOH (Carboxyl)', effect: 'Ionizes at pH 7 (negative charge), plasma protein binding', color: '#f97316' },
    { group: '-F (Fluoro)', effect: 'Metabolic stability, lipophilicity increase, no color change', color: '#06b6d4' },
    { group: 'C=C (Alkene)', effect: 'Extends conjugation (red-shift), potential Michael acceptor', color: '#22c55e' },
];

export default function DrugDiscoveryTools() {
    const [activeSection, setActiveSection] = useState('fluorescent-probes');
    const [hoveredGroup, setHoveredGroup] = useState<string | null>(null);

    return (
        <div style={{ padding: '1.5rem 0' }}>
            {/* Premium Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ textAlign: 'center', marginBottom: '2rem' }}
            >
                <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '6px 16px',
                    background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(236, 72, 153, 0.2) 100%)',
                    borderRadius: '20px',
                    marginBottom: '1rem'
                }}>
                    <span style={{ fontSize: '0.75rem', color: '#a78bfa' }}>✨ EXCLUSIVE CONTENT</span>
                </div>
                <h2 style={{
                    fontSize: '2rem',
                    fontWeight: 800,
                    background: 'linear-gradient(135deg, #a78bfa 0%, #ec4899 50%, #f97316 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    marginBottom: '0.75rem'
                }}>
                    🧬 Drug Discovery: Colors as Research Tools
                </h2>
                <p style={{ color: '#94a3b8', fontSize: '1.1rem', maxWidth: '700px', margin: '0 auto', lineHeight: 1.6 }}>
                    In modern drug design, we manipulate color to "see" the invisible interactions between drugs and the human body
                </p>
            </motion.div>

            {/* Tool Selector Tabs */}
            <div style={{
                display: 'flex',
                gap: '0.5rem',
                padding: '0.5rem',
                background: 'rgba(0,0,0,0.3)',
                borderRadius: '16px',
                marginBottom: '1.5rem',
                flexWrap: 'wrap'
            }}>
                {DISCOVERY_TOOLS.map(tool => (
                    <motion.button
                        key={tool.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setActiveSection(tool.id)}
                        style={{
                            flex: 1,
                            minWidth: '140px',
                            padding: '0.75rem',
                            background: activeSection === tool.id
                                ? `linear-gradient(135deg, ${tool.color}30 0%, ${tool.color}10 100%)`
                                : 'transparent',
                            border: activeSection === tool.id
                                ? `1px solid ${tool.color}50`
                                : '1px solid transparent',
                            borderRadius: '12px',
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                        }}
                    >
                        <div style={{ fontSize: '1.5rem', marginBottom: '4px' }}>{tool.icon}</div>
                        <div style={{
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            color: activeSection === tool.id ? tool.color : '#94a3b8'
                        }}>
                            {tool.title.split(':')[0]}
                        </div>
                    </motion.button>
                ))}
            </div>

            {/* Active Tool Content */}
            {DISCOVERY_TOOLS.filter(t => t.id === activeSection).map(tool => (
                <motion.div
                    key={tool.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                        background: 'rgba(255, 255, 255, 0.03)',
                        borderRadius: '20px',
                        border: `1px solid ${tool.color}30`,
                        overflow: 'hidden'
                    }}
                >
                    {/* Tool Header */}
                    <div style={{
                        padding: '1.5rem',
                        background: `linear-gradient(135deg, ${tool.color}15 0%, transparent 100%)`,
                        borderBottom: `1px solid ${tool.color}20`
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '0.75rem' }}>
                            <span style={{ fontSize: '2.5rem' }}>{tool.icon}</span>
                            <div>
                                <h3 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 700, color: tool.color }}>
                                    {tool.title}
                                </h3>
                                <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>{tool.subtitle}</span>
                            </div>
                        </div>
                        <p style={{ margin: 0, color: '#cbd5e1', fontSize: '1rem', lineHeight: 1.6 }}>
                            {tool.description}
                        </p>
                    </div>

                    {/* How It Works */}
                    <div style={{ padding: '1.5rem' }}>
                        <h4 style={{ margin: '0 0 1rem', color: 'white', fontSize: '1.1rem' }}>
                            🔧 How It Works
                        </h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {tool.howItWorks.map((step, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    style={{
                                        display: 'flex',
                                        gap: '12px',
                                        padding: '0.75rem',
                                        background: 'rgba(0,0,0,0.2)',
                                        borderRadius: '10px',
                                        borderLeft: `3px solid ${tool.color}`
                                    }}
                                >
                                    <span style={{
                                        width: '24px',
                                        height: '24px',
                                        borderRadius: '50%',
                                        background: tool.color,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '0.75rem',
                                        fontWeight: 700,
                                        color: 'white',
                                        flexShrink: 0
                                    }}>
                                        {idx + 1}
                                    </span>
                                    <span style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>{step}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Real World Example */}
                    <div style={{
                        margin: '0 1.5rem 1.5rem',
                        padding: '1.25rem',
                        background: `linear-gradient(135deg, ${tool.color}10 0%, transparent 100%)`,
                        borderRadius: '12px',
                        border: `1px solid ${tool.color}25`
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem' }}>
                            <span style={{ fontSize: '1.2rem' }}>🏭</span>
                            <span style={{ fontWeight: 600, color: tool.color }}>Real-World Application</span>
                        </div>
                        <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.6 }}>
                            {tool.realWorldExample}
                        </p>
                    </div>
                </motion.div>
            ))}

            {/* Functional Group Effects Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                style={{
                    marginTop: '2rem',
                    padding: '1.5rem',
                    background: 'rgba(255, 255, 255, 0.03)',
                    borderRadius: '20px',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
            >
                <h3 style={{
                    margin: '0 0 1rem',
                    fontSize: '1.3rem',
                    fontWeight: 700,
                    color: 'white'
                }}>
                    ⚗️ Functional Group Effects on Drug Properties
                </h3>
                <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
                    Each functional group modifies a drug's electronic distribution, color, and biological activity.
                    Hover to learn more:
                </p>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '0.75rem'
                }}>
                    {FUNCTIONAL_GROUP_EFFECTS.map((fg) => (
                        <motion.div
                            key={fg.group}
                            whileHover={{ scale: 1.02, y: -2 }}
                            onHoverStart={() => setHoveredGroup(fg.group)}
                            onHoverEnd={() => setHoveredGroup(null)}
                            style={{
                                padding: '1rem',
                                background: hoveredGroup === fg.group
                                    ? `linear-gradient(135deg, ${fg.color}20 0%, ${fg.color}05 100%)`
                                    : 'rgba(0,0,0,0.2)',
                                borderRadius: '12px',
                                border: `1px solid ${hoveredGroup === fg.group ? fg.color + '50' : 'transparent'}`,
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}
                        >
                            <div style={{
                                fontSize: '1rem',
                                fontWeight: 700,
                                color: fg.color,
                                marginBottom: '0.5rem'
                            }}>
                                {fg.group}
                            </div>
                            <p style={{
                                margin: 0,
                                fontSize: '0.8rem',
                                color: '#94a3b8',
                                lineHeight: 1.5
                            }}>
                                {fg.effect}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Interactive Energy Gap Simulation */}
            <EnergyGapNavigator />

            {/* The Quantum Foundation */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                style={{
                    marginTop: '2rem',
                    padding: '1.5rem',
                    background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
                    borderRadius: '20px',
                    border: '1px solid rgba(139, 92, 246, 0.2)'
                }}
            >
                <h3 style={{ margin: '0 0 1rem', fontSize: '1.3rem', fontWeight: 700, color: '#a78bfa' }}>
                    ⚡ The Governing Equation
                </h3>
                <div style={{
                    padding: '1.5rem',
                    background: 'rgba(0,0,0,0.3)',
                    borderRadius: '12px',
                    textAlign: 'center',
                    marginBottom: '1rem'
                }}>
                    <div style={{
                        fontSize: '1.8rem',
                        fontFamily: 'serif',
                        color: 'white',
                        marginBottom: '0.5rem'
                    }}>
                        ΔE = hν = hc/λ
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                        Energy gap = Planck's constant × frequency = hc / wavelength
                    </div>
                </div>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '1rem'
                }}>
                    {[
                        { symbol: 'ΔE', name: 'HOMO-LUMO Gap', description: 'Determines if visible light is absorbed' },
                        { symbol: 'h', name: "Planck's Constant", description: '6.626 × 10⁻³⁴ J·s' },
                        { symbol: 'c', name: 'Speed of Light', description: '3 × 10⁸ m/s' },
                        { symbol: 'λ', name: 'Wavelength', description: '400-700nm = visible spectrum' }
                    ].map(item => (
                        <div key={item.symbol} style={{
                            padding: '0.75rem',
                            background: 'rgba(0,0,0,0.2)',
                            borderRadius: '10px'
                        }}>
                            <span style={{ fontSize: '1.2rem', fontFamily: 'serif', color: '#a78bfa' }}>{item.symbol}</span>
                            <div style={{ fontSize: '0.75rem', color: 'white', fontWeight: 600 }}>{item.name}</div>
                            <div style={{ fontSize: '0.7rem', color: '#64748b' }}>{item.description}</div>
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
