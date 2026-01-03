'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { chapters, chapter1 } from '@/data/chapters';
import { ChapterData } from '@/data/types';
import InteractiveQuiz from '@/components/InteractiveQuiz';
import ContentRenderer from '@/components/ContentRenderer';
import InteractiveInfoBox from '@/components/InteractiveInfoBox';
import MiniQuiz from '@/components/MiniQuiz';
import MoleculeComparisonTable from '@/components/MoleculeComparisonTable';
import ConceptDiagram from '@/components/ConceptDiagram';
import TextToSpeech from '@/components/TextToSpeech';
import Flashcards from '@/components/Flashcards';
import Glossary from '@/components/Glossary';
import LearningPaths from '@/components/LearningPaths';
import GameCenter from '@/components/GameCenter';
import LayoutWrapper from '@/components/LayoutWrapper';
import { CourseView, ChapterLanding } from '@/components/course';
import {
    SkeletalFormula,
    FunctionalGroupDiagram,
    AminoAcidDiagram,
    OxidationLevelDiagram,
    WedgeDashDiagram,
    AbbreviationsDiagram,
    HybridizationDiagram,
    BondPolarityDiagram,
    MassSpectrumViewer,
    NMRSpectrumViewer,
    IRSpectrumViewer,
    DBECalculator,
    PropaneFragmentation,
    AcetoneFragmentation,
    EthanolFragmentation,
    CyclopropaneFragmentation,
    ButanoneFragmentation,
    // Chapter 4: Orbital Theory Components
    HybridizationWizard,
    VSEPRLaboratory,
    BondOrderCalculator,
    RotationSimulator,
    // Chapter 5: Organic Reactions Components
    NucleoElectroIdentifier,
    CurlyArrowSimulator,
    HOMOLUMOVisualizer,
    DrugDiscoveryReactions,
    // Chapter 6: Carbonyl Chemistry Components
    CarbonylAdditionSimulator,
    ReagentComparisonTool
} from '@/components/diagrams';
import QuickCheck from '@/components/QuickCheck';
import OnePageSummary from '@/components/OnePageSummary';
import ColorMoleculesGrid from '@/components/content/ColorMoleculesGrid';
import ConjugationDiagram from '@/components/content/ConjugationDiagram';
import { ExamTip, PlainEnglish, CommonQuestion, ComparisonCard } from '@/components/LearningAids';

// Dynamic import for MoleculeViewer (client-side only)
const MoleculeViewer = dynamic(() => import('@/components/MoleculeViewer'), {
    ssr: false,
    loading: () => (
        <div style={{
            height: '350px',
            background: 'var(--gradient-card)',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--neutral-400)'
        }}>
            Loading 3D viewer...
        </div>
    )
});

// Dynamic import for VisionSimulator (client-side only)
const VisionSimulator = dynamic(() => import('@/components/simulations/VisionSimulator'), {
    ssr: false,
    loading: () => (
        <div style={{
            height: '300px',
            background: 'var(--gradient-card)',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--neutral-400)'
        }}>
            Loading simulation...
        </div>
    )
});

// Dynamic import for DrugDockingSimulator (client-side only)
const DrugDockingSimulator = dynamic(() => import('@/components/simulations/DrugDockingSimulator'), {
    ssr: false,
    loading: () => (
        <div style={{
            height: '400px',
            background: 'var(--gradient-card)',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--neutral-400)'
        }}>
            Loading DNA Docking Challenge...
        </div>
    )
});

// Dynamic import for DrugDiscoveryPanel (client-side only)
const DrugDiscoveryPanel = dynamic(() => import('@/components/simulations/DrugDiscoveryPanel'), {
    ssr: false,
    loading: () => (
        <div style={{
            height: '500px',
            background: 'var(--gradient-card)',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--neutral-400)'
        }}>
            Loading Drug Discovery Application...
        </div>
    )
});

// Dynamic import for AspirinDiscoveryPanel (client-side only)
const AspirinDiscoveryPanel = dynamic(() => import('@/components/simulations/AspirinDiscoveryPanel'), {
    ssr: false,
    loading: () => (
        <div style={{
            height: '300px',
            background: 'var(--gradient-card)',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--neutral-400)'
        }}>
            Loading Aspirin Discovery Story...
        </div>
    )
});

