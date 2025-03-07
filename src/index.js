import { applyTheme, toggleTheme } from './themes/index.js';
import './components/button/DSButton';
import './components/input/DSInput';
import './components/card/DSCard';
import './components/tabs/DSTabs';

// Apply default theme on initialization
document.addEventListener('DOMContentLoaded', () => {
	// Check for user preference
	const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
	const savedTheme = localStorage.getItem('ds-theme');

	// Apply theme based on saved preference or system preference
	const initialTheme = savedTheme || (prefersDarkScheme ? 'dark' : 'light');
	applyTheme(initialTheme);

	// Setup theme toggle button if it exists
	const themeToggle = document.getElementById('theme-toggle');
	if (themeToggle) {
		themeToggle.addEventListener('click', () => {
			const newTheme = toggleTheme();
			localStorage.setItem('ds-theme', newTheme);
		});
	}
});

// Example of creating a global CSS with default variables
function createGlobalStylesheet() {
	const style = document.createElement('style');
	style.textContent = `
        :root {
        /* These are fallback values if JavaScript fails to load */
        --ds-color-primary: #0066cc;
        --ds-color-primary-light: #4d94ff;
        --ds-color-primary-dark: #004c99;
        /* ... other default variables ... */
        }
        
        /* Global styles */
        body {
        font-family: var(--ds-font-family);
        color: var(--ds-color-gray-900);
        background-color: var(--ds-color-white);
        line-height: var(--ds-line-height-normal);
        transition: background-color 0.3s, color 0.3s;
        }
    `;
	document.head.appendChild(style);
}

createGlobalStylesheet();
