'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ReactionStep {
    title: string;
    description: string;
    svg: React.ReactNode;
}

interface CarbonylReaction {
    id: string;
    name: string;
    nucleophile: string;
    product: string;
    productType: string;
    description: string;
    steps: ReactionStep[];
}

// Animated Curly Arrow Component
const CurlyArrow = ({ x1, y1, x2, y2, color = '#fbbf24', delay = 0 }: {
    x1: number; y1: number; x2: number; y2: number; color?: string; delay?: number;
}) => {
    const midX = (x1 + x2) / 2;
    const midY = Math.min(y1, y2) - 30;
    const path = `M ${x1} ${y1} Q ${midX} ${midY} ${x2} ${y2}`;

    return (
        <motion.g>
            <defs>
                <marker id={`arrowhead-${x1}-${y1}`} markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill={color} />
                </marker>
            </defs>
            <motion.path
                d={path}
                stroke={color}
                strokeWidth="3"
                fill="none"
                markerEnd={`url(#arrowhead-${x1}-${y1})`}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.2, delay, ease: "easeInOut" }}
            />
        </motion.g>
    );
};

// Molecule Atom Component
const Atom = ({ x, y, label, color, size = 30, charge = '' }: {
    x: number; y: number; label: string; color: string; size?: number; charge?: string;
}) => (
    <g>
        <motion.circle
            cx={x}
            cy={y}
            r={size / 2}
            fill={color}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
        />
        <text x={x} y={y + 5} textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">
            {label}
        </text>
        {charge && (
            <text x={x + size / 2} y={y - size / 3} fill={color} fontSize="12" fontWeight="bold">
                {charge}
            </text>
        )}
    </g>
);

// Bond Component
const Bond = ({ x1, y1, x2, y2, type = 'single' }: {
    x1: number; y1: number; x2: number; y2: number; type?: 'single' | 'double';
}) => {
    if (type === 'double') {
        const offset = 4;
        const angle = Math.atan2(y2 - y1, x2 - x1);
        const perpX = Math.sin(angle) * offset;
        const perpY = Math.cos(angle) * offset;
        return (
            <g>
                <line x1={x1 + perpX} y1={y1 - perpY} x2={x2 + perpX} y2={y2 - perpY} stroke="#94a3b8" strokeWidth="3" />
                <line x1={x1 - perpX} y1={y1 + perpY} x2={x2 - perpX} y2={y2 + perpY} stroke="#94a3b8" strokeWidth="3" />
            </g>
        );
    }
    return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#94a3b8" strokeWidth="3" />;
};

// Electron Pair (Lone Pair Dots)
const ElectronPair = ({ x, y, angle = 0 }: { x: number; y: number; angle?: number }) => {
    const offset = 8;
    const rad = (angle * Math.PI) / 180;
    return (
        <g>
            <circle cx={x + Math.cos(rad) * offset - 4} cy={y + Math.sin(rad) * offset} r="3" fill="#8b5cf6" />
            <circle cx={x + Math.cos(rad) * offset + 4} cy={y + Math.sin(rad) * offset} r="3" fill="#8b5cf6" />
        </g>
    );
};

