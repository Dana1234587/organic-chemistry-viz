'use client';

import React from 'react';

interface AminoAcidProps {
    name: string;
    structure: 'glycine' | 'alanine' | 'phenylalanine' | 'serine' | 'cysteine';
    showLabels?: boolean;
    size?: 'small' | 'medium' | 'large';
}

// Color scheme matching Clayden textbook
const COLORS = {
    carbon: '#000000',
    oxygen: '#FF0000',
    nitrogen: '#0000FF',
    hydrogen: '#666666',
    bond: '#000000',
    label: '#333333',
};

const AminoAcidDiagram: React.FC<AminoAcidProps> = ({
    name,
    structure,
    showLabels = true,
    size = 'medium',
}) => {
    const sizeMultiplier = size === 'small' ? 0.7 : size === 'large' ? 1.3 : 1;
    const width = 180 * sizeMultiplier;
    const height = 140 * sizeMultiplier;

    const renderGlycine = () => (
        <g transform={`scale(${sizeMultiplier})`}>
            {/* H at top left */}
            <text x="30" y="25" fill={COLORS.hydrogen} fontSize="14" fontFamily="Arial">H</text>

            {/* N-H bond */}
            <line x1="40" y1="30" x2="50" y2="45" stroke={COLORS.bond} strokeWidth="1.5" />

            {/* NH2 group */}
            <text x="50" y="55" fill={COLORS.nitrogen} fontSize="14" fontFamily="Arial" fontWeight="bold">NH</text>
            <text x="72" y="58" fill={COLORS.nitrogen} fontSize="10" fontFamily="Arial">2</text>

            {/* Bond from NH2 to alpha carbon */}
            <line x1="65" y1="60" x2="75" y2="75" stroke={COLORS.bond} strokeWidth="1.5" />

            {/* Alpha carbon */}
            <text x="70" y="85" fill={COLORS.carbon} fontSize="14" fontFamily="Arial">C</text>

            {/* H on alpha carbon */}
            <text x="55" y="85" fill={COLORS.hydrogen} fontSize="14" fontFamily="Arial">H</text>
            <line x1="65" y1="80" x2="70" y2="80" stroke={COLORS.bond} strokeWidth="1.5" />

            {/* Bond to carboxyl carbon */}
            <line x1="82" y1="80" x2="100" y2="80" stroke={COLORS.bond} strokeWidth="1.5" />

            {/* Carboxyl carbon */}
            <text x="100" y="85" fill={COLORS.carbon} fontSize="14" fontFamily="Arial">C</text>

            {/* Double bond to O */}
            <line x1="95" y1="90" x2="85" y2="105" stroke={COLORS.bond} strokeWidth="1.5" />
            <line x1="100" y1="92" x2="90" y2="107" stroke={COLORS.bond} strokeWidth="1.5" />
            <text x="75" y="115" fill={COLORS.oxygen} fontSize="14" fontFamily="Arial" fontWeight="bold">O</text>

            {/* OH group */}
            <line x1="112" y1="85" x2="130" y2="85" stroke={COLORS.bond} strokeWidth="1.5" />
            <text x="130" y="90" fill={COLORS.oxygen} fontSize="14" fontFamily="Arial" fontWeight="bold">OH</text>
        </g>
    );

    const renderAlanine = () => (
        <g transform={`scale(${sizeMultiplier})`}>
            {/* H at top left */}
            <text x="30" y="25" fill={COLORS.hydrogen} fontSize="14" fontFamily="Arial">H</text>

            {/* N-H bond */}
            <line x1="40" y1="30" x2="50" y2="45" stroke={COLORS.bond} strokeWidth="1.5" />

            {/* NH2 group */}
            <text x="50" y="55" fill={COLORS.nitrogen} fontSize="14" fontFamily="Arial" fontWeight="bold">NH</text>
            <text x="72" y="58" fill={COLORS.nitrogen} fontSize="10" fontFamily="Arial">2</text>

            {/* Bond from NH2 to alpha carbon */}
            <line x1="65" y1="60" x2="75" y2="75" stroke={COLORS.bond} strokeWidth="1.5" />

            {/* Alpha carbon */}
            <text x="70" y="85" fill={COLORS.carbon} fontSize="14" fontFamily="Arial">C</text>

            {/* CH3 group (methyl - R group for alanine) */}
            <line x1="68" y1="72" x2="55" y2="60" stroke={COLORS.bond} strokeWidth="1.5" />
            <text x="35" y="55" fill={COLORS.carbon} fontSize="14" fontFamily="Arial">H</text>
            <text x="42" y="58" fill={COLORS.carbon} fontSize="10" fontFamily="Arial">3</text>
            <text x="48" y="55" fill={COLORS.carbon} fontSize="14" fontFamily="Arial">C</text>

            {/* Bond to carboxyl carbon */}
            <line x1="82" y1="80" x2="100" y2="80" stroke={COLORS.bond} strokeWidth="1.5" />

            {/* Carboxyl carbon */}
            <text x="100" y="85" fill={COLORS.carbon} fontSize="14" fontFamily="Arial">C</text>

            {/* Double bond to O */}
            <line x1="95" y1="90" x2="85" y2="105" stroke={COLORS.bond} strokeWidth="1.5" />
            <line x1="100" y1="92" x2="90" y2="107" stroke={COLORS.bond} strokeWidth="1.5" />
            <text x="75" y="115" fill={COLORS.oxygen} fontSize="14" fontFamily="Arial" fontWeight="bold">O</text>

            {/* OH group */}
            <line x1="112" y1="85" x2="130" y2="85" stroke={COLORS.bond} strokeWidth="1.5" />
            <text x="130" y="90" fill={COLORS.oxygen} fontSize="14" fontFamily="Arial" fontWeight="bold">OH</text>
        </g>
    );

    const renderPhenylalanine = () => (
        <g transform={`scale(${sizeMultiplier * 0.85})`}>
            {/* Benzene ring - hexagon */}
            <polygon
                points="30,50 55,35 80,50 80,80 55,95 30,80"
                fill="none"
                stroke={COLORS.bond}
                strokeWidth="1.5"
            />
            {/* Alternating double bonds in benzene */}
            <line x1="37" y1="53" x2="37" y2="77" stroke={COLORS.bond} strokeWidth="1.5" />
            <line x1="55" y1="42" x2="73" y2="53" stroke={COLORS.bond} strokeWidth="1.5" />
            <line x1="55" y1="88" x2="73" y2="77" stroke={COLORS.bond} strokeWidth="1.5" />

            {/* H atoms on benzene */}
            <text x="15" y="40" fill={COLORS.hydrogen} fontSize="12" fontFamily="Arial">H</text>
            <line x1="28" y1="45" x2="22" y2="40" stroke={COLORS.bond} strokeWidth="1" />

            <text x="55" y="25" fill={COLORS.hydrogen} fontSize="12" fontFamily="Arial">H</text>
            <line x1="55" y1="35" x2="55" y2="28" stroke={COLORS.bond} strokeWidth="1" />

            <text x="88" y="40" fill={COLORS.hydrogen} fontSize="12" fontFamily="Arial">H</text>
            <line x1="82" y1="45" x2="88" y2="40" stroke={COLORS.bond} strokeWidth="1" />

            <text x="88" y="95" fill={COLORS.hydrogen} fontSize="12" fontFamily="Arial">H</text>
            <line x1="82" y1="85" x2="88" y2="90" stroke={COLORS.bond} strokeWidth="1" />

            <text x="55" y="115" fill={COLORS.hydrogen} fontSize="12" fontFamily="Arial">H</text>
            <line x1="55" y1="95" x2="55" y2="105" stroke={COLORS.bond} strokeWidth="1" />

            {/* CH2 linker */}
            <line x1="30" y1="80" x2="15" y2="95" stroke={COLORS.bond} strokeWidth="1.5" />
            <text x="5" y="105" fill={COLORS.carbon} fontSize="12" fontFamily="Arial">H</text>
            <text x="12" y="108" fill={COLORS.carbon} fontSize="8" fontFamily="Arial">2</text>

            {/* Alpha carbon */}
            <line x1="10" y1="105" x2="10" y2="120" stroke={COLORS.bond} strokeWidth="1.5" />
            <text x="5" y="130" fill={COLORS.carbon} fontSize="12" fontFamily="Arial">C</text>

            {/* H on alpha C */}
            <text x="20" y="130" fill={COLORS.hydrogen} fontSize="12" fontFamily="Arial">H</text>
            <line x1="15" y1="125" x2="20" y2="125" stroke={COLORS.bond} strokeWidth="1" />

            {/* NH2 */}
            <line x1="5" y1="132" x2="0" y2="145" stroke={COLORS.bond} strokeWidth="1.5" />
            <text x="-15" y="155" fill={COLORS.nitrogen} fontSize="12" fontFamily="Arial" fontWeight="bold">NH</text>
            <text x="3" y="158" fill={COLORS.nitrogen} fontSize="8" fontFamily="Arial">2</text>

            {/* COOH */}
            <line x1="15" y1="132" x2="30" y2="145" stroke={COLORS.bond} strokeWidth="1.5" />
            <text x="30" y="155" fill={COLORS.carbon} fontSize="12" fontFamily="Arial">C</text>

            {/* Double bond O */}
            <line x1="38" y1="148" x2="50" y2="140" stroke={COLORS.bond} strokeWidth="1.5" />
            <line x1="40" y1="152" x2="52" y2="144" stroke={COLORS.bond} strokeWidth="1.5" />
            <text x="52" y="142" fill={COLORS.oxygen} fontSize="12" fontFamily="Arial" fontWeight="bold">O</text>

            {/* OH */}
            <line x1="38" y1="158" x2="50" y2="165" stroke={COLORS.bond} strokeWidth="1.5" />
            <text x="52" y="172" fill={COLORS.oxygen} fontSize="12" fontFamily="Arial" fontWeight="bold">OH</text>
        </g>
    );

    const renderStructure = () => {
        switch (structure) {
            case 'glycine':
                return renderGlycine();
            case 'alanine':
                return renderAlanine();
            case 'phenylalanine':
                return renderPhenylalanine();
            default:
                return renderGlycine();
        }
    };

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
            <svg
                width={structure === 'phenylalanine' ? width * 0.6 : width}
                height={structure === 'phenylalanine' ? height * 1.4 : height}
                viewBox={structure === 'phenylalanine' ? "-20 10 100 180" : "20 10 140 120"}
            >
                {renderStructure()}
            </svg>
            {showLabels && (
                <div style={{
                    marginTop: '0.5rem',
                    fontSize: '0.95rem',
                    fontWeight: 500,
                    color: COLORS.label,
                    fontFamily: 'Arial, sans-serif',
                }}>
                    {name}
                </div>
            )}
        </div>
    );
};

export default AminoAcidDiagram;
