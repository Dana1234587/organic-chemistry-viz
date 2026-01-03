'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { getMolecule } from '@/data/moleculeRegistry';

interface ColorExample {
    name: string;
    description: string;
    color: string;
    type: 'liquid' | 'solid' | 'gas' | 'crystal';
    structure2d?: string;
    pdbId?: string;
}

interface ColorMoleculesGridProps {
    examples: ColorExample[];
}

// Inline 3D Viewer - Auto-loads and auto-rotates without click-to-expand
function Inline3DViewer({ pdbId, color }: { pdbId: string; color: string }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const viewerRef = useRef<any>(null);
    const rotationRef = useRef<number | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const moleculeData = getMolecule(pdbId);

    useEffect(() => {
        if (!containerRef.current) return;

        if (!moleculeData) {
            setError('Molecule not in registry: ' + pdbId);
            setIsLoading(false);
            return;
        }

        const loadViewer = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const $3Dmol = await import('3dmol');

                if (viewerRef.current) {
                    viewerRef.current.clear();
                }

                const viewer = $3Dmol.createViewer(containerRef.current, {
                    backgroundColor: 'rgba(15, 17, 22, 1)',
                    antialias: true,
                });

                viewerRef.current = viewer;

                let modelData = moleculeData.pdb;
                let modelFormat = moleculeData.format || 'pdb';

                // Try PubChem for accurate 3D
                if (moleculeData.pubchemCid) {
                    try {
                        const pubchemUrl = `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${moleculeData.pubchemCid}/SDF?record_type=3d`;
                        const response = await fetch(pubchemUrl);
                        if (response.ok) {
                            const sdfData = await response.text();
                            if (sdfData.includes('V2000') || sdfData.includes('V3000')) {
                                modelData = sdfData;
                                modelFormat = 'sdf';
                            }
                        }
                    } catch (err) {
                        console.warn('PubChem fetch failed');
                    }
                }

                viewer.addModel(modelData, modelFormat);

                // Bigger atoms & clear bonds
                viewer.setStyle({}, {
                    stick: { radius: 0.18, colorscheme: 'Jmol' },
                    sphere: { scale: 0.38, colorscheme: 'Jmol' }
                });

                // Add labels for non-H atoms
                const atoms = viewer.getModel().atoms;
                const elementColors: Record<string, string> = {
                    'C': '#909090', 'O': '#FF0D0D', 'N': '#3050F8',
                    'H': '#FFFFFF', 'S': '#FFFF00', 'Cl': '#1FF01F',
                    'Br': '#A62929', 'Mg': '#00FF00', 'P': '#FF8000'
                };
                atoms.forEach((atom: any) => {
                    if (atom.elem !== 'H') {
                        viewer.addLabel(atom.elem, {
                            position: { x: atom.x, y: atom.y, z: atom.z },
                            backgroundColor: 'rgba(0,0,0,0.5)',
                            fontColor: elementColors[atom.elem] || '#FFFFFF',
                            fontSize: 12,
                            inFront: true,
                            showBackground: true
                        });
                    }
                });

                viewer.zoomTo();
                viewer.render();

                // Auto-rotate continuously
                const rotate = () => {
                    if (viewerRef.current) {
                        viewerRef.current.rotate(0.6, 'y');
                        viewerRef.current.render();
                        rotationRef.current = requestAnimationFrame(rotate);
                    }
                };
                rotate();

                setIsLoading(false);
            } catch (err) {
                console.error('3Dmol load failed:', err);
                setError('Failed to load 3D');
                setIsLoading(false);
            }
        };

        const timer = setTimeout(loadViewer, 150);

        return () => {
            clearTimeout(timer);
            if (rotationRef.current) cancelAnimationFrame(rotationRef.current);
            if (viewerRef.current) {
                viewerRef.current.clear();
                viewerRef.current = null;
            }
        };
    }, [pdbId, moleculeData]);

    if (!moleculeData) {
        return (
            <div style={{
                height: '100%', display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                background: 'rgba(15, 17, 22, 1)', color: '#94a3b8'
            }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🧬</div>
                <div>3D not available for: {pdbId}</div>
            </div>
        );
    }

    return (
        <div style={{ position: 'relative', height: '100%', minHeight: '280px', background: '#0F1116' }}>
            {isLoading && (
                <div style={{
                    position: 'absolute', inset: 0, display: 'flex',
                    alignItems: 'center', justifyContent: 'center',
                    background: 'rgba(15, 17, 22, 0.9)', zIndex: 10
                }}>
                    <div style={{ textAlign: 'center', color: '#94a3b8' }}>
                        <div style={{ fontSize: '1.5rem', animation: 'pulse 1.5s infinite' }}>🔬</div>
                        <div style={{ fontSize: '0.8rem' }}>Loading 3D...</div>
                    </div>
                </div>
            )}
            {error && (
                <div style={{
                    position: 'absolute', inset: 0, display: 'flex',
                    alignItems: 'center', justifyContent: 'center', color: '#ef4444'
                }}>
                    {error}
                </div>
            )}
            <div
                ref={containerRef}
                style={{ width: '100%', height: '100%', minHeight: '280px', touchAction: 'none' }}
            />
            {/* Controls hint */}
            <div style={{
                position: 'absolute', bottom: '8px', left: '50%', transform: 'translateX(-50%)',
                background: 'rgba(0,0,0,0.6)', borderRadius: '8px', padding: '4px 12px',
                fontSize: '0.65rem', color: '#94a3b8', display: 'flex', gap: '8px'
            }}>
                <span>↻ Auto-rotating</span>
                <span>•</span>
                <span>Drag to interact</span>
            </div>
        </div>
    );
}

