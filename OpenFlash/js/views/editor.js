import { StorageManager } from '../storage.js';
import { createElement, generateId } from '../utils.js';
import { Toast } from '../toast.js';

export function render(deckId = null) {
    const isEditing = !!deckId;
    let deck = isEditing ? StorageManager.getDeck(deckId) : {
        id: generateId(),
        title: '',
        cards: [],
        createdAt: Date.now()
    };
    
    // If editing but deck not found, redirect to home
    if (isEditing && !deck) {
        window.location.hash = '#/dashboard';
        return createElement('div');
    }

    const container = createElement('div', 'editor-view fade-in');
    
    // Header
    const header = createElement('header', 'view-header');
    header.innerHTML = `
        <h1>${isEditing ? 'Edit Deck' : 'Create New Deck'}</h1>
        <div>
           <a href="#/dashboard" class="btn btn-outline" style="margin-right: var(--space-xs)">Cancel</a>
           <button id="save-deck-btn" class="btn btn-primary">Save Deck</button>
        </div>
    `;
    container.appendChild(header);

    // Form
    const form = createElement('div', 'deck-form');
    
    // Title Input
    const titleGroup = createElement('div', 'input-group');
    titleGroup.innerHTML = `
        <label for="deck-title">Deck Title</label>
        <input type="text" id="deck-title" value="${deck.title}" placeholder="e.g. Spanish Vocabulary">
    `;
    form.appendChild(titleGroup);

    // Cards Container
    const cardsContainer = createElement('div', 'cards-container');
    
    // Helper to render a card input row
    const renderCardInput = (card = { id: generateId(), front: '', back: '' }) => {
        const row = createElement('div', 'card-input-row card');
        row.dataset.id = card.id;
        row.innerHTML = `
            <div class="card-input-fields">
                <div class="input-group">
                    <label>Front</label>
                    <textarea class="card-front" rows="2" placeholder="Term / Question">${card.front}</textarea>
                </div>
                <div class="input-group">
                    <label>Back</label>
                    <textarea class="card-back" rows="2" placeholder="Definition / Answer">${card.back}</textarea>
                </div>
            </div>
            <button class="btn btn-danger btn-sm remove-card-btn" title="Remove Card">&times;</button>
        `;
        
        row.querySelector('.remove-card-btn').addEventListener('click', () => {
            row.remove();
        });

        return row;
    };

    // Add existing cards
    if (deck.cards.length > 0) {
        deck.cards.forEach(card => {
            cardsContainer.appendChild(renderCardInput(card));
        });
    } else {
        // Add one empty card by default
        cardsContainer.appendChild(renderCardInput());
    }
    
    form.appendChild(cardsContainer);

    // Add Card Button
    const addCardBtn = createElement('button', 'btn btn-outline', '+ Add Card');
    addCardBtn.style.width = '100%';
    addCardBtn.style.marginTop = 'var(--space-md)';
    addCardBtn.addEventListener('click', () => {
        cardsContainer.appendChild(renderCardInput());
        // Scroll to bottom
        setTimeout(() => window.scrollTo(0, document.body.scrollHeight), 100);
    });
    form.appendChild(addCardBtn);

    container.appendChild(form);

    // Save Handling
    const saveBtn = header.querySelector('#save-deck-btn');
    saveBtn.addEventListener('click', () => {
        const titleInput = container.querySelector('#deck-title');
        const title = titleInput.value.trim();
        
        if (!title) {
            Toast.show('Please enter a deck title.', 'error');
            titleInput.focus();
            return;
        }

        const cards = [];
        const cardRows = container.querySelectorAll('.card-input-row');
        let hasEmptyCards = false;

        cardRows.forEach(row => {
            const front = row.querySelector('.card-front').value.trim();
            const back = row.querySelector('.card-back').value.trim();
            const id = row.dataset.id;
            
            if (front && back) {
                cards.push({ id, front, back });
            } else if (front || back) {
                // If one side has text but not other, warn or include? 
                // Let's implement strict validation for now
                 hasEmptyCards = true;
            }
        });
        
        if (hasEmptyCards) {
             Toast.show('Some cards are incomplete. Please fill or remove them.', 'error');
             // Optional: Highlight them? For now just blocking is sufficient feedback matching the 'empty title' pattern.
             return;
        }

        if (cards.length === 0) {
            Toast.show('Please add at least one complete flashcard.', 'error');
            return;
        }

        deck.title = title;
        deck.cards = cards; // Update logic could be smarter to preserve card IDs but we are replacing.
        
        StorageManager.saveDeck(deck);
        Toast.show('Deck saved successfully!', 'success');
        window.location.hash = '#/dashboard';
    });

    return container;
}
