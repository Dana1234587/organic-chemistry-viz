'use client';

import React from 'react';

interface SkeletalFormulaProps {
    molecule: 'methane' | 'ethane' | 'propane' | 'butane' | 'pentane' | 'hexane' | 'cyclohexane' | 'benzene';
    showLabels?: boolean;
    showHydrogens?: boolean;
    highlightCarbons?: boolean;
    size?: 'small' | 'medium' | 'large';
}

const COLORS = {
    carbon: '#000000',
    hydrogen: '#888888',
    bond: '#000000',
    highlight: '#8B5CF6',
    label: '#333333',
};

const SkeletalFormula: React.FC<SkeletalFormulaProps> = ({
    molecule,
    showLabels = true,
    showHydrogens = false,
    highlightCarbons = false,
    size = 'medium',
}) => {
    const sizeMultiplier = size === 'small' ? 0.7 : size === 'large' ? 1.3 : 1;

    // Zig-zag pattern coordinates (going right-up-right-down pattern)
    const getChainPoints = (carbonCount: number): { x: number, y: number }[] => {
        const points: { x: number, y: number }[] = [];
        const segmentLength = 30;
        let x = 20;
        let y = 50;

        for (let i = 0; i < carbonCount; i++) {
            points.push({ x, y });
            if (i < carbonCount - 1) {
                x += segmentLength * 0.866; // cos(30°)
                y += (i % 2 === 0 ? -1 : 1) * segmentLength * 0.5; // sin(30°)
            }
        }
        return points;
    };

    const renderChain = (carbonCount: number, label: string) => {
        const points = getChainPoints(carbonCount);
        const width = (carbonCount * 30 + 40) * sizeMultiplier;
        const height = 100 * sizeMultiplier;

        return (
            <div style={{
                display: 'inline-flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '1rem',
                background: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '12px',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
            }}>
                <svg width={width} height={height} viewBox={`0 0 ${width / sizeMultiplier} ${height / sizeMultiplier}`}>
                    <g transform={`scale(${sizeMultiplier})`}>
                        {/* Draw bonds */}
                        {points.map((point, i) => {
                            if (i < points.length - 1) {
                                const next = points[i + 1];
                                return (
                                    <line
                                        key={`bond-${i}`}
                                        x1={point.x}
                                        y1={point.y}
                                        x2={next.x}
                                        y2={next.y}
                                        stroke={COLORS.bond}
                                        strokeWidth="2"
                                    />
                                );
                            }
                            return null;
                        })}

                        {/* Highlight carbon positions if enabled */}
                        {highlightCarbons && points.map((point, i) => (
                            <circle
                                key={`carbon-${i}`}
                                cx={point.x}
                                cy={point.y}
                                r="4"
                                fill={COLORS.highlight}
                            />
                        ))}

                        {/* Show C labels if hydrogens are shown */}
                        {showHydrogens && points.map((point, i) => (
                            <g key={`h-group-${i}`}>
                                <text
                                    x={point.x - 5}
                                    y={point.y + 4}
                                    fontSize="12"
                                    fill={COLORS.carbon}
                                    fontFamily="Arial"
                                >
                                    C
                                </text>
                                {/* Terminal CH3 or middle CH2 */}
                                <text
                                    x={point.x + 5}
                                    y={point.y + 4}
                                    fontSize="10"
                                    fill={COLORS.hydrogen}
                                    fontFamily="Arial"
                                >
                                    H{i === 0 || i === points.length - 1 ? '₃' : '₂'}
                                </text>
                            </g>
                        ))}
                    </g>
                </svg>
                {showLabels && (
                    <div style={{
                        marginTop: '0.5rem',
                        fontSize: '0.95rem',
                        fontWeight: 500,
                        color: COLORS.label,
                        fontFamily: 'Arial, sans-serif',
                    }}>
                        {label}
                    </div>
                )}
            </div>
        );
    };

    const renderCyclohexane = () => {
        const width = 120 * sizeMultiplier;
        const height = 120 * sizeMultiplier;
        const cx = 60, cy = 60, r = 35;

        // Hexagon points
        const hexPoints = [];
        for (let i = 0; i < 6; i++) {
            const angle = (i * 60 - 90) * Math.PI / 180;
            hexPoints.push({
                x: cx + r * Math.cos(angle),
                y: cy + r * Math.sin(angle)
            });
        }
        const pointsString = hexPoints.map(p => `${p.x},${p.y}`).join(' ');

        return (
            <div style={{
                display: 'inline-flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '1rem',
                background: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '12px',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
            }}>
                <svg width={width} height={height} viewBox={`0 0 ${width / sizeMultiplier} ${height / sizeMultiplier}`}>
                    <g transform={`scale(${sizeMultiplier})`}>
                        <polygon
                            points={pointsString}
                            fill="none"
                            stroke={COLORS.bond}
                            strokeWidth="2"
                        />
                        {highlightCarbons && hexPoints.map((point, i) => (
                            <circle
                                key={`c-${i}`}
                                cx={point.x}
                                cy={point.y}
                                r="4"
                                fill={COLORS.highlight}
                            />
                        ))}
                    </g>
                </svg>
                {showLabels && (
                    <div style={{
                        marginTop: '0.5rem',
                        fontSize: '0.95rem',
                        fontWeight: 500,
                        color: COLORS.label,
                    }}>
                        cyclohexane
                    </div>
                )}
            </div>
        );
    };

    const renderBenzene = () => {
        const width = 120 * sizeMultiplier;
        const height = 120 * sizeMultiplier;
        const cx = 60, cy = 60, r = 35, innerR = 20;

        // Hexagon points
        const hexPoints = [];
        for (let i = 0; i < 6; i++) {
            const angle = (i * 60 - 90) * Math.PI / 180;
            hexPoints.push({
                x: cx + r * Math.cos(angle),
                y: cy + r * Math.sin(angle)
            });
        }
        const pointsString = hexPoints.map(p => `${p.x},${p.y}`).join(' ');

        return (
            <div style={{
                display: 'inline-flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '1rem',
                background: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '12px',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
            }}>
                <svg width={width} height={height} viewBox={`0 0 ${width / sizeMultiplier} ${height / sizeMultiplier}`}>
                    <g transform={`scale(${sizeMultiplier})`}>
                        <polygon
                            points={pointsString}
                            fill="none"
                            stroke={COLORS.bond}
                            strokeWidth="2"
                        />
                        {/* Inner circle for aromaticity */}
                        <circle
                            cx={cx}
                            cy={cy}
                            r={innerR}
                            fill="none"
                            stroke={COLORS.bond}
                            strokeWidth="1.5"
                            strokeDasharray="0"
                        />
                    </g>
                </svg>
                {showLabels && (
                    <div style={{
                        marginTop: '0.5rem',
                        fontSize: '0.95rem',
                        fontWeight: 500,
                        color: COLORS.label,
                    }}>
                        benzene
                    </div>
                )}
            </div>
        );
    };

    switch (molecule) {
        case 'methane':
            return renderChain(1, 'methane (CH₄)');
        case 'ethane':
            return renderChain(2, 'ethane');
        case 'propane':
            return renderChain(3, 'propane');
        case 'butane':
            return renderChain(4, 'butane');
        case 'pentane':
            return renderChain(5, 'pentane');
        case 'hexane':
            return renderChain(6, 'hexane');
        case 'cyclohexane':
            return renderCyclohexane();
        case 'benzene':
            return renderBenzene();
        default:
            return renderChain(4, 'butane');
    }
};

export default SkeletalFormula;
