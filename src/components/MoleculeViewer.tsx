'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Mobile detection hook
function useIsMobile() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(
                window.innerWidth < 768 ||
                'ontouchstart' in window ||
                navigator.maxTouchPoints > 0
            );
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return isMobile;
}

interface MoleculeViewerProps {
    moleculeName: string;
    smilesOrPdb?: string;
    description?: string;
    height?: number;
}

// Common molecules with PDB format, formulas, and structure info
const moleculeData: Record<string, {
    pdb: string;
    color: string;
    emoji: string;
    formula: string;
    skeletal: string;
    functionalGroups: string[];
}> = {
    'serotonin': {
        color: '#8b5cf6',
        emoji: '😊',
        formula: 'C₁₀H₁₂N₂O',
        skeletal: 'Indole ring with ethylamine side chain',
        functionalGroups: ['Amine (-NH₂)', 'Hydroxyl (-OH)', 'Aromatic ring'],
        pdb: `COMPND    SEROTONIN
ATOM      1  N1  SER     1       0.000   0.000   0.000  1.00  0.00           N
ATOM      2  C2  SER     1       1.300   0.000   0.000  1.00  0.00           C
ATOM      3  C3  SER     1       2.000   1.200   0.000  1.00  0.00           C
ATOM      4  C4  SER     1       1.300   2.400   0.000  1.00  0.00           C
ATOM      5  C5  SER     1       0.000   2.400   0.000  1.00  0.00           C
ATOM      6  C6  SER     1      -0.700   1.200   0.000  1.00  0.00           C
ATOM      7  C7  SER     1       3.500   1.200   0.000  1.00  0.00           C
ATOM      8  C8  SER     1       4.200   2.400   0.000  1.00  0.00           C
ATOM      9  N2  SER     1       3.500   3.600   0.000  1.00  0.00           N
ATOM     10  C9  SER     1       2.100   3.600   0.000  1.00  0.00           C
ATOM     11  O1  SER     1       5.600   2.400   0.000  1.00  0.00           O
ATOM     12  C10 SER     1       6.300   3.700   0.000  1.00  0.00           C
ATOM     13  N2  SER     1       7.600   4.300   0.000  1.00  0.00           N
END`
    },
    'ethane': {
        color: '#94a3b8',
        emoji: '🔥',
        formula: 'C₂H₆',
        skeletal: 'Two carbons with single bond (Level 0)',
        functionalGroups: ['Alkane'],
        pdb: `COMPND    ETHANE
ATOM      1  C1  ETH     1      -0.752   0.000   0.000  1.00  0.00           C
ATOM      2  C2  ETH     1       0.752   0.000   0.000  1.00  0.00           C
ATOM      3  H1  ETH     1      -1.147   1.025   0.000  1.00  0.00           H
ATOM      4  H2  ETH     1      -1.147  -0.513  -0.887  1.00  0.00           H
ATOM      5  H3  ETH     1      -1.147  -0.513   0.887  1.00  0.00           H
ATOM      6  H4  ETH     1       1.147  -1.025   0.000  1.00  0.00           H
ATOM      7  H5  ETH     1       1.147   0.513   0.887  1.00  0.00           H
ATOM      8  H6  ETH     1       1.147   0.513  -0.887  1.00  0.00           H
END`
    },
    'acetone': {
        color: '#f97316',
        emoji: '🧴',
        formula: 'C₃H₆O',
        skeletal: 'Three carbons with central ketone (C=O)',
        functionalGroups: ['Ketone (C=O)', 'Level 2 oxidation'],
        pdb: `COMPND    ACETONE
ATOM      1  C1  ACE     1      -1.270   0.000   0.000  1.00  0.00           C
ATOM      2  C2  ACE     1       0.000   0.000   0.000  1.00  0.00           C
ATOM      3  C3  ACE     1       1.270   0.000   0.000  1.00  0.00           C
ATOM      4  O1  ACE     1       0.000   1.230   0.000  1.00  0.00           O
ATOM      5  H1  ACE     1      -1.640   0.520   0.890  1.00  0.00           H
ATOM      6  H2  ACE     1      -1.640   0.520  -0.890  1.00  0.00           H
ATOM      7  H3  ACE     1      -1.640  -1.030   0.000  1.00  0.00           H
ATOM      8  H4  ACE     1       1.640  -0.520   0.890  1.00  0.00           H
ATOM      9  H5  ACE     1       1.640  -0.520  -0.890  1.00  0.00           H
ATOM     10  H6  ACE     1       1.640   1.030   0.000  1.00  0.00           H
END`
    },
    'acetaldehyde': {
        color: '#f59e0b',
        emoji: '🧪',
        formula: 'C₂H₄O',
        skeletal: 'Two carbons, one C=O double bond (Level 2)',
        functionalGroups: ['Aldehyde', 'Carbonyl'],
        pdb: `COMPND    ACETALDEHYDE
ATOM      1  C1  ALD     1       0.000   0.000   0.000  1.00  0.00           C
ATOM      2  C2  ALD     1       1.530   0.000   0.000  1.00  0.00           C
ATOM      3  O1  ALD     1       2.230   1.210   0.000  1.00  0.00           O
ATOM      4  H1  ALD     1      -0.390  -0.510   0.890  1.00  0.00           H
ATOM      5  H2  ALD     1      -0.390  -0.510  -0.890  1.00  0.00           H
ATOM      6  H3  ALD     1      -0.390   1.020   0.000  1.00  0.00           H
ATOM      7  H4  ALD     1       2.040  -0.960   0.000  1.00  0.00           H
END`
    },
    'acetic acid': {
        color: '#ef4444',
        emoji: '🥗',
        formula: 'C₂H₄O₂',
        skeletal: 'Two carbons, C=O and -OH (Level 3)',
        functionalGroups: ['Carboxylic Acid', 'Carbonyl', 'Hydroxyl'],
        pdb: `COMPND    ACETIC ACID
ATOM      1  C1  AAC     1      -1.465  -0.088   0.000  1.00  0.00           C
ATOM      2  C2  AAC     1       0.000   0.141   0.000  1.00  0.00           C
ATOM      3  O1  AAC     1       0.785  -0.923   0.000  1.00  0.00           O
ATOM      4  O2  AAC     1       0.605   1.385   0.000  1.00  0.00           O
ATOM      5  H1  AAC     1      -1.921   0.395   0.882  1.00  0.00           H
ATOM      6  H2  AAC     1      -1.637  -1.164   0.007  1.00  0.00           H
ATOM      7  H3  AAC     1      -1.921   0.395  -0.882  1.00  0.00           H
ATOM      8  H4  AAC     1       1.751  -0.672   0.000  1.00  0.00           H
END`
    },
    'caffeine': {
        color: '#f59e0b',
        emoji: '☕',
        formula: 'C₈H₁₀N₄O₂',
        skeletal: 'Fused purine ring system (imidazole + pyrimidine)',
        functionalGroups: ['Carbonyl (C=O)', 'Methyl groups (-CH₃)', 'Heterocyclic N'],
        pdb: `COMPND    CAFFEINE
ATOM      1  N1  CAF     1       0.000   0.000   0.000  1.00  0.00           N
ATOM      2  C2  CAF     1       1.300   0.000   0.000  1.00  0.00           C
ATOM      3  N3  CAF     1       2.000   1.200   0.000  1.00  0.00           N
ATOM      4  C4  CAF     1       1.300   2.400   0.000  1.00  0.00           C
ATOM      5  C5  CAF     1       0.000   2.400   0.000  1.00  0.00           C
ATOM      6  C6  CAF     1      -0.700   1.200   0.000  1.00  0.00           C
ATOM      7  N7  CAF     1       2.000   3.600   0.000  1.00  0.00           N
ATOM      8  C8  CAF     1       1.300   4.800   0.000  1.00  0.00           C
ATOM      9  N9  CAF     1       0.000   4.800   0.000  1.00  0.00           N
ATOM     10  O1  CAF     1      -2.100   1.200   0.000  1.00  0.00           O
ATOM     11  O2  CAF     1       2.000   6.000   0.000  1.00  0.00           O
ATOM     12  C10 CAF     1      -0.700  -1.200   0.000  1.00  0.00           C
ATOM     13  C11 CAF     1       3.500   3.600   0.000  1.00  0.00           C
ATOM     14  C12 CAF     1      -0.700   6.000   0.000  1.00  0.00           C
END`
    },
    'aspirin': {
        color: '#ef4444',
        emoji: '💊',
        formula: 'C₉H₈O₄',
        skeletal: 'Benzene ring with ester and carboxylic acid groups',
        functionalGroups: ['Carboxylic acid (-COOH)', 'Ester (-COO-)', 'Benzene ring'],
        pdb: `COMPND    ASPIRIN
ATOM      1  C1  ASP     1       0.000   0.000   0.000  1.00  0.00           C
ATOM      2  C2  ASP     1       1.400   0.000   0.000  1.00  0.00           C
ATOM      3  C3  ASP     1       2.100   1.200   0.000  1.00  0.00           C
ATOM      4  C4  ASP     1       1.400   2.400   0.000  1.00  0.00           C
ATOM      5  C5  ASP     1       0.000   2.400   0.000  1.00  0.00           C
ATOM      6  C6  ASP     1      -0.700   1.200   0.000  1.00  0.00           C
ATOM      7  C7  ASP     1      -2.100   1.200   0.000  1.00  0.00           C
ATOM      8  O1  ASP     1      -2.800   0.000   0.000  1.00  0.00           O
ATOM      9  O2  ASP     1      -2.800   2.400   0.000  1.00  0.00           O
ATOM     10  O3  ASP     1       2.100  -1.200   0.000  1.00  0.00           O
ATOM     11  C8  ASP     1       3.500  -1.200   0.000  1.00  0.00           C
ATOM     12  C9  ASP     1       4.200   0.000   0.000  1.00  0.00           C
ATOM     13  O4  ASP     1       4.200  -2.400   0.000  1.00  0.00           O
END`
    },
    'menthol': {
        color: '#10b981',
        emoji: '🌿',
        formula: 'C₁₀H₂₀O',
        skeletal: 'Cyclohexane ring with methyl, isopropyl, and hydroxyl groups',
        functionalGroups: ['Hydroxyl (-OH)', 'Cyclohexane ring', 'Isopropyl group'],
        pdb: `COMPND    MENTHOL
ATOM      1  C1  MEN     1       0.000   0.000   0.000  1.00  0.00           C
ATOM      2  C2  MEN     1       1.500   0.000   0.000  1.00  0.00           C
ATOM      3  C3  MEN     1       2.200   1.300   0.200  1.00  0.00           C
ATOM      4  C4  MEN     1       1.400   2.400  -0.500  1.00  0.00           C
ATOM      5  C5  MEN     1       0.000   2.200  -0.200  1.00  0.00           C
ATOM      6  C6  MEN     1      -0.700   1.100   0.200  1.00  0.00           C
ATOM      7  C7  MEN     1       2.100  -1.200   0.000  1.00  0.00           C
ATOM      8  O1  MEN     1       3.700   1.300   0.000  1.00  0.00           O
ATOM      9  C8  MEN     1      -2.200   1.100   0.000  1.00  0.00           C
ATOM     10  C9  MEN     1      -2.900   0.000   0.800  1.00  0.00           C
ATOM     11  C10 MEN     1      -2.900   1.000  -1.400  1.00  0.00           C
END`
    },
    'vanillin': {
        color: '#d97706',
        emoji: '🍦',
        formula: 'C₈H₈O₃',
        skeletal: 'Benzene ring with aldehyde, methoxy, and hydroxyl groups',
        functionalGroups: ['Aldehyde (-CHO)', 'Methoxy (-OCH₃)', 'Hydroxyl (-OH)', 'Benzene ring'],
        pdb: `COMPND    VANILLIN
ATOM      1  C1  VAN     1       0.000   0.000   0.000  1.00  0.00           C
ATOM      2  C2  VAN     1       1.400   0.000   0.000  1.00  0.00           C
ATOM      3  C3  VAN     1       2.100   1.200   0.000  1.00  0.00           C
ATOM      4  C4  VAN     1       1.400   2.400   0.000  1.00  0.00           C
ATOM      5  C5  VAN     1       0.000   2.400   0.000  1.00  0.00           C
ATOM      6  C6  VAN     1      -0.700   1.200   0.000  1.00  0.00           C
ATOM      7  C7  VAN     1      -2.100   1.200   0.000  1.00  0.00           C
ATOM      8  O1  VAN     1      -2.800   2.300   0.000  1.00  0.00           O
ATOM      9  O2  VAN     1      -0.700  -1.200   0.000  1.00  0.00           O
ATOM     10  O3  VAN     1       2.100   3.700   0.000  1.00  0.00           O
ATOM     11  C8  VAN     1       4.200   0.000   0.000  1.00  0.00           C
END`
    },
    'ethanol': {
        color: '#3b82f6',
        emoji: '🧪',
        formula: 'C₂H₆O',
        skeletal: 'Two-carbon chain with terminal hydroxyl group',
        functionalGroups: ['Hydroxyl (-OH)', 'Methyl (-CH₃)'],
        pdb: `COMPND    ETHANOL
ATOM      1  C1  ETH     1       0.000   0.000   0.000  1.00  0.00           C
ATOM      2  C2  ETH     1       1.500   0.000   0.000  1.00  0.00           C
ATOM      3  O1  ETH     1       2.100   1.300   0.000  1.00  0.00           O
ATOM      4  H1  ETH     1      -0.400  -1.000   0.000  1.00  0.00           H
ATOM      5  H2  ETH     1      -0.400   0.500   0.900  1.00  0.00           H
ATOM      6  H3  ETH     1      -0.400   0.500  -0.900  1.00  0.00           H
ATOM      7  H4  ETH     1       1.900  -0.500   0.900  1.00  0.00           H
ATOM      8  H5  ETH     1       1.900  -0.500  -0.900  1.00  0.00           H
ATOM      9  H6  ETH     1       3.100   1.200   0.000  1.00  0.00           H
END`
    },
    'methane': {
        color: '#6366f1',
        emoji: '⚛️',
        formula: 'CH₄',
        skeletal: 'Single carbon atom with four hydrogen atoms (tetrahedral)',
        functionalGroups: ['None - simplest hydrocarbon'],
        pdb: `COMPND    METHANE
ATOM      1  C   CH4     1       0.000   0.000   0.000  1.00  0.00           C
ATOM      2  H1  CH4     1       0.629   0.629   0.629  1.00  0.00           H
ATOM      3  H2  CH4     1      -0.629  -0.629   0.629  1.00  0.00           H
ATOM      4  H3  CH4     1       0.629  -0.629  -0.629  1.00  0.00           H
ATOM      5  H4  CH4     1      -0.629   0.629  -0.629  1.00  0.00           H
END`
    },
    'benzene': {
        color: '#ec4899',
        emoji: '⬡',
        formula: 'C₆H₆',
        skeletal: 'Regular hexagon with alternating double bonds (aromatic)',
        functionalGroups: ['Aromatic ring (6π electrons)'],
        pdb: `COMPND    BENZENE
ATOM      1  C1  BEN     1       1.400   0.000   0.000  1.00  0.00           C
ATOM      2  C2  BEN     1       0.700   1.212   0.000  1.00  0.00           C
ATOM      3  C3  BEN     1      -0.700   1.212   0.000  1.00  0.00           C
ATOM      4  C4  BEN     1      -1.400   0.000   0.000  1.00  0.00           C
ATOM      5  C5  BEN     1      -0.700  -1.212   0.000  1.00  0.00           C
ATOM      6  C6  BEN     1       0.700  -1.212   0.000  1.00  0.00           C
ATOM      7  H1  BEN     1       2.500   0.000   0.000  1.00  0.00           H
ATOM      8  H2  BEN     1       1.250   2.165   0.000  1.00  0.00           H
ATOM      9  H3  BEN     1      -1.250   2.165   0.000  1.00  0.00           H
ATOM     10  H4  BEN     1      -2.500   0.000   0.000  1.00  0.00           H
ATOM     11  H5  BEN     1      -1.250  -2.165   0.000  1.00  0.00           H
ATOM     12  H6  BEN     1       1.250  -2.165   0.000  1.00  0.00           H
END`
    },
    'limonene': {
        color: '#eab308',
        emoji: '🍋',
        formula: 'C₁₀H₁₆',
        skeletal: 'Cyclohexene ring with isopropenyl group (terpene)',
        functionalGroups: ['Cyclohexene ring', 'C=C double bond', 'Isopropenyl group'],
        pdb: `COMPND    LIMONENE
ATOM      1  C1  LIM     1       0.000   0.000   0.000  1.00  0.00           C
ATOM      2  C2  LIM     1       1.400   0.000   0.000  1.00  0.00           C
ATOM      3  C3  LIM     1       2.100   1.200   0.000  1.00  0.00           C
ATOM      4  C4  LIM     1       1.400   2.400   0.000  1.00  0.00           C
ATOM      5  C5  LIM     1      -0.200   2.300   0.000  1.00  0.00           C
ATOM      6  C6  LIM     1      -0.700   0.900   0.000  1.00  0.00           C
ATOM      7  C7  LIM     1       3.600   1.600   0.000  1.00  0.00           C
ATOM      8  C8  LIM     1       4.100   3.000   0.000  1.00  0.00           C
ATOM      9  C9  LIM     1      -0.600  -1.300   0.000  1.00  0.00           C
ATOM     10  C10 LIM     1      -2.000  -1.500   0.000  1.00  0.00           C
END`
    },
    'muscone': {
        color: '#a855f7',
        emoji: '🦌',
        formula: 'C₁₆H₃₀O',
        skeletal: '15-membered macrocyclic ketone ring',
        functionalGroups: ['Ketone (C=O)', 'Large ring (macrocycle)', 'Methyl group'],
        pdb: `COMPND    MUSCONE
ATOM      1  C1  MUS     1       0.000   0.000   0.000  1.00  0.00           C
ATOM      2  C2  MUS     1       1.500   0.000   0.000  1.00  0.00           C
ATOM      3  C3  MUS     1       2.200   1.300   0.000  1.00  0.00           C
ATOM      4  C4  MUS     1       3.700   1.300   0.000  1.00  0.00           C
ATOM      5  C5  MUS     1       4.400   2.600   0.000  1.00  0.00           C
ATOM      6  C6  MUS     1       5.900   2.600   0.000  1.00  0.00           C
ATOM      7  C7  MUS     1       6.600   1.300   0.000  1.00  0.00           C
ATOM      8  C8  MUS     1       6.000   0.000   0.000  1.00  0.00           C
ATOM      9  C9  MUS     1       4.500   0.000   0.000  1.00  0.00           C
ATOM     10  C10 MUS     1       3.800  -1.300   0.000  1.00  0.00           C
ATOM     11  C11 MUS     1       2.300  -1.300   0.000  1.00  0.00           C
ATOM     12  C12 MUS     1       1.600  -2.600   0.000  1.00  0.00           C
ATOM     13  C13 MUS     1       0.100  -2.600   0.000  1.00  0.00           C
ATOM     14  C14 MUS     1      -0.600  -1.300   0.000  1.00  0.00           C
ATOM     15  C15 MUS     1      -2.100  -1.300   0.000  1.00  0.00           C
ATOM     16  O1  MUS     1      -2.800  -2.300   0.000  1.00  0.00           O
END`
    },
    'civetone': {
        color: '#f472b6',
        emoji: '🐱',
        formula: 'C₁₇H₃₀O',
        skeletal: '17-membered macrocyclic ketone with cis double bond',
        functionalGroups: ['Ketone (C=O)', 'Macrocycle', 'C=C double bond (cis)'],
        pdb: `COMPND    CIVETONE
ATOM      1  C1  CIV     1       0.000   0.000   0.000  1.00  0.00           C
ATOM      2  C2  CIV     1       1.500   0.000   0.000  1.00  0.00           C
ATOM      3  C3  CIV     1       2.200   1.300   0.200  1.00  0.00           C
ATOM      4  C4  CIV     1       3.700   1.400   0.300  1.00  0.00           C
ATOM      5  C5  CIV     1       4.500   0.200   0.400  1.00  0.00           C
ATOM      6  C6  CIV     1       6.000   0.300   0.500  1.00  0.00           C
ATOM      7  C7  CIV     1       6.800   1.500   0.600  1.00  0.00           C
ATOM      8  C8  CIV     1       8.300   1.400   0.700  1.00  0.00           C
ATOM      9  C9  CIV     1       9.100   0.200   0.600  1.00  0.00           C
ATOM     10  C10 CIV     1       8.500  -1.100   0.400  1.00  0.00           C
ATOM     11  C11 CIV     1       7.000  -1.200   0.300  1.00  0.00           C
ATOM     12  C12 CIV     1       6.200  -2.400   0.200  1.00  0.00           C
ATOM     13  C13 CIV     1       4.700  -2.500   0.100  1.00  0.00           C
ATOM     14  C14 CIV     1       3.900  -1.300   0.000  1.00  0.00           C
ATOM     15  C15 CIV     1       2.400  -1.400  -0.100  1.00  0.00           C
ATOM     16  C16 CIV     1       1.600  -2.600  -0.200  1.00  0.00           C
ATOM     17  C17 CIV     1       0.100  -2.500  -0.100  1.00  0.00           C
ATOM     18  O1  CIV     1      -0.700  -1.400   0.000  1.00  0.00           O
END`
    },
    'frontalin': {
        color: '#22c55e',
        emoji: '🪲',
        formula: 'C₈H₁₄O₂',
        skeletal: 'Bicyclic ketal (two fused rings with oxygens)',
        functionalGroups: ['Ketal (C bonded to 2 oxygens)', 'Bicyclic ring'],
        pdb: `COMPND    FRONTALIN
ATOM      1  C1  FRO     1       0.000   0.000   0.000  1.00  0.00           C
ATOM      2  C2  FRO     1       1.500   0.000   0.000  1.00  0.00           C
ATOM      3  O1  FRO     1       2.000   1.300   0.000  1.00  0.00           O
ATOM      4  C3  FRO     1       1.200   2.400   0.000  1.00  0.00           C
ATOM      5  C4  FRO     1      -0.300   2.200   0.000  1.00  0.00           C
ATOM      6  O2  FRO     1      -0.800   0.900   0.000  1.00  0.00           O
ATOM      7  C5  FRO     1       1.600   3.800   0.000  1.00  0.00           C
ATOM      8  C6  FRO     1       2.200  -1.200   0.000  1.00  0.00           C
END`
    },
    'thioacetone': {
        color: '#fbbf24',
        emoji: '💀',
        formula: 'C₃H₆S',
        skeletal: 'Three-carbon with central thioketone (C=S)',
        functionalGroups: ['Thioketone (C=S)', 'Methyl groups'],
        pdb: `COMPND    THIOACETONE
ATOM      1  C1  THI     1       0.000   0.000   0.000  1.00  0.00           C
ATOM      2  C2  THI     1       1.500   0.000   0.000  1.00  0.00           C
ATOM      3  S1  THI     1       2.300   1.500   0.000  1.00  0.00           S
ATOM      4  C3  THI     1      -0.700   1.300   0.000  1.00  0.00           C
END`
    },
    'azulene': {
        color: '#3b82f6',
        emoji: '💎',
        formula: 'C₁₀H₈',
        skeletal: 'Fused 5-membered and 7-membered aromatic rings (blue color!)',
        functionalGroups: ['Non-benzenoid aromatic', 'Fused ring system'],
        pdb: `COMPND    AZULENE
ATOM      1  C1  AZU     1       0.000   0.000   0.000  1.00  0.00           C
ATOM      2  C2  AZU     1       1.400   0.000   0.000  1.00  0.00           C
ATOM      3  C3  AZU     1       2.100   1.200   0.000  1.00  0.00           C
ATOM      4  C4  AZU     1       1.400   2.400   0.000  1.00  0.00           C
ATOM      5  C5  AZU     1       0.000   2.400   0.000  1.00  0.00           C
ATOM      6  C6  AZU     1      -0.700   1.200   0.000  1.00  0.00           C
ATOM      7  C7  AZU     1      -0.700   3.600   0.000  1.00  0.00           C
ATOM      8  C8  AZU     1       2.100   3.600   0.000  1.00  0.00           C
ATOM      9  C9  AZU     1       1.400   4.800   0.000  1.00  0.00           C
ATOM     10  C10 AZU     1       0.000   4.800   0.000  1.00  0.00           C
END`
    },
    'retinal': {
        color: '#f97316',
        emoji: '👁️',
        formula: 'C₂₀H₂₈O',
        skeletal: 'Conjugated polyene chain with cyclohexene ring and aldehyde',
        functionalGroups: ['Aldehyde (-CHO)', 'Conjugated double bonds', 'Cyclohexene ring'],
        pdb: `COMPND    RETINAL
ATOM      1  C1  RET     1       0.000   0.000   0.000  1.00  0.00           C
ATOM      2  C2  RET     1       1.400   0.000   0.000  1.00  0.00           C
ATOM      3  C3  RET     1       2.100   1.200   0.000  1.00  0.00           C
ATOM      4  C4  RET     1       3.600   1.200   0.000  1.00  0.00           C
ATOM      5  C5  RET     1       4.300   2.400   0.000  1.00  0.00           C
ATOM      6  C6  RET     1       5.800   2.400   0.000  1.00  0.00           C
ATOM      7  C7  RET     1       6.500   3.600   0.000  1.00  0.00           C
ATOM      8  C8  RET     1       8.000   3.600   0.000  1.00  0.00           C
ATOM      9  C9  RET     1       8.700   4.800   0.000  1.00  0.00           C
ATOM     10  C10 RET     1      10.200   4.800   0.000  1.00  0.00           C
ATOM     11  C11 RET     1      10.900   6.000   0.000  1.00  0.00           C
ATOM     12  C12 RET     1      12.400   6.000   0.000  1.00  0.00           C
ATOM     13  C13 RET     1      13.100   7.200   0.000  1.00  0.00           C
ATOM     14  C14 RET     1      14.600   7.200   0.000  1.00  0.00           C
ATOM     15  C15 RET     1      15.300   8.400   0.000  1.00  0.00           C
ATOM     16  O1  RET     1      16.500   8.400   0.000  1.00  0.00           O
ATOM     17  C16 RET     1      -0.700   1.200   0.000  1.00  0.00           C
ATOM     18  C17 RET     1      -0.700  -1.200   0.000  1.00  0.00           C
ATOM     19  C18 RET     1       1.400   2.400   0.000  1.00  0.00           C
ATOM     20  C19 RET     1       8.700   2.400   0.000  1.00  0.00           C
ATOM     21  C20 RET     1      13.100   4.800   0.000  1.00  0.00           C
END`
    },
    'damascenone': {
        color: '#ec4899',
        emoji: '🌹',
        formula: 'C₁₃H₁₈O',
        skeletal: 'Rose ketone with cyclohexene and conjugated system',
        functionalGroups: ['Ketone (C=O)', 'Conjugated double bonds', 'Cyclohexene ring'],
        pdb: `COMPND    DAMASCENONE
ATOM      1  C1  DAM     1       0.000   0.000   0.000  1.00  0.00           C
ATOM      2  C2  DAM     1       1.400   0.000   0.000  1.00  0.00           C
ATOM      3  C3  DAM     1       2.100   1.200   0.000  1.00  0.00           C
ATOM      4  C4  DAM     1       1.400   2.400   0.000  1.00  0.00           C
ATOM      5  C5  DAM     1       0.000   2.400   0.000  1.00  0.00           C
ATOM      6  C6  DAM     1      -0.700   1.200   0.000  1.00  0.00           C
ATOM      7  C7  DAM     1       3.600   1.200   0.000  1.00  0.00           C
ATOM      8  C8  DAM     1       4.300   2.400   0.000  1.00  0.00           C
ATOM      9  C9  DAM     1       5.800   2.400   0.000  1.00  0.00           C
ATOM     10  O1  DAM     1       6.500   3.500   0.000  1.00  0.00           O
ATOM     11  C10 DAM     1       6.500   1.100   0.000  1.00  0.00           C
ATOM     12  C11 DAM     1      -0.700  -1.200   0.000  1.00  0.00           C
ATOM     13  C12 DAM     1       2.100   3.700   0.000  1.00  0.00           C
END`
    },
    'quinine': {
        color: '#06b6d4',
        emoji: '💊',
        formula: 'C₂₀H₂₄N₂O₂',
        skeletal: 'Quinoline-quinuclidine alkaloid from cinchona bark',
        functionalGroups: ['Quinoline ring', 'Quinuclidine bicyclic', 'Methoxy (-OCH₃)', 'Vinyl group'],
        pdb: `COMPND    QUININE
ATOM      1  N1  QUI     1       0.000   0.000   0.000  1.00  0.00           N
ATOM      2  C2  QUI     1       1.400   0.000   0.000  1.00  0.00           C
ATOM      3  C3  QUI     1       2.100   1.200   0.000  1.00  0.00           C
ATOM      4  C4  QUI     1       1.400   2.400   0.000  1.00  0.00           C
ATOM      5  C5  QUI     1       0.000   2.400   0.000  1.00  0.00           C
ATOM      6  C6  QUI     1      -0.700   1.200   0.000  1.00  0.00           C
ATOM      7  C7  QUI     1       3.600   1.200   0.000  1.00  0.00           C
ATOM      8  C8  QUI     1       4.300   2.400   0.000  1.00  0.00           C
ATOM      9  C9  QUI     1       3.600   3.600   0.000  1.00  0.00           C
ATOM     10  N2  QUI     1       2.100   3.600   0.000  1.00  0.00           N
ATOM     11  O1  QUI     1      -2.100   1.200   0.000  1.00  0.00           O
ATOM     12  C10 QUI     1      -2.800   2.400   0.000  1.00  0.00           C
ATOM     13  C11 QUI     1       5.000   0.000   1.000  1.00  0.00           C
ATOM     14  C12 QUI     1       6.000   0.000   1.500  1.00  0.00           C
ATOM     15  O2  QUI     1       5.800   3.600   0.000  1.00  0.00           O
END`
    },
    'penicillin g': {
        color: '#22c55e',
        emoji: '🦠',
        formula: 'C₁₆H₁₈N₂O₄S',
        skeletal: 'Beta-lactam ring fused to thiazolidine - the first antibiotic',
        functionalGroups: ['β-lactam (4-membered ring)', 'Thiazolidine ring', 'Amide', 'Carboxylic acid'],
        pdb: `COMPND    PENICILLIN G
ATOM      1  S1  PEN     1       0.000   0.000   0.000  1.00  0.00           S
ATOM      2  C2  PEN     1       1.500   0.500   0.500  1.00  0.00           C
ATOM      3  C3  PEN     1       2.300   1.500   0.000  1.00  0.00           C
ATOM      4  N1  PEN     1       1.500   2.500  -0.500  1.00  0.00           N
ATOM      5  C4  PEN     1       0.200   2.000   0.000  1.00  0.00           C
ATOM      6  C5  PEN     1       3.700   1.500   0.000  1.00  0.00           C
ATOM      7  O1  PEN     1       4.400   2.500   0.000  1.00  0.00           O
ATOM      8  N2  PEN     1       4.200   0.300   0.000  1.00  0.00           N
ATOM      9  C6  PEN     1       5.600   0.000   0.000  1.00  0.00           C
ATOM     10  C7  PEN     1       6.300   1.200   0.000  1.00  0.00           C
ATOM     11  C8  PEN     1       7.700   1.200   0.000  1.00  0.00           C
ATOM     12  C9  PEN     1       8.400   0.000   0.000  1.00  0.00           C
ATOM     13  C10 PEN     1       7.700  -1.200   0.000  1.00  0.00           C
ATOM     14  C11 PEN     1       6.300  -1.200   0.000  1.00  0.00           C
ATOM     15  C12 PEN     1      -0.800   2.800   0.500  1.00  0.00           C
ATOM     16  O2  PEN     1      -1.500   3.500   0.000  1.00  0.00           O
ATOM     17  O3  PEN     1      -1.000   2.500   1.800  1.00  0.00           O
END`
    },
    'taxol': {
        color: '#a855f7',
        emoji: '🌲',
        formula: 'C₄₇H₅₁NO₁₄',
        skeletal: 'Complex diterpene with 11 chiral centers - anticancer drug',
        functionalGroups: ['Ester groups', 'Amide', 'Hydroxyl groups', 'Epoxide', 'Oxetane ring'],
        pdb: `COMPND    TAXOL (PACLITAXEL)
ATOM      1  C1  TAX     1       0.000   0.000   0.000  1.00  0.00           C
ATOM      2  C2  TAX     1       1.540   0.000   0.000  1.00  0.00           C
ATOM      3  C3  TAX     1       2.100   1.400   0.000  1.00  0.00           C
ATOM      4  C4  TAX     1       1.300   2.500   0.500  1.00  0.00           C
ATOM      5  C5  TAX     1      -0.200   2.300   0.200  1.00  0.00           C
ATOM      6  C6  TAX     1      -0.700   0.900   0.500  1.00  0.00           C
ATOM      7  C7  TAX     1       3.600   1.600   0.000  1.00  0.00           C
ATOM      8  O1  TAX     1       4.200   2.700   0.000  1.00  0.00           O
ATOM      9  C8  TAX     1       4.400   0.400   0.000  1.00  0.00           C
ATOM     10  C9  TAX     1       4.000  -1.000   0.000  1.00  0.00           C
ATOM     11  C10 TAX     1       2.500  -1.200   0.000  1.00  0.00           C
ATOM     12  O2  TAX     1      -2.000   0.700   0.000  1.00  0.00           O
ATOM     13  C11 TAX     1       5.900   0.500   0.000  1.00  0.00           C
ATOM     14  O3  TAX     1       6.600   1.500   0.000  1.00  0.00           O
ATOM     15  N1  TAX     1       6.500  -0.700   0.000  1.00  0.00           N
ATOM     16  C12 TAX     1       7.900  -0.800   0.000  1.00  0.00           C
ATOM     17  O4  TAX     1      -1.000   3.200  -0.500  1.00  0.00           O
END`
    },
    'atorvastatin': {
        color: '#ef4444',
        emoji: '❤️',
        formula: 'C₃₃H₃₅FN₂O₅',
        skeletal: 'Lipitor - HMG-CoA reductase inhibitor with pyrrole core',
        functionalGroups: ['Pyrrole ring', 'Fluorophenyl', 'Carboxylic acid', 'Hydroxyl groups'],
        pdb: `COMPND    ATORVASTATIN (LIPITOR)
ATOM      1  N1  ATV     1       0.000   0.000   0.000  1.00  0.00           N
ATOM      2  C2  ATV     1       1.200   0.700   0.000  1.00  0.00           C
ATOM      3  C3  ATV     1       1.200   2.100   0.000  1.00  0.00           C
ATOM      4  C4  ATV     1      -0.100   2.500   0.000  1.00  0.00           C
ATOM      5  C5  ATV     1      -0.900   1.300   0.000  1.00  0.00           C
ATOM      6  C6  ATV     1       2.400   0.000   0.000  1.00  0.00           C
ATOM      7  C7  ATV     1       3.700   0.500   0.000  1.00  0.00           C
ATOM      8  C8  ATV     1       4.900  -0.200   0.000  1.00  0.00           C
ATOM      9  C9  ATV     1       4.900  -1.600   0.000  1.00  0.00           C
ATOM     10  C10 ATV     1       3.700  -2.300   0.000  1.00  0.00           C
ATOM     11  C11 ATV     1       2.500  -1.400   0.000  1.00  0.00           C
ATOM     12  F1  ATV     1       6.100  -2.200   0.000  1.00  0.00           F
ATOM     13  C12 ATV     1      -2.300   1.300   0.000  1.00  0.00           C
ATOM     14  C13 ATV     1      -3.100   2.400   0.000  1.00  0.00           C
ATOM     15  O1  ATV     1      -4.300   2.200   0.000  1.00  0.00           O
ATOM     16  O2  ATV     1      -2.600   3.600   0.000  1.00  0.00           O
END`
    },
    'omeprazole': {
        color: '#8b5cf6',
        emoji: '💜',
        formula: 'C₁₇H₁₉N₃O₃S',
        skeletal: 'Proton pump inhibitor with benzimidazole and pyridine',
        functionalGroups: ['Benzimidazole', 'Pyridine', 'Sulfoxide (S=O)', 'Methoxy groups'],
        pdb: `COMPND    OMEPRAZOLE
ATOM      1  N1  OMP     1       0.000   0.000   0.000  1.00  0.00           N
ATOM      2  C2  OMP     1       1.300   0.000   0.000  1.00  0.00           C
ATOM      3  N2  OMP     1       2.000   1.200   0.000  1.00  0.00           N
ATOM      4  C3  OMP     1       1.200   2.300   0.000  1.00  0.00           C
ATOM      5  C4  OMP     1      -0.200   2.000   0.000  1.00  0.00           C
ATOM      6  C5  OMP     1      -0.700   0.700   0.000  1.00  0.00           C
ATOM      7  C6  OMP     1       2.000  -1.200   0.000  1.00  0.00           C
ATOM      8  S1  OMP     1       3.600  -1.000   0.000  1.00  0.00           S
ATOM      9  O1  OMP     1       4.000  -1.000   1.400  1.00  0.00           O
ATOM     10  C7  OMP     1       4.200   0.600   0.000  1.00  0.00           C
ATOM     11  N3  OMP     1       5.500   0.900   0.000  1.00  0.00           N
ATOM     12  C8  OMP     1       5.800   2.200   0.000  1.00  0.00           C
ATOM     13  C9  OMP     1       4.700   3.000   0.000  1.00  0.00           C
ATOM     14  C10 OMP     1       3.500   2.300   0.000  1.00  0.00           C
ATOM     15  C11 OMP     1       3.500   0.900   0.000  1.00  0.00           C
ATOM     16  O2  OMP     1       1.500   3.600   0.000  1.00  0.00           O
ATOM     17  O3  OMP     1       6.200  -1.500   0.000  1.00  0.00           O
END`
    },
};

