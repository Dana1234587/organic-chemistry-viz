'use client';

import { useState, useCallback, useMemo, useEffect } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';

export interface Flashcard {
    id: string;
    front: string;
    back: string;
    category?: string;
}

interface FlashcardsProps {
    cards: Flashcard[];
    title?: string;
    onComplete?: () => void;
}

export default function Flashcards({ cards, title = "Flashcards", onComplete }: FlashcardsProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [knownCards, setKnownCards] = useState<Set<string>>(new Set());
    const [reviewCards, setReviewCards] = useState<Set<string>>(new Set());
    const [isShuffled, setIsShuffled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [exitDirection, setExitDirection] = useState<'left' | 'right' | null>(null);
    const [dragX, setDragX] = useState(0);

    // Shuffle cards
    const shuffledCards = useMemo(() => {
        if (!isShuffled) return cards;
        return [...cards].sort(() => Math.random() - 0.5);
    }, [cards, isShuffled]);

    const currentCard = shuffledCards[currentIndex];
    const progress = ((currentIndex + 1) / shuffledCards.length) * 100;

    // Reset flip when changing cards
    useEffect(() => {
        setIsFlipped(false);
    }, [currentIndex]);

    const handleFlip = useCallback(() => {
        setIsFlipped(prev => !prev);
    }, []);

    const handleNext = useCallback(() => {
        if (currentIndex < shuffledCards.length - 1) {
            setCurrentIndex(prev => prev + 1);
        } else if (onComplete) {
            onComplete();
        }
    }, [currentIndex, shuffledCards.length, onComplete]);

    const handlePrev = useCallback(() => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
        }
    }, [currentIndex]);

    const markAsKnown = useCallback(() => {
        setExitDirection('right');
        setKnownCards(prev => new Set(prev).add(currentCard.id));
        setReviewCards(prev => {
            const newSet = new Set(prev);
            newSet.delete(currentCard.id);
            return newSet;
        });
        setTimeout(() => {
            handleNext();
            setExitDirection(null);
            setDragX(0);
        }, 300);
    }, [currentCard, handleNext]);

    const markForReview = useCallback(() => {
        setExitDirection('left');
        setReviewCards(prev => new Set(prev).add(currentCard.id));
        setKnownCards(prev => {
            const newSet = new Set(prev);
            newSet.delete(currentCard.id);
            return newSet;
        });
        setTimeout(() => {
            handleNext();
            setExitDirection(null);
            setDragX(0);
        }, 300);
    }, [currentCard, handleNext]);

    const resetProgress = useCallback(() => {
        setCurrentIndex(0);
        setKnownCards(new Set());
        setReviewCards(new Set());
        setIsFlipped(false);
        setExitDirection(null);
        setDragX(0);
    }, []);

    const toggleShuffle = useCallback(() => {
        setIsShuffled(prev => !prev);
        setCurrentIndex(0);
        setIsFlipped(false);
    }, []);

    // Swipe gesture handlers
    const handleDrag = useCallback((event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        setDragX(info.offset.x);
    }, []);

    const handleDragEnd = useCallback((event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        const threshold = 100;
        if (info.offset.x > threshold) {
            markAsKnown();
        } else if (info.offset.x < -threshold) {
            markForReview();
        } else {
            setDragX(0);
        }
    }, [markAsKnown, markForReview]);

    if (!isOpen) {
        return (
            <motion.button
                className="flashcards-toggle-btn"
                onClick={() => setIsOpen(true)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
            >
                <span className="flashcards-icon">🎴</span>
                <span>Practice with Flashcards</span>
                <span className="flashcards-count">{cards.length} cards</span>

                <style jsx>{`
                    .flashcards-toggle-btn {
                        display: flex;
                        align-items: center;
                        gap: 10px;
                        width: 100%;
                        padding: 16px 20px;
                        background: linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%);
                        border: 1px solid rgba(139, 92, 246, 0.3);
                        border-radius: 16px;
                        color: var(--neutral-100);
                        font-size: 1rem;
                        font-weight: 500;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        margin-top: 1.5rem;
                    }

                    .flashcards-toggle-btn:hover {
                        background: linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(168, 85, 247, 0.2) 100%);
                        border-color: rgba(139, 92, 246, 0.5);
                        transform: translateY(-2px);
                        box-shadow: 0 8px 25px rgba(139, 92, 246, 0.2);
                    }

                    .flashcards-icon {
                        font-size: 1.5rem;
                    }

                    .flashcards-count {
                        margin-left: auto;
                        padding: 4px 10px;
                        background: rgba(139, 92, 246, 0.2);
                        border-radius: 12px;
                        font-size: 0.85rem;
                        color: var(--primary-300);
                    }
                `}</style>
            </motion.button>
        );
    }

    return (
        <motion.div
            className="flashcards-container"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
        >
            {/* Header */}
            <div className="flashcards-header">
                <div className="header-left">
                    <h4>{title}</h4>
                    <div className="stats">
                        <span className="stat known">✓ {knownCards.size} Known</span>
                        <span className="stat review">⟳ {reviewCards.size} Review</span>
                    </div>
                </div>
                <div className="header-right">
                    <button
                        className={`shuffle-btn ${isShuffled ? 'active' : ''}`}
                        onClick={toggleShuffle}
                        title={isShuffled ? 'Using shuffled order' : 'Shuffle cards'}
                    >
                        🔀
                    </button>
                    <button className="close-btn" onClick={() => setIsOpen(false)}>✕</button>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="progress-container">
                <div className="progress-bar" style={{ width: `${progress}%` }} />
                <span className="progress-text">{currentIndex + 1} / {shuffledCards.length}</span>
            </div>

            {/* Swipe Indicators */}
            <div className="swipe-indicators">
                <div className={`swipe-indicator left ${dragX < -50 ? 'active' : ''}`}>
                    <span>🔄</span>
                    <span>Need Review</span>
                </div>
                <div className={`swipe-indicator right ${dragX > 50 ? 'active' : ''}`}>
                    <span>✅</span>
                    <span>Got It!</span>
                </div>
            </div>

            {/* Card with 3D Flip and Swipe */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentCard.id}
                    className="card-wrapper"
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.9}
                    onDrag={handleDrag}
                    onDragEnd={handleDragEnd}
                    initial={{ scale: 0.8, opacity: 0, y: 50 }}
                    animate={{
                        scale: 1,
                        opacity: 1,
                        y: 0,
                        x: exitDirection === 'right' ? 400 : exitDirection === 'left' ? -400 : dragX,
                        rotate: exitDirection === 'right' ? 20 : exitDirection === 'left' ? -20 : dragX * 0.05,
                    }}
                    exit={{
                        x: exitDirection === 'right' ? 500 : -500,
                        opacity: 0,
                        rotate: exitDirection === 'right' ? 30 : -30,
                        transition: { duration: 0.3 }
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    style={{ cursor: 'grab' }}
                    whileDrag={{ cursor: 'grabbing' }}
                >
                    <div className={`card-scene ${isFlipped ? 'flipped' : ''}`} onClick={handleFlip}>
                        {/* Front of Card */}
                        <div className="card-face card-front">
                            <div className="card-shine"></div>
                            <div className="card-corner top-left"></div>
                            <div className="card-corner top-right"></div>
                            <div className="card-corner bottom-left"></div>
                            <div className="card-corner bottom-right"></div>

                            {currentCard.category && (
                                <span className="card-category">{currentCard.category}</span>
                            )}
                            <div className="card-number">{currentIndex + 1} / {shuffledCards.length}</div>
                            <div className="card-icon">❓</div>
                            <div className="card-label">QUESTION</div>
                            <div className="card-text">{currentCard.front}</div>
                            <div className="flip-hint">
                                <span>👆 Tap to flip</span>
                                <span className="swipe-hint">👈 👉 Swipe to rate</span>
                            </div>
                        </div>

                        {/* Back of Card */}
                        <div className="card-face card-back">
                            <div className="card-shine"></div>
                            <div className="card-corner top-left"></div>
                            <div className="card-corner top-right"></div>
                            <div className="card-corner bottom-left"></div>
                            <div className="card-corner bottom-right"></div>

                            {currentCard.category && (
                                <span className="card-category back-cat">{currentCard.category}</span>
                            )}
                            <div className="card-number back-num">{currentIndex + 1} / {shuffledCards.length}</div>
                            <div className="card-icon">💡</div>
                            <div className="card-label back-label">ANSWER</div>
                            <div className="card-text">{currentCard.back}</div>
                            <div className="flip-hint">
                                <span>👆 Tap to flip back</span>
                                <span className="swipe-hint">👈 👉 Swipe to rate</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Controls */}
            <div className="controls">
                <div className="nav-controls">
                    <button
                        className="nav-btn"
                        onClick={handlePrev}
                        disabled={currentIndex === 0}
                    >
                        ← Previous
                    </button>
                    <button
                        className="nav-btn"
                        onClick={handleNext}
                        disabled={currentIndex === shuffledCards.length - 1}
                    >
                        Next →
                    </button>
                </div>

                <div className="action-controls">
                    <button
                        className="action-btn review-btn"
                        onClick={markForReview}
                        title="Mark for review"
                    >
                        🔄 Need Review
                    </button>
                    <button
                        className="action-btn known-btn"
                        onClick={markAsKnown}
                        title="Mark as known"
                    >
                        ✅ Got it!
                    </button>
                </div>

                {(knownCards.size > 0 || reviewCards.size > 0) && (
                    <button className="reset-btn" onClick={resetProgress}>
                        Reset Progress
                    </button>
                )}
            </div>

            <style jsx>{`
                .flashcards-container {
                    margin-top: 1.5rem;
                    padding: 1.5rem;
                    background: rgba(30, 30, 46, 0.8);
                    border: 1px solid rgba(139, 92, 246, 0.3);
                    border-radius: 20px;
                    backdrop-filter: blur(10px);
                }

                .flashcards-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    margin-bottom: 1rem;
                }

                .header-left h4 {
                    margin: 0 0 0.5rem;
                    color: var(--neutral-100);
                    font-size: 1.1rem;
                }

                .stats {
                    display: flex;
                    gap: 1rem;
                }

                .stat {
                    font-size: 0.85rem;
                    padding: 4px 10px;
                    border-radius: 8px;
                }

                .stat.known {
                    background: rgba(16, 185, 129, 0.2);
                    color: var(--accent-emerald);
                }

                .stat.review {
                    background: rgba(245, 158, 11, 0.2);
                    color: #f59e0b;
                }

                .header-right {
                    display: flex;
                    gap: 0.5rem;
                }

                .shuffle-btn, .close-btn {
                    width: 36px;
                    height: 36px;
                    border: none;
                    border-radius: 10px;
                    background: rgba(255, 255, 255, 0.1);
                    color: var(--neutral-300);
                    cursor: pointer;
                    font-size: 1rem;
                    transition: all 0.2s ease;
                }

                .shuffle-btn:hover, .close-btn:hover {
                    background: rgba(255, 255, 255, 0.15);
                    color: var(--neutral-100);
                }

                .shuffle-btn.active {
                    background: rgba(139, 92, 246, 0.3);
                    color: var(--primary-300);
                }

                .progress-container {
                    position: relative;
                    height: 6px;
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 3px;
                    margin-bottom: 1.5rem;
                    overflow: hidden;
                }

                .progress-bar {
                    height: 100%;
                    background: linear-gradient(90deg, var(--primary-500), var(--primary-400));
                    border-radius: 3px;
                    transition: width 0.3s ease;
                }

                .progress-text {
                    position: absolute;
                    right: 0;
                    top: 12px;
                    font-size: 0.75rem;
                    color: var(--neutral-400);
                }

                /* Swipe Indicators */
                .swipe-indicators {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 1rem;
                    padding: 0 2rem;
                }

                .swipe-indicator {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 4px;
                    padding: 12px 24px;
                    border-radius: 16px;
                    font-size: 0.8rem;
                    font-weight: 600;
                    opacity: 0.4;
                    transition: all 0.3s ease;
                }

                .swipe-indicator span:first-child {
                    font-size: 1.5rem;
                }

                .swipe-indicator.left {
                    background: rgba(245, 158, 11, 0.1);
                    border: 2px solid rgba(245, 158, 11, 0.2);
                    color: #f59e0b;
                }

                .swipe-indicator.left.active {
                    opacity: 1;
                    background: rgba(245, 158, 11, 0.2);
                    border-color: #f59e0b;
                    transform: scale(1.1);
                    box-shadow: 0 0 30px rgba(245, 158, 11, 0.3);
                }

                .swipe-indicator.right {
                    background: rgba(16, 185, 129, 0.1);
                    border: 2px solid rgba(16, 185, 129, 0.2);
                    color: #10b981;
                }

                .swipe-indicator.right.active {
                    opacity: 1;
                    background: rgba(16, 185, 129, 0.2);
                    border-color: #10b981;
                    transform: scale(1.1);
                    box-shadow: 0 0 30px rgba(16, 185, 129, 0.3);
                }

                /* 3D Card Flip Container - Premium Portrait */
                .card-wrapper {
                    perspective: 1500px;
                    margin: 0 auto 1.5rem auto;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    touch-action: pan-y;
                    width: 100%;
                }

                .card-scene {
                    width: 320px;
                    height: 420px;
                    position: relative;
                    transform-style: preserve-3d;
                    transition: transform 0.7s cubic-bezier(0.4, 0.2, 0.2, 1);
                    cursor: pointer;
                }

                .card-scene.flipped {
                    transform: rotateY(180deg);
                }

                .card-face {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    backface-visibility: hidden;
                    -webkit-backface-visibility: hidden;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 2.5rem 2rem;
                    border-radius: 24px;
                    text-align: center;
                    box-shadow: 
                        0 25px 50px rgba(0, 0, 0, 0.4),
                        0 0 0 1px rgba(255, 255, 255, 0.1) inset;
                    overflow: hidden;
                }

                /* Premium Corner Decorations with Glow */
                .card-corner {
                    position: absolute;
                    width: 35px;
                    height: 35px;
                    border-color: rgba(255, 215, 0, 0.7);
                    border-style: solid;
                    z-index: 5;
                    filter: drop-shadow(0 0 4px rgba(255, 215, 0, 0.5));
                    transition: all 0.3s ease;
                }

                .card-scene:hover .card-corner {
                    border-color: rgba(255, 215, 0, 1);
                    filter: drop-shadow(0 0 10px rgba(255, 215, 0, 0.8));
                }

                .top-left {
                    top: 14px;
                    left: 14px;
                    border-width: 3px 0 0 3px;
                    border-radius: 10px 0 0 0;
                }

                .top-right {
                    top: 14px;
                    right: 14px;
                    border-width: 3px 3px 0 0;
                    border-radius: 0 10px 0 0;
                }

                .bottom-left {
                    bottom: 14px;
                    left: 14px;
                    border-width: 0 0 3px 3px;
                    border-radius: 0 0 0 10px;
                }

                .bottom-right {
                    bottom: 12px;
                    right: 12px;
                    border-width: 0 3px 3px 0;
                    border-radius: 0 0 8px 0;
                }

                /* Holographic Animated Border */
                @keyframes borderGlow {
                    0%, 100% { 
                        border-color: rgba(139, 92, 246, 0.6);
                        box-shadow: 
                            0 0 20px rgba(139, 92, 246, 0.3),
                            0 0 40px rgba(139, 92, 246, 0.1),
                            inset 0 0 60px rgba(139, 92, 246, 0.05);
                    }
                    25% { 
                        border-color: rgba(59, 130, 246, 0.6);
                        box-shadow: 
                            0 0 20px rgba(59, 130, 246, 0.3),
                            0 0 40px rgba(59, 130, 246, 0.1),
                            inset 0 0 60px rgba(59, 130, 246, 0.05);
                    }
                    50% { 
                        border-color: rgba(168, 85, 247, 0.6);
                        box-shadow: 
                            0 0 20px rgba(168, 85, 247, 0.3),
                            0 0 40px rgba(168, 85, 247, 0.1),
                            inset 0 0 60px rgba(168, 85, 247, 0.05);
                    }
                    75% { 
                        border-color: rgba(236, 72, 153, 0.6);
                        box-shadow: 
                            0 0 20px rgba(236, 72, 153, 0.3),
                            0 0 40px rgba(236, 72, 153, 0.1),
                            inset 0 0 60px rgba(236, 72, 153, 0.05);
                    }
                }

                @keyframes floatParticles {
                    0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.3; }
                    50% { transform: translateY(-20px) rotate(180deg); opacity: 0.8; }
                }

                /* Front Face - Question (Holographic Purple) */
                .card-front {
                    background: 
                        radial-gradient(circle at 20% 20%, rgba(139, 92, 246, 0.15) 0%, transparent 40%),
                        radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 40%),
                        radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.05) 0%, transparent 60%),
                        linear-gradient(135deg, #0c0c1a 0%, #12122a 25%, #0a0a18 50%, #151530 75%, #0c0c1a 100%);
                    border: 2px solid rgba(139, 92, 246, 0.5);
                    animation: borderGlow 4s ease-in-out infinite;
                    overflow: hidden;
                }

                .card-front::before {
                    content: '✦ ✧ ✦';
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    font-size: 3rem;
                    letter-spacing: 20px;
                    opacity: 0.03;
                    pointer-events: none;
                    animation: floatParticles 6s ease-in-out infinite;
                }

                .card-front::after {
                    content: '';
                    position: absolute;
                    top: -50%;
                    left: -50%;
                    width: 200%;
                    height: 200%;
                    background: conic-gradient(
                        from 0deg,
                        transparent 0deg,
                        rgba(139, 92, 246, 0.03) 60deg,
                        transparent 120deg,
                        rgba(59, 130, 246, 0.03) 180deg,
                        transparent 240deg,
                        rgba(168, 85, 247, 0.03) 300deg,
                        transparent 360deg
                    );
                    animation: spin 20s linear infinite;
                    pointer-events: none;
                }

                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }

                @keyframes answerGlow {
                    0%, 100% { 
                        border-color: rgba(16, 185, 129, 0.6);
                        box-shadow: 
                            0 0 20px rgba(16, 185, 129, 0.3),
                            0 0 40px rgba(16, 185, 129, 0.1),
                            inset 0 0 60px rgba(16, 185, 129, 0.05);
                    }
                    25% { 
                        border-color: rgba(6, 182, 212, 0.6);
                        box-shadow: 
                            0 0 20px rgba(6, 182, 212, 0.3),
                            0 0 40px rgba(6, 182, 212, 0.1),
                            inset 0 0 60px rgba(6, 182, 212, 0.05);
                    }
                    50% { 
                        border-color: rgba(34, 197, 94, 0.6);
                        box-shadow: 
                            0 0 20px rgba(34, 197, 94, 0.3),
                            0 0 40px rgba(34, 197, 94, 0.1),
                            inset 0 0 60px rgba(34, 197, 94, 0.05);
                    }
                    75% { 
                        border-color: rgba(20, 184, 166, 0.6);
                        box-shadow: 
                            0 0 20px rgba(20, 184, 166, 0.3),
                            0 0 40px rgba(20, 184, 166, 0.1),
                            inset 0 0 60px rgba(20, 184, 166, 0.05);
                    }
                }

                /* Back Face - Answer (Holographic Emerald) */
                .card-back {
                    background: 
                        radial-gradient(circle at 20% 20%, rgba(16, 185, 129, 0.15) 0%, transparent 40%),
                        radial-gradient(circle at 80% 80%, rgba(6, 182, 212, 0.1) 0%, transparent 40%),
                        radial-gradient(circle at 50% 50%, rgba(34, 197, 94, 0.05) 0%, transparent 60%),
                        linear-gradient(135deg, #051210 0%, #0a1f1a 25%, #051510 50%, #0f2520 75%, #051210 100%);
                    border: 2px solid rgba(16, 185, 129, 0.5);
                    transform: rotateY(180deg);
                    animation: answerGlow 4s ease-in-out infinite;
                    overflow: hidden;
                }

                .card-back::before {
                    content: '◆ ◇ ◆';
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    font-size: 3rem;
                    letter-spacing: 20px;
                    opacity: 0.03;
                    pointer-events: none;
                    animation: floatParticles 6s ease-in-out infinite reverse;
                }

                .card-back::after {
                    content: '';
                    position: absolute;
                    top: -50%;
                    left: -50%;
                    width: 200%;
                    height: 200%;
                    background: conic-gradient(
                        from 0deg,
                        transparent 0deg,
                        rgba(16, 185, 129, 0.03) 60deg,
                        transparent 120deg,
                        rgba(6, 182, 212, 0.03) 180deg,
                        transparent 240deg,
                        rgba(34, 197, 94, 0.03) 300deg,
                        transparent 360deg
                    );
                    animation: spin 20s linear infinite reverse;
                    pointer-events: none;
                }

                .card-back .card-corner {
                    border-color: rgba(16, 185, 129, 0.6);
                }

                .card-number {
                    position: absolute;
                    top: 18px;
                    right: 20px;
                    font-size: 0.7rem;
                    color: var(--neutral-500);
                    font-weight: 500;
                    z-index: 10;
                }

                .back-num {
                    color: rgba(16, 185, 129, 0.6);
                }

                /* Card Shine Effect */
                .card-shine {
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 50%;
                    height: 100%;
                    background: linear-gradient(
                        90deg,
                        transparent,
                        rgba(255, 255, 255, 0.05),
                        transparent
                    );
                    transform: skewX(-25deg);
                    pointer-events: none;
                    animation: shine 3s ease-in-out infinite;
                }

                @keyframes shine {
                    0% { left: -100%; }
                    50%, 100% { left: 150%; }
                }

                .card-icon {
                    font-size: 2.5rem;
                    margin-bottom: 0.5rem;
                }

                .card-label {
                    font-size: 0.8rem;
                    font-weight: 700;
                    color: var(--primary-400);
                    margin-bottom: 1rem;
                    letter-spacing: 3px;
                    text-transform: uppercase;
                }

                .back-label {
                    color: var(--accent-emerald);
                }

                .card-category {
                    position: absolute;
                    top: 16px;
                    left: 20px;
                    padding: 6px 14px;
                    background: rgba(139, 92, 246, 0.2);
                    border: 1px solid rgba(139, 92, 246, 0.3);
                    border-radius: 20px;
                    font-size: 0.65rem;
                    font-weight: 600;
                    color: var(--primary-300);
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    z-index: 10;
                }

                .back-cat {
                    background: rgba(16, 185, 129, 0.2);
                    border-color: rgba(16, 185, 129, 0.3);
                    color: var(--accent-emerald);
                }

                .card-text {
                    font-size: 1.2rem;
                    color: var(--neutral-100);
                    line-height: 1.8;
                    max-width: 280px;
                    font-weight: 400;
                    flex-grow: 1;
                    display: flex;
                    align-items: center;
                }

                .flip-hint {
                    position: absolute;
                    bottom: 20px;
                    left: 50%;
                    transform: translateX(-50%);
                    font-size: 0.75rem;
                    color: var(--neutral-500);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 4px;
                    opacity: 0.8;
                }

                .swipe-hint {
                    font-size: 0.7rem;
                    color: var(--neutral-600);
                }

                .card-scene:hover .card-front {
                    box-shadow: 
                        0 30px 60px rgba(139, 92, 246, 0.3),
                        0 0 0 1px rgba(139, 92, 246, 0.3) inset;
                }

                .card-scene:hover .card-back {
                    box-shadow: 
                        0 30px 60px rgba(16, 185, 129, 0.3),
                        0 0 0 1px rgba(16, 185, 129, 0.3) inset;
                }

                @media (max-width: 400px) {
                    .card-scene {
                        width: 280px;
                        height: 380px;
                    }
                    .card-text {
                        font-size: 1rem;
                    }
                }

                .controls {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }

                .nav-controls {
                    display: flex;
                    justify-content: center;
                    gap: 1rem;
                }

                .nav-btn {
                    padding: 10px 20px;
                    background: rgba(255, 255, 255, 0.08);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 10px;
                    color: var(--neutral-300);
                    cursor: pointer;
                    font-size: 0.9rem;
                    transition: all 0.2s ease;
                }

                .nav-btn:hover:not(:disabled) {
                    background: rgba(255, 255, 255, 0.12);
                    color: var(--neutral-100);
                }

                .nav-btn:disabled {
                    opacity: 0.4;
                    cursor: not-allowed;
                }

                .action-controls {
                    display: flex;
                    justify-content: center;
                    gap: 1rem;
                }

                .action-btn {
                    padding: 12px 24px;
                    border: none;
                    border-radius: 12px;
                    font-size: 0.95rem;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    font-weight: 500;
                }

                .review-btn {
                    background: rgba(245, 158, 11, 0.2);
                    color: #f59e0b;
                    border: 1px solid rgba(245, 158, 11, 0.3);
                }

                .review-btn:hover {
                    background: rgba(245, 158, 11, 0.3);
                    transform: translateY(-2px);
                }

                .known-btn {
                    background: linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(6, 182, 212, 0.2) 100%);
                    color: var(--accent-emerald);
                    border: 1px solid rgba(16, 185, 129, 0.3);
                }

                .known-btn:hover {
                    background: linear-gradient(135deg, rgba(16, 185, 129, 0.3) 0%, rgba(6, 182, 212, 0.3) 100%);
                    transform: translateY(-2px);
                }

                .reset-btn {
                    align-self: center;
                    padding: 8px 16px;
                    background: transparent;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 8px;
                    color: var(--neutral-400);
                    font-size: 0.85rem;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }

                .reset-btn:hover {
                    border-color: rgba(255, 255, 255, 0.2);
                    color: var(--neutral-300);
                }
            `}</style>
        </motion.div>
    );
}

// Helper function to generate flashcards from chapter content
export function generateFlashcardsFromChapter(sections: { id: string; title: string; keyPoints?: string[]; content?: string }[]): Flashcard[] {
    const flashcards: Flashcard[] = [];

    sections.forEach(section => {
        if (section.keyPoints) {
            section.keyPoints.forEach((point, index) => {
                // Create a question from the key point
                const question = point.includes(':')
                    ? point.split(':')[0] + '?'
                    : `What about: ${point.substring(0, 50)}...?`;

                flashcards.push({
                    id: `${section.id}-kp-${index}`,
                    front: question,
                    back: point,
                    category: section.title
                });
            });
        }
    });

    return flashcards;
}
