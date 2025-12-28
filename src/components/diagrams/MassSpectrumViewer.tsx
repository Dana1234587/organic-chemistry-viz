'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';

interface Peak {
    mz: number;
    intensity: number;
    label?: string;
    isM?: boolean;  // Molecular ion
    isBase?: boolean;  // Base peak
}

interface MassSpectrumProps {
    peaks: Peak[];
    molecularWeight: number;
    moleculeName: string;
    formula?: string;
    showIsotopePattern?: boolean;
    halogen?: 'Cl' | 'Br' | 'Cl2' | 'Br2' | null;
}

// Calculate isotope pattern based on halogen
function calculateIsotopePattern(mw: number, halogen: string | null): Peak[] {
    if (!halogen) return [{ mz: mw, intensity: 100, label: 'M⁺', isM: true }];

    switch (halogen) {
        case 'Cl':
            // 3:1 ratio for Cl
            return [
                { mz: mw, intensity: 100, label: 'M⁺ (³⁵Cl)', isM: true },
                { mz: mw + 2, intensity: 33, label: 'M+2 (³⁷Cl)' }
            ];
        case 'Br':
            // 1:1 ratio for Br
            return [
                { mz: mw, intensity: 100, label: 'M⁺ (⁷⁹Br)', isM: true },
                { mz: mw + 2, intensity: 100, label: 'M+2 (⁸¹Br)' }
            ];
        case 'Cl2':
            // 9:6:1 ratio for 2 Cl
            return [
                { mz: mw, intensity: 100, label: 'M⁺', isM: true },
                { mz: mw + 2, intensity: 67, label: 'M+2' },
                { mz: mw + 4, intensity: 11, label: 'M+4' }
            ];
        case 'Br2':
            // 1:2:1 ratio for 2 Br
            return [
                { mz: mw, intensity: 50, label: 'M⁺', isM: true },
                { mz: mw + 2, intensity: 100, label: 'M+2' },
                { mz: mw + 4, intensity: 50, label: 'M+4' }
            ];
        default:
            return [{ mz: mw, intensity: 100, label: 'M⁺', isM: true }];
    }
}

