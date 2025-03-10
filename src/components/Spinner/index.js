class SpinnerComponent extends HTMLElement {
	constructor() {
		super();

		// Create a shadow DOM
		this.attachShadow({ mode: 'open' });

		// Default properties
		this.size = 40;
		this.color = '#3498db';
		this.thickness = 4;
		this.duration = 1.2;
		this.label = 'Loading...';
	}

	// Observed attributes for property changes
	static get observedAttributes() {
		return ['size', 'color', 'thickness', 'duration', 'label'];
	}

	// Handle attribute changes
	attributeChangedCallback(name, oldValue, newValue) {
		if (oldValue !== newValue) {
			this[name] = newValue;
			this.render();
		}
	}

	// Component lifecycle - when added to DOM
	connectedCallback() {
		this.loadAttributes();
		this.render();
	}

	// Get attributes from HTML
	loadAttributes() {
		this.observedAttributes.forEach((attr) => {
			if (this.hasAttribute(attr)) {
				this[attr] = this.getAttribute(attr);
			}
		});
	}

	// Render the component
	render() {
		const styles = `
        :host {
          display: inline-block;
        }
        
        .spinner-container {
          display: inline-flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        
        .spinner {
          width: ${this.size}px;
          height: ${this.size}px;
          border: ${this.thickness}px solid rgba(0, 0, 0, 0.1);
          border-top-color: ${this.color};
          border-radius: 50%;
          animation: spin ${this.duration}s linear infinite;
        }
        
        .spinner-label {
          margin-top: 8px;
          font-family: sans-serif;
          font-size: 14px;
          color: #666;
        }
        
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `;

		const html = `
        <div class="spinner-container">
          <div class="spinner" role="progressbar" aria-label="${this.label}"></div>
          ${this.label ? `<div class="spinner-label">${this.label}</div>` : ''}
        </div>
      `;

		this.shadowRoot.innerHTML = `
        <style>${styles}</style>
        ${html}
      `;
	}
}

// Register the custom element
customElements.define('ds-spinner', SpinnerComponent);
