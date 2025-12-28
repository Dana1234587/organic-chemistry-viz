import { FlashcardData, GlossaryTerm, MiniQuizData } from '../../types';

export const flashcards: FlashcardData[] = [
    // Drawing & Structure
    { id: "fc2-1", front: "What is a 'skeletal structure'?", back: "A simplified drawing where carbons are vertices/ends of lines and H's on carbon are omitted.", category: "Drawing" },
    { id: "fc2-2", front: "Why do we draw carbon chains as zig-zags?", back: "To represent the tetrahedral bond angles (~109.5°) of sp³ carbons. A straight line would imply a triple bond!", category: "Drawing" },
    { id: "fc2-3", front: "When MUST you write hydrogens in a skeletal structure?", back: "When they are on HETEROATOMS (O, N, S). Write -OH not -O, -NH₂ not -N.", category: "Drawing" },
    { id: "fc2-4", front: "What does a vertex (corner) represent in a skeletal structure?", back: "A carbon atom. Count bonds to determine how many H's: 4 - visible bonds = number of H's.", category: "Drawing" },

    // 3D Representation
    { id: "fc2-5", front: "What does a solid wedge bond represent?", back: "A bond coming OUT of the page towards you.", category: "3D Structure" },
    { id: "fc2-6", front: "What does a dashed/hashed bond represent?", back: "A bond going INTO the page away from you.", category: "3D Structure" },

    // Abbreviations
    { id: "fc2-7", front: "What does 'Ph' stand for?", back: "Phenyl - a benzene ring as a substituent (C₆H₅-).", category: "Abbreviations" },
    { id: "fc2-8", front: "What does 'Bn' stand for?", back: "Benzyl - a CH₂ attached to benzene (PhCH₂- or C₆H₅CH₂-).", category: "Abbreviations" },
    { id: "fc2-9", front: "What is the difference between Ph and Bn?", back: "Ph (Phenyl) attaches directly. Bn (Benzyl) has a CH₂ spacer between the ring and attachment point.", category: "Abbreviations" },
    { id: "fc2-10", front: "What do Me, Et, Pr, Bu stand for?", back: "Methyl (1C), Ethyl (2C), Propyl (3C), Butyl (4C).", category: "Abbreviations" },
    { id: "fc2-11", front: "What does 'tBu' mean?", back: "Tert-butyl: -C(CH₃)₃. A highly branched 4-carbon group.", category: "Abbreviations" },
    { id: "fc2-12", front: "What does 'R' represent?", back: "A generic placeholder for any alkyl group (or sometimes H).", category: "Abbreviations" },

    // Functional Groups
    { id: "fc2-13", front: "What is a functional group?", back: "The reactive part of a molecule that determines its chemistry (e.g., -OH, C=O, -NH₂).", category: "Functional Groups" },
    { id: "fc2-14", front: "Aldehyde vs Ketone: What's the difference?", back: "Aldehyde: C=O at END of chain (R-CHO). Ketone: C=O in MIDDLE of chain (R-CO-R).", category: "Functional Groups" },
    { id: "fc2-15", front: "What is a thiol?", back: "The sulfur version of an alcohol: R-SH. Known for strong, unpleasant smells.", category: "Functional Groups" },
    { id: "fc2-16", front: "What functional groups are in an amide?", back: "A carbonyl (C=O) directly attached to nitrogen: R-CO-NH₂. Found in proteins.", category: "Functional Groups" },
    { id: "fc2-17", front: "What is a nitrile?", back: "A carbon triple-bonded to nitrogen: R-C≡N.", category: "Functional Groups" },

    // Oxidation Levels
    { id: "fc2-18", front: "What defines Oxidation Level?", back: "The number of bonds a carbon has to heteroatoms (O, N, halogens). C=O counts as 2!", category: "Oxidation Levels" },
    { id: "fc2-19", front: "What is Oxidation Level 0?", back: "No bonds to heteroatoms: alkanes and hydrocarbons.", category: "Oxidation Levels" },
    { id: "fc2-20", front: "What is Oxidation Level 1?", back: "One bond to heteroatom: alcohols (C-OH), amines (C-NH₂), halides (C-X).", category: "Oxidation Levels" },
    { id: "fc2-21", front: "What is Oxidation Level 2?", back: "Two bonds to heteroatoms: aldehydes, ketones (C=O counts as 2).", category: "Oxidation Levels" },
    { id: "fc2-22", front: "What is Oxidation Level 3?", back: "Three bonds to heteroatoms: carboxylic acids, esters, amides, nitriles.", category: "Oxidation Levels" },

    // Trivial Names
    { id: "fc2-23", front: "What is formaldehyde?", back: "The simplest aldehyde: H-CHO (IUPAC: methanal). 1 carbon.", category: "Trivial Names" },
    { id: "fc2-24", front: "What is acetone?", back: "The simplest ketone: CH₃-CO-CH₃ (IUPAC: propan-2-one).", category: "Trivial Names" },
    { id: "fc2-25", front: "What is acetic acid?", back: "2-carbon carboxylic acid: CH₃-COOH (IUPAC: ethanoic acid). Found in vinegar.", category: "Trivial Names" },
    { id: "fc2-26", front: "What is phenol?", back: "Benzene with -OH attached: C₆H₅-OH. Important antiseptic.", category: "Trivial Names" },
    { id: "fc2-27", front: "What is aniline?", back: "Benzene with -NH₂ attached: C₆H₅-NH₂. Used in dye synthesis.", category: "Trivial Names" },
    { id: "fc2-28", front: "What is pyridine?", back: "A 6-membered aromatic ring where one CH is replaced by N (N is IN the ring).", category: "Trivial Names" },

    // Amino Acids
    { id: "fc2-29", front: "What functional groups define an amino acid?", back: "An amine (-NH₂) and a carboxylic acid (-COOH) attached to the same carbon (α-carbon).", category: "Amino Acids" },
    { id: "fc2-30", front: "What is unique about glycine among amino acids?", back: "Glycine is the only achiral amino acid. Its R group is just H, making the α-carbon non-chiral.", category: "Amino Acids" },
    { id: "fc2-31", front: "What makes phenylalanine special?", back: "It has a benzyl group (PhCH₂-) as its R group, making it aromatic.", category: "Amino Acids" },
    { id: "fc2-32", front: "Why does chirality matter in drug molecules?", back: "Enzymes recognize 3D shape. Wrong chirality = drug may not work or cause harm (e.g., thalidomide).", category: "Amino Acids" },
    { id: "fc2-33", front: "What is Alanine's R group?", back: "A methyl group (-CH₃). It's the simplest chiral amino acid.", category: "Amino Acids" },
    { id: "fc2-34", front: "What does 'L' in L-amino acid mean?", back: "The natural form of amino acids with specific 3D configuration. Our bodies use L-amino acids.", category: "Amino Acids" }
];

