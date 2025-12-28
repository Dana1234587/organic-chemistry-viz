'use client';

import React from 'react';

interface WedgeDashDiagramProps {
    molecule?: 'methane' | 'bromochlorofluoromethane' | 'alanine';
    showLabels?: boolean;
    showLegend?: boolean;
    size?: 'small' | 'medium' | 'large';
}

const COLORS = {
    carbon: '#000000',
    hydrogen: '#888888',
    chlorine: '#22C55E',
    bromine: '#8B4513',
    fluorine: '#FFD700',
    nitrogen: '#0000FF',
    oxygen: '#FF0000',
    wedge: '#000000',
    dash: '#666666',
};

const WedgeDashDiagram: React.FC<WedgeDashDiagramProps> = ({
    molecule = 'methane',
    showLabels = true,
    showLegend = true,
    size = 'medium',
}) => {
    const sizeMultiplier = size === 'small' ? 0.7 : size === 'large' ? 1.3 : 1;
    const width = 200 * sizeMultiplier;
    const height = 180 * sizeMultiplier;

    const renderMethane = () => {
        const cx = 100, cy = 90;
        return (
            <g transform={`scale(${sizeMultiplier})`}>
                {/* Central carbon */}
                <text x={cx - 5} y={cy + 5} fontSize="16" fontWeight="bold" fill={COLORS.carbon}>C</text>

                {/* Top H - solid line (in plane) */}
                <line x1={cx} y1={cy - 10} x2={cx} y2={cy - 40} stroke={COLORS.carbon} strokeWidth="2" />
                <text x={cx - 5} y={cy - 45} fontSize="14" fill={COLORS.hydrogen}>H</text>

                {/* Right H - wedge (coming out) */}
                <polygon
                    points={`${cx + 12},${cy} ${cx + 50},${cy - 15} ${cx + 50},${cy + 15}`}
                    fill={COLORS.wedge}
                />
                <text x={cx + 55} y={cy + 5} fontSize="14" fill={COLORS.hydrogen}>H</text>

                {/* Bottom left H - dash (going in) */}
                {[0, 5, 10, 15, 20, 25].map((offset, i) => (
                    <line
                        key={i}
                        x1={cx - 12 - offset * 0.8}
                        y1={cy + 8 + offset * 0.6}
                        x2={cx - 15 - offset * 0.8}
                        y2={cy + 12 + offset * 0.6}
                        stroke={COLORS.dash}
                        strokeWidth="2"
                    />
                ))}
                <text x={cx - 55} y={cy + 35} fontSize="14" fill={COLORS.hydrogen}>H</text>

                {/* Bottom right H - solid line (in plane) */}
                <line x1={cx + 5} y1={cy + 8} x2={cx + 30} y2={cy + 40} stroke={COLORS.carbon} strokeWidth="2" />
                <text x={cx + 32} y={cy + 52} fontSize="14" fill={COLORS.hydrogen}>H</text>
            </g>
        );
    };

    const renderCHClBrF = () => {
        const cx = 100, cy = 90;
        return (
            <g transform={`scale(${sizeMultiplier})`}>
                {/* Central carbon */}
                <text x={cx - 5} y={cy + 5} fontSize="16" fontWeight="bold" fill={COLORS.carbon}>C</text>

                {/* Top F - solid line */}
                <line x1={cx} y1={cy - 10} x2={cx} y2={cy - 40} stroke={COLORS.carbon} strokeWidth="2" />
                <text x={cx - 3} y={cy - 45} fontSize="14" fontWeight="bold" fill={COLORS.fluorine}>F</text>

                {/* Right Cl - wedge (coming out) */}
                <polygon
                    points={`${cx + 12},${cy} ${cx + 50},${cy - 15} ${cx + 50},${cy + 15}`}
                    fill={COLORS.wedge}
                />
                <text x={cx + 52} y={cy + 5} fontSize="14" fontWeight="bold" fill={COLORS.chlorine}>Cl</text>

                {/* Bottom left Br - dash (going in) */}
                {[0, 5, 10, 15, 20, 25].map((offset, i) => (
                    <line
                        key={i}
                        x1={cx - 12 - offset * 0.8}
                        y1={cy + 8 + offset * 0.6}
                        x2={cx - 15 - offset * 0.8}
                        y2={cy + 12 + offset * 0.6}
                        stroke={COLORS.dash}
                        strokeWidth="2"
                    />
                ))}
                <text x={cx - 55} y={cy + 35} fontSize="14" fontWeight="bold" fill={COLORS.bromine}>Br</text>

                {/* Bottom right H - solid line */}
                <line x1={cx + 5} y1={cy + 8} x2={cx + 30} y2={cy + 40} stroke={COLORS.carbon} strokeWidth="2" />
                <text x={cx + 32} y={cy + 52} fontSize="14" fill={COLORS.hydrogen}>H</text>
            </g>
        );
    };

    const renderLegend = () => (
        <g transform={`translate(10, ${140 * sizeMultiplier}) scale(${sizeMultiplier * 0.8})`}>
            {/* Solid line */}
            <line x1="0" y1="10" x2="30" y2="10" stroke={COLORS.carbon} strokeWidth="2" />
            <text x="35" y="14" fontSize="11" fill="#666">In plane</text>

            {/* Wedge */}
            <polygon points="90,5 120,0 120,20 90,15" fill={COLORS.wedge} />
            <text x="125" y="14" fontSize="11" fill="#666">Coming out</text>

            {/* Dash */}
            {[0, 6, 12, 18, 24].map((offset, i) => (
                <line key={i} x1={190 + offset} y1="5" x2={190 + offset} y2="15" stroke={COLORS.dash} strokeWidth="2" />
            ))}
            <text x="220" y="14" fontSize="11" fill="#666">Going in</text>
        </g>
    );

    const getMoleculeTitle = () => {
        switch (molecule) {
            case 'methane': return 'Methane (CH₄)';
            case 'bromochlorofluoromethane': return 'CHClBrF';
            case 'alanine': return 'L-Alanine';
            default: return 'Methane';
        }
    };

    return (
        <div style={{
            display: 'inline-flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '1.5rem',
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '16px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        }}>
            <svg
                width={width}
                height={showLegend ? height + 30 : height}
                viewBox={`0 0 ${width / sizeMultiplier} ${showLegend ? (height / sizeMultiplier) + 40 : height / sizeMultiplier}`}
            >
                {molecule === 'methane' && renderMethane()}
                {molecule === 'bromochlorofluoromethane' && renderCHClBrF()}
                {showLegend && renderLegend()}
            </svg>
            {showLabels && (
                <div style={{
                    marginTop: '0.5rem',
                    fontSize: `${1 * sizeMultiplier}rem`,
                    fontWeight: 600,
                    color: '#333',
                }}>
                    {getMoleculeTitle()}
                </div>
            )}
        </div>
    );
};

export default WedgeDashDiagram;
