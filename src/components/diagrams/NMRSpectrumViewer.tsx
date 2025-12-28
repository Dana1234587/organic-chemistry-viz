'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';

interface NMRPeak {
    ppm: number;
    intensity?: number;
    label?: string;
    carbon?: string;  // Carbon type description
}

interface NMRSpectrumProps {
    peaks: NMRPeak[];
    moleculeName: string;
    formula?: string;
    type?: '13C' | '1H';
    showRegions?: boolean;
}

// Chemical shift regions
const REGIONS_13C = [
    { min: 0, max: 50, label: 'Saturated (sp³)', color: '#22c55e' },
    { min: 50, max: 100, label: 'C-O, C-N', color: '#3b82f6' },
    { min: 100, max: 150, label: 'Unsaturated (sp²)', color: '#f59e0b' },
    { min: 150, max: 220, label: 'Carbonyl (C=O)', color: '#ef4444' },
];

const REGIONS_1H = [
    { min: 0, max: 2, label: 'Alkyl (CH₃, CH₂)', color: '#22c55e' },
    { min: 2, max: 4.5, label: 'Next to C=O or C=C', color: '#3b82f6' },
    { min: 4.5, max: 6.5, label: 'Vinyl/Alkene', color: '#f59e0b' },
    { min: 6.5, max: 8.5, label: 'Aromatic', color: '#a855f7' },
    { min: 8.5, max: 12, label: 'Aldehyde/Acid', color: '#ef4444' },
];

