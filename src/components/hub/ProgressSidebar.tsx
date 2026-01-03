'use client';

import { motion } from 'framer-motion';
import { ChapterSection } from '@/data/types';

interface ProgressSidebarProps {
    sections: ChapterSection[];
    completedSections: Set<string>;
    quizScore: number | null;
    totalQuestions: number;
    progress: number;
}

export default function ProgressSidebar({
    sections,
    completedSections,
    quizScore,
    totalQuestions,
    progress
}: ProgressSidebarProps) {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            style={{
                width: '320px',
                flexShrink: 0,
                position: 'sticky',
                top: '2rem',
                alignSelf: 'flex-start'
            }}
            className="hide-mobile"
        >
            {/* Progress Card */}
            <div style={{
                background: 'var(--gradient-card)',
                borderRadius: '20px',
                padding: '1.5rem',
                border: '1px solid var(--neutral-800)',
                marginBottom: '1rem'
            }}>
                <h4 style={{
                    margin: '0 0 1rem',
                    color: 'var(--neutral-100)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '1rem'
                }}>
                    📊 Progress
                </h4>

                {/* Progress Ring */}
                <div style={{
                    width: '120px',
                    height: '120px',
                    margin: '0 auto 1rem',
                    position: 'relative'
                }}>
                    <svg width="120" height="120" style={{ transform: 'rotate(-90deg)' }}>
                        <circle
                            cx="60"
                            cy="60"
                            r="52"
                            fill="none"
                            stroke="var(--neutral-800)"
                            strokeWidth="8"
                        />
                        <motion.circle
                            cx="60"
                            cy="60"
                            r="52"
                            fill="none"
                            stroke="url(#progressGradient)"
                            strokeWidth="8"
                            strokeLinecap="round"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: progress / 100 }}
                            transition={{ duration: 0.5 }}
                            style={{
                                strokeDasharray: '327',
                                strokeDashoffset: 0
                            }}
                        />
                        <defs>
                            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="var(--primary-500)" />
                                <stop offset="100%" stopColor="var(--accent-emerald)" />
                            </linearGradient>
                        </defs>
                    </svg>
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        textAlign: 'center'
                    }}>
                        <div style={{
                            fontSize: '1.75rem',
                            fontWeight: 700,
                            color: 'var(--primary-400)'
                        }}>
                            {Math.round(progress)}%
                        </div>
                        <div style={{
                            fontSize: '0.75rem',
                            color: 'var(--neutral-500)'
                        }}>
                            complete
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '0.75rem'
                }}>
                    <div style={{
                        padding: '0.75rem',
                        background: 'var(--neutral-900)',
                        borderRadius: '10px',
                        textAlign: 'center'
                    }}>
                        <div style={{
                            fontSize: '1.25rem',
                            fontWeight: 700,
                            color: 'var(--accent-emerald)'
                        }}>
                            {completedSections.size}
                        </div>
                        <div style={{
                            fontSize: '0.75rem',
                            color: 'var(--neutral-500)'
                        }}>
                            Sections
                        </div>
                    </div>
                    <div style={{
                        padding: '0.75rem',
                        background: 'var(--neutral-900)',
                        borderRadius: '10px',
                        textAlign: 'center'
                    }}>
                        <div style={{
                            fontSize: '1.25rem',
                            fontWeight: 700,
                            color: quizScore !== null ? 'var(--accent-amber)' : 'var(--neutral-500)'
                        }}>
                            {quizScore !== null ? `${quizScore}/${totalQuestions}` : '—'}
                        </div>
                        <div style={{
                            fontSize: '0.75rem',
                            color: 'var(--neutral-500)'
                        }}>
                            Quiz Score
                        </div>
                    </div>
                </div>
            </div>

            {/* Sections List */}
            <div style={{
                background: 'var(--gradient-card)',
                borderRadius: '20px',
                padding: '1.5rem',
                border: '1px solid var(--neutral-800)',
                maxHeight: 'calc(100vh - 400px)',
                overflowY: 'auto'
            }}>
                <h4 style={{
                    margin: '0 0 1rem',
                    color: 'var(--neutral-100)',
                    fontSize: '0.95rem'
                }}>
                    📚 Sections
                </h4>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {sections.map((section, index) => {
                        const isCompleted = completedSections.has(section.id);
                        return (
                            <div
                                key={section.id}
                                style={{
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    gap: '0.75rem',
                                    padding: '0.75rem',
                                    borderRadius: '8px',
                                    background: isCompleted ? 'rgba(16, 185, 129, 0.1)' : 'transparent',
                                    transition: 'background 0.2s ease'
                                }}
                            >
                                <span style={{
                                    width: '24px',
                                    height: '24px',
                                    borderRadius: '50%',
                                    background: isCompleted
                                        ? 'var(--accent-emerald)'
                                        : 'var(--neutral-800)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '0.7rem',
                                    fontWeight: 600,
                                    color: isCompleted ? 'white' : 'var(--neutral-500)',
                                    flexShrink: 0,
                                    marginTop: '2px'
                                }}>
                                    {isCompleted ? '✓' : index + 1}
                                </span>
                                <span style={{
                                    fontSize: '0.85rem',
                                    color: isCompleted ? 'var(--accent-emerald)' : 'var(--neutral-400)',
                                    lineHeight: 1.4
                                }}>
                                    {section.title}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </motion.div>
    );
}
