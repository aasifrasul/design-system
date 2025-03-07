import { colors, typography, spacing, animation } from '../../tokens';

class DSButton extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	static get observedAttributes() {
		return ['variant', 'size', 'disabled', 'full-width'];
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (oldValue !== newValue) {
			this.render();
		}
	}

	connectedCallback() {
		this.render();
		this.addEventListeners();
	}

	disconnectedCallback() {
		this.removeEventListeners();
	}

	addEventListeners() {
		const button = this.shadowRoot.querySelector('button');
		button.addEventListener('click', this.handleClick.bind(this));
	}

	removeEventListeners() {
		const button = this.shadowRoot.querySelector('button');
		button.removeEventListener('click', this.handleClick.bind(this));
	}

	handleClick(e) {
		if (!this.hasAttribute('disabled')) {
			this.dispatchEvent(
				new CustomEvent('ds-click', {
					bubbles: true,
					composed: true,
				}),
			);
		}
	}

	render() {
		const variant = this.getAttribute('variant') || 'primary';
		const size = this.getAttribute('size') || 'medium';
		const disabled = this.hasAttribute('disabled');
		const fullWidth = this.hasAttribute('full-width');

		this.shadowRoot.innerHTML = `
            <style>
                :host {
                display: ${fullWidth ? 'block' : 'inline-block'};
                --button-background: var(--ds-button-${variant}-background, ${colors[variant]});
                --button-color: var(--ds-button-${variant}-color, white);
                --button-border: var(--ds-button-${variant}-border, none);
                --button-hover-background: var(--ds-button-${variant}-hover-background, ${
                        colors[variant + 'Dark']
                    });
                --button-active-background: var(--ds-button-${variant}-active-background, ${
                        colors[variant + 'Dark']
                    });
                --button-focus-ring: var(--ds-button-${variant}-focus-ring, ${
                        colors[variant + 'Light']
                    }40);
                
                /* Size properties can be customized per theme */
                --button-padding-x: var(--ds-button-${size}-padding-x, ${
                        size === 'small' ? spacing.sm : size === 'large' ? spacing.lg : spacing.md
                    });
                --button-padding-y: var(--ds-button-${size}-padding-y, ${
                        size === 'small' ? spacing.xs : size === 'large' ? spacing.md : spacing.sm
                    });
                --button-font-size: var(--ds-button-${size}-font-size, ${
                        size === 'small'
                            ? typography.fontSize.sm
                            : size === 'large'
                                ? typography.fontSize.lg
                                : typography.fontSize.base
                    });
                --button-border-radius: var(--ds-button-border-radius, 4px);
                }
                
                button {
                font-family: ${typography.fontFamily};
                font-size: var(--button-font-size);
                font-weight: ${typography.fontWeight.medium};
                color: var(--button-color);
                background-color: var(--button-background);
                border: var(--button-border);
                border-radius: var(--button-border-radius);
                padding: var(--button-padding-y) var(--button-padding-x);
                cursor: ${disabled ? 'not-allowed' : 'pointer'};
                opacity: ${disabled ? '0.6' : '1'};
                transition: background-color ${animation.normal} ${animation.easing.easeInOut},
                            transform ${animation.fast} ${animation.easing.easeOut},
                            box-shadow ${animation.fast} ${animation.easing.easeOut};
                width: ${fullWidth ? '100%' : 'auto'};
                position: relative;
                overflow: hidden;
                }
                
                button:hover:not(:disabled) {
                background-color: var(--button-hover-background);
                }
                
                button:active:not(:disabled) {
                background-color: var(--button-active-background);
                transform: translateY(1px);
                }
                
                button:focus {
                outline: none;
                }
                
                button:focus-visible {
                box-shadow: 0 0 0 3px var(--button-focus-ring);
                }
                
                /* Ripple effect */
                .ripple {
                position: absolute;
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 600ms ${animation.easing.easeOut};
                background-color: rgba(255, 255, 255, 0.3);
                }
                
                @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
                }
            </style>
            
            <button ?disabled="${disabled}">
                <slot></slot>
            </button>
        `;

		// Add ripple effect functionality
		const button = this.shadowRoot.querySelector('button');

		if (!disabled) {
			button.addEventListener('mousedown', function (e) {
				const rect = button.getBoundingClientRect();
				const x = e.clientX - rect.left;
				const y = e.clientY - rect.top;

				const ripple = document.createElement('span');
				ripple.classList.add('ripple');
				ripple.style.left = x + 'px';
				ripple.style.top = y + 'px';

				button.appendChild(ripple);

				// Remove it after the animation completes
				setTimeout(() => {
					ripple.remove();
				}, 600);
			});
		}
	}
}

customElements.define('ds-button', DSButton);
