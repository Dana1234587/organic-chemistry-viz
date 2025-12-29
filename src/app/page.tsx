'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const featuredChapters = [
  {
    id: 1,
    title: "What is Organic Chemistry?",
    description: "Discover how carbon compounds shape our world, from medicines to materials.",
    icon: "🧪",
    color: "#8b5cf6",
    available: true
  },
  {
    id: 2,
    title: "Organic Structures",
    description: "Learn to draw and interpret structural formulas of organic molecules.",
    icon: "🔗",
    color: "#06b6d4",
    available: true
  },
  {
    id: 3,
    title: "Determining Organic Structures",
    description: "Master spectroscopic techniques to identify unknown compounds.",
    icon: "🔬",
    color: "#10b981",
    available: true
  },
  {
    id: 4,
    title: "Structure of Molecules",
    description: "Explore 3D molecular geometry and its importance in chemistry.",
    icon: "💎",
    color: "#f59e0b",
    available: true
  },
  {
    id: 5,
    title: "Organic Reactions",
    description: "Introduction to how and why organic reactions occur.",
    icon: "⚡",
    color: "#f43f5e",
    available: true
  },
  {
    id: 6,
    title: "Nucleophilic Addition",
    description: "Understand carbonyl chemistry and nucleophilic attack.",
    icon: "🎯",
    color: "#3b82f6",
    available: false
  }
];

const stats = [
  { value: "43", label: "Chapters" },
  { value: "500+", label: "Interactive Molecules" },
  { value: "200+", label: "Quiz Questions" },
  { value: "3D", label: "Visualization" }
];

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ marginBottom: '4rem' }}
      >
        <div style={{
          background: 'var(--gradient-card)',
          borderRadius: '32px',
          padding: '3rem',
          border: '1px solid var(--card-border)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Decorative elements */}
          <div style={{
            position: 'absolute',
            top: '-50px',
            right: '-50px',
            width: '200px',
            height: '200px',
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(40px)'
          }} />
          <div style={{
            position: 'absolute',
            bottom: '-30px',
            left: '20%',
            width: '150px',
            height: '150px',
            background: 'radial-gradient(circle, rgba(6, 182, 212, 0.2) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(30px)'
          }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <span className="badge" style={{ marginBottom: '1rem', display: 'inline-flex' }}>
              📚 Based on Clayden's Organic Chemistry
            </span>

            <h1 style={{ marginBottom: '1rem' }}>
              Master Organic Chemistry
            </h1>

            <p style={{
              fontSize: '1.25rem',
              maxWidth: '700px',
              marginBottom: '2rem',
              color: 'var(--neutral-300)'
            }}>
              Explore the fascinating world of carbon compounds with interactive 3D molecules,
              engaging explanations, and practice quizzes designed to help you truly understand
              organic chemistry.
            </p>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link href="/chapter/1" className="btn-primary">
                🚀 Start Learning
              </Link>
              <button className="btn-secondary">
                📖 View All Chapters
              </button>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Stats */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        style={{ marginBottom: '4rem' }}
      >
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '1.5rem'
        }}>
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              style={{
                background: 'var(--gradient-card)',
                border: '1px solid var(--card-border)',
                borderRadius: '16px',
                padding: '1.5rem',
                textAlign: 'center'
              }}
            >
              <div style={{
                fontSize: '2.5rem',
                fontWeight: 700,
                background: 'var(--gradient-primary)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                {stat.value}
              </div>
              <div style={{
                color: 'var(--neutral-400)',
                fontSize: '0.9rem',
                fontWeight: 500
              }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Featured Chapters */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem'
        }}>
          <div>
            <h2 style={{ margin: 0 }}>Featured Chapters</h2>
            <p style={{ margin: '0.5rem 0 0', color: 'var(--neutral-400)' }}>
              Start your journey through organic chemistry
            </p>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '1.5rem'
        }}>
          {featuredChapters.map((chapter, index) => (
            <motion.div
              key={chapter.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              {chapter.available ? (
                <Link href={`/chapter/${chapter.id}`} style={{ textDecoration: 'none' }}>
                  <div className="glass-card" style={{ height: '100%' }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      marginBottom: '1rem'
                    }}>
                      <div style={{
                        width: '50px',
                        height: '50px',
                        background: `linear-gradient(135deg, ${chapter.color}40, ${chapter.color}20)`,
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.5rem'
                      }}>
                        {chapter.icon}
                      </div>
                      <div>
                        <span style={{
                          fontSize: '0.75rem',
                          color: 'var(--neutral-500)',
                          fontWeight: 600
                        }}>
                          CHAPTER {chapter.id}
                        </span>
                      </div>
                    </div>
                    <h3 style={{
                      margin: '0 0 0.75rem',
                      fontSize: '1.2rem',
                      color: 'var(--neutral-100)'
                    }}>
                      {chapter.title}
                    </h3>
                    <p style={{
                      margin: 0,
                      color: 'var(--neutral-400)',
                      fontSize: '0.95rem',
                      lineHeight: 1.6
                    }}>
                      {chapter.description}
                    </p>
                    <div style={{
                      marginTop: '1.25rem',
                      paddingTop: '1rem',
                      borderTop: '1px solid var(--neutral-800)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      color: chapter.color,
                      fontSize: '0.9rem',
                      fontWeight: 500
                    }}>
                      Start Chapter →
                    </div>
                  </div>
                </Link>
              ) : (
                <div className="glass-card" style={{
                  height: '100%',
                  opacity: 0.6,
                  cursor: 'not-allowed'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    marginBottom: '1rem'
                  }}>
                    <div style={{
                      width: '50px',
                      height: '50px',
                      background: 'var(--neutral-800)',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.5rem'
                    }}>
                      {chapter.icon}
                    </div>
                    <div>
                      <span style={{
                        fontSize: '0.75rem',
                        color: 'var(--neutral-500)',
                        fontWeight: 600
                      }}>
                        CHAPTER {chapter.id}
                      </span>
                    </div>
                  </div>
                  <h3 style={{
                    margin: '0 0 0.75rem',
                    fontSize: '1.2rem',
                    color: 'var(--neutral-400)'
                  }}>
                    {chapter.title}
                  </h3>
                  <p style={{
                    margin: 0,
                    color: 'var(--neutral-500)',
                    fontSize: '0.95rem',
                    lineHeight: 1.6
                  }}>
                    {chapter.description}
                  </p>
                  <div style={{
                    marginTop: '1.25rem',
                    paddingTop: '1rem',
                    borderTop: '1px solid var(--neutral-800)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: 'var(--neutral-500)',
                    fontSize: '0.9rem',
                    fontWeight: 500
                  }}>
                    🔒 Coming Soon
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Footer Spacer */}
      <div style={{ height: '4rem' }} />
    </div>
  );
}
