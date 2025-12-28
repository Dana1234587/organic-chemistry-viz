'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MoleculeViewer from './MoleculeViewer';

interface MoleculeEntry {
    name: string;
    description: string;
    level?: number;
    formula?: string;
    color?: string;
}

interface MoleculeComparisonTableProps {
    title: string;
    molecules: MoleculeEntry[];
    showLevels?: boolean;
    columns?: ('2d' | '3d' | 'description' | 'formula')[];
}

// Emoji mapping for molecules
const moleculeEmojis: Record<string, string> = {
    'serotonin': '😊',
    'caffeine': '☕',
    'ethanol': '🍺',
    'methanol': '⚗️',
    'acetone': '💅',
    'benzene': '💍',
    'aspirin': '💊',
    'vanillin': '🍦',
    'menthol': '🌿',
    'limonene': '🍋',
    'ethane': '⛽',
    'methane': '🔥',
    'cholesterol': '🥚',
    'formaldehyde': '🧪',
    'acetaldehyde': '🍎',
    'acetic acid': '🫒',
    'toluene': '🎨',
    'phenol': '🧴',
    'aniline': '🔵',
    'pyridine': '💎',
    'cyclohexane': '⭕',
    'propane': '🔵',
    'pentane': '📏',
    'hexane': '📐',
    'formic acid': '🐜',
};

// Chemical formulas
const moleculeFormulas: Record<string, string> = {
    'serotonin': 'C₁₀H₁₂N₂O',
    'caffeine': 'C₈H₁₀N₄O₂',
    'ethanol': 'C₂H₆O',
    'methanol': 'CH₄O',
    'acetone': 'C₃H₆O',
    'benzene': 'C₆H₆',
    'aspirin': 'C₉H₈O₄',
    'vanillin': 'C₈H₈O₃',
    'menthol': 'C₁₀H₂₀O',
    'limonene': 'C₁₀H₁₆',
    'ethane': 'C₂H₆',
    'methane': 'CH₄',
    'cholesterol': 'C₂₇H₄₆O',
    'formaldehyde': 'CH₂O',
    'acetaldehyde': 'C₂H₄O',
    'acetic acid': 'C₂H₄O₂',
    'toluene': 'C₇H₈',
    'phenol': 'C₆H₆O',
    'aniline': 'C₆H₇N',
    'pyridine': 'C₅H₅N',
    'cyclohexane': 'C₆H₁₂',
    'propane': 'C₃H₈',
    'pentane': 'C₅H₁₂',
    'hexane': 'C₆H₁₄',
    'formic acid': 'CH₂O₂',
};

// Functional groups
const moleculeFunctionalGroups: Record<string, string[]> = {
    'serotonin': ['Amine (-NH₂)', 'Hydroxyl (-OH)', 'Aromatic ring'],
    'caffeine': ['Carbonyl (C=O)', 'Methyl (-CH₃)', 'Heterocyclic N'],
    'ethanol': ['Hydroxyl (-OH)'],
    'acetone': ['Carbonyl (C=O)'],
    'benzene': ['Aromatic ring'],
    'vanillin': ['Aldehyde (-CHO)', 'Ether (-OCH₃)', 'Phenol (-OH)'],
    'menthol': ['Hydroxyl (-OH)'],
    'limonene': ['Alkene (C=C)'],
    'cholesterol': ['Hydroxyl (-OH)', 'Alkene (C=C)'],
    'formaldehyde': ['Aldehyde (-CHO)'],
    'acetaldehyde': ['Aldehyde (-CHO)'],
    'acetic acid': ['Carboxylic acid (-COOH)'],
    'toluene': ['Aromatic ring', 'Methyl (-CH₃)'],
    'phenol': ['Aromatic ring', 'Hydroxyl (-OH)'],
    'cyclohexane': ['Saturated ring'],
    'propane': ['Alkane'],
    'pentane': ['Alkane'],
};

// Level colors
const levelColors: Record<number, { bg: string; border: string; text: string; buttonBg: string }> = {
    0: { bg: 'rgba(34, 197, 94, 0.15)', border: '#22c55e', text: '#22c55e', buttonBg: 'linear-gradient(135deg, #22c55e, #16a34a)' },
    1: { bg: 'rgba(59, 130, 246, 0.15)', border: '#3b82f6', text: '#3b82f6', buttonBg: 'linear-gradient(135deg, #3b82f6, #2563eb)' },
    2: { bg: 'rgba(251, 191, 36, 0.15)', border: '#fbbf24', text: '#fbbf24', buttonBg: 'linear-gradient(135deg, #fbbf24, #f59e0b)' },
    3: { bg: 'rgba(239, 68, 68, 0.15)', border: '#ef4444', text: '#ef4444', buttonBg: 'linear-gradient(135deg, #ef4444, #dc2626)' },
    4: { bg: 'rgba(168, 85, 247, 0.15)', border: '#a855f7', text: '#a855f7', buttonBg: 'linear-gradient(135deg, #a855f7, #9333ea)' },
};