export const glossary: GlossaryTerm[] = [
    // Core Concepts
    { id: "g2-1", term: "Skeletal Structure", definition: "A simplified drawing where carbons are vertices/ends of lines and C-H bonds are implied.", category: "Drawing" },
    { id: "g2-2", term: "Heteroatom", definition: "Any atom that is NOT carbon or hydrogen (e.g., N, O, S, halogens).", category: "General" },
    { id: "g2-3", term: "Functional Group", definition: "A specific atom or group that determines the chemical reactivity of a molecule.", category: "General" },

    // Bond Types
    { id: "g2-4", term: "Wedge Bond", definition: "A bond drawn as a solid triangle, indicating it points towards the viewer (out of the page).", category: "3D Structure" },
    { id: "g2-5", term: "Dash Bond", definition: "A bond drawn as a series of dashes, indicating it points away from the viewer (into the page).", category: "3D Structure" },

    // Compound Classes
    { id: "g2-6", term: "Alkane", definition: "A saturated hydrocarbon containing only single bonds (Oxidation Level 0).", category: "Classes" },
    { id: "g2-7", term: "Alkene", definition: "A hydrocarbon containing at least one carbon-carbon double bond.", category: "Classes" },
    { id: "g2-8", term: "Alkyne", definition: "A hydrocarbon containing at least one carbon-carbon triple bond.", category: "Classes" },
    { id: "g2-9", term: "Arene", definition: "An aromatic hydrocarbon containing a benzene ring or similar aromatic system.", category: "Classes" },

    // Saturation
    { id: "g2-10", term: "Saturated", definition: "A molecule with maximum hydrogen content (only single bonds between carbons).", category: "General" },
    { id: "g2-11", term: "Unsaturated", definition: "A molecule with less than maximum hydrogen content (contains double or triple bonds).", category: "General" },

    // Ring Terms
    { id: "g2-12", term: "Aromatic", definition: "A planar, cyclic molecule with special stability from delocalized electrons. Benzene is the prototype.", category: "Rings" },
    { id: "g2-13", term: "Aliphatic", definition: "Any organic compound that is NOT aromatic. Includes chains and non-aromatic rings.", category: "Rings" },
    { id: "g2-14", term: "Ring Strain", definition: "Instability in small rings due to bond angles deviating from ideal (109.5°).", category: "Rings" },
    { id: "g2-15", term: "Steroid", definition: "A molecule with four fused rings (three 6-membered, one 5-membered). Includes cholesterol, hormones.", category: "Rings" },

    // Oxidation
    { id: "g2-16", term: "Oxidation Level", definition: "Classification of carbon atoms based on number of bonds to heteroatoms (0-4).", category: "Oxidation" },
    { id: "g2-17", term: "Oxidation", definition: "Increasing the number of bonds to heteroatoms (moving up in oxidation level).", category: "Oxidation" },
    { id: "g2-18", term: "Reduction", definition: "Decreasing the number of bonds to heteroatoms (moving down in oxidation level).", category: "Oxidation" },

    // Functional Groups
    { id: "g2-19", term: "Carbonyl", definition: "The C=O double bond group, found in aldehydes, ketones, acids, esters, and amides.", category: "Functional Groups" },
    { id: "g2-20", term: "Acyl Chloride", definition: "A carboxylic acid derivative where -OH is replaced by -Cl (R-COCl). Very reactive.", category: "Functional Groups" },
    { id: "g2-21", term: "Anhydride", definition: "Two carbonyl groups sharing an oxygen: R-CO-O-CO-R.", category: "Functional Groups" },
    { id: "g2-22", term: "Acetal", definition: "A carbon with two -OR groups attached (R-CH(OR)₂). Stable protecting group.", category: "Functional Groups" },
    { id: "g2-23", term: "Hemiacetal", definition: "A carbon with one -OH and one -OR attached (R-CH(OH)(OR)). Often unstable.", category: "Functional Groups" }
];

