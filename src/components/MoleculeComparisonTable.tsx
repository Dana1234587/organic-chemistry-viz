'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import MoleculeViewer from './MoleculeViewer';

interface MoleculeEntry {
    name: string;
    description: string;
    level?: number; // For oxidation levels
    formula?: string;
    color?: string;
}

interface MoleculeComparisonTableProps {
    title: string;
    molecules: MoleculeEntry[];
    showLevels?: boolean;
    columns?: ('2d' | '3d' | 'description' | 'formula')[];
}

// PubChem CID mapping for 2D images
const moleculeCids: Record<string, number> = {
    'ethane': 6324,
    'ethanol': 702,
    'acetaldehyde': 177,
    'acetic acid': 176,
    'acetone': 180,
    'methane': 297,
    'benzene': 241,
    'caffeine': 2519,
    'aspirin': 2244,
    'vanillin': 1183,
    'menthol': 16666,
    'limonene': 22311,
    'serotonin': 5202,
    'formaldehyde': 712,
    'formic acid': 284,
    'toluene': 1140,
    'phenol': 996,
    'aniline': 6115,
    'pyridine': 1049,
};

// Level colors
const levelColors: Record<number, { bg: string; border: string; text: string }> = {
    0: { bg: 'rgba(34, 197, 94, 0.15)', border: '#22c55e', text: '#22c55e' },
    1: { bg: 'rgba(59, 130, 246, 0.15)', border: '#3b82f6', text: '#3b82f6' },
    2: { bg: 'rgba(251, 191, 36, 0.15)', border: '#fbbf24', text: '#fbbf24' },
    3: { bg: 'rgba(239, 68, 68, 0.15)', border: '#ef4444', text: '#ef4444' },
    4: { bg: 'rgba(168, 85, 247, 0.15)', border: '#a855f7', text: '#a855f7' },
};

// 2D structure component with PubChem image
function Structure2D({ moleculeName }: { moleculeName: string }) {
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const cid = moleculeCids[moleculeName.toLowerCase()];
        if (cid) {
            setImageUrl(`https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${cid}/PNG?image_size=200x200`);
        } else {
            setError(true);
        }
        setLoading(false);
    }, [moleculeName]);

    if (loading) {
        return (
            <div style={{
                width: 120,
                height: 120,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'var(--neutral-800)',
                borderRadius: 12,
            }}>
                <span style={{ color: 'var(--neutral-500)' }}>⏳</span>
            </div>
        );
    }

    if (error || !imageUrl) {
        return (
            <div style={{
                width: 120,
                height: 120,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'var(--neutral-800)',
                borderRadius: 12,
                color: 'var(--neutral-500)',
                fontSize: '0.75rem',
            }}>
                No 2D
            </div>
        );
    }

    return (
        <div style={{
            width: 120,
            height: 120,
            borderRadius: 12,
            overflow: 'hidden',
            background: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <img
                src={imageUrl}
                alt={`2D structure of ${moleculeName}`}
                style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    objectFit: 'contain',
                }}
                onError={() => setError(true)}
            />
        </div>
    );
}