const CARBONYL_REACTIONS: CarbonylReaction[] = [
    {
        id: 'cyanohydrin',
        name: 'Cyanohydrin Formation',
        nucleophile: 'CN⁻',
        product: 'R-C(OH)(CN)-R\'',
        productType: 'Cyanohydrin',
        description: 'Cyanide attacks carbonyl to form C-C bond. Product has -OH and -CN on same carbon.',
        steps: [
            {
                title: 'Nucleophilic Attack',
                description: 'The cyanide ion (CN⁻) attacks the electrophilic carbonyl carbon (δ⁺). The lone pair forms a new σ bond.',
                svg: (
                    <svg width="100%" height="200" viewBox="0 0 400 200">
                        {/* Carbonyl Group */}
                        <Atom x={200} y={100} label="C" color="#3b82f6" charge="δ⁺" />
                        <Atom x={260} y={60} label="O" color="#ef4444" charge="δ⁻" />
                        <Bond x1={200} y1={85} x2={245} y2={60} type="double" />
                        <Atom x={160} y={140} label="R" color="#64748b" size={24} />
                        <Bond x1={180} y1={120} x2={195} y2={105} />
                        <Atom x={240} y={140} label="R" color="#64748b" size={24} />
                        <Bond x1={220} y1={120} x2={205} y2={105} />

                        {/* Cyanide Ion */}
                        <Atom x={80} y={100} label="C" color="#22c55e" />
                        <Atom x={40} y={100} label="N" color="#8b5cf6" charge="⊖" />
                        <Bond x1={55} y1={100} x2={65} y2={100} />
                        <text x={52} y={95} fill="#94a3b8" fontSize="12">≡</text>
                        <ElectronPair x={80} y={100} angle={0} />

                        {/* Curly Arrow */}
                        <CurlyArrow x1={95} y1={95} x2={180} y2={95} color="#fbbf24" delay={0.5} />

                        {/* Label */}
                        <text x={200} y={185} textAnchor="middle" fill="#94a3b8" fontSize="12">
                            CN⁻ lone pair attacks C(δ⁺)
                        </text>
                    </svg>
                )
            },
            {
                title: 'π Bond Breaks',
                description: 'As CN attacks, the π electrons of C=O move entirely to oxygen, forming an alkoxide (O⁻) intermediate.',
                svg: (
                    <svg width="100%" height="200" viewBox="0 0 400 200">
                        {/* Transition State */}
                        <Atom x={200} y={100} label="C" color="#3b82f6" />
                        <Atom x={260} y={60} label="O" color="#ef4444" charge="⊖" />
                        <Bond x1={200} y1={85} x2={245} y2={65} />
                        <ElectronPair x={275} y={50} angle={45} />
                        <ElectronPair x={275} y={70} angle={-45} />

                        <Atom x={140} y={100} label="C" color="#22c55e" />
                        <Atom x={100} y={100} label="N" color="#8b5cf6" />
                        <Bond x1={115} y1={100} x2={125} y2={100} />
                        <Bond x1={155} y1={100} x2={185} y2={100} />

                        {/* Curly Arrow from pi bond to O */}
                        <CurlyArrow x1={220} y1={75} x2={250} y2={55} color="#ef4444" delay={0.3} />

                        {/* Labels */}
                        <text x={200} y={185} textAnchor="middle" fill="#94a3b8" fontSize="12">
                            π electrons move to oxygen → O⁻
                        </text>

                        {/* New bond indicator */}
                        <motion.circle
                            cx={170}
                            cy={100}
                            r={5}
                            fill="#22c55e"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ duration: 1, repeat: Infinity }}
                        />
                    </svg>
                )
            },
            {
                title: 'Protonation → Product',
                description: 'The alkoxide picks up H⁺ from HCN or solvent to give the neutral cyanohydrin product.',
                svg: (
                    <svg width="100%" height="200" viewBox="0 0 400 200">
                        {/* Product */}
                        <Atom x={200} y={100} label="C" color="#3b82f6" />
                        <Atom x={260} y={60} label="O" color="#ef4444" />
                        <Bond x1={200} y1={85} x2={245} y2={65} />
                        <Atom x={300} y={60} label="H" color="#f59e0b" size={20} />
                        <Bond x1={275} y1={60} x2={290} y2={60} />

                        <Atom x={140} y={100} label="C" color="#22c55e" />
                        <Atom x={100} y={100} label="N" color="#8b5cf6" />
                        <Bond x1={115} y1={100} x2={125} y2={100} />
                        <Bond x1={155} y1={100} x2={185} y2={100} />

                        <Atom x={160} y={140} label="R" color="#64748b" size={24} />
                        <Bond x1={180} y1={120} x2={195} y2={105} />
                        <Atom x={240} y={140} label="R" color="#64748b" size={24} />
                        <Bond x1={220} y1={120} x2={205} y2={105} />

                        {/* Product Label */}
                        <motion.rect
                            x={60}
                            y={160}
                            width={280}
                            height={30}
                            rx={8}
                            fill="rgba(34, 197, 94, 0.2)"
                            stroke="#22c55e"
                            strokeWidth={2}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        />
                        <text x={200} y={180} textAnchor="middle" fill="#86efac" fontSize="14" fontWeight="bold">
                            Cyanohydrin Product ✓
                        </text>
                    </svg>
                )
            }
        ]
    },
    {
        id: 'nabh4',
        name: 'NaBH₄ Reduction',
        nucleophile: 'H⁻ (from BH₄⁻)',
        product: 'R-CH(OH)-R\'',
        productType: 'Alcohol',
        description: 'Hydride (H⁻) attacks carbonyl. Converts C=O to C-OH. Mild, works in water.',
        steps: [
            {
                title: 'Hydride Delivery',
                description: 'The B-H bond in BH₄⁻ delivers H⁻ to the carbonyl carbon. Boron coordinates to oxygen.',
                svg: (
                    <svg width="100%" height="200" viewBox="0 0 400 200">
                        {/* BH4 group */}
                        <Atom x={60} y={100} label="B" color="#f59e0b" />
                        <Atom x={30} y={70} label="H" color="#94a3b8" size={18} />
                        <Atom x={30} y={130} label="H" color="#94a3b8" size={18} />
                        <Atom x={60} y={60} label="H" color="#94a3b8" size={18} />
                        <Atom x={100} y={100} label="H" color="#22c55e" size={22} charge="⊖" />
                        <Bond x1={45} y1={80} x2={55} y2={90} />
                        <Bond x1={45} y1={120} x2={55} y2={110} />
                        <Bond x1={60} y1={75} x2={60} y2={85} />
                        <Bond x1={75} y1={100} x2={85} y2={100} />

                        {/* Carbonyl Group */}
                        <Atom x={220} y={100} label="C" color="#3b82f6" charge="δ⁺" />
                        <Atom x={280} y={60} label="O" color="#ef4444" charge="δ⁻" />
                        <Bond x1={220} y1={85} x2={265} y2={60} type="double" />
                        <Atom x={180} y={140} label="R" color="#64748b" size={24} />
                        <Bond x1={195} y1={125} x2={210} y2={110} />
                        <Atom x={260} y={140} label="R" color="#64748b" size={24} />
                        <Bond x1={245} y1={125} x2={230} y2={110} />

                        {/* Curly Arrow */}
                        <CurlyArrow x1={115} y1={95} x2={200} y2={95} color="#22c55e" delay={0.5} />

                        <text x={200} y={185} textAnchor="middle" fill="#94a3b8" fontSize="12">
                            H⁻ attacks electrophilic carbon
                        </text>
                    </svg>
                )
            },
            {
                title: 'C=O Reduction',
                description: 'As H⁻ attacks, the π electrons move to oxygen forming alkoxide. Carbon is now sp³.',
                svg: (
                    <svg width="100%" height="200" viewBox="0 0 400 200">
                        {/* Intermediate */}
                        <Atom x={200} y={100} label="C" color="#3b82f6" />
                        <Atom x={160} y={100} label="H" color="#22c55e" size={22} />
                        <Bond x1={175} y1={100} x2={185} y2={100} />

                        <Atom x={260} y={60} label="O" color="#ef4444" charge="⊖" />
                        <Bond x1={210} y1={85} x2={245} y2={65} />
                        <ElectronPair x={275} y={55} angle={30} />

                        {/* Curly Arrow showing pi bond breaking */}
                        <CurlyArrow x1={225} y1={80} x2={255} y2={55} color="#ef4444" delay={0.3} />

                        <Atom x={180} y={140} label="R" color="#64748b" size={24} />
                        <Bond x1={190} y1={125} x2={198} y2={112} />
                        <Atom x={240} y={140} label="R" color="#64748b" size={24} />
                        <Bond x1={230} y1={125} x2={210} y2={112} />

                        <text x={200} y={185} textAnchor="middle" fill="#94a3b8" fontSize="12">
                            sp² → sp³, alkoxide formed
                        </text>
                    </svg>
                )
            },
            {
                title: 'Work-up → Alcohol',
                description: 'Water or alcohol protonates the alkoxide to give the final alcohol product.',
                svg: (
                    <svg width="100%" height="200" viewBox="0 0 400 200">
                        {/* Product */}
                        <Atom x={200} y={100} label="C" color="#3b82f6" />
                        <Atom x={160} y={100} label="H" color="#22c55e" size={22} />
                        <Bond x1={175} y1={100} x2={185} y2={100} />

                        <Atom x={255} y={60} label="O" color="#ef4444" />
                        <Bond x1={210} y1={85} x2={240} y2={65} />
                        <Atom x={290} y={60} label="H" color="#f59e0b" size={20} />
                        <Bond x1={270} y1={60} x2={280} y2={60} />

                        <Atom x={180} y={140} label="R" color="#64748b" size={24} />
                        <Bond x1={190} y1={125} x2={198} y2={112} />
                        <Atom x={240} y={140} label="R" color="#64748b" size={24} />
                        <Bond x1={230} y1={125} x2={210} y2={112} />

                        {/* Product Label */}
                        <motion.rect
                            x={80}
                            y={160}
                            width={240}
                            height={30}
                            rx={8}
                            fill="rgba(34, 197, 94, 0.2)"
                            stroke="#22c55e"
                            strokeWidth={2}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        />
                        <text x={200} y={180} textAnchor="middle" fill="#86efac" fontSize="14" fontWeight="bold">
                            Alcohol Product ✓
                        </text>
                    </svg>
                )
            }
        ]
    },
    {
        id: 'grignard',
        name: 'Grignard Addition',
        nucleophile: 'R-MgBr (C⁻)',
        product: 'R-C(OH)(R\')-R\'\'',
        productType: 'Alcohol (2° or 3°)',
        description: 'Nucleophilic carbon attacks carbonyl, forming new C-C bond. Must be anhydrous!',
        steps: [
            {
                title: 'C-C Bond Formation',
                description: 'The nucleophilic carbon (δ⁻) of the Grignard attacks the electrophilic carbonyl carbon.',
                svg: (
                    <svg width="100%" height="200" viewBox="0 0 400 200">
                        {/* Grignard */}
                        <Atom x={50} y={100} label="R" color="#8b5cf6" size={28} />
                        <Bond x1={65} y1={100} x2={85} y2={100} />
                        <Atom x={100} y={100} label="C" color="#22c55e" charge="δ⁻" />
                        <Bond x1={115} y1={100} x2={135} y2={100} />
                        <text x={150} y={105} fill="#f59e0b" fontSize="12" fontWeight="bold">MgBr</text>
                        <ElectronPair x={100} y={100} angle={180} />

                        {/* Carbonyl Group */}
                        <Atom x={250} y={100} label="C" color="#3b82f6" charge="δ⁺" />
                        <Atom x={310} y={60} label="O" color="#ef4444" charge="δ⁻" />
                        <Bond x1={250} y1={85} x2={295} y2={60} type="double" />
                        <Atom x={210} y={140} label="R" color="#64748b" size={24} />
                        <Bond x1={225} y1={125} x2={240} y2={110} />
                        <Atom x={290} y={140} label="R" color="#64748b" size={24} />
                        <Bond x1={275} y1={125} x2={260} y2={110} />

                        {/* Curly Arrow */}
                        <CurlyArrow x1={115} y1={90} x2={230} y2={90} color="#22c55e" delay={0.5} />

                        <text x={200} y={185} textAnchor="middle" fill="#94a3b8" fontSize="12">
                            New C-C σ bond forming
                        </text>
                    </svg>
                )
            },
            {
                title: 'Alkoxide Formation',
                description: 'The π electrons move to oxygen. Mg coordinates to the alkoxide.',
                svg: (
                    <svg width="100%" height="200" viewBox="0 0 400 200">
                        {/* Intermediate */}
                        <Atom x={50} y={100} label="R" color="#8b5cf6" size={28} />
                        <Bond x1={65} y1={100} x2={130} y2={100} />
                        <Atom x={200} y={100} label="C" color="#3b82f6" />
                        <Bond x1={145} y1={100} x2={185} y2={100} />

                        <Atom x={270} y={55} label="O" color="#ef4444" charge="⊖" />
                        <Bond x1={210} y1={85} x2={255} y2={60} />
                        <text x={310} y={60} fill="#f59e0b" fontSize="11">...MgBr</text>

                        <CurlyArrow x1={235} y1={75} x2={265} y2={50} color="#ef4444" delay={0.3} />

                        <Atom x={170} y={140} label="R" color="#64748b" size={24} />
                        <Bond x1={180} y1={125} x2={195} y2={112} />
                        <Atom x={240} y={140} label="R" color="#64748b" size={24} />
                        <Bond x1={225} y1={125} x2={210} y2={112} />

                        <text x={200} y={185} textAnchor="middle" fill="#94a3b8" fontSize="12">
                            -OMgBr intermediate formed
                        </text>
                    </svg>
                )
            },
            {
                title: 'Aqueous Work-up',
                description: 'Adding dilute acid protonates the alkoxide (-OMgBr → -OH) to give the alcohol.',
                svg: (
                    <svg width="100%" height="200" viewBox="0 0 400 200">
                        {/* Product */}
                        <Atom x={60} y={100} label="R" color="#8b5cf6" size={28} />
                        <Bond x1={75} y1={100} x2={130} y2={100} />
                        <Atom x={200} y={100} label="C" color="#3b82f6" />
                        <Bond x1={145} y1={100} x2={185} y2={100} />

                        <Atom x={265} y={55} label="O" color="#ef4444" />
                        <Bond x1={210} y1={85} x2={250} y2={60} />
                        <Atom x={300} y={55} label="H" color="#f59e0b" size={20} />
                        <Bond x1={280} y1={55} x2={290} y2={55} />

                        <Atom x={170} y={140} label="R" color="#64748b" size={24} />
                        <Bond x1={180} y1={125} x2={195} y2={112} />
                        <Atom x={240} y={140} label="R" color="#64748b" size={24} />
                        <Bond x1={225} y1={125} x2={210} y2={112} />

                        {/* Product Label */}
                        <motion.rect
                            x={60}
                            y={160}
                            width={280}
                            height={30}
                            rx={8}
                            fill="rgba(139, 92, 246, 0.2)"
                            stroke="#8b5cf6"
                            strokeWidth={2}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        />
                        <text x={200} y={180} textAnchor="middle" fill="#c4b5fd" fontSize="14" fontWeight="bold">
                            New C-C Bond! Alcohol ✓
                        </text>
                    </svg>
                )
            }
        ]
    },
    {
        id: 'hemiacetal',
        name: 'Hemiacetal Formation',
        nucleophile: 'ROH (alcohol)',
        product: 'R-C(OH)(OR\')-R\'\'',
        productType: 'Hemiacetal',
        description: 'Alcohol adds to carbonyl. Acid-catalyzed. Key step in sugar chemistry.',
        steps: [
            {
                title: 'Carbonyl Activation',
                description: 'Acid (H⁺) protonates the carbonyl oxygen, making carbon MORE electrophilic.',
                svg: (
                    <svg width="100%" height="200" viewBox="0 0 400 200">
                        {/* Carbonyl + H+ */}
                        <Atom x={200} y={100} label="C" color="#3b82f6" charge="δ⁺⁺" />
                        <Atom x={260} y={60} label="O" color="#ef4444" />
                        <Atom x={300} y={40} label="H" color="#f59e0b" size={20} charge="⊕" />
                        <Bond x1={200} y1={85} x2={245} y2={60} type="double" />
                        <Bond x1={275} y1={55} x2={290} y2={45} />

                        <CurlyArrow x1={260} y1={45} x2={290} y2={35} color="#f59e0b" delay={0.3} />

                        <Atom x={160} y={140} label="R" color="#64748b" size={24} />
                        <Bond x1={175} y1={125} x2={190} y2={110} />
                        <Atom x={240} y={140} label="R" color="#64748b" size={24} />
                        <Bond x1={225} y1={125} x2={210} y2={110} />

                        <text x={200} y={185} textAnchor="middle" fill="#94a3b8" fontSize="12">
                            Protonated carbonyl = super electrophilic!
                        </text>
                    </svg>
                )
            },
            {
                title: 'Nucleophilic Attack',
                description: 'The alcohol oxygen attacks the highly electrophilic protonated carbonyl carbon.',
                svg: (
                    <svg width="100%" height="200" viewBox="0 0 400 200">
                        {/*  Alcohol */}
                        <Atom x={60} y={100} label="R" color="#8b5cf6" size={26} />
                        <Bond x1={75} y1={100} x2={95} y2={100} />
                        <Atom x={110} y={100} label="O" color="#22c55e" />
                        <Bond x1={125} y1={100} x2={145} y2={100} />
                        <Atom x={155} y={100} label="H" color="#f59e0b" size={18} />
                        <ElectronPair x={110} y={85} angle={-90} />

                        {/* Activated Carbonyl */}
                        <Atom x={260} y={100} label="C" color="#3b82f6" charge="⁺" />
                        <Atom x={310} y={60} label="O" color="#ef4444" />
                        <Atom x={340} y={45} label="H" color="#f59e0b" size={18} />
                        <Bond x1={260} y1={85} x2={295} y2={65} />
                        <Bond x1={325} y1={55} x2={335} y2={48} />

                        <CurlyArrow x1={125} y1={90} x2={240} y2={90} color="#22c55e" delay={0.5} />

                        <text x={200} y={185} textAnchor="middle" fill="#94a3b8" fontSize="12">
                            ROH lone pair attacks C⁺
                        </text>
                    </svg>
                )
            },
            {
                title: 'Hemiacetal Product',
                description: 'Proton transfer steps give the neutral hemiacetal with -OH and -OR on the same carbon.',
                svg: (
                    <svg width="100%" height="200" viewBox="0 0 400 200">
                        {/* Hemiacetal */}
                        <Atom x={200} y={100} label="C" color="#3b82f6" />

                        <Atom x={140} y={70} label="O" color="#22c55e" />
                        <Bond x1={155} y1={75} x2={185} y2={90} />
                        <Atom x={110} y={55} label="R" color="#8b5cf6" size={24} />
                        <Bond x1={125} y1={60} x2={135} y2={65} />

                        <Atom x={260} y={70} label="O" color="#ef4444" />
                        <Bond x1={215} y1={90} x2={245} y2={75} />
                        <Atom x={290} y={55} label="H" color="#f59e0b" size={18} />
                        <Bond x1={275} y1={65} x2={285} y2={58} />

                        <Atom x={170} y={145} label="R" color="#64748b" size={24} />
                        <Bond x1={180} y1={130} x2={195} y2={115} />
                        <Atom x={240} y={145} label="R" color="#64748b" size={24} />
                        <Bond x1={225} y1={130} x2={210} y2={115} />

                        {/* Product Label */}
                        <motion.rect
                            x={50}
                            y={165}
                            width={300}
                            height={28}
                            rx={8}
                            fill="rgba(34, 197, 94, 0.2)"
                            stroke="#22c55e"
                            strokeWidth={2}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        />
                        <text x={200} y={183} textAnchor="middle" fill="#86efac" fontSize="13" fontWeight="bold">
                            Hemiacetal: -OR + -OH on same C ✓
                        </text>
                    </svg>
                )
            }
        ]
    }
];

