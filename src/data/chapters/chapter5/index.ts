import { ChapterData } from '../../types';
import { metadata } from './metadata';
import { introduction, sections } from './content';
import { quiz } from './quiz';
import { flashcards, glossary, miniQuizzes } from './activities';

export const chapter5: ChapterData = {
    ...metadata,
    introduction,
    sections,
    quiz,
    flashcards,
    glossary,
    miniQuizzes
};
