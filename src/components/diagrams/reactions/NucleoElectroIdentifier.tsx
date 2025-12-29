'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NucleoElectroData {
    name: string;
    formula: string;
    type: 'nucleophile' | 'electrophile';
    source: string;
    description: string;
    color: string;
}

const species: NucleoElectroData[] = [
    // Nucleophiles
    { name: 'Hydroxide', formula: 'OH⁻', type: 'nucleophile', source: 'Lone pairs + negative charge', description: 'Strong nucleophile with high electron density on oxygen', color: '#3b82f6' },
    { name: 'Cyanide', formula: 'CN⁻', type: 'nucleophile', source: 'Lone pair on carbon + charge', description: 'Attacks through carbon, forms C-C bonds', color: '#8b5cf6' },
    { name: 'Ammonia', formula: 'NH₃', type: 'nucleophile', source: 'Lone pair on nitrogen', description: 'Neutral nucleophile, attacks with lone pair', color: '#06b6d4' },
    { name: 'Alkene', formula: 'C=C', type: 'nucleophile', source: 'π bond electrons', description: 'Pi electrons can attack electrophiles', color: '#22c55e' },
    { name: 'Hydride', formula: 'H:⁻', type: 'nucleophile', source: 'Electron pair (from NaBH₄)', description: 'From reducing agents, adds H to carbons', color: '#14b8a6' },
    // Electrophiles  
    { name: 'Proton', formula: 'H⁺', type: 'electrophile', source: 'Completely empty orbital', description: 'Strongest electrophile - no electrons at all', color: '#ef4444' },
    { name: 'Carbocation', formula: 'R₃C⁺', type: 'electrophile', source: 'Empty p orbital', description: 'Very reactive, seeks electrons immediately', color: '#f97316' },
    { name: 'Carbonyl', formula: 'C=O', type: 'electrophile', source: 'δ⁺ on carbon (polarization)', description: 'Carbon is electron-poor due to electronegative O', color: '#eab308' },
    { name: 'Borane', formula: 'BH₃', type: 'electrophile', source: 'Empty p orbital on B', description: 'Only 6 electrons on boron, wants 8', color: '#f43f5e' },
    { name: 'Alkyl Halide', formula: 'C-Br', type: 'electrophile', source: 'δ⁺ on carbon', description: 'Carbon is partially positive, Br is leaving group', color: '#d946ef' },
];

