const KEYS = {
    DECKS: 'openflash_decks',
    PROGRESS: 'openflash_progress'
};

export const StorageManager = {
    /**
     * loads all decks from local storage
     * @returns {Array} Array of Deck objects
     */
    getDecks() {
        try {
            const data = localStorage.getItem(KEYS.DECKS);
            return data ? JSON.parse(data) : [];
        } catch (e) {
            console.error('Failed to load decks', e);
            return [];
        }
    },

    /**
     * Saves a single deck. Updates if exists, adds if new.
     * @param {Object} deck 
     */
    saveDeck(deck) {
        const decks = this.getDecks();
        const index = decks.findIndex(d => d.id === deck.id);
        
        if (index >= 0) {
            decks[index] = deck;
        } else {
            decks.push(deck);
        }
        
        try {
            localStorage.setItem(KEYS.DECKS, JSON.stringify(decks));
        } catch (e) {
            console.error('Failed to save deck', e);
            alert('Failed to save data. Storage might be full.');
        }
    },

    /**
     * Deletes a deck by ID
     * @param {string} id 
     */
    deleteDeck(id) {
        try {
            const decks = this.getDecks().filter(d => d.id !== id);
            localStorage.setItem(KEYS.DECKS, JSON.stringify(decks));
            
            // Also cleanup progress
            const progress = this.getAllProgress();
            if (progress[id]) {
                delete progress[id];
                localStorage.setItem(KEYS.PROGRESS, JSON.stringify(progress));
            }
        } catch (e) {
            console.error('Failed to delete deck:', e);
            alert('Error deleting deck: ' + e.message);
        }
    },

    /**
     * Get deck by ID
     * @param {string} id 
     * @returns {Object|null}
     */
    getDeck(id) {
        const decks = this.getDecks();
        return decks.find(d => d.id === id) || null;
    },

    // --- Progress ---

    getAllProgress() {
        try {
            const data = localStorage.getItem(KEYS.PROGRESS);
            return data ? JSON.parse(data) : {};
        } catch (e) {
            return {};
        }
    },

    getDeckProgress(deckId) {
        const all = this.getAllProgress();
        return all[deckId] || { viewed: 0, correct: 0, incorrect: 0, total: 0 };
    },

    saveDeckProgress(deckId, stats) {
        const all = this.getAllProgress();
        all[deckId] = stats;
        localStorage.setItem(KEYS.PROGRESS, JSON.stringify(all));
    }
};
