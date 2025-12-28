/**
 * Chapter 3: Determining Organic Structures
 * Molecule data for 3D visualization
 */

import { MoleculeRegistry } from '../../moleculeTypes';

export const chapter3Molecules: MoleculeRegistry = {
    // ========================================
    // Module 1: Mass Spectrometry
    // ========================================

    // Honey Bee Alarm Pheromone (Isopentyl acetate) - MS example
    'isopentyl acetate': {
        color: '#f59e0b',
        emoji: '🐝',
        formula: 'C₇H₁₄O₂',
        skeletal: 'Banana-scented ester - bee alarm pheromone (MW = 130)',
        functionalGroups: ['Ester (-COO-)', 'Alkyl chain'],
        pubchemCid: 31276,
        pdb: `COMPND    ISOPENTYL ACETATE
ATOM      1  C1  IPA     1       0.000   0.000   0.000  1.00  0.00           C
ATOM      2  C2  IPA     1       1.500   0.000   0.000  1.00  0.00           C
ATOM      3  O1  IPA     1       2.100   1.200   0.000  1.00  0.00           O
ATOM      4  O2  IPA     1       2.100  -1.100   0.000  1.00  0.00           O
ATOM      5  C3  IPA     1       3.500  -1.100   0.000  1.00  0.00           C
ATOM      6  C4  IPA     1       4.200   0.200   0.000  1.00  0.00           C
ATOM      7  C5  IPA     1       5.700   0.200   0.000  1.00  0.00           C
ATOM      8  C6  IPA     1       6.400   1.500   0.000  1.00  0.00           C
ATOM      9  C7  IPA     1       6.400  -1.100   0.000  1.00  0.00           C
END`
    },

    // Propan-2-ol (Isopropanol) - MS fragmentation example
    'propan-2-ol': {
        color: '#3b82f6',
        emoji: '🧴',
        formula: 'C₃H₈O',
        skeletal: 'Secondary alcohol - common solvent (MW = 60)',
        functionalGroups: ['Hydroxyl (-OH)', 'Secondary carbon'],
        pubchemCid: 3776,
        pdb: `COMPND    PROPAN-2-OL
ATOM      1  C1  IPR     1      -1.270   0.000   0.000  1.00  0.00           C
ATOM      2  C2  IPR     1       0.000   0.500   0.000  1.00  0.00           C
ATOM      3  C3  IPR     1       1.270   0.000   0.000  1.00  0.00           C
ATOM      4  O1  IPR     1       0.000   1.900   0.000  1.00  0.00           O
ATOM      5  H1  IPR     1      -1.270  -1.100   0.000  1.00  0.00           H
ATOM      6  H2  IPR     1      -2.100   0.400   0.800  1.00  0.00           H
ATOM      7  H3  IPR     1      -2.100   0.400  -0.800  1.00  0.00           H
ATOM      8  H4  IPR     1       1.270  -1.100   0.000  1.00  0.00           H
ATOM      9  H5  IPR     1       2.100   0.400   0.800  1.00  0.00           H
ATOM     10  H6  IPR     1       2.100   0.400  -0.800  1.00  0.00           H
ATOM     11  H7  IPR     1       0.000   2.400   0.850  1.00  0.00           H
END`
    },

    // Chloroform - Isotope pattern example
    'chloroform': {
        color: '#22c55e',
        emoji: '🧪',
        formula: 'CHCl₃',
        skeletal: 'Trihalomethane - shows complex isotope pattern',
        functionalGroups: ['C-Cl bonds (x3)'],
        pubchemCid: 6212,
        pdb: `COMPND    CHLOROFORM
ATOM      1  C   CHF     1       0.000   0.000   0.000  1.00  0.00           C
ATOM      2  CL1 CHF     1       1.750   0.000   0.000  1.00  0.00          CL
ATOM      3  CL2 CHF     1      -0.875   1.515   0.000  1.00  0.00          CL
ATOM      4  CL3 CHF     1      -0.875  -1.515   0.000  1.00  0.00          CL
ATOM      5  H   CHF     1       0.000   0.000   1.100  1.00  0.00           H
END`
    },

    // Bromoethane - Br isotope pattern
    'bromoethane': {
        color: '#a855f7',
        emoji: '⚗️',
        formula: 'C₂H₅Br',
        skeletal: 'Ethyl bromide - shows 1:1 M:M+2 pattern',
        functionalGroups: ['C-Br bond', 'Alkyl chain'],
        pubchemCid: 6341,
        pdb: `COMPND    BROMOETHANE
ATOM      1  C1  EBR     1       0.000   0.000   0.000  1.00  0.00           C
ATOM      2  C2  EBR     1       1.500   0.000   0.000  1.00  0.00           C
ATOM      3  BR  EBR     1      -1.500   0.000   0.000  1.00  0.00          BR
ATOM      4  H1  EBR     1       0.400   1.000   0.000  1.00  0.00           H
ATOM      5  H2  EBR     1       0.400  -0.500   0.900  1.00  0.00           H
ATOM      6  H3  EBR     1       1.900   1.000   0.000  1.00  0.00           H
ATOM      7  H4  EBR     1       1.900  -0.500   0.900  1.00  0.00           H
ATOM      8  H5  EBR     1       1.900  -0.500  -0.900  1.00  0.00           H
END`
    },

    // ========================================
    // Module 2: 13C NMR
    // ========================================

    // BHT (Butylated hydroxytoluene) - Symmetry example
    'bht': {
        color: '#ec4899',
        emoji: '🛡️',
        formula: 'C₁₅H₂₄O',
        skeletal: 'Antioxidant - 15 carbons but only 7 NMR signals due to symmetry',
        functionalGroups: ['Phenol (-OH)', 'tert-Butyl (x2)', 'Aromatic ring'],
        pubchemCid: 31404,
        smiles: 'CC(C)(C)C1=CC(=C(C=C1)O)C(C)(C)C'
    },

    // Hexanedioic acid (Adipic acid) - Symmetry
    'adipic acid': {
        color: '#f97316',
        emoji: '🔗',
        formula: 'C₆H₁₀O₄',
        skeletal: 'Dicarboxylic acid with plane of symmetry',
        functionalGroups: ['Carboxylic acid (x2)'],
        pubchemCid: 196,
        pdb: `COMPND    ADIPIC ACID
ATOM      1  C1  ADP     1       0.000   0.000   0.000  1.00  0.00           C
ATOM      2  C2  ADP     1       1.520   0.000   0.000  1.00  0.00           C
ATOM      3  C3  ADP     1       2.050   1.420   0.000  1.00  0.00           C
ATOM      4  C4  ADP     1       3.570   1.420   0.000  1.00  0.00           C
ATOM      5  C5  ADP     1       4.100   2.840   0.000  1.00  0.00           C
ATOM      6  C6  ADP     1       5.620   2.840   0.000  1.00  0.00           C
ATOM      7  O1  ADP     1      -0.600   1.100   0.000  1.00  0.00           O
ATOM      8  O2  ADP     1      -0.600  -1.100   0.000  1.00  0.00           O
ATOM      9  O3  ADP     1       6.220   3.940   0.000  1.00  0.00           O
ATOM     10  O4  ADP     1       6.220   1.740   0.000  1.00  0.00           O
END`
    },

    // Lactic acid - NMR example
    'lactic acid': {
        color: '#6366f1',
        emoji: '🥛',
        formula: 'C₃H₆O₃',
        skeletal: 'Alpha-hydroxy acid - three distinct carbon signals',
        functionalGroups: ['Carboxylic acid (-COOH)', 'Hydroxyl (-OH)'],
        pubchemCid: 612,
        pdb: `COMPND    LACTIC ACID
ATOM      1  C1  LAC     1       0.000   0.000   0.000  1.00  0.00           C
ATOM      2  C2  LAC     1       1.520   0.000   0.000  1.00  0.00           C
ATOM      3  C3  LAC     1       2.050   1.420   0.000  1.00  0.00           C
ATOM      4  O1  LAC     1      -0.600   1.100   0.000  1.00  0.00           O
ATOM      5  O2  LAC     1      -0.600  -1.100   0.000  1.00  0.00           O
ATOM      6  O3  LAC     1       1.900  -0.700   1.200  1.00  0.00           O
END`
    },

    // ========================================
    // Module 4: IR Spectroscopy
    // ========================================

    // Paracetamol - Multiple IR regions
    'paracetamol': {
        color: '#ef4444',
        emoji: '💊',
        formula: 'C₈H₉NO₂',
        skeletal: 'Acetaminophen - shows N-H, C=O, and aromatic bands',
        functionalGroups: ['Amide (-NHCO-)', 'Phenol (-OH)', 'Aromatic ring'],
        pubchemCid: 1983,
        smiles: 'CC(=O)NC1=CC=C(C=C1)O'
    },

    // Cyanoacetamide - Multiple functional groups
    'cyanoacetamide': {
        color: '#8b5cf6',
        emoji: '🔬',
        formula: 'C₃H₄N₂O',
        skeletal: 'Shows C≡N triple bond and amide bands',
        functionalGroups: ['Nitrile (C≡N)', 'Amide (-CONH₂)'],
        pubchemCid: 67021,
        smiles: 'C(C#N)C(=O)N'
    },

    // ========================================
    // Module 5: Problem Solving
    // ========================================

    // Acrolein (Propenal) - Structure solving
    'acrolein': {
        color: '#fbbf24',
        emoji: '⚠️',
        formula: 'C₃H₄O',
        skeletal: 'Simplest unsaturated aldehyde (MW = 56)',
        functionalGroups: ['Aldehyde (-CHO)', 'Alkene (C=C)'],
        pubchemCid: 7847,
        pdb: `COMPND    ACROLEIN
ATOM      1  C1  ACR     1       0.000   0.000   0.000  1.00  0.00           C
ATOM      2  C2  ACR     1       1.340   0.000   0.000  1.00  0.00           C
ATOM      3  C3  ACR     1       2.100   1.200   0.000  1.00  0.00           C
ATOM      4  O1  ACR     1       3.300   1.200   0.000  1.00  0.00           O
ATOM      5  H1  ACR     1      -0.550   0.950   0.000  1.00  0.00           H
ATOM      6  H2  ACR     1      -0.550  -0.950   0.000  1.00  0.00           H
ATOM      7  H3  ACR     1       1.850  -0.950   0.000  1.00  0.00           H
ATOM      8  H4  ACR     1       1.600   2.180   0.000  1.00  0.00           H
END`
    },

    // Ethylene glycol
    'ethylene glycol': {
        color: '#10b981',
        emoji: '🧊',
        formula: 'C₂H₆O₂',
        skeletal: '1,2-Ethanediol - antifreeze (MW = 62)',
        functionalGroups: ['Hydroxyl (-OH) x2'],
        pubchemCid: 174,
        pdb: `COMPND    ETHYLENE GLYCOL
ATOM      1  C1  EGL     1       0.000   0.000   0.000  1.00  0.00           C
ATOM      2  C2  EGL     1       1.520   0.000   0.000  1.00  0.00           C
ATOM      3  O1  EGL     1      -0.600   1.300   0.000  1.00  0.00           O
ATOM      4  O2  EGL     1       2.120   1.300   0.000  1.00  0.00           O
ATOM      5  H1  EGL     1      -0.400  -0.500   0.900  1.00  0.00           H
ATOM      6  H2  EGL     1      -0.400  -0.500  -0.900  1.00  0.00           H
ATOM      7  H3  EGL     1       1.920  -0.500   0.900  1.00  0.00           H
ATOM      8  H4  EGL     1       1.920  -0.500  -0.900  1.00  0.00           H
END`
    },

    // ========================================
    // PHASE 1: X-ray Examples
    // ========================================

    // Caffeine - Famous X-ray structure
    'caffeine': {
        color: '#8b4513',
        emoji: '☕',
        formula: 'C₈H₁₀N₄O₂',
        skeletal: 'Trimethylxanthine - structure solved by X-ray (MW = 194)',
        functionalGroups: ['Purine ring', 'Carbonyl (C=O) x2', 'N-methyl (x3)'],
        pubchemCid: 2519,
        smiles: 'CN1C=NC2=C1C(=O)N(C(=O)N2C)C'
    },

    // Propranolol - MS fragmentation example
    'propranolol': {
        color: '#2563eb',
        emoji: '💊',
        formula: 'C₁₆H₂₁NO₂',
        skeletal: 'Beta-blocker - classic MS fragmentation example (MW = 259)',
        functionalGroups: ['Secondary amine', 'Ether (-O-)', 'Naphthalene ring', 'Alcohol (-OH)'],
        pubchemCid: 4946,
        smiles: 'CC(C)NCC(COC1=CC=CC2=C1C=CC=C2)O'
    },

    // m-Nitrotoluene - MS spectrum example
    'm-nitrotoluene': {
        color: '#dc2626',
        emoji: '💥',
        formula: 'C₇H₇NO₂',
        skeletal: '3-Nitrotoluene - MS shows M+ at 137 (MW = 137)',
        functionalGroups: ['Aromatic ring', 'Nitro (-NO₂)', 'Methyl (-CH₃)'],
        pubchemCid: 10454,
        smiles: 'CC1=CC(=CC=C1)[N+](=O)[O-]'
    },

    // Heptan-2-one - NMR guided tour example
    'heptan-2-one': {
        color: '#f97316',
        emoji: '🍋',
        formula: 'C₇H₁₄O',
        skeletal: 'Methyl pentyl ketone - NMR example (MW = 114)',
        functionalGroups: ['Ketone (C=O)', 'Alkyl chain'],
        pubchemCid: 8025,
        smiles: 'CCCCCC(=O)C'
    },

    // Propanal - NMR guided tour
    'propanal': {
        color: '#eab308',
        emoji: '🔬',
        formula: 'C₃H₆O',
        skeletal: 'Propionaldehyde - 3 distinct carbons in NMR (MW = 58)',
        functionalGroups: ['Aldehyde (-CHO)', 'Methyl (-CH₃)'],
        pubchemCid: 527,
        smiles: 'CCC=O'
    },
};

