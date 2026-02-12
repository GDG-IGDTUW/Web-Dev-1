import { StorageManager } from '../storage.js';
import { createElement, formatDate } from '../utils.js';
import { Toast } from '../toast.js';

export function render() {
    const container = createElement('div', 'home-view fade-in');

    // Header
    const header = createElement('header', 'view-header');
    header.innerHTML = `
        <h1>My Decks</h1>
        <a href="#/create" class="btn btn-primary">
            + Create New Deck
        </a>
    `;
    container.appendChild(header);

    // Deck List
    const decks = StorageManager.getDecks();
    const list = createElement('div', 'deck-list');

    if (decks.length === 0) {
        list.innerHTML = `
            <div class="empty-state">
                <p>You haven't created any decks yet.</p>
                <p>Click "Create New Deck" to get started!</p>
            </div>
        `;
    } else {
        decks.forEach(deck => {
            const card = createElement('div', 'card deck-card');
            const progress = StorageManager.getDeckProgress(deck.id);
            const percent = progress.total > 0 ? Math.round(((progress.correct + progress.viewed) / (progress.total * 2)) * 100) : 0;

            card.innerHTML = `
                <div class="deck-info">
                    <h3>${deck.title}</h3>
                    <p>${deck.cards.length} cards &bull; Created ${formatDate(deck.createdAt)}</p>
                    <div class="progress-bar-bg">
                        <div class="progress-bar-fill" style="width: ${percent}%"></div>
                    </div>
                </div>
                </div>
                <div class="deck-actions">
                
<label class="shuffle-switch">
  <input
    type="checkbox"
    class="shuffle-checkbox"
    data-id="${deck.id}"
  />
  <span class="slider"></span>
  <span class="label-text">Shuffle</span>
</label>


<button class="btn btn-primary study-btn" data-id="${deck.id}">
  Study
</button>
<button
  class="btn btn-outline cram-btn"
  data-id="${deck.id}"
  title="Quick revision. Does not affect progress."
>
  Cram
</button>


                    <a href="#/edit/${deck.id}" class="btn btn-outline">Edit</a>
                    <button class="btn btn-danger btn-sm delete-btn" data-id="${deck.id}">REMOVE</button>
                    <small class="cram-hint">
  Cram mode • Progress not saved
</small>

                </div>
            `;

            const deckActions = card.querySelector('.deck-actions');

            // Add delete listener
            deckActions.addEventListener('click', (e) => {
                console.log('Clicked deck actions', e.target);
                if (e.target.classList.contains('cram-btn')) {
                    const deckId = e.target.dataset.id;
                    window.location.hash = `#/study/${deckId}?mode=cram`;
                    return;
                }
                
                if (e.target.classList.contains('study-btn')) {
                    const deckId = e.target.dataset.id;
                    const shuffleCheckbox = deckActions.querySelector('.shuffle-checkbox');
                    const shuffleEnabled = shuffleCheckbox?.checked;

                    window.location.hash = `#/study/${deckId}${shuffleEnabled ? '?shuffle=true' : ''}`;
                    return;
                }

                if (e.target.classList.contains('delete-btn')) {
                    const btn = e.target;
                    const originalContent = btn.innerHTML;

                    // Switch to confirm mode
                    btn.classList.add('hidden'); // or remove

                    const confirmGroup = createElement('div', 'confirm-group');
                    confirmGroup.style.display = 'inline-flex';
                    confirmGroup.style.gap = '0.5rem';

                    const confirmBtn = createElement('button', 'btn btn-danger btn-sm', 'Yes');
                    const cancelBtn = createElement('button', 'btn btn-outline btn-sm', 'No');

                    confirmGroup.appendChild(confirmBtn);
                    confirmGroup.appendChild(cancelBtn);

                    btn.parentNode.appendChild(confirmGroup);
                    btn.style.display = 'none'; // hide original button

                    // Handle Confirm
                    confirmBtn.addEventListener('click', () => {
                        try {
                            StorageManager.deleteDeck(deck.id);
                            // Re-render
                            const newContent = render();
                            const app = document.getElementById('app');
                            app.innerHTML = '';
                            app.appendChild(newContent);
                            Toast.show('Deck deleted.', 'info');
                        } catch (err) {
                            console.error('Delete error', err);
                            Toast.show('Error deleting: ' + err.message, 'error');
                        }
                    });

                    // Handle Cancel
                    cancelBtn.addEventListener('click', () => {
                        confirmGroup.remove();
                        btn.style.display = 'inline-flex';
                    });
                }
            });

            list.appendChild(card);
        });
    }

    container.appendChild(list);
    return container;
}
