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

    // Combine user peaks with isotope pattern and sort by m/z
    const allPeaks = useMemo(() => {
        const combined = [...peaks];
        isotopePattern.forEach(ip => {
            if (!peaks.find(p => Math.abs(p.mz - ip.mz) < 0.5)) {
                combined.push(ip);
            }
        });
        return combined.sort((a, b) => a.mz - b.mz);
    }, [peaks, isotopePattern]);

    // Calculate LINEAR scale for x-axis (SCIENTIFIC ACCURACY)
    // The x-axis MUST be linear - equal spacing for equal m/z differences
    const minMz = 0; // Always start from 0 for proper scientific representation
    const maxMz = Math.max(...allPeaks.map(p => p.mz)) + 20;

    // SVG dimensions
    const svgWidth = 600;
    const svgHeight = 300;
    const margin = { top: 30, right: 30, bottom: 50, left: 60 };
    const plotWidth = svgWidth - margin.left - margin.right;
    const plotHeight = svgHeight - margin.top - margin.bottom;

    // Linear scale function for x-axis (m/z)
    const xScale = (mz: number) => {
        return margin.left + ((mz - minMz) / (maxMz - minMz)) * plotWidth;
    };

    // Linear scale function for y-axis (intensity)
    const yScale = (intensity: number) => {
        return margin.top + plotHeight - (intensity / 100) * plotHeight;
    };

    // Generate x-axis ticks at regular intervals (every 20 or 50 m/z depending on range)
    const tickInterval = maxMz > 200 ? 50 : 20;
    const xTicks = [];
    for (let i = 0; i <= maxMz; i += tickInterval) {
        xTicks.push(i);
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
                background: 'linear-gradient(135deg, rgba(20, 20, 30, 0.95), rgba(30, 30, 45, 0.9))',
                borderRadius: 16,
                padding: '1.5rem',
                border: '1px solid rgba(139, 92, 246, 0.2)',
                width: '100%',
                maxWidth: '100%',
                overflow: 'hidden',
                boxSizing: 'border-box',
            }}
        >
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
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
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
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

            {/* Spectrum SVG - SCIENTIFICALLY ACCURATE LINEAR SCALE */}
            <svg
                width="100%"
                height={svgHeight}
                viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                preserveAspectRatio="xMidYMid meet"
                style={{ overflow: 'visible', maxWidth: '100%', background: 'rgba(0,0,0,0.2)', borderRadius: 8 }}
            >
                {/* Grid lines */}
                {xTicks.map(tick => (
                    <line
                        key={`grid-${tick}`}
                        x1={xScale(tick)}
                        y1={margin.top}
                        x2={xScale(tick)}
                        y2={margin.top + plotHeight}
                        stroke="rgba(255,255,255,0.05)"
                        strokeWidth="1"
                    />
                ))}
                {[0, 25, 50, 75, 100].map(intensity => (
                    <line
                        key={`grid-y-${intensity}`}
                        x1={margin.left}
                        y1={yScale(intensity)}
                        x2={margin.left + plotWidth}
                        y2={yScale(intensity)}
                        stroke="rgba(255,255,255,0.05)"
                        strokeWidth="1"
                    />
                ))}

                {/* Y-axis */}
                <line
                    x1={margin.left}
                    y1={margin.top}
                    x2={margin.left}
                    y2={margin.top + plotHeight}
                    stroke="rgba(255,255,255,0.4)"
                    strokeWidth="1"
                />
                {[0, 25, 50, 75, 100].map(intensity => (
                    <g key={`y-${intensity}`}>
                        <line
                            x1={margin.left - 5}
                            y1={yScale(intensity)}
                            x2={margin.left}
                            y2={yScale(intensity)}
                            stroke="rgba(255,255,255,0.4)"
                        />
                        <text
                            x={margin.left - 10}
                            y={yScale(intensity) + 4}
                            fill="rgba(255,255,255,0.7)"
                            fontSize="10"
                            textAnchor="end"
                        >
                            {intensity}%
                        </text>
                    </g>
                ))}
                <text
                    x={20}
                    y={margin.top + plotHeight / 2}
                    fill="rgba(255,255,255,0.6)"
                    fontSize="11"
                    textAnchor="middle"
                    transform={`rotate(-90, 20, ${margin.top + plotHeight / 2})`}
                >
                    Relative Abundance (%)
                </text>

                {/* X-axis - LINEAR SCALE */}
                <line
                    x1={margin.left}
                    y1={margin.top + plotHeight}
                    x2={margin.left + plotWidth}
                    y2={margin.top + plotHeight}
                    stroke="rgba(255,255,255,0.4)"
                    strokeWidth="1"
                />
                {xTicks.map(tick => (
                    <g key={`x-${tick}`}>
                        <line
                            x1={xScale(tick)}
                            y1={margin.top + plotHeight}
                            x2={xScale(tick)}
                            y2={margin.top + plotHeight + 5}
                            stroke="rgba(255,255,255,0.4)"
                        />
                        <text
                            x={xScale(tick)}
                            y={margin.top + plotHeight + 18}
                            fill="rgba(255,255,255,0.7)"
                            fontSize="10"
                            textAnchor="middle"
                        >
                            {tick}
                        </text>
                    </g>
                ))}
                <text
                    x={margin.left + plotWidth / 2}
                    y={svgHeight - 5}
                    fill="rgba(255,255,255,0.6)"
                    fontSize="11"
                    textAnchor="middle"
                >
                    m/z (mass-to-charge ratio)
                </text>

                {/* Peaks - as THIN LINES (scientifically accurate) */}
                {allPeaks.map((peak, i) => {
                    const x = xScale(peak.mz);
                    const y1 = yScale(0);
                    const y2 = yScale(peak.intensity);
                    const isHovered = hoveredPeak === peak;
                    const color = peak.isM ? '#ef4444' : peak.isBase ? '#22c55e' : '#8b5cf6';

                    return (
                        <g key={i}>
                            {/* Peak line (thin vertical line = scientific standard) */}
                            <motion.line
                                x1={x}
                                y1={y1}
                                x2={x}
                                y2={y2}
                                stroke={color}
                                strokeWidth={isHovered ? 4 : 2}
                                opacity={isHovered ? 1 : 0.9}
                                initial={{ y2: y1 }}
                                animate={{ y2 }}
                                transition={{ delay: i * 0.03, duration: 0.3 }}
                                onMouseEnter={() => setHoveredPeak(peak)}
                                onMouseLeave={() => setHoveredPeak(null)}
                                style={{ cursor: 'pointer' }}
                            />
                            {/* Peak cap (small rectangle at top) */}
                            <motion.rect
                                x={x - 3}
                                y={y2 - 2}
                                width={6}
                                height={4}
                                fill={color}
                                initial={{ y: y1 }}
                                animate={{ y: y2 - 2 }}
                                transition={{ delay: i * 0.03, duration: 0.3 }}
                                onMouseEnter={() => setHoveredPeak(peak)}
                                onMouseLeave={() => setHoveredPeak(null)}
                                style={{ cursor: 'pointer' }}
                            />
                            {/* Label for important peaks */}
                            {(peak.isM || peak.isBase || peak.intensity > 40 || isHovered) && (
                                <text
                                    x={x}
                                    y={y2 - 10}
                                    fill={color}
                                    fontSize="9"
                                    textAnchor="middle"
                                    fontWeight={isHovered ? 'bold' : 'normal'}
                                >
                                    {peak.label || peak.mz}
                                </text>
                            )}
                            {/* m/z value below label for hovered peak */}
                            {isHovered && (
                                <text
                                    x={x}
                                    y={y2 - 22}
                                    fill="rgba(255,255,255,0.8)"
                                    fontSize="10"
                                    textAnchor="middle"
                                    fontWeight="bold"
                                >
                                    m/z {peak.mz}
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
                    background: 'rgba(0,0,0,0.6)',
                    borderRadius: 8,
                    fontSize: '0.85rem',
                    border: '1px solid rgba(139, 92, 246, 0.3)',
                }}>
                    <strong style={{ color: '#8b5cf6' }}>m/z = {hoveredPeak.mz}</strong>
                    <span style={{ color: 'rgba(255,255,255,0.7)', marginLeft: '1rem' }}>
                        Relative Intensity: {hoveredPeak.intensity}%
                    </span>
                    {hoveredPeak.label && (
                        <span style={{ color: '#fbbf24', marginLeft: '1rem' }}>{hoveredPeak.label}</span>
                    )}
                    {hoveredPeak.isM && <span style={{ color: '#ef4444', marginLeft: '0.5rem' }}>(Molecular Ion)</span>}
                    {hoveredPeak.isBase && <span style={{ color: '#22c55e', marginLeft: '0.5rem' }}>(Base Peak)</span>}
                </div>
            )}

            {/* Legend */}
            <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1rem', fontSize: '0.75rem', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <div style={{ width: 3, height: 16, background: '#ef4444', borderRadius: 1 }} />
                    <span style={{ color: 'rgba(255,255,255,0.7)' }}>Molecular Ion (M⁺)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <div style={{ width: 3, height: 16, background: '#22c55e', borderRadius: 1 }} />
                    <span style={{ color: 'rgba(255,255,255,0.7)' }}>Base Peak (100%)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <div style={{ width: 3, height: 16, background: '#8b5cf6', borderRadius: 1 }} />
                    <span style={{ color: 'rgba(255,255,255,0.7)' }}>Fragment Ions</span>
                </div>
            </div>

            {/* Scientific note */}
            <div style={{
                marginTop: '0.75rem',
                padding: '0.5rem',
                background: 'rgba(139, 92, 246, 0.1)',
                borderRadius: 6,
                fontSize: '0.7rem',
                color: 'rgba(255,255,255,0.5)',
                textAlign: 'center'
            }}>
                💡 X-axis uses linear scale (equal spacing for equal m/z differences) for scientific accuracy
            </div>
        </motion.div>
    );
}
