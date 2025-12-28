# 🧪 Organic Chemistry Viz

An interactive, visual learning platform for Organic Chemistry, structured according to the **Clayden Modular Architecture**. This project makes complex organic chemistry concepts accessible through 3D molecular visualizations, interactive quizzes, and structured learning paths.

[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black)](https://clayden-organic-chemistry.vercel.app)

---

## 📖 Table of Contents

- [Overview](#overview)
- [Clayden Modular Architecture](#-clayden-modular-architecture)
- [Project Structure](#-project-structure)
- [Chapter File Structure](#-chapter-file-structure)
- [Molecule Registry System](#-molecule-registry-system)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Adding New Content](#-adding-new-content)
- [Contributing](#-contributing)

---

## Overview

This project is designed to scale to **40+ chapters**, following the structure of the classic textbook **"Organic Chemistry"** by Clayden, Greeves, and Warren. Each chapter is a self-contained module with standardized files for content, quizzes, activities, and 3D molecule data.

---

## 📚 Clayden Modular Architecture

The architecture is designed for **scalability** and **maintainability**:

- **Self-contained chapters**: Each chapter has its own folder with all necessary files.
- **Centralized molecule registry**: 3D molecule data is aggregated from chapter-specific files.
- **Type-safe data**: TypeScript interfaces ensure consistency across all content.
- **Progressive disclosure**: Chapters can be marked as unavailable until content is ready.

---

## 🗂️ Project Structure

```
organic-chemistry-viz/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx            # Home page
│   │   └── chapter/[id]/       # Dynamic chapter pages
│   │
│   ├── components/             # React components
│   │   ├── MoleculeViewer.tsx  # 3D molecule visualization
│   │   ├── MoleculeComparisonTable.tsx
│   │   ├── Quiz.tsx            # Quiz component
│   │   └── ...
│   │
│   └── data/                   # All chapter data
│       ├── types.ts            # TypeScript interfaces for chapters
│       ├── moleculeTypes.ts    # TypeScript interfaces for molecules
│       ├── moleculeRegistry.ts # Central molecule aggregator
│       │
│       └── chapters/           # Chapter modules (40+ chapters)
│           ├── index.ts        # Chapter registry
│           ├── chapter1/       # Chapter 1 module
│           ├── chapter2/       # Chapter 2 module
│           ├── chapter3/       # Chapter 3 module (template)
│           └── ...             # Chapters 4-43
│
├── public/                     # Static assets
└── package.json
```

---

## 📁 Chapter File Structure

Each chapter directory (`src/data/chapters/chapterN/`) contains **6 standardized files**:

| File | Purpose |
|------|---------|
| `index.ts` | Main entry point, exports all chapter data |
| `metadata.ts` | Chapter ID, title, description, difficulty, availability |
| `content.ts` | Core textual content divided into sections |
| `quiz.ts` | End-of-chapter quiz questions |
| `activities.ts` | Interactive elements (Flashcards, Glossary, Mini-Quizzes) |
| `molecules.ts` | 3D molecule definitions for visualization |

### Example: Chapter 1 Structure
```
chapter1/
├── index.ts          # Exports all chapter1 data
├── metadata.ts       # { id: 1, title: "What is Organic Chemistry?", ... }
├── content.ts        # ContentSection[] with HTML content
├── quiz.ts           # QuizQuestion[] for end-of-chapter assessment
├── activities.ts     # Activity[] (Flashcards, Glossary terms)
└── molecules.ts      # MoleculeRegistry (serotonin, caffeine, benzene, ...)
```

---

## 🧬 Molecule Registry System

Molecule data is **separated from the UI** for better organization:

### Architecture
```
src/data/
├── moleculeTypes.ts      # MoleculeData interface, MoleculeRegistry type
├── moleculeRegistry.ts   # Aggregates molecules from ALL chapters
└── chapters/
    ├── chapter1/molecules.ts   # chapter1Molecules (serotonin, caffeine, ...)
    ├── chapter2/molecules.ts   # chapter2Molecules (ethane, ethanol, ...)
    └── chapter3/molecules.ts   # chapter3Molecules (empty template)
```

### How it Works
1. Each chapter defines its own `chapterNMolecules` object
2. `moleculeRegistry.ts` imports and merges all chapter molecules
3. Components use `getMolecule(name)` to fetch molecule data

### Adding a New Molecule
```typescript
// In src/data/chapters/chapter5/molecules.ts
export const chapter5Molecules: MoleculeRegistry = {
    'myMolecule': {
        color: '#8b5cf6',
        emoji: '🔬',
        formula: 'C₆H₆',
        skeletal: 'Description of structure',
        functionalGroups: ['Aromatic ring'],
        pubchemCid: 241,
        pdb: `COMPND    MYMOLECULE
ATOM      1  C1  MOL     1       0.000   0.000   0.000  1.00  0.00           C
...
END`
    },
};
```

Then add to the registry:
```typescript
// In src/data/moleculeRegistry.ts
import { chapter5Molecules } from './chapters/chapter5/molecules';

export const moleculeRegistry: MoleculeRegistry = {
    ...chapter1Molecules,
    ...chapter2Molecules,
    ...chapter5Molecules,  // Add new chapter
};
```

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 14** | React framework (App Router) |
| **TypeScript** | Type-safe development |
| **Tailwind CSS** | Utility-first styling |
| **Framer Motion** | Animations and transitions |
| **3Dmol.js** | 3D molecular visualization |
| **Vercel** | Deployment platform |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/Dana1234587/clayden-organic-chemistry.git
cd organic-chemistry-viz

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production
```bash
npm run build
npm start
```

---

## ➕ Adding New Content

### Adding a New Chapter

1. **Create the chapter directory:**
   ```bash
   mkdir src/data/chapters/chapterN
   ```

2. **Create the 6 required files** (use existing chapters as templates):
   - `metadata.ts` - Chapter info
   - `content.ts` - Section content
   - `quiz.ts` - Quiz questions
   - `activities.ts` - Interactive elements
   - `molecules.ts` - 3D molecule data
   - `index.ts` - Export aggregator

3. **Register in the chapter index:**
   ```typescript
   // src/data/chapters/index.ts
   import * as chapter5 from './chapter5';
   
   export const chapters = {
       1: chapter1,
       2: chapter2,
       5: chapter5,  // Add new chapter
   };
   ```

4. **Set `isAvailable: true`** in metadata when content is ready.

### Content Guidelines

Follow the **Clayden Learning Philosophy**:

| Principle | Description |
|-----------|-------------|
| **Structure before Detail** | Teach the framework first, then specifics |
| **Mechanism is Key** | Explain *why* reactions happen (curly arrows) |
| **Visual Logic** | Use 3D models and diagrams over rote memorization |
| **Real-world Connections** | Link concepts to medicines, perfumes, foods |

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-chapter`
3. Follow the chapter file structure strictly
4. Ensure TypeScript types are correct
5. Test locally with `npm run dev`
6. Submit a pull request

---

## 📄 License

MIT License - See [LICENSE](LICENSE) for details.

---

**Made with ❤️ for Organic Chemistry students worldwide**
