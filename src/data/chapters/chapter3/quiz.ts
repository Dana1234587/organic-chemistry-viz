import { ChapterQuiz } from '../../types';

export const quiz: ChapterQuiz[] = [
    // Phase 1: X-ray & Introduction
    {
        id: 1,
        question: 'Why is X-ray crystallography called "the final appeal" in structure determination?',
        options: ['It was invented last', 'It directly shows atom positions definitively', 'It\'s the cheapest method', 'It only works on crystals'],
        correctIndex: 1,
        explanation: 'X-ray crystallography provides definitive, unambiguous 3D structure data, making it the ultimate proof of molecular structure.',
        difficulty: 'easy'
    },
    {
        id: 2,
        question: 'A major limitation of X-ray crystallography is:',
        options: ['It cannot detect carbon atoms', 'Hydrogen atoms are hard to see', 'It only works on gases', 'It cannot measure bond angles'],
        correctIndex: 1,
        explanation: 'Hydrogen has only 1 electron, making it scatter X-rays weakly. H positions often must be calculated rather than directly observed.',
        difficulty: 'medium'
    },
    {
        id: 3,
        question: 'Which spectroscopic technique would you use for a sample that is a liquid?',
        options: ['X-ray crystallography only', 'Any of MS, NMR, or IR', 'X-ray then NMR', 'None - liquids cannot be analyzed'],
        correctIndex: 1,
        explanation: 'Spectroscopy (MS, NMR, IR) works on liquids, gases, and solids. X-ray crystallography requires crystals.',
        difficulty: 'easy'
    },
    // Module 1: Mass Spectrometry
    {
        id: 4,
        question: 'What does mass spectrometry actually measure?',
        options: ['Molecular weight only', 'Mass-to-charge ratio (m/z)', 'Number of atoms', 'Bond strength'],
        correctIndex: 1,
        explanation: 'MS measures mass-to-charge ratio (m/z). For singly charged ions (most common), m/z equals the mass.',
        difficulty: 'easy'
    },

    {
        id: 5,
        question: 'A compound shows M and M+2 peaks in a 3:1 ratio. What element is present?',
        options: ['Bromine', 'Chlorine', 'Fluorine', 'Iodine'],
        correctIndex: 1,
        explanation: 'Chlorine has isotopes ³⁵Cl (75%) and ³⁷Cl (25%), giving a characteristic 3:1 M:M+2 pattern.',
        difficulty: 'medium'
    },
    {
        id: 6,
        question: 'Equal height M and M+2 peaks (1:1 ratio) indicate which element?',
        options: ['Chlorine', 'Sulfur', 'Bromine', 'Nitrogen'],
        correctIndex: 2,
        explanation: 'Bromine has ⁷⁹Br (50%) and ⁸¹Br (50%), giving equal M and M+2 peaks.',
        difficulty: 'medium'
    },
    {
        id: 7,
        question: 'A molecule has an odd molecular weight of 121. According to the Nitrogen Rule, how many nitrogen atoms does it contain?',
        options: ['Zero', 'Two', 'An odd number (1, 3, 5...)', 'Cannot determine'],
        correctIndex: 2,
        explanation: 'The Nitrogen Rule states: Odd MW = Odd number of nitrogen atoms.',
        difficulty: 'hard'
    },

    // Module 2: 13C NMR
    {
        id: 8,
        question: 'What compound is used as the zero reference (0 ppm) in NMR spectroscopy?',
        options: ['Chloroform', 'Tetramethylsilane (TMS)', 'Benzene', 'Acetone'],
        correctIndex: 1,
        explanation: 'TMS (Si(CH₃)₄) is the universal reference for NMR, set at 0 ppm.',
        difficulty: 'easy'
    },
    {
        id: 9,
        question: 'In ¹³C NMR, carbonyl carbons (C=O) typically appear at:',
        options: ['0-50 ppm', '50-100 ppm', '100-150 ppm', '150-220 ppm'],
        correctIndex: 3,
        explanation: 'Carbonyl carbons are highly deshielded and appear at 150-220 ppm.',
        difficulty: 'medium'
    },
    {
        id: 10,
        question: 'Benzene (C₆H₆) has 6 carbon atoms. How many peaks does it show in ¹³C NMR?',
        options: ['6 peaks', '3 peaks', '1 peak', '2 peaks'],
        correctIndex: 2,
        explanation: 'All 6 carbons in benzene are equivalent due to symmetry, so only 1 peak appears.',
        difficulty: 'medium'
    },

    // Module 3: 1H NMR
    {
        id: 11,
        question: 'Why is ¹H NMR more sensitive than ¹³C NMR?',
        options: ['¹H is lighter', '¹H has 100% natural abundance (vs 1.1% for ¹³C)', '¹H spins faster', '¹H is more radioactive'],
        correctIndex: 1,
        explanation: 'Almost all hydrogen is ¹H (100% abundance), while only 1.1% of carbon is ¹³C.',
        difficulty: 'medium'
    },
    {
        id: 12,
        question: 'Aromatic protons typically appear in which ¹H NMR region?',
        options: ['0-2 ppm', '2-4 ppm', '6.5-8.5 ppm', '9-12 ppm'],
        correctIndex: 2,
        explanation: 'Aromatic ring protons are deshielded and appear at 6.5-8.5 ppm.',
        difficulty: 'easy'
    },

    // Module 4: IR Spectroscopy
    {
        id: 13,
        question: 'The carbonyl (C=O) stretch appears at approximately:',
        options: ['3500 cm⁻¹', '2100 cm⁻¹', '1700 cm⁻¹', '1000 cm⁻¹'],
        correctIndex: 2,
        explanation: 'C=O appears around 1700 cm⁻¹ and is usually the strongest peak in IR spectra.',
        difficulty: 'easy'
    },
    {
        id: 14,
        question: 'A very broad peak from 2500-3300 cm⁻¹ is characteristic of:',
        options: ['Alkene C-H', 'Carboxylic acid O-H', 'Ester C=O', 'Alkyne C≡C'],
        correctIndex: 1,
        explanation: 'Carboxylic acid O-H shows an extremely broad peak due to strong hydrogen bonding.',
        difficulty: 'medium'
    },
    {
        id: 15,
        question: 'A primary amine (-NH₂) or primary amide shows:',
        options: ['One sharp N-H peak', 'Two N-H peaks (symmetric and antisymmetric)', 'Three N-H peaks', 'No N-H peaks'],
        correctIndex: 1,
        explanation: 'NH₂ shows two peaks due to symmetric and antisymmetric stretching vibrations.',
        difficulty: 'hard'
    },

    // Module 5: Problem Solving
    {
        id: 16,
        question: 'Calculate the DBE for C₆H₆ (benzene). What do you get?',
        options: ['1', '2', '3', '4'],
        correctIndex: 3,
        explanation: 'DBE = 6 + 1 - 6/2 = 6 + 1 - 3 = 4. This accounts for 3 double bonds + 1 ring.',
        difficulty: 'medium'
    },
    {
        id: 17,
        question: 'A DBE of 4 or more often suggests:',
        options: ['A saturated compound', 'An aromatic ring', 'Only triple bonds', 'No rings present'],
        correctIndex: 1,
        explanation: 'DBE ≥ 4 strongly suggests an aromatic (benzene) ring (3 C=C + 1 ring = 4 DBE).',
        difficulty: 'easy'
    },
    {
        id: 18,
        question: 'What is the recommended order for analyzing an unknown compound?',
        options: ['IR → NMR → MS', 'NMR → IR → MS', 'MS → DBE → IR → NMR', 'DBE → MS → NMR → IR'],
        correctIndex: 2,
        explanation: 'Start with MS (molecular formula), calculate DBE, then use IR for functional groups, and NMR for structure details.',
        difficulty: 'easy'
    }
];
