'use client';

import React, { useMemo, useState } from 'react';

interface SpectrumPeak {
    mz: number;
    abundance: number;
    label: string;
    fragment?: string;
    isBasePeak?: boolean;
    isMolecularIon?: boolean;
}

interface MSSpectrumExampleProps {
    title: string;
    data: SpectrumPeak[];
    molecularWeight: number;
    className?: string;
}

export default function MSSpectrumExample({
    title,
    data,
    molecularWeight,
    className = ''
}: MSSpectrumExampleProps) {
    const [hoveredPeak, setHoveredPeak] = useState<SpectrumPeak | null>(null);

    // Sort data by m/z for proper display (scientific requirement)
    const sortedData = useMemo(() => {
        return [...data].sort((a, b) => a.mz - b.mz);
    }, [data]);

    // Calculate LINEAR scale for x-axis (SCIENTIFIC ACCURACY)
    const minMz = 0; // Always start from 0
    const maxMz = Math.max(...sortedData.map(p => p.mz)) + 15;

    // SVG dimensions
    const svgWidth = 650;
    const svgHeight = 320;
    const margin = { top: 35, right: 30, bottom: 55, left: 65 };
    const plotWidth = svgWidth - margin.left - margin.right;
    const plotHeight = svgHeight - margin.top - margin.bottom;

    // Linear scale function for x-axis (m/z)
    const xScale = (mz: number) => {
        return margin.left + ((mz - minMz) / (maxMz - minMz)) * plotWidth;
    };

    // Linear scale function for y-axis (abundance)
    const yScale = (abundance: number) => {
        return margin.top + plotHeight - (abundance / 100) * plotHeight;
    };

    // Generate x-axis ticks at regular intervals
    const tickInterval = maxMz > 80 ? 20 : 10;
    const xTicks = [];
    for (let i = 0; i <= maxMz; i += tickInterval) {
        xTicks.push(i);
    }

    // Get peak color based on type
    const getColor = (peak: SpectrumPeak) => {
        if (peak.isBasePeak) return '#dc2626'; // red for base peak
        if (peak.isMolecularIon) return '#7c3aed'; // purple for M+
        return '#3b82f6'; // blue for fragments
    };

    return (
        <div className={`border-2 border-blue-300 rounded-lg p-6 bg-gradient-to-br from-blue-50 to-indigo-50 ${className}`}>
            <h4 className="text-lg font-bold text-center mb-2 text-blue-900">{title}</h4>
            <p className="text-center text-xs text-gray-600 mb-4">MW = {molecularWeight} • Linear m/z scale</p>

            {/* SVG Spectrum - SCIENTIFICALLY ACCURATE */}
            <div className="bg-white rounded-lg p-4 border border-blue-200 mb-4">
                <svg
                    width="100%"
                    height={svgHeight}
                    viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                    preserveAspectRatio="xMidYMid meet"
                    style={{ overflow: 'visible', maxWidth: '100%' }}
                >
                    {/* Background */}
                    <rect
                        x={margin.left}
                        y={margin.top}
                        width={plotWidth}
                        height={plotHeight}
                        fill="#fafafa"
                        stroke="#e5e7eb"
                        strokeWidth="1"
                    />

                    {/* Grid lines */}
                    {xTicks.map(tick => (
                        <line
                            key={`grid-x-${tick}`}
                            x1={xScale(tick)}
                            y1={margin.top}
                            x2={xScale(tick)}
                            y2={margin.top + plotHeight}
                            stroke="#f0f0f0"
                            strokeWidth="1"
                        />
                    ))}
                    {[0, 25, 50, 75, 100].map(abundance => (
                        <line
                            key={`grid-y-${abundance}`}
                            x1={margin.left}
                            y1={yScale(abundance)}
                            x2={margin.left + plotWidth}
                            y2={yScale(abundance)}
                            stroke="#f0f0f0"
                            strokeWidth="1"
                        />
                    ))}

                    {/* Y-axis */}
                    <line
                        x1={margin.left}
                        y1={margin.top}
                        x2={margin.left}
                        y2={margin.top + plotHeight}
                        stroke="#374151"
                        strokeWidth="1.5"
                    />
                    {[0, 25, 50, 75, 100].map(abundance => (
                        <g key={`y-tick-${abundance}`}>
                            <line
                                x1={margin.left - 5}
                                y1={yScale(abundance)}
                                x2={margin.left}
                                y2={yScale(abundance)}
                                stroke="#374151"
                            />
                            <text
                                x={margin.left - 10}
                                y={yScale(abundance) + 4}
                                fill="#374151"
                                fontSize="11"
                                textAnchor="end"
                                fontWeight="500"
                            >
                                {abundance}
                            </text>
                        </g>
                    ))}
                    <text
                        x={20}
                        y={margin.top + plotHeight / 2}
                        fill="#374151"
                        fontSize="12"
                        textAnchor="middle"
                        fontWeight="600"
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
                        stroke="#374151"
                        strokeWidth="1.5"
                    />
                    {xTicks.map(tick => (
                        <g key={`x-tick-${tick}`}>
                            <line
                                x1={xScale(tick)}
                                y1={margin.top + plotHeight}
                                x2={xScale(tick)}
                                y2={margin.top + plotHeight + 6}
                                stroke="#374151"
                            />
                            <text
                                x={xScale(tick)}
                                y={margin.top + plotHeight + 20}
                                fill="#374151"
                                fontSize="11"
                                textAnchor="middle"
                                fontWeight="500"
                            >
                                {tick}
                            </text>
                        </g>
                    ))}
                    <text
                        x={margin.left + plotWidth / 2}
                        y={svgHeight - 8}
                        fill="#374151"
                        fontSize="12"
                        textAnchor="middle"
                        fontWeight="600"
                    >
                        m/z (mass-to-charge ratio)
                    </text>

                    {/* Peaks - as THIN LINES (scientifically accurate mass spectrum) */}
                    {sortedData.map((peak, i) => {
                        const x = xScale(peak.mz);
                        const y1 = yScale(0);
                        const y2 = yScale(peak.abundance);
                        const isHovered = hoveredPeak === peak;
                        const color = getColor(peak);

                        return (
                            <g key={i}>
                                {/* Peak line */}
                                <line
                                    x1={x}
                                    y1={y1}
                                    x2={x}
                                    y2={y2}
                                    stroke={color}
                                    strokeWidth={isHovered ? 5 : 3}
                                    opacity={isHovered ? 1 : 0.85}
                                    onMouseEnter={() => setHoveredPeak(peak)}
                                    onMouseLeave={() => setHoveredPeak(null)}
                                    style={{ cursor: 'pointer', transition: 'stroke-width 0.15s' }}
                                />
                                {/* Peak cap */}
                                <rect
                                    x={x - 4}
                                    y={y2 - 3}
                                    width={8}
                                    height={6}
                                    fill={color}
                                    rx={1}
                                    onMouseEnter={() => setHoveredPeak(peak)}
                                    onMouseLeave={() => setHoveredPeak(null)}
                                    style={{ cursor: 'pointer' }}
                                />
                                {/* m/z label above peak */}
                                <text
                                    x={x}
                                    y={y2 - 12}
                                    fill={color}
                                    fontSize="10"
                                    textAnchor="middle"
                                    fontWeight={isHovered ? 'bold' : '600'}
                                >
                                    {peak.mz}
                                </text>
                            </g>
                        );
                    })}
                </svg>
            </div>

            {/* Hovered Peak Info */}
            {hoveredPeak && (
                <div className="bg-indigo-100 border-2 border-indigo-400 rounded-lg p-3 mb-4 transition-all">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                        <div>
                            <p className="text-sm font-bold text-indigo-900">
                                m/z = {hoveredPeak.mz} • {hoveredPeak.label}
                            </p>
                            {hoveredPeak.fragment && (
                                <p className="text-xs text-gray-700 mt-1">{hoveredPeak.fragment}</p>
                            )}
                        </div>
                        <div className="text-right">
                            <p className="text-lg font-bold text-indigo-700">{hoveredPeak.abundance}%</p>
                            {hoveredPeak.isBasePeak && (
                                <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded font-semibold">BASE PEAK</span>
                            )}
                            {hoveredPeak.isMolecularIon && (
                                <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded font-semibold">M⁺</span>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Legend */}
            <div className="flex justify-center gap-6 text-xs flex-wrap mb-3">
                <div className="flex items-center gap-2">
                    <div className="w-1 h-4 bg-purple-600 rounded"></div>
                    <span className="text-gray-700">Molecular Ion (M⁺)</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-1 h-4 bg-red-600 rounded"></div>
                    <span className="text-gray-700">Base Peak (100%)</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-1 h-4 bg-blue-600 rounded"></div>
                    <span className="text-gray-700">Fragment Ions</span>
                </div>
            </div>

            {/* Peak Summary Table */}
            <div className="bg-white rounded-lg p-3 border border-gray-200">
                <h5 className="font-semibold text-gray-900 mb-2 text-sm">📋 Peak Summary</h5>
                <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                        <thead>
                            <tr className="border-b-2 border-gray-300">
                                <th className="text-left p-2 font-semibold text-gray-700">m/z</th>
                                <th className="text-left p-2 font-semibold text-gray-700">Fragment</th>
                                <th className="text-right p-2 font-semibold text-gray-700">Abundance</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedData.map((peak, idx) => (
                                <tr
                                    key={idx}
                                    className={`border-b border-gray-100 hover:bg-blue-50 cursor-pointer transition-colors ${hoveredPeak === peak ? 'bg-blue-100' : ''
                                        }`}
                                    onMouseEnter={() => setHoveredPeak(peak)}
                                    onMouseLeave={() => setHoveredPeak(null)}
                                >
                                    <td className="p-2 font-bold text-gray-900">{peak.mz}</td>
                                    <td className="p-2 text-gray-700">{peak.label}</td>
                                    <td className="p-2 text-right">
                                        <span className={`font-bold ${peak.isBasePeak ? 'text-red-700' :
                                                peak.isMolecularIon ? 'text-purple-700' :
                                                    'text-blue-700'
                                            }`}>
                                            {peak.abundance}%
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Scientific note */}
            <p className="text-center text-xs text-gray-500 mt-3 italic">
                ✨ Linear X-axis scale ensures scientifically accurate peak positions
            </p>
        </div>
    );
}
