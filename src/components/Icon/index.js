class DesignSystemIcon extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	static get observedAttributes() {
		return ['name', 'size', 'color', 'fill'];
	}

	connectedCallback() {
		this.render();
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (oldValue !== newValue) {
			this.render();
		}
	}

	render() {
		const name = this.getAttribute('name') || 'default';
		const size = this.getAttribute('size') || '24';
		const color = this.getAttribute('color') || 'currentColor';
		const fill = this.getAttribute('fill') || 'none';

		this.shadowRoot.innerHTML = `
			<style>
				:host {
					display: inline-block;
					vertical-align: middle;
					width: ${size}px;
					height: ${size}px;
				}
				svg {
					width: 100%;
					height: 100%;
					stroke: ${color};
					fill: ${fill};
					stroke-width: 2;
					stroke-linecap: round;
					stroke-linejoin: round;
				}
			</style>
			${this.getIconSVG(name)}
		`;
	}

	getIconSVG(name) {
		// Predefined icon library
		const icons = {
			'home': `
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
					<path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
				</svg>
			`,
			'user': `
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
					<path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
				</svg>
			`,
			'settings': `
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
					<path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
					<path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
				</svg>
			`,
			'default': `
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
					<circle cx="12" cy="12" r="10"/>
				</svg>
			`
		};

		return icons[name] || icons['default'];
	}
}

// Define the custom element
customElements.define('ds-icon', DesignSystemIcon);

// Export for potential use in module systems
export default DesignSystemIcon;