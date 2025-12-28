'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MoleculeViewer from './MoleculeViewer';

interface MoleculeEntry {
    name: string;
    description: string;
    level?: number;
    formula?: string;
}

interface MoleculeComparisonTableProps {
    title: string;
    molecules: MoleculeEntry[];
    showLevels?: boolean;
}

// Emoji and data mappings
const moleculeEmojis: Record<string, string> = {
    'serotonin': '😊', 'caffeine': '☕', 'ethanol': '🍺', 'methanol': '⚗️',
    'acetone': '💅', 'benzene': '💍', 'aspirin': '💊', 'vanillin': '🍦',
    'menthol': '🌿', 'limonene': '🍋', 'ethane': '⛽', 'methane': '🔥',
    'cholesterol': '🥚', 'formaldehyde': '🧪', 'acetaldehyde': '🍎',
    'acetic acid': '🫒', 'toluene': '🎨', 'phenol': '🧴', 'aniline': '🔵',
    'pyridine': '💎', 'cyclohexane': '⭕', 'propane': '🔵', 'pentane': '📏',
};

const moleculeFormulas: Record<string, string> = {
    'serotonin': 'C₁₀H₁₂N₂O', 'caffeine': 'C₈H₁₀N₄O₂', 'ethanol': 'C₂H₆O',
    'acetone': 'C₃H₆O', 'benzene': 'C₆H₆', 'ethane': 'C₂H₆', 'methane': 'CH₄',
    'cholesterol': 'C₂₇H₄₆O', 'formaldehyde': 'CH₂O', 'acetaldehyde': 'C₂H₄O',
    'acetic acid': 'C₂H₄O₂', 'toluene': 'C₇H₈', 'phenol': 'C₆H₆O',
    'cyclohexane': 'C₆H₁₂', 'propane': 'C₃H₈', 'pentane': 'C₅H₁₂', 'vanillin': 'C₈H₈O₃',
};

const moleculeFunctionalGroups: Record<string, string[]> = {
    'serotonin': ['Amine', 'Hydroxyl', 'Aromatic'],
    'caffeine': ['Carbonyl', 'Methyl', 'Heterocyclic N'],
    'ethanol': ['Hydroxyl (-OH)'],
    'acetone': ['Ketone (C=O)'],
    'benzene': ['Aromatic ring'],
    'vanillin': ['Aldehyde', 'Ether', 'Phenol'],
    'cholesterol': ['Steroid', 'Hydroxyl', 'Alkene'],
    'formaldehyde': ['Aldehyde'],
    'acetaldehyde': ['Aldehyde'],
    'acetic acid': ['Carboxylic acid'],
    'toluene': ['Aromatic', 'Methyl'],
    'phenol': ['Aromatic', 'Hydroxyl'],
    'cyclohexane': ['Cycloalkane'],
    'propane': ['Alkane'],
    'pentane': ['Alkane'],
};

const levelColors: Record<number, { gradient: string; border: string; text: string }> = {
    0: { gradient: 'linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(16, 185, 129, 0.1))', border: '#22c55e', text: '#22c55e' },
    1: { gradient: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(37, 99, 235, 0.1))', border: '#3b82f6', text: '#3b82f6' },
    2: { gradient: 'linear-gradient(135deg, rgba(251, 191, 36, 0.2), rgba(245, 158, 11, 0.1))', border: '#fbbf24', text: '#fbbf24' },
    3: { gradient: 'linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(220, 38, 38, 0.1))', border: '#ef4444', text: '#ef4444' },
    4: { gradient: 'linear-gradient(135deg, rgba(168, 85, 247, 0.2), rgba(139, 92, 246, 0.1))', border: '#a855f7', text: '#a855f7' },
};

