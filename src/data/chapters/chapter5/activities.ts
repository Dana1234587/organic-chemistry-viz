import { FlashcardData, GlossaryTerm, MiniQuizData } from '../../types';

export const flashcards: FlashcardData[] = [
    {
        front: 'Nucleophile',
        back: 'Electron-rich species that donates electrons. Sources: lone pairs, π bonds, σ bonds, negative charges. (Nu:)'
    },
    {
        front: 'Electrophile',
        back: 'Electron-poor species that accepts electrons. Sources: empty orbitals, positive charges, δ⁺ atoms. (E⁺)'
    },
    {
        front: 'HOMO',
        back: 'Highest Occupied Molecular Orbital - the highest energy orbital containing electrons. Found in nucleophiles.'
    },
    {
        front: 'LUMO',
        back: 'Lowest Unoccupied Molecular Orbital - the lowest energy empty orbital. Found in electrophiles.'
    },
    {
        front: 'Activation Energy (Eₐ)',
        back: 'The minimum energy required for molecules to reach the transition state and react.'
    },
    {
        front: 'Transition State (‡)',
        back: 'The highest energy point in a reaction pathway - an unstable arrangement between reactants and products.'
    },
    {
        front: 'Curly Arrow',
        back: 'Shows movement of an electron PAIR. Starts from electrons (lone pair, bond, or -). Points to electrophile.'
    },
    {
        front: 'Fishhook Arrow',
        back: 'Shows movement of a SINGLE electron. Used in radical (homolytic) mechanisms.'
    },
    {
        front: 'Dative Bond',
        back: 'A covalent bond where both electrons come from ONE atom (the nucleophile donating to an empty orbital).'
    },
    {
        front: 'Leaving Group',
        back: 'The atom or group that departs with the bonding electrons. Good LGs are stable with extra electrons (I⁻, Br⁻, H₂O).'
    },
    {
        front: 'Arrow TO atom = ?',
        back: 'NEW BOND FORMING between electron source and that atom.'
    },
    {
        front: 'Arrow INTO bond = ?',
        back: 'BOND BREAKING - electrons move to one of the atoms in that bond.'
    },
    {
        front: 'Addition Reaction',
        back: 'Atoms are ADDED across a multiple bond (π bond breaks, new σ bonds form).'
    },
    {
        front: 'Substitution Reaction',
        back: 'One group REPLACES another (Nu attacks, LG leaves). Types: SN1, SN2.'
    },
    {
        front: 'Elimination Reaction',
        back: 'Atoms are REMOVED to form a multiple bond. Types: E1, E2.'
    },
];

export const glossary: GlossaryTerm[] = [
    { term: 'Activation Energy', definition: 'Minimum energy required to reach the transition state' },
    { term: 'Transition State', definition: 'Highest energy point in reaction pathway; unstable intermediate structure' },
    { term: 'Nucleophile', definition: 'Electron-rich species that donates electrons to an electrophile' },
    { term: 'Electrophile', definition: 'Electron-poor species that accepts electrons from a nucleophile' },
    { term: 'HOMO', definition: 'Highest Occupied Molecular Orbital - electron donor orbital' },
    { term: 'LUMO', definition: 'Lowest Unoccupied Molecular Orbital - electron acceptor orbital' },
    { term: 'Curly Arrow', definition: 'Notation showing movement of an electron pair in mechanisms' },
    { term: 'Fishhook Arrow', definition: 'Notation showing movement of a single electron (radicals)' },
    { term: 'Dative Bond', definition: 'Bond where both electrons originate from one atom' },
    { term: 'Leaving Group', definition: 'Atom or group that departs with the bonding electrons' },
    { term: 'Concerted', definition: 'Reaction occurring in a single step with simultaneous bond making/breaking' },
    { term: 'Mechanism', definition: 'Step-by-step pathway showing how reactants become products' },
    { term: 'δ⁺ / δ⁻', definition: 'Partial positive/negative charges from bond polarization' },
    { term: 'SN2', definition: 'Substitution Nucleophilic Bimolecular - one-step substitution' },
    { term: 'Addition', definition: 'Reaction adding atoms across a multiple bond' },
    { term: 'Elimination', definition: 'Reaction removing atoms to create a multiple bond' },
];

export const miniQuizzes: MiniQuizData[] = [
    {
        id: 'ch5-collision-quiz',
        afterSection: 'collision-theory',
        questions: [
            {
                id: 'coll-q1',
                question: 'What is the transition state?',
                options: ['The final product', 'Highest energy point in reaction', 'The starting material', 'A catalyst'],
                correctAnswer: 1,
                explanation: 'The transition state (‡) is the highest energy point that must be overcome for reaction to proceed.'
            }
        ]
    },
    {
        id: 'ch5-nue-quiz',
        afterSection: 'nucleophiles-electrophiles',
        questions: [
            {
                id: 'nue-q1',
                question: 'Which is a nucleophile?',
                options: ['H⁺', 'BH₃', 'NH₃', 'AlCl₃'],
                correctAnswer: 2,
                explanation: 'NH₃ has a lone pair on nitrogen, making it electron-rich and nucleophilic.'
            }
        ]
    },
    {
        id: 'ch5-homo-quiz',
        afterSection: 'homo-lumo',
        questions: [
            {
                id: 'homo-q1',
                question: 'Electrons flow from ____ to ____.',
                options: ['LUMO → HOMO', 'HOMO → LUMO', 'LUMO → LUMO', 'HOMO → HOMO'],
                correctAnswer: 1,
                explanation: 'Electrons flow from the filled HOMO of the nucleophile to the empty LUMO of the electrophile.'
            }
        ]
    },
    {
        id: 'ch5-arrows-quiz',
        afterSection: 'curly-arrows',
        questions: [
            {
                id: 'arr-q1',
                question: 'A curly arrow must start from:',
                options: ['A positive charge', 'Electrons (lone pair, bond, or −)', 'An empty orbital', 'A proton'],
                correctAnswer: 1,
                explanation: 'Curly arrows show electron movement, so they must start where electrons are - lone pairs, bonds, or negative charges.'
            }
        ]
    },
    {
        id: 'ch5-bonds-quiz',
        afterSection: 'making-breaking-bonds',
        questions: [
            {
                id: 'bond-q1',
                question: 'Which is the best leaving group?',
                options: ['F⁻', 'I⁻', 'OH⁻', 'NH₂⁻'],
                correctAnswer: 1,
                explanation: 'I⁻ is large and can stabilize negative charge well, making it an excellent leaving group.'
            }
        ]
    }
];
