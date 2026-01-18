import { StorageManager } from '../storage.js';
import { createElement } from '../utils.js';

export function render(deckId) {
    const deck = StorageManager.getDeck(deckId);
    if (!deck) {
        window.location.hash = '#/dashboard';
        return createElement('div');
    }

    // Load progress to resume or start fresh?
    // For simplicity, we just start fresh session logic but update cumulative stats.
    let currentIndex = 0;
    let isFlipped = false;
    let sessionStats = { viewed: 0, correct: 0, incorrect: 0 };
    
    const container = createElement('div', 'study-view fade-in');
    
    // Header
    const header = createElement('header', 'view-header');
    header.innerHTML = `
        <h1>Studying: ${deck.title}</h1>
        <a href="#/dashboard" class="btn btn-outline">Exit</a>
    `;
    container.appendChild(header);

    // Progress Indicator
    const progressIndicator = createElement('div', 'study-progress');
    const updateProgress = () => {
        progressIndicator.textContent = `Card ${currentIndex + 1} of ${deck.cards.length}`;
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
    ratingBtns.style.display = 'none'; // Hidden initially
    ratingBtns.innerHTML = `
        <button class="btn btn-danger" id="btn-incorrect">Again</button>
        <button class="btn btn-primary" style="background-color: var(--success); color: white;" id="btn-correct">Good</button>
    `;

    controls.appendChild(flipBtn);
    controls.appendChild(ratingBtns);
    container.appendChild(controls);

    // Logic
    const showCard = (index) => {
        if (index >= deck.cards.length) {
            finishSession();
            return;
        }
        
        const card = deck.cards[index];
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

    const handleRating = (correct) => {
        // Update stats
        const currentProgress = StorageManager.getDeckProgress(deck.id);
        currentProgress.viewed++;
        currentProgress.total = deck.cards.length; // Ensure total is up to date
        
        if (correct) {
            currentProgress.correct++;
            sessionStats.correct++;
        } else {
            currentProgress.incorrect++;
            sessionStats.incorrect++;
        }
        
        StorageManager.saveDeckProgress(deck.id, currentProgress);
        
        // Next card
        currentIndex++;
        showCard(currentIndex);
    };

    const finishSession = () => {
        scene.style.display = 'none';
        controls.style.display = 'none';
        progressIndicator.style.display = 'none';
        
        const completeContainer = createElement('div', 'session-complete');
        completeContainer.innerHTML = `
            <h2>Session Complete!</h2>
            <div class="stats-box">
                <p>Correct: ${sessionStats.correct}</p>
                <p>Incorrect: ${sessionStats.incorrect}</p>
            </div>
            <div class="actions">
                <button class="btn btn-primary" id="study-again-btn">Study Again</button>
                <a href="#/dashboard" class="btn btn-outline">Back to Decks</a>
            </div>
        `;
        container.appendChild(completeContainer);
        
        // Re-bind study again
        container.querySelector('#study-again-btn').addEventListener('click', () => {
            container.innerHTML = '';
            // Re-render essentially by just calling render logic again or reloading route
            // Since we are inside the component, the cleanest SPA way without logic extraction is 
            // to trigger a route reload or just recursively call render (but we need to replace content).
            // Simplest: 
            const newContent = render(deckId);
            const app = document.getElementById('app');
            app.innerHTML = '';
            app.appendChild(newContent);
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
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space') {
            handleFlip();
        }
    });

    // Initialize
    if (deck.cards.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <p>This deck has no cards.</p>
                <a href="#/edit/${deckId}" class="btn btn-primary">Add Cards</a>
            </div>
        `;
    } else {
        showCard(0);
    }

    return container;
}
