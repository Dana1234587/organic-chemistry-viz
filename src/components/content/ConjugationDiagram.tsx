import { motion } from 'framer-motion';
import { useState } from 'react';

export default function ConjugationDiagram() {
    const [hoveredLevel, setHoveredLevel] = useState<number | null>(null);

    const levels = [
        {
            id: 1,
            title: "Minimal Conjugation",
            bonds: "Isolated Double Bonds",
            absorption: "UV Light (Invisible)",
            appearance: "Colorless",
            color: "#e2e8f0", // Slate 200 (White/Gray)
            wavelength: "< 400nm"
        },
        {
            id: 2,
            title: "Medium Conjugation",
            bonds: "3-7 Alternating Bonds",
            absorption: "Blue/Violet Light",
            appearance: "Yellow/Orange",
            color: "#f59e0b", // Amber 500
            wavelength: "400-500nm"
        },
        {
            id: 3,
            title: "Extensive Conjugation",
            bonds: "8+ Alternating Bonds",
            absorption: "Red/Orange Light",
            appearance: "Blue/Green",
            color: "#10b981", // Emerald 500
            wavelength: "> 600nm"
        }
    ];

    return (
        <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            borderRadius: '24px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '2rem',
            marginTop: '2rem',
            marginBottom: '2rem'
        }}>
            <h3 style={{
                margin: '0 0 1.5rem 0',
                fontSize: '1.5rem',
                fontWeight: 700,
                color: 'var(--neutral-100)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
            }}>
                <span style={{ fontSize: '1.75rem' }}>🌈</span>
                The Conjugation Rule
            </h3>

            <p style={{
                color: 'var(--neutral-400)',
                lineHeight: 1.6,
                marginBottom: '2rem'
            }}>
                Generally, the more conjugated double bonds a molecule has, the longer the wavelength
                of light it absorbs, and the more "red-shifted" its color becomes.
            </p>

            <div style={{ display: 'grid', gap: '1rem' }}>
                {levels.map((level, index) => (
                    <motion.div
                        key={level.id}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        onHoverStart={() => setHoveredLevel(level.id)}
                        onHoverEnd={() => setHoveredLevel(null)}
                        style={{
                            background: hoveredLevel === level.id ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.2)',
                            borderRadius: '16px',
                            padding: '1.25rem',
                            border: `1px solid ${hoveredLevel === level.id ? level.color : 'rgba(255,255,255,0.05)'}`,
                            display: 'grid',
                            gridTemplateColumns: '1fr auto 1fr',
                            alignItems: 'center',
                            gap: '2rem',
                            cursor: 'default',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        {/* Left: Structure Info */}
                        <div>
                            <div style={{
                                fontWeight: 700,
                                color: hoveredLevel === level.id ? 'white' : 'var(--neutral-300)',
                                marginBottom: '0.25rem'
                            }}>
                                {level.title}
                            </div>
                            <div style={{ fontSize: '0.85rem', color: 'var(--neutral-500)' }}>
                                {level.bonds}
                            </div>
                        </div>

                        {/* Center: Arrow/Process */}
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '0.25rem'
                        }}>
                            <div style={{ fontSize: '0.75rem', color: 'var(--neutral-600)' }}>Absorbs</div>
                            <div style={{
                                height: '2px',
                                width: '60px',
                                background: 'var(--neutral-700)',
                                position: 'relative'
                            }}>
                                <div style={{
                                    position: 'absolute',
                                    right: 0,
                                    top: '-4px',
                                    width: '0',
                                    height: '0',
                                    borderTop: '5px solid transparent',
                                    borderBottom: '5px solid transparent',
                                    borderLeft: '6px solid var(--neutral-700)'
                                }} />
                            </div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--neutral-400)' }}>{level.absorption}</div>
                        </div>

                        {/* Right: Resulting Color */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'flex-end' }}>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{
                                    fontWeight: 700,
                                    color: level.color,
                                    marginBottom: '0.25rem'
                                }}>
                                    {level.appearance}
                                </div>
                                <div style={{ fontSize: '0.85rem', color: 'var(--neutral-500)' }}>
                                    Appears to Eye
                                </div>
                            </div>
                            <div style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '10px',
                                background: level.color,
                                boxShadow: `0 0 20px ${level.color}40`,
                                border: '2px solid rgba(255,255,255,0.1)'
                            }} />
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Spectrum Bar Footer */}
            <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{
                    width: '100%',
                    height: '8px',
                    borderRadius: '4px',
                    background: 'linear-gradient(90deg, #e2e8f0 0%, #f59e0b 50%, #10b981 100%)',
                    marginBottom: '0.75rem'
                }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--neutral-500)' }}>
                    <span>Less Conjugation (UV)</span>
                    <span>More Conjugation (Visible)</span>
                </div>
            </div>
        </div>
    );
}
