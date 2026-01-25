import { StorageManager } from './storage.js';

// Simple Router
const App = {
    init() {
        this.container = document.getElementById('app');
        
        // Global error handler for simplicity
        window.addEventListener('hashchange', () => this.handleRoute());
        this.handleRoute(); // Handle initial load
    },

    async cleanupStudy() {
        try {
            const { cleanup } = await import('./views/study.js');
            cleanup();
        } catch (e) {
            // Module not loaded yet, ignore
        }
    },

    handleRoute() {
        const hash = window.location.hash;
        
        // Cleanup study session when leaving the study view
        if (!hash?.startsWith('#/study/')) {
            this.cleanupStudy();
        }
        
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
        // Cleanup any previous study session listeners
        const { render, cleanup } = await import('./views/study.js');
        cleanup();
        this.container.innerHTML = '';
        this.container.appendChild(render(id));
    }
};

// Start the app
App.init();
