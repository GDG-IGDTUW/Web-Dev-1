import { createElement } from './utils.js';

export const Toast = {
    /**
     * Shows a toast notification
     * @param {string} message 
     * @param {'info'|'success'|'error'} type 
     */
    show(message, type = 'info') {
        let container = document.getElementById('toast-container');
        if (!container) {
            container = createElement('div', 'toast-container');
            container.id = 'toast-container';
            document.body.appendChild(container);
        }

        const toast = createElement('div', `toast toast-${type}`, message);
        
        // Icon logic could go here but using simple text/color for now
        
        container.appendChild(toast);

        // Remove after animation/time
        setTimeout(() => {
            toast.classList.add('fade-out');
            setTimeout(() => {
                toast.remove();
                if (container.children.length === 0) {
                    container.remove();
                }
            }, 300); // match css transition
        }, 3000);
    }
};
