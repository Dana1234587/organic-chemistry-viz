'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ReactionStep {
    id: number;
    title: string;
    description: string;
    arrowDescription: string;
    beforeSVG: React.ReactNode;
    afterSVG: React.ReactNode;
}

const SN2_REACTION: ReactionStep[] = [
    {
        id: 1,
        title: 'Starting Materials',
        description: 'Hydroxide ion (OH⁻) approaches methyl bromide (CH₃Br). The OH⁻ is the nucleophile with a lone pair, and the carbon bonded to Br is electrophilic (δ⁺).',
        arrowDescription: 'No arrows yet - identifying the players',
        beforeSVG: (
            <g>
                {/* OH- nucleophile */}
                <circle cx="80" cy="100" r="25" fill="#3b82f6" opacity="0.3" />
                <text x="80" y="105" textAnchor="middle" fill="#60a5fa" fontSize="16" fontWeight="bold">OH⁻</text>
                <text x="80" y="140" textAnchor="middle" fill="#94a3b8" fontSize="11">Nucleophile</text>

                {/* CH3-Br */}
                <circle cx="200" cy="100" r="22" fill="#22c55e" opacity="0.3" />
                <text x="200" y="96" textAnchor="middle" fill="#86efac" fontSize="14" fontWeight="bold">CH₃</text>
                <text x="200" y="112" textAnchor="middle" fill="#86efac" fontSize="10">δ⁺</text>

                <line x1="222" y1="100" x2="260" y2="100" stroke="#94a3b8" strokeWidth="3" />

                <circle cx="280" cy="100" r="20" fill="#ef4444" opacity="0.3" />
                <text x="280" y="105" textAnchor="middle" fill="#fca5a5" fontSize="14" fontWeight="bold">Br</text>
                <text x="280" y="135" textAnchor="middle" fill="#94a3b8" fontSize="11">Leaving group</text>
            </g>
        ),
        afterSVG: (
            <g>
                <circle cx="80" cy="100" r="25" fill="#3b82f6" opacity="0.3" />
                <text x="80" y="105" textAnchor="middle" fill="#60a5fa" fontSize="16" fontWeight="bold">OH⁻</text>
                <circle cx="200" cy="100" r="22" fill="#22c55e" opacity="0.3" />
                <text x="200" y="105" textAnchor="middle" fill="#86efac" fontSize="14" fontWeight="bold">CH₃</text>
                <line x1="222" y1="100" x2="260" y2="100" stroke="#94a3b8" strokeWidth="3" />
                <circle cx="280" cy="100" r="20" fill="#ef4444" opacity="0.3" />
                <text x="280" y="105" textAnchor="middle" fill="#fca5a5" fontSize="14" fontWeight="bold">Br</text>
            </g>
        )
    },
    {
        id: 2,
        title: 'Curly Arrow 1: Attack',
        description: 'The lone pair on oxygen attacks the electrophilic carbon. Arrow starts from the lone pair (electrons) and points TO the carbon atom.',
        arrowDescription: 'Arrow 1: From OH⁻ lone pair → Carbon (forms new C-O bond)',
        beforeSVG: (
            <g>
                <circle cx="80" cy="100" r="25" fill="#3b82f6" opacity="0.3" />
                <text x="80" y="105" textAnchor="middle" fill="#60a5fa" fontSize="16" fontWeight="bold">OH⁻</text>

                {/* Curly arrow 1 */}
                <motion.path
                    d="M 105 100 Q 140 80 175 100"
                    fill="none"
                    stroke="#fbbf24"
                    strokeWidth="3"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1 }}
                />
                <motion.polygon
                    points="175,100 165,93 167,103"
                    fill="#fbbf24"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                />

                <circle cx="200" cy="100" r="22" fill="#22c55e" opacity="0.3" />
                <text x="200" y="105" textAnchor="middle" fill="#86efac" fontSize="14" fontWeight="bold">CH₃</text>
                <line x1="222" y1="100" x2="260" y2="100" stroke="#94a3b8" strokeWidth="3" />
                <circle cx="280" cy="100" r="20" fill="#ef4444" opacity="0.3" />
                <text x="280" y="105" textAnchor="middle" fill="#fca5a5" fontSize="14" fontWeight="bold">Br</text>
            </g>
        ),
        afterSVG: (
            <g>
                <circle cx="100" cy="100" r="25" fill="#3b82f6" opacity="0.3" />
                <text x="100" y="105" textAnchor="middle" fill="#60a5fa" fontSize="14" fontWeight="bold">OH</text>
                <line x1="125" y1="100" x2="165" y2="100" stroke="#fbbf24" strokeWidth="3" strokeDasharray="5,5">
                    <animate attributeName="stroke-dashoffset" from="10" to="0" dur="0.5s" repeatCount="indefinite" />
                </line>
                <circle cx="190" cy="100" r="22" fill="#22c55e" opacity="0.3" />
                <text x="190" y="105" textAnchor="middle" fill="#86efac" fontSize="14" fontWeight="bold">CH₃</text>
                <line x1="212" y1="100" x2="250" y2="100" stroke="#94a3b8" strokeWidth="3" />
                <circle cx="270" cy="100" r="20" fill="#ef4444" opacity="0.3" />
                <text x="270" y="105" textAnchor="middle" fill="#fca5a5" fontSize="14" fontWeight="bold">Br</text>
            </g>
        )
    },
    {
        id: 3,
        title: 'Curly Arrow 2: Departure',
        description: 'Simultaneously, the C-Br bond breaks. The arrow starts FROM the bond and points TO the bromine atom, showing electrons go with Br.',
        arrowDescription: 'Arrow 2: From C-Br bond → Br (breaks bond, Br leaves with electrons)',
        beforeSVG: (
            <g>
                <circle cx="80" cy="100" r="25" fill="#3b82f6" opacity="0.3" />
                <text x="80" y="105" textAnchor="middle" fill="#60a5fa" fontSize="16" fontWeight="bold">OH⁻</text>

                {/* Arrow 1 */}
                <path d="M 105 100 Q 140 80 175 100" fill="none" stroke="#fbbf24" strokeWidth="3" />
                <polygon points="175,100 165,93 167,103" fill="#fbbf24" />

                <circle cx="200" cy="100" r="22" fill="#22c55e" opacity="0.3" />
                <text x="200" y="105" textAnchor="middle" fill="#86efac" fontSize="14" fontWeight="bold">CH₃</text>

                {/* Arrow 2 - bond breaking */}
                <motion.path
                    d="M 240 100 Q 255 85 275 95"
                    fill="none"
                    stroke="#f97316"
                    strokeWidth="3"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1 }}
                />
                <motion.polygon
                    points="275,95 265,88 267,98"
                    fill="#f97316"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                />

                <line x1="222" y1="100" x2="260" y2="100" stroke="#94a3b8" strokeWidth="3" opacity="0.5" />
                <circle cx="280" cy="100" r="20" fill="#ef4444" opacity="0.3" />
                <text x="280" y="105" textAnchor="middle" fill="#fca5a5" fontSize="14" fontWeight="bold">Br</text>
            </g>
        ),
        afterSVG: (
            <g>
                <circle cx="80" cy="100" r="25" fill="#3b82f6" opacity="0.3" />
                <text x="80" y="105" textAnchor="middle" fill="#60a5fa" fontSize="16" fontWeight="bold">OH⁻</text>
                <path d="M 105 100 Q 140 80 175 100" fill="none" stroke="#fbbf24" strokeWidth="3" />
                <polygon points="175,100 165,93 167,103" fill="#fbbf24" />
                <circle cx="200" cy="100" r="22" fill="#22c55e" opacity="0.3" />
                <text x="200" y="105" textAnchor="middle" fill="#86efac" fontSize="14" fontWeight="bold">CH₃</text>
                <path d="M 240 100 Q 255 85 275 95" fill="none" stroke="#f97316" strokeWidth="3" />
                <polygon points="275,95 265,88 267,98" fill="#f97316" />
                <line x1="222" y1="100" x2="260" y2="100" stroke="#94a3b8" strokeWidth="3" opacity="0.3" strokeDasharray="5,5" />
                <circle cx="280" cy="100" r="20" fill="#ef4444" opacity="0.3" />
                <text x="280" y="105" textAnchor="middle" fill="#fca5a5" fontSize="14" fontWeight="bold">Br</text>
            </g>
        )
    },
    {
        id: 4,
        title: 'Products Formed',
        description: 'The reaction is complete! Methanol (CH₃OH) is formed as the new C-O bond is made. Bromide ion (Br⁻) leaves with the electrons from the broken bond.',
        arrowDescription: 'Result: New C-O bond formed, C-Br bond broken, charges conserved',
        beforeSVG: (
            <g>
                {/* Products */}
                <circle cx="120" cy="100" r="25" fill="#22c55e" opacity="0.3" />
                <text x="120" y="95" textAnchor="middle" fill="#86efac" fontSize="12" fontWeight="bold">CH₃</text>
                <line x1="95" y1="100" x2="70" y2="100" stroke="#3b82f6" strokeWidth="3" />
                <circle cx="55" cy="100" r="18" fill="#3b82f6" opacity="0.3" />
                <text x="55" y="105" textAnchor="middle" fill="#60a5fa" fontSize="12" fontWeight="bold">OH</text>

                <text x="180" y="105" textAnchor="middle" fill="#64748b" fontSize="20">+</text>

                <motion.g
                    initial={{ x: 0 }}
                    animate={{ x: 30 }}
                    transition={{ duration: 1 }}
                >
                    <circle cx="240" cy="100" r="22" fill="#ef4444" opacity="0.3" />
                    <text x="240" y="105" textAnchor="middle" fill="#fca5a5" fontSize="14" fontWeight="bold">Br⁻</text>
                </motion.g>

                <text x="160" y="160" textAnchor="middle" fill="#22c55e" fontSize="14">Methanol</text>
                <text x="270" y="160" textAnchor="middle" fill="#f87171" fontSize="14">Bromide ion</text>
            </g>
        ),
        afterSVG: (
            <g>
                <circle cx="120" cy="100" r="25" fill="#22c55e" opacity="0.3" />
                <text x="120" y="105" textAnchor="middle" fill="#86efac" fontSize="12" fontWeight="bold">CH₃OH</text>
                <text x="180" y="105" textAnchor="middle" fill="#64748b" fontSize="20">+</text>
                <circle cx="240" cy="100" r="22" fill="#ef4444" opacity="0.3" />
                <text x="240" y="105" textAnchor="middle" fill="#fca5a5" fontSize="14" fontWeight="bold">Br⁻</text>
            </g>
        )
    }
];

