'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

interface DrugData {
    name: string;
    genericName: string;
    emoji: string;
    color: string;
    formula: string;
    pubchemCid: number;
    state: 'solid' | 'crystal' | 'liquid' | 'powder';
    chromophore: string;
    clinicalEffect: string;
    urineColor: string;
    patientScenario: string;
    molecularBasis: string;
    functionalGroups: {
        name: string;
        role: string;
        drugDiscoveryUse: string;
    }[];
}

const CLINICAL_DRUGS: DrugData[] = [
    {
        name: 'Rifampicin',
        genericName: 'Rifampin',
        emoji: '🔴',
        color: '#dc2626',
        formula: 'C₄₃H₅₈N₄O₁₂',
        pubchemCid: 5458213, // Standard rifampicin CID with 3D available
        state: 'crystal',
        chromophore: 'Naphthoquinone conjugated system',
        clinicalEffect: 'Stains ALL body fluids red-orange (urine, tears, sweat)',
        urineColor: 'Bright Red-Orange',
        patientScenario: 'TB patient on rifampicin therapy - used as compliance marker',
        molecularBasis: 'Massive conjugated aromatic system absorbs blue-green light, reflecting red-orange',
        functionalGroups: [
            { name: 'Quinone Ring', role: 'Primary chromophore', drugDiscoveryUse: 'Target site for oxidation-reduction reactions with bacterial RNA polymerase' },
            { name: 'Multiple -OH groups', role: 'Hydrogen bonding', drugDiscoveryUse: 'Enhance water solubility and protein binding affinity' },
            { name: 'Piperazine ring', role: 'Basicity & solubility', drugDiscoveryUse: 'Improves oral bioavailability by enabling salt formation' },
            { name: 'Macrocyclic lactam', role: 'Structural rigidity', drugDiscoveryUse: 'Provides selective binding to bacterial vs human RNA polymerase' }
        ]
    },
    {
        name: 'Phenazopyridine',
        genericName: 'Pyridium',
        emoji: '🟠',
        color: '#ea580c',
        formula: 'C₁₁H₁₁N₅',
        pubchemCid: 4756,
        state: 'crystal',
        chromophore: 'Azo group (N=N) bridging aromatic rings',
        clinicalEffect: 'Turns urine deep "neon" orange',
        urineColor: 'Neon Orange',
        patientScenario: 'UTI symptom relief - harmless but striking color change',
        molecularBasis: 'Extended π-electron pathway through N=N bond creates intense orange absorption',
        functionalGroups: [
            { name: 'Azo group (-N=N-)', role: 'Primary chromophore', drugDiscoveryUse: 'Azo bonds are used as pro-drug linkers that release active drug in the colon via bacterial reduction' },
            { name: 'Aromatic amines (-NH₂)', role: 'Electron donation', drugDiscoveryUse: 'Extend conjugation and provide sites for metabolism/excretion' },
            { name: 'Pyridine ring', role: 'Basicity', drugDiscoveryUse: 'Enables urinary concentration - basic drugs concentrate in acidic urine' }
        ]
    },
    {
        name: 'Riboflavin (B2)',
        genericName: 'Vitamin B2',
        emoji: '🟡',
        color: '#eab308',
        formula: 'C₁₇H₂₀N₄O₆',
        pubchemCid: 493570,
        state: 'crystal',
        chromophore: 'Isoalloxazine ring system',
        clinicalEffect: 'Fluorescent yellow urine - absorbs UV, emits visible light',
        urineColor: 'Fluorescent Neon Yellow',
        patientScenario: 'Multivitamin supplementation - excess B2 excreted',
        molecularBasis: 'Conjugated tricyclic system exhibits fluorescence (absorbs UV → emits yellow)',
        functionalGroups: [
            { name: 'Isoalloxazine ring', role: 'Redox center + fluorophore', drugDiscoveryUse: 'Used as natural fluorescent tag in cell imaging; FAD/FMN cofactors' },
            { name: 'Ribitol chain (-OH groups)', role: 'Solubility & recognition', drugDiscoveryUse: 'Sugar-like moiety enables receptor recognition and water solubility' },
            { name: 'N-10 substitution', role: 'Modifies redox potential', drugDiscoveryUse: 'Synthetic variants tune electron transfer properties for biosensors' }
        ]
    },
    {
        name: 'Amitriptyline',
        genericName: 'Elavil',
        emoji: '🟢',
        color: '#22c55e',
        formula: 'C₂₀H₂₃N',
        pubchemCid: 2160,
        state: 'powder',
        chromophore: 'Oxidized tricyclic metabolites',
        clinicalEffect: 'Green/blue urine from liver metabolites',
        urineColor: 'Green to Blue-Green',
        patientScenario: 'Antidepressant therapy - metabolite color indicates drug processing',
        molecularBasis: 'Hepatic oxidation extends conjugation, shifting absorption to red → green appearance',
        functionalGroups: [
            { name: 'Tricyclic ring system', role: 'Lipophilicity + CNS penetration', drugDiscoveryUse: 'Three fused rings provide high membrane permeability for brain targeting' },
            { name: 'Tertiary amine (-NMe₂)', role: 'Monoamine reuptake inhibition', drugDiscoveryUse: 'Protonatable nitrogen essential for serotonin/norepinephrine transporter binding' },
            { name: 'Alkylidene bridge', role: 'Ring flexibility', drugDiscoveryUse: 'Non-planar geometry provides selectivity over planar DNA intercalators' }
        ]
    }
];

