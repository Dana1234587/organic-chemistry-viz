'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import { ChapterSection, ChapterQuiz } from '@/data/types';
import VideoEmbed from './VideoEmbed';
import ContentRenderer from '../ContentRenderer';

import ColorMoleculesGrid from '../content/ColorMoleculesGrid';
import ConjugationDiagram from '../content/ConjugationDiagram';
import ClinicalColorCases from '../content/ClinicalColorCases';
import ClinicalDetectiveGame from '../content/ClinicalDetectiveGame';
import DrugDiscoveryTools from '../content/DrugDiscoveryTools';

// Dynamic import for MoleculeViewer
const MoleculeViewer = dynamic(() => import('../MoleculeViewer'), {
    ssr: false,
    loading: () => (
        <div style={{
            height: '200px',
            background: 'var(--gradient-card)',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--neutral-400)'
        }}>
            Loading 3D viewer...
        </div>
    )
});

// Dynamic import for VisionSimulator
const VisionSimulator = dynamic(() => import('../simulations/VisionSimulator'), {
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
            Loading simulation...
        </div>
    )
});

// Dynamic import for DrugDockingSimulator
const DrugDockingSimulator = dynamic(() => import('../simulations/DrugDockingSimulator'), {
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
            Loading simulation...
        </div>
    )
});

// Dynamic import for DrugDiscoveryPanel
const DrugDiscoveryPanel = dynamic(() => import('../simulations/DrugDiscoveryPanel'), {
    ssr: false,
    loading: () => (
        <div style={{
            height: '200px',
            background: 'var(--gradient-card)',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--neutral-400)'
        }}>
            Loading content...
        </div>
    )
});

// Dynamic import for AspirinDiscoveryPanel
const AspirinDiscoveryPanel = dynamic(() => import('../simulations/AspirinDiscoveryPanel'), {
    ssr: false,
    loading: () => (
        <div style={{
            height: '200px',
            background: 'var(--gradient-card)',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--neutral-400)'
        }}>
            Loading content...
        </div>
    )
});

// Dynamic import for MagicBulletExplorer (Lesson 4 - Synthetic Dyes)
const MagicBulletExplorer = dynamic(() => import('../simulations/MagicBulletExplorer'), {
    ssr: false,
    loading: () => (
        <div style={{
            height: '450px',
            background: 'var(--gradient-card)',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--neutral-400)'
        }}>
            Loading simulation...
        </div>
    )
});

// Dynamic import for SulfaDrugDiscoveryPanel (Lesson 4 - Synthetic Dyes)
const SulfaDrugDiscoveryPanel = dynamic(() => import('../content/SulfaDrugDiscoveryPanel'), {
    ssr: false,
    loading: () => (
        <div style={{
            height: '400px',
            background: 'var(--gradient-card)',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--neutral-400)'
        }}>
            Loading Drug Discovery content...
        </div>
    )
});

// ... imports ...

type TabType = 'lesson' | 'quickCheck' | 'molecules' | 'simulation' | 'drugDiscovery' | 'conjugation' | 'colors' | 'clinical' | 'detective' | 'research';

