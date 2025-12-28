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
        ],
        difficulty: 'fundamental',
        quickCheck: [
            {
                question: "Why do organic chemists use skeletal structures instead of drawing every atom?",
                options: ["To save ink", "To simplify complex molecules and focus on shape/functional groups", "Because they forgot how to draw", "It's just tradition"],
                correctIndex: 1,
                explanation: "Skeletal structures remove 'noise' (repeated C's and H's) so you can see the molecular shape and reactive parts at a glance!"
            }
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
        ],
        difficulty: 'fundamental',
        examTip: "Always check heteroatom hydrogens! Missing the H in -OH or -NH₂ is one of the most common exam mistakes. The grader sees a completely different (wrong) molecule!",
        plainEnglish: {
            technical: "Carbon atoms at vertices adopt tetrahedral geometry with 109.5° bond angles",
            simple: "Each corner is a carbon with 4 bonds total. The zig-zag shape comes from the natural 3D angle of those bonds!"
        },
        quickCheck: [
            {
                question: "In a skeletal structure, what does a simple corner (intersection of two lines) represent?",
                options: ["CH₃ (methyl)", "CH₂ (methylene)", "CH (methine)", "Just a bond, no atom"],
                correctIndex: 1,
                explanation: "A corner with 2 visible bonds means 4 - 2 = 2 hydrogens, so it's CH₂. Line ends are CH₃ (1 bond = 3 H's)."
            },
            {
                question: "Which is INCORRECT in skeletal structures?",
                options: ["Omitting H on carbon", "Writing -O instead of -OH", "Using zig-zag lines", "Corners represent carbons"],
                correctIndex: 1,
                explanation: "Hydrogens on heteroatoms MUST always be shown. Writing -O means something completely different from -OH!"
            }
        ]
    },
    {
        id: "common-abbreviations",
        title: "Common Abbreviations: The Chemist's Shorthand",
        content: `Professional chemists use abbreviations constantly. You <strong>MUST</strong> memorize these to read the literature.

<h4>📋 Alkyl Group Abbreviations</h4>
<table class="reference-table">
<thead>
<tr><th>Abbrev.</th><th>Name</th><th>Structure</th><th>Carbons</th></tr>
</thead>
<tbody>
<tr><td><strong>Me</strong></td><td>Methyl</td><td>-CH₃</td><td>1</td></tr>
<tr><td><strong>Et</strong></td><td>Ethyl</td><td>-CH₂CH₃</td><td>2</td></tr>
<tr><td><strong>Pr</strong></td><td>Propyl</td><td>-CH₂CH₂CH₃</td><td>3</td></tr>
<tr><td><strong>iPr</strong></td><td>Isopropyl</td><td>-CH(CH₃)₂</td><td>3 (branched)</td></tr>
<tr><td><strong>Bu</strong></td><td>Butyl</td><td>-CH₂CH₂CH₂CH₃</td><td>4</td></tr>
<tr><td><strong>tBu</strong></td><td>tert-Butyl</td><td>-C(CH₃)₃</td><td>4 (branched)</td></tr>
</tbody>
</table>

<h4>🔵 Aromatic Abbreviations</h4>
<table class="reference-table">
<thead>
<tr><th>Abbrev.</th><th>Name</th><th>Meaning</th></tr>
</thead>
<tbody>
<tr><td><strong>Ph</strong></td><td>Phenyl</td><td>Benzene ring as substituent (C₆H₅-)</td></tr>
<tr><td><strong>Bn</strong></td><td>Benzyl</td><td>CH₂ attached to benzene (PhCH₂-)</td></tr>
<tr><td><strong>Ar</strong></td><td>Aryl</td><td>Any aromatic ring</td></tr>
</tbody>
</table>

<div class="warning-box">
<strong>⚠️ Phenyl vs Benzyl - Common Confusion!</strong>
<ul>
<li><strong>Phenyl (Ph)</strong>: Benzene ring directly attached (no CH₂)</li>
<li><strong>Benzyl (Bn)</strong>: Benzene ring with a CH₂ spacer</li>
</ul>
<p>Ph-OH = Phenol (OH on ring) | Bn-OH = Benzyl alcohol (PhCH₂-OH)</p>
</div>

<h4>🔤 Wildcard Symbols</h4>
<table class="reference-table compact">
<tr><td><strong>R</strong></td><td>Any alkyl group or hydrogen</td></tr>
<tr><td><strong>R'</strong></td><td>A different R group</td></tr>
<tr><td><strong>X</strong></td><td>Any halogen (F, Cl, Br, I)</td></tr>
</table>

<h4>🧪 Common Solvent Abbreviations</h4>
<table class="reference-table">
<thead>
<tr><th>Abbrev.</th><th>Full Name</th></tr>
</thead>
<tbody>
<tr><td>THF</td><td>Tetrahydrofuran</td></tr>
<tr><td>DMF</td><td>Dimethylformamide</td></tr>
<tr><td>DMSO</td><td>Dimethyl sulfoxide</td></tr>
<tr><td>DCM</td><td>Dichloromethane</td></tr>
<tr><td>EtOAc</td><td>Ethyl acetate</td></tr>
<tr><td>MeOH</td><td>Methanol</td></tr>
<tr><td>EtOH</td><td>Ethanol</td></tr>
</tbody>
</table>`,
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
        content: `If the carbon skeleton is the frame, <strong>Functional Groups are the engine</strong>. These specific atoms or groups determine HOW the molecule reacts.

<div class="highlight-box">
💡 <strong>THE BIG IDEA:</strong> Molecules with the same functional group behave similarly.<br/>
If you learn how ONE aldehyde reacts, you know how ALL aldehydes react!
</div>

<h4>🔷 Group 1: Hydrocarbons (C-C Bonds)</h4>
<table class="reference-table">
<thead>
<tr><th>Name</th><th>Structure</th><th>Reactivity</th></tr>
</thead>
<tbody>
<tr><td>Alkane</td><td>C-C single bonds</td><td>Unreactive (no functional group!)</td></tr>
<tr><td>Alkene</td><td>C=C double bond</td><td>Reactive; adds things across bond</td></tr>
<tr><td>Alkyne</td><td>C≡C triple bond</td><td>Very reactive</td></tr>
<tr><td>Arene</td><td>Benzene ring</td><td>Special stability; unique reactions</td></tr>
</tbody>
</table>

<h4>🔷 Group 2: Single Bond to Heteroatom</h4>
<table class="reference-table">
<thead>
<tr><th>Name</th><th>Structure</th><th>Properties</th></tr>
</thead>
<tbody>
<tr><td>Alcohol</td><td>R-OH</td><td>Hydrogen bonding; can be acidic</td></tr>
<tr><td>Ether</td><td>R-O-R</td><td>Relatively unreactive; good solvents</td></tr>
<tr><td>Amine</td><td>R-NH₂</td><td>Basic (accepts H⁺); nucleophilic</td></tr>
<tr><td>Thiol</td><td>R-SH</td><td>Sulfur version of alcohol; smelly!</td></tr>
<tr><td>Sulfide</td><td>R-S-R</td><td>Sulfur version of ether</td></tr>
<tr><td>Halide</td><td>R-X</td><td>X = F, Cl, Br, or I</td></tr>
</tbody>
</table>

<h4>⭐ Group 3: Carbonyl Compounds (C=O) - THE MOST IMPORTANT!</h4>
<table class="reference-table">
<thead>
<tr><th>Name</th><th>Structure</th><th>Key Feature</th></tr>
</thead>
<tbody>
<tr class="highlight-row"><td><strong>Aldehyde</strong></td><td>R-CHO</td><td>Carbonyl at END of chain</td></tr>
<tr class="highlight-row"><td><strong>Ketone</strong></td><td>R-CO-R</td><td>Carbonyl in MIDDLE of chain</td></tr>
<tr><td>Carboxylic Acid</td><td>R-COOH</td><td>Acidic! (gives up H⁺)</td></tr>
<tr><td>Ester</td><td>R-COO-R</td><td>Sweet/fruity smells</td></tr>
<tr><td>Amide</td><td>R-CONH₂</td><td>Found in proteins</td></tr>
<tr><td>Acyl Chloride</td><td>R-COCl</td><td>Very reactive!</td></tr>
<tr><td>Nitrile</td><td>R-C≡N</td><td>Triple bond to nitrogen</td></tr>
</tbody>
</table>

<h4>🔷 Group 4: Special Groups</h4>
<table class="reference-table compact">
<tr><td>Nitro</td><td>R-NO₂</td><td>Found in explosives, drugs</td></tr>
<tr><td>Acetal</td><td>R-CH(OR)₂</td><td>Two ether oxygens on same carbon</td></tr>
<tr><td>Imine</td><td>R-C=N-R</td><td>C=N double bond</td></tr>
</table>

<h4>🎯 Key Reactivity Rules</h4>
<table class="reference-table">
<tr><td><strong>Alcohols</strong></td><td>Can act as weak acids (lose H⁺) or nucleophiles</td></tr>
<tr><td><strong>Amines</strong></td><td>Basic (grab H⁺) and nucleophilic</td></tr>
<tr><td><strong>Carbonyls</strong></td><td>The carbon is electrophilic (attacked by negative things)</td></tr>
<tr><td><strong>Carboxylic acids</strong></td><td>Actually acidic (give up H⁺)</td></tr>
</table>`,
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
        content: `One of Clayden's most powerful organizational tools is classifying carbon atoms by their <strong>Oxidation Level</strong>. This tells you how "oxidized" a carbon is.

<div class="highlight-box">
<strong>📐 THE DEFINITION:</strong><br/>
<em>Oxidation Level = Number of bonds from carbon to a heteroatom</em><br/>
(any atom more electronegative than carbon: O, N, S, Cl, Br, etc.)
</div>

<h4>📊 The Oxidation Level Scale</h4>
<table class="reference-table oxidation-table">
<thead>
<tr><th>Level</th><th>Bonds to Heteroatom</th><th>Examples</th></tr>
</thead>
<tbody>
<tr class="level-0"><td><strong>0</strong></td><td>0 bonds</td><td>Alkanes (CH₄, Ethane)</td></tr>
<tr class="level-1"><td><strong>1</strong></td><td>1 bond</td><td>Alcohols, Amines, Halides</td></tr>
<tr class="level-2"><td><strong>2</strong></td><td>2 bonds</td><td>Aldehydes, Ketones</td></tr>
<tr class="level-3"><td><strong>3</strong></td><td>3 bonds</td><td>Carboxylic Acids, Esters, Amides</td></tr>
<tr class="level-4"><td><strong>4</strong></td><td>4 bonds</td><td>CO₂, Carbonates, CCl₄</td></tr>
</tbody>
</table>

<div class="warning-box">
<strong>❗ COUNTING DOUBLE BONDS:</strong>
<ul>
<li>A C=O double bond counts as <strong>2 bonds</strong> to oxygen!</li>
<li>C≡N in a nitrile counts as <strong>3 bonds</strong> to nitrogen</li>
</ul>
</div>

<h4>🧪 The Two-Carbon Oxidation Series (Most Practical!)</h4>
<div class="oxidation-ladder">
<table class="reference-table">
<tr class="level-0"><td>Level 0</td><td><strong>Ethane</strong></td><td>CH₃-CH₃</td><td>No bonds to O</td></tr>
<tr><td colspan="4" class="arrow">↓ +1 oxidation</td></tr>
<tr class="level-1"><td>Level 1</td><td><strong>Ethanol</strong></td><td>CH₃-CH₂-OH</td><td>1 bond to O</td></tr>
<tr><td colspan="4" class="arrow">↓ +1 oxidation</td></tr>
<tr class="level-2"><td>Level 2</td><td><strong>Acetaldehyde</strong></td><td>CH₃-CHO</td><td>2 bonds to O</td></tr>
<tr><td colspan="4" class="arrow">↓ +1 oxidation</td></tr>
<tr class="level-3"><td>Level 3</td><td><strong>Acetic Acid</strong></td><td>CH₃-COOH</td><td>3 bonds to O</td></tr>
</table>
</div>

<h4>🎯 Why This Matters</h4>
<table class="reference-table compact">
<tr><td><strong>Oxidation</strong></td><td>= Moving UP levels (0→1→2→3→4)</td></tr>
<tr><td><strong>Reduction</strong></td><td>= Moving DOWN levels (4→3→2→1→0)</td></tr>
</table>

<p>This framework lets you instantly classify reactions:</p>
<table class="reference-table">
<tr><td>Alcohol → Ketone</td><td>= OXIDATION (Level 1 → 2)</td></tr>
<tr><td>Aldehyde → Alcohol</td><td>= REDUCTION (Level 2 → 1)</td></tr>
<tr><td>Alkane → Alkyl halide</td><td>= OXIDATION (Level 0 → 1)</td></tr>
</table>

<div class="tip-box">
💡 <strong>TIP:</strong> Oxidation doesn't always involve oxygen! Converting C-H to C-Cl is also oxidation (adding a bond to an electronegative atom).
</div>`,
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

<div class="warning-box">
⚠️ You <strong>MUST</strong> memorize these names. Professors and textbooks assume you know them!
</div>

<h4>📝 The Essential 10</h4>

<h5>Aldehydes</h5>
<table class="reference-table">
<thead>
<tr><th>Trivial Name</th><th>IUPAC Name</th><th>Formula</th><th>Carbons</th></tr>
</thead>
<tbody>
<tr><td><strong>Formaldehyde</strong></td><td>Methanal</td><td>H-CHO</td><td>1</td></tr>
<tr><td><strong>Acetaldehyde</strong></td><td>Ethanal</td><td>CH₃-CHO</td><td>2</td></tr>
</tbody>
</table>

<h5>Ketones</h5>
<table class="reference-table">
<tr><td><strong>Acetone</strong></td><td>Propan-2-one</td><td>CH₃-CO-CH₃</td><td>3</td></tr>
</table>

<h5>Carboxylic Acids</h5>
<table class="reference-table">
<thead>
<tr><th>Trivial Name</th><th>IUPAC Name</th><th>Formula</th><th>Carbons</th></tr>
</thead>
<tbody>
<tr><td><strong>Formic Acid</strong></td><td>Methanoic acid</td><td>H-COOH</td><td>1</td></tr>
<tr><td><strong>Acetic Acid</strong></td><td>Ethanoic acid</td><td>CH₃-COOH</td><td>2</td></tr>
</tbody>
</table>

<h5>Aromatics</h5>
<table class="reference-table">
<thead>
<tr><th>Trivial Name</th><th>Systematic</th><th>Structure</th></tr>
</thead>
<tbody>
<tr><td><strong>Benzene</strong></td><td>—</td><td>C₆H₆ ring (parent aromatic)</td></tr>
<tr><td><strong>Toluene</strong></td><td>Methylbenzene</td><td>C₆H₅-CH₃</td></tr>
<tr><td><strong>Phenol</strong></td><td>Hydroxybenzene</td><td>C₆H₅-OH</td></tr>
<tr><td><strong>Aniline</strong></td><td>Aminobenzene</td><td>C₆H₅-NH₂</td></tr>
<tr><td><strong>Pyridine</strong></td><td>Azabenzene</td><td>C₅H₅N (N in ring)</td></tr>
</tbody>
</table>

<h4>🧠 Memory Tips</h4>
<div class="tip-box">
<strong>For Aldehydes/Acids:</strong>
<ul>
<li><strong>"Form"</strong> = 1 carbon (like "first")</li>
<li><strong>"Acet"</strong> = 2 carbons (like "acetate" in vinegar)</li>
</ul>
</div>

<div class="tip-box">
<strong>For Aromatics:</strong> Think of the BASE: <strong>Benzene</strong>
<ul>
<li>Add -OH → <strong>Phenol</strong></li>
<li>Add -NH₂ → <strong>Aniline</strong></li>
<li>Add -CH₃ → <strong>Toluene</strong></li>
</ul>
</div>

<p><strong>Why common names persist:</strong> For complex molecules like Strychnine or Vitamin B12, systematic names are PAGES long! "Acetone" is much faster than "Propan-2-one".</p>`,
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
