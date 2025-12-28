import { ChapterQuiz } from '../../types';

export const quiz: ChapterQuiz[] = [
    // === SKELETAL STRUCTURES ===
    {
        id: 1,
        question: "In a skeletal drawing, a line end represents which group?",
        options: ["CH", "CH₂", "CH₃", "C"],
        correctIndex: 2,
        explanation: "A line end is a carbon bonded to only 1 other carbon, so it must have 3 hydrogens (CH₃) to satisfy carbon's valency of 4.",
        difficulty: "easy"
    },
    {
        id: 2,
        question: "Why do we draw carbon chains in a zig-zag pattern?",
        options: ["It looks more professional", "To save space on paper", "To represent the 109.5° tetrahedral bond angles", "Because all bonds are actually bent"],
        correctIndex: 2,
        explanation: "The zig-zag represents the actual geometry of sp³ hybridized carbon atoms which have bond angles of approximately 109.5°.",
        difficulty: "easy"
    },
    {
        id: 3,
        question: "Which of these is INCORRECT about skeletal structures?",
        options: ["Carbons are implied at corners", "Hydrogens on carbon are omitted", "Hydrogens on oxygen are omitted", "Line ends represent CH₃ groups"],
        correctIndex: 2,
        explanation: "Hydrogens on heteroatoms (O, N, S) MUST always be shown. Writing '-O' instead of '-OH' would represent a completely different species!",
        difficulty: "medium"
    },

    // === 3D REPRESENTATION ===
    {
        id: 4,
        question: "What does a 'wedge' bond indicate?",
        options: ["Atomic vibration", "Bond going into the page", "Bond coming out of the page", "A double bond"],
        correctIndex: 2,
        explanation: "A solid wedge indicates the bond is projecting outwards, towards the viewer (out of the plane of the paper).",
        difficulty: "easy"
    },
    {
        id: 5,
        question: "A dashed/hashed bond represents a bond that is:",
        options: ["Broken or weak", "Going INTO the page (away from viewer)", "Coming OUT of the page", "Ionic rather than covalent"],
        correctIndex: 1,
        explanation: "Dashed bonds point away from the viewer, into the page. Combined with wedges, this shows 3D structure on 2D paper.",
        difficulty: "easy"
    },

    // === ABBREVIATIONS ===
    {
        id: 6,
        question: "What is the difference between 'Ph' and 'Bn' in organic chemistry?",
        options: ["They are the same thing", "Ph is phenyl (C₆H₅-), Bn is benzyl (C₆H₅CH₂-)", "Ph is for phenol, Bn is for benzene", "Ph has nitrogen, Bn does not"],
        correctIndex: 1,
        explanation: "Phenyl (Ph) is the benzene ring directly attached. Benzyl (Bn) has a CH₂ spacer between the ring and the attachment point. This is a common point of confusion!",
        difficulty: "medium"
    },
    {
        id: 7,
        question: "The abbreviation 'tBu' represents:",
        options: ["Tributyl", "Tertiary butyl (C(CH₃)₃)", "Trans-butyl", "Tetrabenzyl"],
        correctIndex: 1,
        explanation: "tBu (tert-butyl) is a highly branched 4-carbon group: -C(CH₃)₃. The 't' stands for tertiary, indicating the central carbon is bonded to 3 other carbons.",
        difficulty: "medium"
    },

    // === FUNCTIONAL GROUPS ===
    {
        id: 8,
        question: "Which functional group contains a nitrogen atom?",
        options: ["Alcohol", "Ester", "Amine", "Ketone"],
        correctIndex: 2,
        explanation: "Amines are nitrogen-containing functional groups (R-NH₂, R₂NH, or R₃N). They are derived from ammonia and are typically basic.",
        difficulty: "easy"
    },
    {
        id: 9,
        question: "What distinguishes an aldehyde from a ketone?",
        options: ["Aldehydes contain nitrogen", "Aldehydes have C=O at the END of a chain", "Ketones are more reactive", "Aldehydes contain sulfur"],
        correctIndex: 1,
        explanation: "Both have C=O, but in aldehydes, the carbonyl carbon is at the end (R-CHO), while in ketones it's in the middle (R-CO-R').",
        difficulty: "easy"
    },
    {
        id: 10,
        question: "Which pair of functional groups would you find in an amino acid?",
        options: ["Aldehyde and ketone", "Amine and carboxylic acid", "Alcohol and ether", "Nitrile and halide"],
        correctIndex: 1,
        explanation: "Amino acids have an amine group (-NH₂) and a carboxylic acid group (-COOH), which is why they're called AMINO acids!",
        difficulty: "medium"
    },
    {
        id: 11,
        question: "A thiol group has the structure:",
        options: ["R-OH", "R-SH", "R-NH₂", "R-CHO"],
        correctIndex: 1,
        explanation: "Thiols are the sulfur analogs of alcohols. Instead of R-OH, they have R-SH. They are known for their strong, unpleasant odors (skunks, garlic).",
        difficulty: "medium"
    },

    // === OXIDATION LEVELS ===
    {
        id: 12,
        question: "What is the Oxidation Level of a carboxylic acid carbon?",
        options: ["Level 1", "Level 2", "Level 3", "Level 4"],
        correctIndex: 2,
        explanation: "The carboxyl carbon has a double bond to one oxygen (counts as 2) plus a single bond to -OH (counts as 1). Total = 3 bonds to heteroatoms = Level 3.",
        difficulty: "medium"
    },
    {
        id: 13,
        question: "Which molecule has the SAME oxidation level as acetaldehyde (CH₃-CHO)?",
        options: ["Ethanol (CH₃-CH₂-OH)", "Acetic acid (CH₃-COOH)", "Dichloromethane (CH₂Cl₂)", "Methane (CH₄)"],
        correctIndex: 2,
        explanation: "Acetaldehyde has a C=O (2 bonds to O) = Level 2. Dichloromethane has 2 C-Cl bonds = Level 2 as well. Ethanol is Level 1, methane is Level 0.",
        difficulty: "hard"
    },
    {
        id: 14,
        question: "A reaction transforms an alcohol (R-OH) into a ketone (R-CO-R). What type of reaction is this?",
        options: ["Reduction", "Substitution", "Oxidation", "Elimination"],
        correctIndex: 2,
        explanation: "Going from Level 1 (alcohol, 1 bond to O) to Level 2 (ketone, 2 bonds to O) is an increase in oxidation level = OXIDATION.",
        difficulty: "medium"
    },
    {
        id: 15,
        question: "Converting a nitrile (R-C≡N) to an amine (R-CH₂-NH₂) would be classified as:",
        options: ["Oxidation", "Reduction", "Isomerization", "No change"],
        correctIndex: 1,
        explanation: "A nitrile has 3 bonds to nitrogen (Level 3). An amine has 1 bond to nitrogen (Level 1). Going from high to low oxidation level is REDUCTION.",
        difficulty: "hard"
    },

    // === TRIVIAL NAMES ===
    {
        id: 16,
        question: "What is the trivial name for CH₃-CHO?",
        options: ["Formaldehyde", "Acetaldehyde", "Acetone", "Formic acid"],
        correctIndex: 1,
        explanation: "'Acet-' refers to 2-carbon compounds. Acetaldehyde is the 2-carbon aldehyde (IUPAC: ethanal).",
        difficulty: "easy"
    },
    {
        id: 17,
        question: "Which compound is also known as 'hydroxybenzene'?",
        options: ["Benzene", "Aniline", "Phenol", "Toluene"],
        correctIndex: 2,
        explanation: "Phenol is benzene with an -OH group attached (C₆H₅-OH). Aniline is benzene with -NH₂, and toluene is benzene with -CH₃.",
        difficulty: "easy"
    },
    {
        id: 18,
        question: "Pyridine differs from benzene in that:",
        options: ["It has 7 carbons", "One CH is replaced by N in the ring", "It has a -NH₂ group attached", "It is not aromatic"],
        correctIndex: 1,
        explanation: "Pyridine is a 6-membered aromatic ring where one C-H is replaced by nitrogen. The N is IN the ring (not attached as a substituent). It's still aromatic.",
        difficulty: "medium"
    },

    // === RING STRUCTURES ===
    {
        id: 19,
        question: "Why is cyclopropane (3-membered ring) considered 'strained'?",
        options: ["It has too many hydrogens", "Bond angles are forced to 60° instead of ideal 109.5°", "It contains a triple bond", "The carbons are sp hybridized"],
        correctIndex: 1,
        explanation: "In cyclopropane, bond angles are forced to 60° (internal triangle angles), far from the ideal tetrahedral angle of 109.5°. This 'ring strain' makes it reactive.",
        difficulty: "medium"
    },
    {
        id: 20,
        question: "All steroids share a common structural feature. What is it?",
        options: ["A single benzene ring", "Three 6-membered rings and one 5-membered ring fused together", "A carboxylic acid group", "A nitrogen-containing ring"],
        correctIndex: 1,
        explanation: "The steroid skeleton consists of three fused 6-membered rings and one fused 5-membered ring. Cholesterol, testosterone, and estradiol all share this framework.",
        difficulty: "medium"
    }
];
