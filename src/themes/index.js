
import { baseTheme } from './base-theme';
import { darkTheme } from './dark-theme';

// Theme registry
export const themes = {
	light: baseTheme,
	dark: darkTheme,
};

// Apply theme to document or element
export function applyTheme(themeName = 'light', target = document.documentElement) {
	const theme = themes[themeName] || themes.light;

	// Apply all theme variables
	Object.entries(theme).forEach(([key, value]) => {
		target.style.setProperty(`--ds-${key}`, value);
	});

	// Store active theme name
	target.dataset.theme = themeName;

	return theme;
}

// Get current theme
export function getTheme(target = document.documentElement) {
	return target.dataset.theme || 'light';
}

// Toggle between themes
export function toggleTheme(target = document.documentElement) {
	const currentTheme = getTheme(target);
	const newTheme = currentTheme === 'light' ? 'dark' : 'light';
	return applyTheme(newTheme, target);
}
