'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getMolecule, hasMolecule as checkMolecule } from '@/data/moleculeRegistry';
import { MoleculeData } from '@/data/moleculeTypes';

// Structure2DRenderer - renders 2D skeletal structures from PubChem
function Structure2DRenderer({ pubchemCid, smiles, moleculeName }: {
    pubchemCid?: number;
    smiles?: string;
    moleculeName: string;
}) {
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setIsLoading(true);
        setError(null);

        // Use PubChem 2D image API - provides accurate skeletal structures
        if (pubchemCid) {
            // PubChem provides accurate 2D structures with proper bond angles
            const url = `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${pubchemCid}/PNG?image_size=300x300`;
            setImageUrl(url);
            setIsLoading(false);
        } else if (smiles) {
            // Fallback to SMILES-based rendering via PubChem
            const url = `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/smiles/${encodeURIComponent(smiles)}/PNG?image_size=300x300`;
            setImageUrl(url);
            setIsLoading(false);
        } else {
            setError('No structure data available');
            setIsLoading(false);
        }
    }, [pubchemCid, smiles]);

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            padding: '15px',
            boxSizing: 'border-box',
        }}>
            {isLoading ? (
                <div style={{ color: '#666', fontSize: '0.9rem' }}>
                    Loading 2D structure...
                </div>
            ) : error ? (
                <div style={{ color: '#999', fontSize: '0.8rem' }}>{error}</div>
            ) : imageUrl ? (
                <>
                    <img
                        src={imageUrl}
                        alt={`2D structure of ${moleculeName}`}
                        style={{
                            maxWidth: '100%',
                            maxHeight: 'calc(100% - 30px)',
                            objectFit: 'contain',
                        }}
                        onError={() => setError('Could not load 2D structure')}
                    />
                    <div style={{
                        marginTop: '8px',
                        fontSize: '0.65rem',
                        color: '#666',
                        textAlign: 'center',
                    }}>
                        📐 Zigzag Skeletal • ═ Double Bond • ≡ Triple Bond
                    </div>
                </>
            ) : null}
        </div>
    );
}

// Mobile detection hook
function useIsMobile() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(
                window.innerWidth < 768 ||
                'ontouchstart' in window ||
                navigator.maxTouchPoints > 0
            );
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return isMobile;
}

interface MoleculeViewerProps {
    moleculeName: string;
    smilesOrPdb?: string;
    description?: string;
    height?: number;
}

// ============================================
// MOLECULE DATA MOVED TO CHAPTER-SPECIFIC FILES
// ============================================
// Molecule data has been refactored into separate files for better organization:
// - src/data/moleculeTypes.ts - TypeScript interfaces
// - src/data/moleculeRegistry.ts - Central registry that aggregates all molecules
// - src/data/chapters/chapter1/molecules.ts - Chapter 1 molecules
// - src/data/chapters/chapter2/molecules.ts - Chapter 2 molecules
// 
// Use getMolecule(name) and checkMolecule(name) from the registry imports
// ============================================

type ViewStyle = 'stick' | 'sphere' | 'line' | 'cartoon';

