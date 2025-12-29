// Chapter-specific game data with difficulty levels
// Each chapter has unique, non-repeating questions for each game type

export interface SortItem {
    id: string;
    text: string;
    correctOrder: number;
}

export interface SortingSet {
    title: string;
    difficulty: 'easy' | 'medium' | 'hard';
    items: SortItem[];
}

export interface SpeedQuestion {
    id: string;
    question: string;
    options: string[];
    correctIndex: number;
    difficulty: 'easy' | 'medium' | 'hard';
}

export interface FillBlank {
    sentence: string;
    answer: string;
    options: string[];
    difficulty: 'easy' | 'medium' | 'hard';
}

export interface ChapterGameData {
    sortingSets: SortingSet[];
    speedQuestions: SpeedQuestion[];
    fillBlanks: FillBlank[];
}

// ==================== CHAPTER 1: Organic Structures ====================
export const CHAPTER_1_GAMES: ChapterGameData = {
    sortingSets: [
        {
            title: 'Carbon Chain Length (Shortest → Longest)',
            difficulty: 'easy',
            items: [
                { id: '1a', text: 'Methane (1 C)', correctOrder: 0 },
                { id: '1b', text: 'Ethane (2 C)', correctOrder: 1 },
                { id: '1c', text: 'Propane (3 C)', correctOrder: 2 },
                { id: '1d', text: 'Butane (4 C)', correctOrder: 3 },
            ]
        },
        {
            title: 'Hydrocarbon Saturation (Most → Least)',
            difficulty: 'medium',
            items: [
                { id: '2a', text: 'Alkane (all single)', correctOrder: 0 },
                { id: '2b', text: 'Alkene (one double)', correctOrder: 1 },
                { id: '2c', text: 'Alkyne (one triple)', correctOrder: 2 },
                { id: '2d', text: 'Benzene (aromatic)', correctOrder: 3 },
            ]
        },
        {
            title: 'Functional Group Polarity (Least → Most)',
            difficulty: 'hard',
            items: [
                { id: '3a', text: 'Alkane (nonpolar)', correctOrder: 0 },
                { id: '3b', text: 'Ether (slightly polar)', correctOrder: 1 },
                { id: '3c', text: 'Alcohol (polar)', correctOrder: 2 },
                { id: '3d', text: 'Carboxylic acid (very polar)', correctOrder: 3 },
            ]
        },
    ],
    speedQuestions: [
        // Easy
        { id: 'c1q1', question: 'How many bonds can carbon form?', options: ['2', '3', '4', '5'], correctIndex: 2, difficulty: 'easy' },
        { id: 'c1q2', question: 'What is the prefix for 2 carbons?', options: ['Meth-', 'Eth-', 'Prop-', 'But-'], correctIndex: 1, difficulty: 'easy' },
        { id: 'c1q3', question: 'A wedge bond shows an atom coming...?', options: ['Forward', 'Backward', 'Sideways', 'Rotating'], correctIndex: 0, difficulty: 'easy' },
        // Medium
        { id: 'c1q4', question: 'The -OH group is found in which class?', options: ['Aldehydes', 'Alcohols', 'Ketones', 'Ethers'], correctIndex: 1, difficulty: 'medium' },
        { id: 'c1q5', question: 'Skeletal formulas hide which atoms?', options: ['O and N', 'C and H', 'Only C', 'Only H'], correctIndex: 1, difficulty: 'medium' },
        { id: 'c1q6', question: 'CₙH₂ₙ₊₂ is the formula for?', options: ['Alkenes', 'Alkynes', 'Alkanes', 'Aromatics'], correctIndex: 2, difficulty: 'medium' },
        // Hard
        { id: 'c1q7', question: 'Which has the highest priority in naming?', options: ['Alkene', 'Alcohol', 'Carboxylic acid', 'Amine'], correctIndex: 2, difficulty: 'hard' },
        { id: 'c1q8', question: 'Structural isomers have the same...?', options: ['Structure', 'Formula', 'Properties', 'Boiling point'], correctIndex: 1, difficulty: 'hard' },
    ],
    fillBlanks: [
        // Easy
        { sentence: 'Carbon has ___ valence electrons.', answer: '4', options: ['2', '4', '6', '8'], difficulty: 'easy' },
        { sentence: 'The prefix for 1 carbon is ___.', answer: 'meth', options: ['meth', 'eth', 'prop', 'but'], difficulty: 'easy' },
        // Medium
        { sentence: 'A ___ bond indicates the atom is behind the plane.', answer: 'dashed', options: ['wedge', 'dashed', 'solid', 'double'], difficulty: 'medium' },
        { sentence: 'Molecules with the same formula but different structures are ___.', answer: 'isomers', options: ['isotopes', 'isomers', 'allotropes', 'conformers'], difficulty: 'medium' },
        // Hard
        { sentence: 'The carbonyl group consists of C=___.', answer: 'O', options: ['O', 'N', 'S', 'C'], difficulty: 'hard' },
        { sentence: 'R-O-R represents the ___ functional group.', answer: 'ether', options: ['ester', 'ether', 'alcohol', 'aldehyde'], difficulty: 'hard' },
    ]
};

