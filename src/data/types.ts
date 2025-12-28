export interface ChapterSection {
    id: string;
    title: string;
    content: string;
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
        type: 'skeletal' | 'functional-group' | 'amino-acid' | 'oxidation' | 'wedge-dash' | 'abbreviations';
        props: Record<string, unknown>;
        caption?: string;
    }[];
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
