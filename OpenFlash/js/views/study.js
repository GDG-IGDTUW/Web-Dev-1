import { StorageManager } from '../storage.js';
import { createElement } from '../utils.js';
import { Toast } from '../toast.js';


// Store reference to the current keyboard handler for cleanup
let currentKeydownHandler = null;

let isEditing = false;
let editingCardId = null;



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

    // Load progress to resume or start fresh?
    // For simplicity, we just start fresh session logic but update cumulative stats.
    let currentIndex = 0;
    let isFlipped = false;
    let sessionStats = { viewed: 0, correct: 0, incorrect: 0 };
    let sessionCards = [...deck.cards];

    if (shuffleEnabled) {
        sessionCards = shuffleArray(sessionCards);
    }

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
        progressIndicator.textContent = `Card ${currentIndex + 1} of ${sessionCards.length
            }`;
    };
    updateProgress();
    container.appendChild(progressIndicator);

    // Flashcard Container
    const scene = createElement('div', 'scene');
    const cardElement = createElement('div', 'flashcard');

    const frontFace = createElement('div', 'card-face card-front');
    const backFace = createElement('div', 'card-face card-back');

    const editBtn = createElement('button', 'edit-btn', '✏️');
    scene.appendChild(editBtn);


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
        if (index >= sessionCards.length
        ) {
            finishSession();
            return;
        }

        const card = sessionCards[index];
        frontFace.textContent = card.front;
        backFace.textContent = card.back;

        // reset edit state when moving to another card
        isEditing = false;
        editingCardId = null;
        editBtn.textContent = '✏️';
        frontFace.contentEditable = false;
        backFace.contentEditable = false;


        // Reset state
        isFlipped = false;
        cardElement.classList.remove('is-flipped');
        flipBtn.style.display = 'block';
        ratingBtns.style.display = 'none';
        updateProgress();
    };

    const handleFlip = () => {
        if (isEditing) return;

        isFlipped = !isFlipped;
        cardElement.classList.toggle('is-flipped');

        if (isFlipped) {
            flipBtn.style.display = 'none';
            ratingBtns.style.display = 'flex';
        }
    };

    const handleRating = (correct) => {
        if (isEditing) return;
        if (correct) {
            sessionStats.correct++;
        } else {
            sessionStats.incorrect++;
        }



        if (!isCramMode) {
            const currentProgress = StorageManager.getDeckProgress(cleanDeckId);
            currentProgress.viewed++;
            currentProgress.total = sessionCards.length;

            if (correct) {
                currentProgress.correct++;
            } else {
                currentProgress.incorrect++;
            }

            StorageManager.saveDeckProgress(cleanDeckId, currentProgress);
        }

        currentIndex++;
        showCard(currentIndex);
    };


    const finishSession = () => {
        scene.style.display = 'none';
        controls.style.display = 'none';
        progressIndicator.style.display = 'none';

        isEditing = false;
        editingCardId = null;


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
            cleanup();
            container.innerHTML = '';
            // Re-render essentially by just calling render logic again or reloading route
            // Since we are inside the component, the cleanest SPA way without logic extraction is 
            // to trigger a route reload or just recursively call render (but we need to replace content).
            window.location.hash = `#/study/${cleanDeckId}${shuffleEnabled ? '?shuffle=true' : ''}`;

        });
    };

    // Event Listeners
    scene.addEventListener('click', (e) => {
        // Do NOT flip if clicking edit button
        if (e.target.closest('.edit-btn')) return;

        handleFlip();
    });

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
    // Remove any existing listener first
    cleanup();

    // Create a named handler for this session
    currentKeydownHandler = (e) => {
        // If editing, allow normal typing
        if (isEditing) return;

        if (e.code === 'Space') {
            e.preventDefault();
            handleFlip();
        }
    };


    document.addEventListener('keydown', currentKeydownHandler);

    // Initialize
    if (sessionCards.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <p>This deck has no cards.</p>
                <a href="#/edit/${deckId}" class="btn btn-primary">Add Cards</a>
            </div>
        `;
    } else {
        showCard(0);
    }
    editBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (!isEditing) {
            // ENTER EDIT MODE
            isEditing = true;

            // store REAL card id (works even when shuffled)
            editingCardId = sessionCards[currentIndex].id;

            frontFace.contentEditable = true;
            backFace.contentEditable = true;

            frontFace.focus();
            editBtn.textContent = '💾';
        } else {
            // SAVE EDIT
            const updatedFront = frontFace.textContent.trim();
            const updatedBack = backFace.textContent.trim();

            if (!updatedFront || !updatedBack) {
                Toast.show('Card cannot be empty', 'error');
                return;
            }

            // find correct card in original deck
            const cardToUpdate = deck.cards.find(c => c.id === editingCardId);

            if (cardToUpdate) {
                cardToUpdate.front = updatedFront;
                cardToUpdate.back = updatedBack;

                StorageManager.saveDeck(deck);
                Toast.show('Card updated!', 'success');
            }

            // exit edit mode
            isEditing = false;
            editingCardId = null;

            frontFace.contentEditable = false;
            backFace.contentEditable = false;
            editBtn.textContent = '✏️';
        }
    });


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