const defaultButtonGradient = 'linear-gradient(135deg, #8b5cf6, #7c3aed)';

export default function MoleculeComparisonTable({
    title,
    molecules,
    showLevels = false,
}: MoleculeComparisonTableProps) {
    const [expandedMolecule, setExpandedMolecule] = useState<string | null>(null);
    const [viewMode, setViewMode] = useState<Record<string, '2d' | '3d'>>({});

    const toggleViewMode = (molName: string) => {
        setViewMode(prev => ({
            ...prev,
            [molName]: prev[molName] === '3d' ? '2d' : '3d'
        }));
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
                margin: '2rem 0',
            }}
        >
            {/* Header */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '1.5rem',
            }}>
                <span style={{ fontSize: '1.5rem' }}>🧬</span>
                <h4 style={{
                    margin: 0,
                    fontSize: '1.2rem',
                    color: 'var(--neutral-100)',
                    fontWeight: 600,
                }}>
                    {title}
                </h4>
            </div>

            {/* Cards Grid - 2 columns */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '1.5rem',
            }}>
                {molecules.map((mol, index) => {
                    const emoji = moleculeEmojis[mol.name.toLowerCase()] || '🔬';
                    const formula = mol.formula || moleculeFormulas[mol.name.toLowerCase()] || '';
                    const functionalGroups = moleculeFunctionalGroups[mol.name.toLowerCase()] || [];
                    const levelColor = mol.level !== undefined ? levelColors[mol.level] : null;
                    const buttonBg = levelColor?.buttonBg || defaultButtonGradient;
                    const currentMode = viewMode[mol.name] || '2d';

                    return (
                        <motion.div
                            key={mol.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            style={{
                                background: 'linear-gradient(145deg, rgba(22, 22, 30, 0.95) 0%, rgba(28, 28, 40, 0.9) 100%)',
                                border: `1px solid ${levelColor?.border || 'rgba(139, 92, 246, 0.3)'}`,
                                borderRadius: 24,
                                padding: currentMode === '3d' ? '0' : '1.5rem',
                                minHeight: 400,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                textAlign: 'center',
                                position: 'relative',
                                overflow: 'hidden',
                            }}
                        >
                            {currentMode === '3d' ? (
                                /* FULL 3D VIEW MODE */
                                <>
                                    {/* Back Button */}
                                    <button
                                        onClick={() => setViewMode(prev => ({ ...prev, [mol.name]: '2d' }))}
                                        style={{
                                            position: 'absolute',
                                            top: 12,
                                            left: 12,
                                            zIndex: 10,
                                            padding: '0.5rem 1rem',
                                            background: 'rgba(0,0,0,0.7)',
                                            border: '1px solid rgba(255,255,255,0.2)',
                                            borderRadius: 8,
                                            color: 'white',
                                            fontSize: '0.8rem',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.3rem',
                                        }}
                                    >
                                        ← Back
                                    </button>
                                    {/* Molecule Name on 3D */}
                                    <div style={{
                                        position: 'absolute',
                                        top: 12,
                                        right: 12,
                                        zIndex: 10,
                                        padding: '0.5rem 1rem',
                                        background: 'rgba(0,0,0,0.7)',
                                        borderRadius: 8,
                                        color: 'white',
                                        fontSize: '0.9rem',
                                        fontWeight: 600,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                    }}>
                                        {emoji} {mol.name}
                                    </div>
                                    {/* Full 3D Viewer */}
                                    <div style={{ width: '100%', height: '100%', minHeight: 400 }}>
                                        <MoleculeViewer
                                            moleculeName={mol.name}
                                            description=""
                                            height={400}
                                        />
                                    </div>
                                </>
                            ) : (
                                /* INFO + 2D VIEW MODE */
                                <>
                                    {/* Level Badge */}
                                    {showLevels && mol.level !== undefined && (
                                        <div style={{
                                            position: 'absolute',
                                            top: 12,
                                            left: 12,
                                            background: levelColor?.bg,
                                            border: `1px solid ${levelColor?.border}`,
                                            borderRadius: 8,
                                            padding: '4px 10px',
                                            fontSize: '0.75rem',
                                            fontWeight: 600,
                                            color: levelColor?.text,
                                        }}>
                                            Level {mol.level}
                                        </div>
                                    )}

                                    {/* Large Emoji */}
                                    <div style={{
                                        fontSize: '3.5rem',
                                        marginBottom: '0.75rem',
                                        filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
                                    }}>
                                        {emoji}
                                    </div>

                                    {/* Molecule Name */}
                                    <h3 style={{
                                        margin: 0,
                                        fontSize: '1.3rem',
                                        fontWeight: 700,
                                        color: 'var(--neutral-100)',
                                    }}>
                                        {mol.name}
                                    </h3>

                                    {/* Chemical Formula */}
                                    {formula && (
                                        <div style={{
                                            fontSize: '1rem',
                                            color: levelColor?.text || '#fbbf24',
                                            fontFamily: 'monospace',
                                            marginTop: '0.25rem',
                                            fontWeight: 500,
                                        }}>
                                            {formula}
                                        </div>
                                    )}

                                    {/* Functional Group Tags */}
                                    {functionalGroups.length > 0 && (
                                        <div style={{
                                            display: 'flex',
                                            flexWrap: 'wrap',
                                            gap: '0.4rem',
                                            justifyContent: 'center',
                                            marginTop: '0.75rem',
                                        }}>
                                            {functionalGroups.map((group, idx) => (
                                                <span
                                                    key={idx}
                                                    style={{
                                                        padding: '4px 10px',
                                                        background: 'rgba(255,255,255,0.08)',
                                                        border: '1px solid rgba(255,255,255,0.15)',
                                                        borderRadius: 20,
                                                        fontSize: '0.7rem',
                                                        color: 'var(--neutral-300)',
                                                    }}
                                                >
                                                    {group}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    {/* Description */}
                                    <p style={{
                                        margin: '0.75rem 0 1rem',
                                        fontSize: '0.85rem',
                                        color: 'var(--neutral-400)',
                                        lineHeight: 1.5,
                                    }}>
                                        {mol.description}
                                    </p>

                                    {/* View 3D Button */}
                                    <button
                                        onClick={() => setViewMode(prev => ({ ...prev, [mol.name]: '3d' }))}
                                        style={{
                                            padding: '0.65rem 1.5rem',
                                            background: buttonBg,
                                            border: 'none',
                                            borderRadius: 12,
                                            color: 'white',
                                            fontSize: '0.9rem',
                                            fontWeight: 600,
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                            marginBottom: '1rem',
                                            transition: 'all 0.2s ease',
                                            boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)',
                                        }}
                                    >
                                        🔬 View 3D Model
                                    </button>

                                    {/* 2D Structure */}
                                    <Structure2D moleculeName={mol.name} />
                                </>
                            )}
                        </motion.div>
                    );
                })}
            </div>
        </motion.div>
    );
}

// 2D Structure Component
function Structure2D({ moleculeName }: { moleculeName: string }) {
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [error, setError] = useState(false);

    const moleculeCids: Record<string, number> = {
        'ethane': 6324, 'ethanol': 702, 'acetaldehyde': 177, 'acetic acid': 176,
        'acetone': 180, 'methane': 297, 'benzene': 241, 'caffeine': 2519,
        'aspirin': 2244, 'vanillin': 1183, 'menthol': 16666, 'limonene': 22311,
        'serotonin': 5202, 'formaldehyde': 712, 'formic acid': 284, 'toluene': 1140,
        'phenol': 996, 'aniline': 6115, 'pyridine': 1049, 'cyclohexane': 9265,
        'propane': 6334, 'pentane': 8003, 'hexane': 8058, 'cholesterol': 5997,
    };

    useEffect(() => {
        const cid = moleculeCids[moleculeName.toLowerCase()];
        if (cid) {
            setImageUrl(`https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${cid}/PNG?image_size=200x200`);
        } else {
            setError(true);
        }
    }, [moleculeName]);

    if (error || !imageUrl) {
        return (
            <div style={{
                width: 140, height: 140,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'rgba(255,255,255,0.05)', borderRadius: 12,
                color: 'var(--neutral-500)', fontSize: '0.85rem',
            }}>
                No 2D Available
            </div>
        );
    }

    return (
        <div style={{
            width: 140, height: 140, borderRadius: 12, overflow: 'hidden',
            background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
            <img
                src={imageUrl}
                alt={`2D structure of ${moleculeName}`}
                style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                onError={() => setError(true)}
            />
        </div>
    );
}
