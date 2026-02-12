import { StorageManager } from '../storage.js';
import { createElement } from '../utils.js';

let currentKeydownHandler = null;

export function cleanup() {
    if (currentKeydownHandler) {
        document.removeEventListener('keydown', currentKeydownHandler);
        currentKeydownHandler = null;
    }
}

function getRandomWrongAnswers(correctAnswer, allCards, currentCardIndex, count = 3) {
    const wrongAnswers = [];
    const availableCards = allCards.filter((_, index) => index !== currentCardIndex);
    
    while (wrongAnswers.length < count && availableCards.length > 0) {
        const randomIndex = Math.floor(Math.random() * availableCards.length);
        const wrongAnswer = availableCards[randomIndex].back;
        
        if (wrongAnswer !== correctAnswer && !wrongAnswers.includes(wrongAnswer)) {
            wrongAnswers.push(wrongAnswer);
        }
        
        availableCards.splice(randomIndex, 1);
    }
    
    return wrongAnswers;
}

function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

export function render(deckId) {
    const deck = StorageManager.getDeck(deckId);
    if (!deck) {
        window.location.hash = '#/dashboard';
        return createElement('div');
    }

    let currentIndex = 0;
    let sessionStats = { correct: 0, incorrect: 0, total: deck.cards.length };
    let answered = false;
    let selectedAnswer = null;
    
    const container = createElement('div', 'quiz-view fade-in');
    
    const header = createElement('header', 'view-header');
    header.innerHTML = `
        <h1>Quiz: ${deck.title}</h1>
        <a href="#/dashboard" class="btn btn-outline">Exit</a>
    `;
    container.appendChild(header);

    const progressIndicator = createElement('div', 'study-progress');
    const updateProgress = () => {
        progressIndicator.textContent = `Question ${currentIndex + 1} of ${deck.cards.length}`;
    };
    updateProgress();
    container.appendChild(progressIndicator);

    const quizContainer = createElement('div', 'quiz-container');
    const questionElement = createElement('div', 'quiz-question');
    const optionsElement = createElement('div', 'quiz-options');
    
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);
    container.appendChild(quizContainer);

    const showQuestion = (index) => {
        if (index >= deck.cards.length) {
            finishQuiz();
            return;
        }

        answered = false;
        selectedAnswer = null;
        
        const card = deck.cards[index];
        const correctAnswer = card.back;
        const wrongAnswers = getRandomWrongAnswers(correctAnswer, deck.cards, index, 3);
        const allOptions = shuffleArray([correctAnswer, ...wrongAnswers]);
        
        questionElement.innerHTML = `<p>${card.front}</p>`;
        optionsElement.innerHTML = '';
        
        allOptions.forEach((option) => {
            const optionBtn = createElement('button', 'option-btn');
            optionBtn.textContent = option;
            optionBtn.dataset.correct = option === correctAnswer ? 'true' : 'false';
            
            optionBtn.addEventListener('click', () => {
                if (!answered) {
                    answered = true;
                    selectedAnswer = option;
                    
                    const isCorrect = option === correctAnswer;
                    optionBtn.classList.add(isCorrect ? 'correct' : 'incorrect');
                    
                    const allBtns = optionsElement.querySelectorAll('.option-btn');
                    allBtns.forEach(btn => {
                        btn.disabled = true;
                        if (btn.dataset.correct === 'true') {
                            btn.classList.add('correct');
                        }
                    });
                    
                    if (isCorrect) {
                        sessionStats.correct++;
                    } else {
                        sessionStats.incorrect++;
                    }
                    
                    setTimeout(() => {
                        currentIndex++;
                        showQuestion(currentIndex);
                    }, 1500);
                }
            });
            
            optionsElement.appendChild(optionBtn);
        });
        
        updateProgress();
    };

    const finishQuiz = () => {
        quizContainer.style.display = 'none';
        progressIndicator.style.display = 'none';
        
        const completeContainer = createElement('div', 'session-complete');
        completeContainer.innerHTML = `
            <h2>Quiz Complete!</h2>
            <div class="stats-box">
                <p>You scored ${sessionStats.correct}/${sessionStats.total}</p>
            </div>
            <div class="actions">
                <button class="btn btn-primary" id="quiz-again-btn">Quiz Again</button>
                <a href="#/dashboard" class="btn btn-outline">Back to Decks</a>
            </div>
        `;
        container.appendChild(completeContainer);
        
        container.querySelector('#quiz-again-btn').addEventListener('click', () => {
            cleanup();
            container.innerHTML = '';
            const newContent = render(deckId);
            const app = document.getElementById('app');
            app.innerHTML = '';
            app.appendChild(newContent);
        });
    };

    if (deck.cards.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <p>This deck has no cards.</p>
                <a href="#/edit/${deckId}" class="btn btn-primary">Add Cards</a>
            </div>
        `;
    } else {
        showQuestion(0);
    }

    return container;
}
