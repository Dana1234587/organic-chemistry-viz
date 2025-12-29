import { SectionData } from '../../types';

export const introduction = `Welcome to the exciting world of organic reactions! In this chapter, we'll discover the fundamental principles that govern why and how chemical reactions happen. You'll learn to "speak the language" of organic chemistry through curly arrows, and understand the electronic dance between nucleophiles and electrophiles that drives all organic transformations.`;

export const sections: SectionData[] = [
    {
        id: 'collision-theory',
        title: 'Why Reactions Happen: Collision Theory',
        content: `
For a chemical reaction to occur, molecules must:

**1. Collide with each other** – Molecules need to come into contact.

**2. Have sufficient energy** – They must overcome the **activation energy (Eₐ)**, the energy barrier between reactants and products.

**3. Collide with correct orientation** – The reactive parts must align properly.

> 🔬 **Think of it like this:** Imagine two people trying to shake hands in a dark room. They need to:
> - Find each other (collision)
> - Reach out with enough force (energy)
> - Actually grab hands, not elbows (orientation)

### Energy Diagrams

The **transition state** (‡) is the highest energy point in the reaction pathway – like the top of a mountain the molecules must climb over.

| Term | Definition |
|------|------------|
| **Activation Energy (Eₐ)** | Energy required to reach the transition state |
| **Transition State (‡)** | Highest energy intermediate – unstable structure |
| **ΔG (Gibbs Free Energy)** | Overall energy change – determines if reaction is favorable |

If **ΔG < 0**: Reaction is thermodynamically favorable (exergonic)
If **ΔG > 0**: Reaction is unfavorable (endergonic)
        `,
        keyPoints: [
            'Reactions require molecular collisions with sufficient energy',
            'Activation energy (Eₐ) is the barrier that must be overcome',
            'Correct orientation is as important as energy',
            'The transition state is the highest energy point'
        ],
        funFact: 'At room temperature, most molecules in a gas are moving at about 500 m/s – that\'s faster than a bullet! Yet most collisions don\'t lead to reactions because they lack the correct orientation or energy.'
    },
    {
        id: 'nucleophiles-electrophiles',
        title: 'Nucleophiles and Electrophiles: The Reactive Partners',
        content: `
All organic reactions involve the interaction between two fundamental types of species:

## Nucleophiles (Nu:) – "Nucleus Lovers" 🎯

Nucleophiles are **electron-rich** species that **donate** electrons. They seek positive charges.

**Sources of nucleophilicity:**
- **Lone pairs** (e.g., :NH₃, :OH⁻, :Cl⁻)
- **π bonds** (e.g., C=C in alkenes)
- **σ bonds** (e.g., C-H in NaBH₄)
- **Negative charges** (e.g., CN⁻, CH₃O⁻)

| Common Nucleophiles | Structure | Electron Source |
|---------------------|-----------|-----------------|
| Hydroxide | OH⁻ | Lone pair + charge |
| Cyanide | CN⁻ | Lone pair + charge |
| Ammonia | NH₃ | Lone pair |
| Alkenes | C=C | π bond electrons |

## Electrophiles (E⁺) – "Electron Lovers" ⚡

Electrophiles are **electron-poor** species that **accept** electrons. They seek negative charges.

**Sources of electrophilicity:**
- **Empty orbitals** (e.g., BH₃, carbocations R⁺)
- **Positive charges** (e.g., H⁺, NO₂⁺)
- **Polarized atoms** (e.g., δ⁺ carbon in C=O, C-Br)

| Common Electrophiles | Structure | Electron Sink |
|----------------------|-----------|---------------|
| Proton | H⁺ | Complete empty orbital |
| Carbocation | R₃C⁺ | Empty p orbital |
| Carbonyl carbon | C=O | Polarized δ⁺ carbon |
| Alkyl halide | C-Br | Polarized δ⁺ carbon |

> ⚡ **Key Insight:** Every organic reaction is a dance between a nucleophile donating electrons and an electrophile accepting them!
        `,
        keyPoints: [
            'Nucleophiles are electron-rich (donate electrons)',
            'Electrophiles are electron-poor (accept electrons)',
            'Lone pairs, π bonds, and σ bonds can be nucleophilic',
            'Empty orbitals, positive charges, and polarized atoms are electrophilic'
        ],
        funFact: 'The DNA repair enzyme that fixes your damaged genes is a nucleophile that attacks the electrophilic damaged bases – your cells use organic chemistry every second!'
    },
    {
        id: 'homo-lumo',
        title: 'HOMO-LUMO: The Quantum Explanation',
        content: `
The interaction between nucleophiles and electrophiles can be explained precisely using molecular orbital theory:

## HOMO and LUMO

| Orbital | Full Name | Found In | Role |
|---------|-----------|----------|------|
| **HOMO** | Highest Occupied Molecular Orbital | Nucleophile | Donates electrons |
| **LUMO** | Lowest Unoccupied Molecular Orbital | Electrophile | Accepts electrons |

### The HOMO-LUMO Interaction

When a nucleophile approaches an electrophile:

1. The **HOMO of the nucleophile** (full of electrons) interacts with the **LUMO of the electrophile** (empty, ready to receive)

2. Electrons flow from HOMO → LUMO

3. A new **bonding orbital** forms between them

> 🎯 **Energy Match Matters:** The closer in energy the HOMO and LUMO are, the stronger the interaction!

### Example: NH₃ + BH₃

\`\`\`
NH₃ (Nucleophile)           BH₃ (Electrophile)
     HOMO                         LUMO
   (lone pair                  (empty p
   on nitrogen)                orbital on B)
       ↓                           ↓
       └──────── interact ─────────┘
                    ↓
            New σ bond (dative)
              H₃N→BH₃
\`\`\`

The product H₃N-BH₃ contains a **dative (coordinate) bond** where both electrons came from nitrogen.

### Energy Gap Principle

- **Small HOMO-LUMO gap** = Strong interaction = Fast reaction
- **Large HOMO-LUMO gap** = Weak interaction = Slow/no reaction

This is why some nucleophiles are "better" than others – their HOMO energy matches well with the electrophile's LUMO!
        `,
        keyPoints: [
            'HOMO is the highest energy orbital with electrons',
            'LUMO is the lowest energy empty orbital',
            'Reactions occur when HOMO and LUMO interact and overlap',
            'Smaller energy gaps lead to stronger, faster reactions'
        ],
        funFact: 'The same HOMO-LUMO theory explains why fireflies glow! The luciferin molecule\'s HOMO-LUMO gap corresponds to visible light energy.'
    },
    {
        id: 'curly-arrows',
        title: 'Curly Arrows: The Language of Mechanisms',
        content: `
**Curly arrows** are the universal language of organic chemistry. They show exactly where electrons move during a reaction.

## The Golden Rules of Curly Arrows 📜

### Rule 1: Arrows Show Electron Pairs
Each curly arrow represents the movement of **two electrons** (one electron pair).

### Rule 2: Start from Electrons, End at Destination
- **Start:** From a lone pair, a bond, or a negative charge
- **End:** At an atom (to form a new bond) or into a bond (to break it)

### Rule 3: Never Start from a Positive Charge
Positive charges indicate **absence** of electrons – you can't move what isn't there!

### Rule 4: Arrows Go Toward Electrophiles
Electrons flow from nucleophile (electron source) to electrophile (electron sink).

## Types of Arrows

| Arrow Type | Electrons Moved | Use |
|------------|-----------------|-----|
| ⟶ (full curly) | 2 electrons | Heterolytic process (pairs stay together) |
| ⇀ (fishhook) | 1 electron | Homolytic process (radicals) |

## Example: Cyanide Attacking Formaldehyde

\`\`\`
    O⁻                    O⁻
    ‖                     |
:C≡N⁻ + H-C-H  →  :C≡N—C-H
         δ⁺              |
                         H

Arrow 1: CN⁻ lone pair → carbon (makes new C-C bond)
Arrow 2: C=O π bond → oxygen (breaks, forms C-O⁻)
\`\`\`

**What the arrows tell us:**
1. First arrow: Nucleophile attacks electrophilic carbon
2. Second arrow: π electrons move to oxygen (which can handle the negative charge)

> 🎯 **Pro Tip:** Always check that charges are conserved! If you start with total charge of -1, you must end with -1.
        `,
        keyPoints: [
            'Curly arrows show movement of electron pairs',
            'Always start from electrons (lone pair, bond, or negative charge)',
            'Never start from a positive charge',
            'Arrows point toward electrophilic centers'
        ],
        funFact: 'Curly arrows were invented by Sir Robert Robinson in 1922. He won the Nobel Prize partly for developing this notation that all chemists now use!'
    },
    {
        id: 'making-breaking-bonds',
        title: 'Making and Breaking Bonds',
        content: `
Every reaction involves **making new bonds** and/or **breaking existing bonds**. Understanding this is key to drawing mechanisms.

## Making a Bond (Arrow Points TO an Atom)

When the curly arrow points **to an atom**, a new bond is formed.

\`\`\`
          ↘
:Nu⁻  +  E⁺  →  Nu—E

Arrow from Nu⁻ lone pair TO the electrophile = new bond formed
\`\`\`

**Examples:**
- Lone pair → empty orbital = **dative bond**
- Lone pair → δ⁺ carbon = **new σ bond** (as π bond breaks)

## Breaking a Bond (Arrow Points INTO a Bond)

When the curly arrow points **into an existing bond**, that bond breaks and electrons move to one of the atoms.

\`\`\`
A—B  →  A⁺  +  :B⁻
   ↗
Arrow from A-B bond TO atom B = bond breaks, electrons go to B
\`\`\`

## Simultaneous Make and Break

Many reactions involve **making one bond while breaking another** in a single step:

### Example: SN2 Reaction

\`\`\`
                
HO⁻  +  CH₃—Br  →  HO—CH₃  +  Br⁻
   ↘        ↗
   make    break

Arrow 1: OH⁻ → carbon (makes C-O bond)
Arrow 2: C-Br bond → Br (breaks, Br leaves with electrons)
\`\`\`

Both arrows are drawn simultaneously because the reaction is **concerted** (happens in one step).

## The Leaving Group

When a bond breaks, one fragment departs as a **leaving group**:
- Good leaving groups are **stable with extra electrons**
- Examples: Br⁻, I⁻, H₂O, TsO⁻

| Leaving Group | Stability Reason |
|---------------|-----------------|
| I⁻ | Large atom, disperses charge |
| Br⁻ | Fairly large, stable anion |
| Cl⁻ | Stable anion |
| H₂O | Neutral when leaving |
| F⁻ | Too small, holds electrons tightly (poor LG) |
        `,
        keyPoints: [
            'Arrow to atom = new bond forming',
            'Arrow into bond = bond breaking',
            'Many reactions make and break bonds simultaneously',
            'Good leaving groups are stable with extra electrons'
        ],
        funFact: 'Iodide (I⁻) is such a good leaving group that organic chemists often convert alcohols (poor leaving group) to iodides before doing substitution reactions!'
    },
    {
        id: 'reaction-mechanisms',
        title: 'Drawing Complete Reaction Mechanisms',
        content: `
A **reaction mechanism** is the step-by-step pathway showing exactly how reactants transform into products.

## Anatomy of a Mechanism

Each step shows:
1. **Reactants** (what's reacting)
2. **Curly arrows** (electron movement)
3. **Products** of that step
4. **Conditions** if relevant (acid, base, heat)

## Multi-Step Example: Ether Formation in Acid

Let's trace how two ethanol molecules form diethyl ether:

### Step 1: Protonation
\`\`\`
                H⁺
                ↓
CH₃CH₂—O—H  →  CH₃CH₂—O⁺—H
         ↑              |
      lone pair         H

The oxygen lone pair attacks H⁺
This makes OH₂⁺ - a better leaving group!
\`\`\`

### Step 2: Nucleophilic Attack
\`\`\`
                           H
                           |
CH₃CH₂—O—H  +  CH₃CH₂—O⁺—H  →  CH₃CH₂—O—CH₂CH₃
    ↓              ↗            |
   Nu             E             H⁺  +  H₂O
                               (leaving group)
\`\`\`

### Step 3: Deprotonation
\`\`\`
       H
       |
CH₃CH₂—O⁺—CH₂CH₃  +  Base  →  CH₃CH₂—O—CH₂CH₃  +  H-Base
       ↓
    Diethyl Ether (product)
\`\`\`

## Checking Your Mechanism ✓

Ask yourself:
1. ✓ Are all electrons accounted for?
2. ✓ Is charge conserved in each step?
3. ✓ Does each atom have the correct valence?
4. ✓ Do arrows start from electrons?
5. ✓ Is the product structure correct?

> 🎯 **The Mechanism Mindset:** Think of it like a movie script – each scene (step) must logically lead to the next, with characters (electrons) moving in believable ways!
        `,
        keyPoints: [
            'Mechanisms show step-by-step electron movement',
            'Each step must conserve charge and mass',
            'Multi-step reactions often involve protonation/deprotonation',
            'Always verify your mechanism makes chemical sense'
        ],
        funFact: 'The mechanism for photosynthesis involves over 100 individual steps! Even the most complex biological processes can be broken down into simple nucleophile-electrophile interactions.'
    },
    {
        id: 'reaction-types-overview',
        title: 'Preview: Types of Organic Reactions',
        content: `
Now that you understand the fundamentals, let's preview the major reaction types you'll encounter:

## 1. Addition Reactions
**What happens:** Atoms are ADDED across a multiple bond
**Example:** Alkene + HBr → Alkyl bromide

\`\`\`
    H   Br
    |   |
C=C + H-Br → C—C
             |   |
\`\`\`

## 2. Substitution Reactions
**What happens:** One group REPLACES another
**Example:** R-Br + OH⁻ → R-OH + Br⁻

Types:
- **SN1** (substitution nucleophilic unimolecular)
- **SN2** (substitution nucleophilic bimolecular)

## 3. Elimination Reactions
**What happens:** Atoms are REMOVED to form a double bond
**Example:** Alcohol → Alkene + H₂O

\`\`\`
H   OH
|   |
C—C   →  C=C  +  H₂O
|   |
\`\`\`

Types:
- **E1** (elimination unimolecular)
- **E2** (elimination bimolecular)

## 4. Rearrangement Reactions
**What happens:** Atoms REORGANIZE within the molecule
**Example:** Carbocation rearrangements

## The Competition

Often, substitution and elimination compete:

| Factor | Favors Substitution | Favors Elimination |
|--------|--------------------|--------------------|
| Base strength | Weak base | Strong base |
| Temperature | Lower | Higher |
| Substrate | Primary RX | Tertiary RX |
| Steric hindrance | Low | High |

> 🎯 **Coming Up:** In future chapters, we'll explore each reaction type in depth, understanding when and why each pathway is preferred!
        `,
        keyPoints: [
            'Addition: atoms add across multiple bonds',
            'Substitution: one group replaces another',
            'Elimination: atoms leave to form multiple bonds',
            'Reaction conditions determine which pathway dominates'
        ],
        funFact: 'Your liver uses both substitution AND addition reactions to detoxify drugs and toxins in your body – it\'s a master organic chemist!'
    }
];