// ==================== CHAPTER 2: Functional Groups ====================
export const CHAPTER_2_GAMES: ChapterGameData = {
    sortingSets: [
        {
            title: 'Oxidation Level (Lowest → Highest)',
            difficulty: 'easy',
            items: [
                { id: '2a1', text: 'Alkane', correctOrder: 0 },
                { id: '2a2', text: 'Alcohol', correctOrder: 1 },
                { id: '2a3', text: 'Aldehyde', correctOrder: 2 },
                { id: '2a4', text: 'Carboxylic Acid', correctOrder: 3 },
            ]
        },
        {
            title: 'IUPAC Priority (Lowest → Highest)',
            difficulty: 'medium',
            items: [
                { id: '2b1', text: 'Ether (-O-)', correctOrder: 0 },
                { id: '2b2', text: 'Ketone (-one)', correctOrder: 1 },
                { id: '2b3', text: 'Aldehyde (-al)', correctOrder: 2 },
                { id: '2b4', text: 'Acid (-oic acid)', correctOrder: 3 },
            ]
        },
        {
            title: 'Acidity (Weakest → Strongest)',
            difficulty: 'hard',
            items: [
                { id: '2c1', text: 'Alkane (pKa ~50)', correctOrder: 0 },
                { id: '2c2', text: 'Alcohol (pKa ~16)', correctOrder: 1 },
                { id: '2c3', text: 'Phenol (pKa ~10)', correctOrder: 2 },
                { id: '2c4', text: 'Carboxylic acid (pKa ~5)', correctOrder: 3 },
            ]
        },
    ],
    speedQuestions: [
        // Easy
        { id: 'c2q1', question: 'Which group contains -OH?', options: ['Ketone', 'Alcohol', 'Aldehyde', 'Ester'], correctIndex: 1, difficulty: 'easy' },
        { id: 'c2q2', question: 'Aldehydes have C=O at the...?', options: ['Middle', 'End', 'Ring', 'Branch'], correctIndex: 1, difficulty: 'easy' },
        { id: 'c2q3', question: 'The suffix -one indicates?', options: ['Alcohol', 'Aldehyde', 'Ketone', 'Acid'], correctIndex: 2, difficulty: 'easy' },
        // Medium
        { id: 'c2q4', question: 'R-CO-R is the structure of?', options: ['Aldehyde', 'Ketone', 'Ester', 'Acid'], correctIndex: 1, difficulty: 'medium' },
        { id: 'c2q5', question: 'Esters are made from acid + ?', options: ['Alkane', 'Alcohol', 'Amine', 'Alkene'], correctIndex: 1, difficulty: 'medium' },
        { id: 'c2q6', question: 'Amines contain which element?', options: ['Oxygen', 'Sulfur', 'Nitrogen', 'Phosphorus'], correctIndex: 2, difficulty: 'medium' },
        // Hard
        { id: 'c2q7', question: 'Primary alcohol oxidizes to?', options: ['Ketone', 'Aldehyde', 'Ether', 'Alkene'], correctIndex: 1, difficulty: 'hard' },
        { id: 'c2q8', question: 'Which cannot be oxidized further?', options: ['Primary alcohol', 'Secondary alcohol', 'Tertiary alcohol', 'Aldehyde'], correctIndex: 2, difficulty: 'hard' },
    ],
    fillBlanks: [
        // Easy
        { sentence: 'The -CHO group is called an ___.', answer: 'aldehyde', options: ['alcohol', 'aldehyde', 'ketone', 'acid'], difficulty: 'easy' },
        { sentence: 'R-COOH is a ___ acid.', answer: 'carboxylic', options: ['amino', 'carboxylic', 'sulfonic', 'phosphoric'], difficulty: 'easy' },
        // Medium
        { sentence: 'Secondary alcohols oxidize to ___.', answer: 'ketones', options: ['aldehydes', 'ketones', 'acids', 'esters'], difficulty: 'medium' },
        { sentence: 'The reaction of acid + alcohol produces an ___.', answer: 'ester', options: ['ether', 'ester', 'amide', 'anhydride'], difficulty: 'medium' },
        // Hard
        { sentence: 'Amides contain C=O bonded to ___.', answer: 'N', options: ['O', 'N', 'S', 'C'], difficulty: 'hard' },
        { sentence: 'The oxidation state increases with more bonds to ___.', answer: 'oxygen', options: ['carbon', 'hydrogen', 'oxygen', 'nitrogen'], difficulty: 'hard' },
    ]
};