export default function LessonViewer({
    section,
    sectionNumber,
    totalSections,
    isCompleted,
    onMarkComplete,
    onNavigate,
    hasPrev,
    hasNext,
    sectionQuiz = []
}: LessonViewerProps) {
    const [activeTab, setActiveTab] = useState<TabType>('lesson');
    const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
    const [showQuizResults, setShowQuizResults] = useState(false);

    const handleQuizAnswer = (questionIdx: number, answerIdx: number) => {
        setQuizAnswers(prev => ({ ...prev, [questionIdx]: answerIdx }));
    };

    const checkQuizComplete = () => {
        return sectionQuiz.length > 0 && Object.keys(quizAnswers).length === sectionQuiz.length;
    };

    const calculateQuizScore = () => {
        let correct = 0;
        sectionQuiz.forEach((q, idx) => {
            if (quizAnswers[idx] === q.correctIndex) correct++;
        });
        return { correct, total: sectionQuiz.length };
    };

    const labels = ['A', 'B', 'C', 'D'];

    // Check if this section should show Drug Discovery tab
    // Lesson 1: DrugDiscoveryPanel (Cisplatin), Lesson 2+: AspirinDiscoveryPanel or other drug stories
    const showDrugDiscoveryTab = section.id === 'organic-chemistry-and-you' || !!section.drugDiscovery;

    // Build tabs - always show Lesson, Quick Check, Molecules; conditionally show Simulation and Drug Discovery
    // Check if this is Lesson 3 (colors) to show Clinical tabs
    const isColorLesson = !!section.colorExamples;

    const tabs = [
        { id: 'lesson' as const, icon: '📖', label: 'Lesson' },
        ...(section.conjugationDiagram ? [{ id: 'conjugation' as const, icon: '🌈', label: 'Conjugation Rule' }] : []),
        ...(section.colorExamples ? [{ id: 'colors' as const, icon: '🧪', label: 'Featured Molecules' }] : []),
        ...(isColorLesson ? [{ id: 'clinical' as const, icon: '💊', label: 'Clinical Colors' }] : []),
        ...(isColorLesson ? [{ id: 'research' as const, icon: '🧬', label: 'Research Tools' }] : []),
        ...(isColorLesson ? [{ id: 'detective' as const, icon: '🔬', label: 'Color Detective' }] : []),
        { id: 'quickCheck' as const, icon: '✅', label: 'Quick Check' },
        ...(!isColorLesson ? [{ id: 'molecules' as const, icon: '🧪', label: 'Molecules' }] : []),
        ...(section.simulation ? [{ id: 'simulation' as const, icon: '🎮', label: 'Simulation' }] : []),
        ...(showDrugDiscoveryTab ? [{ id: 'drugDiscovery' as const, icon: '💉', label: 'Drug Discovery' }] : [])
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
                background: 'var(--gradient-card)',
                borderRadius: '24px',
                border: '1px solid var(--neutral-800)',
                overflow: 'hidden'
            }}
        >
            {/* Video Section */}
            <div style={{ padding: '1.5rem 1.5rem 0' }}>
                <VideoEmbed
                    type={section.video?.type || 'bunny'}
                    url={section.video?.url || ''}
                    title={section.title}
                    thumbnail={section.video?.thumbnail}
                />
            </div>

            {/* Section Header */}
            <div style={{ padding: '1.5rem' }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    marginBottom: '0.75rem'
                }}>
                    <span style={{
                        padding: '0.35rem 0.75rem',
                        background: 'var(--gradient-primary)',
                        borderRadius: '20px',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        color: 'white'
                    }}>
                        Lesson {sectionNumber} of {totalSections}
                    </span>
                    {isCompleted && (
                        <span style={{
                            padding: '0.35rem 0.75rem',
                            background: 'rgba(16, 185, 129, 0.2)',
                            borderRadius: '20px',
                            fontSize: '0.8rem',
                            fontWeight: 600,
                            color: 'var(--accent-emerald)'
                        }}>
                            ✓ Completed
                        </span>
                    )}
                </div>
                <h2 style={{
                    fontSize: '1.75rem',
                    fontWeight: 700,
                    color: 'var(--neutral-100)',
                    marginBottom: '0.5rem'
                }}>
                    {section.title}
                </h2>
            </div>

            {/* Tabs Navigation */}
            <div style={{
                display: 'flex',
                gap: '0.5rem',
                padding: '0 1.5rem',
                borderBottom: '1px solid var(--neutral-800)',
                overflowX: 'auto'
            }}>
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        style={{
                            padding: '0.75rem 1.25rem',
                            background: 'none',
                            border: 'none',
                            borderBottom: activeTab === tab.id
                                ? '3px solid var(--primary-500)'
                                : '3px solid transparent',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            color: activeTab === tab.id
                                ? 'var(--primary-400)'
                                : 'var(--neutral-500)',
                            fontWeight: activeTab === tab.id ? 600 : 500,
                            fontSize: '0.95rem',
                            transition: 'all 0.2s',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        <span>{tab.icon}</span>
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div style={{ padding: '1.5rem', minHeight: '300px' }}>
                <AnimatePresence mode="wait">
                    {/* LESSON TAB */}
                    {activeTab === 'lesson' && (
                        <motion.div
                            key="lesson"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                        >
                            {/* Lesson Content */}
                            <ContentRenderer content={section.content} />

                            {/* Key Points - Inline */}
                            {section.keyPoints && section.keyPoints.length > 0 && (
                                <div style={{
                                    marginTop: '2rem',
                                    padding: '1.5rem',
                                    background: 'rgba(139, 92, 246, 0.1)',
                                    borderRadius: '16px',
                                    border: '1px solid rgba(139, 92, 246, 0.3)'
                                }}>
                                    <h3 style={{
                                        fontSize: '1.1rem',
                                        fontWeight: 600,
                                        color: 'var(--primary-400)',
                                        marginBottom: '1rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem'
                                    }}>
                                        🎯 Key Points
                                    </h3>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                        {section.keyPoints.map((point, idx) => (
                                            <div
                                                key={idx}
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'flex-start',
                                                    gap: '0.75rem'
                                                }}
                                            >
                                                <span style={{
                                                    width: '24px',
                                                    height: '24px',
                                                    borderRadius: '50%',
                                                    background: 'var(--primary-500)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    fontSize: '0.75rem',
                                                    fontWeight: 600,
                                                    color: 'white',
                                                    flexShrink: 0
                                                }}>
                                                    {idx + 1}
                                                </span>
                                                <p style={{
                                                    fontSize: '0.95rem',
                                                    color: 'var(--neutral-300)',
                                                    lineHeight: 1.6,
                                                    margin: 0
                                                }}>
                                                    {point}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Tips Row - Exam Tip, Common Mistake, Real World */}
                            {(section.examTip || section.commonMistake || section.realWorldConnection) && (
                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                                    gap: '1rem',
                                    marginTop: '1.5rem'
                                }}>
                                    {section.examTip && (
                                        <div style={{
                                            padding: '1.25rem',
                                            background: 'rgba(251, 191, 36, 0.1)',
                                            borderRadius: '16px',
                                            border: '1px solid rgba(251, 191, 36, 0.3)'
                                        }}>
                                            <div style={{
                                                fontSize: '0.85rem',
                                                fontWeight: 600,
                                                color: 'var(--accent-amber)',
                                                marginBottom: '0.5rem',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.5rem'
                                            }}>
                                                📝 Exam Tip
                                            </div>
                                            <p style={{
                                                fontSize: '0.9rem',
                                                color: 'var(--neutral-300)',
                                                lineHeight: 1.5,
                                                margin: 0
                                            }}>
                                                {section.examTip}
                                            </p>
                                        </div>
                                    )}

                                    {section.commonMistake && (
                                        <div style={{
                                            padding: '1.25rem',
                                            background: 'rgba(244, 63, 94, 0.1)',
                                            borderRadius: '16px',
                                            border: '1px solid rgba(244, 63, 94, 0.3)'
                                        }}>
                                            <div style={{
                                                fontSize: '0.85rem',
                                                fontWeight: 600,
                                                color: 'var(--accent-rose)',
                                                marginBottom: '0.5rem',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.5rem'
                                            }}>
                                                ⚠️ Common Mistake
                                            </div>
                                            <p style={{
                                                fontSize: '0.9rem',
                                                color: 'var(--neutral-300)',
                                                lineHeight: 1.5,
                                                margin: 0
                                            }}>
                                                {section.commonMistake}
                                            </p>
                                        </div>
                                    )}

                                    {section.realWorldConnection && (
                                        <div style={{
                                            padding: '1.25rem',
                                            background: 'rgba(16, 185, 129, 0.1)',
                                            borderRadius: '16px',
                                            border: '1px solid rgba(16, 185, 129, 0.3)'
                                        }}>
                                            <div style={{
                                                fontSize: '0.85rem',
                                                fontWeight: 600,
                                                color: 'var(--accent-emerald)',
                                                marginBottom: '0.5rem',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.5rem'
                                            }}>
                                                🌍 Real World
                                            </div>
                                            <p style={{
                                                fontSize: '0.9rem',
                                                color: 'var(--neutral-300)',
                                                lineHeight: 1.5,
                                                margin: 0
                                            }}>
                                                {section.realWorldConnection}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Fun Fact */}
                            {section.funFact && (
                                <div style={{
                                    marginTop: '1.5rem',
                                    padding: '1.5rem',
                                    background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(59, 130, 246, 0.15) 100%)',
                                    borderRadius: '16px',
                                    border: '1px solid rgba(139, 92, 246, 0.3)',
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    gap: '1rem'
                                }}>
                                    <span style={{ fontSize: '2rem' }}>✨</span>
                                    <div>
                                        <div style={{
                                            fontSize: '0.9rem',
                                            fontWeight: 600,
                                            color: 'var(--primary-400)',
                                            marginBottom: '0.5rem'
                                        }}>
                                            Fun Fact
                                        </div>
                                        <p style={{
                                            fontSize: '0.95rem',
                                            color: 'var(--neutral-300)',
                                            lineHeight: 1.6,
                                            margin: 0
                                        }}>
                                            {section.funFact}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    )}

                    {/* CONJUGATION TAB */}
                    {activeTab === 'conjugation' && section.conjugationDiagram && (
                        <motion.div
                            key="conjugation"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                        >
                            <ConjugationDiagram />
                        </motion.div>
                    )}

                    {/* COLORS (FEATURED MOLECULES) TAB */}
                    {activeTab === 'colors' && section.colorExamples && (
                        <motion.div
                            key="colors"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                        >
                            <div style={{
                                textAlign: 'center',
                                marginBottom: '2rem'
                            }}>
                                <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🧪</div>
                                <h3 style={{
                                    fontSize: '1.5rem',
                                    fontWeight: 700,
                                    color: 'var(--neutral-100)',
                                    marginBottom: '0.5rem'
                                }}>
                                    Featured Color Molecules
                                </h3>
                                <p style={{
                                    color: 'var(--neutral-400)',
                                    fontSize: '0.95rem'
                                }}>
                                    Discover why these molecules have such vibrant colors!
                                </p>
                            </div>
                            <ColorMoleculesGrid examples={section.colorExamples} />
                        </motion.div>
                    )}

                    {/* CLINICAL COLORS TAB */}
                    {activeTab === 'clinical' && (
                        <motion.div
                            key="clinical"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                        >
                            <ClinicalColorCases />
                        </motion.div>
                    )}

                    {/* CLINICAL DETECTIVE GAME TAB */}
                    {activeTab === 'detective' && (
                        <motion.div
                            key="detective"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                        >
                            <ClinicalDetectiveGame />
                        </motion.div>
                    )}

                    {/* RESEARCH TOOLS (DRUG DISCOVERY) TAB */}
                    {activeTab === 'research' && (
                        <motion.div
                            key="research"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                        >
                            <DrugDiscoveryTools />
                        </motion.div>
                    )}

                    {/* QUICK CHECK TAB */}
                    {activeTab === 'quickCheck' && (
                        <motion.div
                            key="quickCheck"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                        >
                            <div style={{
                                textAlign: 'center',
                                marginBottom: '2rem'
                            }}>
                                <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>✅</div>
                                <h3 style={{
                                    fontSize: '1.5rem',
                                    fontWeight: 700,
                                    color: 'var(--neutral-100)',
                                    marginBottom: '0.5rem'
                                }}>
                                    Quick Check
                                </h3>
                                <p style={{
                                    color: 'var(--neutral-400)',
                                    fontSize: '0.95rem'
                                }}>
                                    Test your understanding of this section
                                </p>
                            </div>

                            {sectionQuiz.length > 0 ? (
                                <>
                                    <div style={{
                                        maxWidth: '700px',
                                        margin: '0 auto',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '1.5rem'
                                    }}>
                                        {sectionQuiz.map((q, qIdx) => {
                                            const answered = quizAnswers[qIdx] !== undefined;
                                            const isCorrect = showQuizResults && quizAnswers[qIdx] === q.correctIndex;

                                            return (
                                                <div
                                                    key={qIdx}
                                                    style={{
                                                        padding: '1.5rem',
                                                        background: showQuizResults
                                                            ? isCorrect
                                                                ? 'rgba(16, 185, 129, 0.1)'
                                                                : answered
                                                                    ? 'rgba(244, 63, 94, 0.1)'
                                                                    : 'var(--neutral-900)'
                                                            : 'var(--neutral-900)',
                                                        borderRadius: '16px',
                                                        border: showQuizResults
                                                            ? isCorrect
                                                                ? '1px solid rgba(16, 185, 129, 0.3)'
                                                                : answered
                                                                    ? '1px solid rgba(244, 63, 94, 0.3)'
                                                                    : '1px solid var(--neutral-800)'
                                                            : '1px solid var(--neutral-800)'
                                                    }}
                                                >
                                                    <p style={{
                                                        fontSize: '1.05rem',
                                                        fontWeight: 500,
                                                        color: 'var(--neutral-200)',
                                                        marginBottom: '1rem'
                                                    }}>
                                                        {qIdx + 1}. {q.question}
                                                    </p>
                                                    <div style={{
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        gap: '0.5rem'
                                                    }}>
                                                        {q.options.map((opt, optIdx) => {
                                                            const isSelected = quizAnswers[qIdx] === optIdx;
                                                            const isCorrectAnswer = showQuizResults && optIdx === q.correctIndex;

                                                            return (
                                                                <button
                                                                    key={optIdx}
                                                                    onClick={() => !showQuizResults && handleQuizAnswer(qIdx, optIdx)}
                                                                    disabled={showQuizResults}
                                                                    style={{
                                                                        display: 'flex',
                                                                        alignItems: 'center',
                                                                        gap: '0.75rem',
                                                                        padding: '0.75rem 1rem',
                                                                        background: showQuizResults
                                                                            ? isCorrectAnswer
                                                                                ? 'rgba(16, 185, 129, 0.2)'
                                                                                : isSelected && !isCorrectAnswer
                                                                                    ? 'rgba(244, 63, 94, 0.2)'
                                                                                    : 'rgba(255,255,255,0.03)'
                                                                            : isSelected
                                                                                ? 'rgba(139, 92, 246, 0.2)'
                                                                                : 'rgba(255,255,255,0.03)',
                                                                        border: showQuizResults
                                                                            ? isCorrectAnswer
                                                                                ? '1px solid var(--accent-emerald)'
                                                                                : isSelected && !isCorrectAnswer
                                                                                    ? '1px solid var(--accent-rose)'
                                                                                    : '1px solid var(--neutral-800)'
                                                                            : isSelected
                                                                                ? '1px solid var(--primary-500)'
                                                                                : '1px solid var(--neutral-800)',
                                                                        borderRadius: '10px',
                                                                        cursor: showQuizResults ? 'default' : 'pointer',
                                                                        textAlign: 'left'
                                                                    }}
                                                                >
                                                                    <span style={{
                                                                        width: '28px',
                                                                        height: '28px',
                                                                        borderRadius: '50%',
                                                                        background: showQuizResults && isCorrectAnswer
                                                                            ? 'var(--accent-emerald)'
                                                                            : isSelected
                                                                                ? showQuizResults && !isCorrectAnswer
                                                                                    ? 'var(--accent-rose)'
                                                                                    : 'var(--primary-500)'
                                                                                : 'var(--neutral-800)',
                                                                        display: 'flex',
                                                                        alignItems: 'center',
                                                                        justifyContent: 'center',
                                                                        fontSize: '0.8rem',
                                                                        fontWeight: 600,
                                                                        color: isSelected || (showQuizResults && isCorrectAnswer) ? 'white' : 'var(--neutral-400)'
                                                                    }}>
                                                                        {labels[optIdx]}
                                                                    </span>
                                                                    <span style={{
                                                                        flex: 1,
                                                                        fontSize: '0.95rem',
                                                                        color: 'var(--neutral-300)'
                                                                    }}>
                                                                        {opt}
                                                                    </span>
                                                                    {showQuizResults && isCorrectAnswer && (
                                                                        <span style={{ color: 'var(--accent-emerald)', fontSize: '1.25rem' }}>✓</span>
                                                                    )}
                                                                    {showQuizResults && isSelected && !isCorrectAnswer && (
                                                                        <span style={{ color: 'var(--accent-rose)', fontSize: '1.25rem' }}>✗</span>
                                                                    )}
                                                                </button>
                                                            );
                                                        })}
                                                    </div>

                                                    {/* Show explanation after quiz results */}
                                                    {showQuizResults && q.explanation && (
                                                        <p style={{
                                                            marginTop: '1rem',
                                                            padding: '0.75rem',
                                                            background: 'rgba(255,255,255,0.05)',
                                                            borderRadius: '8px',
                                                            fontSize: '0.85rem',
                                                            color: 'var(--neutral-400)',
                                                            lineHeight: 1.5
                                                        }}>
                                                            💡 {q.explanation}
                                                        </p>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>

                                    {/* Quiz Submit/Results */}
                                    <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                                        {!showQuizResults ? (
                                            <motion.button
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                onClick={() => setShowQuizResults(true)}
                                                disabled={!checkQuizComplete()}
                                                style={{
                                                    padding: '1rem 2.5rem',
                                                    background: checkQuizComplete()
                                                        ? 'linear-gradient(135deg, #10b981, #059669)'
                                                        : 'var(--neutral-700)',
                                                    border: 'none',
                                                    borderRadius: '12px',
                                                    color: checkQuizComplete() ? 'white' : 'var(--neutral-500)',
                                                    fontWeight: 600,
                                                    fontSize: '1rem',
                                                    cursor: checkQuizComplete() ? 'pointer' : 'not-allowed'
                                                }}
                                            >
                                                Check My Answers
                                            </motion.button>
                                        ) : (
                                            <div>
                                                <div style={{
                                                    fontSize: '1.25rem',
                                                    fontWeight: 700,
                                                    color: calculateQuizScore().correct === calculateQuizScore().total
                                                        ? 'var(--accent-emerald)'
                                                        : 'var(--neutral-300)',
                                                    marginBottom: '1rem'
                                                }}>
                                                    {calculateQuizScore().correct === calculateQuizScore().total
                                                        ? '🎉 Perfect Score!'
                                                        : `${calculateQuizScore().correct}/${calculateQuizScore().total} Correct`}
                                                </div>
                                                <button
                                                    onClick={() => {
                                                        setQuizAnswers({});
                                                        setShowQuizResults(false);
                                                    }}
                                                    style={{
                                                        padding: '0.75rem 1.5rem',
                                                        background: 'var(--neutral-800)',
                                                        border: 'none',
                                                        borderRadius: '10px',
                                                        color: 'var(--neutral-300)',
                                                        cursor: 'pointer',
                                                        fontWeight: 500
                                                    }}
                                                >
                                                    🔄 Try Again
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </>
                            ) : (
                                <div style={{
                                    textAlign: 'center',
                                    padding: '3rem 2rem',
                                    background: 'var(--neutral-900)',
                                    borderRadius: '16px',
                                    border: '1px solid var(--neutral-800)'
                                }}>
                                    <div style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.5 }}>📝</div>
                                    <p style={{
                                        color: 'var(--neutral-400)',
                                        fontSize: '1rem'
                                    }}>
                                        Quick check questions coming soon for this section!
                                    </p>
                                </div>
                            )}
                        </motion.div>
                    )}

                    {/* FEATURED MOLECULES TAB */}
                    {activeTab === 'molecules' && (
                        <motion.div
                            key="molecules"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                        >
                            <div style={{
                                textAlign: 'center',
                                marginBottom: '2rem'
                            }}>
                                <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🧪</div>
                                <h3 style={{
                                    fontSize: '1.5rem',
                                    fontWeight: 700,
                                    color: 'var(--neutral-100)',
                                    marginBottom: '0.5rem'
                                }}>
                                    Featured Molecules
                                </h3>
                                <p style={{
                                    color: 'var(--neutral-400)',
                                    fontSize: '0.95rem'
                                }}>
                                    Explore the molecules mentioned in this section
                                </p>
                            </div>

                            {section.molecules && section.molecules.length > 0 ? (
                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                                    gap: '1.5rem'
                                }}>
                                    {section.molecules.map((mol, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: idx * 0.1 }}
                                            style={{
                                                background: 'var(--neutral-900)',
                                                borderRadius: '16px',
                                                border: '1px solid var(--neutral-800)',
                                                overflow: 'hidden'
                                            }}
                                        >
                                            <MoleculeViewer
                                                moleculeName={mol.name}
                                                description={mol.description}
                                                height={220}
                                            />
                                        </motion.div>
                                    ))}
                                </div>
                            ) : (
                                <div style={{
                                    textAlign: 'center',
                                    padding: '3rem 2rem',
                                    background: 'var(--neutral-900)',
                                    borderRadius: '16px',
                                    border: '1px solid var(--neutral-800)'
                                }}>
                                    <div style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.5 }}>🧬</div>
                                    <p style={{
                                        color: 'var(--neutral-400)',
                                        fontSize: '1rem'
                                    }}>
                                        3D molecules coming soon for this section!
                                    </p>
                                </div>
                            )}
                        </motion.div>
                    )}

                    {/* SIMULATION TAB */}
                    {activeTab === 'simulation' && section.simulation && (
                        <motion.div
                            key="simulation"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                        >
                            {section.simulation.type === 'vision' && (
                                <VisionSimulator />
                            )}

                            {section.simulation.type === 'drug-docking' && (
                                <DrugDockingSimulator />
                            )}

                            {section.simulation.type === 'magic-bullet' && (
                                <MagicBulletExplorer />
                            )}

                            {/* Placeholder for other simulation types */}
                            {section.simulation.type !== 'vision' &&
                                section.simulation.type !== 'drug-docking' &&
                                section.simulation.type !== 'magic-bullet' && (
                                    <div style={{
                                        textAlign: 'center',
                                        padding: '3rem 2rem',
                                        background: 'var(--gradient-card)',
                                        borderRadius: '16px',
                                        border: '1px solid var(--neutral-800)'
                                    }}>
                                        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎮</div>
                                        <p style={{
                                            color: 'var(--neutral-400)',
                                            fontSize: '1rem'
                                        }}>
                                            Simulation coming soon!
                                        </p>
                                    </div>
                                )}
                        </motion.div>
                    )}

                    {/* DRUG DISCOVERY TAB */}
                    {activeTab === 'drugDiscovery' && showDrugDiscoveryTab && (
                        <motion.div
                            key="drugDiscovery"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                        >
                            {/* Lesson 1: Cisplatin/Transplatin Drug Discovery */}
                            {section.id === 'organic-chemistry-and-you' && (
                                <DrugDiscoveryPanel sectionId={section.id} />
                            )}

                            {/* Lesson 4: Sulfa Drug Discovery (Synthetic Dyes) */}
                            {section.id === 'synthetic-dyes' && section.sulfaDrugDiscovery && (
                                <SulfaDrugDiscoveryPanel />
                            )}

                            {/* Other Lessons with drugDiscovery property (e.g., Aspirin story) */}
                            {section.drugDiscovery &&
                                section.id !== 'organic-chemistry-and-you' &&
                                section.id !== 'synthetic-dyes' && (
                                    <AspirinDiscoveryPanel drugDiscovery={section.drugDiscovery} />
                                )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Navigation Footer */}
            <div style={{
                padding: '1.5rem',
                borderTop: '1px solid var(--neutral-800)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem'
            }}>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                    {hasPrev && (
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => onNavigate('prev')}
                            style={{
                                padding: '0.75rem 1.25rem',
                                background: 'var(--neutral-800)',
                                border: 'none',
                                borderRadius: '12px',
                                color: 'var(--neutral-300)',
                                fontWeight: 500,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}
                        >
                            ← Previous
                        </motion.button>
                    )}
                </div>

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onMarkComplete}
                    style={{
                        padding: '0.75rem 1.5rem',
                        background: isCompleted
                            ? 'rgba(16, 185, 129, 0.2)'
                            : 'var(--gradient-primary)',
                        border: isCompleted
                            ? '1px solid var(--accent-emerald)'
                            : 'none',
                        borderRadius: '12px',
                        color: isCompleted ? 'var(--accent-emerald)' : 'white',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}
                >
                    {isCompleted ? '✓ Completed' : 'Mark Complete'}
                </motion.button>

                <div style={{ display: 'flex', gap: '0.75rem' }}>
                    {hasNext && (
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => onNavigate('next')}
                            style={{
                                padding: '0.75rem 1.25rem',
                                background: 'var(--gradient-primary)',
                                border: 'none',
                                borderRadius: '12px',
                                color: 'white',
                                fontWeight: 600,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}
                        >
                            Next Lesson →
                        </motion.button>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
