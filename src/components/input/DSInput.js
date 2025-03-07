import { colors, typography, spacing } from '../../tokens';

class DSInput extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	static get observedAttributes() {
		return ['placeholder', 'value', 'disabled', 'error', 'label'];
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (oldValue !== newValue) {
			this.render();
		}
	}

	connectedCallback() {
		this.render();
		this._setupEventListeners();
	}

	disconnectedCallback() {
		this._removeEventListeners();
	}

	_setupEventListeners() {
		const input = this.shadowRoot.querySelector('input');
		if (input) {
			input.addEventListener('input', this._handleInput.bind(this));
			input.addEventListener('focus', this._handleFocus.bind(this));
			input.addEventListener('blur', this._handleBlur.bind(this));
		}
	}

	_removeEventListeners() {
		const input = this.shadowRoot.querySelector('input');
		if (input) {
			input.removeEventListener('input', this._handleInput.bind(this));
			input.removeEventListener('focus', this._handleFocus.bind(this));
			input.removeEventListener('blur', this._handleBlur.bind(this));
		}
	}

	_handleInput(e) {
		this.setAttribute('value', e.target.value);
		this.dispatchEvent(
			new CustomEvent('ds-input', {
				bubbles: true,
				composed: true,
				detail: {
					value: e.target.value,
				},
			}),
		);
	}

	_handleFocus() {
		this.setAttribute('focused', '');
	}

	_handleBlur() {
		this.removeAttribute('focused');
	}

	render() {
		const placeholder = this.getAttribute('placeholder') || '';
		const value = this.getAttribute('value') || '';
		const disabled = this.hasAttribute('disabled');
		const error = this.getAttribute('error') || '';
		const label = this.getAttribute('label') || '';
		const focused = this.hasAttribute('focused');

		this.shadowRoot.innerHTML = `
			<style>
				:host {
					display: block;
					--input-border-color: var(--ds-input-border-color, ${colors.gray300});
					--input-border-color-hover: var(--ds-input-border-color-hover, ${colors.gray400});
					--input-border-color-focus: var(--ds-input-border-color-focus, ${colors.primary});
					--input-border-color-error: var(--ds-input-border-color-error, ${colors.danger});
					--input-background: var(--ds-input-background, white);
					--input-text-color: var(--ds-input-text-color, ${colors.gray900});
					--input-placeholder-color: var(--ds-input-placeholder-color, ${colors.gray500});
					--input-label-color: var(--ds-input-label-color, ${colors.gray700});
					--input-disabled-background: var(--ds-input-disabled-background, ${colors.gray100});
					--input-disabled-color: var(--ds-input-disabled-color, ${colors.gray600});
				}

				.input-container {
					position: relative;
					margin-bottom: ${spacing.md};
				}

				label {
					display: block;
					margin-bottom: ${spacing.xs};
					font-family: ${typography.fontFamily};
					font-size: ${typography.fontSize.sm};
					font-weight: ${typography.fontWeight.medium};
					color: var(--input-label-color);
				}

				input {
					width: 100%;
					padding: ${spacing.sm} ${spacing.md};
					font-family: ${typography.fontFamily};
					font-size: ${typography.fontSize.base};
					color: var(--input-text-color);
					background-color: var(--input-background);
					border: 1px solid var(--input-border-color);
					border-radius: 4px;
					transition: border-color 0.2s, box-shadow 0.2s;
					box-sizing: border-box;
				}

				input:hover:not(:disabled) {
					border-color: var(--input-border-color-hover);
				}

				input:focus {
					outline: none;
					border-color: var(--input-border-color-focus);
					box-shadow: 0 0 0 3px ${colors.primaryLight}40;
				}

				input::placeholder {
					color: var(--input-placeholder-color);
				}

				input:disabled {
					background-color: var(--input-disabled-background);
					color: var(--input-disabled-color);
					cursor: not-allowed;
				}

				.error-message {
					margin-top: ${spacing.xs};
					color: var(--input-border-color-error);
					font-size: ${typography.fontSize.sm};
				}

				input.error {
					border-color: var(--input-border-color-error);
				}

				input.error:focus {
					box-shadow: 0 0 0 3px ${colors.dangerLight}40;
				}
			</style>
			
			<div class="input-container">
				${label ? `<label for="input">${label}</label>` : ''}
				<input 
				id="input"
				type="text" 
				placeholder="${placeholder}" 
				value="${value}" 
				?disabled="${disabled}" 
				class="${error ? 'error' : ''}"
				/>
				${error ? `<div class="error-message">${error}</div>` : ''}
			</div>
    	`;
	}
}

customElements.define('ds-input', DSInput);