export default function NucleoElectroIdentifier() {
    const [selected, setSelected] = useState<NucleoElectroData | null>(null);
    const [quizMode, setQuizMode] = useState(false);
    const [currentQuiz, setCurrentQuiz] = useState(0);
    const [score, setScore] = useState(0);
    const [answered, setAnswered] = useState<'nucleophile' | 'electrophile' | null>(null);

    const shuffled = [...species].sort(() => Math.random() - 0.5);
    const quizItem = shuffled[currentQuiz % species.length];

    const handleQuizAnswer = (answer: 'nucleophile' | 'electrophile') => {
        setAnswered(answer);
        if (answer === quizItem.type) {
            setScore(s => s + 1);
        }
        setTimeout(() => {
            setCurrentQuiz(c => c + 1);
            setAnswered(null);
            if (currentQuiz >= 9) {
                setQuizMode(false);
            }
        }, 1200);
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
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ margin: 0, color: '#f4f4f7', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span>🎯</span> Nucleophile vs Electrophile Identifier
                </h3>
                <button
                    onClick={() => { setQuizMode(!quizMode); setCurrentQuiz(0); setScore(0); }}
                    style={{
                        padding: '8px 16px',
                        background: quizMode ? 'rgba(239,68,68,0.2)' : 'linear-gradient(135deg, #8b5cf6, #6d28d9)',
                        border: 'none',
                        borderRadius: '10px',
                        color: 'white',
                        fontWeight: 600,
                        cursor: 'pointer',
                        fontSize: '0.85rem'
                    }}
                >
                    {quizMode ? '✕ Exit Quiz' : '🧪 Quiz Mode'}
                </button>
            </div>

            <AnimatePresence mode="wait">
                {quizMode ? (
                    <motion.div
                        key="quiz"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{ textAlign: 'center' }}
                    >
                        <div style={{ marginBottom: '16px', color: '#9ca3af', fontSize: '0.85rem' }}>
                            Question {Math.min(currentQuiz + 1, 10)} / 10 • Score: {score}
                        </div>

                        <motion.div
                            key={currentQuiz}
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            style={{
                                background: 'rgba(255,255,255,0.05)',
                                borderRadius: '16px',
                                padding: '32px',
                                marginBottom: '20px'
                            }}
                        >
                            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>{quizItem.formula}</div>
                            <div style={{ color: '#e2e8f0', fontSize: '1.3rem', fontWeight: 600, marginBottom: '8px' }}>
                                {quizItem.name}
                            </div>
                            <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
                                {quizItem.source}
                            </div>
                        </motion.div>

                        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleQuizAnswer('nucleophile')}
                                disabled={answered !== null}
                                style={{
                                    padding: '16px 32px',
                                    borderRadius: '12px',
                                    border: 'none',
                                    fontSize: '1rem',
                                    fontWeight: 600,
                                    cursor: answered ? 'default' : 'pointer',
                                    background: answered
                                        ? quizItem.type === 'nucleophile' ? '#22c55e' : answered === 'nucleophile' ? '#ef4444' : 'rgba(255,255,255,0.1)'
                                        : 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                                    color: 'white'
                                }}
                            >
                                🔵 Nucleophile
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleQuizAnswer('electrophile')}
                                disabled={answered !== null}
                                style={{
                                    padding: '16px 32px',
                                    borderRadius: '12px',
                                    border: 'none',
                                    fontSize: '1rem',
                                    fontWeight: 600,
                                    cursor: answered ? 'default' : 'pointer',
                                    background: answered
                                        ? quizItem.type === 'electrophile' ? '#22c55e' : answered === 'electrophile' ? '#ef4444' : 'rgba(255,255,255,0.1)'
                                        : 'linear-gradient(135deg, #ef4444, #dc2626)',
                                    color: 'white'
                                }}
                            >
                                🔴 Electrophile
                            </motion.button>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div key="explore" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        {/* Legend */}
                        <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', marginBottom: '20px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <div style={{ width: '16px', height: '16px', borderRadius: '4px', background: '#3b82f6' }} />
                                <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Nucleophile (electron-rich)</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <div style={{ width: '16px', height: '16px', borderRadius: '4px', background: '#ef4444' }} />
                                <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Electrophile (electron-poor)</span>
                            </div>
                        </div>

                        {/* Grid */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px' }}>
                            {species.map((sp, i) => (
                                <motion.button
                                    key={sp.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    whileHover={{ scale: 1.05, y: -3 }}
                                    onClick={() => setSelected(selected?.name === sp.name ? null : sp)}
                                    style={{
                                        padding: '16px 12px',
                                        background: selected?.name === sp.name ? `${sp.color}30` : 'rgba(255,255,255,0.05)',
                                        border: `2px solid ${selected?.name === sp.name ? sp.color : 'rgba(255,255,255,0.1)'}`,
                                        borderRadius: '12px',
                                        cursor: 'pointer',
                                        textAlign: 'center'
                                    }}
                                >
                                    <div style={{ fontSize: '1.5rem', marginBottom: '6px', color: sp.color }}>{sp.formula}</div>
                                    <div style={{ color: '#e2e8f0', fontSize: '0.85rem', fontWeight: 500 }}>{sp.name}</div>
                                    <div style={{
                                        marginTop: '8px',
                                        padding: '4px 8px',
                                        borderRadius: '6px',
                                        background: sp.type === 'nucleophile' ? 'rgba(59,130,246,0.2)' : 'rgba(239,68,68,0.2)',
                                        color: sp.type === 'nucleophile' ? '#60a5fa' : '#f87171',
                                        fontSize: '0.7rem',
                                        fontWeight: 600
                                    }}>
                                        {sp.type === 'nucleophile' ? 'Nu:' : 'E⁺'}
                                    </div>
                                </motion.button>
                            ))}
                        </div>

                        {/* Detail Panel */}
                        <AnimatePresence>
                            {selected && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    style={{
                                        marginTop: '20px',
                                        padding: '20px',
                                        background: `${selected.color}15`,
                                        border: `1px solid ${selected.color}40`,
                                        borderRadius: '12px'
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
                                        <span style={{ fontSize: '2rem', color: selected.color }}>{selected.formula}</span>
                                        <div>
                                            <div style={{ color: '#f4f4f7', fontSize: '1.1rem', fontWeight: 600 }}>{selected.name}</div>
                                            <div style={{
                                                color: selected.type === 'nucleophile' ? '#60a5fa' : '#f87171',
                                                fontSize: '0.85rem'
                                            }}>
                                                {selected.type === 'nucleophile' ? '🔵 Nucleophile' : '🔴 Electrophile'}
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '8px' }}>
                                        <strong style={{ color: '#e2e8f0' }}>Electron source:</strong> {selected.source}
                                    </div>
                                    <div style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>
                                        {selected.description}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