export default function MoleculeComparisonTable({ title, molecules, showLevels = false }: MoleculeComparisonTableProps) {
    const [selectedMolecule, setSelectedMolecule] = useState<string | null>(null);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ margin: '2rem 0' }}
        >
            {/* Header */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '1.5rem',
            }}>
                <span style={{ fontSize: '1.5rem' }}>🧬</span>
                <h4 style={{ margin: 0, fontSize: '1.2rem', color: 'var(--neutral-100)', fontWeight: 600 }}>
                    {title}
                </h4>
            </div>

            {/* Cards Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '1.25rem',
            }}>
                {molecules.map((mol, index) => {
                    const emoji = moleculeEmojis[mol.name.toLowerCase()] || '🔬';
                    const formula = mol.formula || moleculeFormulas[mol.name.toLowerCase()] || '';
                    const groups = moleculeFunctionalGroups[mol.name.toLowerCase()] || [];
                    const levelColor = mol.level !== undefined ? levelColors[mol.level] : null;
                    const isSelected = selectedMolecule === mol.name;

                    return (
                        <motion.div
                            key={mol.name}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}
                            style={{
                                background: levelColor?.gradient || 'linear-gradient(145deg, rgba(26, 26, 36, 0.95), rgba(18, 18, 28, 0.9))',
                                border: `1.5px solid ${levelColor?.border || 'rgba(139, 92, 246, 0.25)'}`,
                                borderRadius: 20,
                                overflow: 'hidden',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                            }}
                            onClick={() => setSelectedMolecule(isSelected ? null : mol.name)}
                        >
                            {/* Card Header with Emoji & Badge */}
                            <div style={{
                                padding: '1.25rem 1.25rem 0',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'flex-start',
                            }}>
                                <div style={{ fontSize: '2.5rem', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}>
                                    {emoji}
                                </div>
                                {showLevels && mol.level !== undefined && (
                                    <span style={{
                                        padding: '4px 12px',
                                        background: levelColor?.gradient,
                                        border: `1px solid ${levelColor?.border}`,
                                        borderRadius: 20,
                                        fontSize: '0.7rem',
                                        fontWeight: 700,
                                        color: levelColor?.text,
                                    }}>
                                        Level {mol.level}
                                    </span>
                                )}
                            </div>

                            {/* Card Content */}
                            <div style={{ padding: '0.75rem 1.25rem 1.25rem' }}>
                                {/* Name & Formula */}
                                <h3 style={{
                                    margin: '0 0 0.25rem',
                                    fontSize: '1.15rem',
                                    fontWeight: 700,
                                    color: 'var(--neutral-100)',
                                }}>
                                    {mol.name}
                                </h3>
                                {formula && (
                                    <div style={{
                                        fontSize: '0.9rem',
                                        color: levelColor?.text || '#fbbf24',
                                        fontFamily: 'ui-monospace, monospace',
                                        marginBottom: '0.5rem',
                                    }}>
                                        {formula}
                                    </div>
                                )}

                                {/* Description */}
                                <p style={{
                                    margin: '0 0 0.75rem',
                                    fontSize: '0.8rem',
                                    color: 'var(--neutral-400)',
                                    lineHeight: 1.4,
                                }}>
                                    {mol.description}
                                </p>

                                {/* Functional Groups */}
                                {groups.length > 0 && (
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1rem' }}>
                                        {groups.slice(0, 3).map((g, i) => (
                                            <span key={i} style={{
                                                padding: '3px 8px',
                                                background: 'rgba(255,255,255,0.06)',
                                                border: '1px solid rgba(255,255,255,0.1)',
                                                borderRadius: 12,
                                                fontSize: '0.65rem',
                                                color: 'var(--neutral-300)',
                                            }}>
                                                {g}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                {/* View 3D Button */}
                                <button
                                    onClick={(e) => { e.stopPropagation(); setSelectedMolecule(isSelected ? null : mol.name); }}
                                    style={{
                                        width: '100%',
                                        padding: '0.6rem',
                                        background: isSelected
                                            ? 'linear-gradient(135deg, #ec4899, #f43f5e)'
                                            : (levelColor ? `linear-gradient(135deg, ${levelColor.border}, ${levelColor.border}dd)` : 'linear-gradient(135deg, #8b5cf6, #7c3aed)'),
                                        border: 'none',
                                        borderRadius: 12,
                                        color: 'white',
                                        fontSize: '0.85rem',
                                        fontWeight: 600,
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '0.4rem',
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
                                        transition: 'all 0.2s',
                                    }}
                                >
                                    {isSelected ? '✕ Close' : '🔬 View 3D Model'}
                                </button>
                            </div>

                            {/* 3D Viewer (Expandable) */}
                            <AnimatePresence>
                                {isSelected && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 320, opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        style={{
                                            borderTop: '1px solid rgba(255,255,255,0.1)',
                                            overflow: 'hidden',
                                        }}
                                    >
                                        <MoleculeViewer
                                            moleculeName={mol.name}
                                            description=""
                                            height={320}
                                        />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    );
                })}
            </div>
        </motion.div>
    );
}