// ==================== CHAPTER 3: Spectroscopy ====================
export const CHAPTER_3_GAMES: ChapterGameData = {
    sortingSets: [
        {
            title: 'IR Stretching Frequency (Low → High)',
            difficulty: 'easy',
            items: [
                { id: '3a1', text: 'C-C (~1000 cm⁻¹)', correctOrder: 0 },
                { id: '3a2', text: 'C=O (~1715 cm⁻¹)', correctOrder: 1 },
                { id: '3a3', text: 'C-H (~3000 cm⁻¹)', correctOrder: 2 },
                { id: '3a4', text: 'O-H (~3400 cm⁻¹)', correctOrder: 3 },
            ]
        },
        {
            title: '¹H NMR Shift (Low ppm → High ppm)',
            difficulty: 'medium',
            items: [
                { id: '3b1', text: 'Alkyl CH₃ (~1 ppm)', correctOrder: 0 },
                { id: '3b2', text: 'CH₂ next to C=O (~2.5 ppm)', correctOrder: 1 },
                { id: '3b3', text: 'Aromatic H (~7 ppm)', correctOrder: 2 },
                { id: '3b4', text: 'Aldehyde CHO (~9.5 ppm)', correctOrder: 3 },
            ]
        },
        {
            title: 'Mass Spectrum Peak Stability (Least → Most)',
            difficulty: 'hard',
            items: [
                { id: '3c1', text: 'Primary carbocation', correctOrder: 0 },
                { id: '3c2', text: 'Secondary carbocation', correctOrder: 1 },
                { id: '3c3', text: 'Tertiary carbocation', correctOrder: 2 },
                { id: '3c4', text: 'Resonance-stabilized ion', correctOrder: 3 },
            ]
        },
    ],
    speedQuestions: [
        // Easy
        { id: 'c3q1', question: 'm/z stands for?', options: ['Mass/zone', 'Mass/charge', 'Molecule/zero', 'Matter/zinc'], correctIndex: 1, difficulty: 'easy' },
        { id: 'c3q2', question: 'Base peak has what intensity?', options: ['50%', '75%', '100%', 'Variable'], correctIndex: 2, difficulty: 'easy' },
        { id: 'c3q3', question: 'C=O stretches around?', options: ['1000', '1500', '1715', '3000'], correctIndex: 2, difficulty: 'easy' },
        // Medium
        { id: 'c3q4', question: '1:1 M/M+2 pattern indicates?', options: ['Cl', 'Br', 'I', 'F'], correctIndex: 1, difficulty: 'medium' },
        { id: 'c3q5', question: 'Loss of 15 mass units = loss of?', options: ['OH', 'CH₃', 'CO', 'H₂O'], correctIndex: 1, difficulty: 'medium' },
        { id: 'c3q6', question: 'Triplet in ¹H NMR means _ neighbors?', options: ['0', '1', '2', '3'], correctIndex: 2, difficulty: 'medium' },
        // Hard
        { id: 'c3q7', question: 'McLafferty rearrangement requires?', options: ['6-membered transition', 'Aromatic ring', 'Halogen', 'Alcohol'], correctIndex: 0, difficulty: 'hard' },
        { id: 'c3q8', question: '¹³C signals = number of?', options: ['Total carbons', 'Unique carbons', 'sp³ carbons', 'Hydrogens'], correctIndex: 1, difficulty: 'hard' },
    ],
    fillBlanks: [
        // Easy
        { sentence: 'The molecular ion in MS is denoted M___.', answer: '⁺', options: ['⁺', '⁻', '²⁺', '⁰'], difficulty: 'easy' },
        { sentence: 'IR detects ___ vibrations.', answer: 'bond', options: ['electron', 'nuclear', 'bond', 'spin'], difficulty: 'easy' },
        // Medium
        { sentence: '¹³C NMR signals equal the number of ___ carbons.', answer: 'unique', options: ['total', 'unique', 'sp²', 'aromatic'], difficulty: 'medium' },
        { sentence: 'Chlorine isotopes appear in ratio 3:___.', answer: '1', options: ['1', '2', '3', '4'], difficulty: 'medium' },
        // Hard
        { sentence: 'Alpha cleavage occurs next to a ___ group.', answer: 'carbonyl', options: ['hydroxyl', 'carbonyl', 'amino', 'halogen'], difficulty: 'hard' },
        { sentence: 'DEPT-135 distinguishes CH₃ and CH from ___.', answer: 'CH₂', options: ['CH', 'CH₂', 'C', 'CH₃'], difficulty: 'hard' },
    ]
};

