'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';

interface IRPeak {
    wavenumber: number;
    intensity?: 'strong' | 'medium' | 'weak' | 'broad';
    label?: string;
    bondType?: string;
}

interface IRSpectrumProps {
    peaks: IRPeak[];
    moleculeName: string;
    formula?: string;
    showRegions?: boolean;
}

// IR spectroscopy regions
const IR_REGIONS = [
    { min: 3200, max: 3600, label: 'O-H / N-H', color: '#ef4444', description: 'Alcohols, amines, carboxylic acids' },
    { min: 2800, max: 3200, label: 'C-H', color: '#22c55e', description: 'Alkanes, aldehydes' },
    { min: 2100, max: 2300, label: 'C≡C / C≡N', color: '#3b82f6', description: 'Triple bonds - sharp' },
    { min: 1600, max: 1800, label: 'C=O / C=C', color: '#f59e0b', description: 'Carbonyl - very strong' },
    { min: 500, max: 1500, label: 'Fingerprint', color: '#6b7280', description: 'Complex - unique to molecule' },
];

export default function IRSpectrumViewer({
    peaks,
    moleculeName,
    formula,
    showRegions = true
}: IRSpectrumProps) {
    const [hoveredPeak, setHoveredPeak] = useState<IRPeak | null>(null);
    const [hoveredRegion, setHoveredRegion] = useState<typeof IR_REGIONS[0] | null>(null);

    const minWavenumber = 500;
    const maxWavenumber = 4000;

    // Get intensity as height percentage
    const getIntensityHeight = (intensity?: string): number => {
        switch (intensity) {
            case 'strong': return 85;
            case 'medium': return 60;
            case 'weak': return 35;
            case 'broad': return 70;
            default: return 70;
        }
    };

    // Get peak width for broad peaks
    const getPeakWidth = (intensity?: string): number => {
        return intensity === 'broad' ? 40 : 8;
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
            }}
        >
            {/* Header */}
            <div style={{ marginBottom: '1rem' }}>
                <h4 style={{ margin: 0, color: 'white', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    📡 IR Spectrum: {moleculeName}
                </h4>
                {formula && (
                    <div style={{ color: '#fbbf24', fontFamily: 'monospace', fontSize: '0.9rem', marginTop: '0.25rem' }}>
                        {formula}
                    </div>
                )}
            </div>

            {/* Regions legend */}
            {showRegions && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
                    {IR_REGIONS.map((region, i) => (
                        <div
                            key={i}
                            onMouseEnter={() => setHoveredRegion(region)}
                            onMouseLeave={() => setHoveredRegion(null)}
                            style={{
                                padding: '4px 10px',
                                background: hoveredRegion === region ? `${region.color}30` : 'rgba(255,255,255,0.05)',
                                border: `1px solid ${region.color}40`,
                                borderRadius: 6,
                                fontSize: '0.7rem',
                                color: region.color,
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                            }}
                        >
                            {region.label}: {region.min}-{region.max}
                        </div>
                    ))}
                </div>
            )}

            {/* Spectrum SVG */}
            <svg width="100%" height="220" viewBox="0 0 500 220" style={{ overflow: 'visible' }}>
                {/* Background */}
                <rect x="50" y="10" width="430" height="160" fill="rgba(255,255,255,0.02)" rx="4" />

                {/* Region backgrounds */}
                {showRegions && IR_REGIONS.map((region, i) => {
                    // X is reversed: high wavenumber on left
                    const x1 = 50 + ((maxWavenumber - region.max) / (maxWavenumber - minWavenumber)) * 430;
                    const x2 = 50 + ((maxWavenumber - region.min) / (maxWavenumber - minWavenumber)) * 430;
                    return (
                        <rect
                            key={i}
                            x={x1}
                            y={10}
                            width={x2 - x1}
                            height={160}
                            fill={hoveredRegion === region ? `${region.color}20` : `${region.color}08`}
                        />
                    );
                })}

                {/* Y-axis label (Transmittance) */}
                <text x="15" y="100" fill="rgba(255,255,255,0.5)" fontSize="9" textAnchor="middle" transform="rotate(-90, 15, 100)">
                    % Transmittance
                </text>
                <text x="35" y="20" fill="rgba(255,255,255,0.6)" fontSize="8">100%</text>
                <text x="35" y="170" fill="rgba(255,255,255,0.6)" fontSize="8">0%</text>

                {/* Baseline (100% transmittance) */}
                <line x1="50" y1="20" x2="480" y2="20" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="4" />

                {/* X-axis */}
                <line x1="50" y1="170" x2="480" y2="170" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />

                {/* X-axis ticks (high to low wavenumber) */}
                {[4000, 3000, 2000, 1500, 1000, 500].map((wn, i) => {
                    const x = 50 + ((maxWavenumber - wn) / (maxWavenumber - minWavenumber)) * 430;
                    return (
                        <g key={wn}>
                            <line x1={x} y1="170" x2={x} y2="175" stroke="rgba(255,255,255,0.3)" />
                            <text x={x} y="188" fill="rgba(255,255,255,0.7)" fontSize="9" textAnchor="middle">{wn}</text>
                        </g>
                    );
                })}
                <text x="265" y="205" fill="rgba(255,255,255,0.5)" fontSize="10" textAnchor="middle">Wavenumber (cm⁻¹)</text>

                {/* Fingerprint region label */}
                <text x="400" y="155" fill="#6b7280" fontSize="7" textAnchor="middle" opacity="0.6">
                    ← Fingerprint Region
                </text>

                {/* Peaks (as absorption troughs) */}
                {peaks.map((peak, i) => {
                    const x = 50 + ((maxWavenumber - peak.wavenumber) / (maxWavenumber - minWavenumber)) * 430;
                    const height = getIntensityHeight(peak.intensity);
                    const width = getPeakWidth(peak.intensity);
                    const isHovered = hoveredPeak === peak;

                    // Find region color
                    const region = IR_REGIONS.find(r => peak.wavenumber >= r.min && peak.wavenumber <= r.max);
                    const color = region?.color || '#8b5cf6';

                    return (
                        <g key={i}>
                            {/* Peak trough (inverted - going down from baseline) */}
                            <motion.path
                                d={`M ${x - width / 2} 20 
                                    Q ${x - width / 4} ${20 + height * 0.7} ${x} ${20 + height}
                                    Q ${x + width / 4} ${20 + height * 0.7} ${x + width / 2} 20`}
                                fill={peak.intensity === 'broad' ? `${color}40` : 'none'}
                                stroke={color}
                                strokeWidth={isHovered ? 2.5 : 1.5}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: i * 0.05, duration: 0.3 }}
                                onMouseEnter={() => setHoveredPeak(peak)}
                                onMouseLeave={() => setHoveredPeak(null)}
                                style={{ cursor: 'pointer' }}
                            />
                            {/* Label */}
                            {isHovered && (
                                <text
                                    x={x}
                                    y={30 + height}
                                    fill={color}
                                    fontSize="8"
                                    textAnchor="middle"
                                    fontWeight="bold"
                                >
                                    {peak.wavenumber}
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
                    <strong style={{ color: '#8b5cf6' }}>{hoveredPeak.wavenumber} cm⁻¹</strong>
                    {hoveredPeak.bondType && (
                        <span style={{ color: '#fbbf24', marginLeft: '0.75rem' }}>{hoveredPeak.bondType}</span>
                    )}
                    {hoveredPeak.intensity && (
                        <span style={{ color: 'rgba(255,255,255,0.5)', marginLeft: '0.75rem' }}>
                            ({hoveredPeak.intensity})
                        </span>
                    )}
                </div>
            )}

            {/* Region description */}
            {hoveredRegion && (
                <div style={{
                    marginTop: '0.5rem',
                    padding: '0.5rem 0.75rem',
                    background: `${hoveredRegion.color}15`,
                    border: `1px solid ${hoveredRegion.color}30`,
                    borderRadius: 8,
                    fontSize: '0.8rem',
                    color: hoveredRegion.color,
                }}>
                    <strong>{hoveredRegion.label}</strong>: {hoveredRegion.description}
                </div>
            )}
        </motion.div>
    );
}
