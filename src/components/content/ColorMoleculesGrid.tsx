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

type ViewStyle = 'stick' | 'sphere' | 'line' | 'colored';

const ELEMENT_COLORS: Record<string, { color: string; name: string }> = {
    'C': { color: '#909090', name: 'Carbon' },
    'O': { color: '#FF0D0D', name: 'Oxygen' },
    'N': { color: '#3050F8', name: 'Nitrogen' },
    'H': { color: '#FFFFFF', name: 'Hydrogen' },
    'S': { color: '#FFFF30', name: 'Sulfur' },
    'Cl': { color: '#1FF01F', name: 'Chlorine' },
    'Br': { color: '#A62929', name: 'Bromine' },
    'Mg': { color: '#8AFF00', name: 'Magnesium' },
    'P': { color: '#FF8000', name: 'Phosphorus' },
};

// Full-featured Inline 3D Viewer matching Lessons 1/2
function Inline3DViewer({ pdbId, moleculeColor }: { pdbId: string; moleculeColor: string }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const viewerRef = useRef<any>(null);
    const rotationRef = useRef<number | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [viewStyle, setViewStyle] = useState<ViewStyle>('stick');
    const [isRotating, setIsRotating] = useState(true);

    const moleculeData = getMolecule(pdbId);

    const applyStyle = (viewer: any, style: ViewStyle) => {
        if (!viewer) return;

        try {
            viewer.setStyle({}, {});
            viewer.removeAllLabels();

            switch (style) {
                case 'stick':
                    viewer.setStyle({}, {
                        stick: { radius: 0.18, colorscheme: 'Jmol' },
                        sphere: { scale: 0.35, colorscheme: 'Jmol' }
                    });
                    break;
                case 'sphere':
                    viewer.setStyle({}, {
                        sphere: { scale: 0.9, colorscheme: 'Jmol' }
                    });
                    break;
                case 'line':
                    viewer.setStyle({}, {
                        line: { colorscheme: 'Jmol', linewidth: 3 }
                    });
                    break;
                case 'colored':
                    viewer.setStyle({}, {
                        stick: { radius: 0.22, color: moleculeColor },
                        sphere: { scale: 0.4, color: moleculeColor }
                    });
                    break;
            }

            // Add labels for non-H atoms - with safety checks
            const model = viewer.getModel();
            if (model && model.atoms && Array.isArray(model.atoms)) {
                model.atoms.forEach((atom: any) => {
                    if (atom && atom.elem && atom.elem !== 'H') {
                        viewer.addLabel(atom.elem, {
                            position: { x: atom.x, y: atom.y, z: atom.z },
                            backgroundColor: 'rgba(0,0,0,0.5)',
                            fontColor: ELEMENT_COLORS[atom.elem]?.color || '#FFFFFF',
                            fontSize: 11,
                            inFront: true
                        });
                    }
                });
            }

            viewer.render();
        } catch (err) {
            console.warn('Error applying style:', err);
        }
    };

    useEffect(() => {
        if (!containerRef.current) return;

        if (!moleculeData) {
            setError('Molecule not found: ' + pdbId);
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
                let hasValidModel = false;

                // Try PubChem for 3D structure
                if (moleculeData.pubchemCid) {
                    try {
                        const pubchemUrl = `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${moleculeData.pubchemCid}/SDF?record_type=3d`;
                        const response = await fetch(pubchemUrl);
                        if (response.ok) {
                            const sdfData = await response.text();
                            if (sdfData.includes('V2000') || sdfData.includes('V3000')) {
                                modelData = sdfData;
                                modelFormat = 'sdf';
                                hasValidModel = true;
                            }
                        }
                    } catch (err) {
                        console.warn('PubChem 3D fetch failed');
                    }
                }

                // Check if we have valid structural data (not just placeholder)
                const isPlaceholder = !modelData || modelData.length < 100 || modelData.startsWith('COMPND');

                if (!hasValidModel && isPlaceholder) {
                    setError('3D structure coming soon!');
                    setIsLoading(false);
                    return;
                }

                viewer.addModel(modelData, modelFormat);

                // Verify model was added successfully
                const model = viewer.getModel();
                if (!model || !model.atoms || model.atoms.length === 0) {
                    setError('3D structure coming soon!');
                    setIsLoading(false);
                    return;
                }

                applyStyle(viewer, viewStyle);
                viewer.zoomTo();
                viewer.render();

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

    // Apply style changes
    useEffect(() => {
        if (viewerRef.current && !isLoading) {
            applyStyle(viewerRef.current, viewStyle);
        }
    }, [viewStyle, isLoading]);

    // Handle rotation
    useEffect(() => {
        const rotate = () => {
            if (viewerRef.current && isRotating) {
                viewerRef.current.rotate(0.6, 'y');
                viewerRef.current.render();
                rotationRef.current = requestAnimationFrame(rotate);
            }
        };

        if (isRotating && viewerRef.current && !isLoading) {
            rotate();
        } else if (rotationRef.current) {
            cancelAnimationFrame(rotationRef.current);
            rotationRef.current = null;
        }

        return () => {
            if (rotationRef.current) cancelAnimationFrame(rotationRef.current);
        };
    }, [isRotating, isLoading]);

    if (!moleculeData) {
        return (
            <div style={{
                height: '100%', display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                background: '#0F1116', color: '#94a3b8'
            }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🧬</div>
                <div>3D not available for: {pdbId}</div>
            </div>
        );
    }

    const styleButtons: { id: ViewStyle; label: string }[] = [
        { id: 'stick', label: 'Stick' },
        { id: 'sphere', label: 'Sphere' },
        { id: 'line', label: 'Line' },
        { id: 'colored', label: 'Colored' },
    ];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#0F1116' }}>
            {/* 3D Viewer Container */}
            <div style={{ position: 'relative', flex: 1, minHeight: '200px' }}>
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
                    style={{ width: '100%', height: '100%', minHeight: '200px', touchAction: 'none' }}
                />
            </div>

            {/* Controls Bar */}
            <div style={{
                padding: '10px 12px',
                background: 'rgba(0,0,0,0.3)',
                borderTop: '1px solid rgba(255,255,255,0.1)'
            }}>
                {/* Style Buttons */}
                <div style={{ display: 'flex', gap: '6px', marginBottom: '8px', flexWrap: 'wrap' }}>
                    {styleButtons.map(btn => (
                        <button
                            key={btn.id}
                            onClick={() => setViewStyle(btn.id)}
                            style={{
                                padding: '6px 12px',
                                background: viewStyle === btn.id
                                    ? 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)'
                                    : 'rgba(255,255,255,0.08)',
                                border: 'none',
                                borderRadius: '8px',
                                color: viewStyle === btn.id ? 'white' : 'rgba(255,255,255,0.6)',
                                fontSize: '0.75rem',
                                fontWeight: 600,
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}
                        >
                            {btn.label}
                        </button>
                    ))}

                    {/* Rotate Button */}
                    <button
                        onClick={() => setIsRotating(!isRotating)}
                        style={{
                            padding: '6px 12px',
                            background: isRotating
                                ? 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)'
                                : 'rgba(255,255,255,0.08)',
                            border: 'none',
                            borderRadius: '8px',
                            color: isRotating ? 'white' : 'rgba(255,255,255,0.6)',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                        }}
                    >
                        {isRotating ? '⏸' : '▶'} Rotate
                    </button>
                </div>

                {/* Color Legend */}
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '8px',
                    fontSize: '0.65rem',
                    color: 'rgba(255,255,255,0.6)'
                }}>
                    <span style={{ fontWeight: 600 }}>Colors:</span>
                    {Object.entries(ELEMENT_COLORS).slice(0, 5).map(([elem, data]) => (
                        <span key={elem} style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                            <span style={{
                                width: '10px',
                                height: '10px',
                                borderRadius: '50%',
                                background: data.color,
                                border: elem === 'H' ? '1px solid rgba(255,255,255,0.3)' : 'none'
                            }} />
                            <span style={{ color: data.color }}>{elem}</span>
                            <span>{data.name}</span>
                        </span>
                    ))}
                </div>
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
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
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
                            minHeight: '480px'
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
                                { id: '2d', label: '📝 2D Skeletal' },
                                { id: '3d', label: '🧊 3D Model' }
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
                        <div style={{ flex: 1, position: 'relative', minHeight: '320px' }}>
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
                                                    style={{ maxWidth: '100%', maxHeight: '220px', objectFit: 'contain' }}
                                                />
                                                <div style={{
                                                    marginTop: '0.75rem', padding: '0.5rem',
                                                    background: '#f1f5f9', borderRadius: '8px',
                                                    fontSize: '0.7rem', color: '#475569', textAlign: 'center'
                                                }}>
                                                    <strong>Conjugation:</strong> Alternating single/double bonds cause color
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
                                        style={{ height: '100%', minHeight: '320px' }}
                                    >
                                        {example.pdbId ? (
                                            <Inline3DViewer pdbId={example.pdbId} moleculeColor={example.color} />
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
