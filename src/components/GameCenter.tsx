'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, Reorder } from 'framer-motion';

interface MatchPair {
    id: string;
    term: string;
    definition: string;
}

interface MemoryCard {
    id: string;
    content: string;
    type: 'term' | 'definition';
    pairId: string;
    isFlipped: boolean;
    isMatched: boolean;
}

interface SortItem {
    id: string;
    text: string;
    correctOrder: number;
}

interface SpeedQuizQuestion {
    id: string;
    question: string;
    options: string[];
    correctIndex: number;
}

type GameType = 'matching' | 'memory' | 'sorting' | 'speed' | 'fillblanks';

interface GameCenterProps {
    pairs: MatchPair[];
    title?: string;
}

const ORGANIC_PAIRS: MatchPair[] = [
    { id: '1', term: 'Carbon', definition: 'Element with 4 valence electrons' },
    { id: '2', term: 'Hybridization', definition: 'Mixing of atomic orbitals' },
    { id: '3', term: 'Sigma Bond', definition: 'Head-to-head orbital overlap' },
    { id: '4', term: 'Pi Bond', definition: 'Side-to-side orbital overlap' },
    { id: '5', term: 'Electronegativity', definition: 'Ability to attract electrons' },
    { id: '6', term: 'sp³ Hybrid', definition: 'Tetrahedral geometry (109.5°)' },
    { id: '7', term: 'sp² Hybrid', definition: 'Trigonal planar geometry (120°)' },
    { id: '8', term: 'sp Hybrid', definition: 'Linear geometry (180°)' },
];

// Sorting game data - order matters!
const SORTING_SETS = [
    {
        title: 'Bond Angles (Smallest to Largest)',
        items: [
            { id: 's1', text: 'H₂O (104.5°)', correctOrder: 0 },
            { id: 's2', text: 'NH₃ (107°)', correctOrder: 1 },
            { id: 's3', text: 'CH₄ (109.5°)', correctOrder: 2 },
            { id: 's4', text: 'BF₃ (120°)', correctOrder: 3 },
            { id: 's5', text: 'CO₂ (180°)', correctOrder: 4 },
        ]
    },
    {
        title: 'Electronegativity (Lowest to Highest)',
        items: [
            { id: 'e1', text: 'Carbon (2.5)', correctOrder: 0 },
            { id: 'e2', text: 'Nitrogen (3.0)', correctOrder: 1 },
            { id: 'e3', text: 'Chlorine (3.2)', correctOrder: 2 },
            { id: 'e4', text: 'Oxygen (3.5)', correctOrder: 3 },
            { id: 'e5', text: 'Fluorine (4.0)', correctOrder: 4 },
        ]
    },
    {
        title: 'Bond Strength (Weakest to Strongest)',
        items: [
            { id: 'b1', text: 'Van der Waals', correctOrder: 0 },
            { id: 'b2', text: 'Hydrogen Bond', correctOrder: 1 },
            { id: 'b3', text: 'Ionic Bond', correctOrder: 2 },
            { id: 'b4', text: 'Covalent Bond', correctOrder: 3 },
        ]
    },
];

// Speed quiz questions
const SPEED_QUESTIONS: SpeedQuizQuestion[] = [
    { id: 'q1', question: 'What is the bond angle in methane (CH₄)?', options: ['90°', '107°', '109.5°', '120°'], correctIndex: 2 },
    { id: 'q2', question: 'sp² hybridization gives which geometry?', options: ['Linear', 'Tetrahedral', 'Trigonal Planar', 'Bent'], correctIndex: 2 },
    { id: 'q3', question: 'How many sigma bonds in a triple bond?', options: ['0', '1', '2', '3'], correctIndex: 1 },
    { id: 'q4', question: 'What is the shape of water (H₂O)?', options: ['Linear', 'Bent', 'Trigonal', 'Tetrahedral'], correctIndex: 1 },
    { id: 'q5', question: 'Which element is most electronegative?', options: ['Oxygen', 'Carbon', 'Fluorine', 'Nitrogen'], correctIndex: 2 },
    { id: 'q6', question: 'Pi bonds form from which orbital overlap?', options: ['Head-on', 'Side-by-side', 's-s', 's-p'], correctIndex: 1 },
    { id: 'q7', question: 'Bond order of N₂?', options: ['1', '2', '3', '4'], correctIndex: 2 },
    { id: 'q8', question: 'Lone pairs occupy more space than bonding pairs?', options: ['True', 'False', 'Sometimes', 'Never'], correctIndex: 0 },
];

