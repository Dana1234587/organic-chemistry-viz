'use client';

import React from 'react';

interface AbbreviationsDiagramProps {
    showAll?: boolean;
    highlightAbbr?: string;
    size?: 'small' | 'medium' | 'large';
}

const COLORS = {
    carbon: '#000000',
    bond: '#000000',
    highlight: '#8B5CF6',
    label: '#333333',
    background: 'rgba(255, 255, 255, 0.95)',
};

const abbreviations = [
    { abbr: 'Me', name: 'Methyl', carbons: 1, formula: '-CH₃' },
    { abbr: 'Et', name: 'Ethyl', carbons: 2, formula: '-CH₂CH₃' },
    { abbr: 'Pr', name: 'Propyl', carbons: 3, formula: '-CH₂CH₂CH₃' },
    { abbr: 'iPr', name: 'Isopropyl', carbons: 3, formula: '-CH(CH₃)₂' },
    { abbr: 'Bu', name: 'Butyl', carbons: 4, formula: '-CH₂CH₂CH₂CH₃' },
    { abbr: 'tBu', name: 'tert-Butyl', carbons: 4, formula: '-C(CH₃)₃' },
    { abbr: 'Ph', name: 'Phenyl', carbons: 6, formula: '-C₆H₅' },
    { abbr: 'Bn', name: 'Benzyl', carbons: 7, formula: '-CH₂C₆H₅' },
    { abbr: 'Ac', name: 'Acetyl', carbons: 2, formula: '-COCH₃' },
];

const AbbreviationsDiagram: React.FC<AbbreviationsDiagramProps> = ({
    showAll = true,
    highlightAbbr,
    size = 'medium',
}) => {
    const sizeMultiplier = size === 'small' ? 0.7 : size === 'large' ? 1.3 : 1;

    const renderMethyl = (x: number, y: number) => (
        <g transform={`translate(${x}, ${y})`}>
            <line x1="0" y1="0" x2="20" y2="0" stroke={COLORS.bond} strokeWidth="2" />
            <circle cx="0" cy="0" r="3" fill={COLORS.carbon} />
        </g>
    );

    const renderEthyl = (x: number, y: number) => (
        <g transform={`translate(${x}, ${y})`}>
            <line x1="0" y1="0" x2="20" y2="-12" stroke={COLORS.bond} strokeWidth="2" />
            <line x1="20" y1="-12" x2="40" y2="0" stroke={COLORS.bond} strokeWidth="2" />
        </g>
    );

    const renderPhenyl = (x: number, y: number) => {
        const r = 18;
        const innerR = 10;
        const hexPoints = [];
        for (let i = 0; i < 6; i++) {
            const angle = (i * 60 - 90) * Math.PI / 180;
            hexPoints.push({
                px: x + 25 + r * Math.cos(angle),
                py: y + r * Math.sin(angle)
            });
        }
        const pointsString = hexPoints.map(p => `${p.px},${p.py}`).join(' ');

        return (
            <g>
                <line x1={x} y1={y} x2={x + 10} y2={y} stroke={COLORS.bond} strokeWidth="2" />
                <polygon points={pointsString} fill="none" stroke={COLORS.bond} strokeWidth="2" />
                <circle cx={x + 25} cy={y} r={innerR} fill="none" stroke={COLORS.bond} strokeWidth="1.5" />
            </g>
        );
    };

    const renderTertButyl = (x: number, y: number) => (
        <g transform={`translate(${x}, ${y})`}>
            <circle cx="20" cy="0" r="4" fill={COLORS.carbon} />
            {/* Three methyl branches */}
            <line x1="0" y1="0" x2="20" y2="0" stroke={COLORS.bond} strokeWidth="2" />
            <line x1="20" y1="0" x2="40" y2="-15" stroke={COLORS.bond} strokeWidth="2" />
            <line x1="20" y1="0" x2="40" y2="15" stroke={COLORS.bond} strokeWidth="2" />
            <line x1="20" y1="0" x2="20" y2="20" stroke={COLORS.bond} strokeWidth="2" />
        </g>
    );

    const renderAbbreviationBox = (abbr: typeof abbreviations[0], index: number) => {
        const isHighlighted = highlightAbbr === abbr.abbr;

        return (
            <div
                key={abbr.abbr}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '1rem',
                    background: isHighlighted ? `${COLORS.highlight}20` : COLORS.background,
                    borderRadius: '12px',
                    boxShadow: isHighlighted
                        ? `0 6px 20px ${COLORS.highlight}40`
                        : '0 4px 15px rgba(0, 0, 0, 0.1)',
                    border: isHighlighted ? `2px solid ${COLORS.highlight}` : '2px solid transparent',
                    minWidth: 100 * sizeMultiplier,
                    transition: 'all 0.2s ease',
                }}
            >
                {/* Abbreviation */}
                <div style={{
                    fontSize: `${1.4 * sizeMultiplier}rem`,
                    fontWeight: 700,
                    color: isHighlighted ? COLORS.highlight : COLORS.carbon,
                    fontFamily: 'monospace',
                }}>
                    {abbr.abbr}
                </div>

                {/* SVG structure */}
                <svg
                    width={70 * sizeMultiplier}
                    height={50 * sizeMultiplier}
                    viewBox="0 0 70 50"
                    style={{ margin: '0.5rem 0' }}
                >
                    <g transform="translate(5, 25)">
                        {abbr.abbr === 'Me' && renderMethyl(0, 0)}
                        {abbr.abbr === 'Et' && renderEthyl(0, 0)}
                        {abbr.abbr === 'Ph' && renderPhenyl(0, 0)}
                        {abbr.abbr === 'tBu' && renderTertButyl(0, 0)}
                        {!['Me', 'Et', 'Ph', 'tBu'].includes(abbr.abbr) && (
                            <text x="10" y="5" fontSize="12" fill={COLORS.label}>{abbr.formula}</text>
                        )}
                    </g>
                </svg>

                {/* Full name */}
                <div style={{
                    fontSize: `${0.8 * sizeMultiplier}rem`,
                    color: '#666',
                    textAlign: 'center',
                }}>
                    {abbr.name}
                </div>

                {/* Formula */}
                <div style={{
                    fontSize: `${0.7 * sizeMultiplier}rem`,
                    color: '#888',
                    fontFamily: 'monospace',
                }}>
                    {abbr.formula}
                </div>
            </div>
        );
    };

    const displayAbbrs = showAll ? abbreviations : abbreviations.filter(a => a.abbr === highlightAbbr);

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            padding: '1.5rem',
            background: 'linear-gradient(135deg, #f8f8f8 0%, #f0f0f0 100%)',
            borderRadius: '16px',
        }}>
            <div style={{
                textAlign: 'center',
                fontSize: `${1.2 * sizeMultiplier}rem`,
                fontWeight: 700,
                color: '#333',
            }}>
                Common Abbreviations in Organic Chemistry
            </div>

            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '1rem',
            }}>
                {displayAbbrs.map((abbr, i) => renderAbbreviationBox(abbr, i))}
            </div>
        </div>
    );
};

export default AbbreviationsDiagram;
