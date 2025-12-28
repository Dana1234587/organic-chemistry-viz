'use client';

import React from 'react';

interface OxidationLevelDiagramProps {
    showLevel?: 0 | 1 | 2 | 3 | 4 | 'all';
    interactive?: boolean;
    size?: 'small' | 'medium' | 'large';
}

const COLORS = {
    carbon: '#000000',
    oxygen: '#FF0000',
    hydrogen: '#666666',
    level0: '#22C55E',
    level1: '#84CC16',
    level2: '#EAB308',
    level3: '#F97316',
    level4: '#EF4444',
    bond: '#000000',
    background: 'rgba(255, 255, 255, 0.95)',
};

const levels = [
    { level: 0, name: 'Alkane', example: 'CH₄', formula: 'Methane', description: 'No oxygen bonds' },
    { level: 1, name: 'Alcohol', example: 'CH₃OH', formula: 'Methanol', description: '1 C-O bond' },
    { level: 2, name: 'Aldehyde', example: 'HCHO', formula: 'Formaldehyde', description: '2 C-O bonds (C=O)' },
    { level: 3, name: 'Carboxylic Acid', example: 'HCOOH', formula: 'Formic Acid', description: '3 C-O bonds' },
    { level: 4, name: 'Carbon Dioxide', example: 'CO₂', formula: 'Carbon Dioxide', description: '4 C-O bonds (O=C=O)' },
];

const OxidationLevelDiagram: React.FC<OxidationLevelDiagramProps> = ({
    showLevel = 'all',
    interactive = false,
    size = 'medium',
}) => {
    const [hoveredLevel, setHoveredLevel] = React.useState<number | null>(null);
    const sizeMultiplier = size === 'small' ? 0.7 : size === 'large' ? 1.3 : 1;

    const getLevelColor = (level: number) => {
        const colors = [COLORS.level0, COLORS.level1, COLORS.level2, COLORS.level3, COLORS.level4];
        return colors[level] || COLORS.level0;
    };

    const filteredLevels = showLevel === 'all'
        ? levels
        : levels.filter(l => l.level === showLevel);

    const renderLevelBox = (level: typeof levels[0], index: number) => {
        const isHovered = interactive && hoveredLevel === level.level;
        const boxHeight = 80 * sizeMultiplier;
        const boxWidth = 130 * sizeMultiplier;

        return (
            <div
                key={level.level}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '0.75rem',
                    background: isHovered ? getLevelColor(level.level) + '20' : COLORS.background,
                    borderRadius: '12px',
                    boxShadow: isHovered
                        ? `0 6px 20px ${getLevelColor(level.level)}40`
                        : '0 4px 15px rgba(0, 0, 0, 0.1)',
                    border: `3px solid ${getLevelColor(level.level)}`,
                    minWidth: boxWidth,
                    cursor: interactive ? 'pointer' : 'default',
                    transition: 'all 0.2s ease',
                    transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                }}
                onMouseEnter={() => interactive && setHoveredLevel(level.level)}
                onMouseLeave={() => interactive && setHoveredLevel(null)}
            >
                {/* Level number badge */}
                <div style={{
                    background: getLevelColor(level.level),
                    color: 'white',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '20px',
                    fontSize: `${0.8 * sizeMultiplier}rem`,
                    fontWeight: 700,
                    marginBottom: '0.5rem',
                }}>
                    Level {level.level}
                </div>

                {/* Chemical formula */}
                <div style={{
                    fontSize: `${1.2 * sizeMultiplier}rem`,
                    fontWeight: 600,
                    fontFamily: 'monospace',
                    color: COLORS.carbon,
                    marginBottom: '0.25rem',
                }}>
                    {level.example}
                </div>

                {/* Name */}
                <div style={{
                    fontSize: `${0.85 * sizeMultiplier}rem`,
                    color: '#666',
                    fontWeight: 500,
                }}>
                    {level.name}
                </div>

                {/* Description on hover */}
                {isHovered && (
                    <div style={{
                        fontSize: `${0.75 * sizeMultiplier}rem`,
                        color: '#888',
                        marginTop: '0.25rem',
                        textAlign: 'center',
                    }}>
                        {level.description}
                    </div>
                )}
            </div>
        );
    };

    const renderArrow = () => (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            padding: '0 0.5rem',
        }}>
            <svg width={30 * sizeMultiplier} height={20 * sizeMultiplier} viewBox="0 0 30 20">
                <defs>
                    <linearGradient id="arrowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor={COLORS.level0} />
                        <stop offset="100%" stopColor={COLORS.level4} />
                    </linearGradient>
                </defs>
                <line x1="0" y1="10" x2="20" y2="10" stroke="url(#arrowGrad)" strokeWidth="2" />
                <polygon points="20,5 30,10 20,15" fill={COLORS.level4} />
            </svg>
        </div>
    );

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '1.5rem',
            background: 'linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%)',
            borderRadius: '16px',
            gap: '1rem',
        }}>
            {/* Title */}
            <div style={{
                textAlign: 'center',
                fontSize: `${1.2 * sizeMultiplier}rem`,
                fontWeight: 700,
                color: '#333',
                marginBottom: '0.5rem',
            }}>
                Oxidation Levels of Carbon
            </div>

            {/* Subtitle */}
            <div style={{
                textAlign: 'center',
                fontSize: `${0.85 * sizeMultiplier}rem`,
                color: '#666',
                marginBottom: '0.5rem',
            }}>
                From most <span style={{ color: COLORS.level0, fontWeight: 600 }}>reduced</span> to most <span style={{ color: COLORS.level4, fontWeight: 600 }}>oxidized</span>
            </div>

            {/* Level boxes */}
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '0.5rem',
            }}>
                {filteredLevels.map((level, index) => (
                    <React.Fragment key={level.level}>
                        {renderLevelBox(level, index)}
                        {showLevel === 'all' && index < filteredLevels.length - 1 && renderArrow()}
                    </React.Fragment>
                ))}
            </div>

            {/* Oxidation gradient bar */}
            {showLevel === 'all' && (
                <div style={{
                    height: '8px',
                    background: `linear-gradient(90deg, ${COLORS.level0}, ${COLORS.level1}, ${COLORS.level2}, ${COLORS.level3}, ${COLORS.level4})`,
                    borderRadius: '4px',
                    marginTop: '0.5rem',
                }} />
            )}
        </div>
    );
};

export default OxidationLevelDiagram;
