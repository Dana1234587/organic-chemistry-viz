'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function DBECalculator() {
    const [c, setC] = useState<number>(6);
    const [h, setH] = useState<number>(6);
    const [n, setN] = useState<number>(0);
    const [o, setO] = useState<number>(0);
    const [x, setX] = useState<number>(0);  // Halogens

    // DBE = C + 1 - H/2 + N/2 - X/2
    // Note: O doesn't affect DBE
    const dbe = c + 1 - (h / 2) + (n / 2) - (x / 2);

    const getSuggestion = (dbe: number): string => {
        if (dbe === 0) return "Saturated compound (no rings or double bonds)";
        if (dbe === 1) return "One double bond OR one ring";
        if (dbe === 2) return "Two double bonds, one triple bond, or combinations";
        if (dbe === 3) return "Could be a triple bond + double bond or complex ring system";
        if (dbe === 4) return "🔔 Likely contains a BENZENE RING (3 C=C + 1 ring)";
        if (dbe >= 5) return "🔔 Likely aromatic + additional unsaturation";
        return "";
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
                background: 'linear-gradient(135deg, rgba(20, 20, 30, 0.95), rgba(30, 30, 45, 0.9))',
                borderRadius: 16,
                padding: '1.5rem',
                border: '1px solid rgba(139, 92, 246, 0.2)',
                maxWidth: 500,
            }}
        >
            <h4 style={{ margin: '0 0 1rem', color: 'white', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                🧮 DBE Calculator
            </h4>

            {/* Formula display */}
            <div style={{
                background: 'rgba(139, 92, 246, 0.1)',
                padding: '0.75rem 1rem',
                borderRadius: 8,
                marginBottom: '1rem',
                textAlign: 'center',
                fontFamily: 'monospace',
                fontSize: '1rem',
                color: '#fbbf24',
            }}>
                DBE = C + 1 - H/2 + N/2 - X/2
            </div>

            {/* Input grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.5rem', marginBottom: '1rem' }}>
                {[
                    { label: 'C', value: c, setter: setC, color: '#909090' },
                    { label: 'H', value: h, setter: setH, color: '#ffffff' },
                    { label: 'N', value: n, setter: setN, color: '#3050F8' },
                    { label: 'O', value: o, setter: setO, color: '#FF0D0D' },
                    { label: 'X', value: x, setter: setX, color: '#22c55e' },
                ].map(({ label, value, setter, color }) => (
                    <div key={label} style={{ textAlign: 'center' }}>
                        <div style={{
                            fontSize: '0.9rem',
                            fontWeight: 600,
                            color: color,
                            marginBottom: '0.25rem',
                            textShadow: label !== 'H' ? `0 0 6px ${color}40` : 'none'
                        }}>
                            {label}
                        </div>
                        <input
                            type="number"
                            min={0}
                            max={50}
                            value={value}
                            onChange={(e) => setter(Math.max(0, parseInt(e.target.value) || 0))}
                            style={{
                                width: '100%',
                                padding: '0.5rem',
                                background: 'rgba(255,255,255,0.1)',
                                border: `1px solid ${color}50`,
                                borderRadius: 8,
                                color: 'white',
                                textAlign: 'center',
                                fontSize: '1rem',
                            }}
                        />
                    </div>
                ))}
            </div>

            {/* Current formula display */}
            <div style={{
                textAlign: 'center',
                fontSize: '1.1rem',
                color: 'rgba(255,255,255,0.7)',
                marginBottom: '1rem',
            }}>
                Formula: <span style={{ fontFamily: 'monospace', color: '#fbbf24' }}>
                    C{c > 0 ? <sub>{c}</sub> : ''}
                    H{h > 0 ? <sub>{h}</sub> : ''}
                    {n > 0 && <>N{n > 1 && <sub>{n}</sub>}</>}
                    {o > 0 && <>O{o > 1 && <sub>{o}</sub>}</>}
                    {x > 0 && <>X{x > 1 && <sub>{x}</sub>}</>}
                </span>
            </div>

            {/* Result */}
            <motion.div
                key={dbe}
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                style={{
                    background: dbe >= 4
                        ? 'linear-gradient(135deg, rgba(251, 191, 36, 0.2), rgba(245, 158, 11, 0.1))'
                        : 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(99, 102, 241, 0.1))',
                    padding: '1rem',
                    borderRadius: 12,
                    textAlign: 'center',
                    border: `1px solid ${dbe >= 4 ? '#fbbf24' : '#8b5cf6'}40`,
                }}
            >
                <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', marginBottom: '0.25rem' }}>
                    Double Bond Equivalents
                </div>
                <div style={{
                    fontSize: '2.5rem',
                    fontWeight: 700,
                    color: dbe >= 4 ? '#fbbf24' : '#8b5cf6',
                }}>
                    {dbe}
                </div>
                <div style={{
                    fontSize: '0.85rem',
                    color: 'rgba(255,255,255,0.8)',
                    marginTop: '0.5rem',
                }}>
                    {getSuggestion(dbe)}
                </div>
            </motion.div>

            {/* Note about O */}
            <div style={{
                marginTop: '1rem',
                padding: '0.5rem',
                background: 'rgba(255,255,255,0.05)',
                borderRadius: 8,
                fontSize: '0.75rem',
                color: 'rgba(255,255,255,0.5)',
                textAlign: 'center',
            }}>
                💡 Note: Oxygen (O) doesn't affect DBE. Halogens (X) count as H.
            </div>
        </motion.div>
    );
}