export default function CurlyArrowSimulator() {
    const [currentStep, setCurrentStep] = useState(0);
    const [showingAfter, setShowingAfter] = useState(false);

    const step = SN2_REACTION[currentStep];

    const nextStep = () => {
        if (showingAfter) {
            if (currentStep < SN2_REACTION.length - 1) {
                setCurrentStep(c => c + 1);
                setShowingAfter(false);
            }
        } else {
            setShowingAfter(true);
        }
    };

    const prevStep = () => {
        if (!showingAfter && currentStep > 0) {
            setCurrentStep(c => c - 1);
            setShowingAfter(true);
        } else {
            setShowingAfter(false);
        }
    };

    const reset = () => {
        setCurrentStep(0);
        setShowingAfter(false);
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
            <h3 style={{ margin: '0 0 8px', color: '#f4f4f7', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span>🎬</span> Curly Arrow Mechanism: SN2 Reaction
            </h3>
            <p style={{ margin: '0 0 16px', color: '#94a3b8', fontSize: '0.85rem' }}>
                Watch how electrons move step-by-step in a real substitution reaction
            </p>

            {/* Progress */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
                {SN2_REACTION.map((s, i) => (
                    <div
                        key={s.id}
                        style={{
                            flex: 1,
                            height: '6px',
                            borderRadius: '3px',
                            background: i < currentStep ? '#22c55e' : i === currentStep ? '#fbbf24' : 'rgba(255,255,255,0.1)'
                        }}
                    />
                ))}
            </div>

            {/* Step Title */}
            <div style={{
                background: 'rgba(251, 191, 36, 0.1)',
                border: '1px solid rgba(251, 191, 36, 0.3)',
                borderRadius: '12px',
                padding: '12px 16px',
                marginBottom: '16px'
            }}>
                <div style={{ color: '#fbbf24', fontWeight: 600, marginBottom: '4px' }}>
                    Step {step.id}: {step.title}
                </div>
                <div style={{ color: '#e2e8f0', fontSize: '0.9rem' }}>{step.description}</div>
            </div>

            {/* SVG Visualization */}
            <div style={{
                background: 'rgba(0,0,0,0.3)',
                borderRadius: '16px',
                padding: '20px',
                marginBottom: '16px',
                minHeight: '180px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <svg width="100%" height="180" viewBox="0 0 360 180">
                    <AnimatePresence mode="wait">
                        <motion.g
                            key={`${currentStep}-${showingAfter}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            {showingAfter ? step.afterSVG : step.beforeSVG}
                        </motion.g>
                    </AnimatePresence>
                </svg>
            </div>

            {/* Arrow Description */}
            <div style={{
                background: 'rgba(139, 92, 246, 0.1)',
                border: '1px solid rgba(139, 92, 246, 0.3)',
                borderRadius: '10px',
                padding: '10px 14px',
                marginBottom: '20px'
            }}>
                <span style={{ color: '#a78bfa', fontSize: '0.85rem' }}>🎯 {step.arrowDescription}</span>
            </div>

            {/* Controls */}
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                <button
                    onClick={prevStep}
                    disabled={currentStep === 0 && !showingAfter}
                    style={{
                        padding: '10px 20px',
                        borderRadius: '10px',
                        border: 'none',
                        background: currentStep === 0 && !showingAfter ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.1)',
                        color: currentStep === 0 && !showingAfter ? '#64748b' : '#e2e8f0',
                        fontWeight: 600,
                        cursor: currentStep === 0 && !showingAfter ? 'not-allowed' : 'pointer'
                    }}
                >
                    ← Back
                </button>
                <button
                    onClick={nextStep}
                    disabled={currentStep === SN2_REACTION.length - 1 && showingAfter}
                    style={{
                        padding: '10px 24px',
                        borderRadius: '10px',
                        border: 'none',
                        background: currentStep === SN2_REACTION.length - 1 && showingAfter
                            ? 'rgba(255,255,255,0.05)'
                            : 'linear-gradient(135deg, #22c55e, #16a34a)',
                        color: currentStep === SN2_REACTION.length - 1 && showingAfter ? '#64748b' : 'white',
                        fontWeight: 600,
                        cursor: currentStep === SN2_REACTION.length - 1 && showingAfter ? 'not-allowed' : 'pointer'
                    }}
                >
                    Next →
                </button>
                <button
                    onClick={reset}
                    style={{
                        padding: '10px 16px',
                        borderRadius: '10px',
                        border: '1px solid rgba(255,255,255,0.2)',
                        background: 'transparent',
                        color: '#94a3b8',
                        fontWeight: 600,
                        cursor: 'pointer'
                    }}
                >
                    🔄 Reset
                </button>
            </div>
        </motion.div>
    );
}
