// src/components/card/ds-card.js
import { colors, spacing, elevation } from '../../tokens';

class DSCard extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	static get observedAttributes() {
		return ['elevation', 'hover-effect'];
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (oldValue !== newValue) {
			this.render();
		}
	}

	connectedCallback() {
		this.render();
	}

	render() {
		const elevationLevel = this.getAttribute('elevation') || 'medium';
		const hoverEffect = this.hasAttribute('hover-effect');

		this.shadowRoot.innerHTML = `
			<style>
				:host {
				display: block;
				--card-background: var(--ds-card-background, white);
				--card-border-radius: var(--ds-card-border-radius, 8px);
				--card-border-color: var(--ds-card-border-color, ${colors.gray200});
				--card-padding: var(--ds-card-padding, ${spacing.lg});
				}
				
				.card {
				background-color: var(--card-background);
				border-radius: var(--card-border-radius);
				border: 1px solid var(--card-border-color);
				padding: var(--card-padding);
				box-shadow: ${elevation[elevationLevel]};
				transition: box-shadow 0.3s, transform 0.3s;
				}
				
				${
					hoverEffect
						? `
				.card:hover {
				box-shadow: ${elevation.high};
				transform: translateY(-2px);
				}
				`
						: ''
				}
			</style>
			
			<div class="card">
				<slot></slot>
			</div>
    	`;
	}
}

customElements.define('ds-card', DSCard);
