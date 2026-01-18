import { StorageManager } from './storage.js';

// Simple Router
const App = {
    init() {
        this.container = document.getElementById('app');
        
        // Global error handler for simplicity
        window.addEventListener('hashchange', () => this.handleRoute());
        this.handleRoute(); // Handle initial load
    },

    handleRoute() {
        const hash = window.location.hash;
        
        if (!hash || hash === '#/' || hash === '#/welcome') {
            // Check if user has data, if so, redirect to dashboard unless they explicitly asked for welcome
            const hasDecks = StorageManager.getDecks().length > 0;
            
            if (hasDecks && hash !== '#/welcome') {
                window.location.hash = '#/dashboard';
                return;
            }
            this.renderLanding();
        } else if (hash === '#/dashboard') {
            this.renderDashboard();
        } else if (hash.startsWith('#/edit/')) {
            const id = hash.split('/')[2];
            this.renderEditor(id);
        } else if (hash === '#/create') {
            this.renderEditor(null);
        } else if (hash.startsWith('#/study/')) {
            const id = hash.split('/')[2];
            this.renderStudy(id);
        }
    },

    async renderDashboard() {
        // Dynamic import to avoid circular deps and keep bundle small if we were bundling
        const { render } = await import('./views/home.js');
        this.container.innerHTML = '';
        this.container.appendChild(render());
    },

    async renderLanding() {
        const { render } = await import('./views/landing.js');
        this.container.innerHTML = '';
        this.container.appendChild(render());
    },

    async renderEditor(id) {
        const { render } = await import('./views/editor.js');
        this.container.innerHTML = '';
        this.container.appendChild(render(id));
    },

    async renderStudy(id) {
        const { render } = await import('./views/study.js');
        this.container.innerHTML = '';
        this.container.appendChild(render(id));
    }
};

// Start the app
App.init();