// Inline 3D Viewer for Drug Cards
function DrugViewer3D({ pubchemCid, color }: { pubchemCid: number; color: string }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const viewerRef = useRef<any>(null);
    const rotationRef = useRef<number | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!containerRef.current) return;

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

                // Fetch from PubChem
                const pubchemUrl = `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${pubchemCid}/SDF?record_type=3d`;
                const response = await fetch(pubchemUrl);

                if (!response.ok) {
                    throw new Error('3D structure not available');
                }

                const sdfData = await response.text();
                if (!sdfData.includes('V2000') && !sdfData.includes('V3000')) {
                    throw new Error('Invalid structure data');
                }

                viewer.addModel(sdfData, 'sdf');
                viewer.setStyle({}, {
                    stick: { radius: 0.15, colorscheme: 'Jmol' },
                    sphere: { scale: 0.3, colorscheme: 'Jmol' }
                });
                viewer.zoomTo();
                viewer.render();

                // Auto-rotate
                const rotate = () => {
                    if (viewerRef.current) {
                        viewerRef.current.rotate(0.5, 'y');
                        viewerRef.current.render();
                        rotationRef.current = requestAnimationFrame(rotate);
                    }
                };
                rotate();

                setIsLoading(false);
            } catch (err) {
                setError('3D coming soon');
                setIsLoading(false);
            }
        };

        const timer = setTimeout(loadViewer, 100);

        return () => {
            clearTimeout(timer);
            if (rotationRef.current) cancelAnimationFrame(rotationRef.current);
            if (viewerRef.current) {
                viewerRef.current.clear();
                viewerRef.current = null;
            }
        };
    }, [pubchemCid]);

    return (
        <div style={{ position: 'relative', height: '100%', minHeight: '180px', background: '#0F1116', borderRadius: '12px' }}>
            {isLoading && (
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>
                    🔬 Loading...
                </div>
            )}
            {error && (
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', fontSize: '0.8rem' }}>
                    {error}
                </div>
            )}
            <div ref={containerRef} style={{ width: '100%', height: '100%', minHeight: '180px' }} />
        </div>
    );
}

