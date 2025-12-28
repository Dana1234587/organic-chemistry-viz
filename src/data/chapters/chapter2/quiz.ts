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
    },

    // === AMINO ACIDS ===
    {
        id: 21,
        question: "What functional groups are present in ALL amino acids?",
        options: ["Alcohol and aldehyde", "Amine and carboxylic acid", "Ketone and ether", "Thiol and amide"],
        correctIndex: 1,
        explanation: "All amino acids have an amine group (-NH₂) and a carboxylic acid group (-COOH) attached to the same carbon (α-carbon).",
        difficulty: "easy"
    },
    {
        id: 22,
        question: "Which amino acid has NO chiral center (is achiral)?",
        options: ["Alanine", "Phenylalanine", "Glycine", "Serine"],
        correctIndex: 2,
        explanation: "Glycine's R group is just H, making the α-carbon attached to two identical groups (H and H), so it's not a chiral center.",
        difficulty: "medium"
    },
    {
        id: 23,
        question: "Phenylalanine differs from alanine in that phenylalanine has:",
        options: ["An extra oxygen", "A benzyl group instead of methyl", "Two nitrogen atoms", "An alkyne group"],
        correctIndex: 1,
        explanation: "Alanine has a methyl (-CH₃) R group. Phenylalanine has a benzyl (-CH₂-C₆H₅) R group, which includes a benzene ring.",
        difficulty: "medium"
    },

    // === COMMON MISTAKES ===
    {
        id: 24,
        question: "Which of these skeletal drawings represents an ERROR?",
        options: ["A zig-zag line for butane", "Writing -O instead of -OH for an alcohol", "Omitting hydrogens on carbons", "Using a corner to represent CH₂"],
        correctIndex: 1,
        explanation: "Writing -O without the H is incorrect! Hydrogens on heteroatoms MUST always be shown. -O would represent an impossible radical species.",
        difficulty: "easy"
    },
    {
        id: 25,
        question: "If someone draws a carbon chain as a straight line, what structure are they ACTUALLY drawing?",
        options: ["A normal alkane", "An alkyne (has triple bond)", "An aromatic ring", "An alcohol"],
        correctIndex: 1,
        explanation: "Straight lines imply 180° bond angles, which only occur with sp hybridization (triple bonds). Drawing alkanes as straight lines is a common beginner mistake!",
        difficulty: "medium"
    },

    // === ADVANCED TOPICS ===
    {
        id: 26,
        question: "What is the oxidation level of the carbon in chloroform (CHCl₃)?",
        options: ["Level 1", "Level 2", "Level 3", "Level 4"],
        correctIndex: 2,
        explanation: "CHCl₃ has 3 C-Cl bonds. Each bond to an electronegative atom counts as 1, so the oxidation level is 3.",
        difficulty: "hard"
    },
    {
        id: 27,
        question: "Which molecule would smell 'fruity' based on its functional group?",
        options: ["A thiol", "An ester", "An amine", "An aldehyde"],
        correctIndex: 1,
        explanation: "Esters typically have fruity or sweet smells. Many fruit flavors (banana, pineapple, strawberry) come from ester molecules.",
        difficulty: "easy"
    },
    {
        id: 28,
        question: "The abbreviation 'Ac' in organic chemistry represents:",
        options: ["Acetyl (CH₃CO-)", "Acetic acid", "Aromatic carbon", "Acetylene"],
        correctIndex: 0,
        explanation: "Ac stands for acetyl, a 2-carbon acyl group (CH₃CO-). It's commonly seen in acetyl chloride (AcCl) and acetic anhydride (Ac₂O).",
        difficulty: "medium"
    },
    {
        id: 29,
        question: "Which ring system is found in caffeine, adenine, and guanine?",
        options: ["Benzene", "Cyclohexane", "Purine", "Furan"],
        correctIndex: 2,
        explanation: "Purine is a bicyclic structure with a 6-membered ring fused to a 5-membered ring, both containing nitrogen. It's the base for DNA nucleobases.",
        difficulty: "hard"
    },
    {
        id: 30,
        question: "In the molecule ibuprofen, the carboxylic acid group is responsible for:",
        options: ["Its anti-inflammatory action", "Its ability to donate a proton (acidity)", "Its aromatic smell", "Its blue color"],
        correctIndex: 1,
        explanation: "The -COOH group can donate a proton (H⁺), making ibuprofen a weak acid. This property also helps it cross cell membranes in its protonated form.",
        difficulty: "hard"
    }
];
