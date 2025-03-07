
// src/themes/dark-theme.js
import { baseTheme } from './base-theme';

export const darkTheme = {
    ...baseTheme,

    // Override colors for dark theme
    'color-white': '#121212', // Invert black/white
    'color-black': '#ffffff',
    'color-gray-100': '#2d2d2d',
    'color-gray-200': '#333333',
    'color-gray-300': '#444444',
    'color-gray-400': '#555555',
    'color-gray-500': '#777777',
    'color-gray-600': '#999999',
    'color-gray-700': '#bbbbbb',
    'color-gray-800': '#dddddd',
    'color-gray-900': '#eeeeee',

    // Component specific overrides
    'card-background': 'var(--ds-color-gray-100)',
    'input-background': 'var(--ds-color-gray-200)',
    'input-text-color': 'var(--ds-color-gray-800)',
    'input-placeholder-color': 'var(--ds-color-gray-600)',
    'input-disabled-background': 'var(--ds-color-gray-300)',
    'input-disabled-color': 'var(--ds-color-gray-500)',
};