export default function ColorMoleculesGrid({ examples }: ColorMoleculesGridProps) {
    const [viewModes, setViewModes] = useState<Record<string, 'info' | '2d' | '3d'>>({});

    const toggleView = (name: string, mode: 'info' | '2d' | '3d') => {
        setViewModes(prev => ({ ...prev, [name]: mode }));
    };

    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.5rem',
            marginTop: '2rem',
            marginBottom: '2rem'
        }}>
            {examples.map((example, index) => {
                const activeMode = viewModes[example.name] || 'info';
                const moleculeData = example.pdbId ? getMolecule(example.pdbId) : undefined;
                const pubchemCid = moleculeData?.pubchemCid;

                return (
                    <motion.div
                        key={example.name}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        style={{
                            background: 'rgba(255, 255, 255, 0.03)',
                            borderRadius: '24px',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            overflow: 'hidden',
                            display: 'flex',
                            flexDirection: 'column',
                            position: 'relative',
                            minHeight: '420px'
                        }}
                    >
                        {/* Header */}
                        <div style={{
                            padding: '1.25rem',
                            background: `linear-gradient(180deg, ${example.color}20 0%, transparent 100%)`,
                            borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}>
                            <h3 style={{
                                margin: 0, fontSize: '1.2rem', fontWeight: 700, color: 'white',
                                textShadow: `0 0 20px ${example.color}80`
                            }}>
                                {example.name}
                            </h3>
                            <span style={{
                                fontSize: '0.7rem', padding: '4px 10px', borderRadius: '12px',
                                background: 'rgba(0,0,0,0.4)', color: 'rgba(255,255,255,0.7)',
                                textTransform: 'uppercase', fontWeight: 600
                            }}>
                                {example.type}
                            </span>
                        </div>

                        {/* Tabs */}
                        <div style={{
                            display: 'flex', gap: '0.5rem', padding: '0.75rem 1.25rem',
                            borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                            background: 'rgba(0,0,0,0.2)'
                        }}>
                            {[
                                { id: 'info', label: '📖 Info' },
                                { id: '2d', label: '📝 2D' },
                                { id: '3d', label: '🧊 3D' }
                            ].map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => toggleView(example.name, tab.id as any)}
                                    style={{
                                        flex: 1, padding: '0.5rem',
                                        background: activeMode === tab.id ? 'rgba(255,255,255,0.15)' : 'transparent',
                                        border: activeMode === tab.id ? '1px solid rgba(255,255,255,0.25)' : '1px solid transparent',
                                        borderRadius: '8px',
                                        color: activeMode === tab.id ? 'white' : 'rgba(255,255,255,0.5)',
                                        fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s'
                                    }}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        {/* Content */}
                        <div style={{ flex: 1, position: 'relative', minHeight: '280px' }}>
                            <AnimatePresence mode="wait">
                                {activeMode === 'info' && (
                                    <motion.div
                                        key="info"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        style={{ padding: '1.5rem' }}
                                    >
                                        <p style={{ color: '#cbd5e1', margin: 0, lineHeight: 1.6 }}>
                                            {example.description}
                                        </p>
                                        <div style={{
                                            marginTop: '1.5rem', padding: '1rem',
                                            background: `${example.color}10`, borderRadius: '12px',
                                            border: `1px solid ${example.color}30`
                                        }}>
                                            <strong style={{ color: example.color, fontSize: '0.8rem' }}>
                                                Why this color?
                                            </strong>
                                            <p style={{ margin: '0.5rem 0 0', fontSize: '0.85rem', color: '#94a3b8' }}>
                                                Extended conjugation (alternating C=C) lowers the HOMO-LUMO gap, enabling visible light absorption.
                                            </p>
                                        </div>
                                    </motion.div>
                                )}

                                {activeMode === '2d' && (
                                    <motion.div
                                        key="2d"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        style={{
                                            height: '100%', display: 'flex', flexDirection: 'column',
                                            alignItems: 'center', justifyContent: 'center',
                                            background: 'white', padding: '1rem'
                                        }}
                                    >
                                        {pubchemCid ? (
                                            <>
                                                <img
                                                    src={`https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${pubchemCid}/PNG?image_size=300x300`}
                                                    alt={`${example.name} structure`}
                                                    style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'contain' }}
                                                />
                                                <div style={{
                                                    marginTop: '0.75rem', padding: '0.5rem',
                                                    background: '#f1f5f9', borderRadius: '8px',
                                                    fontSize: '0.7rem', color: '#475569', textAlign: 'center'
                                                }}>
                                                    <strong>Conjugation:</strong> Alternating single/double bonds
                                                </div>
                                            </>
                                        ) : (
                                            <div style={{ textAlign: 'center', color: '#64748b' }}>
                                                2D structure unavailable
                                            </div>
                                        )}
                                    </motion.div>
                                )}

                                {activeMode === '3d' && (
                                    <motion.div
                                        key="3d"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        style={{ height: '100%', minHeight: '280px' }}
                                    >
                                        {example.pdbId ? (
                                            <Inline3DViewer pdbId={example.pdbId} color={example.color} />
                                        ) : (
                                            <div style={{
                                                height: '100%', display: 'flex',
                                                alignItems: 'center', justifyContent: 'center',
                                                background: '#0F1116', color: '#94a3b8'
                                            }}>
                                                No 3D model available
                                            </div>
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Bottom gradient */}
                        <div style={{
                            height: '3px',
                            background: `linear-gradient(90deg, transparent, ${example.color}, transparent)`,
                            opacity: 0.8
                        }} />
                    </motion.div>
                );
            })}
        </div>
    );
}
