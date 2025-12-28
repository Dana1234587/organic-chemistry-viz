'use client';

import { motion } from 'framer-motion';
import MoleculeViewer from './MoleculeViewer';

interface MoleculeEntry {
    name: string;
    description: string;
    level?: number;
    formula?: string;
}

interface Props {
    title: string;
    molecules: MoleculeEntry[];
    showLevels?: boolean;
}

const LEVEL_STYLES: Record<number, { bg: string; border: string; accent: string }> = {
    0: { bg: 'rgba(34, 197, 94, 0.08)', border: '#22c55e', accent: '#22c55e' },
    1: { bg: 'rgba(59, 130, 246, 0.08)', border: '#3b82f6', accent: '#3b82f6' },
    2: { bg: 'rgba(251, 191, 36, 0.08)', border: '#fbbf24', accent: '#fbbf24' },
    3: { bg: 'rgba(239, 68, 68, 0.08)', border: '#ef4444', accent: '#ef4444' },
    4: { bg: 'rgba(168, 85, 247, 0.08)', border: '#a855f7', accent: '#a855f7' },
};

export default function MoleculeComparisonTable({ title, molecules, showLevels = false }: Props) {
    return (
        <div style={{ margin: '2rem 0' }}>
            {/* Title */}
            <h4 style={{
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                margin: '0 0 1.25rem', fontSize: '1.1rem', color: 'var(--neutral-100)',
            }}>
                <span>🧬</span> {title}
            </h4>

            {/* Grid - Use original MoleculeViewer component */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                gap: '1.5rem',
            }}>
                {molecules.map((mol, index) => {
                    const style = mol.level !== undefined ? LEVEL_STYLES[mol.level] : null;

                    return (
                        <motion.div
                            key={mol.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            style={{
                                position: 'relative',
                            }}
                        >
                            {/* Level Badge (if showLevels) */}
                            {showLevels && mol.level !== undefined && (
                                <div style={{
                                    position: 'absolute',
                                    top: 10,
                                    right: 10,
                                    zIndex: 10,
                                    padding: '4px 12px',
                                    background: style?.bg,
                                    border: `1px solid ${style?.border}`,
                                    borderRadius: 16,
                                    fontSize: '0.7rem',
                                    fontWeight: 700,
                                    color: style?.accent,
                                }}>
                                    Level {mol.level}
                                </div>
                            )}

                            {/* Use the original MoleculeViewer - it handles its own expand/collapse */}
                            <MoleculeViewer
                                moleculeName={mol.name}
                                description={mol.description}
                                height={350}
                            />
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
