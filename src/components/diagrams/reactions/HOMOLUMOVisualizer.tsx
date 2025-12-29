'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface OrbitalPair {
    id: string;
    nucleophile: string;
    nuFormula: string;
    electrophile: string;
    elFormula: string;
    homoEnergy: number;
    lumoEnergy: number;
    gapDescription: string;
    product: string;
    reaction: string;
}

const examples: OrbitalPair[] = [
    {
        id: 'nh3-bh3',
        nucleophile: 'Ammonia',
        nuFormula: 'NH₃',
        electrophile: 'Borane',
        elFormula: 'BH₃',
        homoEnergy: -10,
        lumoEnergy: -5,
        gapDescription: 'Small gap → Strong interaction! Perfect match.',
        product: 'H₃N→BH₃',
        reaction: 'NH₃ lone pair fills empty p orbital on B'
    },
    {
        id: 'oh-ch3br',
        nucleophile: 'Hydroxide',
        nuFormula: 'OH⁻',
        electrophile: 'Bromomethane',
        elFormula: 'CH₃Br',
        homoEnergy: -8,
        lumoEnergy: -2,
        gapDescription: 'Moderate gap → Good SN2 reaction.',
        product: 'CH₃OH + Br⁻',
        reaction: 'OH⁻ attacks C, displaces Br⁻'
    },
    {
        id: 'cn-ch2o',
        nucleophile: 'Cyanide',
        nuFormula: 'CN⁻',
        electrophile: 'Formaldehyde',
        elFormula: 'CH₂O',
        homoEnergy: -9,
        lumoEnergy: -3,
        gapDescription: 'Good match → C-C bond formation!',
        product: 'HOCH₂CN',
        reaction: 'CN⁻ attacks carbonyl C, π electrons go to O'
    },
    {
        id: 'alkene-hbr',
        nucleophile: 'Ethene',
        nuFormula: 'CH₂=CH₂',
        electrophile: 'HBr',
        elFormula: 'H-Br',
        homoEnergy: -10,
        lumoEnergy: -4,
        gapDescription: 'π bond as nucleophile → Addition reaction.',
        product: 'CH₃CH₂Br',
        reaction: 'π electrons attack H⁺, then Br⁻ adds'
    }
];

