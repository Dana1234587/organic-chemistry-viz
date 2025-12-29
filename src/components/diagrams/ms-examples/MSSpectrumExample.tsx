'use client';

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

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
    const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

    // Sort data by m/z for proper display
    const sortedData = React.useMemo(() => {
        return [...data].sort((a, b) => a.mz - b.mz);
    }, [data]);

    // Custom tooltip
    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <div className="bg-white border-2 border-indigo-400 rounded-lg p-3 shadow-lg">
                    <p className="text-sm font-bold text-indigo-900">
                        m/z = {data.mz} • {data.label}
                    </p>
                    {data.fragment && (
                        <p className="text-xs text-gray-700 mt-1">{data.fragment}</p>
                    )}
                    <p className="text-xs text-gray-600 mt-1">
                        Abundance: {data.abundance}%
                        {data.isBasePeak && ' (BASE PEAK)'}
                        {data.isMolecularIon && ' (Molecular Ion)'}
                    </p>
                </div>
            );
        }
        return null;
    };

    // Get bar color based on peak type
    const getBarColor = (peak: SpectrumPeak) => {
        if (peak.isBasePeak) return '#dc2626'; // red for base peak
        if (peak.isMolecularIon) return '#7c3aed'; // purple for M+
        return '#3b82f6'; // blue for regular fragments
    };

    return (
        <div className={`border-2 border-blue-300 rounded-lg p-6 bg-gradient-to-br from-blue-50 to-indigo-50 ${className}`}>
            <h4 className="text-lg font-bold text-center mb-4 text-blue-900">{title}</h4>

            {/* Recharts Bar Chart */}
            <div className="bg-white rounded-lg p-4 border-2 border-blue-200 mb-4">
                <ResponsiveContainer width="100%" height={350}>
                    <BarChart
                        data={sortedData}
                        barSize={30}
                        margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
                        onMouseMove={(state) => {
                            if (state.isTooltipActive) {
                                setActiveIndex(state.activeTooltipIndex ?? null);
                            } else {
                                setActiveIndex(null);
                            }
                        }}
                        onMouseLeave={() => setActiveIndex(null)}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis
                            dataKey="mz"
                            label={{ value: 'm/z (mass-to-charge ratio)', position: 'insideBottom', offset: -10, style: { fontSize: 14, fontWeight: 600, fill: '#374151' } }}
                            tick={{ fontSize: 12, fill: '#6b7280' }}
                            angle={0}
                        />
                        <YAxis
                            label={{ value: 'Relative Abundance (%)', angle: -90, position: 'insideLeft', style: { fontSize: 14, fontWeight: 600, fill: '#374151' } }}
                            tick={{ fontSize: 12, fill: '#6b7280' }}
                            domain={[0, 100]}
                        />
                        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(99, 102, 241, 0.1)' }} />
                        <Bar
                            dataKey="abundance"
                            radius={[4, 4, 0, 0]}
                            animationDuration={800}
                        >
                            {sortedData.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={getBarColor(entry)}
                                    stroke={activeIndex === index ? '#000' : getBarColor(entry)}
                                    strokeWidth={activeIndex === index ? 2 : 0}
                                    opacity={activeIndex === null || activeIndex === index ? 1 : 0.6}
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>

                {/* Custom labels above bars */}
                <div className="text-center mt-2">
                    <p className="text-xs text-gray-600 italic">Hover over bars to see detailed fragment information</p>
                </div>
            </div>

            {/* Active Peak Info Display */}
            {activeIndex !== null && sortedData[activeIndex] && (
                <div className="bg-indigo-50 border-2 border-indigo-300 rounded-lg p-3 mb-4 transition-all">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-bold text-indigo-900">
                                m/z = {sortedData[activeIndex].mz} • {sortedData[activeIndex].label}
                            </p>
                            {sortedData[activeIndex].fragment && (
                                <p className="text-xs text-gray-700 mt-1">{sortedData[activeIndex].fragment}</p>
                            )}
                        </div>
                        <div className="text-right">
                            <p className="text-lg font-bold text-indigo-700">{sortedData[activeIndex].abundance}%</p>
                            {sortedData[activeIndex].isBasePeak && (
                                <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded font-semibold">BASE PEAK</span>
                            )}
                            {sortedData[activeIndex].isMolecularIon && (
                                <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded font-semibold">M⁺</span>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Legend */}
            <div className="flex justify-center gap-6 text-xs flex-wrap">
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-purple-600 rounded"></div>
                    <span className="text-gray-700">Molecular Ion (M⁺)</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-600 rounded"></div>
                    <span className="text-gray-700">Base Peak (100%)</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-600 rounded"></div>
                    <span className="text-gray-700">Fragment Ions</span>
                </div>
            </div>

            {/* Peak summary table */}
            <div className="mt-4 bg-white rounded-lg p-4 border border-gray-200">
                <h5 className="font-semibold text-gray-900 mb-2 text-sm">Peak Summary</h5>
                <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                        <thead>
                            <tr className="border-b border-gray-300">
                                <th className="text-left p-2">m/z</th>
                                <th className="text-left p-2">Fragment</th>
                                <th className="text-right p-2">Abundance</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedData.map((peak, idx) => (
                                <tr
                                    key={idx}
                                    className={`border-b border-gray-100 hover:bg-blue-50 cursor-pointer ${activeIndex === idx ? 'bg-blue-100' : ''
                                        }`}
                                    onMouseEnter={() => setActiveIndex(idx)}
                                    onMouseLeave={() => setActiveIndex(null)}
                                >
                                    <td className="p-2 font-semibold text-gray-900">{peak.mz}</td>
                                    <td className="p-2 text-gray-700">{peak.label}</td>
                                    <td className="p-2 text-right">
                                        <span className={`font-semibold ${peak.isBasePeak ? 'text-red-700' :
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
        </div>
    );
}
