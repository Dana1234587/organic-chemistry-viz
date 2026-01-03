export interface ChapterSection {
    id: string;
    title: string;
    content: string;
    // Video configuration for Bunny Stream or other sources
    video?: {
        type: 'bunny' | 'youtube' | 'mp4' | 'hls';
        url: string;
        duration?: string; // e.g., "5:30"
        thumbnail?: string;
    };
    molecules?: {
        name: string;
        description: string;
    }[];
    keyPoints?: string[];
    funFact?: string;
    commonMistake?: string;
    realWorldConnection?: string;
    // Diagram configuration for inline SVG diagrams
    diagrams?: {
        type: 'skeletal' | 'functional-group' | 'amino-acid' | 'oxidation' | 'wedge-dash' | 'abbreviations' | 'hybridization' | 'polarity';
        props: Record<string, unknown>;
        caption?: string;
    }[];
    // Quick Check questions for instant section review
    quickCheck?: {
        question: string;
        options: string[];
        correctIndex: number;
        explanation: string;
    }[];
    // Interactive simulation for this section
    simulation?: {
        type: 'vision' | 'reaction' | 'drug-docking' | 'magic-bullet' | 'custom';
        title?: string;
        description?: string;
    };
    // Sulfa Drug Discovery flag (Lesson 4 - Synthetic Dyes)
    sulfaDrugDiscovery?: boolean;
    // Learning aids
    examTip?: string;
    plainEnglish?: {
        technical: string;
        simple: string;
    };
    difficulty?: 'fundamental' | 'important' | 'advanced';
    // Drug Discovery section (e.g., Aspirin story, Cisplatin, etc.)
    drugDiscovery?: {
        title: string;
        subtitle?: string;
        story: {
            phase: string;
            title: string;
            year: string;
            content: string;
            molecule?: string;
        }[];
        keyInsight?: string;
        academicReference?: {
            title: string;
            author: string;
            quote?: string;
        };
        interactiveIdeas?: {
            name: string;
            description: string;
        }[];
    };
    // Color examples for "Colors of Organic Chemistry" section
    colorExamples?: {
        name: string;
        description: string;
        color: string;
        type: 'liquid' | 'solid' | 'gas' | 'crystal';
        structure2d?: string; // Image path or SMILES
        pdbId?: string; // For 3D viewer
    }[];
    conjugationDiagram?: boolean;
}

export interface ChapterQuiz {
    id: number;
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
    difficulty?: 'easy' | 'medium' | 'hard';
}

export interface MiniQuizData {
    id: string;
    afterSection: string;
    questions: {
        question: string;
        options: string[];
        correctIndex: number;
        hint: string;
    }[];
}

export interface FlashcardData {
    id: string;
    front: string;
    back: string;
    category?: string;
}

export interface GlossaryTerm {
    id: string;
    term: string;
    definition: string;
    category: string;
    relatedTerms?: string[];
    example?: string;
}

export interface ChapterData {
    id: number;
    title: string;
    subtitle: string;
    introduction: string;
    learningObjectives: string[];
    sections: ChapterSection[];
    miniQuizzes: MiniQuizData[];
    quiz: ChapterQuiz[];
    flashcards: FlashcardData[];
    glossary: GlossaryTerm[];
    estimatedTime: number;
}
