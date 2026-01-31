import React from 'react';
import { useTheme } from '../context/ThemeContext';
import './styles/ThemeToggle.css';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <div className="theme-toggle-container">
            <button 
                className="theme-toggle-button" 
                onClick={toggleTheme}
                aria-label="Toggle theme"
                title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
                <div className="toggle-track">
                    <div className="toggle-thumb">
                        {theme === 'light' ? '☀️' : '🌙'}
                    </div>
                </div>
            </button>
        </div>
    );
};

export default ThemeToggle;