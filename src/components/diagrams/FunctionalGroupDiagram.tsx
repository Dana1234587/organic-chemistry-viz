'use client';

import React from 'react';

type FunctionalGroupType =
    | 'alcohol' | 'aldehyde' | 'ketone' | 'carboxylic-acid'
    | 'ester' | 'ether' | 'amine' | 'amide'
    | 'alkene' | 'alkyne' | 'nitrile' | 'thiol';

interface FunctionalGroupDiagramProps {
    group: FunctionalGroupType;
    showLabel?: boolean;
    showName?: boolean;
    size?: 'small' | 'medium' | 'large';
}

const COLORS = {
    carbon: '#000000',
    oxygen: '#FF0000',
    nitrogen: '#0000FF',
    sulfur: '#FFD700',
    hydrogen: '#666666',
    bond: '#000000',
    rGroup: '#8B5CF6',
};

const FunctionalGroupDiagram: React.FC<FunctionalGroupDiagramProps> = ({
    group,
    showLabel = true,
    showName = true,
    size = 'medium',
}) => {
    const sizeMultiplier = size === 'small' ? 0.7 : size === 'large' ? 1.3 : 1;
    const width = 140 * sizeMultiplier;
    const height = 100 * sizeMultiplier;

    const groupInfo: Record<FunctionalGroupType, { formula: string; name: string }> = {
        'alcohol': { formula: 'R-OH', name: 'Alcohol' },
        'aldehyde': { formula: 'R-CHO', name: 'Aldehyde' },
        'ketone': { formula: 'R-CO-R\'', name: 'Ketone' },
        'carboxylic-acid': { formula: 'R-COOH', name: 'Carboxylic Acid' },
        'ester': { formula: 'R-COO-R\'', name: 'Ester' },
        'ether': { formula: 'R-O-R\'', name: 'Ether' },
        'amine': { formula: 'R-NH₂', name: 'Amine' },
        'amide': { formula: 'R-CONH₂', name: 'Amide' },
        'alkene': { formula: 'R=R\'', name: 'Alkene' },
        'alkyne': { formula: 'R≡R\'', name: 'Alkyne' },
        'nitrile': { formula: 'R-C≡N', name: 'Nitrile' },
        'thiol': { formula: 'R-SH', name: 'Thiol' },
    };

    const renderAlcohol = () => (
        <g transform={`scale(${sizeMultiplier})`}>
            {/* R group */}
            <text x="20" y="55" fill={COLORS.rGroup} fontSize="16" fontWeight="bold" fontFamily="Arial">R</text>
            {/* Bond */}
            <line x1="35" y1="50" x2="55" y2="50" stroke={COLORS.bond} strokeWidth="2" />
            {/* OH */}
            <text x="60" y="55" fill={COLORS.oxygen} fontSize="16" fontWeight="bold" fontFamily="Arial">O</text>
            <text x="78" y="55" fill={COLORS.hydrogen} fontSize="16" fontFamily="Arial">H</text>
        </g>
    );

    const renderAldehyde = () => (
        <g transform={`scale(${sizeMultiplier})`}>
            {/* R group */}
            <text x="15" y="55" fill={COLORS.rGroup} fontSize="16" fontWeight="bold" fontFamily="Arial">R</text>
            {/* Bond to C */}
            <line x1="30" y1="50" x2="50" y2="50" stroke={COLORS.bond} strokeWidth="2" />
            {/* Carbonyl C */}
            <text x="52" y="55" fill={COLORS.carbon} fontSize="16" fontFamily="Arial">C</text>
            {/* Double bond O */}
            <line x1="60" y1="42" x2="60" y2="25" stroke={COLORS.bond} strokeWidth="2" />
            <line x1="65" y1="42" x2="65" y2="25" stroke={COLORS.bond} strokeWidth="2" />
            <text x="55" y="20" fill={COLORS.oxygen} fontSize="14" fontWeight="bold" fontFamily="Arial">O</text>
            {/* H */}
            <line x1="68" y1="52" x2="85" y2="52" stroke={COLORS.bond} strokeWidth="2" />
            <text x="88" y="57" fill={COLORS.hydrogen} fontSize="16" fontFamily="Arial">H</text>
        </g>
    );

    const renderKetone = () => (
        <g transform={`scale(${sizeMultiplier})`}>
            {/* R group */}
            <text x="10" y="55" fill={COLORS.rGroup} fontSize="16" fontWeight="bold" fontFamily="Arial">R</text>
            {/* Bond */}
            <line x1="25" y1="50" x2="45" y2="50" stroke={COLORS.bond} strokeWidth="2" />
            {/* Carbonyl C */}
            <text x="47" y="55" fill={COLORS.carbon} fontSize="16" fontFamily="Arial">C</text>
            {/* Double bond O */}
            <line x1="55" y1="42" x2="55" y2="25" stroke={COLORS.bond} strokeWidth="2" />
            <line x1="60" y1="42" x2="60" y2="25" stroke={COLORS.bond} strokeWidth="2" />
            <text x="52" y="20" fill={COLORS.oxygen} fontSize="14" fontWeight="bold" fontFamily="Arial">O</text>
            {/* R' */}
            <line x1="63" y1="52" x2="80" y2="52" stroke={COLORS.bond} strokeWidth="2" />
            <text x="83" y="57" fill={COLORS.rGroup} fontSize="16" fontWeight="bold" fontFamily="Arial">R'</text>
        </g>
    );

    const renderCarboxylicAcid = () => (
        <g transform={`scale(${sizeMultiplier})`}>
            {/* R group */}
            <text x="5" y="45" fill={COLORS.rGroup} fontSize="16" fontWeight="bold" fontFamily="Arial">R</text>
            {/* Bond */}
            <line x1="20" y1="40" x2="40" y2="40" stroke={COLORS.bond} strokeWidth="2" />
            {/* Carbonyl C */}
            <text x="42" y="45" fill={COLORS.carbon} fontSize="16" fontFamily="Arial">C</text>
            {/* Double bond O (top) */}
            <line x1="52" y1="32" x2="60" y2="18" stroke={COLORS.bond} strokeWidth="2" />
            <line x1="56" y1="35" x2="64" y2="21" stroke={COLORS.bond} strokeWidth="2" />
            <text x="62" y="18" fill={COLORS.oxygen} fontSize="14" fontWeight="bold" fontFamily="Arial">O</text>
            {/* Single bond to OH (bottom) */}
            <line x1="52" y1="48" x2="60" y2="62" stroke={COLORS.bond} strokeWidth="2" />
            <text x="62" y="72" fill={COLORS.oxygen} fontSize="14" fontWeight="bold" fontFamily="Arial">O</text>
            <text x="76" y="72" fill={COLORS.hydrogen} fontSize="14" fontFamily="Arial">H</text>
        </g>
    );

    const renderAmine = () => (
        <g transform={`scale(${sizeMultiplier})`}>
            {/* R group */}
            <text x="20" y="55" fill={COLORS.rGroup} fontSize="16" fontWeight="bold" fontFamily="Arial">R</text>
            {/* Bond */}
            <line x1="35" y1="50" x2="55" y2="50" stroke={COLORS.bond} strokeWidth="2" />
            {/* N */}
            <text x="58" y="55" fill={COLORS.nitrogen} fontSize="16" fontWeight="bold" fontFamily="Arial">N</text>
            {/* H2 */}
            <text x="73" y="55" fill={COLORS.hydrogen} fontSize="16" fontFamily="Arial">H</text>
            <text x="84" y="58" fill={COLORS.hydrogen} fontSize="12" fontFamily="Arial">2</text>
        </g>
    );

    const renderEther = () => (
        <g transform={`scale(${sizeMultiplier})`}>
            {/* R group */}
            <text x="10" y="55" fill={COLORS.rGroup} fontSize="16" fontWeight="bold" fontFamily="Arial">R</text>
            {/* Bond */}
            <line x1="25" y1="50" x2="42" y2="50" stroke={COLORS.bond} strokeWidth="2" />
            {/* O */}
            <text x="45" y="55" fill={COLORS.oxygen} fontSize="16" fontWeight="bold" fontFamily="Arial">O</text>
            {/* Bond */}
            <line x1="60" y1="50" x2="77" y2="50" stroke={COLORS.bond} strokeWidth="2" />
            {/* R' */}
            <text x="80" y="55" fill={COLORS.rGroup} fontSize="16" fontWeight="bold" fontFamily="Arial">R'</text>
        </g>
    );

    const renderAlkene = () => (
        <g transform={`scale(${sizeMultiplier})`}>
            {/* R group */}
            <text x="15" y="55" fill={COLORS.rGroup} fontSize="16" fontWeight="bold" fontFamily="Arial">R</text>
            {/* Double bond */}
            <line x1="35" y1="47" x2="65" y2="47" stroke={COLORS.bond} strokeWidth="2" />
            <line x1="35" y1="53" x2="65" y2="53" stroke={COLORS.bond} strokeWidth="2" />
            {/* R' */}
            <text x="70" y="55" fill={COLORS.rGroup} fontSize="16" fontWeight="bold" fontFamily="Arial">R'</text>
        </g>
    );

    const renderAlkyne = () => (
        <g transform={`scale(${sizeMultiplier})`}>
            {/* R group */}
            <text x="15" y="55" fill={COLORS.rGroup} fontSize="16" fontWeight="bold" fontFamily="Arial">R</text>
            {/* Triple bond */}
            <line x1="35" y1="45" x2="65" y2="45" stroke={COLORS.bond} strokeWidth="2" />
            <line x1="35" y1="50" x2="65" y2="50" stroke={COLORS.bond} strokeWidth="2" />
            <line x1="35" y1="55" x2="65" y2="55" stroke={COLORS.bond} strokeWidth="2" />
            {/* R' */}
            <text x="70" y="55" fill={COLORS.rGroup} fontSize="16" fontWeight="bold" fontFamily="Arial">R'</text>
        </g>
    );

    const renderThiol = () => (
        <g transform={`scale(${sizeMultiplier})`}>
            {/* R group */}
            <text x="20" y="55" fill={COLORS.rGroup} fontSize="16" fontWeight="bold" fontFamily="Arial">R</text>
            {/* Bond */}
            <line x1="35" y1="50" x2="55" y2="50" stroke={COLORS.bond} strokeWidth="2" />
            {/* S */}
            <text x="60" y="55" fill={COLORS.sulfur} fontSize="16" fontWeight="bold" fontFamily="Arial">S</text>
            {/* H */}
            <text x="78" y="55" fill={COLORS.hydrogen} fontSize="16" fontFamily="Arial">H</text>
        </g>
    );

    const renderGroup = () => {
        switch (group) {
            case 'alcohol': return renderAlcohol();
            case 'aldehyde': return renderAldehyde();
            case 'ketone': return renderKetone();
            case 'carboxylic-acid': return renderCarboxylicAcid();
            case 'amine': return renderAmine();
            case 'ether': return renderEther();
            case 'alkene': return renderAlkene();
            case 'alkyne': return renderAlkyne();
            case 'thiol': return renderThiol();
            default: return renderAlcohol();
        }
    };

    const info = groupInfo[group];

    return (
        <div style={{
            display: 'inline-flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '1rem',
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '12px',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
            minWidth: width,
        }}>
            <svg width={width} height={height} viewBox={`0 0 ${width / sizeMultiplier} ${height / sizeMultiplier}`}>
                {renderGroup()}
            </svg>
            {showLabel && (
                <div style={{
                    marginTop: '0.25rem',
                    fontSize: '0.9rem',
                    fontFamily: 'monospace',
                    color: '#666',
                }}>
                    {info.formula}
                </div>
            )}
            {showName && (
                <div style={{
                    marginTop: '0.25rem',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    color: '#333',
                }}>
                    {info.name}
                </div>
            )}
        </div>
    );
};

export default FunctionalGroupDiagram;