export default function CarbonylAdditionSimulator() {
    const [selectedReaction, setSelectedReaction] = useState(CARBONYL_REACTIONS[0]);
    const [currentStep, setCurrentStep] = useState(0);
    const [showMechanism, setShowMechanism] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
                background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.98))',
                borderRadius: '24px',
                padding: '28px',
                border: '1px solid rgba(251, 191, 36, 0.3)',
                marginBottom: '24px',
                boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
            }}
        >
            {/* Header */}
            <div style={{ marginBottom: '24px', textAlign: 'center' }}>
                <h3 style={{
                    margin: '0 0 8px',
                    color: '#fbbf24',
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '12px'
                }}>
                    <span style={{ fontSize: '2rem' }}>⚗️</span>
                    Carbonyl Addition Mechanism Simulator
                </h3>
                <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.95rem' }}>
                    Watch the curly arrows in action - step by step!
                </p>
            </div>

            {/* Reaction Selector */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                gap: '12px',
                marginBottom: '24px'
            }}>
                {CARBONYL_REACTIONS.map(r => (
                    <motion.button
                        key={r.id}
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => { setSelectedReaction(r); setCurrentStep(0); setShowMechanism(false); }}
                        style={{
                            padding: '14px 16px',
                            borderRadius: '14px',
                            border: selectedReaction.id === r.id
                                ? '2px solid #fbbf24'
                                : '1px solid rgba(255,255,255,0.1)',
                            background: selectedReaction.id === r.id
                                ? 'linear-gradient(135deg, rgba(251,191,36,0.2), rgba(245,158,11,0.1))'
                                : 'rgba(255,255,255,0.03)',
                            color: selectedReaction.id === r.id ? '#fde68a' : '#94a3b8',
                            cursor: 'pointer',
                            textAlign: 'left'
                        }}
                    >
                        <div style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: '4px' }}>{r.name}</div>
                        <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>Nu: {r.nucleophile}</div>
                    </motion.button>
                ))}
            </div>

            {/* Reaction Overview */}
            <motion.div
                key={selectedReaction.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                style={{
                    background: 'rgba(251, 191, 36, 0.08)',
                    border: '1px solid rgba(251, 191, 36, 0.2)',
                    borderRadius: '18px',
                    padding: '20px',
                    marginBottom: '20px'
                }}
            >
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '12px' }}>
                    <div style={{ background: 'rgba(59, 130, 246, 0.15)', borderRadius: '12px', padding: '12px', textAlign: 'center' }}>
                        <div style={{ color: '#60a5fa', fontSize: '0.7rem', marginBottom: '4px' }}>🎯 Nucleophile</div>
                        <div style={{ color: '#93c5fd', fontWeight: 700, fontSize: '1rem' }}>{selectedReaction.nucleophile}</div>
                    </div>
                    <div style={{ background: 'rgba(251, 191, 36, 0.15)', borderRadius: '12px', padding: '12px', textAlign: 'center' }}>
                        <div style={{ color: '#fbbf24', fontSize: '0.7rem', marginBottom: '4px' }}>⚡ Electrophile</div>
                        <div style={{ color: '#fde68a', fontWeight: 700, fontSize: '1rem' }}>C=O</div>
                    </div>
                    <div style={{ background: 'rgba(34, 197, 94, 0.15)', borderRadius: '12px', padding: '12px', textAlign: 'center' }}>
                        <div style={{ color: '#22c55e', fontSize: '0.7rem', marginBottom: '4px' }}>✓ Product</div>
                        <div style={{ color: '#86efac', fontWeight: 700, fontSize: '0.9rem' }}>{selectedReaction.productType}</div>
                    </div>
                </div>
                <p style={{ color: '#cbd5e1', fontSize: '0.9rem', margin: 0 }}>{selectedReaction.description}</p>
            </motion.div>

            {/* Show Mechanism Button */}
            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowMechanism(!showMechanism)}
                style={{
                    width: '100%',
                    padding: '16px',
                    borderRadius: '14px',
                    border: 'none',
                    background: showMechanism
                        ? 'linear-gradient(135deg, #22c55e, #16a34a)'
                        : 'linear-gradient(135deg, #fbbf24, #f59e0b)',
                    color: showMechanism ? 'white' : '#1e293b',
                    fontWeight: 700,
                    fontSize: '1.1rem',
                    cursor: 'pointer',
                    marginBottom: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '12px'
                }}
            >
                {showMechanism ? '📖 Hide Mechanism' : '🎬 Watch Animated Mechanism'}
            </motion.button>

            {/* Mechanism Steps with SVG */}
            <AnimatePresence>
                {showMechanism && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                    >
                        {/* Step Progress */}
                        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                            {selectedReaction.steps.map((step, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentStep(i)}
                                    style={{
                                        flex: 1,
                                        padding: '14px',
                                        borderRadius: '12px',
                                        border: 'none',
                                        background: i === currentStep
                                            ? 'linear-gradient(135deg, #fbbf24, #f59e0b)'
                                            : i < currentStep
                                                ? '#22c55e'
                                                : 'rgba(255,255,255,0.1)',
                                        color: i === currentStep ? '#1e293b' : 'white',
                                        fontWeight: 700,
                                        cursor: 'pointer',
                                        fontSize: '0.9rem'
                                    }}
                                >
                                    Step {i + 1}
                                </button>
                            ))}
                        </div>

                        {/* Current Step with SVG Animation */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={`${selectedReaction.id}-${currentStep}`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                                style={{
                                    background: 'rgba(0,0,0,0.4)',
                                    borderRadius: '18px',
                                    padding: '24px',
                                    border: '1px solid rgba(251,191,36,0.2)'
                                }}
                            >
                                <h4 style={{
                                    margin: '0 0 12px',
                                    color: '#fbbf24',
                                    fontSize: '1.2rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px'
                                }}>
                                    <span style={{
                                        background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
                                        color: '#1e293b',
                                        width: '32px',
                                        height: '32px',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontWeight: 700
                                    }}>
                                        {currentStep + 1}
                                    </span>
                                    {selectedReaction.steps[currentStep].title}
                                </h4>

                                <p style={{ color: '#e2e8f0', fontSize: '0.95rem', lineHeight: 1.7, margin: '0 0 20px' }}>
                                    {selectedReaction.steps[currentStep].description}
                                </p>

                                {/* SVG Diagram */}
                                <div style={{
                                    background: 'linear-gradient(135deg, rgba(15,23,42,0.8), rgba(30,41,59,0.9))',
                                    borderRadius: '16px',
                                    padding: '20px',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    marginBottom: '16px'
                                }}>
                                    {selectedReaction.steps[currentStep].svg}
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Navigation */}
                        <div style={{ display: 'flex', gap: '12px', marginTop: '16px', justifyContent: 'center' }}>
                            <button
                                onClick={() => setCurrentStep(s => Math.max(0, s - 1))}
                                disabled={currentStep === 0}
                                style={{
                                    padding: '14px 28px',
                                    borderRadius: '12px',
                                    border: 'none',
                                    background: currentStep === 0 ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.15)',
                                    color: currentStep === 0 ? '#64748b' : '#e2e8f0',
                                    fontWeight: 600,
                                    cursor: currentStep === 0 ? 'not-allowed' : 'pointer',
                                    fontSize: '1rem'
                                }}
                            >
                                ← Previous
                            </button>
                            <button
                                onClick={() => setCurrentStep(s => Math.min(selectedReaction.steps.length - 1, s + 1))}
                                disabled={currentStep === selectedReaction.steps.length - 1}
                                style={{
                                    padding: '14px 32px',
                                    borderRadius: '12px',
                                    border: 'none',
                                    background: currentStep === selectedReaction.steps.length - 1
                                        ? 'rgba(255,255,255,0.05)'
                                        : 'linear-gradient(135deg, #fbbf24, #f59e0b)',
                                    color: currentStep === selectedReaction.steps.length - 1 ? '#64748b' : '#1e293b',
                                    fontWeight: 700,
                                    cursor: currentStep === selectedReaction.steps.length - 1 ? 'not-allowed' : 'pointer',
                                    fontSize: '1rem'
                                }}
                            >
                                Next Step →
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