// ==================== CHAPTER 4: Molecular Structure ====================
export const CHAPTER_4_GAMES: ChapterGameData = {
    sortingSets: [
        {
            title: 'Bond Angle (Smallest → Largest)',
            difficulty: 'easy',
            items: [
                { id: '4a1', text: 'H₂O (104.5°)', correctOrder: 0 },
                { id: '4a2', text: 'NH₃ (107°)', correctOrder: 1 },
                { id: '4a3', text: 'CH₄ (109.5°)', correctOrder: 2 },
                { id: '4a4', text: 'CO₂ (180°)', correctOrder: 3 },
            ]
        },
        {
            title: 'Electronegativity (Lowest → Highest)',
            difficulty: 'medium',
            items: [
                { id: '4b1', text: 'Carbon (2.5)', correctOrder: 0 },
                { id: '4b2', text: 'Nitrogen (3.0)', correctOrder: 1 },
                { id: '4b3', text: 'Oxygen (3.5)', correctOrder: 2 },
                { id: '4b4', text: 'Fluorine (4.0)', correctOrder: 3 },
            ]
        },
        {
            title: 'Bond Order (Lowest → Highest)',
            difficulty: 'hard',
            items: [
                { id: '4c1', text: 'He₂ (0)', correctOrder: 0 },
                { id: '4c2', text: 'H₂ (1)', correctOrder: 1 },
                { id: '4c3', text: 'O₂ (2)', correctOrder: 2 },
                { id: '4c4', text: 'N₂ (3)', correctOrder: 3 },
            ]
        },
    ],
    speedQuestions: [
        // Easy
        { id: 'c4q1', question: 'CH₄ has what hybridization?', options: ['sp', 'sp²', 'sp³', 'sp³d'], correctIndex: 2, difficulty: 'easy' },
        { id: 'c4q2', question: 'sp³ gives what geometry?', options: ['Linear', 'Trigonal', 'Tetrahedral', 'Octahedral'], correctIndex: 2, difficulty: 'easy' },
        { id: 'c4q3', question: 'How many pi bonds in a double bond?', options: ['0', '1', '2', '3'], correctIndex: 1, difficulty: 'easy' },
        // Medium
        { id: 'c4q4', question: 'Water is what shape?', options: ['Linear', 'Bent', 'Trigonal', 'Tetrahedral'], correctIndex: 1, difficulty: 'medium' },
        { id: 'c4q5', question: 'Lone pairs occupy more space than?', options: ['Nuclei', 'Bonding pairs', 'Pi bonds', 'Sigma bonds'], correctIndex: 1, difficulty: 'medium' },
        { id: 'c4q6', question: 'Pi bonds form from _ overlap?', options: ['Head-on', 'Side-by-side', 's-s', 'Hybrid'], correctIndex: 1, difficulty: 'medium' },
        // Hard
        { id: 'c4q7', question: 'Bond order = ½(bonding - _)?', options: ['Pi', 'Sigma', 'Antibonding', 'Lone pairs'], correctIndex: 2, difficulty: 'hard' },
        { id: 'c4q8', question: 'Rotation barrier for ethene π bond?', options: ['12 kJ/mol', '60 kJ/mol', '150 kJ/mol', '250 kJ/mol'], correctIndex: 3, difficulty: 'hard' },
    ],
    fillBlanks: [
        // Easy
        { sentence: 'sp³ hybridization gives ___ degree angles.', answer: '109.5', options: ['90', '109.5', '120', '180'], difficulty: 'easy' },
        { sentence: 'A triple bond has 1 sigma and ___ pi bonds.', answer: '2', options: ['0', '1', '2', '3'], difficulty: 'easy' },
        // Medium
        { sentence: 'VSEPR stands for Valence Shell Electron Pair ___.', answer: 'Repulsion', options: ['Rotation', 'Repulsion', 'Resonance', 'Reduction'], difficulty: 'medium' },
        { sentence: 'NH₃ has trigonal ___ geometry.', answer: 'pyramidal', options: ['planar', 'pyramidal', 'bipyramidal', 'linear'], difficulty: 'medium' },
        // Hard
        { sentence: 'Rotation is restricted around ___ bonds.', answer: 'double', options: ['single', 'double', 'ionic', 'hydrogen'], difficulty: 'hard' },
        { sentence: 'HOMO stands for Highest Occupied ___ Orbital.', answer: 'Molecular', options: ['Atomic', 'Molecular', 'Metal', 'Minimal'], difficulty: 'hard' },
    ]
};