export default function MoleculeComparisonTable({
    title,
    molecules,
    showLevels = false,
    columns = ['2d', '3d', 'description'],
}: MoleculeComparisonTableProps) {
    const [expandedMolecule, setExpandedMolecule] = useState<string | null>(null);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 20,
                padding: '1.5rem',
                margin: '2rem 0',
                backdropFilter: 'blur(20px)',
            }}
        >
            {/* Header */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '1.5rem',
                paddingBottom: '1rem',
                borderBottom: '1px solid rgba(255,255,255,0.1)',
            }}>
                <span style={{ fontSize: '1.5rem' }}>📊</span>
                <h4 style={{
                    margin: 0,
                    fontSize: '1.2rem',
                    color: 'var(--neutral-100)',
                    fontWeight: 600,
                }}>
                    {title}
                </h4>
            </div>

            {/* Table */}
            <div style={{
                display: 'grid',
                gap: '1rem',
            }}>
                {molecules.map((mol, index) => {
                    const levelColor = mol.level !== undefined ? levelColors[mol.level] : null;
                    const isExpanded = expandedMolecule === mol.name;

                    return (
                        <motion.div
                            key={mol.name}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            onClick={() => setExpandedMolecule(isExpanded ? null : mol.name)}
                            style={{
                                display: 'grid',
                                gridTemplateColumns: showLevels
                                    ? 'auto 140px 1fr'
                                    : '140px 1fr',
                                gap: '1rem',
                                padding: '1rem',
                                background: levelColor?.bg || 'rgba(255,255,255,0.03)',
                                border: `1px solid ${levelColor?.border || 'rgba(255,255,255,0.1)'}`,
                                borderRadius: 16,
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                            }}
                            whileHover={{
                                scale: 1.01,
                                boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                            }}
                        >
                            {/* Level Badge */}
                            {showLevels && mol.level !== undefined && (
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: '0.5rem 1rem',
                                    background: levelColor?.bg,
                                    borderRadius: 12,
                                    minWidth: 60,
                                }}>
                                    <span style={{
                                        fontSize: '1.5rem',
                                        fontWeight: 700,
                                        color: levelColor?.text,
                                    }}>
                                        {mol.level}
                                    </span>
                                    <span style={{
                                        fontSize: '0.7rem',
                                        color: levelColor?.text,
                                        opacity: 0.8,
                                    }}>
                                        Level
                                    </span>
                                </div>
                            )}

                            {/* 2D Structure */}
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                <Structure2D moleculeName={mol.name} />
                            </div>

                            {/* Info + 3D Preview */}
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '0.5rem',
                            }}>
                                {/* Name and Formula */}
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'baseline',
                                    gap: '0.5rem',
                                    flexWrap: 'wrap',
                                }}>
                                    <span style={{
                                        fontSize: '1.1rem',
                                        fontWeight: 600,
                                        color: 'var(--neutral-100)',
                                    }}>
                                        {mol.name}
                                    </span>
                                    {mol.formula && (
                                        <span style={{
                                            fontSize: '0.85rem',
                                            color: levelColor?.text || 'var(--neutral-400)',
                                            fontFamily: 'monospace',
                                        }}>
                                            {mol.formula}
                                        </span>
                                    )}
                                </div>

                                {/* Description */}
                                <p style={{
                                    margin: 0,
                                    fontSize: '0.9rem',
                                    color: 'var(--neutral-300)',
                                    lineHeight: 1.5,
                                }}>
                                    {mol.description}
                                </p>

                                {/* 3D Preview Button */}
                                <div style={{
                                    display: 'flex',
                                    gap: '0.5rem',
                                    marginTop: '0.5rem',
                                }}>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setExpandedMolecule(isExpanded ? null : mol.name);
                                        }}
                                        style={{
                                            padding: '0.4rem 0.8rem',
                                            background: isExpanded
                                                ? 'var(--primary-500)'
                                                : 'rgba(255,255,255,0.1)',
                                            border: 'none',
                                            borderRadius: 8,
                                            color: 'white',
                                            fontSize: '0.8rem',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.3rem',
                                            transition: 'all 0.2s',
                                        }}
                                    >
                                        {isExpanded ? '📦 Hide 3D' : '🔬 View 3D'}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Expanded 3D Viewer */}
            {expandedMolecule && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    style={{
                        marginTop: '1.5rem',
                        borderTop: '1px solid rgba(255,255,255,0.1)',
                        paddingTop: '1.5rem',
                    }}
                >
                    <MoleculeViewer
                        moleculeName={expandedMolecule}
                        description={molecules.find(m => m.name === expandedMolecule)?.description || ''}
                        height={350}
                    />
                </motion.div>
            )}
        </motion.div>
    );
}
