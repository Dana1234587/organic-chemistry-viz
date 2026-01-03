import { ChapterSection } from '../../types';

export const introduction = `Organic chemistry is the study of carbon-containing compounds and their properties, reactions, and synthesis. 
  It touches every aspect of our lives—from the food we eat to the medicines that keep us healthy, from the clothes we wear 
  to the fuels that power our world. In this chapter, we'll explore why carbon is so special and discover how organic 
  chemistry shapes our daily experiences. We'll learn how organic chemists in the 19th century revolutionized industry,
  and how the molecules around us communicate with our senses through smell, taste, and vision.`;

export const sections: ChapterSection[] = [
  {
    id: "organic-chemistry-and-you",
    title: "Organic Chemistry and You",
    content: `Every moment of your life involves organic chemistry. Right now, as you read this, organic molecules 
      are at work in your body in remarkable ways.
      
      VISION: When light enters your eye, it strikes a molecule called 11-cis-retinal in your retina. This molecule 
      absorbs the light and instantly changes its shape—a double bond switches from cis to trans configuration. This 
      tiny molecular change triggers a cascade of signals that your brain interprets as vision. Without this organic 
      molecule, you couldn't read these words!
      
      MOOD: Your emotions are influenced by serotonin, a neurotransmitter that is an organic molecule. When serotonin 
      binds to receptors in your brain, it affects your mood, sleep, and appetite. Antidepressant medications work 
      by altering serotonin levels in the brain.
      
      TASTE: When you taste something sweet, organic molecules are binding to receptors on your tongue. The caffeine 
      in your coffee, the menthol in your toothpaste, the vanilla in your dessert—all are organic compounds 
      that demonstrate the incredible diversity of carbon chemistry.
      
      Carbon is unique because it can form stable bonds with itself, creating chains, rings, and complex 
      three-dimensional structures. This versatility allows for an almost infinite variety of molecules, 
      each with its own unique properties. Your DNA, the blueprint of life, is an organic molecule containing 
      millions of atoms arranged in a precise sequence.`,
    video: {
      type: 'hls' as const,
      url: 'https://vz-2adfd2e0-f8c.b-cdn.net/29a26116-53ac-4d1a-adc1-cab5c741aeb4/playlist.m3u8',
      duration: '5:30'
    },
    molecules: [
      { name: "11-cis-Retinal", description: "The light-sensitive molecule in your eyes - before light hits it" },
      { name: "all-trans-Retinal", description: "The same molecule AFTER absorbing light - shape changed!" },
      { name: "Serotonin", description: "The 'happiness' neurotransmitter that regulates mood" },
      { name: "Caffeine", description: "The stimulant that helps you stay awake" }
    ],
    keyPoints: [
      "11-cis-retinal enables vision through light-induced shape change",
      "Serotonin regulation affects mood and is targeted by antidepressants",
      "Carbon's ability to form 4 bonds creates molecular diversity",
      "Biological processes depend entirely on organic molecules"
    ],
    funFact: "Your eyes contain about 120 million rod cells, each packed with millions of retinal molecules. Every second, billions of these molecules are changing shape in response to light!",
    realWorldConnection: "LASIK eye surgery works by reshaping the cornea, but your ability to see still depends on the retinal molecules unchanged since birth.",
    quickCheck: [
      {
        question: "Which organic molecule is responsible for vision by changing shape when light hits it?",
        options: ["Serotonin", "Caffeine", "11-cis-retinal", "DNA"],
        correctIndex: 2,
        explanation: "11-cis-retinal changes from cis to trans configuration when it absorbs light, triggering the signals your brain interprets as vision."
      },
      {
        question: "What neurotransmitter affects your mood, sleep, and appetite?",
        options: ["Caffeine", "Serotonin", "Retinal", "Menthol"],
        correctIndex: 1,
        explanation: "Serotonin is the 'happiness' neurotransmitter. Antidepressants often work by altering serotonin levels in the brain."
      },
      {
        question: "How many bonds can carbon form with other atoms?",
        options: ["2", "3", "4", "6"],
        correctIndex: 2,
        explanation: "Carbon can form 4 stable covalent bonds, which allows it to create chains, rings, and complex 3D structures - the basis of all organic chemistry!"
      }
    ],
    simulation: {
      type: 'vision' as const,
      title: 'Vision Simulator',
      description: 'See how light triggers vision at the molecular level by transforming 11-cis-retinal to all-trans-retinal'
    }
  },
  {
    id: "organic-compounds",
    title: "Organic Compounds: From Vitalism to Modern Chemistry",
    content: `The term 'organic' originally meant 'derived from living organisms.' Early chemists believed 
      that organic compounds could only be made by living things through a mysterious 'vital force.' They thought 
      there was something fundamentally different about the chemistry of life that could never be replicated in a lab.
      
      This idea was shattered in 1828 when Friedrich Wöhler, a German chemist, synthesized urea—an organic compound 
      found in urine—from purely inorganic starting materials (ammonium cyanate). Wöhler famously wrote to his mentor: 
      "I must tell you that I can make urea without the use of kidneys, either man or dog!"
      
      Today, we define organic chemistry as the chemistry of carbon compounds, regardless of their origin. 
      Carbon forms the backbone of an enormous variety of compounds because of its unique properties:
      
      • It forms strong covalent bonds with up to four other atoms
      • It can bond with itself to form chains, rings, and branches
      • Carbon-carbon bonds are remarkably stable
      • It bonds well with hydrogen, oxygen, nitrogen, sulfur, and halogens
      
      The simplest organic compound is methane (CH₄), the main component of natural gas. From this simple 
      beginning, the complexity builds to molecules containing thousands of atoms, like proteins and DNA.
      
      Why is carbon so special? It's in the "Goldilocks" position of the periodic table—not too big, not too small, 
      not too electronegative. This allows it to form stable bonds with many elements and create the molecular 
      diversity that life requires.`,
    video: {
      type: 'hls' as const,
      url: 'https://vz-2adfd2e0-f8c.b-cdn.net/1c53dca0-7041-4cf0-b86f-fe95b983ac1c/playlist.m3u8',
      duration: '10:00'
    },
    molecules: [
      { name: "Methane", description: "The simplest organic molecule (CH₄)" },
      { name: "Ethanol", description: "Simple alcohol found in beverages" }
    ],
    keyPoints: [
      "'Vital force' theory was believed until Wöhler synthesized urea in 1828",
      "Organic chemistry is now defined as the chemistry of carbon compounds",
      "Carbon's four bonds enable infinite molecular diversity",
      "Carbon's 'Goldilocks' position makes it ideal for stable bonding"
    ],
    funFact: "Over 10 million organic compounds are known, and thousands more are discovered every year! In contrast, there are only about 100,000 known inorganic compounds.",
    commonMistake: "Not all carbon-containing compounds are organic. CO₂, carbonates (like limestone), and cyanides are considered inorganic by convention.",
    quickCheck: [
      {
        question: "Who disproved the 'vital force' theory by synthesizing urea in the lab?",
        options: ["Marie Curie", "Friedrich Wöhler", "Louis Pasteur", "Albert Einstein"],
        correctIndex: 1,
        explanation: "Friedrich Wöhler synthesized urea from inorganic ammonium cyanate in 1828, proving organic compounds don't need a 'life force' to be made."
      },
      {
        question: "What is the simplest organic compound?",
        options: ["Ethanol", "Carbon dioxide", "Methane (CH₄)", "Water"],
        correctIndex: 2,
        explanation: "Methane (CH₄) is the simplest organic compound - just one carbon bonded to four hydrogens. It's the main component of natural gas."
      },
      {
        question: "Which of these is NOT considered an organic compound?",
        options: ["Methane", "Ethanol", "Carbon dioxide", "Benzene"],
        correctIndex: 2,
        explanation: "CO₂, carbonates, and cyanides are considered inorganic by convention, even though they contain carbon."
      }
    ],
    drugDiscovery: {
      title: 'The Aspirin Legend – From Willow Bark to the Lab',
      subtitle: 'How chemistry improved on nature\'s remedy',
      story: [
        {
          phase: 'from-nature',
          title: '🌿 From Nature (Vitalism Root)',
          year: 'Ancient - 1800s',
          content: `For thousands of years, humans used Willow Bark (لحاء شجر الصفصاف) to treat pain and fever. 
            Even Hippocrates recommended it in ancient Greece. People believed the "secret of healing" 
            existed only in this living tree - a perfect example of vitalism thinking.`,
          molecule: 'Salicin'
        },
        {
          phase: 'the-problem',
          title: '⚗️ The Chemical Problem',
          year: '1820s-1890s',
          content: `Scientists isolated the active compound: Salicin, which the body converts to Salicylic Acid. 
            While effective, Salicylic Acid was extremely bitter and caused severe stomach irritation. 
            This is where organic chemistry stepped in to improve what nature provided.`,
          molecule: 'Salicylic Acid'
        },
        {
          phase: 'breakthrough',
          title: '💊 The Hoffmann Breakthrough',
          year: '1897',
          content: `Felix Hoffmann at Bayer made a simple but brilliant modification: he added an acetyl group 
            (-COCH₃) to the hydroxyl group of Salicylic Acid, creating Acetylsalicylic Acid (C₉H₈O₄) - 
            known worldwide as Aspirin. The result: more effective, less toxic, and easier on the stomach.`,
          molecule: 'Aspirin'
        }
      ],
      keyInsight: `This story perfectly illustrates the defeat of vitalism: instead of depending on the "life force" 
        in willow bark, chemists used their understanding of molecular structure to CREATE something better 
        than nature provided. The acetyl group was the key - a simple change that transformed medicine.`,
      academicReference: {
        title: 'Aspirin: The Remarkable Story of a Wonder Drug',
        author: 'Diarmuid Jeffreys',
        quote: '"The story of Aspirin is the story of modern medicine itself—the transition from herbs to high-science."'
      },
      interactiveIdeas: [
        {
          name: 'The Acetyl Switch',
          description: 'Drag the acetyl group onto the correct oxygen atom to synthesize Aspirin!'
        },
        {
          name: 'COX-2 Inhibition',
          description: 'See how Aspirin irreversibly inhibits the COX enzyme by transferring its acetyl group.'
        }
      ]
    }
  },
  {
    id: "colors-of-organic-chemistry",
    title: "The Surprising Colors of Organic Chemistry",
    content: `Many people imagine organic compounds as boring white powders. Nothing could be further 
      from the truth! Organic chemistry is full of vibrant, colorful compounds.
      
      WHY ARE SOME MOLECULES COLORED?
      Color arises when molecules absorb certain wavelengths of visible light. This happens when 
      electrons can be excited to higher energy levels. Molecules with extended systems of alternating 
      single and double bonds (called CONJUGATED systems) are often colored because these electrons 
      are easily excited by visible light.
      
      THE CONJUGATION RULE:
      See the interactive diagram below to understand how conjugation length affects the color we see!`,
    conjugationDiagram: true,
    colorExamples: [
      {
        name: "Azulene",
        description: "A beautiful deep blue LIQUID with a peppery smell! Unusual for a small organic molecule (10 carbons).",
        color: "#0000FF", // Deep Blue
        type: "liquid"
      },
      {
        name: "DDQ",
        description: "Forms stunning orange-amber needle crystals. Used as an oxidizing agent.",
        color: "#FF8C00", // Dark Orange
        type: "crystal"
      },
      {
        name: "Diazomethane",
        description: "A bright YELLOW gas. Explosive and toxic - colorful doesn't mean safe!",
        color: "#FFD700", // Yellow
        type: "gas"
      },
      {
        name: "9-Nitrosojulolidine",
        description: "Green prisms with a remarkable steel-blue metallic lustre.",
        color: "#2E8B57", // Sea Green
        type: "crystal"
      },
      {
        name: "Chlorophyll",
        description: "The molecule that makes plants green! Captures sunlight energy for photosynthesis.",
        color: "#008000", // Green
        type: "solid"
      },
      {
        name: "Beta-Carotene",
        description: "The orange pigment in carrots! Also makes flamingos pink (from their diet).",
        color: "#FF4500", // Orange Red
        type: "solid"
      }
    ],
    video: {
      type: 'hls' as const,
      url: 'https://vz-2adfd2e0-f8c.b-cdn.net/3cd3146b-3c0f-4527-b63c-6b2d8f779343/playlist.m3u8',
      duration: '12:00'
    },
    molecules: [
      { name: "Azulene", description: "A beautiful deep blue liquid - unusual for a small organic molecule!" },
      { name: "Benzene", description: "Colorless - not enough conjugation to absorb visible light" }
    ],
    keyPoints: [
      "Organic compounds can be brilliantly colored, not just white powders",
      "Color comes from absorption of visible light by conjugated electron systems",
      "Azulene is a rare blue organic liquid",
      "More conjugation = longer wavelength absorbed = color shifts toward red",
      "Diazomethane is yellow but highly dangerous"
    ],
    funFact: "The deep blue color of azulene was known to 15th-century alchemists who distilled it from chamomile. The name comes from the Arabic 'lazaward' meaning blue!",
    realWorldConnection: "Food coloring, fabric dyes, and the pigments in your TV screen all rely on organic chemists' understanding of how molecular structure creates color.",
    quickCheck: [
      {
        question: "What structural feature makes organic compounds colorful?",
        options: ["Single bonds only", "Conjugated double bond systems", "Ionic bonds", "Small molecular size"],
        correctIndex: 1,
        explanation: "Conjugated systems (alternating single and double bonds) allow electrons to absorb visible light, creating color."
      },
      {
        question: "Azulene is unique because it is:",
        options: ["A colorless gas", "A blue liquid", "A red solid", "A green crystal"],
        correctIndex: 1,
        explanation: "Azulene is a rare example of a small organic molecule (just 10 carbons) that's a beautiful deep blue LIQUID!"
      },
      {
        question: "More conjugated double bonds generally means the compound absorbs:",
        options: ["Shorter wavelength light (UV)", "Longer wavelength light (visible/red)", "No light at all", "Radio waves"],
        correctIndex: 1,
        explanation: "More conjugation means longer wavelength absorption - the color shifts toward red as conjugation increases."
      }
    ]
  },
  {
    id: "synthetic-dyes",
    title: "Synthetic Dyes: The Birth of the Chemical Industry",
    content: `The modern chemical industry was born from an 18-year-old's failed experiment. In 1856, 
      William Henry Perkin was trying to synthesize quinine (a malaria treatment) in his home laboratory. 
      Instead, he produced a reddish-brown sludge. Most would have thrown it away, but Perkin noticed 
      something interesting—when he cleaned his flask with alcohol, he got a beautiful purple solution.
      
      Perkin had accidentally created MAUVEINE, the first synthetic dye. Purple was incredibly valuable 
      at the time because natural purple dyes (like Tyrian purple from sea snails) were extremely expensive. 
      Perkin patented his discovery, built a factory, and became wealthy. His dye colored Queen Victoria's 
      dresses and sparked the "mauve decade" of fashion.
      
      More importantly, Perkin's discovery showed that valuable organic compounds could be synthesized 
      in the laboratory. This sparked the German chemical industry, which dominated organic chemistry 
      for decades. Companies like BASF, Bayer, and Hoechst were founded to make synthetic dyes.
      
      AROMATIC COMPOUNDS:
      Mauveine and most synthetic dyes contain benzene rings—six-membered carbon rings with special stability. 
      These "aromatic" compounds (named for their often-pleasant smells) include:
      
      • Benzene: The parent compound, a hexagonal ring of carbons
      • Pyridine: A benzene ring with one carbon replaced by nitrogen
      • Thiophene: A five-membered ring with sulfur
      • Phenol: Benzene with an -OH group (used in plastics)
      • Aniline: Benzene with an -NH₂ group (basis of many dyes)
      
      These aromatic building blocks remain essential in pharmaceuticals, polymers, and materials today.`,
    video: {
      type: 'hls' as const,
      url: 'https://vz-2adfd2e0-f8c.b-cdn.net/e7874c2d-9dc0-4631-9199-bb507cfc38b3/playlist.m3u8',
      duration: '15:00'
    },
    molecules: [
      { name: "Benzene", description: "The parent aromatic compound - a hexagonal ring" }
    ],
    keyPoints: [
      "William Perkin accidentally discovered Mauveine in 1856",
      "First synthetic dye launched the modern chemical industry",
      "Aromatic compounds (benzene rings) are key structural units",
      "German chemical industry (BASF, Bayer) grew from dye chemistry"
    ],
    funFact: "The jeans you might be wearing are colored with INDIGO, now made synthetically. Natural indigo from plants was once so valuable it was called 'blue gold'!",
    realWorldConnection: "Many modern drugs were discovered from dye research. Sulfa antibiotics, the first antibacterial drugs, came from work on azo dyes.",
    quickCheck: [
      {
        question: "Who accidentally discovered the first synthetic dye (Mauveine)?",
        options: ["Marie Curie", "William Henry Perkin", "Albert Einstein", "Louis Pasteur"],
        correctIndex: 1,
        explanation: "18-year-old William Perkin discovered Mauveine in 1856 while trying to make quinine. His purple dye launched the chemical industry!"
      },
      {
        question: "What year was Mauveine discovered?",
        options: ["1776", "1856", "1920", "1950"],
        correctIndex: 1,
        explanation: "1856 - this discovery launched the 'mauve decade' of fashion and the German chemical industry (BASF, Bayer)."
      },
      {
        question: "What type of structural unit is found in most synthetic dyes?",
        options: ["Sugar rings", "Benzene rings (aromatic)", "Alkane chains", "Sulfur atoms"],
        correctIndex: 1,
        explanation: "Aromatic compounds (benzene rings) are key building blocks in dyes because of their stability and ability to absorb visible light."
      }
    ]
  },
  {
    id: "smell-and-pheromones",
    title: "Chemical Communication: Smell & Pheromones",
    content: `Your sense of smell is a molecular detection system. When you sniff a flower, volatile 
      organic molecules travel up your nose and bind to olfactory receptors. Each receptor recognizes 
      specific molecular shapes, sending signals to your brain that you interpret as scent.
      
      SMELLY MOLECULES:
      Some of the most pungent compounds contain sulfur. Thiols (compounds with -SH groups) are notorious:
      
      • Skunk spray contains 2-butene-1-thiol—detectable at incredibly low concentrations
      • Natural gas is odorless, so gas companies add tert-butyl thiol so you can smell leaks
      • Garlic's smell comes from allyl sulfur compounds
      
      PHEROMONES:
      Insects communicate using organic molecules called pheromones. These chemical signals can:
      
      • Attract mates (sex pheromones)
      • Mark trails to food sources
      • Signal alarm to the colony
      
      BOMBYKOL - The First Pheromone Discovered:
      The silkworm moth (Bombyx mori) can detect a SINGLE MOLECULE of the female sex pheromone, bombykol! 
      It took scientists 20 years and 500,000 female moths to isolate just 12 mg of this compound. 
      Scientists have used pheromone traps to control pest insects without harmful pesticides.
      
      THE PERFUME INDUSTRY - Large Ring Compounds:
      Some of the most valued scents come from large ring compounds found in animal secretions:
      
      • MUSCONE: From the musk deer, a 15-membered ring with a distinctive musky smell
      • CIVETONE: From the civet cat, a 17-membered ring used in expensive perfumes
      
      These compounds are now made synthetically to protect the animals, but their structures 
      were first determined from natural sources. The large rings give them unique properties 
      that make them excellent perfume fixatives.
      
      STEREOCHEMISTRY MATTERS:
      Here's something remarkable: two molecules with the exact same atoms and bonds can smell completely 
      different if they're mirror images of each other! These mirror-image molecules are called ENANTIOMERS.
      
      • (R)-limonene smells like oranges
      • (S)-limonene smells like lemons
      • Same formula, different 3D arrangement, different smell!
      
      FRONTALIN - The Beetle Pheromone:
      The insect pheromone frontalin is a striking example of stereochemistry in action. 
      One enantiomer of frontalin attracts certain bark beetles to trees, while the mirror 
      image REPELS them! This is used in pest control—the wrong enantiomer can protect forests.
      Your nose can distinguish these molecular "handedness" differences!
      
      THE FREIBURG INCIDENT (1889):
      One of the worst smells in chemistry is THIOACETONE. When a factory in Freiburg, Germany made 
      thioacetone, the smell evacuated the entire city! People vomited in the streets from the stench. 
      In 1967, scientists repeated the experiment near Oxford, and workers at an Esso research station 
      400 meters away complained within seconds. This demonstrates just how sensitive our smell is!`,
    video: {
      type: 'hls' as const,
      url: 'https://vz-2adfd2e0-f8c.b-cdn.net/effe4764-155a-457a-8fd3-f2b40c313f19/playlist.m3u8',
      duration: '14:00'
    },
    molecules: [
      { name: "Limonene", description: "Mirror-image forms smell like oranges vs lemons!" },
      { name: "Muscone", description: "Musk deer pheromone - 15-membered ring" },
      { name: "Civetone", description: "Civet cat pheromone - 17-membered ring for perfumes" },
      { name: "Frontalin", description: "Beetle pheromone - one enantiomer attracts, the other repels!" },
      { name: "Thioacetone", description: "The worst-smelling compound - evacuated Freiburg in 1889!" }
    ],
    keyPoints: [
      "Smell works through molecular shape recognition",
      "Thiols (-SH groups) create strong odors (skunk, garlic)",
      "Pheromones are chemical communication molecules in insects",
      "Enantiomers (mirror-image molecules) can smell completely different",
      "Stereochemistry—the 3D arrangement of atoms—matters for biology"
    ],
    funFact: "Humans can distinguish over 1 trillion different smells! Your olfactory system has about 400 different receptor types that work in combinations.",
    commonMistake: "Don't assume mirror-image molecules behave the same way. In biology and medicine, the 'handedness' of a molecule is often critical for its activity.",
    quickCheck: [
      {
        question: "(R)-limonene smells like oranges. What does (S)-limonene smell like?",
        options: ["Also oranges", "Lemons", "Nothing - it's odorless", "Mint"],
        correctIndex: 1,
        explanation: "Mirror-image molecules (enantiomers) can smell completely different! Same atoms, different 3D arrangement, different smell."
      },
      {
        question: "Which functional group creates strong odors like in skunk spray and garlic?",
        options: ["Alcohols (-OH)", "Thiols (-SH)", "Amines (-NH₂)", "Ketones (C=O)"],
        correctIndex: 1,
        explanation: "Thiols (-SH groups) are notorious for their strong smells. Skunk spray contains 2-butene-1-thiol!"
      },
      {
        question: "What is a pheromone?",
        options: ["A type of vitamin", "A chemical communication molecule", "A protein", "A type of sugar"],
        correctIndex: 1,
        explanation: "Pheromones are chemical signals that insects and other animals use to communicate - for mating, marking trails, or sounding alarms."
      },
      {
        question: "The insect pheromone frontalin has two enantiomers. One attracts beetles, the other:",
        options: ["Also attracts them", "Repels them", "Kills them", "Has no effect"],
        correctIndex: 1,
        explanation: "One enantiomer attracts bark beetles while its mirror image REPELS them! This is used in pest control to protect forests."
      }
    ]
  },
  {
    id: "stereochemistry-intro",
    title: "Introduction to Stereochemistry",
    content: `Stereochemistry is the study of the three-dimensional arrangement of atoms in molecules. 
      This seemingly subtle concept has profound effects in biology and medicine.
      
      CHIRALITY AND HANDEDNESS:
      Look at your hands. They are mirror images of each other but not superimposable—you can't place 
      your right hand exactly on top of your left. Molecules can have this same property, called CHIRALITY 
      (from the Greek word for "hand").
      
      A carbon atom bonded to four DIFFERENT groups creates a chiral center. The two mirror-image forms 
      are called ENANTIOMERS. They have identical:
      • Molecular formulas
      • Boiling points
      • Melting points
      • Most chemical properties
      
      But they are NOT identical biologically! Your body's enzymes and receptors are also chiral, so 
      they can distinguish between enantiomers—like how a right hand fits better in a right glove.
      
      THE THALIDOMIDE TRAGEDY:
      In the 1950s, thalidomide was prescribed to pregnant women for morning sickness. Tragically, 
      one enantiomer caused birth defects while the other was safe. Over 10,000 children were affected.
      This disaster led to strict regulations requiring pharmaceutical companies to study both 
      enantiomers of chiral drugs separately.
      
      Today, many drugs are sold as single enantiomers:
      • Esomeprazole (Nexium) is the active enantiomer of omeprazole
      • Levofloxacin is the active enantiomer of ofloxacin
      
      Understanding stereochemistry is essential for understanding how drugs work and how enzymes 
      recognize their substrates with exquisite specificity.`,
    video: {
      type: 'hls' as const,
      url: 'https://vz-2adfd2e0-f8c.b-cdn.net/3486a75c-78ee-422c-a14b-685873952501/playlist.m3u8',
      duration: '11:00'
    },
    keyPoints: [
      "Chirality = molecular handedness (non-superimposable mirror images)",
      "A carbon with 4 different groups is a chiral center",
      "Enantiomers have identical physical properties but different biological effects",
      "Thalidomide tragedy showed importance of stereochemistry in medicine",
      "Modern drug development studies each enantiomer separately"
    ],
    funFact: "All amino acids in your proteins are 'left-handed' (L-configuration), and all sugars in DNA are 'right-handed' (D-configuration). Life chose specific handedness billions of years ago!",
    commonMistake: "Enantiomers rotate plane-polarized light in opposite directions, but this optical activity doesn't predict which one is biologically active—you have to test them!",
    quickCheck: [
      {
        question: "What does 'chiral' mean?",
        options: ["Colorful", "Handedness - non-superimposable mirror images", "Magnetic", "Radioactive"],
        correctIndex: 1,
        explanation: "Chirality comes from Greek for 'hand'. Like your left and right hands, chiral molecules are mirror images that can't be superimposed."
      },
      {
        question: "The thalidomide tragedy showed that:",
        options: ["All drugs are dangerous", "Enantiomers can have very different biological effects", "Natural products are safer", "Only one enantiomer exists"],
        correctIndex: 1,
        explanation: "One thalidomide enantiomer was safe, the other caused birth defects. This tragedy led to strict pharmaceutical regulations."
      },
      {
        question: "What creates a chiral center in a carbon atom?",
        options: ["Being bonded to oxygen", "Having four DIFFERENT groups attached", "Being in a ring", "Having double bonds"],
        correctIndex: 1,
        explanation: "A carbon bonded to four DIFFERENT groups creates a chiral center - the source of molecular handedness."
      }
    ]
  },
  {
    id: "atomic-structure-review",
    title: "Atomic Structure Review",
    content: `Before diving deeper into organic chemistry, let's review the structure of atoms. Understanding 
      electrons is crucial because chemical bonding is all about electrons!
      
      An atom consists of three subatomic particles:
      • Protons (positive charge) - found in the nucleus
      • Neutrons (no charge) - found in the nucleus  
      • Electrons (negative charge) - orbit the nucleus in shells
      
      The number of protons defines the element. Carbon has 6 protons, so its atomic number is 6. 
      In a neutral atom, the number of electrons equals the number of protons.
      
      Electrons are arranged in shells (energy levels) around the nucleus:
      • 1st shell: holds up to 2 electrons
      • 2nd shell: holds up to 8 electrons
      • 3rd shell: holds up to 8 electrons (simplified)
      
      For carbon (6 electrons):
      • 1st shell: 2 electrons (full)
      • 2nd shell: 4 electrons (not full - these are valence electrons!)
      
      The outermost electrons are called VALENCE ELECTRONS. They are the ones involved in chemical bonding. 
      Carbon has 4 valence electrons, which is why it forms 4 bonds!
      
      The octet rule states that atoms are most stable when their outer shell has 8 electrons (or 2 for 
      hydrogen). Carbon needs 4 more electrons to complete its octet, so it shares electrons 
      by forming 4 covalent bonds.`,
    video: {
      type: 'hls' as const,
      url: 'https://vz-2adfd2e0-f8c.b-cdn.net/94e0612a-1a23-474e-8491-ca21b66ec4fa/playlist.m3u8',
      duration: '08:00'
    },
    keyPoints: [
      "Electrons orbit the nucleus in shells (energy levels)",
      "Carbon has 6 electrons: 2 in the first shell, 4 in the second",
      "Valence electrons (outermost) are involved in bonding",
      "The octet rule: atoms want 8 electrons in their outer shell",
      "Carbon forms 4 bonds to complete its octet"
    ],
    funFact: "If an atom were the size of a football stadium, the nucleus would be the size of a marble at the center—atoms are mostly empty space!",
    commonMistake: "Don't confuse shells with orbitals. Shells are energy levels; orbitals are specific regions within shells where electrons are likely to be found.",
    quickCheck: [
      {
        question: "How many valence electrons does carbon have?",
        options: ["2", "4", "6", "8"],
        correctIndex: 1,
        explanation: "Carbon has 4 valence electrons in its outer shell. This is why carbon forms 4 bonds!"
      },
      {
        question: "The octet rule states that atoms are most stable when their outer shell has:",
        options: ["2 electrons", "4 electrons", "6 electrons", "8 electrons"],
        correctIndex: 3,
        explanation: "Atoms 'want' 8 electrons in their outer shell (2 for hydrogen). Carbon shares 4 electrons to complete its octet."
      },
      {
        question: "Which particles are found in the nucleus of an atom?",
        options: ["Electrons only", "Protons and neutrons", "Neutrons only", "Electrons and protons"],
        correctIndex: 1,
        explanation: "The nucleus contains protons (positive) and neutrons (neutral). Electrons orbit outside the nucleus."
      }
    ]
  },
  {
    id: "chemical-bonding",
    title: "Chemical Bonding Fundamentals",
    content: `Atoms bond together to achieve stability—specifically, to fill their outer electron shells. 
      There are two main types of chemical bonds:
      
      IONIC BONDS form when one atom transfers electrons to another:
      • Typically between metals and nonmetals
      • Creates charged ions (Na⁺ and Cl⁻ in table salt)
      • Not common in organic chemistry
      
      COVALENT BONDS form when atoms SHARE electrons:
      • Typically between nonmetals
      • The shared electrons count toward each atom's octet
      • This is the foundation of organic chemistry!
      
      In organic molecules, carbon always forms covalent bonds. Let's see how methane (CH₄) forms:
      
      • Carbon needs 4 electrons to complete its octet
      • Hydrogen needs 1 electron to complete its shell (duet)
      • Solution: Carbon shares one electron with each of 4 hydrogens
      • Each C-H bond has 2 shared electrons
      
      The strength of a covalent bond depends on how much the electron clouds overlap. This is why 
      carbon-carbon bonds are so strong—the atoms are similar in size and electronegativity.
      
      LEWIS STRUCTURES (electron dot structures) show bonding:
      • Each line represents 2 shared electrons (a bonding pair)
      • Dots around atoms represent non-bonding electrons (lone pairs)`,
    video: {
      type: 'hls' as const,
      url: 'https://vz-2adfd2e0-f8c.b-cdn.net/5469430a-05ae-42dc-b550-dcfd9f46f151/playlist.m3u8',
      duration: '09:00'
    },
    molecules: [
      { name: "Methane", description: "Perfect example of 4 covalent C-H bonds" },
      { name: "Ethanol", description: "Contains C-C, C-H, C-O, and O-H bonds" }
    ],
    keyPoints: [
      "Ionic bonds: electron transfer (not common in organic chemistry)",
      "Covalent bonds: electron sharing (foundation of organic chemistry)",
      "Each covalent bond = 2 shared electrons",
      "Carbon forms 4 covalent bonds to complete its octet",
      "Lewis structures show bonding and lone pairs"
    ],
    realWorldConnection: "Diamond is incredibly hard because it's a giant network of carbon atoms, each forming 4 strong covalent bonds with its neighbors in 3D.",
    commonMistake: "When drawing Lewis structures, don't forget lone pairs! Nitrogen has 1 lone pair, oxygen has 2, and halogens have 3.",
    quickCheck: [
      {
        question: "In organic chemistry, bonds are typically formed by:",
        options: ["Electron transfer (ionic)", "Electron sharing (covalent)", "Magnetic attraction", "Nuclear fusion"],
        correctIndex: 1,
        explanation: "Organic chemistry is based on covalent bonds where atoms SHARE electrons. Ionic bonds are rare in organic compounds."
      },
      {
        question: "Each line in a Lewis structure represents:",
        options: ["1 electron", "2 shared electrons", "4 electrons", "An ionic bond"],
        correctIndex: 1,
        explanation: "Each line = 2 shared electrons (a bonding pair). That's why carbon with 4 lines has 8 electrons around it!"
      },
      {
        question: "How many lone pairs does oxygen typically have?",
        options: ["0", "1", "2", "3"],
        correctIndex: 2,
        explanation: "Oxygen has 2 lone pairs (4 non-bonding electrons). Remember: N has 1 lone pair, O has 2, halogens have 3."
      }
    ]
  },
  {
    id: "hybridization",
    title: "Carbon's Secret: Hybridization",
    content: `Here's a puzzle: Carbon's electron configuration is 1s² 2s² 2p². That's 2 electrons in the 
      2s orbital and 2 in 2p orbitals. But carbon forms 4 EQUAL bonds in methane. How?
      
      The answer is HYBRIDIZATION—the mixing of atomic orbitals to form new, equivalent hybrid orbitals.
      
      SP³ HYBRIDIZATION (4 single bonds):
      • One 2s orbital + three 2p orbitals combine
      • Creates 4 equivalent sp³ hybrid orbitals
      • Arranged in a TETRAHEDRON (109.5° bond angles)
      • Example: Methane (CH₄), ethane (C₂H₆)
      
      SP² HYBRIDIZATION (double bonds):
      • One 2s orbital + two 2p orbitals combine
      • Creates 3 equivalent sp² hybrid orbitals
      • Arranged in a TRIANGULAR PLANAR shape (120° bond angles)
      • One unhybridized p orbital remains for π bonding
      • Example: Ethene (C₂H₄), benzene
      
      SP HYBRIDIZATION (triple bonds):
      • One 2s orbital + one 2p orbital combine
      • Creates 2 equivalent sp hybrid orbitals
      • Arranged in a LINEAR shape (180° bond angles)
      • Two unhybridized p orbitals remain for π bonding
      • Example: Ethyne/Acetylene (C₂H₂)
      
      Quick rule: Count the "groups" attached to carbon:
      • 4 groups → sp³ (tetrahedral)
      • 3 groups → sp² (trigonal planar)
      • 2 groups → sp (linear)`,
    keyPoints: [
      "Hybridization explains how carbon forms 4 equivalent bonds",
      "sp³: 4 groups, tetrahedral, 109.5° angles",
      "sp²: 3 groups, trigonal planar, 120° angles",
      "sp: 2 groups, linear, 180° angles",
      "Count groups attached to carbon to determine hybridization"
    ],
    funFact: "The tetrahedral shape of sp³ carbon was proposed by van 't Hoff and Le Bel in 1874—before anyone knew about electrons or orbitals!",
    commonMistake: "Double bonds count as ONE group for hybridization. A C=C double bond is one group, not two.",
    diagrams: [
      { type: 'hybridization', props: { type: 'comparison', interactive: true }, caption: 'Compare sp³, sp², and sp hybridization' }
    ],
    difficulty: 'fundamental',
    examTip: "Quick trick: Count the GROUPS (not bonds) attached to carbon. 4 groups = sp³, 3 groups = sp², 2 groups = sp. A double bond counts as ONE group!",
    plainEnglish: {
      technical: "Hybridization involves the mixing of s and p atomic orbitals to form equivalent sp³, sp², or sp hybrid orbitals",
      simple: "Carbon mixes its orbitals like mixing paint colors to make new 'hybrid' orbitals that point in specific directions for bonding!"
    },
    quickCheck: [
      {
        question: "What is the hybridization of a carbon with 3 groups attached (like in ethene C₂H₄)?",
        options: ["sp³", "sp²", "sp", "None - unhybridized"],
        correctIndex: 1,
        explanation: "3 groups means sp² hybridization! The leftover p orbital is used for the π bond in the double bond."
      },
      {
        question: "What bond angle would you expect for an sp³ hybridized carbon?",
        options: ["90°", "109.5°", "120°", "180°"],
        correctIndex: 1,
        explanation: "sp³ gives tetrahedral geometry with 109.5° angles. This is the angle in methane (CH₄)!"
      }
    ]
  },
  {
    id: "sigma-and-pi-bonds",
    title: "Sigma (σ) and Pi (π) Bonds",
    content: `Not all covalent bonds are created equal! There are two types based on orbital overlap:
      
      SIGMA (σ) BONDS:
      • Formed by HEAD-ON (end-to-end) orbital overlap
      • Electron density is concentrated between the nuclei
      • Single bonds are always sigma bonds
      • Very strong because of direct overlap
      • Allows FREE ROTATION around the bond axis
      
      PI (π) BONDS:
      • Formed by SIDEWAYS (parallel) orbital overlap
      • Electron density is above and below the bond axis
      • Found in double and triple bonds (in addition to σ bond)
      • Weaker than sigma bonds due to less overlap
      • PREVENTS rotation (creates rigid structure)
      
      Bond Composition:
      • Single bond (C-C): 1 sigma bond
      • Double bond (C=C): 1 sigma + 1 pi bond
      • Triple bond (C≡C): 1 sigma + 2 pi bonds
      
      Why does this matter?
      
      1. CIS-TRANS ISOMERS: Because double bonds can't rotate, atoms can be "locked" on the same side 
         (cis) or opposite sides (trans) of the double bond. This is why vision works!
      
      2. PLANARITY: Double bonds force connected atoms into a flat arrangement.
      
      3. REACTIVITY: Pi bonds are more exposed and easier to break, making double bonds reactive sites.`,
    keyPoints: [
      "Sigma (σ) bonds: head-on overlap, single bonds, allows rotation",
      "Pi (π) bonds: sideways overlap, in double/triple bonds, prevents rotation",
      "Single = 1σ, Double = 1σ + 1π, Triple = 1σ + 2π",
      "Pi bond rigidity causes cis-trans isomerism",
      "Pi bonds are more reactive than sigma bonds"
    ],
    realWorldConnection: "Trans fats are unhealthy because the trans configuration makes fat molecules straighter, allowing them to pack tightly and clog arteries.",
    funFact: "Your ability to see depends on pi bonds! Light causes cis-to-trans isomerization of a double bond in retinal—without this, vision wouldn't work.",
    quickCheck: [
      {
        question: "A single bond consists of:",
        options: ["1 pi bond", "1 sigma bond", "1 sigma + 1 pi bond", "2 pi bonds"],
        correctIndex: 1,
        explanation: "Single bonds are always sigma (σ) bonds - formed by head-on orbital overlap."
      },
      {
        question: "A double bond (C=C) consists of:",
        options: ["2 sigma bonds", "2 pi bonds", "1 sigma + 1 pi bond", "1 sigma bond only"],
        correctIndex: 2,
        explanation: "Double bonds = 1 sigma bond + 1 pi bond. The pi bond is weaker and more reactive."
      },
      {
        question: "Why can't you rotate around a C=C double bond?",
        options: ["It's too heavy", "The pi bond prevents rotation", "Carbon doesn't like rotation", "There's no reason - you can rotate"],
        correctIndex: 1,
        explanation: "The pi bond requires parallel p orbitals. Rotation would break the pi bond, so it's locked in place!"
      },
      {
        question: "What causes cis-trans isomerism?",
        options: ["Different molecular formulas", "Restricted rotation around double bonds", "Different numbers of atoms", "Ionic bonding"],
        correctIndex: 1,
        explanation: "Because double bonds can't rotate, groups can be 'locked' on the same side (cis) or opposite sides (trans)."
      }
    ]
  },
  {
    id: "electronegativity-polarity",
    title: "Electronegativity & Molecular Polarity",
    content: `When two atoms share electrons in a covalent bond, they don't always share equally. 
      This unequal sharing creates POLAR BONDS.
      
      ELECTRONEGATIVITY is an atom's ability to attract shared electrons:
      • Fluorine is most electronegative (4.0)
      • Oxygen is very electronegative (3.5)
      • Carbon is moderate (2.5)
      • Hydrogen is low (2.1)
      
      When atoms with different electronegativities bond:
      • Electrons spend more time near the more electronegative atom
      • Creates a partial negative charge (δ⁻) on one end
      • And a partial positive charge (δ⁺) on the other
      • This is a POLAR COVALENT BOND
      
      MOLECULAR POLARITY depends on:
      1. The polarity of individual bonds
      2. The GEOMETRY of the molecule
      
      Example - CO₂ vs H₂O:
      • CO₂: Two polar C=O bonds, but linear geometry → vectors cancel → NONPOLAR molecule
      • H₂O: Two polar O-H bonds, bent geometry → vectors don't cancel → POLAR molecule
      
      Why polarity matters:
      • Determines solubility ("like dissolves like")
      • Affects boiling points
      • Influences reactivity
      • Determines drug absorption and distribution`,
    keyPoints: [
      "Electronegativity: an atom's pull on shared electrons",
      "Polar bonds have unequal electron sharing (δ⁺ and δ⁻)",
      "Molecular polarity depends on bond polarity AND geometry",
      "CO₂ is nonpolar (linear), H₂O is polar (bent)",
      "Polarity determines solubility, boiling point, and reactivity"
    ],
    commonMistake: "A molecule with polar bonds is not necessarily polar! Symmetry can cause polar bonds to cancel (like in CO₂ or CCl₄).",
    realWorldConnection: "Water's polarity makes it the 'universal solvent'—it dissolves polar and ionic compounds but not oils (nonpolar). This is why oil and water don't mix!",
    quickCheck: [
      {
        question: "Which element is MOST electronegative?",
        options: ["Carbon", "Oxygen", "Fluorine", "Hydrogen"],
        correctIndex: 2,
        explanation: "Fluorine (4.0) is the most electronegative element - it pulls shared electrons toward itself most strongly."
      },
      {
        question: "CO₂ has polar C=O bonds but is a nonpolar molecule because:",
        options: ["The bonds aren't really polar", "The linear geometry causes bond polarities to cancel", "Carbon is more electronegative than oxygen", "It's a gas"],
        correctIndex: 1,
        explanation: "CO₂ is linear, so the two polar C=O bond dipoles point in opposite directions and cancel out!"
      },
      {
        question: "Why doesn't oil mix with water?",
        options: ["Oil is too heavy", "Oil is nonpolar, water is polar", "Oil is lighter than water", "They have the same density"],
        correctIndex: 1,
        explanation: "'Like dissolves like' - polar water dissolves polar things, but oil is nonpolar, so they don't mix."
      }
    ]
  },
  {
    id: "periodic-table-organic",
    title: "The Periodic Table in Organic Chemistry",
    content: `While carbon is the star of organic chemistry, it never works alone. Several other elements 
      play crucial supporting roles:
      
      THE COMMON CAST:
      • Hydrogen (H): Most common partner of carbon
      • Oxygen (O): In alcohols, ethers, ketones, carboxylic acids
      • Nitrogen (N): In amines, amides, proteins, DNA
      • Sulfur (S): In thiols, thioethers, amino acids (cysteine, methionine)
      • Phosphorus (P): In DNA backbone, ATP (energy molecule)
      
      THE HALOGENS (F, Cl, Br, I):
      Halogens are often used to modify drug properties:
      • Fluorine makes molecules more stable (many drugs contain fluorine)
      • Chlorine and bromine are used in synthesis
      • Iodine is essential in thyroid hormones
      
      ORGANOMETALLIC CHEMISTRY:
      Some organic reactions use metals:
      • Lithium (Li): n-Butyllithium is a super-strong base
      • Magnesium (Mg): Grignard reagents build carbon-carbon bonds
      • Palladium (Pd): Catalyzes cross-coupling reactions (Nobel Prize 2010)
      
      AGRICULTURAL CHEMISTRY:
      • Fungicides like propiconazole contain nitrogen heterocycles
      • Insecticides like pyrethrins (natural) and imidacloprid (synthetic)
      • Herbicides like glyphosate contain phosphorus
      
      Understanding how different elements behave allows organic chemists to design molecules with 
      specific properties for medicine, agriculture, and materials.`,
    keyPoints: [
      "Common elements: C, H, O, N, S, P, and halogens",
      "Halogens modify drug stability and properties",
      "Organometallic reagents (Li, Mg, Pd) enable powerful transformations",
      "The 2010 Nobel Prize was for palladium-catalyzed cross-coupling",
      "Agricultural chemicals rely on diverse element combinations"
    ],
    funFact: "Prozac (fluoxetine) and Lipitor (atorvastatin) both contain fluorine atoms. About 20% of pharmaceutical drugs contain fluorine!",
    realWorldConnection: "The Heck, Suzuki, and Negishi reactions (Nobel 2010) allow chemists to connect carbon atoms in ways that were previously impossible, enabling synthesis of complex medicines.",
    quickCheck: [
      {
        question: "Which element is commonly added to drugs to make them more stable?",
        options: ["Sodium", "Fluorine", "Calcium", "Iron"],
        correctIndex: 1,
        explanation: "About 20% of pharmaceutical drugs contain fluorine! It makes molecules more stable and resistant to metabolism."
      },
      {
        question: "The 2010 Nobel Prize in Chemistry was for:",
        options: ["Vitamin synthesis", "Plastic discovery", "Palladium-catalyzed cross-coupling", "DNA sequencing"],
        correctIndex: 2,
        explanation: "The Heck, Suzuki, and Negishi reactions use palladium to connect carbon atoms - essential for drug synthesis."
      },
      {
        question: "Which elements are MOST common in organic molecules? (CHNOPS)",
        options: ["Carbon, Gold, Iron", "Carbon, Hydrogen, Oxygen, Nitrogen, Sulfur, Phosphorus", "Only Carbon and Hydrogen", "All metals"],
        correctIndex: 1,
        explanation: "CHNOPS - Carbon, Hydrogen, Nitrogen, Oxygen, Phosphorus, and Sulfur are the most common elements in organic/biological molecules."
      }
    ]
  },
  {
    id: "organic-chemistry-and-industry",
    title: "Organic Chemistry and Industry",
    content: `Organic chemistry powers modern industry on a massive scale. The chemical industry 
      is divided into two major branches:
      
      BULK CHEMICALS (Commodity Chemicals):
      • Produced in enormous quantities (millions of tons per year)
      • Relatively simple molecules from petroleum
      • Low price per kilogram
      • Examples: ethylene, propylene, benzene, methanol
      
      FINE CHEMICALS (Specialty Chemicals):
      • Produced in smaller quantities (tons to kilograms)
      • Complex molecules requiring sophisticated synthesis
      • High value per kilogram
      • Examples: pharmaceuticals, fragrances, agrochemicals
      
      PETROCHEMICALS - THE BULK INDUSTRY:
      Crude oil is "cracked" into smaller molecules that become building blocks:
      • Ethylene → polyethylene (plastic bags, bottles)
      • Propylene → polypropylene (containers, textiles)
      • Benzene → polystyrene, nylon, pharmaceuticals
      
      Annual production: over 350 million tons of plastics!
      
      CASE STUDY: YOUR SHOWER GEL (Fine Chemistry in Action)
      A typical shower gel contains dozens of organic molecules, each designed for a purpose:
      
      SURFACTANTS (cleaning):
      • Sodium laureth sulfate (SLS): Main foam-maker
      • Cocamide DEA: Stabilizes foam, adds viscosity
      • Cocamidopropyl betaine: Gentler co-surfactant
      
      FRAGRANCES:
      • α-Pinene: Pine/forest scent
      • Limonene: Citrus freshness
      • Terpinen-4-ol: Tea tree scent + antiseptic
      
      PRESERVATIVES & STABILIZERS:
      • BHT (Butylated hydroxytoluene): Antioxidant
      • Sodium benzoate: Prevents bacterial growth
      • Citric acid: pH adjuster
      
      COLORANTS:
      • Tartrazine (CI 19140): Yellow dye
      • Scarlet GN (CI 14700): Red dye
      
      DENATONIUM BENZOATE (Bitrex) - A SAFETY STORY:
      What's the bitterest substance known to humans? Denatonium benzoate, trade name "Bitrex"!
      It's so bitter that just 10 parts per million make water undrinkable. It's added to:
      • Household cleaners (to prevent accidental poisoning)
      • Antifreeze (to stop children drinking the sweet liquid)
      • Nail polish (to discourage nail-biting)
      
      One organic molecule saves thousands of children's lives every year by making 
      dangerous substances taste terrible!
      
      FOOD INDUSTRY:
      • Vanillin: Vanilla flavor (mostly synthetic now)
      • Maltol: Enhances sweetness perception
      • Saccharin & Aspartame: Artificial sweeteners
      
      SYNTHETIC FIBERS:
      • Nylon: First fully synthetic fiber (1935)—revolutionary for stockings
      • Polyester: Wrinkle-resistant, durable
      • Spandex (Lycra): Stretchy material for athletic wear`,
    molecules: [
      { name: "Vanillin", description: "The main flavor in vanilla" },
      { name: "Limonene", description: "Citrus scent found in many products" }
    ],
    keyPoints: [
      "Bulk chemicals: simple, cheap, millions of tons (petroleum-based)",
      "Fine chemicals: complex, expensive, small quantities (drugs, perfumes)",
      "Shower gel contains dozens of purpose-designed organic molecules",
      "Bitrex is the bitterest substance - saves children from poisoning",
      "Over 350 million tons of plastics produced annually"
    ],
    funFact: "Denatonium (Bitrex) is so bitter that chemists who work with it can taste it on their hands even after washing multiple times. It's detected at 10 parts per BILLION!",
    realWorldConnection: "Next time you use shower gel, remember: every ingredient was designed by organic chemists. The foam, the scent, the color, the preservation—all chemistry in action.",
    quickCheck: [
      {
        question: "Bulk chemicals are characterized by:",
        options: ["Small production, high price", "Large production, low price", "Only natural sources", "Being used only in medicine"],
        correctIndex: 1,
        explanation: "Bulk chemicals (like ethylene, benzene) are produced in millions of tons at low cost from petroleum."
      },
      {
        question: "What is denatonium benzoate (Bitrex) used for?",
        options: ["Flavoring food", "Making products taste bitter to prevent poisoning", "Coloring plastics", "Fuel additive"],
        correctIndex: 1,
        explanation: "Bitrex is the bitterest substance known - added to cleaners, antifreeze, and nail polish to prevent accidental ingestion. It saves children's lives!"
      },
      {
        question: "How many tons of plastics are produced globally each year?",
        options: ["1 million", "50 million", "Over 350 million", "1 billion"],
        correctIndex: 2,
        explanation: "Over 350 million tons of plastics are produced annually - showing the massive scale of the petrochemical industry."
      }
    ]
  },
  {
    id: "world-of-perfumery",
    title: "The World of Perfumery",
    content: `The perfume industry beautifully illustrates the art and science of organic chemistry. 
      Fragrances are complex mixtures of organic molecules, each contributing to the overall scent.
      
      NATURAL ESSENTIAL OILS:
      • Rose oil contains over 300 different organic molecules!
      • Jasmine absolute contains cis-jasmone (key scent molecule)
      • Sandalwood contains α-santalol (the characteristic scent)
      
      STRUCTURE AND SMELL:
      Molecular structure determines scent:
      • Menthol: The -OH position creates the cooling sensation
      • Vanillin: The aldehyde group gives the sweet, warm smell
      • Citral: Found in lemon grass (lemony scent)
      
      SYNTHETIC vs NATURAL:
      Vanillin was one of the first flavors synthesized (1874). Today, synthetic vanillin 
      far exceeds natural vanilla extract in production because:
      • It's 50 times cheaper
      • More consistent quality
      • More sustainable (no rainforest destruction for vanilla farms)
      
      STEREOCHEMISTRY IN FRAGRANCE:
      Remember enantiomers? They can smell completely different:
      • (+)-carvone smells like caraway
      • (−)-carvone smells like spearmint
      • Same atoms, different handedness, different smell!
      
      Menthol has 8 possible stereoisomers, but only one specific form (−)-menthol gives 
      the intense cooling sensation. Organic chemists synthesize exactly this form!`,
    molecules: [
      { name: "Vanillin", description: "The primary flavor compound in vanilla" },
      { name: "Menthol", description: "The cooling compound from peppermint" },
      { name: "Damascenone", description: "The deep 'essence' of roses - incredibly powerful scent!" }
    ],
    keyPoints: [
      "Rose oil contains 300+ different organic molecules",
      "Molecular structure determines scent characteristics",
      "Synthetic vanillin is cheaper and more sustainable",
      "Enantiomers (carvone) can smell completely different",
      "Only one of menthol's 8 stereoisomers gives cooling"
    ],
    funFact: "Natural vanilla extract requires 600 hand-pollinated orchid flowers to make just 1 kg—synthetic vanillin is 50 times cheaper and chemically identical!",
    realWorldConnection: "Your perfume is a carefully designed mixture that unfolds over time: top notes (first smell), heart notes (main character), and base notes (lasting impression).",
    quickCheck: [
      {
        question: "How many organic molecules does rose oil contain?",
        options: ["About 10", "About 50", "Over 300", "Just 1"],
        correctIndex: 2,
        explanation: "Rose oil contains over 300 different organic molecules! Natural scents are incredibly complex mixtures."
      },
      {
        question: "(+)-carvone smells like caraway. (−)-carvone smells like:",
        options: ["Also caraway", "Spearmint", "Roses", "Nothing"],
        correctIndex: 1,
        explanation: "Same atoms, different handedness, different smell! This shows how important stereochemistry is for biological activity."
      },
      {
        question: "Synthetic vanillin is preferred over natural because:",
        options: ["It smells better", "It's cheaper, consistent, and more sustainable", "Natural vanilla is toxic", "It lasts longer"],
        correctIndex: 1,
        explanation: "Synthetic vanillin is 50 times cheaper, has consistent quality, and doesn't require rainforest destruction for vanilla farms."
      }
    ]
  },
  {
    id: "organic-chemistry-and-medicine",
    title: "Organic Chemistry and Medicine",
    content: `Perhaps nowhere is organic chemistry more important than in medicine. Almost all drugs 
      are organic molecules designed to interact with biological targets in specific ways.
      
      NATURAL COMPOUNDS:
      • Quinine: From cinchona tree bark, first effective malaria treatment
      • Resveratrol: From grape skins, studied for heart health benefits
      • Vitamin C (ascorbic acid): Essential nutrient that prevents scurvy
      
      HISTORIC BREAKTHROUGHS:
      • PENICILLIN: Discovered by Alexander Fleming in 1928, this antibiotic revolutionized medicine.
        The β-lactam ring structure was a puzzle for chemists—its unusual strained four-membered 
        ring is key to its activity. Dorothy Hodgkin determined its structure using X-ray crystallography.
      
      • TAXOL (Paclitaxel): Found in the bark of Pacific yew trees, this anticancer drug has an 
        incredibly complex structure with 11 chiral centers! Its total synthesis by Holton and 
        Nicolaou in 1994 was a triumph of organic chemistry. Today it's made semi-synthetically.
      
      BLOCKBUSTER DRUGS:
      Modern medicine relies on designed organic molecules:
      
      • Atorvastatin (Lipitor): Lowers cholesterol by inhibiting HMG-CoA reductase
        - Once the best-selling drug in history ($12 billion/year at peak)
      
      • Esomeprazole (Nexium): Treats acid reflux by blocking proton pumps
        - The S-enantiomer of omeprazole (stereochemistry matters!)
      
      • Imatinib (Glivec): Targeted cancer therapy for leukemia
        - Designed to fit a specific mutant protein—precision medicine
      
      • Oseltamivir (Tamiflu): Treats influenza by blocking viral enzymes
      
      THE DRUG DISCOVERY PROCESS:
      1. Target identification (find disease-relevant protein)
      2. Lead discovery (find molecules that interact with target)
      3. Lead optimization (improve potency, reduce side effects)
      4. Clinical trials (test safety and efficacy)
      5. Manufacturing scale-up (efficient synthesis)
      
      It takes about 12 years and $2.6 billion to bring a new drug to market. 
      Organic chemistry is essential at every step.`,
    molecules: [
      { name: "Aspirin", description: "Classic pain reliever and anti-inflammatory" },
      { name: "Quinine", description: "Natural malaria treatment from tree bark" },
      { name: "Penicillin G", description: "First antibiotic - note the strained β-lactam ring!" },
      { name: "Taxol", description: "Anticancer drug with 11 chiral centers" },
      { name: "Caffeine", description: "Stimulant found in coffee and tea" },
      { name: "Atorvastatin", description: "Lipitor - the best-selling drug in history ($12B/year)" },
      { name: "Omeprazole", description: "Losec/Prilosec - proton pump inhibitor for stomach ulcers" }
    ],
    keyPoints: [
      "Quinine (from tree bark) was first effective malaria treatment",
      "Lipitor was once the best-selling drug ($12B/year)",
      "Glivec is an example of targeted cancer therapy",
      "Drug development takes ~12 years and $2.6 billion",
      "Organic chemistry is essential at every step"
    ],
    funFact: "The Pfizer-BioNTech COVID-19 vaccine uses mRNA wrapped in lipid nanoparticles—organic chemistry helped save millions of lives during the pandemic!",
    realWorldConnection: "Understanding organic chemistry helps you understand why some drugs have food interactions (e.g., grapefruit with statins) or why timing of doses matters.",
    quickCheck: [
      {
        question: "Penicillin's unusual structure includes:",
        options: ["A 5-membered ring", "A strained 4-membered β-lactam ring", "No rings", "A 6-membered benzene ring"],
        correctIndex: 1,
        explanation: "The β-lactam ring (4-membered) is strained and reactive - key to how penicillin kills bacteria!"
      },
      {
        question: "How long does it typically take to bring a new drug to market?",
        options: ["1-2 years", "5-6 years", "About 12 years", "20+ years"],
        correctIndex: 2,
        explanation: "It takes about 12 years and $2.6 billion to develop a new drug - from target discovery through clinical trials."
      },
      {
        question: "Lipitor (atorvastatin) was once the best-selling drug earning:",
        options: ["$1 million/year", "$100 million/year", "$12 billion/year", "$1 trillion/year"],
        correctIndex: 2,
        explanation: "Lipitor earned $12 billion per year at its peak - showing the massive economic impact of pharmaceutical organic chemistry."
      }
    ]
  },
  {
    id: "what-organic-chemists-do",
    title: "What Do Organic Chemists Do?",
    content: `Organic chemists work in many different ways, but their core activities fall into four main categories.
      
      SYNTHESIS - Making Molecules:
      The art of building organic molecules from simpler starting materials. Synthetic chemists design 
      step-by-step routes to construct complex structures. The synthesis of Taxol from simple chemicals 
      was once considered impossible—now it's routine! Synthesis is like molecular architecture.
      
      ANALYSIS - Determining Structure:
      When you discover a new natural product or synthesize a new compound, you need to know its 
      structure. Organic chemists use powerful techniques:
      • NMR Spectroscopy: "Seeing" individual atoms
      • Mass Spectrometry: Weighing molecules precisely  
      • X-ray Crystallography: Taking 3D "photographs" of molecules
      
      MECHANISM - Understanding Reactions:
      Why does a reaction happen? What is the pathway from starting materials to products? 
      Understanding mechanism allows us to:
      • Predict what products will form
      • Design better synthetic routes
      • Avoid unwanted side reactions
      
      This book uses CURLY ARROWS to show how electrons move during reactions—a powerful 
      tool you'll master!
      
      DISCOVERY - Finding New Molecules:
      Whether from natural sources (plants, fungi, marine organisms) or designed in the lab, 
      discovering new molecules with useful properties is at the heart of organic chemistry.
      
      LOOKING FORWARD:
      • Chapters 2-4: You'll learn how to determine molecular structure
      • Chapter 5: You'll master curly arrows and understand mechanism
      • Chapter 6: Your first real reaction—nucleophilic addition to carbonyls!`,
    keyPoints: [
      "Synthesis: building complex molecules step-by-step",
      "Analysis: determining structure using NMR, MS, X-ray",
      "Mechanism: understanding WHY reactions happen",
      "Discovery: finding new useful molecules",
      "Curly arrows show electron movement in reactions"
    ],
    funFact: "Dorothy Hodgkin used X-ray crystallography to determine the structures of penicillin, vitamin B12, and insulin. She won the Nobel Prize in 1964!",
    realWorldConnection: "Every drug you take was first synthesized by organic chemists, its structure determined by analytical chemists, and its mechanism studied to ensure safety and efficacy.",
    quickCheck: [
      {
        question: "The four main activities of organic chemists are:",
        options: ["Mining, refining, selling, marketing", "Synthesis, analysis, mechanism, discovery", "Reading, writing, testing, publishing", "Mixing, heating, cooling, filtering"],
        correctIndex: 1,
        explanation: "Organic chemists synthesize (make), analyze (determine structure), understand mechanism (how reactions work), and discover new molecules."
      },
      {
        question: "Which technique allows chemists to 'see' individual atoms in a molecule?",
        options: ["Microscopy", "NMR Spectroscopy", "Photography", "Weighing"],
        correctIndex: 1,
        explanation: "NMR (Nuclear Magnetic Resonance) spectroscopy lets chemists 'see' how atoms are connected in a molecule."
      },
      {
        question: "Curly arrows in organic chemistry show:",
        options: ["Molecular weight", "How electrons move during reactions", "Temperature changes", "Physical movement of molecules"],
        correctIndex: 1,
        explanation: "Curly arrows show electron movement - a powerful tool you'll master to understand and predict organic reactions!"
      }
    ]
  }
];
