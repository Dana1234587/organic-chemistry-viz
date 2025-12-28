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
import ConceptDiagram from '@/components/ConceptDiagram';
import TextToSpeech from '@/components/TextToSpeech';
import Flashcards from '@/components/Flashcards';
import Glossary from '@/components/Glossary';
import LearningPaths from '@/components/LearningPaths';
import GameCenter from '@/components/GameCenter';
import LayoutWrapper from '@/components/LayoutWrapper';
import {
    SkeletalFormula,
    FunctionalGroupDiagram,
    AminoAcidDiagram,
    OxidationLevelDiagram,
    WedgeDashDiagram,
    AbbreviationsDiagram
} from '@/components/diagrams';

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

    const chapter = chapters[chapterId];

    const [currentSection, setCurrentSection] = useState(chapter.sections[0]?.id || '');
    const [completedSections, setCompletedSections] = useState<Set<string>>(new Set());

    // Track scroll position to update current section
    useEffect(() => {
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

    return (
        <LayoutWrapper
            progress={progress}
            currentSection={currentSection}
            sections={chapter.sections.map(s => ({ id: s.id, title: s.title }))}
            onSectionClick={scrollToSection}
            showToolbar={true}
        >
            {/* Back Button */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                style={{ marginBottom: '1.5rem' }}
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
                <p style={{
                    fontSize: '1.1rem',
                    lineHeight: 1.8,
                    color: 'var(--neutral-300)',
                    margin: 0
                }}>
                    {chapter.introduction}
                </p>
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

                        {/* Molecules */}
                        {section.molecules && section.molecules.length > 0 && (
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                                gap: '1.5rem',
                                marginBottom: '2rem'
                            }}>
                                {section.molecules.map((molecule, mIndex) => (
                                    <MoleculeViewer
                                        key={mIndex}
                                        moleculeName={molecule.name}
                                        description={molecule.description}
                                        height={300}
                                    />
                                ))}
                            </div>
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

                        {/* Mini Quiz after section (if exists) */}
                        {miniQuiz && (
                            <MiniQuiz
                                questions={miniQuiz.questions}
                                onComplete={() => console.log(`Completed mini quiz: ${miniQuiz.id}`)}
                            />
                        )}
                    </motion.div>
                );
            })}

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
