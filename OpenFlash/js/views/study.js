import { StorageManager } from '../storage.js';
import { createElement, calculateNextReview } from '../utils.js';

// Store reference to the current keyboard handler for cleanup
let currentKeydownHandler = null;

// Cleanup function to remove the keyboard listener
export function cleanup() {
    if (currentKeydownHandler) {
        document.removeEventListener('keydown', currentKeydownHandler);
        currentKeydownHandler = null;
    }
}

export function render(deckId) {
    const cleanDeckId = deckId.split('?')[0];
    const urlParams = new URLSearchParams(window.location.hash.split('?')[1]);
    const shuffleEnabled = urlParams.get('shuffle') === 'true';
    const isCramMode = urlParams.get('mode') === 'cram';

    const deck = StorageManager.getDeck(cleanDeckId);

    if (!deck) {
        window.location.hash = '#/dashboard';
        return createElement('div');
    }

    // Filter cards for spaced repetition (only if NOT cram mode)
    let sessionCards;
    if (isCramMode) {
        // Cram mode: show all cards
        sessionCards = [...deck.cards];
    } else {
        // SM-2 mode: filter cards due for review
        const cardProgress = StorageManager.getCardProgress(cleanDeckId);
        const now = Date.now();
        sessionCards = deck.cards.filter((card) => {
            const progress = cardProgress[card.id];
            return !progress || !progress.nextReviewDate || progress.nextReviewDate <= now;
        });
    }

    if (shuffleEnabled) {
        sessionCards = shuffleArray(sessionCards);
    }

    // Check if no cards are due
    if (!isCramMode && sessionCards.length === 0) {
        const container = createElement('div', 'study-view fade-in');
        const header = createElement('header', 'view-header');
        header.innerHTML = `
            <h1>Studying: ${deck.title}</h1>
            <a href="#/dashboard" class="btn btn-outline">Back</a>
        `;
        container.appendChild(header);
        
        const complete = createElement('div', 'session-complete');
        complete.innerHTML = `
            <h2>✅ All cards reviewed!</h2>
            <p>Come back later for your next review session.</p>
            <a href="#/dashboard" class="btn btn-primary">Back to Dashboard</a>
        `;
        container.appendChild(complete);
        return container;
    }

    let currentIndex = 0;
    let isFlipped = false;
    let sessionStats = { viewed: 0, correct: 0, incorrect: 0 };

    const container = createElement('div', 'study-view fade-in');
    
    // Header
    const header = createElement('header', 'view-header');
    header.innerHTML = `
        <h1>
            Studying: ${deck.title}
            ${isCramMode ? '<span class="mode-badge">CRAM</span>' : ''}
        </h1>
        <a href="#/dashboard" class="btn btn-outline">Exit</a>
    `;
    container.appendChild(header);

    // Progress Indicator
    const progressIndicator = createElement('div', 'study-progress');
    const updateProgress = () => {
        progressIndicator.textContent = `Card ${currentIndex + 1} of ${sessionCards.length}`;
    };
    updateProgress();
    container.appendChild(progressIndicator);

    // Flashcard Container
    const scene = createElement('div', 'scene');
    const cardElement = createElement('div', 'flashcard');
    
    const frontFace = createElement('div', 'card-face card-front');
    const backFace = createElement('div', 'card-face card-back');
    
    cardElement.appendChild(frontFace);
    cardElement.appendChild(backFace);
    scene.appendChild(cardElement);
    container.appendChild(scene);

    // Controls
    const controls = createElement('div', 'study-controls');
    
    const flipBtn = createElement('button', 'btn btn-primary', 'Flip Card');
    flipBtn.style.width = '100%';
    
    const ratingBtns = createElement('div', 'rating-btns');
    ratingBtns.style.display = 'none';
    ratingBtns.innerHTML = `
        <button class="btn btn-danger" id="btn-incorrect">Again</button>
        <button class="btn btn-primary" style="background-color: var(--success); color: white;" id="btn-correct">Good</button>
    `;

    controls.appendChild(flipBtn);
    controls.appendChild(ratingBtns);
    container.appendChild(controls);

    // Logic
    const showCard = (index) => {
        if (index >= sessionCards.length) {
            finishSession();
            return;
        }
        
        const card = sessionCards[index];
        frontFace.textContent = card.front;
        backFace.textContent = card.back;
        
        // Reset state
        isFlipped = false;
        cardElement.classList.remove('is-flipped');
        flipBtn.style.display = 'block';
        ratingBtns.style.display = 'none';
        updateProgress();
    };

    const handleFlip = () => {
        isFlipped = !isFlipped;
        cardElement.classList.toggle('is-flipped');
        
        if (isFlipped) {
            flipBtn.style.display = 'none';
            ratingBtns.style.display = 'flex';
        }
    };

    const handleRating = (isCorrect) => {
        const card = sessionCards[currentIndex];
        
        if (isCorrect) {
            sessionStats.correct++;
        } else {
            sessionStats.incorrect++;
        }

        // Update SM-2 progress (only if NOT cram mode)
        if (!isCramMode) {
            const cardProgress = StorageManager.getCardProgress(cleanDeckId);
            const currentProgress = cardProgress[card.id] || {
                repetition: 0,
                interval: 0,
                easeFactor: 2.5
            };

            const quality = isCorrect ? 1 : 0;
            const newProgress = calculateNextReview(
                quality,
                currentProgress.repetition,
                currentProgress.interval,
                currentProgress.easeFactor
            );

            StorageManager.saveCardProgress(cleanDeckId, card.id, newProgress);

            // Update deck-level progress
            const deckProgress = StorageManager.getDeckProgress(cleanDeckId);
            deckProgress.viewed = (deckProgress.viewed || 0) + 1;
            deckProgress.total = deck.cards.length;
            if (isCorrect) {
                deckProgress.correct = (deckProgress.correct || 0) + 1;
            } else {
                deckProgress.incorrect = (deckProgress.incorrect || 0) + 1;
            }
            StorageManager.saveDeckProgress(cleanDeckId, deckProgress);
        }

        currentIndex++;
        showCard(currentIndex);
    };

    const finishSession = () => {
        scene.style.display = 'none';
        controls.style.display = 'none';
        progressIndicator.style.display = 'none';
        
        const completeContainer = createElement('div', 'session-complete');
        completeContainer.innerHTML = `
            <h2>🎉 Session Complete!</h2>
            <div class="stats-box">
                <p>✅ Correct: ${sessionStats.correct}</p>
                <p>❌ Again: ${sessionStats.incorrect}</p>
            </div>
            <div class="actions">
                <button class="btn btn-primary" id="study-again-btn">Study Again</button>
                <a href="#/dashboard" class="btn btn-outline">Back to Decks</a>
            </div>
        `;
        container.appendChild(completeContainer);
        
        container.querySelector('#study-again-btn').addEventListener('click', () => {
            cleanup();
            location.reload();
        });
    };

    // Event Listeners
    scene.addEventListener('click', handleFlip);
    flipBtn.addEventListener('click', handleFlip);
    
    ratingBtns.querySelector('#btn-correct').addEventListener('click', (e) => {
        e.stopPropagation();
        handleRating(true);
    });
    
    ratingBtns.querySelector('#btn-incorrect').addEventListener('click', (e) => {
        e.stopPropagation();
        handleRating(false);
    });

    // Keyboard support
    cleanup();
    currentKeydownHandler = (e) => {
        if (e.code === 'Space') {
            handleFlip();
        }
    };
    document.addEventListener('keydown', currentKeydownHandler);

    // Initialize
    if (sessionCards.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <p>This deck has no cards.</p>
                <a href="#/edit/${cleanDeckId}" class="btn btn-primary">Add Cards</a>
            </div>
        `;
    } else {
        showCard(0);
    }

    return container;
}

function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}