export default function ClinicalColorCases() {
    const [expandedDrug, setExpandedDrug] = useState<string | null>(null);
    const [viewMode, setViewMode] = useState<Record<string, '2d' | '3d' | 'groups'>>({});

    const getViewMode = (name: string) => viewMode[name] || '2d';
    const setDrugViewMode = (name: string, mode: '2d' | '3d' | 'groups') => {
        setViewMode(prev => ({ ...prev, [name]: mode }));
    };

    return (
        <div style={{ padding: '1.5rem 0' }}>
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h2 style={{
                    fontSize: '1.8rem',
                    fontWeight: 700,
                    background: 'linear-gradient(135deg, #f472b6 0%, #818cf8 50%, #38bdf8 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    marginBottom: '0.5rem'
                }}>
                    💊 The Pharmacist's Palette
                </h2>
                <p style={{ color: '#94a3b8', fontSize: '1rem', maxWidth: '600px', margin: '0 auto' }}>
                    How drug molecules create diagnostic color signals in clinical practice
                </p>
            </div>

            {/* Drug Cards Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
                gap: '1.5rem'
            }}>
                {CLINICAL_DRUGS.map((drug, index) => {
                    const currentView = getViewMode(drug.name);
                    const isExpanded = expandedDrug === drug.name;

                    return (
                        <motion.div
                            key={drug.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            style={{
                                background: 'rgba(255, 255, 255, 0.03)',
                                borderRadius: '20px',
                                border: `1px solid ${drug.color}30`,
                                overflow: 'hidden'
                            }}
                        >
                            {/* Drug Header */}
                            <div style={{
                                padding: '1rem 1.25rem',
                                background: `linear-gradient(135deg, ${drug.color}15 0%, transparent 100%)`,
                                borderBottom: `1px solid ${drug.color}20`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <span style={{ fontSize: '1.8rem' }}>{drug.emoji}</span>
                                    <div>
                                        <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700, color: drug.color }}>
                                            {drug.name}
                                        </h3>
                                        <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>
                                            {drug.formula}
                                        </span>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                                    {/* State Badge */}
                                    <div style={{
                                        padding: '3px 8px',
                                        background: 'rgba(255,255,255,0.08)',
                                        borderRadius: '6px',
                                        fontSize: '0.6rem',
                                        color: '#94a3b8',
                                        fontWeight: 500,
                                        textTransform: 'uppercase'
                                    }}>
                                        {drug.state === 'crystal' ? '💎' : drug.state === 'powder' ? '🧂' : '💧'} {drug.state}
                                    </div>
                                    {/* Urine Color Badge */}
                                    <div style={{
                                        padding: '4px 10px',
                                        background: drug.color,
                                        borderRadius: '8px',
                                        fontSize: '0.7rem',
                                        color: 'white',
                                        fontWeight: 600
                                    }}>
                                        {drug.urineColor}
                                    </div>
                                </div>
                            </div>

                            {/* View Mode Tabs */}
                            <div style={{
                                display: 'flex',
                                gap: '4px',
                                padding: '8px 12px',
                                background: 'rgba(0,0,0,0.2)'
                            }}>
                                {[
                                    { id: '2d', label: '📝 2D' },
                                    { id: '3d', label: '🧊 3D' },
                                    { id: 'groups', label: '⚗️ Groups' }
                                ].map(tab => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setDrugViewMode(drug.name, tab.id as any)}
                                        style={{
                                            flex: 1,
                                            padding: '6px',
                                            background: currentView === tab.id ? 'rgba(255,255,255,0.1)' : 'transparent',
                                            border: currentView === tab.id ? '1px solid rgba(255,255,255,0.2)' : '1px solid transparent',
                                            borderRadius: '6px',
                                            color: currentView === tab.id ? 'white' : '#64748b',
                                            fontSize: '0.75rem',
                                            fontWeight: 500,
                                            cursor: 'pointer'
                                        }}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </div>

                            {/* Content Area */}
                            <div style={{ minHeight: '200px' }}>
                                <AnimatePresence mode="wait">
                                    {currentView === '2d' && (
                                        <motion.div
                                            key="2d"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            style={{
                                                padding: '1rem',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                background: 'white',
                                                minHeight: '200px'
                                            }}
                                        >
                                            <img
                                                src={`https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${drug.pubchemCid}/PNG?image_size=250x250`}
                                                alt={`${drug.name} 2D structure`}
                                                style={{ maxWidth: '100%', maxHeight: '180px' }}
                                            />
                                        </motion.div>
                                    )}

                                    {currentView === '3d' && (
                                        <motion.div
                                            key="3d"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            style={{ minHeight: '200px' }}
                                        >
                                            <DrugViewer3D pubchemCid={drug.pubchemCid} color={drug.color} />
                                        </motion.div>
                                    )}

                                    {currentView === 'groups' && (
                                        <motion.div
                                            key="groups"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            style={{ padding: '1rem', minHeight: '200px' }}
                                        >
                                            <div style={{ fontSize: '0.7rem', color: '#64748b', marginBottom: '8px', textTransform: 'uppercase' }}>
                                                Functional Groups & Drug Discovery Role
                                            </div>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                                {drug.functionalGroups.map((fg, idx) => (
                                                    <div
                                                        key={idx}
                                                        style={{
                                                            padding: '8px 10px',
                                                            background: `${drug.color}08`,
                                                            borderRadius: '8px',
                                                            borderLeft: `3px solid ${drug.color}`
                                                        }}
                                                    >
                                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                                                            <span style={{ fontWeight: 600, color: drug.color, fontSize: '0.85rem' }}>
                                                                {fg.name}
                                                            </span>
                                                            <span style={{ fontSize: '0.65rem', color: '#94a3b8', background: 'rgba(0,0,0,0.2)', padding: '2px 6px', borderRadius: '4px' }}>
                                                                {fg.role}
                                                            </span>
                                                        </div>
                                                        <p style={{ margin: 0, fontSize: '0.75rem', color: '#cbd5e1', lineHeight: 1.5 }}>
                                                            💊 {fg.drugDiscoveryUse}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Chromophore & Clinical Info */}
                            <div
                                style={{
                                    padding: '1rem',
                                    borderTop: '1px solid rgba(255,255,255,0.05)',
                                    cursor: 'pointer'
                                }}
                                onClick={() => setExpandedDrug(isExpanded ? null : drug.name)}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <div style={{ fontSize: '0.65rem', color: '#64748b', marginBottom: '2px' }}>🧬 CHROMOPHORE</div>
                                        <div style={{ fontSize: '0.85rem', color: drug.color, fontWeight: 500 }}>{drug.chromophore}</div>
                                    </div>
                                    <span style={{ color: '#64748b' }}>{isExpanded ? '▲' : '▼'}</span>
                                </div>

                                <AnimatePresence>
                                    {isExpanded && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            style={{ overflow: 'hidden', marginTop: '1rem' }}
                                        >
                                            <div style={{ padding: '0.75rem', background: 'rgba(0,0,0,0.2)', borderRadius: '8px', marginBottom: '0.75rem' }}>
                                                <div style={{ fontSize: '0.65rem', color: '#64748b', marginBottom: '4px' }}>⚛️ Molecular Basis</div>
                                                <p style={{ margin: 0, fontSize: '0.8rem', color: '#94a3b8' }}>{drug.molecularBasis}</p>
                                            </div>
                                            <div style={{ padding: '0.75rem', background: `${drug.color}10`, borderRadius: '8px', borderLeft: `3px solid ${drug.color}` }}>
                                                <div style={{ fontSize: '0.65rem', color: '#64748b', marginBottom: '4px' }}>🏥 Clinical Scenario</div>
                                                <p style={{ margin: 0, fontSize: '0.8rem', color: 'white' }}>{drug.patientScenario}</p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Clinical Pearl */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                style={{
                    marginTop: '2rem',
                    padding: '1.5rem',
                    background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)',
                    borderRadius: '16px',
                    border: '1px solid rgba(139, 92, 246, 0.2)'
                }}
            >
                <h4 style={{ margin: '0 0 0.75rem', color: '#a78bfa', fontSize: '1rem' }}>💡 Clinical Pearl</h4>
                <p style={{ margin: 0, color: '#cbd5e1', fontSize: '0.9rem', lineHeight: 1.6 }}>
                    <strong>Patient Education is Key:</strong> Always warn patients about expected color changes
                    BEFORE starting therapy. Rifampicin patients may panic when they see red tears;
                    phenazopyridine users might think they're bleeding. A simple heads-up prevents
                    unnecessary ER visits and builds trust.
                </p>
            </motion.div>
        </div>
    );
}