// Fill in blanks
const FILL_BLANKS = [
    { sentence: 'Carbon has ___ valence electrons.', answer: '4', options: ['2', '4', '6', '8'] },
    { sentence: 'A double bond consists of 1 sigma and ___ pi bond(s).', answer: '1', options: ['0', '1', '2', '3'] },
    { sentence: 'sp³ hybridization creates ___ degree bond angles.', answer: '109.5', options: ['90', '109.5', '120', '180'] },
    { sentence: 'The molecular shape of NH₃ is trigonal ___.', answer: 'pyramidal', options: ['planar', 'pyramidal', 'linear', 'bipyramidal'] },
    { sentence: 'Rotation is restricted around ___ bonds.', answer: 'double', options: ['single', 'double', 'ionic', 'hydrogen'] },
];

export default function GameCenter({ pairs = ORGANIC_PAIRS, title = 'Chemistry Games' }: GameCenterProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedGame, setSelectedGame] = useState<GameType | null>(null);
    const [gameScore, setGameScore] = useState(0);
    const [gameComplete, setGameComplete] = useState(false);

    // Matching Game State
    const [matchingPairs, setMatchingPairs] = useState<MatchPair[]>([]);
    const [selectedTerm, setSelectedTerm] = useState<string | null>(null);
    const [matchedPairs, setMatchedPairs] = useState<Set<string>>(new Set());
    const [wrongMatch, setWrongMatch] = useState<string | null>(null);

    // Memory Game State
    const [memoryCards, setMemoryCards] = useState<MemoryCard[]>([]);
    const [flippedCards, setFlippedCards] = useState<string[]>([]);
    const [memoryMoves, setMemoryMoves] = useState(0);

    // Sorting Game State
    const [sortItems, setSortItems] = useState<SortItem[]>([]);
    const [currentSortSet, setCurrentSortSet] = useState(0);
    const [sortingChecked, setSortingChecked] = useState(false);
    const [sortingCorrect, setSortingCorrect] = useState(false);

    // Speed Quiz State
    const [speedQuestions, setSpeedQuestions] = useState<SpeedQuizQuestion[]>([]);
    const [currentSpeedQ, setCurrentSpeedQ] = useState(0);
    const [speedTimer, setSpeedTimer] = useState(10);
    const [speedAnswered, setSpeedAnswered] = useState<number | null>(null);

    // Fill Blanks State
    const [fillBlankIndex, setFillBlankIndex] = useState(0);
    const [fillBlankAnswer, setFillBlankAnswer] = useState<string | null>(null);
    const [fillBlankChecked, setFillBlankChecked] = useState(false);

    // Initialize games
    const initMatchingGame = useCallback(() => {
        setMatchingPairs([...pairs].sort(() => Math.random() - 0.5).slice(0, 6));
        setSelectedTerm(null);
        setMatchedPairs(new Set());
        setGameScore(0);
        setGameComplete(false);
        setWrongMatch(null);
    }, [pairs]);

    const initMemoryGame = useCallback(() => {
        const gamePairs = [...pairs].sort(() => Math.random() - 0.5).slice(0, 4);
        const cards: MemoryCard[] = [];
        gamePairs.forEach(pair => {
            cards.push({ id: `${pair.id}-t`, content: pair.term, type: 'term', pairId: pair.id, isFlipped: false, isMatched: false });
            cards.push({ id: `${pair.id}-d`, content: pair.definition, type: 'definition', pairId: pair.id, isFlipped: false, isMatched: false });
        });
        setMemoryCards(cards.sort(() => Math.random() - 0.5));
        setFlippedCards([]);
        setMemoryMoves(0);
        setGameScore(0);
        setGameComplete(false);
    }, [pairs]);

    const initSortingGame = useCallback(() => {
        const setIndex = Math.floor(Math.random() * SORTING_SETS.length);
        setCurrentSortSet(setIndex);
        const items = [...SORTING_SETS[setIndex].items].sort(() => Math.random() - 0.5);
        setSortItems(items);
        setSortingChecked(false);
        setSortingCorrect(false);
        setGameScore(0);
        setGameComplete(false);
    }, []);

    const initSpeedQuiz = useCallback(() => {
        const questions = [...SPEED_QUESTIONS].sort(() => Math.random() - 0.5).slice(0, 5);
        setSpeedQuestions(questions);
        setCurrentSpeedQ(0);
        setSpeedTimer(10);
        setSpeedAnswered(null);
        setGameScore(0);
        setGameComplete(false);
    }, []);

    const initFillBlanks = useCallback(() => {
        setFillBlankIndex(0);
        setFillBlankAnswer(null);
        setFillBlankChecked(false);
        setGameScore(0);
        setGameComplete(false);
    }, []);

    // Speed timer effect
    useEffect(() => {
        if (selectedGame === 'speed' && !gameComplete && speedAnswered === null) {
            const timer = setInterval(() => {
                setSpeedTimer(prev => {
                    if (prev <= 1) {
                        handleSpeedTimeout();
                        return 10;
                    }
                    return prev - 1;
                });
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [selectedGame, gameComplete, currentSpeedQ, speedAnswered]);

    // Matching Game Logic
    const handleTermClick = (termId: string) => {
        if (matchedPairs.has(termId)) return;
        setSelectedTerm(termId);
        setWrongMatch(null);
    };

    const handleDefinitionClick = (pair: MatchPair) => {
        if (!selectedTerm || matchedPairs.has(pair.id)) return;

        if (selectedTerm === pair.id) {
            setMatchedPairs(prev => new Set(prev).add(pair.id));
            setGameScore(prev => prev + 100);
            setSelectedTerm(null);

            if (matchedPairs.size + 1 === matchingPairs.length) {
                setGameComplete(true);
            }
        } else {
            setWrongMatch(pair.id);
            setGameScore(prev => Math.max(0, prev - 25));
            setTimeout(() => setWrongMatch(null), 600);
        }
    };

    // Memory Game Logic
    const handleCardClick = (cardId: string) => {
        if (flippedCards.length === 2) return;

        const card = memoryCards.find(c => c.id === cardId);
        if (!card || card.isMatched || flippedCards.includes(cardId)) return;

        const newFlipped = [...flippedCards, cardId];
        setFlippedCards(newFlipped);
        setMemoryMoves(prev => prev + 1);

        if (newFlipped.length === 2) {
            const [first, second] = newFlipped.map(id => memoryCards.find(c => c.id === id)!);

            if (first.pairId === second.pairId) {
                setTimeout(() => {
                    setMemoryCards(prev => prev.map(c =>
                        c.pairId === first.pairId ? { ...c, isMatched: true } : c
                    ));
                    setFlippedCards([]);
                    setGameScore(prev => prev + 150);

                    const allMatched = memoryCards.filter(c => !c.isMatched).length === 2;
                    if (allMatched) setGameComplete(true);
                }, 500);
            } else {
                setTimeout(() => setFlippedCards([]), 1000);
            }
        }
    };

    // Sorting Game Logic
    const checkSortOrder = () => {
        const isCorrect = sortItems.every((item, index) => item.correctOrder === index);
        setSortingChecked(true);
        setSortingCorrect(isCorrect);
        if (isCorrect) {
            setGameScore(prev => prev + 200);
            setTimeout(() => setGameComplete(true), 1500);
        }
    };

    // Speed Quiz Logic
    const handleSpeedAnswer = (answerIndex: number) => {
        if (speedAnswered !== null) return;
        setSpeedAnswered(answerIndex);

        const isCorrect = speedQuestions[currentSpeedQ].correctIndex === answerIndex;
        if (isCorrect) {
            setGameScore(prev => prev + speedTimer * 10); // Bonus for speed!
        }

        setTimeout(() => {
            if (currentSpeedQ + 1 >= speedQuestions.length) {
                setGameComplete(true);
            } else {
                setCurrentSpeedQ(prev => prev + 1);
                setSpeedTimer(10);
                setSpeedAnswered(null);
            }
        }, 1000);
    };

    const handleSpeedTimeout = () => {
        if (currentSpeedQ + 1 >= speedQuestions.length) {
            setGameComplete(true);
        } else {
            setCurrentSpeedQ(prev => prev + 1);
            setSpeedTimer(10);
            setSpeedAnswered(null);
        }
    };

    // Fill Blanks Logic
    const handleFillBlankAnswer = (answer: string) => {
        setFillBlankAnswer(answer);
        setFillBlankChecked(true);

        const isCorrect = FILL_BLANKS[fillBlankIndex].answer === answer;
        if (isCorrect) {
            setGameScore(prev => prev + 100);
        }

        setTimeout(() => {
            if (fillBlankIndex + 1 >= FILL_BLANKS.length) {
                setGameComplete(true);
            } else {
                setFillBlankIndex(prev => prev + 1);
                setFillBlankAnswer(null);
                setFillBlankChecked(false);
            }
        }, 1200);
    };

    // Start game
    const startGame = (game: GameType) => {
        setSelectedGame(game);
        if (game === 'matching') initMatchingGame();
        else if (game === 'memory') initMemoryGame();
        else if (game === 'sorting') initSortingGame();
        else if (game === 'speed') initSpeedQuiz();
        else if (game === 'fillblanks') initFillBlanks();
    };

    const games = [
        { type: 'matching' as GameType, icon: '🔗', title: 'Match the Pairs', description: 'Connect terms with their definitions', color: '#8b5cf6' },
        { type: 'memory' as GameType, icon: '🧠', title: 'Memory Challenge', description: 'Find matching pairs by memory', color: '#10b981' },
        { type: 'sorting' as GameType, icon: '📊', title: 'Sort It Out', description: 'Arrange items in correct order', color: '#f59e0b' },
        { type: 'speed' as GameType, icon: '⚡', title: 'Speed Quiz', description: 'Answer fast for bonus points!', color: '#ef4444' },
        { type: 'fillblanks' as GameType, icon: '✏️', title: 'Fill the Blank', description: 'Complete the sentence', color: '#06b6d4' },
    ];

    if (!isOpen) {
        return (
            <motion.button
                onClick={() => setIsOpen(true)}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '16px 24px',
                    background: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)',
                    border: 'none',
                    borderRadius: '16px',
                    color: 'white',
                    fontSize: '1rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    boxShadow: '0 8px 30px rgba(139, 92, 246, 0.3)',
                    width: '100%',
                    justifyContent: 'center',
                }}
            >
                <span style={{ fontSize: '1.5rem' }}>🎮</span>
                Play Learning Games
            </motion.button>
        );
    }

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                    position: 'fixed',
                    inset: 0,
                    background: 'rgba(0, 0, 0, 0.85)',
                    backdropFilter: 'blur(10px)',
                    zIndex: 1000,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '20px',
                }}
                onClick={(e) => {
                    if (e.target === e.currentTarget) {
                        setIsOpen(false);
                        setSelectedGame(null);
                    }
                }}
            >
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 50, scale: 0.9 }}
                    style={{
                        width: '100%',
                        maxWidth: '900px',
                        maxHeight: '90vh',
                        background: 'rgba(30, 30, 46, 0.98)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '24px',
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    {/* Header */}
                    <div style={{
                        padding: '20px 24px',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            {selectedGame && (
                                <button
                                    onClick={() => { setSelectedGame(null); setGameComplete(false); }}
                                    style={{
                                        width: '36px', height: '36px', border: 'none', borderRadius: '10px',
                                        background: 'rgba(255, 255, 255, 0.1)', color: '#c4c4d0', cursor: 'pointer',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem'
                                    }}
                                >←</button>
                            )}
                            <h2 style={{ margin: 0, color: '#f4f4f7', fontSize: '1.3rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <span>🎮</span>
                                {selectedGame ? games.find(g => g.type === selectedGame)?.title : 'Game Center'}
                            </h2>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            {selectedGame && (
                                <span style={{ color: '#f59e0b', fontWeight: 700, fontSize: '1.1rem' }}>
                                    ⭐ {gameScore} pts
                                </span>
                            )}
                            <button
                                onClick={() => { setIsOpen(false); setSelectedGame(null); }}
                                style={{
                                    width: '36px', height: '36px', border: 'none', borderRadius: '10px',
                                    background: 'rgba(255, 255, 255, 0.1)', color: '#c4c4d0', cursor: 'pointer', fontSize: '1.1rem'
                                }}
                            >✕</button>
                        </div>
                    </div>

                    {/* Content */}
                    <div style={{ flex: 1, overflow: 'auto', padding: '24px' }}>
                        <AnimatePresence mode="wait">
                            {!selectedGame ? (
                                <motion.div
                                    key="games-list"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}
                                >
                                    {games.map((game, index) => (
                                        <motion.button
                                            key={game.type}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.08 }}
                                            whileHover={{ scale: 1.03, y: -5 }}
                                            onClick={() => startGame(game.type)}
                                            style={{
                                                background: `linear-gradient(135deg, ${game.color}20 0%, rgba(30, 30, 46, 0.8) 100%)`,
                                                border: `1px solid ${game.color}40`,
                                                borderRadius: '20px',
                                                padding: '24px 20px',
                                                cursor: 'pointer',
                                                textAlign: 'left',
                                            }}
                                        >
                                            <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '12px' }}>{game.icon}</span>
                                            <h3 style={{ margin: '0 0 6px', color: '#f4f4f7', fontSize: '1rem' }}>{game.title}</h3>
                                            <p style={{ margin: 0, color: '#9898a8', fontSize: '0.8rem' }}>{game.description}</p>
                                        </motion.button>
                                    ))}
                                </motion.div>
                            ) : gameComplete ? (
                                <motion.div
                                    key="complete"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    style={{ textAlign: 'center', padding: '40px 20px' }}
                                >
                                    <div style={{ fontSize: '5rem', marginBottom: '20px' }}>🎉</div>
                                    <h3 style={{ color: '#10b981', fontSize: '1.8rem', marginBottom: '12px' }}>Excellent!</h3>
                                    <p style={{ color: '#c4c4d0', fontSize: '1.1rem', marginBottom: '8px' }}>
                                        Final Score: <strong style={{ color: '#f59e0b' }}>{gameScore} points</strong>
                                    </p>
                                    {selectedGame === 'memory' && (
                                        <p style={{ color: '#9898a8', marginBottom: '24px' }}>Completed in {memoryMoves} moves</p>
                                    )}
                                    <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                                        <button
                                            onClick={() => startGame(selectedGame)}
                                            style={{
                                                padding: '12px 24px', border: 'none', borderRadius: '12px',
                                                background: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)',
                                                color: 'white', fontSize: '0.95rem', fontWeight: 600, cursor: 'pointer'
                                            }}
                                        >🔄 Play Again</button>
                                        <button
                                            onClick={() => { setSelectedGame(null); setGameComplete(false); }}
                                            style={{
                                                padding: '12px 24px', border: 'none', borderRadius: '12px',
                                                background: 'rgba(255,255,255,0.1)', color: '#c4c4d0',
                                                fontSize: '0.95rem', fontWeight: 600, cursor: 'pointer'
                                            }}
                                        >📋 More Games</button>
                                    </div>
                                </motion.div>
                            ) : selectedGame === 'matching' ? (
                                <motion.div key="matching" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                    <p style={{ color: '#9898a8', marginBottom: '20px', textAlign: 'center' }}>
                                        Click a term, then click its matching definition
                                    </p>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                                        {/* Terms Column */}
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                            <h4 style={{ color: '#8b5cf6', margin: '0 0 8px', fontSize: '0.9rem' }}>📝 Terms</h4>
                                            {matchingPairs.map(pair => (
                                                <motion.button
                                                    key={pair.id}
                                                    onClick={() => handleTermClick(pair.id)}
                                                    whileHover={{ scale: matchedPairs.has(pair.id) ? 1 : 1.02 }}
                                                    style={{
                                                        padding: '14px 18px',
                                                        background: matchedPairs.has(pair.id) ? 'rgba(16, 185, 129, 0.2)' : selectedTerm === pair.id ? 'rgba(139, 92, 246, 0.3)' : 'rgba(255,255,255,0.05)',
                                                        border: `2px solid ${matchedPairs.has(pair.id) ? '#10b981' : selectedTerm === pair.id ? '#8b5cf6' : 'rgba(255,255,255,0.1)'}`,
                                                        borderRadius: '12px',
                                                        color: matchedPairs.has(pair.id) ? '#10b981' : '#f4f4f7',
                                                        fontSize: '0.95rem',
                                                        fontWeight: 600,
                                                        cursor: matchedPairs.has(pair.id) ? 'default' : 'pointer',
                                                        textAlign: 'left',
                                                        textDecoration: matchedPairs.has(pair.id) ? 'line-through' : 'none',
                                                        opacity: matchedPairs.has(pair.id) ? 0.6 : 1,
                                                    }}
                                                >
                                                    {matchedPairs.has(pair.id) && <span style={{ marginRight: '8px' }}>✓</span>}
                                                    {pair.term}
                                                </motion.button>
                                            ))}
                                        </div>
                                        {/* Definitions Column */}
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                            <h4 style={{ color: '#10b981', margin: '0 0 8px', fontSize: '0.9rem' }}>📖 Definitions</h4>
                                            {[...matchingPairs].sort((a, b) => a.definition.localeCompare(b.definition)).map(pair => (
                                                <motion.button
                                                    key={`def-${pair.id}`}
                                                    onClick={() => handleDefinitionClick(pair)}
                                                    animate={wrongMatch === pair.id ? { x: [0, -10, 10, -10, 10, 0] } : {}}
                                                    style={{
                                                        padding: '14px 18px',
                                                        background: matchedPairs.has(pair.id) ? 'rgba(16, 185, 129, 0.2)' : wrongMatch === pair.id ? 'rgba(239, 68, 68, 0.2)' : 'rgba(255,255,255,0.05)',
                                                        border: `2px solid ${matchedPairs.has(pair.id) ? '#10b981' : wrongMatch === pair.id ? '#ef4444' : 'rgba(255,255,255,0.1)'}`,
                                                        borderRadius: '12px',
                                                        color: matchedPairs.has(pair.id) ? '#10b981' : wrongMatch === pair.id ? '#ef4444' : '#c4c4d0',
                                                        fontSize: '0.85rem',
                                                        cursor: matchedPairs.has(pair.id) ? 'default' : 'pointer',
                                                        textAlign: 'left',
                                                        opacity: matchedPairs.has(pair.id) ? 0.6 : 1,
                                                    }}
                                                >
                                                    {matchedPairs.has(pair.id) && <span style={{ marginRight: '8px' }}>✓</span>}
                                                    {pair.definition}
                                                </motion.button>
                                            ))}
                                        </div>
                                    </div>
                                    <div style={{ marginTop: '20px', textAlign: 'center', color: '#6b6b7b', fontSize: '0.85rem' }}>
                                        Matched: {matchedPairs.size} / {matchingPairs.length}
                                    </div>
                                </motion.div>
                            ) : selectedGame === 'memory' ? (
                                <motion.div key="memory" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                                        <p style={{ color: '#9898a8', margin: 0 }}>Find matching term-definition pairs</p>
                                        <span style={{ color: '#6b6b7b', fontSize: '0.85rem' }}>Moves: {memoryMoves}</span>
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
                                        {memoryCards.map((card, index) => (
                                            <motion.button
                                                key={card.id}
                                                onClick={() => handleCardClick(card.id)}
                                                initial={{ opacity: 0, rotateY: 180 }}
                                                animate={{
                                                    opacity: 1,
                                                    rotateY: flippedCards.includes(card.id) || card.isMatched ? 0 : 180,
                                                    scale: card.isMatched ? 0.95 : 1,
                                                }}
                                                transition={{ delay: index * 0.05 }}
                                                style={{
                                                    aspectRatio: '1',
                                                    padding: '12px',
                                                    background: card.isMatched ? 'rgba(16, 185, 129, 0.2)' : flippedCards.includes(card.id) ? (card.type === 'term' ? 'rgba(139, 92, 246, 0.2)' : 'rgba(16, 185, 129, 0.15)') : 'rgba(255,255,255,0.05)',
                                                    border: `2px solid ${card.isMatched ? '#10b981' : flippedCards.includes(card.id) ? (card.type === 'term' ? '#8b5cf6' : '#10b981') : 'rgba(255,255,255,0.1)'}`,
                                                    borderRadius: '14px',
                                                    cursor: card.isMatched ? 'default' : 'pointer',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    textAlign: 'center',
                                                    fontSize: '0.75rem',
                                                    color: card.isMatched ? '#10b981' : '#f4f4f7',
                                                    fontWeight: card.type === 'term' ? 600 : 400,
                                                }}
                                            >
                                                {(flippedCards.includes(card.id) || card.isMatched) ? card.content : '❓'}
                                            </motion.button>
                                        ))}
                                    </div>
                                </motion.div>
                            ) : selectedGame === 'sorting' ? (
                                <motion.div key="sorting" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                    <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                                        <h4 style={{ color: '#f59e0b', margin: '0 0 8px' }}>{SORTING_SETS[currentSortSet].title}</h4>
                                        <p style={{ color: '#9898a8', margin: 0, fontSize: '0.9rem' }}>
                                            Drag items to arrange them in the correct order
                                        </p>
                                    </div>
                                    <Reorder.Group
                                        axis="y"
                                        values={sortItems}
                                        onReorder={setSortItems}
                                        style={{ listStyle: 'none', padding: 0, margin: 0, maxWidth: '400px', marginInline: 'auto' }}
                                    >
                                        {sortItems.map((item, index) => (
                                            <Reorder.Item
                                                key={item.id}
                                                value={item}
                                                style={{
                                                    padding: '16px 20px',
                                                    marginBottom: '10px',
                                                    background: sortingChecked
                                                        ? item.correctOrder === index
                                                            ? 'rgba(16, 185, 129, 0.2)'
                                                            : 'rgba(239, 68, 68, 0.2)'
                                                        : 'rgba(255,255,255,0.08)',
                                                    border: sortingChecked
                                                        ? `2px solid ${item.correctOrder === index ? '#10b981' : '#ef4444'}`
                                                        : '2px solid rgba(255,255,255,0.15)',
                                                    borderRadius: '12px',
                                                    color: '#f4f4f7',
                                                    fontSize: '1rem',
                                                    fontWeight: 500,
                                                    cursor: sortingChecked ? 'default' : 'grab',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '12px',
                                                }}
                                            >
                                                <span style={{
                                                    width: '28px',
                                                    height: '28px',
                                                    borderRadius: '8px',
                                                    background: sortingChecked
                                                        ? item.correctOrder === index ? '#10b981' : '#ef4444'
                                                        : '#f59e0b',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    fontSize: '0.85rem',
                                                    fontWeight: 700,
                                                }}>
                                                    {sortingChecked ? (item.correctOrder === index ? '✓' : '✗') : index + 1}
                                                </span>
                                                {item.text}
                                            </Reorder.Item>
                                        ))}
                                    </Reorder.Group>
                                    {!sortingChecked ? (
                                        <div style={{ textAlign: 'center', marginTop: '24px' }}>
                                            <button
                                                onClick={checkSortOrder}
                                                style={{
                                                    padding: '14px 32px',
                                                    background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                                                    border: 'none',
                                                    borderRadius: '12px',
                                                    color: 'white',
                                                    fontSize: '1rem',
                                                    fontWeight: 600,
                                                    cursor: 'pointer',
                                                }}
                                            >
                                                ✅ Check Order
                                            </button>
                                        </div>
                                    ) : (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            style={{ textAlign: 'center', marginTop: '20px' }}
                                        >
                                            <p style={{
                                                color: sortingCorrect ? '#10b981' : '#ef4444',
                                                fontSize: '1.1rem',
                                                fontWeight: 600,
                                            }}>
                                                {sortingCorrect ? '🎉 Perfect! +200 points' : '❌ Not quite right. Try again!'}
                                            </p>
                                            {!sortingCorrect && (
                                                <button
                                                    onClick={initSortingGame}
                                                    style={{
                                                        marginTop: '12px',
                                                        padding: '10px 24px',
                                                        background: 'rgba(255,255,255,0.1)',
                                                        border: 'none',
                                                        borderRadius: '10px',
                                                        color: '#c4c4d0',
                                                        cursor: 'pointer',
                                                    }}
                                                >
                                                    🔄 Try Again
                                                </button>
                                            )}
                                        </motion.div>
                                    )}
                                </motion.div>
                            ) : selectedGame === 'speed' ? (
                                <motion.div key="speed" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                    {/* Timer bar */}
                                    <div style={{ marginBottom: '20px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                            <span style={{ color: '#ef4444', fontWeight: 600 }}>⏱️ {speedTimer}s</span>
                                            <span style={{ color: '#6b6b7b' }}>Question {currentSpeedQ + 1}/{speedQuestions.length}</span>
                                        </div>
                                        <div style={{ height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                                            <motion.div
                                                animate={{ width: `${(speedTimer / 10) * 100}%` }}
                                                style={{
                                                    height: '100%',
                                                    background: speedTimer > 5 ? '#10b981' : speedTimer > 2 ? '#f59e0b' : '#ef4444',
                                                    borderRadius: '4px',
                                                }}
                                            />
                                        </div>
                                    </div>

                                    {speedQuestions[currentSpeedQ] && (
                                        <>
                                            <h3 style={{ color: '#f4f4f7', fontSize: '1.3rem', textAlign: 'center', marginBottom: '24px' }}>
                                                {speedQuestions[currentSpeedQ].question}
                                            </h3>
                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', maxWidth: '500px', margin: '0 auto' }}>
                                                {speedQuestions[currentSpeedQ].options.map((option, idx) => (
                                                    <motion.button
                                                        key={idx}
                                                        onClick={() => handleSpeedAnswer(idx)}
                                                        whileHover={{ scale: speedAnswered === null ? 1.03 : 1 }}
                                                        style={{
                                                            padding: '18px',
                                                            background: speedAnswered === null
                                                                ? 'rgba(255,255,255,0.08)'
                                                                : idx === speedQuestions[currentSpeedQ].correctIndex
                                                                    ? 'rgba(16, 185, 129, 0.3)'
                                                                    : speedAnswered === idx
                                                                        ? 'rgba(239, 68, 68, 0.3)'
                                                                        : 'rgba(255,255,255,0.05)',
                                                            border: `2px solid ${speedAnswered === null
                                                                    ? 'rgba(255,255,255,0.15)'
                                                                    : idx === speedQuestions[currentSpeedQ].correctIndex
                                                                        ? '#10b981'
                                                                        : speedAnswered === idx
                                                                            ? '#ef4444'
                                                                            : 'rgba(255,255,255,0.1)'
                                                                }`,
                                                            borderRadius: '12px',
                                                            color: '#f4f4f7',
                                                            fontSize: '1rem',
                                                            fontWeight: 500,
                                                            cursor: speedAnswered === null ? 'pointer' : 'default',
                                                        }}
                                                    >
                                                        {option}
                                                    </motion.button>
                                                ))}
                                            </div>
                                        </>
                                    )}
                                </motion.div>
                            ) : selectedGame === 'fillblanks' ? (
                                <motion.div key="fillblanks" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                    <div style={{ textAlign: 'center', marginBottom: '8px' }}>
                                        <span style={{ color: '#6b6b7b', fontSize: '0.85rem' }}>
                                            Question {fillBlankIndex + 1}/{FILL_BLANKS.length}
                                        </span>
                                    </div>

                                    <div style={{
                                        background: 'rgba(6, 182, 212, 0.1)',
                                        border: '2px solid rgba(6, 182, 212, 0.3)',
                                        borderRadius: '16px',
                                        padding: '32px',
                                        textAlign: 'center',
                                        marginBottom: '24px',
                                    }}>
                                        <p style={{ color: '#f4f4f7', fontSize: '1.3rem', margin: 0, lineHeight: 1.6 }}>
                                            {FILL_BLANKS[fillBlankIndex].sentence.split('___').map((part, i, arr) => (
                                                <span key={i}>
                                                    {part}
                                                    {i < arr.length - 1 && (
                                                        <span style={{
                                                            display: 'inline-block',
                                                            minWidth: '80px',
                                                            padding: '4px 16px',
                                                            margin: '0 8px',
                                                            background: fillBlankChecked
                                                                ? fillBlankAnswer === FILL_BLANKS[fillBlankIndex].answer
                                                                    ? 'rgba(16, 185, 129, 0.3)'
                                                                    : 'rgba(239, 68, 68, 0.3)'
                                                                : 'rgba(255,255,255,0.2)',
                                                            borderRadius: '8px',
                                                            borderBottom: '3px solid #06b6d4',
                                                        }}>
                                                            {fillBlankAnswer || '____'}
                                                        </span>
                                                    )}
                                                </span>
                                            ))}
                                        </p>
                                    </div>

                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', maxWidth: '400px', margin: '0 auto' }}>
                                        {FILL_BLANKS[fillBlankIndex].options.map((option, idx) => (
                                            <motion.button
                                                key={idx}
                                                onClick={() => !fillBlankChecked && handleFillBlankAnswer(option)}
                                                whileHover={{ scale: !fillBlankChecked ? 1.03 : 1 }}
                                                style={{
                                                    padding: '16px',
                                                    background: fillBlankChecked
                                                        ? option === FILL_BLANKS[fillBlankIndex].answer
                                                            ? 'rgba(16, 185, 129, 0.3)'
                                                            : fillBlankAnswer === option
                                                                ? 'rgba(239, 68, 68, 0.3)'
                                                                : 'rgba(255,255,255,0.05)'
                                                        : 'rgba(255,255,255,0.08)',
                                                    border: `2px solid ${fillBlankChecked
                                                            ? option === FILL_BLANKS[fillBlankIndex].answer
                                                                ? '#10b981'
                                                                : fillBlankAnswer === option
                                                                    ? '#ef4444'
                                                                    : 'rgba(255,255,255,0.1)'
                                                            : 'rgba(255,255,255,0.15)'
                                                        }`,
                                                    borderRadius: '12px',
                                                    color: '#f4f4f7',
                                                    fontSize: '1rem',
                                                    fontWeight: 500,
                                                    cursor: fillBlankChecked ? 'default' : 'pointer',
                                                }}
                                            >
                                                {option}
                                            </motion.button>
                                        ))}
                                    </div>
                                </motion.div>
                            ) : null}
                        </AnimatePresence>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