export default function MassSpectrumViewer({
    peaks,
    molecularWeight,
    moleculeName,
    formula,
    showIsotopePattern = true,
    halogen = null
}: MassSpectrumProps) {
    const [hoveredPeak, setHoveredPeak] = useState<Peak | null>(null);
    const [selectedHalogen, setSelectedHalogen] = useState<string | null>(halogen);

    // Generate isotope pattern if enabled
    const isotopePattern = useMemo(() => {
        if (!showIsotopePattern) return [];
        return calculateIsotopePattern(molecularWeight, selectedHalogen);
    }, [molecularWeight, selectedHalogen, showIsotopePattern]);

    // Combine user peaks with isotope pattern
    const allPeaks = useMemo(() => {
        const combined = [...peaks];
        isotopePattern.forEach(ip => {
            if (!peaks.find(p => Math.abs(p.mz - ip.mz) < 0.5)) {
                combined.push(ip);
            }
        });
        return combined.sort((a, b) => a.mz - b.mz);
    }, [peaks, isotopePattern]);

    // Find max m/z for scale
    const maxMz = Math.max(...allPeaks.map(p => p.mz)) + 20;
    const minMz = Math.max(0, Math.min(...allPeaks.map(p => p.mz)) - 10);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
                background: 'linear-gradient(135deg, rgba(20, 20, 30, 0.95), rgba(30, 30, 45, 0.9))',
                borderRadius: 16,
                padding: '1.5rem',
                border: '1px solid rgba(139, 92, 246, 0.2)',
            }}
        >
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div>
                    <h4 style={{ margin: 0, color: 'white', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        📊 Mass Spectrum: {moleculeName}
                    </h4>
                    {formula && (
                        <div style={{ color: '#fbbf24', fontFamily: 'monospace', fontSize: '0.9rem', marginTop: '0.25rem' }}>
                            {formula} • MW = {molecularWeight}
                        </div>
                    )}
                </div>

                {/* Halogen Selector */}
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {['None', 'Cl', 'Br', 'Cl2', 'Br2'].map(h => (
                        <button
                            key={h}
                            onClick={() => setSelectedHalogen(h === 'None' ? null : h)}
                            style={{
                                padding: '4px 10px',
                                background: (h === 'None' && !selectedHalogen) || selectedHalogen === h
                                    ? 'linear-gradient(135deg, #8b5cf6, #6366f1)'
                                    : 'rgba(255,255,255,0.1)',
                                border: 'none',
                                borderRadius: 8,
                                color: 'white',
                                fontSize: '0.75rem',
                                cursor: 'pointer',
                            }}
                        >
                            {h === 'None' ? 'No X' : h}
                        </button>
                    ))}
                </div>
            </div>

            {/* Spectrum SVG */}
            <svg width="100%" height="250" viewBox="0 0 500 250" style={{ overflow: 'visible' }}>
                {/* Background grid */}
                <defs>
                    <pattern id="grid" width="50" height="25" patternUnits="userSpaceOnUse">
                        <path d="M 50 0 L 0 0 0 25" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
                    </pattern>
                </defs>
                <rect x="50" y="10" width="430" height="200" fill="url(#grid)" />

                {/* Y-axis */}
                <line x1="50" y1="10" x2="50" y2="210" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
                <text x="25" y="20" fill="rgba(255,255,255,0.7)" fontSize="10" textAnchor="middle">100%</text>
                <text x="25" y="115" fill="rgba(255,255,255,0.7)" fontSize="10" textAnchor="middle">50%</text>
                <text x="25" y="210" fill="rgba(255,255,255,0.7)" fontSize="10" textAnchor="middle">0%</text>
                <text x="15" y="120" fill="rgba(255,255,255,0.5)" fontSize="9" textAnchor="middle" transform="rotate(-90, 15, 120)">
                    Relative Abundance
                </text>

                {/* X-axis */}
                <line x1="50" y1="210" x2="480" y2="210" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
                <text x="265" y="240" fill="rgba(255,255,255,0.5)" fontSize="10" textAnchor="middle">m/z</text>

                {/* X-axis ticks */}
                {[0, 0.25, 0.5, 0.75, 1].map(frac => {
                    const mz = Math.round(minMz + frac * (maxMz - minMz));
                    const x = 50 + frac * 430;
                    return (
                        <g key={frac}>
                            <line x1={x} y1="210" x2={x} y2="215" stroke="rgba(255,255,255,0.3)" />
                            <text x={x} y="225" fill="rgba(255,255,255,0.7)" fontSize="9" textAnchor="middle">{mz}</text>
                        </g>
                    );
                })}

                {/* Peaks */}
                {allPeaks.map((peak, i) => {
                    const x = 50 + ((peak.mz - minMz) / (maxMz - minMz)) * 430;
                    const height = (peak.intensity / 100) * 190;
                    const isHovered = hoveredPeak === peak;
                    const color = peak.isM ? '#ef4444' : peak.isBase ? '#22c55e' : '#8b5cf6';

                    return (
                        <g key={i}>
                            <motion.rect
                                x={x - 3}
                                y={210 - height}
                                width={6}
                                height={height}
                                fill={color}
                                opacity={isHovered ? 1 : 0.8}
                                initial={{ height: 0, y: 210 }}
                                animate={{ height, y: 210 - height }}
                                transition={{ delay: i * 0.05, duration: 0.3 }}
                                onMouseEnter={() => setHoveredPeak(peak)}
                                onMouseLeave={() => setHoveredPeak(null)}
                                style={{ cursor: 'pointer' }}
                            />
                            {/* Label */}
                            {(peak.isM || peak.intensity > 50 || isHovered) && (
                                <text
                                    x={x}
                                    y={210 - height - 8}
                                    fill={color}
                                    fontSize="9"
                                    textAnchor="middle"
                                    fontWeight={isHovered ? 'bold' : 'normal'}
                                >
                                    {peak.label || peak.mz}
                                </text>
                            )}
                        </g>
                    );
                })}
            </svg>

            {/* Tooltip */}
            {hoveredPeak && (
                <div style={{
                    marginTop: '0.5rem',
                    padding: '0.75rem',
                    background: 'rgba(0,0,0,0.5)',
                    borderRadius: 8,
                    fontSize: '0.85rem',
                }}>
                    <strong style={{ color: '#8b5cf6' }}>m/z = {hoveredPeak.mz}</strong>
                    <span style={{ color: 'rgba(255,255,255,0.7)', marginLeft: '1rem' }}>
                        Intensity: {hoveredPeak.intensity}%
                    </span>
                    {hoveredPeak.label && (
                        <span style={{ color: '#fbbf24', marginLeft: '1rem' }}>{hoveredPeak.label}</span>
                    )}
                </div>
            )}

            {/* Legend */}
            <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1rem', fontSize: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <div style={{ width: 12, height: 12, background: '#ef4444', borderRadius: 2 }} />
                    <span style={{ color: 'rgba(255,255,255,0.7)' }}>Molecular Ion (M⁺)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <div style={{ width: 12, height: 12, background: '#22c55e', borderRadius: 2 }} />
                    <span style={{ color: 'rgba(255,255,255,0.7)' }}>Base Peak (100%)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <div style={{ width: 12, height: 12, background: '#8b5cf6', borderRadius: 2 }} />
                    <span style={{ color: 'rgba(255,255,255,0.7)' }}>Fragment Ions</span>
                </div>
            </div>
        </motion.div>
    );
}
