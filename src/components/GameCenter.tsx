'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import { getChapterGameData, filterByDifficulty, SortItem, SpeedQuestion, FillBlank, SortingSet } from '@/data/gameData';

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

type GameType = 'matching' | 'memory' | 'sorting' | 'speed' | 'fillblanks';
type Difficulty = 'easy' | 'medium' | 'hard' | 'all';

interface GameCenterProps {
    pairs: MatchPair[];
    title?: string;
    chapterId?: number;
}

const difficultyColors = {
    easy: '#22c55e',
    medium: '#f59e0b',
    hard: '#ef4444',
    all: '#8b5cf6'
};

const difficultyLabels = {
    easy: '🟢 Easy',
    medium: '🟡 Medium',
    hard: '🔴 Hard',
    all: '🎯 All Levels'
};

export default function GameCenter({ pairs, title = 'Chemistry Games', chapterId = 1 }: GameCenterProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedGame, setSelectedGame] = useState<GameType | null>(null);
    const [difficulty, setDifficulty] = useState<Difficulty>('all');
    const [gameScore, setGameScore] = useState(0);
    const [gameComplete, setGameComplete] = useState(false);

    // Get chapter-specific data
    const gameData = getChapterGameData(chapterId);

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
    const [sortSetTitle, setSortSetTitle] = useState('');
    const [sortingChecked, setSortingChecked] = useState(false);
    const [sortingCorrect, setSortingCorrect] = useState(false);

    // Speed Quiz State
    const [speedQuestions, setSpeedQuestions] = useState<SpeedQuestion[]>([]);
    const [currentSpeedQ, setCurrentSpeedQ] = useState(0);
    const [speedTimer, setSpeedTimer] = useState(10);
    const [speedAnswered, setSpeedAnswered] = useState<number | null>(null);

    // Fill Blanks State
    const [fillBlanksData, setFillBlanksData] = useState<FillBlank[]>([]);
    const [fillBlankIndex, setFillBlankIndex] = useState(0);
    const [fillBlankAnswer, setFillBlankAnswer] = useState<string | null>(null);
    const [fillBlankChecked, setFillBlankChecked] = useState(false);

    // Initialize games with difficulty filter
    const initMatchingGame = useCallback(() => {
        const gamePairs = pairs.length > 0 ? [...pairs].sort(() => Math.random() - 0.5).slice(0, 6) : [];
        setMatchingPairs(gamePairs);
        setSelectedTerm(null);
        setMatchedPairs(new Set());
        setGameScore(0);
        setGameComplete(false);
        setWrongMatch(null);
    }, [pairs]);

    const initMemoryGame = useCallback(() => {
        const gamePairs = pairs.length > 0 ? [...pairs].sort(() => Math.random() - 0.5).slice(0, 4) : [];
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
        const filtered = filterByDifficulty(gameData.sortingSets, difficulty);
        if (filtered.length === 0) return;
        const set = filtered[Math.floor(Math.random() * filtered.length)];
        setSortSetTitle(set.title);
        setSortItems([...set.items].sort(() => Math.random() - 0.5));
        setSortingChecked(false);
        setSortingCorrect(false);
        setGameScore(0);
        setGameComplete(false);
    }, [gameData, difficulty]);

    const initSpeedQuiz = useCallback(() => {
        const filtered = filterByDifficulty(gameData.speedQuestions, difficulty);
        const questions = [...filtered].sort(() => Math.random() - 0.5).slice(0, 5);
        setSpeedQuestions(questions);
        setCurrentSpeedQ(0);
        setSpeedTimer(difficulty === 'hard' ? 8 : difficulty === 'medium' ? 10 : 12);
        setSpeedAnswered(null);
        setGameScore(0);
        setGameComplete(false);
    }, [gameData, difficulty]);

    const initFillBlanks = useCallback(() => {
        const filtered = filterByDifficulty(gameData.fillBlanks, difficulty);
        setFillBlanksData([...filtered].sort(() => Math.random() - 0.5));
        setFillBlankIndex(0);
        setFillBlankAnswer(null);
        setFillBlankChecked(false);
        setGameScore(0);
        setGameComplete(false);
    }, [gameData, difficulty]);

    // Speed timer effect
    useEffect(() => {
        if (selectedGame === 'speed' && !gameComplete && speedAnswered === null && speedQuestions.length > 0) {
            const timer = setInterval(() => {
                setSpeedTimer(prev => {
                    if (prev <= 1) {
                        handleSpeedTimeout();
                        return difficulty === 'hard' ? 8 : difficulty === 'medium' ? 10 : 12;
                    }
                    return prev - 1;
                });
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [selectedGame, gameComplete, currentSpeedQ, speedAnswered, speedQuestions.length, difficulty]);

    // Game handlers
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
            if (matchedPairs.size + 1 === matchingPairs.length) setGameComplete(true);
        } else {
            setWrongMatch(pair.id);
            setGameScore(prev => Math.max(0, prev - 25));
            setTimeout(() => setWrongMatch(null), 600);
        }
    };

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
                    setMemoryCards(prev => prev.map(c => c.pairId === first.pairId ? { ...c, isMatched: true } : c));
                    setFlippedCards([]);
                    setGameScore(prev => prev + 150);
                    if (memoryCards.filter(c => !c.isMatched).length === 2) setGameComplete(true);
                }, 500);
            } else {
                setTimeout(() => setFlippedCards([]), 1000);
            }
        }
    };

    const checkSortOrder = () => {
        const isCorrect = sortItems.every((item, index) => item.correctOrder === index);
        setSortingChecked(true);
        setSortingCorrect(isCorrect);
        if (isCorrect) {
            const bonus = difficulty === 'hard' ? 300 : difficulty === 'medium' ? 200 : 100;
            setGameScore(prev => prev + bonus);
            setTimeout(() => setGameComplete(true), 1500);
        }
    };

    const handleSpeedAnswer = (answerIndex: number) => {
        if (speedAnswered !== null) return;
        setSpeedAnswered(answerIndex);
        const isCorrect = speedQuestions[currentSpeedQ]?.correctIndex === answerIndex;
        if (isCorrect) {
            const multiplier = difficulty === 'hard' ? 15 : difficulty === 'medium' ? 12 : 10;
            setGameScore(prev => prev + speedTimer * multiplier);
        }
        setTimeout(() => {
            if (currentSpeedQ + 1 >= speedQuestions.length) {
                setGameComplete(true);
            } else {
                setCurrentSpeedQ(prev => prev + 1);
                setSpeedTimer(difficulty === 'hard' ? 8 : difficulty === 'medium' ? 10 : 12);
                setSpeedAnswered(null);
            }
        }, 1000);
    };

    const handleSpeedTimeout = () => {
        if (currentSpeedQ + 1 >= speedQuestions.length) {
            setGameComplete(true);
        } else {
            setCurrentSpeedQ(prev => prev + 1);
            setSpeedTimer(difficulty === 'hard' ? 8 : difficulty === 'medium' ? 10 : 12);
            setSpeedAnswered(null);
        }
    };

    const handleFillBlankAnswer = (answer: string) => {
        if (fillBlanksData.length === 0) return;
        setFillBlankAnswer(answer);
        setFillBlankChecked(true);
        if (fillBlanksData[fillBlankIndex]?.answer === answer) {
            const bonus = difficulty === 'hard' ? 150 : difficulty === 'medium' ? 120 : 100;
            setGameScore(prev => prev + bonus);
        }
        setTimeout(() => {
            if (fillBlankIndex + 1 >= fillBlanksData.length) {
                setGameComplete(true);
            } else {
                setFillBlankIndex(prev => prev + 1);
                setFillBlankAnswer(null);
                setFillBlankChecked(false);
            }
        }, 1200);
    };

    const startGame = (game: GameType) => {
        setSelectedGame(game);
        if (game === 'matching') initMatchingGame();
        else if (game === 'memory') initMemoryGame();
        else if (game === 'sorting') initSortingGame();
        else if (game === 'speed') initSpeedQuiz();
        else if (game === 'fillblanks') initFillBlanks();
    };

    const games = [
        { type: 'matching' as GameType, icon: '🔗', title: 'Match Pairs', desc: 'Terms → Definitions', color: '#8b5cf6' },
        { type: 'memory' as GameType, icon: '🧠', title: 'Memory', desc: 'Find matching cards', color: '#10b981' },
        { type: 'sorting' as GameType, icon: '📊', title: 'Sort It Out', desc: 'Order items correctly', color: '#f59e0b' },
        { type: 'speed' as GameType, icon: '⚡', title: 'Speed Quiz', desc: 'Beat the clock!', color: '#ef4444' },
        { type: 'fillblanks' as GameType, icon: '✏️', title: 'Fill Blanks', desc: 'Complete sentences', color: '#06b6d4' },
    ];

    if (!isOpen) {
        return (
            <motion.button
                onClick={() => setIsOpen(true)}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.03 }}
                style={{
                    display: 'flex', alignItems: 'center', gap: '12px', padding: '16px 24px',
                    background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)', border: 'none',
                    borderRadius: '16px', color: 'white', fontSize: '1rem', fontWeight: 600,
                    cursor: 'pointer', width: '100%', justifyContent: 'center',
                }}
            >
                <span style={{ fontSize: '1.5rem' }}>🎮</span>
                Play Chapter {chapterId} Games
            </motion.button>
        );
    }

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                style={{
                    position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(10px)',
                    zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px',
                }}
                onClick={(e) => e.target === e.currentTarget && (setIsOpen(false), setSelectedGame(null))}
            >
                <motion.div
                    initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}
                    style={{
                        width: '100%', maxWidth: '850px', maxHeight: '90vh',
                        background: 'rgba(25,25,40,0.98)', border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '24px', overflow: 'hidden', display: 'flex', flexDirection: 'column',
                    }}
                >
                    {/* Header */}
                    <div style={{
                        padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.1)',
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            {selectedGame && (
                                <button onClick={() => { setSelectedGame(null); setGameComplete(false); }}
                                    style={{
                                        width: '32px', height: '32px', border: 'none', borderRadius: '8px',
                                        background: 'rgba(255,255,255,0.1)', color: '#c4c4d0', cursor: 'pointer', fontSize: '1rem'
                                    }}>←</button>
                            )}
                            <h2 style={{ margin: 0, color: 'white', fontSize: '1.1rem' }}>
                                🎮 Ch.{chapterId} {selectedGame ? `- ${games.find(g => g.type === selectedGame)?.title}` : 'Games'}
                            </h2>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            {selectedGame && <span style={{ color: '#f59e0b', fontWeight: 700 }}>⭐ {gameScore}</span>}
                            <button onClick={() => { setIsOpen(false); setSelectedGame(null); }}
                                style={{
                                    width: '32px', height: '32px', border: 'none', borderRadius: '8px',
                                    background: 'rgba(255,255,255,0.1)', color: '#c4c4d0', cursor: 'pointer'
                                }}>✕</button>
                        </div>
                    </div>

                    {/* Content */}
                    <div style={{ flex: 1, overflow: 'auto', padding: '20px' }}>
                        <AnimatePresence mode="wait">
                            {!selectedGame ? (
                                <motion.div key="menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                    {/* Difficulty Selector */}
                                    <div style={{ marginBottom: '20px' }}>
                                        <p style={{ color: '#888', fontSize: '0.85rem', marginBottom: '10px' }}>Select Difficulty:</p>
                                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                            {(['easy', 'medium', 'hard', 'all'] as Difficulty[]).map(d => (
                                                <button key={d} onClick={() => setDifficulty(d)}
                                                    style={{
                                                        padding: '8px 16px', border: `2px solid ${difficultyColors[d]}`,
                                                        borderRadius: '10px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600,
                                                        background: difficulty === d ? difficultyColors[d] : 'transparent',
                                                        color: difficulty === d ? 'white' : difficultyColors[d],
                                                    }}>
                                                    {difficultyLabels[d]}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    {/* Game Grid */}
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px' }}>
                                        {games.map((g, i) => (
                                            <motion.button key={g.type} onClick={() => startGame(g.type)}
                                                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                                                whileHover={{ scale: 1.03, y: -3 }}
                                                style={{
                                                    background: `linear-gradient(135deg, ${g.color}20, rgba(30,30,46,0.8))`,
                                                    border: `1px solid ${g.color}40`, borderRadius: '16px', padding: '20px 16px',
                                                    cursor: 'pointer', textAlign: 'left',
                                                }}>
                                                <span style={{ fontSize: '2rem', display: 'block', marginBottom: '8px' }}>{g.icon}</span>
                                                <h4 style={{ margin: '0 0 4px', color: 'white', fontSize: '0.95rem' }}>{g.title}</h4>
                                                <p style={{ margin: 0, color: '#888', fontSize: '0.75rem' }}>{g.desc}</p>
                                            </motion.button>
                                        ))}
                                    </div>
                                </motion.div>
                            ) : gameComplete ? (
                                <motion.div key="complete" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                                    style={{ textAlign: 'center', padding: '40px 20px' }}>
                                    <div style={{ fontSize: '4rem', marginBottom: '16px' }}>🎉</div>
                                    <h3 style={{ color: '#10b981', fontSize: '1.5rem', marginBottom: '8px' }}>Complete!</h3>
                                    <p style={{ color: '#c4c4d0', fontSize: '1.1rem' }}>Score: <strong style={{ color: '#f59e0b' }}>{gameScore}</strong></p>
                                    <p style={{ color: '#888', fontSize: '0.85rem', marginBottom: '24px' }}>Difficulty: {difficultyLabels[difficulty]}</p>
                                    <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
                                        <button onClick={() => startGame(selectedGame)}
                                            style={{
                                                padding: '10px 20px', border: 'none', borderRadius: '10px',
                                                background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)', color: 'white', fontWeight: 600, cursor: 'pointer'
                                            }}>
                                            🔄 Again
                                        </button>
                                        <button onClick={() => { setSelectedGame(null); setGameComplete(false); }}
                                            style={{
                                                padding: '10px 20px', border: 'none', borderRadius: '10px',
                                                background: 'rgba(255,255,255,0.1)', color: '#c4c4d0', fontWeight: 600, cursor: 'pointer'
                                            }}>
                                            📋 Menu
                                        </button>
                                    </div>
                                </motion.div>
                            ) : selectedGame === 'matching' ? (
                                <MatchingGame pairs={matchingPairs} selectedTerm={selectedTerm} matchedPairs={matchedPairs}
                                    wrongMatch={wrongMatch} onTermClick={handleTermClick} onDefClick={handleDefinitionClick} />
                            ) : selectedGame === 'memory' ? (
                                <MemoryGame cards={memoryCards} flippedCards={flippedCards} moves={memoryMoves} onCardClick={handleCardClick} />
                            ) : selectedGame === 'sorting' ? (
                                <SortingGame items={sortItems} setItems={setSortItems} title={sortSetTitle}
                                    checked={sortingChecked} correct={sortingCorrect} onCheck={checkSortOrder} onReset={initSortingGame} />
                            ) : selectedGame === 'speed' ? (
                                <SpeedQuizGame questions={speedQuestions} current={currentSpeedQ} timer={speedTimer}
                                    answered={speedAnswered} onAnswer={handleSpeedAnswer} difficulty={difficulty} />
                            ) : selectedGame === 'fillblanks' && fillBlanksData.length > 0 ? (
                                <FillBlanksGame data={fillBlanksData} index={fillBlankIndex} answer={fillBlankAnswer}
                                    checked={fillBlankChecked} onAnswer={handleFillBlankAnswer} />
                            ) : null}
                        </AnimatePresence>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}

// Sub-components
function MatchingGame({ pairs, selectedTerm, matchedPairs, wrongMatch, onTermClick, onDefClick }: any) {
    return (
        <div>
            <p style={{ color: '#888', textAlign: 'center', marginBottom: '16px', fontSize: '0.85rem' }}>Click term, then definition</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <h4 style={{ color: '#8b5cf6', margin: 0, fontSize: '0.8rem' }}>Terms</h4>
                    {pairs.map((p: any) => (
                        <button key={p.id} onClick={() => onTermClick(p.id)}
                            style={{
                                padding: '12px', borderRadius: '10px', border: `2px solid ${matchedPairs.has(p.id) ? '#10b981' : selectedTerm === p.id ? '#8b5cf6' : 'rgba(255,255,255,0.1)'}`,
                                background: matchedPairs.has(p.id) ? 'rgba(16,185,129,0.2)' : selectedTerm === p.id ? 'rgba(139,92,246,0.2)' : 'rgba(255,255,255,0.05)',
                                color: matchedPairs.has(p.id) ? '#10b981' : 'white', fontSize: '0.85rem', fontWeight: 500, textAlign: 'left', cursor: matchedPairs.has(p.id) ? 'default' : 'pointer'
                            }}>
                            {matchedPairs.has(p.id) && '✓ '}{p.term}
                        </button>
                    ))}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <h4 style={{ color: '#10b981', margin: 0, fontSize: '0.8rem' }}>Definitions</h4>
                    {[...pairs].sort((a: any, b: any) => a.definition.localeCompare(b.definition)).map((p: any) => (
                        <motion.button key={`d-${p.id}`} onClick={() => onDefClick(p)}
                            animate={wrongMatch === p.id ? { x: [0, -8, 8, -8, 0] } : {}}
                            style={{
                                padding: '12px', borderRadius: '10px', border: `2px solid ${matchedPairs.has(p.id) ? '#10b981' : wrongMatch === p.id ? '#ef4444' : 'rgba(255,255,255,0.1)'}`,
                                background: matchedPairs.has(p.id) ? 'rgba(16,185,129,0.2)' : wrongMatch === p.id ? 'rgba(239,68,68,0.2)' : 'rgba(255,255,255,0.05)',
                                color: matchedPairs.has(p.id) ? '#10b981' : wrongMatch === p.id ? '#ef4444' : '#ccc', fontSize: '0.8rem', textAlign: 'left', cursor: matchedPairs.has(p.id) ? 'default' : 'pointer'
                            }}>
                            {matchedPairs.has(p.id) && '✓ '}{p.definition}
                        </motion.button>
                    ))}
                </div>
            </div>
            <p style={{ textAlign: 'center', color: '#666', fontSize: '0.8rem', marginTop: '16px' }}>Matched: {matchedPairs.size}/{pairs.length}</p>
        </div>
    );
}

function MemoryGame({ cards, flippedCards, moves, onCardClick }: any) {
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                <p style={{ color: '#888', margin: 0, fontSize: '0.85rem' }}>Find matching pairs</p>
                <span style={{ color: '#666', fontSize: '0.8rem' }}>Moves: {moves}</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
                {cards.map((c: any, i: number) => (
                    <motion.button key={c.id} onClick={() => onCardClick(c.id)}
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                        style={{
                            aspectRatio: '1', padding: '10px', borderRadius: '12px',
                            border: `2px solid ${c.isMatched ? '#10b981' : flippedCards.includes(c.id) ? '#8b5cf6' : 'rgba(255,255,255,0.1)'}`,
                            background: c.isMatched ? 'rgba(16,185,129,0.2)' : flippedCards.includes(c.id) ? 'rgba(139,92,246,0.2)' : 'rgba(255,255,255,0.05)',
                            color: c.isMatched ? '#10b981' : 'white', fontSize: '0.7rem', cursor: c.isMatched ? 'default' : 'pointer',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center'
                        }}>
                        {(flippedCards.includes(c.id) || c.isMatched) ? c.content : '❓'}
                    </motion.button>
                ))}
            </div>
        </div>
    );
}

function SortingGame({ items, setItems, title, checked, correct, onCheck, onReset }: any) {
    return (
        <div>
            <h4 style={{ color: '#f59e0b', textAlign: 'center', margin: '0 0 8px' }}>{title}</h4>
            <p style={{ color: '#888', textAlign: 'center', fontSize: '0.85rem', marginBottom: '16px' }}>Drag to reorder</p>
            <Reorder.Group axis="y" values={items} onReorder={setItems}
                style={{ listStyle: 'none', padding: 0, margin: '0 auto', maxWidth: '380px' }}>
                {items.map((item: any, idx: number) => (
                    <Reorder.Item key={item.id} value={item}
                        style={{
                            padding: '14px 16px', marginBottom: '8px', borderRadius: '10px',
                            background: checked ? (item.correctOrder === idx ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)') : 'rgba(255,255,255,0.08)',
                            border: `2px solid ${checked ? (item.correctOrder === idx ? '#10b981' : '#ef4444') : 'rgba(255,255,255,0.15)'}`,
                            color: 'white', fontSize: '0.9rem', cursor: checked ? 'default' : 'grab',
                            display: 'flex', alignItems: 'center', gap: '10px'
                        }}>
                        <span style={{
                            width: '24px', height: '24px', borderRadius: '6px',
                            background: checked ? (item.correctOrder === idx ? '#10b981' : '#ef4444') : '#f59e0b',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700
                        }}>{checked ? (item.correctOrder === idx ? '✓' : '✗') : idx + 1}</span>
                        {item.text}
                    </Reorder.Item>
                ))}
            </Reorder.Group>
            {!checked ? (
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <button onClick={onCheck}
                        style={{
                            padding: '12px 28px', background: 'linear-gradient(135deg,#f59e0b,#d97706)', border: 'none',
                            borderRadius: '10px', color: 'white', fontWeight: 600, cursor: 'pointer'
                        }}>✅ Check</button>
                </div>
            ) : (
                <div style={{ textAlign: 'center', marginTop: '16px' }}>
                    <p style={{ color: correct ? '#10b981' : '#ef4444', fontWeight: 600 }}>{correct ? '🎉 Perfect!' : '❌ Try again'}</p>
                    {!correct && <button onClick={onReset} style={{
                        marginTop: '8px', padding: '8px 20px', background: 'rgba(255,255,255,0.1)',
                        border: 'none', borderRadius: '8px', color: '#ccc', cursor: 'pointer'
                    }}>🔄 Retry</button>}
                </div>
            )}
        </div>
    );
}

function SpeedQuizGame({ questions, current, timer, answered, onAnswer, difficulty }: any) {
    const q = questions[current];
    if (!q) return null;
    const maxTime = difficulty === 'hard' ? 8 : difficulty === 'medium' ? 10 : 12;
    return (
        <div>
            <div style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ color: '#ef4444', fontWeight: 600 }}>⏱️ {timer}s</span>
                    <span style={{ color: '#666', fontSize: '0.85rem' }}>{current + 1}/{questions.length}</span>
                </div>
                <div style={{ height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                    <motion.div animate={{ width: `${(timer / maxTime) * 100}%` }}
                        style={{ height: '100%', background: timer > 5 ? '#10b981' : timer > 2 ? '#f59e0b' : '#ef4444', borderRadius: '3px' }} />
                </div>
            </div>
            <h3 style={{ color: 'white', fontSize: '1.1rem', textAlign: 'center', marginBottom: '20px' }}>{q.question}</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', maxWidth: '450px', margin: '0 auto' }}>
                {q.options.map((opt: string, i: number) => (
                    <motion.button key={i} onClick={() => onAnswer(i)} whileHover={{ scale: answered === null ? 1.02 : 1 }}
                        style={{
                            padding: '14px', borderRadius: '10px',
                            background: answered === null ? 'rgba(255,255,255,0.08)' : i === q.correctIndex ? 'rgba(16,185,129,0.3)' : answered === i ? 'rgba(239,68,68,0.3)' : 'rgba(255,255,255,0.05)',
                            border: `2px solid ${answered === null ? 'rgba(255,255,255,0.15)' : i === q.correctIndex ? '#10b981' : answered === i ? '#ef4444' : 'rgba(255,255,255,0.1)'}`,
                            color: 'white', fontSize: '0.95rem', cursor: answered === null ? 'pointer' : 'default'
                        }}>{opt}</motion.button>
                ))}
            </div>
        </div>
    );
}

function FillBlanksGame({ data, index, answer, checked, onAnswer }: any) {
    const q = data[index];
    if (!q) return null;
    return (
        <div>
            <p style={{ color: '#666', textAlign: 'center', fontSize: '0.85rem', marginBottom: '8px' }}>{index + 1}/{data.length}</p>
            <div style={{ background: 'rgba(6,182,212,0.1)', border: '2px solid rgba(6,182,212,0.3)', borderRadius: '14px', padding: '28px', textAlign: 'center', marginBottom: '20px' }}>
                <p style={{ color: 'white', fontSize: '1.1rem', margin: 0, lineHeight: 1.6 }}>
                    {q.sentence.split('___').map((part: string, i: number, arr: string[]) => (
                        <span key={i}>
                            {part}
                            {i < arr.length - 1 && (
                                <span style={{
                                    display: 'inline-block', minWidth: '70px', padding: '3px 14px', margin: '0 6px',
                                    background: checked ? (answer === q.answer ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)') : 'rgba(255,255,255,0.2)',
                                    borderRadius: '6px', borderBottom: '3px solid #06b6d4'
                                }}>{answer || '____'}</span>
                            )}
                        </span>
                    ))}
                </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', maxWidth: '350px', margin: '0 auto' }}>
                {q.options.map((opt: string, i: number) => (
                    <motion.button key={i} onClick={() => !checked && onAnswer(opt)} whileHover={{ scale: !checked ? 1.02 : 1 }}
                        style={{
                            padding: '14px', borderRadius: '10px',
                            background: checked ? (opt === q.answer ? 'rgba(16,185,129,0.3)' : answer === opt ? 'rgba(239,68,68,0.3)' : 'rgba(255,255,255,0.05)') : 'rgba(255,255,255,0.08)',
                            border: `2px solid ${checked ? (opt === q.answer ? '#10b981' : answer === opt ? '#ef4444' : 'rgba(255,255,255,0.1)') : 'rgba(255,255,255,0.15)'}`,
                            color: 'white', fontSize: '0.95rem', cursor: checked ? 'default' : 'pointer'
                        }}>{opt}</motion.button>
                ))}
            </div>
        </div>
    );
}
