import { createElement } from '../utils.js';

export function render() {
    const container = createElement('div', 'landing-view fade-in');
    
    container.innerHTML = `
        <div class="landing-hero-split">
            <div class="hero-content">
                <h1 class="hero-title">Master Any Subject ⚡️</h1>
                <p class="hero-subtitle">
                    The simplest, fastest way to create flashcards and supercharge your learning. 
                    No login required.
                </p>
                <div class="hero-actions">
                    <a href="#/create" class="btn btn-primary btn-lg">Start Learning Now</a>
                </div>
            </div>
            <div class="hero-image">
                <img src="assets/hero-illustration.png" alt="Learning Illustration" class="floating-img">
            </div>
        </div>

        <section class="features-section">
            <div class="features-grid">
                <div class="feature-card">
                    <div class="feature-icon">🚀</div>
                    <h3>Fast & Simple</h3>
                    <p>Create decks in seconds. No complex setups, just pure learning focus.</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">🧠</div>
                    <h3>Active Recall</h3>
                    <p>Test yourself with our smart study mode designed to boost memory retention.</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">🔒</div>
                    <h3>Privacy First</h3>
                    <p>All data stays in your browser. No servers, no tracking, complete privacy.</p>
                </div>
            </div>
        </section>
    `;

    return container;
}
