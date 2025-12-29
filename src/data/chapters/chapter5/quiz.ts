import { QuizQuestion } from '../../types';

export const quiz: QuizQuestion[] = [
    // Collision Theory
    {
        id: 'ch5-q1',
        question: 'What is the activation energy (Eₐ)?',
        options: [
            'The total energy released in a reaction',
            'The minimum energy required to reach the transition state',
            'The energy difference between reactants and products',
            'The kinetic energy of moving molecules'
        ],
        correctAnswer: 1,
        explanation: 'Activation energy is the minimum energy barrier that reactant molecules must overcome to reach the transition state and undergo reaction.'
    },
    {
        id: 'ch5-q2',
        question: 'For a reaction to occur, molecules must:',
        options: [
            'Only collide with each other',
            'Only have sufficient energy',
            'Collide with correct orientation and sufficient energy',
            'Be at absolute zero temperature'
        ],
        correctAnswer: 2,
        explanation: 'Both conditions are necessary - molecules must collide with the correct orientation AND have enough energy to overcome the activation barrier.'
    },
    // Nucleophiles and Electrophiles
    {
        id: 'ch5-q3',
        question: 'A nucleophile is best described as:',
        options: [
            'An electron-poor species that seeks electrons',
            'An electron-rich species that donates electrons',
            'A neutral species with no reactivity',
            'A positively charged ion'
        ],
        correctAnswer: 1,
        explanation: 'Nucleophiles are electron-rich species that donate electrons to electrophiles. "Nucleus-loving" - they seek positive charges.'
    },
    {
        id: 'ch5-q4',
        question: 'Which of the following is a nucleophile?',
        options: [
            'H⁺',
            'BF₃',
            'OH⁻',
            'AlCl₃'
        ],
        correctAnswer: 2,
        explanation: 'OH⁻ is a nucleophile - it has lone pairs and a negative charge, making it electron-rich. The others are electrophiles with empty orbitals or positive centers.'
    },
    {
        id: 'ch5-q5',
        question: 'What makes a carbon atom electrophilic?',
        options: [
            'Being bonded to hydrogen atoms',
            'Being part of a benzene ring',
            'Being bonded to a more electronegative atom (like O or Br)',
            'Having four single bonds'
        ],
        correctAnswer: 2,
        explanation: 'When carbon is bonded to electronegative atoms like oxygen or halogens, it becomes δ⁺ (partially positive) and thus electrophilic.'
    },
    {
        id: 'ch5-q6',
        question: 'In the carbonyl group (C=O), which atom is electrophilic?',
        options: [
            'Oxygen',
            'Carbon',
            'Both equally',
            'Neither'
        ],
        correctAnswer: 1,
        explanation: 'The carbonyl carbon is δ⁺ because oxygen is more electronegative and pulls electron density, making carbon electrophilic.'
    },
    // HOMO-LUMO
    {
        id: 'ch5-q7',
        question: 'What does HOMO stand for?',
        options: [
            'Highest Orbital Molecular Overlap',
            'Highest Occupied Molecular Orbital',
            'Horizontal Orbital Movement Organization',
            'Heterolytic Orbital Mechanism Order'
        ],
        correctAnswer: 1,
        explanation: 'HOMO = Highest Occupied Molecular Orbital - the highest energy orbital that contains electrons.'
    },
    {
        id: 'ch5-q8',
        question: 'During a nucleophilic attack, electrons flow from:',
        options: [
            'LUMO of nucleophile to HOMO of electrophile',
            'HOMO of electrophile to LUMO of nucleophile',
            'HOMO of nucleophile to LUMO of electrophile',
            'LUMO of both species'
        ],
        correctAnswer: 2,
        explanation: 'Electrons flow from the filled HOMO of the nucleophile into the empty LUMO of the electrophile.'
    },
    {
        id: 'ch5-q9',
        question: 'A smaller HOMO-LUMO energy gap indicates:',
        options: [
            'A slower reaction',
            'No reaction possible',
            'A stronger, faster interaction',
            'Reverse reaction direction'
        ],
        correctAnswer: 2,
        explanation: 'Smaller energy gaps mean better orbital matching, leading to stronger interactions and faster reactions.'
    },
    // Curly Arrows
    {
        id: 'ch5-q10',
        question: 'A curly arrow in a mechanism represents:',
        options: [
            'Movement of atoms',
            'Movement of one electron',
            'Movement of an electron pair',
            'Direction of the reaction'
        ],
        correctAnswer: 2,
        explanation: 'A full curly arrow represents the movement of a pair of electrons (2 electrons).'
    },
    {
        id: 'ch5-q11',
        question: 'Where should a curly arrow START from?',
        options: [
            'A positive charge',
            'An atom with no lone pairs',
            'A lone pair, bond, or negative charge',
            'The product molecule'
        ],
        correctAnswer: 2,
        explanation: 'Arrows must start from electrons - either a lone pair, a bond (which contains electrons), or a negative charge (indicating excess electrons).'
    },
    {
        id: 'ch5-q12',
        question: 'A "fishhook" arrow (⇀) represents the movement of:',
        options: [
            'Two electrons',
            'One electron',
            'Three electrons',
            'No electrons'
        ],
        correctAnswer: 1,
        explanation: 'Fishhook arrows show movement of single electrons, used in radical (homolytic) mechanisms.'
    },
    {
        id: 'ch5-q13',
        question: 'Which statement about curly arrows is TRUE?',
        options: [
            'They can start from a positive charge',
            'They should point toward nucleophiles',
            'They must point toward electrophilic centers',
            'They represent heat energy'
        ],
        correctAnswer: 2,
        explanation: 'Electrons flow toward electrophiles (electron-poor species), so arrows point toward electrophilic centers.'
    },
    // Bond Making and Breaking
    {
        id: 'ch5-q14',
        question: 'When an arrow points TO an atom, what happens?',
        options: [
            'A bond is broken',
            'A new bond is formed',
            'The atom is eliminated',
            'Nothing changes'
        ],
        correctAnswer: 1,
        explanation: 'When a curly arrow points to an atom, a new bond is being formed between the electron source and that atom.'
    },
    {
        id: 'ch5-q15',
        question: 'When an arrow points INTO an existing bond, what happens?',
        options: [
            'The bond is strengthened',
            'A double bond forms',
            'The bond is broken',
            'The molecule rotates'
        ],
        correctAnswer: 2,
        explanation: 'An arrow pointing into a bond shows that bond is breaking, with electrons moving to one of the atoms.'
    },
    {
        id: 'ch5-q16',
        question: 'Which is the BEST leaving group?',
        options: [
            'F⁻',
            'OH⁻',
            'I⁻',
            'H⁻'
        ],
        correctAnswer: 2,
        explanation: 'I⁻ is the best leaving group among these because iodine is large and can stabilize the negative charge by dispersing it over a larger area.'
    },
    {
        id: 'ch5-q17',
        question: 'Why is water (H₂O) a good leaving group when formed from protonated alcohol?',
        options: [
            'Because water is highly reactive',
            'Because water leaves as a neutral molecule',
            'Because water is a strong base',
            'Because water is very small'
        ],
        correctAnswer: 1,
        explanation: 'Water is a good leaving group because it departs as a neutral, stable molecule rather than as a charged species.'
    },
    // Mechanisms
    {
        id: 'ch5-q18',
        question: 'In the SN2 reaction HO⁻ + CH₃Br → CH₃OH + Br⁻, what happens simultaneously?',
        options: [
            'Only bond formation',
            'Only bond breaking',
            'Bond formation and bond breaking in one step',
            'Two separate steps'
        ],
        correctAnswer: 2,
        explanation: 'SN2 is a concerted mechanism - the new C-O bond forms while the C-Br bond breaks in a single step.'
    },
    {
        id: 'ch5-q19',
        question: 'What must be conserved in every step of a mechanism?',
        options: [
            'Only the number of bonds',
            'Only the number of atoms',
            'Total charge and mass',
            'Only the energy'
        ],
        correctAnswer: 2,
        explanation: 'Both charge and mass must be conserved in each step of a reaction mechanism.'
    },
    {
        id: 'ch5-q20',
        question: 'What is a dative (coordinate) bond?',
        options: [
            'A bond where each atom contributes one electron',
            'A bond where both electrons come from one atom',
            'A bond between two metals',
            'A bond that can rotate freely'
        ],
        correctAnswer: 1,
        explanation: 'A dative bond forms when both electrons in the bonding pair come from a single atom (the nucleophile donating to an empty orbital).'
    },
    // Reaction Types
    {
        id: 'ch5-q21',
        question: 'In an addition reaction:',
        options: [
            'A group is replaced by another',
            'Atoms are added across a multiple bond',
            'A multiple bond is formed by removing atoms',
            'Atoms rearrange within the molecule'
        ],
        correctAnswer: 1,
        explanation: 'Addition reactions add atoms across a double or triple bond, converting it to a single bond or double bond.'
    },
    {
        id: 'ch5-q22',
        question: 'In a substitution reaction:',
        options: [
            'Atoms are added to the molecule',
            'A multiple bond forms',
            'One group replaces another',
            'The molecule isomerizes'
        ],
        correctAnswer: 2,
        explanation: 'Substitution reactions involve replacement of one atom or group with another (e.g., Br replaced by OH).'
    },
    {
        id: 'ch5-q23',
        question: 'Elimination reactions typically produce:',
        options: [
            'Alcohols',
            'Alkanes',
            'Alkenes or alkynes (multiple bonds)',
            'Carboxylic acids'
        ],
        correctAnswer: 2,
        explanation: 'Elimination reactions remove atoms (often H and a leaving group) to form multiple bonds like C=C or C≡C.'
    },
    {
        id: 'ch5-q24',
        question: 'Which conditions favor elimination over substitution?',
        options: [
            'Weak base, low temperature',
            'Strong base, high temperature',
            'Neutral conditions',
            'Aqueous solution only'
        ],
        correctAnswer: 1,
        explanation: 'Strong bases and higher temperatures favor elimination reactions over substitution.'
    },
    {
        id: 'ch5-q25',
        question: 'When CN⁻ attacks a carbonyl carbon (C=O), what happens to the π electrons?',
        options: [
            'They are destroyed',
            'They move to the oxygen atom',
            'They move to the carbon atom',
            'Nothing happens to them'
        ],
        correctAnswer: 1,
        explanation: 'As the nucleophile attacks the carbonyl carbon, the π bond electrons move to the more electronegative oxygen, creating an alkoxide (C-O⁻).'
    }
];