// Dynamic import for Hybridization3D (client-side only)
const Hybridization3D = dynamic(() => import('@/components/Hybridization3D'), {
    ssr: false,
    loading: () => (
        <div style={{
            height: '450px',
            background: 'var(--gradient-card)',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--neutral-400)'
        }}>
            Loading 3D Hybridization...
        </div>
    )
});

// Helper to get diagram type for specific sections
const getDiagramForSection = (sectionId: string) => {
    switch (sectionId) {
        case 'hybridization':
            return { type: 'hybridization3d' as const, title: 'Interactive 3D Hybridization' };
        case 'sigma-and-pi-bonds':
            return { type: 'bonding' as const, title: 'Sigma & Pi Bond Types' };
        case 'electronegativity-polarity':
            return { type: 'electronegativity' as const, title: 'Electronegativity Scale' };
        default:
            return null;
    }
};

export default function ChapterPage() {
    const params = useParams();
    const chapterId = params.id as string;
    const [viewMode, setViewMode] = useState<'selection' | 'reading' | 'course'>('selection');

    const chapter = chapters[chapterId];

    // All hooks must be called before any conditional returns
    const [currentSection, setCurrentSection] = useState(chapter?.sections[0]?.id || '');
    const [completedSections, setCompletedSections] = useState<Set<string>>(new Set());

    // Track scroll position to update current section
    useEffect(() => {
        if (!chapter) return;
        const handleScroll = () => {
            const sections = chapter.sections.map(s => ({
                id: s.id,
                element: document.getElementById(s.id)
            }));

            for (const section of sections) {
                if (section.element) {
                    const rect = section.element.getBoundingClientRect();
                    if (rect.top <= 200 && rect.bottom > 200) {
                        setCurrentSection(section.id);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [chapter]);

    // Mark section as complete
    const markSectionComplete = (sectionId: string) => {
        setCompletedSections(prev => new Set(prev).add(sectionId));
    };

    // Get mini quiz for a section if exists
    const getMiniQuizForSection = (sectionId: string) => {
        return chapter.miniQuizzes.find(q => q.afterSection === sectionId);
    };

    // Calculate progress
    const progress = (completedSections.size / chapter.sections.length) * 100;

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    // For Chapter 1, show mode selection first (after all hooks)
    if (chapterId === '1') {
        if (viewMode === 'selection') {
            return (
                <ChapterLanding
                    chapter={chapter}
                    onModeSelect={(mode) => setViewMode(mode)}
                />
            );
        }

        if (viewMode === 'course') {
            return <CourseView chapter={chapter} onModeSwitch={() => setViewMode('reading')} />;
        }
        // Reading mode continues with the full page view below
    }

    return (
        <LayoutWrapper
            progress={progress}
            currentSection={currentSection}
            sections={chapter.sections.map(s => ({ id: s.id, title: s.title }))}
            onSectionClick={scrollToSection}
            showToolbar={true}
        >
            {/* Navigation Buttons */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                style={{
                    marginBottom: '1.5rem',
                    display: 'flex',
                    gap: '0.75rem',
                    flexWrap: 'wrap',
                    alignItems: 'center'
                }}
            >
                <a
                    href="/"
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        color: 'var(--primary-400)',
                        textDecoration: 'none',
                        fontSize: '0.95rem',
                        fontWeight: 500,
                        padding: '0.5rem 1rem',
                        background: 'rgba(139, 92, 246, 0.1)',
                        borderRadius: '10px',
                        border: '1px solid rgba(139, 92, 246, 0.2)',
                        transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(139, 92, 246, 0.2)';
                        e.currentTarget.style.transform = 'translateX(-4px)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(139, 92, 246, 0.1)';
                        e.currentTarget.style.transform = 'translateX(0)';
                    }}
                >
                    ← Back to Home
                </a>

                {/* Mode Switch Button - Only for Chapter 1 */}
                {chapterId === '1' && (
                    <button
                        onClick={() => setViewMode('course')}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            color: 'var(--accent-emerald)',
                            fontSize: '0.95rem',
                            fontWeight: 500,
                            padding: '0.5rem 1rem',
                            background: 'rgba(16, 185, 129, 0.1)',
                            borderRadius: '10px',
                            border: '1px solid rgba(16, 185, 129, 0.2)',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(16, 185, 129, 0.2)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'rgba(16, 185, 129, 0.1)';
                        }}
                    >
                        🎓 Switch to Course Mode
                    </button>
                )}
            </motion.div>

            {/* Chapter Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="chapter-header"
            >
                <div className="chapter-number">Chapter {chapter.id}</div>
                <h1>{chapter.title}</h1>
                <p style={{ fontSize: '1.25rem', maxWidth: '800px', color: 'var(--neutral-300)' }}>
                    {chapter.subtitle}
                </p>
                <div style={{
                    display: 'flex',
                    gap: '1rem',
                    marginTop: '1.5rem',
                    flexWrap: 'wrap'
                }}>
                    <span className="badge" style={{ background: 'rgba(139, 92, 246, 0.2)', color: 'var(--primary-400)' }}>
                        ⏱️ {chapter.estimatedTime} min read
                    </span>
                    <span className="badge" style={{ background: 'rgba(16, 185, 129, 0.2)', color: 'var(--accent-emerald)' }}>
                        📖 {chapter.sections.length} sections
                    </span>
                    <span className="badge" style={{ background: 'rgba(245, 158, 11, 0.2)', color: '#f59e0b' }}>
                        📝 {chapter.quiz.length} quiz questions
                    </span>
                </div>
            </motion.div>

            {/* Learning Objectives */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="section-card"
                style={{ marginBottom: '2rem' }}
            >
                <h3 style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    marginTop: 0,
                    color: 'var(--neutral-100)'
                }}>
                    <span style={{ fontSize: '1.5rem' }}>🎯</span>
                    Learning Objectives
                </h3>
                <p style={{ color: 'var(--neutral-400)', marginBottom: '1rem', fontSize: '0.9rem' }}>
                    By the end of this chapter, you will be able to:
                </p>
                <ul style={{
                    margin: 0,
                    paddingLeft: '1.5rem',
                    display: 'grid',
                    gap: '0.75rem'
                }}>
                    {chapter.learningObjectives.map((objective, index) => (
                        <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 + index * 0.05 }}
                            style={{ color: 'var(--neutral-300)' }}
                        >
                            {objective}
                        </motion.li>
                    ))}
                </ul>
            </motion.div>

            {/* Introduction */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="section-card"
                style={{ marginBottom: '2rem' }}
            >
                <div style={{
                    fontSize: '1.1rem',
                    lineHeight: 1.8,
                }}>
                    <ContentRenderer content={chapter.introduction} />
                </div>
            </motion.div>

            {/* Sections */}
            {chapter.sections.map((section, sectionIndex) => {
                const miniQuiz = getMiniQuizForSection(section.id);
                const diagram = getDiagramForSection(section.id);

                return (
                    <motion.div
                        key={section.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ delay: 0.1 }}
                        className="section-card"
                        id={section.id}
                        onViewportEnter={() => markSectionComplete(section.id)}
                    >
                        <div style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            justifyContent: 'space-between',
                            gap: '1rem',
                            marginBottom: '1.5rem',
                            flexWrap: 'wrap'
                        }}>
                            <h2 style={{
                                marginTop: 0,
                                marginBottom: 0,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                flex: 1
                            }}>
                                <span style={{
                                    width: '36px',
                                    height: '36px',
                                    background: 'var(--gradient-primary)',
                                    borderRadius: '10px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '1rem',
                                    fontWeight: 700,
                                    color: 'white'
                                }}>
                                    {sectionIndex + 1}
                                </span>
                                {section.title}
                            </h2>
                            <TextToSpeech
                                text={section.content + (section.keyPoints ? '\n\nKey Points: ' + section.keyPoints.join('. ') : '')}
                                sectionId={section.id}
                                title={section.title}
                            />
                        </div>

                        {/* Content */}
                        <div style={{ marginBottom: '2rem' }}>
                            <ContentRenderer content={section.content} />
                        </div>

                        {/* Interactive Diagram (if applicable) */}
                        {diagram && diagram.type === 'hybridization3d' ? (
                            <Hybridization3D title={diagram.title} />
                        ) : diagram ? (
                            <ConceptDiagram type={diagram.type as 'hybridization' | 'bonding' | 'electronegativity'} title={diagram.title} />
                        ) : null}

                        {/* Inline SVG Diagrams from section data */}
                        {section.diagrams && section.diagrams.length > 0 && (
                            <div style={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: '1.5rem',
                                justifyContent: 'center',
                                marginBottom: '2rem',
                                padding: '1rem',
                                background: 'rgba(139, 92, 246, 0.05)',
                                borderRadius: '16px',
                            }}>
                                {section.diagrams.map((diag, diagIndex) => (
                                    <div key={diagIndex} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        {diag.type === 'skeletal' && (
                                            <SkeletalFormula {...(diag.props as { molecule: 'methane' | 'ethane' | 'propane' | 'butane' | 'pentane' | 'hexane' | 'cyclohexane' | 'benzene'; showLabels?: boolean; highlightCarbons?: boolean })} />
                                        )}
                                        {diag.type === 'functional-group' && (
                                            <FunctionalGroupDiagram {...(diag.props as { group: 'alcohol' | 'aldehyde' | 'ketone' | 'carboxylic-acid' | 'ester' | 'ether' | 'amine' | 'amide' | 'alkene' | 'alkyne' | 'nitrile' | 'thiol' })} />
                                        )}
                                        {diag.type === 'amino-acid' && (
                                            <AminoAcidDiagram {...(diag.props as { name: string; structure: 'glycine' | 'alanine' | 'phenylalanine' })} />
                                        )}
                                        {diag.type === 'oxidation' && (
                                            <OxidationLevelDiagram {...(diag.props as { showLevel?: 0 | 1 | 2 | 3 | 4 | 'all'; interactive?: boolean })} />
                                        )}
                                        {diag.type === 'wedge-dash' && (
                                            <WedgeDashDiagram {...(diag.props as { molecule?: 'methane' | 'bromochlorofluoromethane'; showLegend?: boolean })} />
                                        )}
                                        {diag.type === 'abbreviations' && (
                                            <AbbreviationsDiagram {...(diag.props as { showAll?: boolean; highlightAbbr?: string })} />
                                        )}
                                        {diag.type === 'hybridization' && (
                                            <HybridizationDiagram {...(diag.props as { type?: 'sp3' | 'sp2' | 'sp' | 'comparison'; interactive?: boolean })} />
                                        )}
                                        {diag.type === 'polarity' && (
                                            <BondPolarityDiagram {...(diag.props as { type?: 'scale' | 'molecules' | 'comparison' })} />
                                        )}
                                        {diag.caption && (
                                            <div style={{
                                                marginTop: '0.5rem',
                                                fontSize: '0.85rem',
                                                color: 'var(--neutral-400)',
                                                textAlign: 'center',
                                                fontStyle: 'italic',
                                            }}>
                                                {diag.caption}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Chapter 3: Spectroscopy Diagrams - ACCURATE DATA FROM TEXTBOOK */}

                        {/* MS: 4-Bromoanisole - Bromine 1:1 isotope pattern (Page 7) */}
                        {section.id === 'ms-introduction' && (
                            <MassSpectrumViewer
                                peaks={[
                                    { mz: 186, intensity: 100, label: 'M⁺ (⁷⁹Br)', isM: true },
                                    { mz: 188, intensity: 98, label: 'M+2 (⁸¹Br)' },
                                    { mz: 171, intensity: 35, label: '-CH₃' },
                                    { mz: 77, intensity: 55, label: 'C₆H₅⁺' },
                                ]}
                                molecularWeight={186}
                                moleculeName="4-Bromoanisole"
                                formula="C₇H₇BrO"
                                halogen="Br"
                            />
                        )}

                        {/* MS: Topanol 354 - M+1 carbon isotope (Page 8) */}
                        {section.id === 'ms-isotopes' && (
                            <MassSpectrumViewer
                                peaks={[
                                    { mz: 236, intensity: 75, label: 'M⁺', isM: true },
                                    { mz: 237, intensity: 12, label: 'M+1 (¹³C)' },
                                    { mz: 221, intensity: 100, label: 'M-15 (base)', isBase: true },
                                    { mz: 57, intensity: 65, label: 't-Bu⁺ (C₄H₉)' },
                                    { mz: 41, intensity: 30, label: 'C₃H₅⁺' },
                                ]}
                                molecularWeight={236}
                                moleculeName="Topanol 354 (BHT)"
                                formula="C₁₅H₂₄O₂"
                            />
                        )}

                        {/* MS: Hexan-2-one - Fragmentation example */}
                        {section.id === 'ms-fragmentation' && (
                            <MassSpectrumViewer
                                peaks={[
                                    { mz: 100, intensity: 25, label: 'M⁺', isM: true },
                                    { mz: 85, intensity: 40, label: 'M-15 (CH₃)' },
                                    { mz: 71, intensity: 30, label: 'M-29 (C₂H₅)' },
                                    { mz: 58, intensity: 55, label: 'McLafferty' },
                                    { mz: 57, intensity: 70, label: 'C₄H₉⁺' },
                                    { mz: 43, intensity: 100, label: 'CH₃CO⁺', isBase: true },
                                    { mz: 29, intensity: 35, label: 'CHO⁺' },
                                    { mz: 15, intensity: 15, label: 'CH₃⁺' },
                                ]}
                                molecularWeight={100}
                                moleculeName="Hexan-2-one (α-Cleavage Example)"
                                formula="C₆H₁₂O"
                            />
                        )}

                        {/* ¹³C NMR: Lactic Acid - 3 signals (Page 14) */}
                        {section.id === 'nmr-13c-introduction' && (
                            <NMRSpectrumViewer
                                peaks={[
                                    { ppm: 178.5, intensity: 50, label: 'COOH', carbon: 'Carbonyl carbon (quaternary, weak)' },
                                    { ppm: 69.2, intensity: 85, label: 'CHOH', carbon: 'Methine carbon attached to OH' },
                                    { ppm: 20.5, intensity: 100, label: 'CH₃', carbon: 'Methyl carbon (highest intensity)' },
                                ]}
                                moleculeName="Lactic Acid"
                                formula="C₃H₆O₃"
                                type="13C"
                            />
                        )}

                        {/* ¹³C NMR: BHT - Symmetry example (Page 16) */}
                        {section.id === 'nmr-symmetry' && (
                            <NMRSpectrumViewer
                                peaks={[
                                    { ppm: 152.3, intensity: 45, label: 'C-O', carbon: 'Phenolic C (C-1, 1C)' },
                                    { ppm: 135.6, intensity: 55, label: 'C-t-Bu', carbon: 'C-2,6 bearing t-butyl (2C)' },
                                    { ppm: 128.5, intensity: 50, label: 'C-CH₃', carbon: 'C-4 bearing methyl (1C)' },
                                    { ppm: 125.4, intensity: 95, label: 'Ar-H', carbon: 'C-3,5 aromatic CH (2C)' },
                                    { ppm: 34.2, intensity: 65, label: 'C(CH₃)₃', carbon: 'Quaternary t-butyl C (2C)' },
                                    { ppm: 30.3, intensity: 100, label: 't-Bu CH₃', carbon: 't-Butyl methyls (6C, highest)' },
                                    { ppm: 21.2, intensity: 80, label: 'Ar-CH₃', carbon: 'Para-methyl (1C)' },
                                ]}
                                moleculeName="BHT (15 carbons → 7 signals)"
                                formula="C₁₅H₂₄O"
                                type="13C"
                            />
                        )}

                        {/* IR: Hexan-2-one - Simple ketone (Page 21) */}
                        {section.id === 'ir-introduction' && (
                            <IRSpectrumViewer
                                peaks={[
                                    { wavenumber: 2960, intensity: 'medium', bondType: 'C-H stretch (CH₃, CH₂)' },
                                    { wavenumber: 2870, intensity: 'medium', bondType: 'C-H stretch' },
                                    { wavenumber: 1720, intensity: 'strong', bondType: 'C=O stretch (ketone)' },
                                    { wavenumber: 1460, intensity: 'medium', bondType: 'C-H bend' },
                                    { wavenumber: 1360, intensity: 'weak', bondType: 'CH₃ symmetric bend' },
                                ]}
                                moleculeName="Hexan-2-one"
                                formula="C₆H₁₂O"
                            />
                        )}

                        {section.id === 'dbe-calculation' && (
                            <DBECalculator />
                        )}

                        {/* ¹H NMR: Ethyl Acetate - Integration example (Page 18) */}
                        {section.id === 'nmr-1h-introduction' && (
                            <NMRSpectrumViewer
                                peaks={[
                                    { ppm: 4.12, intensity: 45, label: 'OCH₂', carbon: 'Quartet (2H)' },
                                    { ppm: 2.04, intensity: 75, label: 'CH₃CO', carbon: 'Singlet (3H)' },
                                    { ppm: 1.26, intensity: 75, label: 'CH₃', carbon: 'Triplet (3H)' },
                                ]}
                                moleculeName="Ethyl Acetate"
                                formula="C₄H₈O₂"
                                type="1H"
                            />
                        )}

                        {/* IR: Benzoic Acid - Carboxylic acid O-H pattern (Page 25) */}
                        {section.id === 'ir-hydrogen-bonding' && (
                            <IRSpectrumViewer
                                peaks={[
                                    { wavenumber: 2900, intensity: 'broad', bondType: 'O-H stretch (carboxylic acid, very broad 2500-3300)' },
                                    { wavenumber: 3070, intensity: 'medium', bondType: 'Aromatic C-H stretch' },
                                    { wavenumber: 1690, intensity: 'strong', bondType: 'C=O stretch (conjugated acid)' },
                                    { wavenumber: 1600, intensity: 'medium', bondType: 'C=C aromatic stretch' },
                                    { wavenumber: 1450, intensity: 'medium', bondType: 'C-C aromatic ring' },
                                    { wavenumber: 1320, intensity: 'strong', bondType: 'C-O stretch' },
                                    { wavenumber: 940, intensity: 'broad', bondType: 'O-H out-of-plane bend (dimer)' },
                                    { wavenumber: 710, intensity: 'strong', bondType: 'C-H aromatic bend' },
                                ]}
                                moleculeName="Benzoic Acid"
                                formula="C₇H₆O₂"
                            />
                        )}

                        {/* MS: Compound X - Problem solving example (Page 34) */}
                        {section.id === 'problem-solving-strategy' && (
                            <MassSpectrumViewer
                                peaks={[
                                    { mz: 181, intensity: 85, label: 'M⁺ (⁷⁹Br)', isM: true },
                                    { mz: 183, intensity: 83, label: 'M+2 (⁸¹Br)' },
                                    { mz: 101, intensity: 60, label: 'M - Br' },
                                    { mz: 73, intensity: 100, label: 'Dioxolane⁺', isBase: true },
                                    { mz: 45, intensity: 35, label: 'CHO₂⁺' },
                                ]}
                                molecularWeight={181}
                                moleculeName="Compound X (Cyclic Acetal)"
                                formula="C₅H₉BrO₂"
                                halogen="Br"
                            />
                        )}

                        {/* Detailed MS Examples - Interactive Fragmentation Analyses */}
                        {section.id === 'ms-example-propane' && <PropaneFragmentation />}
                        {section.id === 'ms-example-acetone' && <AcetoneFragmentation />}
                        {section.id === 'ms-example-ethanol' && <EthanolFragmentation />}
                        {section.id === 'ms-example-cyclopropane' && <CyclopropaneFragmentation />}
                        {section.id === 'ms-example-butanone' && <ButanoneFragmentation />}

                        {/* Chapter 4: Orbital Theory Interactive Components */}
                        {section.id === 'molecular-orbitals' && <BondOrderCalculator />}
                        {section.id === 'hybridization' && <HybridizationWizard />}
                        {section.id === 'vsepr-theory' && <VSEPRLaboratory />}
                        {section.id === 'molecular-rotation' && <RotationSimulator />}

                        {/* Chapter 5: Organic Reactions Interactive Components */}
                        {section.id === 'nucleophiles-electrophiles' && <NucleoElectroIdentifier />}
                        {section.id === 'homo-lumo' && <HOMOLUMOVisualizer />}
                        {section.id === 'curly-arrows' && <CurlyArrowSimulator />}
                        {section.id === 'making-breaking-bonds' && <CurlyArrowSimulator />}
                        {section.id === 'reaction-types-overview' && <DrugDiscoveryReactions />}

                        {/* Chapter 6: Carbonyl Chemistry Interactive Components */}
                        {section.id === 'cyanohydrin' && <CarbonylAdditionSimulator />}
                        {section.id === 'hydride-reduction' && <ReagentComparisonTool />}
                        {section.id === 'grignard-reaction' && <CarbonylAdditionSimulator />}
                        {section.id === 'hydration-hemiacetal' && <CarbonylAdditionSimulator />}

                        {/* Fun Fact */}
                        {section.funFact && (
                            <InteractiveInfoBox type="funFact">
                                {section.funFact}
                            </InteractiveInfoBox>
                        )}

                        {/* Common Mistake */}
                        {section.commonMistake && (
                            <InteractiveInfoBox type="commonMistake">
                                {section.commonMistake}
                            </InteractiveInfoBox>
                        )}

                        {/* Real World Connection */}
                        {section.realWorldConnection && (
                            <InteractiveInfoBox type="realWorld">
                                {section.realWorldConnection}
                            </InteractiveInfoBox>
                        )}




                        {/* Key Points */}
                        {section.keyPoints && (
                            <div style={{
                                background: 'rgba(139, 92, 246, 0.1)',
                                border: '1px solid rgba(139, 92, 246, 0.3)',
                                borderRadius: '16px',
                                padding: '1.5rem'
                            }}>
                                <h4 style={{
                                    margin: '0 0 1rem',
                                    color: 'var(--primary-300)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem'
                                }}>
                                    💡 Key Points
                                </h4>
                                <ul style={{ margin: 0, paddingLeft: '1.25rem' }}>
                                    {section.keyPoints.map((point, pIndex) => (
                                        <li key={pIndex} style={{
                                            color: 'var(--neutral-300)',
                                            marginBottom: '0.5rem'
                                        }}>
                                            {point}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Exam Tip */}
                        {section.examTip && (
                            <ExamTip>{section.examTip}</ExamTip>
                        )}

                        {/* Plain English Translation */}
                        {section.plainEnglish && (
                            <PlainEnglish
                                technical={section.plainEnglish.technical}
                                simple={section.plainEnglish.simple}
                            />
                        )}

                        {/* Featured Molecules - Synced with Course Mode */}
                        {section.molecules && section.molecules.length > 0 && (
                            <div style={{ marginTop: '2.5rem' }}>
                                <MoleculeComparisonTable
                                    title="🧪 Featured Molecules"
                                    molecules={section.molecules.map((mol, idx) => ({
                                        ...mol,
                                        level: section.id === 'oxidation-levels' ? idx : undefined,
                                    }))}
                                    showLevels={section.id === 'oxidation-levels'}
                                />
                            </div>
                        )}

                        {/* Interactive Simulation - Synced with Course Mode */}
                        {section.simulation && section.simulation.type === 'vision' && (
                            <div style={{ marginTop: '2rem' }}>
                                <VisionSimulator />
                            </div>
                        )}

                        {section.simulation && section.simulation.type === 'drug-docking' && (
                            <div style={{ marginTop: '2rem' }}>
                                <DrugDockingSimulator />
                            </div>
                        )}

                        {/* Drug Discovery Panel - for Lesson 1 (organic-chemistry-and-you) */}
                        {section.id === 'organic-chemistry-and-you' && (
                            <div style={{ marginTop: '2rem' }}>
                                <DrugDiscoveryPanel sectionId={section.id} />
                            </div>
                        )}

                        {/* Drug Discovery Story Panel (e.g., Aspirin for Lesson 2) */}
                        {section.drugDiscovery && (
                            <div style={{ marginTop: '2rem' }}>
                                <AspirinDiscoveryPanel drugDiscovery={section.drugDiscovery} />
                            </div>
                        )}

                        {/* Quick Check - Section Review */}
                        {section.quickCheck && section.quickCheck.length > 0 && (
                            <QuickCheck
                                title={`🧪 Quick Check: ${section.title}`}
                                questions={section.quickCheck}
                            />
                        )}

                        {/* Mini Quiz after section (if exists) */}
                        {miniQuiz && (
                            <MiniQuiz
                                questions={miniQuiz.questions}
                                onComplete={() => console.log(`Completed mini quiz: ${miniQuiz.id}`)}
                            />
                        )}

                        {/* Conjugation Diagram */}
                        {section.conjugationDiagram && (
                            <ConjugationDiagram />
                        )}

                        {/* Color Examples Grid */}
                        {section.colorExamples && (
                            <ColorMoleculesGrid examples={section.colorExamples} />
                        )}
                    </motion.div>
                );
            })}

            {/* One Page Summary - Quick Reference */}
            {chapter.id === 2 && <OnePageSummary chapterId={chapter.id} />}

            {/* Section Divider */}
            <div style={{
                height: '2px',
                background: 'linear-gradient(90deg, transparent, var(--primary-500), transparent)',
                margin: '3rem 0'
            }} />

            {/* Flashcards Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="section-card"
                style={{ marginBottom: '2rem' }}
            >
                <h3 style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    marginTop: 0,
                    marginBottom: '0.5rem',
                    color: 'var(--neutral-100)'
                }}>
                    <span style={{ fontSize: '1.5rem' }}>🎴</span>
                    Review with Flashcards
                </h3>
                <p style={{ color: 'var(--neutral-400)', marginBottom: 0, fontSize: '0.9rem' }}>
                    Practice key concepts with interactive flashcards. Click to flip!
                </p>
                <Flashcards
                    cards={chapter.flashcards}
                    title={`Chapter ${chapter.id} Flashcards`}
                />
            </motion.div>

            {/* Glossary Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="section-card"
                style={{ marginBottom: '2rem' }}
            >
                <h3 style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    marginTop: 0,
                    marginBottom: '0.5rem',
                    color: 'var(--neutral-100)'
                }}>
                    <span style={{ fontSize: '1.5rem' }}>📚</span>
                    Chapter Glossary
                </h3>
                <p style={{ color: 'var(--neutral-400)', marginBottom: 0, fontSize: '0.9rem' }}>
                    Quick reference for key terms and concepts covered in this chapter.
                </p>
                <Glossary
                    terms={chapter.glossary}
                    title={`Chapter ${chapter.id} Terms`}
                />
            </motion.div>

            {/* Games Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="section-card"
                style={{ marginBottom: '2rem' }}
            >
                <h3 style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    marginTop: 0,
                    marginBottom: '0.5rem',
                    color: 'var(--neutral-100)'
                }}>
                    <span style={{ fontSize: '1.5rem' }}>🎮</span>
                    Learning Games
                </h3>
                <p style={{ color: 'var(--neutral-400)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                    Reinforce your learning with fun interactive games. Match terms, test your memory, and more!
                </p>
                <GameCenter
                    pairs={chapter.flashcards.map((card, i) => ({
                        id: String(i + 1),
                        term: card.front,
                        definition: card.back
                    }))}
                    title={`Chapter ${chapter.id} Games`}
                    chapterId={chapter.id}
                />
            </motion.div>

            {/* Quiz Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                <div style={{ marginBottom: '2rem' }}>
                    <h2 style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        marginBottom: '0.5rem'
                    }}>
                        <span style={{ fontSize: '1.5rem' }}>📝</span>
                        Test Your Knowledge
                    </h2>
                    <p style={{ color: 'var(--neutral-400)' }}>
                        You've covered all the content! Now test your understanding with these {chapter.quiz.length} practice questions.
                    </p>
                </div>

                <InteractiveQuiz
                    key={chapter.id}
                    title={`Chapter ${chapter.id} Quiz`}
                    questions={chapter.quiz}
                />
            </motion.div>

            {/* Completion Section */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                style={{
                    background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(6, 182, 212, 0.1) 100%)',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                    borderRadius: '24px',
                    padding: '3rem',
                    textAlign: 'center',
                    marginTop: '3rem'
                }}
            >
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎓</div>
                <h2 style={{ color: 'var(--accent-emerald)', marginBottom: '1rem' }}>
                    Congratulations!
                </h2>
                <p style={{ color: 'var(--neutral-300)', maxWidth: '600px', margin: '0 auto 1.5rem' }}>
                    You've completed Chapter {chapter.id}: {chapter.title}! Great job mastering this content.
                </p>
                <div style={{
                    display: 'flex',
                    gap: '1rem',
                    justifyContent: 'center',
                    flexWrap: 'wrap'
                }}>
                    <button
                        className="btn-primary"
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    >
                        ↑ Review Chapter
                    </button>
                    <button
                        style={{
                            padding: '0.75rem 1.5rem',
                            background: 'var(--neutral-800)',
                            color: 'var(--neutral-200)',
                            border: '1px solid var(--neutral-700)',
                            borderRadius: '10px',
                            cursor: 'pointer'
                        }}
                    >
                        Next Chapter →
                    </button>
                </div>
            </motion.div>

            {/* Footer Spacer */}
            <div style={{ height: '4rem' }} />

            {/* Learning Paths - Side Panel */}
            <LearningPaths />
        </LayoutWrapper>
    );
}
