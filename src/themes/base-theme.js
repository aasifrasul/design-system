// src/themes/base-theme.js

export const baseTheme = {
	// Colors
	'color-primary': '#0066cc',
	'color-primary-light': '#4d94ff',
	'color-primary-dark': '#004c99',
	'color-secondary': '#6c757d',
	'color-secondary-light': '#a1a8ae',
	'color-secondary-dark': '#494f54',
	'color-success': '#28a745',
	'color-success-light': '#48d368',
	'color-danger': '#dc3545',
	'color-danger-light': '#ef6b7b',
	'color-warning': '#ffc107',
	'color-info': '#17a2b8',
	'color-white': '#ffffff',
	'color-gray-100': '#f8f9fa',
	'color-gray-200': '#e9ecef',
	'color-gray-300': '#dee2e6',
	'color-gray-400': '#ced4da',
	'color-gray-500': '#adb5bd',
	'color-gray-600': '#6c757d',
	'color-gray-700': '#495057',
	'color-gray-800': '#343a40',
	'color-gray-900': '#212529',
	'color-black': '#000000',

	// Typography
	'font-family':
		'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, sans-serif',
	'font-size-xs': '0.75rem',
	'font-size-sm': '0.875rem',
	'font-size-base': '1rem',
	'font-size-lg': '1.125rem',
	'font-size-xl': '1.25rem',
	'font-size-2xl': '1.5rem',
	'font-size-3xl': '1.875rem',
	'font-size-4xl': '2.25rem',
	'font-size-5xl': '3rem',
	'font-weight-light': '300',
	'font-weight-regular': '400',
	'font-weight-medium': '500',
	'font-weight-semibold': '600',
	'font-weight-bold': '700',
	'line-height-none': '1',
	'line-height-tight': '1.25',
	'line-height-snug': '1.375',
	'line-height-normal': '1.5',
	'line-height-relaxed': '1.625',
	'line-height-loose': '2',

	// Spacing
	'spacing-xs': '0.25rem',
	'spacing-sm': '0.5rem',
	'spacing-md': '1rem',
	'spacing-lg': '1.5rem',
	'spacing-xl': '2rem',
	'spacing-2xl': '3rem',
	'spacing-3xl': '4rem',
	'spacing-4xl': '6rem',

	// Border radius
	'border-radius-none': '0',
	'border-radius-sm': '0.125rem',
	'border-radius-md': '0.25rem',
	'border-radius-lg': '0.5rem',
	'border-radius-xl': '0.75rem',
	'border-radius-full': '9999px',

	// Elevation
	'elevation-none': 'none',
	'elevation-low': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
	'elevation-medium':
		'0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
	'elevation-high':
		'0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
	'elevation-x-high':
		'0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',

	// Animation
	'animation-fast': '150ms',
	'animation-normal': '300ms',
	'animation-slow': '500ms',
	'animation-easing-ease': 'ease',
	'animation-easing-linear': 'linear',
	'animation-easing-ease-in': 'ease-in',
	'animation-easing-ease-out': 'ease-out',
	'animation-easing-ease-in-out': 'ease-in-out',

	// Component specific
	'button-primary-background': 'var(--ds-color-primary)',
	'button-primary-color': 'var(--ds-color-white)',
	'button-primary-hover-background': 'var(--ds-color-primary-dark)',
	'button-secondary-background': 'var(--ds-color-secondary)',
	'button-secondary-color': 'var(--ds-color-white)',
	'button-secondary-hover-background': 'var(--ds-color-secondary-dark)',

	'input-border-color': 'var(--ds-color-gray-300)',
	'input-border-color-hover': 'var(--ds-color-gray-400)',
	'input-border-color-focus': 'var(--ds-color-primary)',
	'input-border-color-error': 'var(--ds-color-danger)',
	'input-background': 'var(--ds-color-white)',
	'input-text-color': 'var(--ds-color-gray-900)',
	'input-placeholder-color': 'var(--ds-color-gray-500)',
	'input-label-color': 'var(--ds-color-gray-700)',
	'input-disabled-background': 'var(--ds-color-gray-100)',
	'input-disabled-color': 'var(--ds-color-gray-600)',

	'card-background': 'var(--ds-color-white)',
	'card-border-radius': 'var(--ds-border-radius-lg)',
	'card-border-color': 'var(--ds-color-gray-200)',
	'card-padding': 'var(--ds-spacing-lg)',

	'tabs-color': 'var(--ds-color-gray-900)',
	'tabs-color-hover': 'var(--ds-color-primary)',
	'tabs-active-color': 'var(--ds-color-primary)',
	'tabs-active-border-color': 'var(--ds-color-primary)',
	'tabs-border-color': 'var(--ds-color-gray-300)',
};