type ViewStyle = 'stick' | 'sphere' | 'line' | 'cartoon';

export default function MoleculeViewer({
    moleculeName,
    description,
    height = 350
}: MoleculeViewerProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const viewerRef = useRef<any>(null);
    const rotationRef = useRef<number | null>(null);
    const [viewStyle, setViewStyle] = useState<ViewStyle>('stick');
    const [isLoading, setIsLoading] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isRotating, setIsRotating] = useState(false);
    const isMobile = useIsMobile();

    const molecule = moleculeData[moleculeName.toLowerCase()];
    const hasMolecule = !!molecule;

    // Load 3D viewer only when expanded
    useEffect(() => {
        if (!isExpanded || !containerRef.current || !hasMolecule) return;

        const loadViewer = async () => {
            setIsLoading(true);

            // Wait for DOM to be ready (important for mobile)
            await new Promise(resolve => setTimeout(resolve, 100));

            if (!containerRef.current) {
                setIsLoading(false);
                return;
            }

            try {
                // Dynamically import 3Dmol
                const $3Dmol = await import('3dmol');

                // Clear previous viewer
                if (viewerRef.current) {
                    viewerRef.current.clear();
                }

                // Ensure container has dimensions
                const container = containerRef.current;
                const rect = container.getBoundingClientRect();
                if (rect.width === 0 || rect.height === 0) {
                    console.warn('Container has no dimensions, retrying...');
                    await new Promise(resolve => setTimeout(resolve, 200));
                }

                // Create new viewer with mobile-optimized options
                const viewer = $3Dmol.createViewer(container, {
                    backgroundColor: 'rgba(10, 10, 15, 0.95)',
                    antialias: !isMobile, // Disable antialiasing on mobile for performance
                    disableFog: isMobile, // Disable fog on mobile
                });

                viewerRef.current = viewer;

                viewer.addModel(molecule.pdb, 'pdb');
                applyStyle(viewer, viewStyle, molecule.color);
                viewer.zoomTo();
                viewer.render();

                // Force a resize to ensure proper rendering on mobile
                if (isMobile) {
                    setTimeout(() => {
                        if (viewerRef.current) {
                            viewerRef.current.resize();
                            viewerRef.current.render();
                        }
                    }, 100);
                }

                // Stop rotation when user interacts with the viewer
                const stopRotationOnInteraction = () => {
                    if (rotationRef.current) {
                        cancelAnimationFrame(rotationRef.current);
                        rotationRef.current = null;
                        setIsRotating(false);
                    }
                };

                containerRef.current?.addEventListener('mousedown', stopRotationOnInteraction);
                containerRef.current?.addEventListener('touchstart', stopRotationOnInteraction);
                containerRef.current?.addEventListener('wheel', stopRotationOnInteraction);

            } catch (error) {
                console.error('Failed to load 3Dmol:', error);
            }

            setIsLoading(false);
        };

        loadViewer();

        return () => {
            if (rotationRef.current) {
                cancelAnimationFrame(rotationRef.current);
            }
            if (viewerRef.current) {
                viewerRef.current.clear();
                viewerRef.current = null;
            }
        };
    }, [isExpanded, moleculeName, hasMolecule]);

    useEffect(() => {
        if (viewerRef.current && hasMolecule) {
            applyStyle(viewerRef.current, viewStyle, molecule.color);
            viewerRef.current.render();
        }
    }, [viewStyle, moleculeName, hasMolecule, molecule?.color]);

    const applyStyle = (viewer: any, style: ViewStyle, color: string) => {
        viewer.setStyle({}, {});
        viewer.removeAllLabels();

        // Define element colors for reference (Jmol scheme)
        const elementColors: Record<string, string> = {
            'C': '#909090', // Gray - Carbon
            'O': '#FF0D0D', // Red - Oxygen  
            'N': '#3050F8', // Blue - Nitrogen
            'H': '#FFFFFF', // White - Hydrogen
            'S': '#FFFF00', // Yellow - Sulfur
            'F': '#90E050', // Light green - Fluorine
            'Cl': '#1FF01F', // Green - Chlorine
            'Br': '#A62929', // Brown - Bromine
        };

        switch (style) {
            case 'stick':
                // Ball and stick with clear bonds
                viewer.setStyle({}, {
                    stick: { radius: 0.12, colorscheme: 'Jmol' },
                    sphere: { scale: 0.3, colorscheme: 'Jmol' }
                });
                break;
            case 'sphere':
                // Large spheres to show atoms clearly
                viewer.setStyle({}, {
                    sphere: { scale: 0.9, colorscheme: 'Jmol' }
                });
                // Add labels on spheres
                const atoms = viewer.getModel().atoms;
                atoms.forEach((atom: any) => {
                    if (atom.elem !== 'H') { // Skip hydrogen labels for clarity
                        viewer.addLabel(atom.elem, {
                            position: { x: atom.x, y: atom.y, z: atom.z },
                            backgroundColor: 'rgba(0,0,0,0.7)',
                            fontColor: elementColors[atom.elem] || '#FFFFFF',
                            fontSize: 14,
                            fontOpacity: 1,
                            borderRadius: 4,
                            padding: 2,
                        });
                    }
                });
                break;
            case 'line':
                viewer.setStyle({}, {
                    line: { colorscheme: 'Jmol', linewidth: 2 }
                });
                break;
            case 'cartoon':
                // Custom colored representation
                viewer.setStyle({}, {
                    stick: { radius: 0.25, color: color },
                    sphere: { scale: 0.45, color: color }
                });
                break;
        }
    };

    const startRotation = () => {
        if (!viewerRef.current) return;

        const rotate = () => {
            if (viewerRef.current && isRotating) {
                viewerRef.current.rotate(0.5, 'y');
                viewerRef.current.render();
                rotationRef.current = requestAnimationFrame(rotate);
            }
        };
        rotate();
    };

    const stopRotation = () => {
        if (rotationRef.current) {
            cancelAnimationFrame(rotationRef.current);
            rotationRef.current = null;
        }
    };

    // Handle rotation state changes
    useEffect(() => {
        if (isRotating && viewerRef.current && isExpanded) {
            startRotation();
        } else {
            stopRotation();
        }
        return () => stopRotation();
    }, [isRotating, isExpanded]);

    const handleStyleChange = (style: ViewStyle) => {
        setViewStyle(style);
    };

    const toggleRotation = () => {
        setIsRotating(!isRotating);
    };

    const handleClose = () => {
        setIsExpanded(false);
        if (viewerRef.current) {
            viewerRef.current.clear();
            viewerRef.current = null;
        }
    };

    // Placeholder card when not expanded
    if (!isExpanded) {
        return (
            <motion.div
                className="molecule-viewer-container"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                style={{
                    background: hasMolecule
                        ? `linear-gradient(135deg, ${molecule.color}15 0%, rgba(30, 30, 46, 0.95) 50%)`
                        : 'var(--gradient-card)',
                    cursor: hasMolecule ? 'pointer' : 'default',
                }}
                onClick={() => hasMolecule && setIsExpanded(true)}
                whileHover={hasMolecule ? { scale: 1.02, y: -4 } : {}}
                whileTap={hasMolecule ? { scale: 0.98 } : {}}
            >
                <div style={{
                    padding: '2rem',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '180px',
                    textAlign: 'center',
                }}>
                    {hasMolecule ? (
                        <>
                            <span style={{ fontSize: '3.5rem', marginBottom: '0.75rem' }}>
                                {molecule.emoji}
                            </span>
                            <h4 style={{
                                margin: 0,
                                fontSize: '1.2rem',
                                color: 'var(--neutral-100)',
                                fontWeight: 600,
                                marginBottom: '0.25rem',
                            }}>
                                {moleculeName}
                            </h4>
                            {/* Chemical Formula */}
                            <div style={{
                                fontSize: '1.1rem',
                                fontWeight: 600,
                                color: molecule.color,
                                marginBottom: '0.5rem',
                                fontFamily: 'monospace',
                            }}>
                                {molecule.formula}
                            </div>
                            {/* Skeletal Description */}
                            <p style={{
                                margin: '0 0 0.75rem',
                                fontSize: '0.8rem',
                                color: 'var(--neutral-400)',
                                lineHeight: 1.4,
                                textAlign: 'center',
                            }}>
                                📐 {molecule.skeletal}
                            </p>
                            {/* Functional Groups */}
                            <div style={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: '6px',
                                justifyContent: 'center',
                                marginBottom: '1rem',
                            }}>
                                {molecule.functionalGroups.map((group, i) => (
                                    <span
                                        key={i}
                                        style={{
                                            background: `${molecule.color}20`,
                                            color: molecule.color,
                                            padding: '3px 8px',
                                            borderRadius: '6px',
                                            fontSize: '0.7rem',
                                            fontWeight: 500,
                                        }}
                                    >
                                        {group}
                                    </span>
                                ))}
                            </div>
                            {description && (
                                <p style={{
                                    margin: '0 0 0.75rem',
                                    fontSize: '0.8rem',
                                    color: 'var(--neutral-500)',
                                    lineHeight: 1.4,
                                }}>
                                    {description}
                                </p>
                            )}
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                style={{
                                    padding: '10px 24px',
                                    background: `linear-gradient(135deg, ${molecule.color} 0%, ${molecule.color}cc 100%)`,
                                    border: 'none',
                                    borderRadius: '12px',
                                    color: 'white',
                                    fontSize: '0.9rem',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    boxShadow: `0 4px 20px ${molecule.color}40`,
                                }}
                            >
                                <span>🔬</span>
                                View 3D Model
                            </motion.button>
                        </>
                    ) : (
                        <>
                            <span style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.5 }}>🧬</span>
                            <h4 style={{
                                margin: 0,
                                fontSize: '1.1rem',
                                color: 'var(--neutral-300)',
                                fontWeight: 600,
                            }}>
                                {moleculeName}
                            </h4>
                            <p style={{
                                margin: '0.5rem 0 0',
                                fontSize: '0.8rem',
                                color: 'var(--neutral-500)',
                            }}>
                                3D model coming soon
                            </p>
                        </>
                    )}
                </div>
            </motion.div>
        );
    }

    // Expanded 3D viewer
    return (
        <motion.div
            className="molecule-viewer-container"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
        >
            {/* Header */}
            <div style={{
                padding: '1rem 1.5rem',
                borderBottom: '1px solid var(--card-border)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <div>
                    <h4 style={{
                        margin: 0,
                        fontSize: '1.1rem',
                        color: 'var(--neutral-100)',
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                    }}>
                        <span>{molecule?.emoji || '🧬'}</span>
                        {moleculeName}
                        <span style={{
                            fontFamily: 'monospace',
                            color: molecule?.color || 'var(--primary-400)',
                            fontSize: '0.95rem',
                        }}>
                            {molecule?.formula}
                        </span>
                    </h4>
                    <p style={{
                        margin: '0.25rem 0 0',
                        fontSize: '0.8rem',
                        color: 'var(--neutral-400)',
                    }}>
                        📐 {molecule?.skeletal || description}
                    </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span className="badge">3D Interactive</span>
                    <button
                        onClick={handleClose}
                        style={{
                            padding: '8px 14px',
                            background: 'rgba(255, 255, 255, 0.1)',
                            border: 'none',
                            borderRadius: '8px',
                            color: 'var(--neutral-300)',
                            fontSize: '0.8rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                        }}
                    >
                        ✕ Close
                    </button>
                </div>
            </div>

            {/* Viewer */}
            <div style={{ position: 'relative' }}>
                <AnimatePresence>
                    {isLoading && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            style={{
                                position: 'absolute',
                                inset: 0,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                background: 'var(--neutral-900)',
                                zIndex: 10
                            }}
                        >
                            <div style={{ textAlign: 'center' }}>
                                <div style={{
                                    fontSize: '2rem',
                                    marginBottom: '0.5rem',
                                    animation: 'pulse 1.5s infinite',
                                }}>
                                    🔬
                                </div>
                                <div style={{ color: 'var(--primary-400)' }}>
                                    Loading 3D model...
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
                <div
                    ref={containerRef}
                    style={{
                        width: '100%',
                        height: isMobile ? '280px' : `${height}px`,
                        position: 'relative',
                        zIndex: 1,
                        touchAction: 'none', // Prevent scroll interference on mobile
                        WebkitUserSelect: 'none',
                        userSelect: 'none',
                    }}
                />
            </div>

            {/* Controls */}
            <div className="molecule-controls">
                <button
                    className={viewStyle === 'stick' ? 'active' : ''}
                    onClick={() => handleStyleChange('stick')}
                >
                    Stick
                </button>
                <button
                    className={viewStyle === 'sphere' ? 'active' : ''}
                    onClick={() => handleStyleChange('sphere')}
                >
                    Sphere
                </button>
                <button
                    className={viewStyle === 'line' ? 'active' : ''}
                    onClick={() => handleStyleChange('line')}
                >
                    Line
                </button>
                <button
                    className={viewStyle === 'cartoon' ? 'active' : ''}
                    onClick={() => handleStyleChange('cartoon')}
                >
                    Colored
                </button>
                <div style={{ flex: 1 }} />
                <button onClick={toggleRotation}>
                    {isRotating ? '⏸ Pause' : '▶ Rotate'}
                </button>
            </div>

            {/* Element Color Legend */}
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '16px',
                flexWrap: 'wrap',
                padding: '10px 16px',
                background: 'rgba(0, 0, 0, 0.3)',
                borderRadius: '12px',
                margin: '12px 16px 0',
            }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--neutral-400)', marginRight: '4px' }}>Colors:</span>
                {[
                    { symbol: 'C', name: 'Carbon', color: '#909090' },
                    { symbol: 'O', name: 'Oxygen', color: '#FF0D0D' },
                    { symbol: 'N', name: 'Nitrogen', color: '#3050F8' },
                    { symbol: 'H', name: 'Hydrogen', color: '#FFFFFF' },
                    { symbol: 'S', name: 'Sulfur', color: '#FFFF30' },
                ].map(el => (
                    <div key={el.symbol} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '0.7rem',
                        color: 'var(--neutral-300)',
                    }}>
                        <span style={{
                            width: '12px',
                            height: '12px',
                            borderRadius: '50%',
                            background: el.color,
                            border: el.symbol === 'H' ? '1px solid #666' : 'none',
                            boxShadow: `0 0 6px ${el.color}60`,
                        }} />
                        <span style={{ fontWeight: 600 }}>{el.symbol}</span>
                        <span style={{ color: 'var(--neutral-500)' }}>{el.name}</span>
                    </div>
                ))}
            </div>
        </motion.div>
    );
}