// ==================== CHAPTER 5: Organic Reactions ====================
export const CHAPTER_5_GAMES: ChapterGameData = {
    sortingSets: [
        {
            title: 'Nucleophile Strength (Weakest → Strongest)',
            difficulty: 'easy',
            items: [
                { id: '5a1', text: 'H₂O (neutral)', correctOrder: 0 },
                { id: '5a2', text: 'NH₃ (lone pair)', correctOrder: 1 },
                { id: '5a3', text: 'Cl⁻ (charged)', correctOrder: 2 },
                { id: '5a4', text: 'OH⁻ (strong base)', correctOrder: 3 },
            ]
        },
        {
            title: 'Leaving Group Ability (Worst → Best)',
            difficulty: 'medium',
            items: [
                { id: '5b1', text: 'F⁻ (small, holds e⁻)', correctOrder: 0 },
                { id: '5b2', text: 'Cl⁻', correctOrder: 1 },
                { id: '5b3', text: 'Br⁻', correctOrder: 2 },
                { id: '5b4', text: 'I⁻ (large, stable)', correctOrder: 3 },
            ]
        },
        {
            title: 'Electrophilicity (Lowest → Highest)',
            difficulty: 'hard',
            items: [
                { id: '5c1', text: 'Alkane C (no δ⁺)', correctOrder: 0 },
                { id: '5c2', text: 'C-Br (δ⁺ carbon)', correctOrder: 1 },
                { id: '5c3', text: 'C=O (polarized)', correctOrder: 2 },
                { id: '5c4', text: 'Carbocation (full +)', correctOrder: 3 },
            ]
        },
    ],
    speedQuestions: [
        { id: 'c5q1', question: 'Nucleophiles are...?', options: ['Electron-poor', 'Electron-rich', 'Neutral', 'Radioactive'], correctIndex: 1, difficulty: 'easy' },
        { id: 'c5q2', question: 'A curly arrow shows movement of...?', options: ['Atoms', 'Protons', 'Electron pairs', 'Neutrons'], correctIndex: 2, difficulty: 'easy' },
        { id: 'c5q3', question: 'HOMO stands for...?', options: ['High Orbital', 'Highest Occupied MO', 'Horizontal OMO', 'Hydro OMO'], correctIndex: 1, difficulty: 'easy' },
        { id: 'c5q4', question: 'Electrons flow from HOMO to...?', options: ['SOMO', 'LUMO', 'Nucleus', 'HOMO'], correctIndex: 1, difficulty: 'medium' },
        { id: 'c5q5', question: 'Which is an electrophile?', options: ['NH₃', 'OH⁻', 'BH₃', 'CN⁻'], correctIndex: 2, difficulty: 'medium' },
        { id: 'c5q6', question: 'Arrow pointing TO atom means...?', options: ['Bond breaks', 'Bond forms', 'Atom moves', 'No change'], correctIndex: 1, difficulty: 'medium' },
        { id: 'c5q7', question: 'A dative bond forms when...?', options: ['Both atoms give 1e⁻', 'One atom gives 2e⁻', 'Ionic attraction', 'π overlap'], correctIndex: 1, difficulty: 'hard' },
        { id: 'c5q8', question: 'In SN2, bonds form/break...?', options: ['Sequentially', 'Simultaneously', 'Randomly', 'Never'], correctIndex: 1, difficulty: 'hard' },
    ],
    fillBlanks: [
        { sentence: 'Nucleophiles seek ___ charges.', answer: 'positive', options: ['positive', 'negative', 'neutral', 'no'], difficulty: 'easy' },
        { sentence: 'Electrophiles have ___ orbitals or δ⁺.', answer: 'empty', options: ['full', 'empty', 'half', 'bonding'], difficulty: 'easy' },
        { sentence: 'Curly arrows must start from ___.', answer: 'electrons', options: ['protons', 'electrons', 'nuclei', 'atoms'], difficulty: 'medium' },
        { sentence: 'A good leaving group is ___ when leaving.', answer: 'stable', options: ['reactive', 'stable', 'charged', 'ionic'], difficulty: 'medium' },
        { sentence: 'HOMO-LUMO interaction forms a new ___ orbital.', answer: 'bonding', options: ['antibonding', 'bonding', 'empty', 'pi'], difficulty: 'hard' },
        { sentence: 'SN2 is a ___ mechanism.', answer: 'concerted', options: ['stepwise', 'concerted', 'radical', 'ionic'], difficulty: 'hard' },
    ]
};

// Get game data by chapter ID
export const getChapterGameData = (chapterId: number): ChapterGameData => {
    switch (chapterId) {
        case 1: return CHAPTER_1_GAMES;
        case 2: return CHAPTER_2_GAMES;
        case 3: return CHAPTER_3_GAMES;
        case 4: return CHAPTER_4_GAMES;
        case 5: return CHAPTER_5_GAMES;
        default: return CHAPTER_1_GAMES;
    }
};

// Filter by difficulty
export const filterByDifficulty = <T extends { difficulty: string }>(
    items: T[],
    difficulty: 'easy' | 'medium' | 'hard' | 'all'
): T[] => {
    if (difficulty === 'all') return items;
    return items.filter(item => item.difficulty === difficulty);
};