export default function MoleculeViewer({
    moleculeName,
    description,
    height = 350
}: MoleculeViewerProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const viewerRef = useRef<any>(null);
    const rotationRef = useRef<number | null>(null);
    const [viewStyle, setViewStyle] = useState<ViewStyle>('stick');
    const [isLoading, setIsLoading] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isRotating, setIsRotating] = useState(false);
    const [viewMode, setViewMode] = useState<'3d' | '2d'>('3d'); // Toggle between 3D and 2D
    const isMobile = useIsMobile();

    const molecule = getMolecule(moleculeName.toLowerCase());
    const hasMolecule = !!molecule;

    // Load 3D viewer only when expanded
    useEffect(() => {
        if (!isExpanded || !containerRef.current || !hasMolecule) return;

        const loadViewer = async () => {
            setIsLoading(true);

            // Wait for DOM to be ready (important for mobile)
            await new Promise(resolve => setTimeout(resolve, 100));

            if (!containerRef.current) {
                setIsLoading(false);
                return;
            }

            try {
                // Dynamically import 3Dmol
                const $3Dmol = await import('3dmol');

                // Clear previous viewer
                if (viewerRef.current) {
                    viewerRef.current.clear();
                }

                // Ensure container has dimensions
                const container = containerRef.current;
                const rect = container.getBoundingClientRect();
                if (rect.width === 0 || rect.height === 0) {
                    console.warn('Container has no dimensions, retrying...');
                    await new Promise(resolve => setTimeout(resolve, 200));
                }

                // Create new viewer with mobile-optimized options
                const viewer = $3Dmol.createViewer(container, {
                    backgroundColor: 'rgba(10, 10, 15, 0.95)',
                    antialias: !isMobile, // Disable antialiasing on mobile for performance
                    disableFog: isMobile, // Disable fog on mobile
                });

                viewerRef.current = viewer;

                // Try to fetch from PubChem or RCSB PDB for accurate 3D structure
                let modelData = molecule.pdb;
                let modelFormat = molecule.format || 'pdb';
                let loaded3D = false;

                // First try PubChem 3D conformer
                if (molecule.pubchemCid) {
                    try {
                        const pubchemUrl = `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${molecule.pubchemCid}/SDF?record_type=3d`;
                        const response = await fetch(pubchemUrl);
                        if (response.ok) {
                            const sdfData = await response.text();
                            // Check if we got actual SDF data (not an error message)
                            if (sdfData.includes('V2000') || sdfData.includes('V3000')) {
                                modelData = sdfData;
                                modelFormat = 'sdf';
                                loaded3D = true;
                                console.log('Loaded SDF from PubChem for CID:', molecule.pubchemCid);
                            }
                        }
                    } catch (err) {
                        console.warn('PubChem 3D failed:', err);
                    }
                }

                // If PubChem failed and we have RCSB ligand ID, try RCSB PDB
                if (!loaded3D && molecule.rcsbLigandId) {
                    try {
                        const rcsbUrl = `https://files.rcsb.org/ligands/download/${molecule.rcsbLigandId}_ideal.sdf`;
                        const response = await fetch(rcsbUrl);
                        if (response.ok) {
                            const sdfData = await response.text();
                            if (sdfData.includes('V2000') || sdfData.includes('V3000')) {
                                modelData = sdfData;
                                modelFormat = 'sdf';
                                loaded3D = true;
                                console.log('Loaded SDF from RCSB PDB for ligand:', molecule.rcsbLigandId);
                            }
                        }
                    } catch (err) {
                        console.warn('RCSB PDB failed:', err);
                    }
                }

                if (!loaded3D) {
                    console.warn('Using local PDB fallback for:', moleculeName);
                }

                viewer.addModel(modelData, modelFormat);
                applyStyle(viewer, viewStyle, molecule.color);
                viewer.zoomTo();
                viewer.render();

                // Force a resize to ensure proper rendering on mobile
                if (isMobile) {
                    setTimeout(() => {
                        if (viewerRef.current) {
                            viewerRef.current.resize();
                            viewerRef.current.render();
                        }
                    }, 100);
                }

                // Stop rotation when user interacts with the viewer
                const stopRotationOnInteraction = () => {
                    if (rotationRef.current) {
                        cancelAnimationFrame(rotationRef.current);
                        rotationRef.current = null;
                        setIsRotating(false);
                    }
                };

                containerRef.current?.addEventListener('mousedown', stopRotationOnInteraction);
                containerRef.current?.addEventListener('touchstart', stopRotationOnInteraction);
                containerRef.current?.addEventListener('wheel', stopRotationOnInteraction);

            } catch (error) {
                console.error('Failed to load 3Dmol:', error);
            }

            setIsLoading(false);
        };

        loadViewer();

        return () => {
            if (rotationRef.current) {
                cancelAnimationFrame(rotationRef.current);
            }
            if (viewerRef.current) {
                viewerRef.current.clear();
                viewerRef.current = null;
            }
        };
    }, [isExpanded, moleculeName, hasMolecule]);

    useEffect(() => {
        if (viewerRef.current && hasMolecule) {
            applyStyle(viewerRef.current, viewStyle, molecule.color);
            viewerRef.current.render();
        }
    }, [viewStyle, moleculeName, hasMolecule, molecule?.color]);

    const applyStyle = (viewer: any, style: ViewStyle, color: string) => {
        viewer.setStyle({}, {});
        viewer.removeAllLabels();

        // Define element colors for reference (Jmol scheme)
        const elementColors: Record<string, string> = {
            'C': '#909090', // Gray - Carbon
            'O': '#FF0D0D', // Red - Oxygen  
            'N': '#3050F8', // Blue - Nitrogen
            'H': '#FFFFFF', // White - Hydrogen
            'S': '#FFFF00', // Yellow - Sulfur
            'F': '#90E050', // Light green - Fluorine
            'Cl': '#1FF01F', // Green - Chlorine
            'Br': '#A62929', // Brown - Bromine
        };

        switch (style) {
            case 'stick':
                // Ball and stick with clear bonds
                viewer.setStyle({}, {
                    stick: { radius: 0.12, colorscheme: 'Jmol' },
                    sphere: { scale: 0.3, colorscheme: 'Jmol' }
                });
                break;
            case 'sphere':
                // Large spheres to show atoms clearly
                viewer.setStyle({}, {
                    sphere: { scale: 0.9, colorscheme: 'Jmol' }
                });
                // Add labels on spheres
                const atoms = viewer.getModel().atoms;
                atoms.forEach((atom: any) => {
                    if (atom.elem !== 'H') { // Skip hydrogen labels for clarity
                        viewer.addLabel(atom.elem, {
                            position: { x: atom.x, y: atom.y, z: atom.z },
                            backgroundColor: 'rgba(0,0,0,0.7)',
                            fontColor: elementColors[atom.elem] || '#FFFFFF',
                            fontSize: 14,
                            fontOpacity: 1,
                            borderRadius: 4,
                            padding: 2,
                        });
                    }
                });
                break;
            case 'line':
                viewer.setStyle({}, {
                    line: { colorscheme: 'Jmol', linewidth: 2 }
                });
                break;
            case 'cartoon':
                // Custom colored representation
                viewer.setStyle({}, {
                    stick: { radius: 0.25, color: color },
                    sphere: { scale: 0.45, color: color }
                });
                break;
        }
    };

    const startRotation = () => {
        if (!viewerRef.current) return;

        const rotate = () => {
            if (viewerRef.current && isRotating) {
                viewerRef.current.rotate(0.5, 'y');
                viewerRef.current.render();
                rotationRef.current = requestAnimationFrame(rotate);
            }
        };
        rotate();
    };

    const stopRotation = () => {
        if (rotationRef.current) {
            cancelAnimationFrame(rotationRef.current);
            rotationRef.current = null;
        }
    };

    // Handle rotation state changes
    useEffect(() => {
        if (isRotating && viewerRef.current && isExpanded) {
            startRotation();
        } else {
            stopRotation();
        }
        return () => stopRotation();
    }, [isRotating, isExpanded]);

    const handleStyleChange = (style: ViewStyle) => {
        setViewStyle(style);
    };

    const toggleRotation = () => {
        setIsRotating(!isRotating);
    };

    const handleClose = () => {
        setIsExpanded(false);
        if (viewerRef.current) {
            viewerRef.current.clear();
            viewerRef.current = null;
        }
    };

    // Placeholder card when not expanded
    if (!isExpanded) {
        return (
            <motion.div
                className="molecule-viewer-container"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                style={{
                    background: hasMolecule
                        ? `linear-gradient(135deg, ${molecule.color}15 0%, rgba(30, 30, 46, 0.95) 50%)`
                        : 'var(--gradient-card)',
                    cursor: hasMolecule ? 'pointer' : 'default',
                }}
                onClick={() => hasMolecule && setIsExpanded(true)}
                whileHover={hasMolecule ? { scale: 1.02, y: -4 } : {}}
                whileTap={hasMolecule ? { scale: 0.98 } : {}}
            >
                <div style={{
                    padding: '2rem',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '180px',
                    textAlign: 'center',
                }}>
                    {hasMolecule ? (
                        <>
                            <span style={{ fontSize: '3.5rem', marginBottom: '0.75rem' }}>
                                {molecule.emoji}
                            </span>
                            <h4 style={{
                                margin: 0,
                                fontSize: '1.2rem',
                                color: 'var(--neutral-100)',
                                fontWeight: 600,
                                marginBottom: '0.25rem',
                            }}>
                                {moleculeName}
                            </h4>
                            {/* Chemical Formula */}
                            <div style={{
                                fontSize: '1.1rem',
                                fontWeight: 600,
                                color: molecule.color,
                                marginBottom: '0.5rem',
                                fontFamily: 'monospace',
                            }}>
                                {molecule.formula}
                            </div>
                            {/* Skeletal Description */}
                            <p style={{
                                margin: '0 0 0.75rem',
                                fontSize: '0.8rem',
                                color: 'var(--neutral-400)',
                                lineHeight: 1.4,
                                textAlign: 'center',
                            }}>
                                📐 {molecule.skeletal}
                            </p>
                            {/* Functional Groups */}
                            <div style={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: '6px',
                                justifyContent: 'center',
                                marginBottom: '1rem',
                            }}>
                                {molecule.functionalGroups.map((group, i) => (
                                    <span
                                        key={i}
                                        style={{
                                            background: `${molecule.color}20`,
                                            color: molecule.color,
                                            padding: '3px 8px',
                                            borderRadius: '6px',
                                            fontSize: '0.7rem',
                                            fontWeight: 500,
                                        }}
                                    >
                                        {group}
                                    </span>
                                ))}
                            </div>
                            {description && (
                                <p style={{
                                    margin: '0 0 0.75rem',
                                    fontSize: '0.8rem',
                                    color: 'var(--neutral-500)',
                                    lineHeight: 1.4,
                                }}>
                                    {description}
                                </p>
                            )}
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                style={{
                                    padding: '10px 24px',
                                    background: `linear-gradient(135deg, ${molecule.color} 0%, ${molecule.color}cc 100%)`,
                                    border: 'none',
                                    borderRadius: '12px',
                                    color: 'white',
                                    fontSize: '0.9rem',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    boxShadow: `0 4px 20px ${molecule.color}40`,
                                }}
                            >
                                <span>🔬</span>
                                View 3D Model
                            </motion.button>
                        </>
                    ) : (
                        <>
                            <span style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.5 }}>🧬</span>
                            <h4 style={{
                                margin: 0,
                                fontSize: '1.1rem',
                                color: 'var(--neutral-300)',
                                fontWeight: 600,
                            }}>
                                {moleculeName}
                            </h4>
                            <p style={{
                                margin: '0.5rem 0 0',
                                fontSize: '0.8rem',
                                color: 'var(--neutral-500)',
                            }}>
                                3D model coming soon
                            </p>
                        </>
                    )}
                </div>
            </motion.div>
        );
    }

    // Expanded 3D viewer
    return (
        <motion.div
            className="molecule-viewer-container"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
        >
            {/* Header */}
            <div style={{
                padding: '1rem 1.5rem',
                borderBottom: '1px solid var(--card-border)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <div>
                    <h4 style={{
                        margin: 0,
                        fontSize: '1.1rem',
                        color: 'var(--neutral-100)',
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                    }}>
                        <span>{molecule?.emoji || '🧬'}</span>
                        {moleculeName}
                        <span style={{
                            fontFamily: 'monospace',
                            color: molecule?.color || 'var(--primary-400)',
                            fontSize: '0.95rem',
                        }}>
                            {molecule?.formula}
                        </span>
                    </h4>
                    <p style={{
                        margin: '0.25rem 0 0',
                        fontSize: '0.8rem',
                        color: 'var(--neutral-400)',
                    }}>
                        📐 {molecule?.skeletal || description}
                    </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span className="badge">3D Interactive</span>
                    <button
                        onClick={handleClose}
                        style={{
                            padding: '8px 14px',
                            background: 'rgba(255, 255, 255, 0.1)',
                            border: 'none',
                            borderRadius: '8px',
                            color: 'var(--neutral-300)',
                            fontSize: '0.8rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                        }}
                    >
                        ✕ Close
                    </button>
                </div>
            </div>

            {/* Viewer */}
            <div style={{ position: 'relative' }}>
                <AnimatePresence>
                    {isLoading && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            style={{
                                position: 'absolute',
                                inset: 0,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                background: 'var(--neutral-900)',
                                zIndex: 10
                            }}
                        >
                            <div style={{ textAlign: 'center' }}>
                                <div style={{
                                    fontSize: '2rem',
                                    marginBottom: '0.5rem',
                                    animation: 'pulse 1.5s infinite',
                                }}>
                                    🔬
                                </div>
                                <div style={{ color: 'var(--primary-400)' }}>
                                    Loading 3D model...
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
                <div
                    ref={containerRef}
                    style={{
                        width: '100%',
                        height: isMobile ? '280px' : `${height}px`,
                        position: 'relative',
                        zIndex: 1,
                        touchAction: 'none',
                        WebkitUserSelect: 'none',
                        userSelect: 'none',
                        overflow: 'hidden',
                        borderRadius: '12px',
                    }}
                />

                {/* 2D Structure View (when in 2D mode) */}
                {viewMode === '2d' && molecule && (
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        zIndex: 5,
                        background: 'rgba(255,255,255,0.95)',
                        borderRadius: '12px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden',
                    }}>
                        <Structure2DRenderer
                            pubchemCid={molecule.pubchemCid}
                            smiles={molecule.smiles}
                            moleculeName={moleculeName}
                        />
                    </div>
                )}
            </div>

            {/* 3D/2D Toggle */}
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '8px',
                margin: '12px 16px',
            }}>
                <button
                    onClick={() => setViewMode('3d')}
                    style={{
                        flex: 1,
                        padding: '10px',
                        background: viewMode === '3d'
                            ? 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)'
                            : 'rgba(255, 255, 255, 0.1)',
                        border: 'none',
                        borderRadius: '10px',
                        color: viewMode === '3d' ? 'white' : 'var(--neutral-400)',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                    }}
                >
                    🔮 3D Model
                </button>
                <button
                    onClick={() => setViewMode('2d')}
                    style={{
                        flex: 1,
                        padding: '10px',
                        background: viewMode === '2d'
                            ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                            : 'rgba(255, 255, 255, 0.1)',
                        border: 'none',
                        borderRadius: '10px',
                        color: viewMode === '2d' ? 'white' : 'var(--neutral-400)',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                    }}
                >
                    📐 2D Skeletal
                </button>
            </div>

            {/* Controls */}
            <div className="molecule-controls">
                <button
                    className={viewStyle === 'stick' ? 'active' : ''}
                    onClick={() => handleStyleChange('stick')}
                >
                    Stick
                </button>
                <button
                    className={viewStyle === 'sphere' ? 'active' : ''}
                    onClick={() => handleStyleChange('sphere')}
                >
                    Sphere
                </button>
                <button
                    className={viewStyle === 'line' ? 'active' : ''}
                    onClick={() => handleStyleChange('line')}
                >
                    Line
                </button>
                <button
                    className={viewStyle === 'cartoon' ? 'active' : ''}
                    onClick={() => handleStyleChange('cartoon')}
                >
                    Colored
                </button>
                <div style={{ flex: 1 }} />
                <button onClick={toggleRotation}>
                    {isRotating ? '⏸ Pause' : '▶ Rotate'}
                </button>
            </div>

            {/* Element Color Legend */}
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '16px',
                flexWrap: 'wrap',
                padding: '10px 16px',
                background: 'rgba(0, 0, 0, 0.3)',
                borderRadius: '12px',
                margin: '12px 16px 0',
            }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--neutral-400)', marginRight: '4px' }}>Colors:</span>
                {[
                    { symbol: 'C', name: 'Carbon', color: '#909090' },
                    { symbol: 'O', name: 'Oxygen', color: '#FF0D0D' },
                    { symbol: 'N', name: 'Nitrogen', color: '#3050F8' },
                    { symbol: 'H', name: 'Hydrogen', color: '#FFFFFF' },
                    { symbol: 'S', name: 'Sulfur', color: '#FFFF30' },
                ].map(el => (
                    <div key={el.symbol} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '0.7rem',
                        color: 'var(--neutral-300)',
                    }}>
                        <span style={{
                            width: '12px',
                            height: '12px',
                            borderRadius: '50%',
                            background: el.color,
                            border: el.symbol === 'H' ? '1px solid #666' : 'none',
                            boxShadow: `0 0 6px ${el.color}60`,
                        }} />
                        <span style={{ fontWeight: 600 }}>{el.symbol}</span>
                        <span style={{ color: 'var(--neutral-500)' }}>{el.name}</span>
                    </div>
                ))}
            </div>
        </motion.div>
    );
}
