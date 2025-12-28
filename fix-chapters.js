const fs = require('fs');
const path = require('path');

for (let ch = 4; ch <= 43; ch++) {
    const dir = path.join('src/data/chapters', 'chapter' + ch);

    fs.writeFileSync(path.join(dir, 'metadata.ts'), `export const metadata = {
    id: ${ch},
    title: 'Chapter ${ch}',
    subtitle: 'Coming soon',
    estimatedTime: 45,
    learningObjectives: ['Coming soon']
};
`);

    fs.writeFileSync(path.join(dir, 'content.ts'), `import { ChapterSection } from '../../types';

export const introduction = 'This chapter is coming soon!';

export const sections: ChapterSection[] = [
    { id: 'intro', title: 'Introduction', content: '<p>Coming soon!</p>' },
];
`);

    fs.writeFileSync(path.join(dir, 'quiz.ts'), `import { ChapterQuiz } from '../../types';

export const quiz: ChapterQuiz[] = [];
`);

    fs.writeFileSync(path.join(dir, 'activities.ts'), `import { FlashcardData, GlossaryTerm, MiniQuizData } from '../../types';

export const flashcards: FlashcardData[] = [];
export const glossary: GlossaryTerm[] = [];
export const miniQuizzes: MiniQuizData[] = [];
`);

    fs.writeFileSync(path.join(dir, 'molecules.ts'), `import { MoleculeRegistry } from '../../moleculeTypes';

export const chapter${ch}Molecules: MoleculeRegistry = {};
`);

    fs.writeFileSync(path.join(dir, 'index.ts'), `export { metadata } from './metadata';
export { introduction, sections } from './content';
export { quiz } from './quiz';
export { flashcards, glossary, miniQuizzes } from './activities';
export { chapter${ch}Molecules } from './molecules';
`);

    console.log('Done: chapter' + ch);
}
console.log('All chapters completed!');
