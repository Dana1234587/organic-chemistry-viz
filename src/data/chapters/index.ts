import { ChapterData } from '../types';
import { chapter1 } from './chapter1/index';
import { chapter2 } from './chapter2/index';
import { chapter3 } from './chapter3/index';
import { chapter4 } from './chapter4/index';
import { chapter5 } from './chapter5/index';

// Export individual chapters
export { chapter1, chapter2, chapter3, chapter4, chapter5 };

// Export a map of all chapters for easy lookup
export const chapters: Record<string, ChapterData> = {
    '1': chapter1,
    '2': chapter2,
    '3': chapter3,
    '4': chapter4,
    '5': chapter5,
};

// Export a list of all chapters for iteration (e.g., table of contents)
export const allChapters = [
    chapter1,
    chapter2,
    chapter3,
    chapter4,
    chapter5,
];
