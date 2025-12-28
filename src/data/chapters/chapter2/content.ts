import { ChapterSection } from '../../types';

export const introduction = `Welcome to the language of organic chemistry! Drawing organic molecules is not just about making pretty pictures—it's about communicating chemical reality. In organic chemistry, the structure IS the chemistry.

Because organic molecules can become incredibly complex (some natural products have hundreds of atoms!), chemists have developed elegant shorthand conventions to draw them quickly and clearly. This chapter will teach you to "read and write" organic chemistry fluently.

What you will master:
• The zig-zag notation for carbon chains
• How to interpret skeletal structures like a professional chemist  
• The complete catalog of functional groups
• Clayden's powerful oxidation level system
• Essential trivial names you must memorize

By the end, you'll be able to look at a drug like Ibuprofen and instantly identify all its functional groups!`;

export const sections: ChapterSection[] = [
    {
        id: "why-skeletal-structures",
        title: "Why Skeletal Structures Matter: The Palytoxin Example",
        content: `Before we dive into the rules, let's see WHY skeletal structures are essential.

Palytoxin is one of the most complex and toxic natural products known. It was isolated from a coral in Hawaii. If we tried to draw every atom:
• 129 Carbon atoms
• 223 Hydrogen atoms  
• 54 Oxygen atoms
• 3 Nitrogen atoms

The full structure would be unreadable chaos! But with skeletal notation, even Palytoxin can be drawn clearly on a single page.

THE POWER OF SIMPLIFICATION:
Skeletal structures remove "noise" (the repetitive C's and H's) so you can focus on:
1. The overall shape of the molecule
2. The functional groups (the reactive parts)
3. The stereochemistry (3D arrangement)

Even simple molecules benefit. Compare these for pentane (C₅H₁₂):

Full Structure: CH₃-CH₂-CH₂-CH₂-CH₃
Skeletal Structure: A simple zig-zag with 5 corners

Which is faster to draw? Which is easier to read? The skeletal version, always!`,
        keyPoints: [
            "Skeletal structures simplify complex molecules",
            "They reveal molecular shape and functional groups",
            "Even simple molecules benefit from skeletal notation",
            "Professional chemists use skeletal structures exclusively"
        ],
        funFact: "Palytoxin is so toxic that the Hawaiian name 'limu-make-o-Hana' means 'the seaweed of death from Hana'. Just 4 micrograms (0.000004 grams) can kill a human!",
        diagrams: [
            { type: 'skeletal', props: { molecule: 'butane', showLabels: true }, caption: 'Butane - 4 carbon zig-zag' },
            { type: 'skeletal', props: { molecule: 'pentane', showLabels: true }, caption: 'Pentane - 5 carbon zig-zag' },
            { type: 'skeletal', props: { molecule: 'hexane', showLabels: true }, caption: 'Hexane - 6 carbon zig-zag' }
        ]
    },
    {
        id: "drawing-organic-structures",
        title: "The Three Golden Rules of Skeletal Structures",
        content: `Drawing molecules correctly is the first step to understanding them. Master these three guidelines and you'll draw like a pro.

═══════════════════════════════════════
RULE 1: The Zig-Zag Line
═══════════════════════════════════════

Carbon chains are ALWAYS drawn as zig-zag lines. Why?

Because carbon atoms with single bonds are tetrahedral, with bond angles of approximately 109.5°. A zig-zag line on paper is the best 2D representation of this 3D shape.

Bond Angles by Hybridization:
• sp³ (single bonds) → 109.5° → Zig-zag drawing
• sp² (double bonds) → 120° → Slightly wider angle
• sp (triple bonds) → 180° → Straight line

⚠️ WARNING: Never draw a straight line for an alkane chain!
If you draw a straight carbon chain, chemists will think you mean an alkyne (triple bond), which IS linear (180°).

═══════════════════════════════════════
RULE 2: Omit Carbon Labels
═══════════════════════════════════════

We NEVER write the letter 'C' for carbon atoms. Instead:

• Line end = CH₃ (methyl group)
• Simple corner = CH₂ (methylene)
• Corner with 1 branch = CH (methine)
• Corner with 2+ branches = C (quaternary)

How to count hydrogens: Carbon ALWAYS forms 4 bonds. Count the visible bonds, subtract from 4, and that's how many H's are attached.

Example: A corner with 2 lines = 2 bonds shown → 4 - 2 = 2 hydrogens → CH₂

═══════════════════════════════════════
RULE 3: Omit Hydrogens on Carbon
═══════════════════════════════════════

We do NOT draw hydrogen atoms attached to carbon. They are "invisible" but implied.

❗ THE CRITICAL EXCEPTION:
You MUST write out hydrogens attached to heteroatoms (atoms that are NOT carbon or hydrogen).

✓ Correct: -OH, -NH₂, -SH
✗ Wrong: -O, -N, -S

This is the #1 beginner mistake. If you forget the H on oxygen, you've drawn a completely different (often impossible) molecule!`,
        keyPoints: [
            "Draw carbon chains as zig-zags (109.5° angles)",
            "Carbon atoms are implied at corners and ends",
            "Hydrogen atoms on carbons are omitted (count bonds to figure out H's)",
            "Hydrogens on Heteroatoms (O, N, S...) MUST ALWAYS be drawn",
            "A line end = CH₃, a corner = CH₂ (usually)"
        ],
        funFact: "The zig-zag convention is so universal that pharmaceutical patents worth billions of dollars are drawn using nothing but lines, letters for heteroatoms, and wedges!",
        commonMistake: "Writing '-O' instead of '-OH' in an alcohol. This single missing H changes your molecule from a stable alcohol into an impossible alkoxy radical!",
        diagrams: [
            { type: 'skeletal', props: { molecule: 'propane', showLabels: true, highlightCarbons: true }, caption: 'Propane with carbons highlighted' },
            { type: 'skeletal', props: { molecule: 'cyclohexane', showLabels: true }, caption: 'Cyclohexane ring' },
            { type: 'skeletal', props: { molecule: 'benzene', showLabels: true }, caption: 'Benzene (aromatic)' }
        ]
    },
    {
        id: "common-abbreviations",
        title: "Common Abbreviations: The Chemist's Shorthand",
        content: `Professional chemists use abbreviations constantly. You MUST memorize these to read the literature.

═══════════════════════════════════════
ALKYL GROUP ABBREVIATIONS
═══════════════════════════════════════

Me = Methyl (-CH₃) ──────────── 1 carbon
Et = Ethyl (-CH₂CH₃) ─────────── 2 carbons
Pr = Propyl (-CH₂CH₂CH₃) ────── 3 carbons
iPr = Isopropyl (-CH(CH₃)₂) ──── 3 carbons (branched)
Bu = Butyl (-CH₂CH₂CH₂CH₃) ─── 4 carbons
tBu = tert-Butyl (-C(CH₃)₃) ──── 4 carbons (branched)

═══════════════════════════════════════
AROMATIC ABBREVIATIONS
═══════════════════════════════════════

Ph = Phenyl ─── A benzene ring as substituent (C₆H₅-)
Bn = Benzyl ─── A CH₂ attached to benzene (PhCH₂-)
Ar = Aryl ───── Any aromatic ring

❗ IMPORTANT: Phenyl vs Benzyl - A Common Confusion!
• Phenyl (Ph): The benzene ring directly attached (no CH₂)
• Benzyl (Bn): Benzene ring with a CH₂ spacer

Ph-OH = Phenol (OH directly on ring)
Bn-OH = Benzyl alcohol (PhCH₂-OH, with CH₂ spacer)

═══════════════════════════════════════
WILDCARD SYMBOLS
═══════════════════════════════════════

R = Any alkyl group or hydrogen
R' = A different R group
X = Any halogen (F, Cl, Br, I)

═══════════════════════════════════════
COMMON SOLVENT ABBREVIATIONS
═══════════════════════════════════════

THF = Tetrahydrofuran
DMF = Dimethylformamide
DMSO = Dimethyl sulfoxide
DCM = Dichloromethane
EtOAc = Ethyl acetate
MeOH = Methanol
EtOH = Ethanol`,
        keyPoints: [
            "Me = Methyl, Et = Ethyl, Pr = Propyl, Bu = Butyl",
            "Ph = Phenyl (benzene ring), Bn = Benzyl (PhCH₂)",
            "R = generic alkyl group, X = any halogen",
            "i = iso (branched), t = tertiary (highly branched)",
            "Know solvent abbreviations: THF, DMF, DMSO, DCM"
        ],
        commonMistake: "Confusing Phenyl (Ph) and Benzyl (Bn). Remember: Benzyl has a 'bonus' CH₂ between the ring and the attachment point.",
        diagrams: [
            { type: 'abbreviations', props: { showAll: true }, caption: 'Common alkyl and aromatic abbreviations' }
        ]
    },
    {
        id: "hydrocarbon-frameworks",
        title: "Hydrocarbon Frameworks: Chains and Rings",
        content: `The hydrocarbon "skeleton" provides the shape and support of the molecule. It's usually unreactive—the chemistry happens at the functional groups attached to it.

═══════════════════════════════════════
TYPES OF CARBON CHAINS
═══════════════════════════════════════

Saturated vs Unsaturated:

• Alkane: Single bonds only → Saturated → Example: Propane
• Alkene: Contains C=C → Unsaturated → Example: Propene  
• Alkyne: Contains C≡C → Unsaturated → Example: Propyne

"Saturated" means the carbons are bonded to the maximum number of hydrogens possible. Adding a double or triple bond "unsaturates" the molecule (fewer H's).

═══════════════════════════════════════
RING STRUCTURES (CYCLIC COMPOUNDS)
═══════════════════════════════════════

Carbon chains can "bite their own tail" to form rings:

Common Ring Sizes:
• 3-membered (Cyclopropane) → Strained! (60° angles, wants 109°)
• 4-membered (Cyclobutane) → Strained (90° angles)
• 5-membered (Cyclopentane) → Stable (nearly ideal angles)
• 6-membered (Cyclohexane) → Very stable (adopts "chair" shape)

═══════════════════════════════════════
AROMATIC RINGS: BENZENE AND BEYOND
═══════════════════════════════════════

Benzene is special. It's a 6-membered ring with alternating double bonds, but it behaves VERY differently from alkenes.

Key features:
• Completely planar (flat)
• Extra stability from delocalization
• Drawn as a hexagon with a circle inside (or alternating double bonds)
• Does NOT react like typical double bonds

Fused Ring Systems:
Aromatic rings can share edges:
• Naphthalene: Two fused benzene rings (mothball smell)
• Anthracene: Three fused rings in a row
• Pyrene: Four fused rings

═══════════════════════════════════════
STEROIDS: THE ULTIMATE RING SYSTEM
═══════════════════════════════════════

Steroids have a specific 4-ring structure that appears in many important hormones:

Examples:
• Cholesterol (membrane component)
• Testosterone (male hormone)
• Estradiol (female hormone)
• Cortisol (stress hormone)

The steroid skeleton has 3 six-membered rings and 1 five-membered ring fused together. Despite looking complex, every steroid shares this same basic framework!`,
        keyPoints: [
            "Saturated = maximum hydrogens (single bonds only)",
            "Unsaturated = contains double or triple bonds",
            "Small rings (3-4 carbon) are strained",
            "6-membered rings (cyclohexane, benzene) are very stable",
            "Steroids have a specific 4-ring fused structure"
        ],
        realWorldConnection: "Cholesterol (a steroid) is so important that every cell in your body makes it. It keeps cell membranes fluid and is the starting material for all steroid hormones!"
    },
    {
        id: "functional-groups",
        title: "Functional Groups: The Complete Catalog",
        content: `If the carbon skeleton is the frame, Functional Groups are the engine. These specific atoms or groups determine HOW the molecule reacts.

💡 THE BIG IDEA: Molecules with the same functional group behave similarly.
If you learn how ONE aldehyde reacts, you know how ALL aldehydes react!

═══════════════════════════════════════
GROUP 1: HYDROCARBONS (C-C Bonds)
═══════════════════════════════════════

• Alkane: C-C single bonds → Unreactive (no functional group!)
• Alkene: C=C double bond → Reactive; adds things across bond
• Alkyne: C≡C triple bond → Very reactive
• Arene: Benzene ring → Special stability; unique reactions

═══════════════════════════════════════
GROUP 2: SINGLE BOND TO HETEROATOM
═══════════════════════════════════════

• Alcohol: R-OH → Hydrogen bonding; can be acidic
• Ether: R-O-R → Relatively unreactive; good solvents
• Amine: R-NH₂ → Basic (accepts H⁺); nucleophilic
• Thiol: R-SH → Sulfur version of alcohol; smelly!
• Sulfide: R-S-R → Sulfur version of ether
• Halide: R-X → X = F, Cl, Br, or I

═══════════════════════════════════════
GROUP 3: CARBONYL COMPOUNDS (C=O)
═══════════════════════════════════════

The carbonyl group is THE most important in organic chemistry!

• Aldehyde: R-CHO → Carbonyl at END of chain
• Ketone: R-CO-R → Carbonyl in MIDDLE of chain
• Carboxylic Acid: R-COOH → Acidic! (gives up H⁺)
• Ester: R-COO-R → Sweet/fruity smells
• Amide: R-CONH₂ → Found in proteins
• Acyl Chloride: R-COCl → Very reactive!
• Acid Anhydride: R-CO-O-CO-R → Two carbonyls sharing oxygen
• Nitrile: R-C≡N → Triple bond to nitrogen

═══════════════════════════════════════
GROUP 4: SPECIAL GROUPS
═══════════════════════════════════════

• Nitro: R-NO₂ → Found in explosives, drugs
• Acetal: R-CH(OR)₂ → Two ether oxygens on same carbon
• Hemiacetal: R-CH(OH)(OR) → One OH + one OR on same carbon
• Imine: R-C=N-R → C=N double bond

═══════════════════════════════════════
KEY REACTIVITY RULES
═══════════════════════════════════════

• Alcohols: Can act as weak acids (lose H⁺) or nucleophiles
• Amines: Basic (grab H⁺) and nucleophilic
• Carbonyls: The carbon is electrophilic (attacked by negative things)
• Carboxylic acids: Actually acidic (give up H⁺)

Understanding these patterns will help you predict reactions in later chapters!`,
        keyPoints: [
            "Functional groups determine chemical reactivity",
            "Alkanes have NO functional group (unreactive)",
            "Carbonyl group (C=O) is the most important",
            "Aldehyde = C=O at end; Ketone = C=O in middle",
            "Carboxylic acids are acidic; Amines are basic",
            "Esters (fruity), Thiols (smelly), Amides (in proteins)"
        ],
        realWorldConnection: "The smell of bananas comes from an ESTER (isoamyl acetate). The smell of rotting fish comes from an AMINE (trimethylamine). The smell of skunks comes from a THIOL. Functional groups determine what your nose detects!",
        diagrams: [
            { type: 'functional-group', props: { group: 'alcohol' }, caption: 'Alcohol (R-OH)' },
            { type: 'functional-group', props: { group: 'aldehyde' }, caption: 'Aldehyde (R-CHO)' },
            { type: 'functional-group', props: { group: 'ketone' }, caption: 'Ketone (R-CO-R)' },
            { type: 'functional-group', props: { group: 'carboxylic-acid' }, caption: 'Carboxylic Acid' },
            { type: 'functional-group', props: { group: 'amine' }, caption: 'Amine (R-NH₂)' },
            { type: 'functional-group', props: { group: 'ether' }, caption: 'Ether (R-O-R)' }
        ]
    },
    {
        id: "oxidation-levels",
        title: "Classification by Oxidation Level",
        content: `One of Clayden's most powerful organizational tools is classifying carbon atoms by their Oxidation Level. This tells you how "oxidized" a carbon is.

═══════════════════════════════════════
THE DEFINITION
═══════════════════════════════════════

Oxidation Level = Number of bonds from carbon to a heteroatom
(any atom more electronegative than carbon: O, N, S, Cl, Br, etc.)

Level 0: 0 bonds to heteroatom → Alkanes (CH₄, C₂H₆)
Level 1: 1 bond → Alcohols, Amines, Halides
Level 2: 2 bonds → Aldehydes, Ketones, gem-Dihalides
Level 3: 3 bonds → Carboxylic Acids, Esters, Amides, Nitriles
Level 4: 4 bonds → CO₂, Carbonates, CCl₄

❗ COUNTING DOUBLE BONDS:
A C=O double bond counts as 2 bonds to oxygen, even though it's one "double bond" to one atom!
Similarly, C≡N in a nitrile counts as 3 bonds to nitrogen.

═══════════════════════════════════════
THE ONE-CARBON OXIDATION SERIES
═══════════════════════════════════════

Follow the oxidation of methane all the way to CO₂:

Level 0: Methane (CH₄) ────────── 0 bonds to O
Level 1: Methanol (CH₃OH) ────── 1 bond to O
Level 2: Formaldehyde (H-CHO) ── 2 bonds to O
Level 3: Formic Acid (HCOOH) ─── 3 bonds to O
Level 4: Carbon Dioxide (CO₂) ── 4 bonds to O

═══════════════════════════════════════
THE TWO-CARBON OXIDATION SERIES
═══════════════════════════════════════

This is even more practical:

Level 0: Ethane (CH₃-CH₃) ─────── No bonds to heteroatoms
Level 1: Ethanol (CH₃-CH₂-OH) ── 1 bond to O (alcohol)
Level 2: Acetaldehyde (CH₃-CHO) ─ 2 bonds to O (C=O)
Level 3: Acetic Acid (CH₃-COOH) ─ 3 bonds to O

═══════════════════════════════════════
WHY THIS MATTERS
═══════════════════════════════════════

• Oxidation = Moving UP levels (0→1→2→3→4)
• Reduction = Moving DOWN levels (4→3→2→1→0)

This framework lets you instantly classify reactions:
• Alcohol → Ketone = OXIDATION (Level 1 → 2)
• Aldehyde → Alcohol = REDUCTION (Level 2 → 1)
• Alkane → Alkyl halide = OXIDATION (Level 0 → 1)

💡 TIP: Oxidation doesn't always involve oxygen! Converting C-H to C-Cl is also oxidation (adding a bond to an electronegative atom).`,
        keyPoints: [
            "Oxidation Level = bonds to heteroatoms (O, N, halogen)",
            "Level 0: Hydrocarbons (no heteroatoms)",
            "Level 1: Alcohols, Amines, Halides (1 bond)",
            "Level 2: Aldehydes, Ketones (2 bonds, C=O)",
            "Level 3: Acids, Esters, Amides (3 bonds)",
            "Level 4: CO₂, CCl₄ (4 bonds)",
            "Going up in level = Oxidation; Down = Reduction"
        ],
        molecules: [
            { name: "Ethane", description: "Level 0: No bonds to heteroatoms" },
            { name: "Ethanol", description: "Level 1: One bond to oxygen (C-OH)" },
            { name: "Acetaldehyde", description: "Level 2: Two bonds to oxygen (C=O)" },
            { name: "Acetic Acid", description: "Level 3: Three bonds to oxygen (C=O + C-O)" }
        ],
        commonMistake: "Thinking oxidation always involves oxygen. Transforming an alkane to an alkyl chloride (C-H → C-Cl) is ALSO an oxidation because you're adding a bond to an electronegative atom!",
        diagrams: [
            { type: 'oxidation', props: { showLevel: 'all', interactive: true }, caption: 'Interactive Oxidation Level Chart' }
        ]
    },
    {
        id: "trivial-names",
        title: "Essential Trivial Names You Must Memorize",
        content: `Systematic IUPAC names are logical but sometimes clunky. In daily lab use, everyone uses trivial (common) names for simple, important molecules.

⚠️ You MUST memorize these names. Professors and textbooks assume you know them!

═══════════════════════════════════════
THE ESSENTIAL 10
═══════════════════════════════════════

ALDEHYDES:
• Formaldehyde = Methanal (H-CHO) ──── 1 carbon
• Acetaldehyde = Ethanal (CH₃-CHO) ─── 2 carbons

KETONES:
• Acetone = Propan-2-one (CH₃-CO-CH₃)

CARBOXYLIC ACIDS:
• Formic Acid = Methanoic acid (H-COOH) ── 1 carbon
• Acetic Acid = Ethanoic acid (CH₃-COOH) ─ 2 carbons

AROMATICS:
• Benzene = C₆H₆ ring (the parent aromatic)
• Toluene = Methylbenzene (C₆H₅-CH₃)
• Phenol = Hydroxybenzene (C₆H₅-OH)
• Aniline = Aminobenzene (C₆H₅-NH₂)
• Pyridine = Azabenzene (C₅H₅N ring - N is IN the ring)

═══════════════════════════════════════
MEMORY TIPS
═══════════════════════════════════════

For Aldehydes/Acids:
• "Form" = 1 carbon (like the word "first")
• "Acet" = 2 carbons (like "acetate" in vinegar)

For Aromatics:
Think of the BASE: Benzene
• Add -OH → Phenol
• Add -NH₂ → Aniline  
• Add -CH₃ → Toluene

For Pyridine:
Benzene where one C-H is replaced by N. The N is IN the ring (not attached to it).

═══════════════════════════════════════
WHY COMMON NAMES PERSIST
═══════════════════════════════════════

For complex molecules like Strychnine (a poison) or Vitamin B12, the systematic names are PAGES long! Common names are essential for practical use.

Even for simple molecules:
• "Acetone" is faster than "Propan-2-one"
• "Acetic acid" is clearer than "Ethanoic acid"

You need to know BOTH systems, but common names dominate conversation.`,
        keyPoints: [
            "Formaldehyde (1C aldehyde), Acetaldehyde (2C aldehyde)",
            "Acetone = simplest ketone",
            "Formic acid (1C), Acetic acid (2C) - 'Form' = 1, 'Acet' = 2",
            "Benzene, Toluene (Ph-CH₃), Phenol (Ph-OH), Aniline (Ph-NH₂)",
            "Pyridine = benzene with N in the ring"
        ],
        funFact: "Formic acid gets its name from 'formica' (Latin for ant). Ants produce formic acid as a defense mechanism—that's why ant bites sting!"
    },
    {
        id: "naming-compounds",
        title: "Systematic IUPAC Nomenclature",
        content: `While trivial names are common, you must understand systematic naming for new compounds.

═══════════════════════════════════════
THE IUPAC SYSTEM
═══════════════════════════════════════

STEP 1: Find the Parent Chain
• Identify the longest continuous carbon chain containing the principal functional group
• This determines the base name:
  - 1C = methane, 2C = ethane, 3C = propane, 4C = butane, 5C = pentane...

STEP 2: Number the Chain
• Number from the end that gives the functional group the lowest number
• If there's a tie, give substituents the lowest numbers

STEP 3: Name Substituents
• Identify branches (methyl, ethyl, etc.)
• List them alphabetically before the parent name
• Use prefixes (di-, tri-, tetra-) for multiples

STEP 4: Assemble the Name
• Substituents in alphabetical order + position numbers + parent name + suffix

═══════════════════════════════════════
FUNCTIONAL GROUP SUFFIXES
═══════════════════════════════════════

• Alkane → -ane → Example: Propane
• Alkene → -ene → Example: Propene
• Alkyne → -yne → Example: Propyne
• Alcohol → -ol → Example: Propanol
• Aldehyde → -al → Example: Propanal
• Ketone → -one → Example: Propanone
• Carboxylic Acid → -oic acid → Example: Propanoic acid
• Amine → -amine → Example: Propylamine

═══════════════════════════════════════
EXAMPLES WITH POSITIONS
═══════════════════════════════════════

• CH₃-CH₂-OH → Ethanol (2C alcohol)
• CH₃-CH(OH)-CH₃ → Propan-2-ol (OH on carbon 2)
• CH₃-CO-CH₃ → Propan-2-one (C=O on carbon 2)
• CH₃-CHO → Ethanal (aldehyde always at C1)

═══════════════════════════════════════
WHEN TO USE EACH SYSTEM
═══════════════════════════════════════

• Lab notebook, conversation → Trivial names (faster)
• Formal publications, new compounds → IUPAC names (unambiguous)
• Complex natural products → Trivial only (IUPAC too long)

For this course: Know both! Use trivial names for common molecules, IUPAC for everything else.`,
        keyPoints: [
            "Find longest chain first → parent name",
            "Number from end closest to functional group",
            "List substituents alphabetically",
            "Suffix indicates functional group (-ol, -al, -one, -oic acid)",
            "Position numbers are included when needed"
        ],
        molecules: [
            { name: "Acetone", description: "Trivial name for Propan-2-one" },
            { name: "Acetic Acid", description: "Trivial name for Ethanoic Acid" }
        ]
    },
    {
        id: "real-drug-examples",
        title: "Real-World Application: Functional Groups in Drugs",
        content: `Let's apply everything you've learned! Can you identify the functional groups in these real molecules?

═══════════════════════════════════════
VANILLIN (Vanilla Flavor)
═══════════════════════════════════════

What is it? The main component of vanilla extract.

Functional groups present:
• Aldehyde (-CHO): Gives characteristic smell
• Ether (-OCH₃): A methoxy group on the ring
• Phenol (-OH on benzene ring): Makes it slightly acidic

Structure notes:
• Aromatic ring with three substituents
• The aldehyde is directly on the benzene ring (benzaldehyde derivative)

═══════════════════════════════════════
IBUPROFEN (Pain Reliever)
═══════════════════════════════════════

What is it? A common NSAID (Non-Steroidal Anti-Inflammatory Drug).

Functional groups present:
• Carboxylic Acid (-COOH): Essential for activity, makes it acidic
• Aromatic Ring: The benzene core
• Alkyl chains: Propyl and isobutyl groups

Structure notes:
• The carboxylic acid is not directly on the ring
• There's a CH₃ branch near the acid (chiral center)

═══════════════════════════════════════
LINALOOL (Lavender Scent)
═══════════════════════════════════════

What is it? A terpene found in lavender and many other plants.

Functional groups present:
• Alcohol (-OH): A tertiary alcohol
• Alkene (C=C): Two double bonds

Structure notes:
• Not aromatic (no benzene ring)
• Acyclic (no rings at all)
• Pleasant floral smell

═══════════════════════════════════════
YOUR CHALLENGE
═══════════════════════════════════════

For any new molecule you encounter:
1. Identify the skeleton: Is it cyclic? Aromatic? Branched?
2. Find heteroatoms: Where are the O, N, S, or halogens?
3. Name the functional groups: What type? (aldehyde, ketone, acid, etc.)
4. Assign oxidation levels: What level is each carbon attached to heteroatoms?

With practice, this becomes automatic!`,
        keyPoints: [
            "Real drugs contain multiple functional groups",
            "Vanillin: aldehyde + ether + phenol",
            "Ibuprofen: carboxylic acid + aromatic ring",
            "Linalool: alcohol + alkenes",
            "Practice identifying functional groups in real molecules"
        ],
        realWorldConnection: "Pharmaceutical companies spend billions developing drugs. Understanding structure helps predict how a drug will behave in the body, what side effects it might have, and how to modify it to work better!"
    },
    {
        id: "3d-representation",
        title: "3D Representation: Wedges and Dashes",
        content: `Molecules are 3D objects, but we draw them on 2D paper. To show depth, we use the wedge and dash convention.

═══════════════════════════════════════
THE CONVENTION
═══════════════════════════════════════

• Solid line ─── In the plane of the paper (flat)
• Solid wedge ▲ ─── Coming OUT towards you (forward)
• Dashed line ╌╌╌ ─── Going IN away from you (backward)

═══════════════════════════════════════
HOW TO READ WEDGE-DASH STRUCTURES
═══════════════════════════════════════

Imagine you're looking at a table:
• Solid lines = bonds lying flat on the table
• Wedges = bonds pointing UP off the table towards your eyes
• Dashes = bonds pointing DOWN through the table away from you

═══════════════════════════════════════
WHY THIS MATTERS
═══════════════════════════════════════

Biochemistry depends on shape!

Consider your hands: Left and right hands have the same components but are mirror images. Many molecules are like this—two versions that are non-superimposable mirror images.

Examples:
• L-Alanine (amino acid our bodies use) vs D-Alanine (not used)
• Thalidomide: One form treats morning sickness, the mirror image causes birth defects!

Enzymes are like locks. Only the correctly shaped molecular "key" fits. If a group is pointing the wrong way (wedge instead of dash), the molecule won't work—or worse, may cause harm.

═══════════════════════════════════════
WHEN TO USE WEDGES AND DASHES
═══════════════════════════════════════

You don't need them for every molecule. Use them when:
1. Stereochemistry matters (Chapter 4+)
2. Showing a specific 3D shape (like tetrahedral carbon)
3. Ring conformations (chair cyclohexane)

For now, just recognize what they mean when you see them. We'll dive deep into stereochemistry later!`,
        keyPoints: [
            "Molecules are 3D objects on 2D paper",
            "Wedge (solid triangle) = bond coming OUT towards you",
            "Dash (hashed line) = bond going IN away from you",
            "Shape determines biological activity",
            "Crucial for understanding drug action and biochemistry"
        ],
        funFact: "The thalidomide tragedy in the 1960s led to much stricter drug testing requirements. Now all chiral drugs must have both mirror-image forms tested separately!",
        diagrams: [
            { type: 'wedge-dash', props: { molecule: 'methane', showLegend: true }, caption: 'Methane - tetrahedral carbon' },
            { type: 'wedge-dash', props: { molecule: 'bromochlorofluoromethane', showLegend: false }, caption: 'CHClBrF - chiral molecule' },
            { type: 'amino-acid', props: { name: 'L-Alanine', structure: 'alanine' }, caption: 'L-Alanine' },
            { type: 'amino-acid', props: { name: 'Glycine', structure: 'glycine' }, caption: 'Glycine (achiral)' },
            { type: 'amino-acid', props: { name: 'Phenylalanine', structure: 'phenylalanine' }, caption: 'Phenylalanine' }
        ]
    }
];