export default function NMRSpectrumViewer({
    peaks,
    moleculeName,
    formula,
    type = '13C',
    showRegions = true
}: NMRSpectrumProps) {
    const [hoveredPeak, setHoveredPeak] = useState<NMRPeak | null>(null);
    const [spectrumType, setSpectrumType] = useState<'13C' | '1H'>(type);

    const regions = spectrumType === '13C' ? REGIONS_13C : REGIONS_1H;
    const maxPpm = spectrumType === '13C' ? 220 : 12;

    // Find max ppm from peaks for scale
    const actualMaxPpm = Math.max(...peaks.map(p => p.ppm), maxPpm);

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
                        🧲 {spectrumType === '13C' ? '¹³C' : '¹H'} NMR: {moleculeName}
                    </h4>
                    {formula && (
                        <div style={{ color: '#fbbf24', fontFamily: 'monospace', fontSize: '0.9rem', marginTop: '0.25rem' }}>
                            {formula}
                        </div>
                    )}
                </div>

                {/* Type Toggle */}
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                        onClick={() => setSpectrumType('13C')}
                        style={{
                            padding: '6px 14px',
                            background: spectrumType === '13C'
                                ? 'linear-gradient(135deg, #8b5cf6, #6366f1)'
                                : 'rgba(255,255,255,0.1)',
                            border: 'none',
                            borderRadius: 8,
                            color: 'white',
                            fontSize: '0.8rem',
                            cursor: 'pointer',
                            fontWeight: spectrumType === '13C' ? 600 : 400,
                        }}
                    >
                        ¹³C NMR
                    </button>
                    <button
                        onClick={() => setSpectrumType('1H')}
                        style={{
                            padding: '6px 14px',
                            background: spectrumType === '1H'
                                ? 'linear-gradient(135deg, #10b981, #059669)'
                                : 'rgba(255,255,255,0.1)',
                            border: 'none',
                            borderRadius: 8,
                            color: 'white',
                            fontSize: '0.8rem',
                            cursor: 'pointer',
                            fontWeight: spectrumType === '1H' ? 600 : 400,
                        }}
                    >
                        ¹H NMR
                    </button>
                </div>
            </div>

            {/* Regions bar */}
            {showRegions && (
                <div style={{ marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', height: 24, borderRadius: 6, overflow: 'hidden' }}>
                        {regions.map((region, i) => (
                            <div
                                key={i}
                                style={{
                                    flex: (region.max - region.min) / maxPpm,
                                    background: `${region.color}30`,
                                    borderRight: i < regions.length - 1 ? '1px solid rgba(255,255,255,0.1)' : 'none',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '0.65rem',
                                    color: region.color,
                                    fontWeight: 500,
                                }}
                            >
                                {region.label}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Spectrum SVG */}
            <svg width="100%" height="200" viewBox="0 0 500 200" style={{ overflow: 'visible' }}>
                {/* Background */}
                <rect x="30" y="10" width="450" height="150" fill="rgba(255,255,255,0.02)" rx="4" />

                {/* Region backgrounds */}
                {showRegions && regions.map((region, i) => {
                    const x1 = 30 + ((maxPpm - region.max) / maxPpm) * 450;
                    const x2 = 30 + ((maxPpm - region.min) / maxPpm) * 450;
                    return (
                        <rect
                            key={i}
                            x={x1}
                            y={10}
                            width={x2 - x1}
                            height={150}
                            fill={`${region.color}08`}
                        />
                    );
                })}

                {/* X-axis (reversed: high ppm on left) */}
                <line x1="30" y1="160" x2="480" y2="160" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />

                {/* X-axis ticks */}
                {Array.from({ length: 5 }, (_, i) => {
                    const ppm = Math.round(maxPpm - (i * maxPpm / 4));
                    const x = 30 + (i * 450 / 4);
                    return (
                        <g key={i}>
                            <line x1={x} y1="160" x2={x} y2="165" stroke="rgba(255,255,255,0.3)" />
                            <text x={x} y="178" fill="rgba(255,255,255,0.7)" fontSize="10" textAnchor="middle">{ppm}</text>
                        </g>
                    );
                })}
                <text x="255" y="195" fill="rgba(255,255,255,0.5)" fontSize="10" textAnchor="middle">δ (ppm)</text>

                {/* TMS reference */}
                <text x="475" y="178" fill="#22c55e" fontSize="8" textAnchor="end">TMS (0)</text>

                {/* Peaks */}
                {peaks.map((peak, i) => {
                    const x = 30 + ((maxPpm - peak.ppm) / maxPpm) * 450;
                    const height = (peak.intensity || 80);
                    const isHovered = hoveredPeak === peak;

                    // Find region color
                    const region = regions.find(r => peak.ppm >= r.min && peak.ppm < r.max);
                    const color = region?.color || '#8b5cf6';

                    return (
                        <g key={i}>
                            {/* Peak line */}
                            <motion.line
                                x1={x}
                                y1={160}
                                x2={x}
                                y2={160 - height}
                                stroke={color}
                                strokeWidth={isHovered ? 3 : 2}
                                initial={{ y2: 160 }}
                                animate={{ y2: 160 - height }}
                                transition={{ delay: i * 0.1, duration: 0.3 }}
                                onMouseEnter={() => setHoveredPeak(peak)}
                                onMouseLeave={() => setHoveredPeak(null)}
                                style={{ cursor: 'pointer' }}
                            />
                            {/* Peak top */}
                            <motion.circle
                                cx={x}
                                cy={160 - height}
                                r={isHovered ? 5 : 3}
                                fill={color}
                                initial={{ cy: 160 }}
                                animate={{ cy: 160 - height }}
                                transition={{ delay: i * 0.1, duration: 0.3 }}
                            />
                            {/* Label */}
                            {(isHovered || peak.label) && (
                                <text
                                    x={x}
                                    y={160 - height - 10}
                                    fill={color}
                                    fontSize="9"
                                    textAnchor="middle"
                                    fontWeight="bold"
                                >
                                    {peak.label || `${peak.ppm} ppm`}
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
                    <strong style={{ color: '#8b5cf6' }}>δ = {hoveredPeak.ppm} ppm</strong>
                    {hoveredPeak.carbon && (
                        <span style={{ color: 'rgba(255,255,255,0.7)', marginLeft: '1rem' }}>
                            {hoveredPeak.carbon}
                        </span>
                    )}
                </div>
            )}

            {/* Signal count */}
            <div style={{
                marginTop: '0.75rem',
                fontSize: '0.8rem',
                color: 'rgba(255,255,255,0.6)',
                textAlign: 'center'
            }}>
                {peaks.length} signal{peaks.length !== 1 ? 's' : ''} observed
            </div>
        </motion.div>
    );
}