export default function HOMOLUMOVisualizer() {
    const [selected, setSelected] = useState(examples[0]);
    const [animating, setAnimating] = useState(false);
    const [showProducts, setShowProducts] = useState(false);

    const startAnimation = () => {
        setAnimating(true);
        setShowProducts(false);
        setTimeout(() => {
            setShowProducts(true);
            setAnimating(false);
        }, 2000);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
                background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.9), rgba(15, 23, 42, 0.95))',
                borderRadius: '20px',
                padding: '24px',
                border: '1px solid rgba(255,255,255,0.1)',
                marginBottom: '24px'
            }}
        >
            <h3 style={{ margin: '0 0 16px', color: '#f4f4f7', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span>⚛️</span> HOMO-LUMO Orbital Interaction
            </h3>

            {/* Example selector */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
                {examples.map(ex => (
                    <button
                        key={ex.id}
                        onClick={() => { setSelected(ex); setShowProducts(false); }}
                        style={{
                            padding: '8px 14px',
                            borderRadius: '10px',
                            border: selected.id === ex.id ? '2px solid #8b5cf6' : '1px solid rgba(255,255,255,0.1)',
                            background: selected.id === ex.id ? 'rgba(139,92,246,0.2)' : 'rgba(255,255,255,0.05)',
                            color: selected.id === ex.id ? '#c4b5fd' : '#94a3b8',
                            fontSize: '0.85rem',
                            fontWeight: 500,
                            cursor: 'pointer'
                        }}
                    >
                        {ex.nuFormula} + {ex.elFormula}
                    </button>
                ))}
            </div>

            {/* Visualization */}
            <div style={{
                background: 'rgba(0,0,0,0.3)',
                borderRadius: '16px',
                padding: '24px',
                marginBottom: '16px'
            }}>
                <svg width="100%" height="280" viewBox="0 0 500 280">
                    {/* Energy scale */}
                    <text x="30" y="30" fill="#64748b" fontSize="12">Energy</text>
                    <line x1="40" y1="40" x2="40" y2="240" stroke="#475569" strokeWidth="2" />
                    <polygon points="40,40 35,50 45,50" fill="#475569" />
                    <text x="15" y="80" fill="#64748b" fontSize="10">High</text>
                    <text x="15" y="220" fill="#64748b" fontSize="10">Low</text>

                    {/* Nucleophile side */}
                    <text x="120" y="30" textAnchor="middle" fill="#3b82f6" fontSize="14" fontWeight="bold">
                        {selected.nuFormula}
                    </text>
                    <text x="120" y="48" textAnchor="middle" fill="#64748b" fontSize="11">Nucleophile</text>

                    {/* HOMO orbital */}
                    <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <rect x="70" y={200 + selected.homoEnergy * 3} width="100" height="30" rx="8" fill="#3b82f6" opacity="0.3" />
                        <text x="120" y={220 + selected.homoEnergy * 3} textAnchor="middle" fill="#60a5fa" fontSize="12" fontWeight="bold">HOMO</text>
                        <circle cx="95" cy={215 + selected.homoEnergy * 3} r="6" fill="#fbbf24" />
                        <circle cx="145" cy={215 + selected.homoEnergy * 3} r="6" fill="#fbbf24" />
                        <text x="120" y={250 + selected.homoEnergy * 3} textAnchor="middle" fill="#94a3b8" fontSize="10">Filled (2e⁻)</text>
                    </motion.g>

                    {/* Electrophile side */}
                    <text x="380" y="30" textAnchor="middle" fill="#ef4444" fontSize="14" fontWeight="bold">
                        {selected.elFormula}
                    </text>
                    <text x="380" y="48" textAnchor="middle" fill="#64748b" fontSize="11">Electrophile</text>

                    {/* LUMO orbital */}
                    <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <rect x="330" y={200 + selected.lumoEnergy * 3} width="100" height="30" rx="8" fill="#ef4444" opacity="0.3" stroke="#ef4444" strokeDasharray="5,5" />
                        <text x="380" y={220 + selected.lumoEnergy * 3} textAnchor="middle" fill="#fca5a5" fontSize="12" fontWeight="bold">LUMO</text>
                        <text x="380" y={250 + selected.lumoEnergy * 3} textAnchor="middle" fill="#94a3b8" fontSize="10">Empty (0e⁻)</text>
                    </motion.g>

                    {/* Electron flow animation */}
                    <AnimatePresence>
                        {animating && (
                            <motion.g>
                                <motion.circle
                                    cx="120"
                                    cy={215 + selected.homoEnergy * 3}
                                    r="6"
                                    fill="#fbbf24"
                                    initial={{ x: 0 }}
                                    animate={{ x: 260, y: selected.lumoEnergy * 3 - selected.homoEnergy * 3 }}
                                    transition={{ duration: 1.5, ease: "easeInOut" }}
                                />
                                <motion.circle
                                    cx="120"
                                    cy={215 + selected.homoEnergy * 3}
                                    r="6"
                                    fill="#fbbf24"
                                    initial={{ x: 25 }}
                                    animate={{ x: 260, y: selected.lumoEnergy * 3 - selected.homoEnergy * 3 }}
                                    transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
                                />
                                {/* Arrow */}
                                <motion.path
                                    d={`M 170 ${215 + selected.homoEnergy * 3} Q 250 ${150 + (selected.homoEnergy + selected.lumoEnergy) * 1.5} 330 ${215 + selected.lumoEnergy * 3}`}
                                    fill="none"
                                    stroke="#fbbf24"
                                    strokeWidth="3"
                                    strokeDasharray="8,4"
                                    initial={{ pathLength: 0, opacity: 0 }}
                                    animate={{ pathLength: 1, opacity: 1 }}
                                    transition={{ duration: 1.2 }}
                                />
                            </motion.g>
                        )}
                    </AnimatePresence>

                    {/* Gap indicator */}
                    <line
                        x1="250"
                        y1={215 + selected.homoEnergy * 3}
                        x2="250"
                        y2={215 + selected.lumoEnergy * 3}
                        stroke="#a855f7"
                        strokeWidth="2"
                        strokeDasharray="4,4"
                    />
                    <text x="250" y={215 + (selected.homoEnergy + selected.lumoEnergy) * 1.5 - 5} textAnchor="middle" fill="#a855f7" fontSize="11">
                        Energy Gap
                    </text>
                </svg>
            </div>

            {/* Info panel */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '12px',
                marginBottom: '16px'
            }}>
                <div style={{
                    background: 'rgba(59,130,246,0.1)',
                    border: '1px solid rgba(59,130,246,0.3)',
                    borderRadius: '12px',
                    padding: '14px'
                }}>
                    <div style={{ color: '#60a5fa', fontWeight: 600, marginBottom: '6px' }}>🔵 HOMO (Nucleophile)</div>
                    <div style={{ color: '#e2e8f0', fontSize: '0.85rem' }}>
                        Highest Occupied Molecular Orbital - contains the electron pair that will be donated.
                    </div>
                </div>
                <div style={{
                    background: 'rgba(239,68,68,0.1)',
                    border: '1px solid rgba(239,68,68,0.3)',
                    borderRadius: '12px',
                    padding: '14px'
                }}>
                    <div style={{ color: '#fca5a5', fontWeight: 600, marginBottom: '6px' }}>🔴 LUMO (Electrophile)</div>
                    <div style={{ color: '#e2e8f0', fontSize: '0.85rem' }}>
                        Lowest Unoccupied Molecular Orbital - empty orbital ready to accept electrons.
                    </div>
                </div>
            </div>

            {/* Gap description */}
            <div style={{
                background: 'rgba(168,85,247,0.1)',
                border: '1px solid rgba(168,85,247,0.3)',
                borderRadius: '10px',
                padding: '12px 16px',
                marginBottom: '16px'
            }}>
                <span style={{ color: '#c4b5fd' }}>⚡ {selected.gapDescription}</span>
            </div>

            {/* Animate button */}
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <button
                    onClick={startAnimation}
                    disabled={animating}
                    style={{
                        padding: '12px 24px',
                        borderRadius: '12px',
                        border: 'none',
                        background: animating ? 'rgba(255,255,255,0.1)' : 'linear-gradient(135deg, #8b5cf6, #6d28d9)',
                        color: 'white',
                        fontWeight: 600,
                        cursor: animating ? 'not-allowed' : 'pointer',
                        fontSize: '0.95rem'
                    }}
                >
                    {animating ? '⏳ Reacting...' : '▶️ Show Electron Flow'}
                </button>

                <AnimatePresence>
                    {showProducts && (
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            style={{
                                background: 'rgba(34,197,94,0.2)',
                                border: '1px solid #22c55e',
                                borderRadius: '10px',
                                padding: '10px 16px'
                            }}
                        >
                            <div style={{ color: '#86efac', fontWeight: 600, fontSize: '0.9rem' }}>
                                ✓ Product: {selected.product}
                            </div>
                            <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>
                                {selected.reaction}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}