export const miniQuizzes: MiniQuizData[] = [
    {
        id: "mq2-1",
        afterSection: "drawing-organic-structures",
        questions: [
            {
                question: "In a skeletal structure, what does a vertex (corner) represent?",
                options: ["A hydrogen atom", "A functional group", "A carbon atom", "An ionic bond"],
                correctIndex: 2,
                hint: "We omit the letter C, so corners represent carbon atoms."
            },
            {
                question: "Which hydrogens MUST be drawn in a skeletal structure?",
                options: ["Hydrogens on terminal carbons", "Hydrogens on heteroatoms (O, N, S)", "No hydrogens ever", "All hydrogens"],
                correctIndex: 1,
                hint: "We can only omit H's that are attached to carbon."
            }
        ]
    },
    {
        id: "mq2-2",
        afterSection: "functional-groups",
        questions: [
            {
                question: "Which functional group is found in alcohols?",
                options: ["-CHO", "-COOH", "-OH", "-NH₂"],
                correctIndex: 2,
                hint: "Think about what makes alcoholic beverages 'alcoholic'."
            },
            {
                question: "What type of compound has a C=O group in the MIDDLE of a carbon chain?",
                options: ["Aldehyde", "Ketone", "Carboxylic acid", "Alcohol"],
                correctIndex: 1,
                hint: "Aldehydes have C=O at the END. What's the other carbonyl type?"
            }
        ]
    },
    {
        id: "mq2-3",
        afterSection: "oxidation-levels",
        questions: [
            {
                question: "Which is an Oxidation Level 2 compound?",
                options: ["Ethanol (Alcohol)", "Ethane (Alkane)", "Acetone (Ketone)", "Acetic Acid"],
                correctIndex: 2,
                hint: "Count bonds to heteroatoms. C=O counts as 2."
            },
            {
                question: "Going from ethanol to acetaldehyde is an example of:",
                options: ["Reduction", "Oxidation", "Isomerization", "Polymerization"],
                correctIndex: 1,
                hint: "Are you going UP or DOWN in oxidation level?"
            }
        ]
    },
    {
        id: "mq2-4",
        afterSection: "trivial-names",
        questions: [
            {
                question: "Acetone is the trivial name for which IUPAC compound?",
                options: ["Ethanal", "Propan-2-one", "Propan-1-ol", "Methanal"],
                correctIndex: 1,
                hint: "Acetone is a 3-carbon ketone."
            },
            {
                question: "Which compound is 'benzene + OH'?",
                options: ["Toluene", "Aniline", "Phenol", "Benzaldehyde"],
                correctIndex: 2,
                hint: "Toluene has -CH₃, Aniline has -NH₂..."
            }
        ]
    },
    {
        id: "mq2-5",
        afterSection: "real-drug-examples",
        questions: [
            {
                question: "Which functional groups are present in vanillin (vanilla)?",
                options: ["Only an aldehyde", "Aldehyde, ether, and phenol", "Carboxylic acid and amine", "Ketone and alcohol"],
                correctIndex: 1,
                hint: "Vanillin has -CHO, -OCH₃, and -OH (on benzene ring)."
            }
        ]
    }
];
